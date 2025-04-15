import FirecrawlApp from '@mendable/firecrawl-js';
import { saveMarkdownFile } from './utils.js';

// Get API key from environment variables
const apiKey = process.env.FIRECRAWL_API_KEY;
if (!apiKey) {
  throw new Error('FIRECRAWL_API_KEY not found in environment variables');
}

const app = new FirecrawlApp({apiKey});

/**
 * Scrapes a single URL and saves it as a markdown file
 * @param {string} url - The URL to scrape
 * @param {Object} options - Scrape options
 * @returns {Promise<Object>} - Scrape results
 */
export async function scrapeUrlAndSave(url, options = {}) {
  console.log(`Scraping URL: ${url}`);
  
  const scrapeResponse = await app.scrapeUrl(url, {
    formats: ['markdown'],
    ...options
  });
  
  if (!scrapeResponse.success) {
    throw new Error(`Failed to scrape: ${scrapeResponse.error}`);
  }
  
  const responseUrl = scrapeResponse.url || url.replace(/^https?:\/\//, '');
  
  const filePath = await saveMarkdownFile(responseUrl, scrapeResponse.markdown);
  return {
    success: true,
    filePath,
    url: responseUrl,
    markdown: scrapeResponse.markdown
  };
}

/**
 * Scrapes multiple URLs and saves them as markdown files
 * @param {string[]} urls - The URLs to scrape
 * @param {Object} options - Scrape options
 * @returns {Promise<Object[]>} - Array of scrape results
 */
export async function scrapeBatchAndSave(urls, options = {}) {
  console.log(`Batch scraping ${urls.length} URLs`);
  
  const results = [];
  
  for (const url of urls) {
    try {
      const result = await scrapeUrlAndSave(url, options);
      results.push({
        url,
        success: true,
        filePath: result.filePath
      });
    } catch (error) {
      console.error(`Error processing URL ${url}:`, error);
      results.push({
        url,
        success: false,
        error: error.message
      });
    }
  }
  
  return {
    success: true,
    results
  };
}