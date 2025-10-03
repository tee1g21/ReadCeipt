from azure.ai.vision.imageanalysis import ImageAnalysisClient
from azure.ai.vision.imageanalysis.models import VisualFeatures
from azure.core.credentials import AzureKeyCredential
from google import genai
from google.genai import types
import sys
import json 
import keys.my_keys as my_keys
import os


def parse_image(image_data : bytes) -> str: 
    
    try:
        endpoint = my_keys.VISION_ENDPOINT
        key = my_keys.VISION_KEY
    
    except KeyError:
        print("Missing environment variable 'VISION_ENDPOINT' or 'VISION_KEY'")
        print("Set them before running this sample.")
        exit()
    
    print("Parsing image...")
    client = ImageAnalysisClient(
        endpoint=endpoint,
        credential=AzureKeyCredential(key)
    )
    
    result = client.analyze(
        image_data=image_data,
        visual_features=[VisualFeatures.READ],
    )

    parsed_text = ""
    if result.read is not None:
        for line in result.read.blocks[0].lines:
            parsed_text += line.text + '\n'
    else: 
        print("Failed to parse image")
        exit()
    
    print("done")   
    return parsed_text

def interpret_text(parsed_text : str) -> dict:
    
    print("LLM interpreting image...")
    client = genai.Client(api_key=my_keys.GEMINI_API_KEY) #Client(api_key="...")

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=f"""
        Interpret this text parsed from an image of a receipt:    
        {parsed_text}""" + """

        Return the information in the following json format (with example values), if the information is not available for a specific attribute, return null for it. 

        "store_name": "Tesco Extra",
        "store_address": "123 High St, Manchester",
        "date": "2025-10-02",
        "time": "14:37",
        "receipt_id": "TXN983274",
        "items": [
          { "item_name": "Banana", "quantity": 2, "unit_price": 0.30, "total_price": 0.60 },
          { "item_name": "Milk 2L", "quantity": 1, "unit_price": 1.20, "total_price": 1.20 }
        ],
        "subtotal": 1.80,
        "tax": 0.20,
        "discounts": 0.00,
        "total": 2.00,
        "payment_method": "Visa",
        "currency": "GBP", 
        "explanation" : "..."
        Output PURE JSON syntax ONLY, so that it can be read directly as JSON. Do not include ANY markdown such as inline code formatting. 
       
        Double check that the addresses are geographically possible and that item unit price and quantities sum to the total. 
        If subtotal is not clearly stated leave it as null. 
        Look out for cancelled items, that should not be included in final items list.
        Refer to currencies as their official ISO 4217 Code
        In the explanation section explain any attributes you were unsure on. 
    """,

        config=types.GenerateContentConfig(
            thinking_config=types.ThinkingConfig(thinking_budget=0) # Disables thinking
        ),
    )

    if response.text is None: 
        print("Failed to generate Gemini Response")
        exit()
    else: 
        print("done")
        return json.loads(response.text)

def main(): 
    image_file = os.path.join("prototyping\\receipt_images", sys.argv[1])

    print("Loading image...")
    try:
        image_data : bytes
        with open(image_file, "rb") as file: 
            image_data = file.read()
        
        print("done")
    except Exception as error: 
        print("Failed to load image")
        print(error)
        exit()
    
    
    parsed_text = parse_image(image_data)
    print(parsed_text)
    
    receipt_dict = interpret_text(parsed_text)
    receipt_dict["parsed_text"] = parsed_text
    
    receipt_json = json.dumps(receipt_dict)
    output = f"prototyping\\output\\{os.path.basename(image_file).split('.')[0]}.json"
    os.makedirs(os.path.dirname(output), exist_ok=True)
    with open(output, 'w') as f: 
        f.write(receipt_json)
    
    print("Saved to", output)
    
if __name__ == "__main__": 
    main()