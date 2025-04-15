/**
 * Represents a search result in a documentation file.
 */
export interface SearchInterface {
  /**
   * The name of the file where the search result was found.
   */
  filename: string;

  /**
   * The content of the search result.
   */
  content: string;
}
