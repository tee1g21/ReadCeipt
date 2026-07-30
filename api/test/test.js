import dotenv from "dotenv";
import fs from "fs";

dotenv.config({ path: "./.test.env" });

async function testScanner() {
  try {
    console.log("📸 Loading image...");

    const imageBuffer = fs.readFileSync("./non-receipt-example.jpg");

    const base64Image = imageBuffer.toString("base64");

    console.log("🚀 Sending to API...");
    const startTime = Date.now();

    const response = await fetch(process.env.API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.API_KEY,
      },
      body: JSON.stringify({ image: base64Image }),
    });

    const data = await response.json();
    const duration = (Date.now() - startTime) / 1000;

    console.log(`\n✅ Response received in ${duration} seconds:\n`);

    console.dir(data, { depth: null, colors: true });
  } catch (error) {
    console.error("❌ Test failed:", error);
  }
}

testScanner();
