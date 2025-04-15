import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { crawlUrlAndSave } from './crawl.js';
import { scrapeUrlAndSave, scrapeBatchAndSave } from './scrape.js';

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Basic home route
app.get('/', (req, res) => {
  res.json({
    name: 'Firecrawl Server API',
    version: '1.0.0',
    endpoints: [
      { path: '/scrape', method: 'POST', description: 'Scrape a single URL' },
      { path: '/scrape-batch', method: 'POST', description: 'Scrape multiple URLs' },
      { path: '/crawl', method: 'POST', description: 'Crawl a website and scrape all pages' }
    ]
  });
});

// POST endpoint to scrape a single URL
app.post('/scrape', async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ 
        success: false, 
        error: 'No URL provided. Please provide a URL in the request body.' 
      });
    }
    
    try {
      const result = await scrapeUrlAndSave(url);
      return res.status(200).json({
        success: true,
        filePath: result.filePath,
        url: result.url
      });
    } catch (error) {
      console.error(`Failed to scrape ${url}:`, error);
      return res.status(500).json({
        success: false,
        error: `Failed to scrape: ${error.message}`
      });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return res.status(500).json({
      success: false,
      error: `Internal server error: ${error.message}`
    });
  }
});

// POST endpoint to scrape multiple URLs
app.post('/scrape-batch', async (req, res) => {
  try {
    const { urls } = req.body;
    
    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'Please provide an array of URLs in the request body.' 
      });
    }
    
    try {
      const results = await scrapeBatchAndSave(urls);
      return res.status(200).json(results);
    } catch (error) {
      console.error('Error processing batch request:', error);
      return res.status(500).json({
        success: false,
        error: `Internal server error: ${error.message}`
      });
    }
  } catch (error) {
    console.error('Error processing batch request:', error);
    return res.status(500).json({
      success: false,
      error: `Internal server error: ${error.message}`
    });
  }
});

// POST endpoint to crawl a website
app.post('/crawl', async (req, res) => {
  try {
    const { url, limit } = req.body;
    
    if (!url) {
      return res.status(400).json({ 
        success: false, 
        error: 'No URL provided. Please provide a URL in the request body.' 
      });
    }
    
    console.log(`Received request to crawl URL: ${url} with limit: ${limit || 100}`);
    
    try {
      const crawlResults = await crawlUrlAndSave(url, { 
        limit: limit || 100 
      });
      
      return res.status(200).json({
        success: true,
        url,
        totalPages: crawlResults.totalPages,
        results: crawlResults.results
      });
    } catch (error) {
      console.error(`Failed to crawl ${url}:`, error);
      return res.status(500).json({
        success: false,
        error: `Failed to crawl: ${error.message}`
      });
    }
  } catch (error) {
    console.error('Error processing crawl request:', error);
    return res.status(500).json({
      success: false,
      error: `Internal server error: ${error.message}`
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Firecrawl server listening on port ${PORT}`);
});