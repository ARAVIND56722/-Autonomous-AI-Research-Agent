import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI

load_dotenv()

def test_gemini():
    try:
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key or api_key == "your_gemini_api_key_here":
            print("API key is still the default template or missing!")
            return

        print("Testing Gemini API...")
        llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash-latest", temperature=0.1)
        response = llm.invoke("Hello, how are you?")
        print("Success! Gemini says:", response.content)
    except Exception as e:
        print("Error calling Gemini API:", e)

if __name__ == "__main__":
    test_gemini()
