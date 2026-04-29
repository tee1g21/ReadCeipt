import fs from "fs";

async function testScanner() {
  try {
    console.log("📸 Loading image...");

    const imageBuffer = fs.readFileSync("./receipt-example-2.jpg");

    const base64Image = imageBuffer.toString("base64");

    console.log("🚀 Sending to local Cloudflare Worker...");
    const startTime = Date.now();

    const response = await fetch("http://localhost:8787/api/scan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "EXPO_TEST_KEY_123",
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
