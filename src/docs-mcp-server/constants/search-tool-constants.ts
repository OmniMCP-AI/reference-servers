/**
 * Constants used by the SearchTool.
 */
export class SearchToolsConstants {
  /**
   * The name of the search tool.
   */
  public static TOOL_NAME = "search_in_documentation_files";

  /**
   * A description of the search tool.
   */
  public static TOOL_DESCRIPTION =
    "Search in the documentation files (search terms only, avoid natural language)";

  /**
   * Words to exclude from search queries.
   */
  public static EXCLUDED_WORDS = [
    "the",
    "a",
    "an",
    "is",
    "are",
    "was",
    "were",
    "be",
    "being",
    "been",
    "have",
    "has",
    "had",
    "do",
    "does",
    "did",
    "doing",
    "un",
    "el",
    "la",
  ];
}
