import type { McpServer } from "@modelcontextprotocol/sdk";
import { GetToolConstants } from "../constants/get-tool-constants.ts";
import { GetToolSchema } from "../schemas/get-tool-schema.ts";

/**
 * A tool for reading the content of documentation files.
 */
export class GetTool {
  /**
   * @param basePath - The base directory path to read files from.
   */
  constructor(private basePath: string) {}

  public addToServer(server: McpServer) {
    server.tool(
      GetToolConstants.TOOL_NAME,
      GetToolConstants.TOOL_DESCRIPTION,
      GetToolSchema,
      async ({ filename }: { filename: string }) => {
        const filePath = `${this.basePath}/${filename}`;
        const response = await this.read(filePath);
        return {
          content: [{ type: "text", text: response }],
        };
      }
    );
  }

  private async read(filePath: string): Promise<string> {
    return await Deno.readTextFile(filePath);
  }
}
