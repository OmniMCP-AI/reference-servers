import type { McpServer } from "@modelcontextprotocol/sdk";
import type { SearchInterface } from "../interfaces/search-interface.ts";
import { SearchToolsConstants } from "../constants/search-tool-constants.ts";
import { SearchToolSchema } from "../schemas/search-tool-schema.ts";

/**
 * A tool for searching content in documentation files.
 */
export class SearchTool {
  /**
   * @param basePath - The base directory path to search files in.
   * @param searchContentLines - Number of lines of context to include in search results.
   */
  constructor(
    private basePath: string,
    private searchContentLines: number = 20
  ) {}

  public addToServer(server: McpServer) {
    server.tool(
      SearchToolsConstants.TOOL_NAME,
      SearchToolsConstants.TOOL_DESCRIPTION,
      SearchToolSchema,
      async ({ query }: { query: string }) => {
        const response = await this.query(query);
        const stringifiedResponse = JSON.stringify(response, null, 2);
        return {
          content: [{ type: "text", text: stringifiedResponse }],
        };
      }
    );
  }

  private async query(text: string): Promise<SearchInterface[]> {
    const results: SearchInterface[] = [];

    for await (const filePath of this.getFilesInDataDir()) {
      // Filter out files that are not .md or .txt
      if (!filePath.endsWith(".md") && !filePath.endsWith(".txt")) {
        continue;
      }

      const fileResults = await this.searchFile(filePath, text);
      results.push(...fileResults);
    }

    return results;
  }

  private async *getFilesInDataDir(): AsyncGenerator<string> {
    for await (const dirEntry of Deno.readDir(this.basePath)) {
      if (dirEntry.isFile) {
        yield `${this.basePath}/${dirEntry.name}`;
      }
    }
  }

  private async searchFile(
    filePath: string,
    searchText: string
  ): Promise<SearchInterface[]> {
    const rawContent = await Deno.readTextFile(filePath);
    const lines = rawContent.split(/\r?\n/);
    const results: SearchInterface[] = [];

    const filteredTerms = searchText
      .split(/\s+/)
      .map((term) => term.trim().toLowerCase())
      .filter(
        (term) => term && !SearchToolsConstants.EXCLUDED_WORDS.includes(term)
      );

    if (filteredTerms.length === 0) return [];

    const filename = filePath.split("/").pop() || "unknown";

    lines.forEach((line, index) => {
      const lowerLine = line.toLowerCase();

      if (filteredTerms.some((term) => lowerLine.includes(term))) {
        const content = this.getContext(
          lines,
          index,
          this.searchContentLines
        ).join(" ");
        results.push({ filename, content });
      }
    });

    return results;
  }

  private getContext(lines: string[], index: number, range: number): string[] {
    const start = Math.max(index - range, 0);
    const end = Math.min(index + range, lines.length - 1);
    return lines.slice(start, end + 1).filter((line) => line.trim() !== "");
  }
}
