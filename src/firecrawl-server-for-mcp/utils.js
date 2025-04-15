import fs from 'fs/promises';
import path from 'path';

/**
 * Converts a URL to a safe filename for saving as a markdown file
 * @param {string} url - The URL to convert
 * @returns {string} - The safe filename with .md extension
 */
export function urlToFilenameWithPath(url) {
  const filename = url
    .replace(/^https?:\/\//, '')  // Remove http:// or https://
    .replace(/[\/\\?%*:|"<>]/g, '-')  // Replace special characters with hyphens
    + '.md';
  const filePath = './download/' + filename;
  return filePath;
}

/**
 * Saves markdown content to a file in the download folder
 * @param {string} url - The URL source of the content
 * @param {string} markdown - The markdown content to save
 * @returns {Promise<string>} - The full absolute path where the file was saved
 */
export async function saveMarkdownFile(url, markdown) {
  const filePath = urlToFilenameWithPath(url);
  
  try {
    // Ensure the download directory exists
    await fs.mkdir('./download', { recursive: true });
    
    // Write the markdown content to file
    if(markdown) {
        await fs.writeFile(filePath, markdown, 'utf8');
        // Convert relative path to absolute path
        const absolutePath = path.resolve(filePath);
        console.log(`File saved: ${absolutePath}, ${markdown.length} bytes`);
        return absolutePath;
    } else {
        return '';
    }
  } catch (error) {
    console.error(`Failed to write file ${filePath}:`, error);
    throw error;
  }
}