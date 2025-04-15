import { z } from "zod";

export const GetToolSchema = {
  filename: z.string().describe("Filename of the documentation file"),
};
