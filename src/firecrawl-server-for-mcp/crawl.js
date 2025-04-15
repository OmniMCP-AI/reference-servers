import FirecrawlApp from '@mendable/firecrawl-js';
import { saveMarkdownFile } from './utils.js';

// Get API key from environment variables
const apiKey = process.env.FIRECRAWL_API_KEY;
if (!apiKey) {
  throw new Error('FIRECRAWL_API_KEY not found in environment variables');
}

const app = new FirecrawlApp({apiKey});

/**
 * Crawls a URL and saves all pages as markdown files
 * @param {string} url - The URL to crawl
 * @param {Object} options - Crawl options
 * @param {number} options.limit - Maximum number of pages to crawl
 * @returns {Promise<Object>} - Crawl results
 */
export async function crawlUrlAndSave(url, options = {}) {
  console.log(`Crawling URL: ${url} with limit: ${options.limit || 100}`);

  // Crawl a website
  const crawlResponse = await app.crawlUrl(url, {
    limit: options.limit || 100,
    scrapeOptions: {
      formats: ['markdown'],
    },
    ...options
  });

  if (!crawlResponse.success) {
    throw new Error(`Failed to crawl: ${crawlResponse.error}`);
  }

  const results = [];

  // Process each page in the crawl results
  if (crawlResponse.pages && Array.isArray(crawlResponse.pages)) {
    for (const page of crawlResponse.pages) {
      if (page.url && page.markdown) {
        try {
          const filePath = await saveMarkdownFile(page.url, page.markdown);
          results.push({
            url: page.url,
            filePath,
            success: true
          });
        } catch (error) {
          console.error(`Failed to save file for ${page.url}:`, error);
          results.push({
            url: page.url,
            success: false,
            error: error.message
          });
        }
      }
    }
    console.log(`Saved ${results.filter(r => r.success).length} markdown files to the download folder`);
  } else {
    console.log('No pages found in the crawl response');
  }

  return {
    success: crawlResponse.success,
    totalPages: crawlResponse.pages?.length || 0,
    results
  };
}