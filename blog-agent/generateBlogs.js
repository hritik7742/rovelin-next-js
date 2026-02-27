const fs = require("fs");
const path = require("path");
const axios = require("axios");
const slugify = require("slugify");

// TEST_MODE=true → generate 1 blog (for local testing)
// TEST_MODE=false → generate BLOGS_PER_RUN blogs (default: 3) for production
const TEST_MODE = process.env.TEST_MODE !== "false";
const BLOGS_PER_RUN = TEST_MODE ? 1 : Math.max(1, parseInt(process.env.BLOGS_PER_RUN || "3", 10));

const ROOT_DIR = path.resolve(__dirname, "..");
const BLOG_AGENT_DIR = path.join(ROOT_DIR, "blog-agent");
const POSTS_DIR = path.join(ROOT_DIR, "content", "posts");
const LOG_FILE = path.join(BLOG_AGENT_DIR, "logs.txt");

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "qwen/qwen3-32b";
const GROQ_TEMPERATURE = 0.8;
const GROQ_MAX_TOKENS = 4000;

function sanitizeMdxContent(raw) {
  if (!raw) return "";
  // Remove leading <think>...</think> blocks that some reasoning models emit
  return raw.replace(/^<think>[\s\S]*?<\/think>\s*/i, "");
}

function ensureDirExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function readJsonSafe(filePath, fallback) {
  try {
    if (!fs.existsSync(filePath)) return fallback;
    const raw = fs.readFileSync(filePath, "utf8");
    if (!raw.trim()) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function writeJsonPretty(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf8");
}

function appendLog({ title, product, slug, status, message }) {
  const timestamp = new Date().toISOString();
  const line = `[${timestamp}] status=${status} product="${product}" title="${title || ""}" slug="${slug ||
    ""}" message="${(message || "").replace(/\s+/g, " ").trim()}"\n`;
  fs.appendFileSync(LOG_FILE, line, "utf8");
}

function scanExistingPosts() {
  ensureDirExists(POSTS_DIR);
  const entries = fs.readdirSync(POSTS_DIR, { withFileTypes: true });
  const posts = [];

  for (const entry of entries) {
    if (!entry.isFile()) continue;
    if (!entry.name.toLowerCase().endsWith(".mdx")) continue;

    const fullPath = path.join(POSTS_DIR, entry.name);
    const raw = fs.readFileSync(fullPath, "utf8");
    const slug = entry.name.replace(/\.mdx$/i, "");

    let title = slug;
    const frontmatterMatch = raw.match(/^---([\s\S]*?)---/);
    if (frontmatterMatch) {
      const fm = frontmatterMatch[1];
      const titleMatch = fm.match(/^\s*title:\s*"(.*)"/m);
      if (titleMatch) {
        title = titleMatch[1].trim();
      }
    }

    posts.push({ title, slug });
  }

  return posts;
}

function buildUsedTitles() {
  const usedTitlesPath = path.join(BLOG_AGENT_DIR, "usedTitles.json");
  const existingArray = readJsonSafe(usedTitlesPath, []);
  const existingByKey = new Map(
    existingArray.map((item) => [`${item.slug}::${item.title}`.toLowerCase(), item])
  );

  const scanned = scanExistingPosts();
  for (const post of scanned) {
    const key = `${post.slug}::${post.title}`.toLowerCase();
    if (!existingByKey.has(key)) {
      existingByKey.set(key, {
        title: post.title,
        slug: post.slug,
        product: "unknown",
        topicStyle: "unknown"
      });
    }
  }

  const merged = Array.from(existingByKey.values());
  writeJsonPretty(usedTitlesPath, merged);
  return { usedTitlesPath, usedTitles: merged };
}

function createSlugFromTitle(title) {
  const base = slugify(title, {
    lower: true,
    strict: true,
    trim: true
  });
  return base || slugify(Date.now().toString(), { lower: true, strict: true });
}

function isTitleTooSimilar(newTitle, usedTitles) {
  const cleaned = newTitle.toLowerCase().trim();
  for (const item of usedTitles) {
    const existing = (item.title || "").toLowerCase().trim();
    if (!existing) continue;
    if (existing === cleaned) return true;
    if (existing.includes(cleaned) || cleaned.includes(existing)) return true;
  }
  return false;
}

async function callGroqChatCompletion(prompt) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY environment variable is not set");
  }

  const payload = {
    model: GROQ_MODEL,
    temperature: GROQ_TEMPERATURE,
    max_tokens: GROQ_MAX_TOKENS,
    messages: [
      {
        role: "system",
        content:
          "You are an expert SaaS content marketer and technical writer. You write detailed, practical, SEO-focused articles that feel human, not AI."
      },
      {
        role: "user",
        content: prompt
      }
    ]
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`
  };

  const response = await axios.post(GROQ_API_URL, payload, { headers });
  const choice = response.data.choices && response.data.choices[0];
  if (!choice || !choice.message || !choice.message.content) {
    throw new Error("Invalid response from Groq API");
  }

  return choice.message.content;
}

function extractTitleAndSlugFromMdx(mdxContent, fallbackSlugBase) {
  let title = "";
  let slugFromFrontmatter = "";

  const frontmatterMatch = mdxContent.match(/^---([\s\S]*?)---/);
  if (frontmatterMatch) {
    const fm = frontmatterMatch[1];
    const titleMatch = fm.match(/^\s*title:\s*"(.*)"/m);
    if (titleMatch) {
      title = titleMatch[1].trim();
    }
    const slugMatch = fm.match(/^\s*slug:\s*"(.*)"/m);
    if (slugMatch) {
      slugFromFrontmatter = slugMatch[1].trim();
    }
  }

  if (!title) {
    const h1Match = mdxContent.match(/^#\s+(.*)$/m);
    if (h1Match) {
      title = h1Match[1].trim();
    }
  }

  const fallbackTitle = title || fallbackSlugBase || "blog-post";
  const slug = slugFromFrontmatter || createSlugFromTitle(fallbackTitle);
  return { title: fallbackTitle, slug };
}

async function generateSingleBlog({
  product,
  topic,
  usedTitles,
  promptTemplate,
  usedTitlesPath
}) {
  const date = new Date().toISOString().slice(0, 10);

  const previousForProduct = usedTitles.filter(
    (item) => (item.product || "").toLowerCase() === product.name.toLowerCase()
  );
  const previousTitlesText =
    previousForProduct.length === 0
      ? "None yet. This will be the first article for this product."
      : previousForProduct
        .map(
          (item, idx) =>
            `${idx + 1}. title: "${item.title}" | topicStyle: "${item.topicStyle ||
            "unknown"}"`
        )
        .join("\n");

  const productDescription =
    product.description ||
    "A SaaS / browser extension product. Use the keywords and product name to infer what it does and craft practical, realistic use cases.";

  const filledPrompt = promptTemplate
    .replace(/{{product}}/g, product.name)
    .replace(/{{productUrl}}/g, product.url || '')
    .replace(/{{productDescription}}/g, productDescription)
    .replace(/{{topic}}/g, topic)
    .replace(/{{keywords}}/g, product.keywords.join(", "))
    .replace(/{{previousTitles}}/g, previousTitlesText)
    .replace(/{{date}}/g, date)
    .replace(/{{slug}}/g, createSlugFromTitle(`${product.name} ${topic} ${date}`));

  const maxAttempts = 3;
  let lastError = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const rawMdx = await callGroqChatCompletion(filledPrompt);
      const mdx = sanitizeMdxContent(rawMdx);
      const { title, slug } = extractTitleAndSlugFromMdx(
        mdx,
        `${product.name}-${topic}-${date}`
      );

      if (isTitleTooSimilar(title, usedTitles)) {
        lastError = new Error(
          `Generated title "${title}" is too similar to a previous one.`
        );
        continue;
      }

      const fileSlug = createUniqueSlug(slug, usedTitles);
      const fileName = `${fileSlug}.mdx`;
      const filePath = path.join(POSTS_DIR, fileName);

      fs.writeFileSync(filePath, mdx, "utf8");

      const newEntry = {
        title,
        slug: fileSlug,
        product: product.name,
        topicStyle: topic,
        date
      };
      usedTitles.push(newEntry);
      writeJsonPretty(usedTitlesPath, usedTitles);

      appendLog({
        title,
        product: product.name,
        slug: fileSlug,
        status: "SUCCESS",
        message: `Blog generated on attempt ${attempt}`
      });

      console.log("Blog Generated:");
      console.log("Title:", title);
      console.log("Slug:", fileSlug);
      console.log("Product:", product.name);
      console.log("Topic Style:", topic);

      return;
    } catch (err) {
      lastError = err;
      const extra =
        err && err.response && err.response.data
          ? ` | apiError=${JSON.stringify(err.response.data)}`
          : "";
      appendLog({
        title: "",
        product: product.name,
        slug: "",
        status: "RETRY",
        message: `Attempt ${attempt} failed: ${err.message || err.toString()}${extra}`
      });
      if (attempt < maxAttempts) {
        await new Promise((res) => setTimeout(res, 2000 * attempt));
      }
    }
  }

  appendLog({
    title: "",
    product: product.name,
    slug: "",
    status: "FAILED",
    message:
      (lastError ? lastError.message || lastError.toString() : "Unknown error") +
      (lastError && lastError.response && lastError.response.data
        ? ` | apiError=${JSON.stringify(lastError.response.data)}`
        : "")
  });

  console.error(
    `Failed to generate blog for product "${product.name}" and topic "${topic}" after ${maxAttempts} attempts.`
  );
}

