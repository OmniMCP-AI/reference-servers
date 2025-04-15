import { z } from "zod";

export const SearchToolSchema = {
  query: z.string().describe("Search terms only"),
};
