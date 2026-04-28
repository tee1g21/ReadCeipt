interface VisionResponse {
  error?: {
    message: string;
    code: number;
  };
  responses?: Array<{
    fullTextAnnotation?: {
      text: string;
    };
  }>;
}

export async function extractText(base64Image: string, apiKey: string) {
  const endpoint = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

  const visionPayload = {
    requests: [
      {
        image: {
          content: base64Image,
        },
        features: [
          {
            type: "DOCUMENT_TEXT_DETECTION",
          },
        ],
      },
    ],
  };

  console.log("Starting receipt OCR...");

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(visionPayload),
  });

  const data = (await response.json()) as VisionResponse;

  if (data.error) {
    throw new Error(`Vision API Failed: ${data.error.message}`);
  }

  const extractedText = data.responses?.[0]?.fullTextAnnotation?.text || "";

  console.log("done");

  return extractedText;
}