function createUniqueSlug(baseSlug, usedTitles) {
  const existingSlugs = new Set(usedTitles.map((item) => item.slug));
  if (!existingSlugs.has(baseSlug)) return baseSlug;

  let counter = 2;
  let candidate = `${baseSlug}-${counter}`;
  while (existingSlugs.has(candidate)) {
    counter += 1;
    candidate = `${baseSlug}-${counter}`;
  }
  return candidate;
}

async function main() {
  ensureDirExists(BLOG_AGENT_DIR);
  ensureDirExists(POSTS_DIR);

  const productsPath = path.join(BLOG_AGENT_DIR, "products.json");
  const topicsPath = path.join(BLOG_AGENT_DIR, "topics.json");
  const promptTemplatePath = path.join(BLOG_AGENT_DIR, "promptTemplate.txt");

  const products = readJsonSafe(productsPath, []);
  const topics = readJsonSafe(topicsPath, []);
  const promptTemplate = fs.readFileSync(promptTemplatePath, "utf8");

  if (!products.length) {
    throw new Error("No products found in blog-agent/products.json");
  }
  if (!topics.length) {
    throw new Error("No topics found in blog-agent/topics.json");
  }

  const { usedTitlesPath, usedTitles } = buildUsedTitles();

  console.log("TEST_MODE:", TEST_MODE ? "ON" : "OFF");

  const jobs = [];

  function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // Shuffle products so we spread across different products each run
  const shuffledProducts = [...products].sort(() => Math.random() - 0.5);
  const usedCombos = new Set();
  let attempts = 0;
  const maxAttempts = BLOGS_PER_RUN * 10;

  while (jobs.length < BLOGS_PER_RUN && attempts < maxAttempts) {
    const product = shuffledProducts[jobs.length % shuffledProducts.length];
    const topic = pickRandom(topics);
    const comboKey = `${product.name}::${topic}`;
    if (!usedCombos.has(comboKey)) {
      usedCombos.add(comboKey);
      jobs.push({ product, topic });
    }
    attempts += 1;
  }

  console.log(`Generating ${jobs.length} blog(s) this run (BLOGS_PER_RUN=${BLOGS_PER_RUN}, TEST_MODE=${TEST_MODE ? "ON" : "OFF"})`);

  for (const job of jobs) {
    // eslint-disable-next-line no-await-in-loop
    await generateSingleBlog({
      product: job.product,
      topic: job.topic,
      usedTitles,
      promptTemplate,
      usedTitlesPath
    });
  }
}

main()
  .then(() => {
    console.log("Blog generation completed.");
  })
  .catch((err) => {
    appendLog({
      title: "",
      product: "N/A",
      slug: "",
      status: "FATAL",
      message:
        (err.message || err.toString()) +
        (err && err.response && err.response.data
          ? ` | apiError=${JSON.stringify(err.response.data)}`
          : "")
    });
    console.error("Blog generation failed:", err);
    process.exit(1);
  });

