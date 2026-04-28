import fs from "fs";

async function testScanner() {
  try {
    console.log("📸 Loading image...");
    // 1. Read the image file from your computer
    const imageBuffer = fs.readFileSync("./receipt-example.jpg");

    // 2. Convert it to a Base64 string
    const base64Image = imageBuffer.toString("base64");

    console.log("🚀 Sending to local Cloudflare Worker...");
    const startTime = Date.now();

    // 3. Fire it at your local emulator
    const response = await fetch("http://localhost:8787/scan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: base64Image }),
    });

    // 4. Parse and display the result
    const data = await response.json();
    const duration = (Date.now() - startTime) / 1000;

    console.log(`\n✅ Response received in ${duration} seconds:\n`);

    // Using console.dir with depth: null so it prints the entire nested JSON object
    console.dir(data, { depth: null, colors: true });
  } catch (error) {
    console.error("❌ Test failed:", error);
  }
}

testScanner();
