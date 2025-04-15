/**
 * Constants used by the GetTool.
 */
export class GetToolConstants {
  /**
   * The name of the get tool.
   */
  public static TOOL_NAME = "read_documentation_file";

  /**
   * A description of the get tool.
   */
  public static TOOL_DESCRIPTION =
    "Get the content of a documentation file (filename only)";

  /**
   * The input schema for the get tool.
   */
  public static TOOL_INPUT_SCHEMA = {
    filename: "Filename of the documentation file",
  };
}
