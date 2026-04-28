import { Hono } from "hono";
import { cors } from "hono/cors";
import { extractText } from "./extractText";
import { parseReceipt } from "./parseReceipt";

type Bindings = {
  GEMINI_API_KEY: string;
  CLOUD_VISION_KEY: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use("/*", cors());

app.post("/scan", async (c) => {
  try {
    const body = await c.req.json();
    const base64Image = body.image;

    if (!base64Image) {
      return c.json(
        { success: false, error: "No image provided in payload" },
        400,
      );
    }

    const pureBase64 = base64Image.replace(/^data:image\/[a-z]+;base64,/, "");

    const rawText = await extractText(pureBase64, c.env.CLOUD_VISION_KEY);

    const receiptObject = await parseReceipt(rawText, c.env.GEMINI_API_KEY);

    return c.json({ success: true, data: receiptObject });
  } catch (error) {
    console.error("AI Extraction Error:", error);
    return c.json(
      { success: false, error: "Failed to process the receipt image." },
      500,
    );
  }
});

export default app;
