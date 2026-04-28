import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject } from "ai";
import { receiptSchema } from "./receiptSchema";
import { systemPrompt } from "./systemPrompt";

export async function parseReceipt(rawText: string, apiKey: string) {
  console.log("Starting LLM parsing...");

  const google = createGoogleGenerativeAI({
    apiKey: apiKey,
  });

  const { object } = await generateObject({
    model: google("gemini-2.5-flash-lite"),
    output: "object",
    schema: receiptSchema,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `BEGINNING OF RAW TEXT 
            
            ${rawText}
            
            END OF RAW TEXT`,
          },
        ],
      },
    ],
  });

  console.log("done");
  return object;
}
