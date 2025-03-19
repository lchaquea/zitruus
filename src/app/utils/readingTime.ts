/**
 * Calculates the estimated reading time for a given text
 * @param text The text content to analyze
 * @param wordsPerMinute The average reading speed in words per minute (default: 200)
 * @returns The estimated reading time in minutes
 */
export function calculateReadingTime(text: string, wordsPerMinute: number = 200): number {
  // Remove HTML tags if present
  const cleanText = text.replace(/<\/?[^>]+(>|$)/g, '');
  
  // Count words by splitting on whitespace
  const wordCount = cleanText.split(/\s+/).filter(Boolean).length;
  
  // Calculate reading time in minutes
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  
  // For blog posts, we want to provide a more realistic estimate
  // Most blog posts take at least 3-5 minutes to read thoroughly
  if (wordCount < 500) {
    return 3; // Minimum 3 minutes for short posts
  } else if (wordCount < 1000) {
    return 4; // 4 minutes for medium posts
  } else if (wordCount < 1500) {
    return 5; // 5 minutes for longer posts
  } else {
    // For very long content, use the calculated time but ensure it's at least 6 minutes
    return Math.max(6, readingTime);
  }
}

/**
 * Formats the reading time into a human-readable string
 * @param minutes The reading time in minutes
 * @returns A formatted string (e.g., "5 min read")
 */
export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`;
}

/**
 * Calculates and formats the reading time for a given text
 * @param text The text content to analyze
 * @param wordsPerMinute The average reading speed in words per minute (default: 200)
 * @returns A formatted reading time string
 */
export function getReadingTime(text: string, wordsPerMinute: number = 200): string {
  const minutes = calculateReadingTime(text, wordsPerMinute);
  return formatReadingTime(minutes);
} 