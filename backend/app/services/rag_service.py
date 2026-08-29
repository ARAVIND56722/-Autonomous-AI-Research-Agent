import os
import requests
import tempfile
from langchain_community.document_loaders import PyMuPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_community.vectorstores import Chroma
from dotenv import load_dotenv

load_dotenv()

DB_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "data", "chroma_db")
os.makedirs(DB_DIR, exist_ok=True)

from langchain_community.embeddings.fastembed import FastEmbedEmbeddings

def get_vector_store():
    # We initialize it here to catch API key errors at runtime rather than import time
    embeddings = FastEmbedEmbeddings(model_name="BAAI/bge-small-en-v1.5", threads=1)
    return Chroma(persist_directory=DB_DIR, embedding_function=embeddings)

def index_paper(arxiv_id: str, pdf_url: str):
    """
    Downloads a paper, extracts text, chunks it, and indexes it in Chroma.
    """
    if not pdf_url:
        pdf_url = f"https://arxiv.org/pdf/{arxiv_id}.pdf"
        
    vector_store = get_vector_store()
    
    # Check if already indexed
    try:
        results = vector_store.similarity_search("test", k=1, filter={"arxiv_id": arxiv_id})
        if results:
            return {"status": "already_indexed"}
    except Exception:
        pass # Might be an empty collection or similar issue on first run

    print(f"Downloading and indexing paper {arxiv_id}...")
    response = requests.get(pdf_url, stream=True)
    response.raise_for_status()
    
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_pdf:
        for chunk in response.iter_content(chunk_size=8192):
            temp_pdf.write(chunk)
        temp_pdf_path = temp_pdf.name

    try:
        loader = PyMuPDFLoader(temp_pdf_path)
        documents = loader.load()
        
        for doc in documents:
            doc.metadata["arxiv_id"] = arxiv_id
            
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=150)
        chunks = text_splitter.split_documents(documents)
        
        # Add documents in smaller batches to prevent ONNX OOM errors
        batch_size = 30
        for i in range(0, len(chunks), batch_size):
            batch = chunks[i:i + batch_size]
            vector_store.add_documents(batch)
            print(f"Indexed batch {i//batch_size + 1}/{(len(chunks) + batch_size - 1)//batch_size}")
        
        return {"status": "success", "chunks_indexed": len(chunks)}
    finally:
        if os.path.exists(temp_pdf_path):
            os.remove(temp_pdf_path)

def retrieve_context(arxiv_id: str, question: str, k: int = 5):
    """
    Retrieves the most relevant chunks for a specific paper given a question.
    """
    vector_store = get_vector_store()
    results = vector_store.similarity_search(question, k=k, filter={"arxiv_id": arxiv_id})
    return [res.page_content for res in results]
