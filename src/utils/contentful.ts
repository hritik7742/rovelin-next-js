import { createClient } from 'contentful';

// Create Contentful client
const client = createClient({
  space: 'eym2cl2yrh6k',
  accessToken: 'ROemVn-CHNVSFx0srCNE1SBRWVlgVwJ7wca1-R5MDyM',
});

export const getBlogPosts = async () => {
  try {
    const response = await client.getEntries({
      content_type: 'blogPost',
      order: '-sys.createdAt',
    });
    return response.items;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
};

export const getBlogPost = async (slug: string) => {
  try {
    // Decode the URL-encoded slug
    const decodedSlug = decodeURIComponent(slug);
    console.log('Fetching blog post with decoded slug:', decodedSlug);

    const response = await client.getEntries({
      content_type: 'blogPost',
      'fields.slug': decodedSlug,
      limit: 1,
    });
    
    console.log('Contentful response:', response);
    
    if (response.items.length === 0) {
      console.log('No post found for slug:', decodedSlug);
      return null;
    }
    
    return response.items[0];
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}; 