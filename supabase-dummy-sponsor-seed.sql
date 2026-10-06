insert into public.sponsor_listings (
  sponsor_name,
  email,
  product_name,
  product_url,
  logo_url,
  description,
  category,
  plan_type,
  status,
  raw_checkout
)
select
  seed.sponsor_name,
  seed.email,
  seed.product_name,
  seed.product_url,
  seed.logo_url,
  seed.description,
  seed.category,
  seed.plan_type,
  'live',
  jsonb_build_object('source', 'seed_dummy_sponsor')
from (
  values
    (
      'Rovelin Directory',
      'hritikkumarkota@gmail.com',
      'Gemini Prime',
      'https://chromewebstore.google.com/detail/gemini-prime-165+custom-a/fejdghiopnhlijknlolkceklimkeopoe',
      '/images/gemini.png',
      'Enhance your AI chat experience with custom prompts, voice input, instant chat from webpages, and note-taking system.',
      'AI Tools',
      'featured'
    ),
    (
      'Rovelin Directory',
      'hritikkumarkota@gmail.com',
      'DeepSeek Pro',
      'https://chromewebstore.google.com/detail/deepseek-pro-custom-promp/noboaggalobomdpdggapfibgodeedkpl',
      '/images/deepseekpro.png',
      'Chrome extension that enhances your AI chat experience with custom prompts, voice input, and themes.',
      'AI Tools',
      'featured'
    ),
    (
      'Rovelin Directory',
      'hritikkumarkota@gmail.com',
      'Chat with Ai',
      'https://chromewebstore.google.com/detail/chat-with-ai-gpt-grok-cla/fpbfpjeeglaaadigkppnnliomndbgiin?authuser=0&hl=en',
      '/images/chatwithai.png',
      'Open ChatGPT, DeepSeek, Gemini, Claude, and Grok in a sidebar for explain, summarize, grammar fixes, and translation.',
      'AI Tools',
      'directory'
    ),
    (
      'Rovelin Directory',
      'hritikkumarkota@gmail.com',
      'Claude ToolKit',
      'https://chromewebstore.google.com/detail/claude-toolkit-custom-pro/opnabjgijpbfgloabfopcbmkaegcojeh',
      '/images/claude.png',
      'Transform your Claude AI experience with prompts, exports, voice input, notes, and folders.',
      'AI Tools',
      'directory'
    )
) as seed (
  sponsor_name,
  email,
  product_name,
  product_url,
  logo_url,
  description,
  category,
  plan_type
)
where not exists (
  select 1
  from public.sponsor_listings existing
  where existing.product_name = seed.product_name
    and existing.plan_type = seed.plan_type
);
