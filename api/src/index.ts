import { Hono } from "hono";
import { cors } from "hono/cors";
import { extractText } from "./extractText";
import { parseReceipt } from "./parseReceipt";

type Bindings = {
  GEMINI_API_KEY: string;
  CLOUD_VISION_KEY: string;
  API_KEYS: KVNamespace;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use("/*", cors());

app.use("/api/*", async (c, next) => {
  const incomingKey = c.req.header("x-api-key");

  if (!incomingKey) {
    return c.json({ error: "Missing API Key" }, 401);
  }

  const clientName = await c.env.API_KEYS.get(incomingKey);

  if (!clientName) {
    return c.json({ error: "Unauthorized - Invalid Key" }, 401);
  }

  await next();
});

app.post("/api/scan", async (c) => {
  try {
    const body = await c.req.json();
    const base64Image = body.image;

    if (JSON.stringify(body).length > 5 * 1024 * 1024) {
      return c.json({ error: "Body too large" }, 413);
    }

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
