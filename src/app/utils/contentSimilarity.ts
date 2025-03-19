import { BlogPost } from '../blog/types';

// Function to calculate content similarity between two blog posts
export function calculateContentSimilarity(post1: BlogPost, post2: BlogPost): number {
  if (post1.id === post2.id) return 0; // Same post, no similarity calculation needed
  
  // Base similarity score
  let similarityScore = 0;
  
  // Category match (highest weight)
  if (post1.category === post2.category) {
    similarityScore += 0.3;
  }
  
  // Tag overlap (medium weight)
  const commonTags = post1.tags.filter(tag => post2.tags.includes(tag));
  similarityScore += (commonTags.length / Math.max(post1.tags.length, post2.tags.length)) * 0.3;
  
  // Title and excerpt similarity (using basic text matching)
  const post1Words = getSignificantWords(post1.title + ' ' + post1.excerpt);
  const post2Words = getSignificantWords(post2.title + ' ' + post2.excerpt);
  
  const commonWords = post1Words.filter(word => post2Words.includes(word));
  const textSimilarity = commonWords.length / Math.max(post1Words.length, post2Words.length);
  similarityScore += textSimilarity * 0.4;
  
  return similarityScore;
}

// Helper function to get significant words from text (removes common words)
function getSignificantWords(text: string): string[] {
  const commonWords = ['the', 'and', 'a', 'an', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'as', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'can', 'could', 'will', 'would', 'should', 'may', 'might', 'must', 'that', 'this', 'these', 'those', 'it', 'they', 'them', 'their', 'from', 'your', 'our'];
  
  return text.toLowerCase()
    .replace(/[^\w\s]/g, '') // Remove punctuation
    .split(/\s+/) // Split by whitespace
    .filter(word => word.length > 3 && !commonWords.includes(word)); // Filter out common words and short words
}

// Function to find posts that are part of a series
export function findSeriesPosts(currentPost: BlogPost, allPosts: BlogPost[]): BlogPost[] {
  // Look for posts with similar titles that might indicate a series
  const titleBase = currentPost.title.split(':')[0].split(' - ')[0].trim();
  const potentialSeriesPosts = allPosts.filter(post => 
    post.id !== currentPost.id && 
    (post.title.includes(titleBase) || currentPost.title.includes(post.title.split(':')[0].split(' - ')[0].trim()))
  );
  
  // If we found potential series posts, return them
  if (potentialSeriesPosts.length > 0) {
    return potentialSeriesPosts;
  }
  
  // Otherwise, look for posts with very high tag overlap (at least 80%)
  return allPosts.filter(post => {
    if (post.id === currentPost.id) return false;
    
    const commonTags = post.tags.filter(tag => currentPost.tags.includes(tag));
    const overlapPercentage = commonTags.length / Math.min(post.tags.length, currentPost.tags.length);
    
    return overlapPercentage >= 0.8;
  });
}

// Function to find contextually related posts based on content sections
export function findContextualRelatedPosts(
  currentPost: BlogPost, 
  allPosts: BlogPost[],
  context: 'hiring' | 'compliance' | 'management' | 'operations' | 'remote-work'
): BlogPost[] {
  // Define keywords for each context
  const contextKeywords: Record<string, string[]> = {
    'hiring': ['hiring', 'recruitment', 'talent', 'acquisition', 'interview', 'candidate', 'resume', 'cv', 'job', 'position'],
    'compliance': ['compliance', 'legal', 'law', 'regulation', 'tax', 'payroll', 'contract', 'employment', 'labor'],
    'management': ['management', 'leadership', 'team', 'performance', 'feedback', 'evaluation', 'culture', 'communication'],
    'operations': ['operations', 'efficiency', 'process', 'workflow', 'productivity', 'cost', 'scale', 'growth'],
    'remote-work': ['remote', 'virtual', 'distributed', 'work from home', 'wfh', 'telecommute', 'online', 'digital']
  };
  
  // Get keywords for the specified context
  const keywords = contextKeywords[context];
  
  // Filter posts that match the context keywords in title or tags
  const contextualPosts = allPosts.filter(post => {
    if (post.id === currentPost.id) return false;
    
    // Check if title contains any of the keywords
    const titleMatch = keywords.some(keyword => 
      post.title.toLowerCase().includes(keyword)
    );
    
    // Check if tags contain any of the keywords
    const tagMatch = post.tags.some(tag => 
      keywords.some(keyword => tag.toLowerCase().includes(keyword))
    );
    
    return titleMatch || tagMatch;
  });
  
  // Sort by similarity to current post
  return contextualPosts
    .map(post => ({
      post,
      similarity: calculateContentSimilarity(currentPost, post)
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .map(item => item.post)
    .slice(0, 3); // Return top 3
}

// Function to get bidirectional references
export function getBidirectionalReferences(currentPost: BlogPost, allPosts: BlogPost[]): BlogPost[] {
  // Find posts that are highly similar to the current post
  return allPosts
    .filter(post => post.id !== currentPost.id)
    .map(post => ({
      post,
      similarity: calculateContentSimilarity(currentPost, post)
    }))
    .filter(item => item.similarity > 0.7) // Only posts with high similarity
    .map(item => item.post);
} 