export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  image?: string;
  published: boolean;
  content: string;
  readingTime: string;
}

export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string | Date;  // gray-matter auto-parses YAML dates into JS Date objects
  author: string;
  tags: string[];
  image?: string;
  published?: boolean;
}
