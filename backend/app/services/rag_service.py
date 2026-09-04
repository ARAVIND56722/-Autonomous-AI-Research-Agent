import os
import requests
import tempfile

from langchain_community.document_loaders import PyMuPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings.fastembed import FastEmbedEmbeddings


DB_DIR = os.path.join(
    os.path.dirname(os.path.dirname(os.path.dirname(__file__))),
    "data",
    "chroma_db"
)

os.makedirs(DB_DIR, exist_ok=True)


_embeddings = None
_vector_store = None


def get_vector_store():
    global _embeddings, _vector_store

    if _vector_store is None:

        print("Loading embedding model...")

        _embeddings = FastEmbedEmbeddings(
            model_name="BAAI/bge-small-en-v1.5",
            threads=1
        )

        _vector_store = Chroma(
            persist_directory=DB_DIR,
            embedding_function=_embeddings
        )

        print("Vector store initialized.")

    return _vector_store


def index_paper(arxiv_id: str, pdf_url: str):

    if not pdf_url:
        pdf_url = f"https://arxiv.org/pdf/{arxiv_id}.pdf"

    vector_store = get_vector_store()

    try:
        results = vector_store.similarity_search(
            "test",
            k=1,
            filter={"arxiv_id": arxiv_id}
        )

        if results:
            print(f"Paper {arxiv_id} already indexed.")
            return {"status": "already_indexed"}

    except Exception:
        pass

    print(f"Downloading and indexing paper {arxiv_id}...")

    temp_pdf_path = None

    try:

        with requests.get(
            pdf_url,
            stream=True,
            timeout=60
        ) as response:

            response.raise_for_status()

            with tempfile.NamedTemporaryFile(
                delete=False,
                suffix=".pdf"
            ) as temp_pdf:

                for chunk in response.iter_content(chunk_size=8192):
                    if chunk:
                        temp_pdf.write(chunk)

                temp_pdf_path = temp_pdf.name

        loader = PyMuPDFLoader(temp_pdf_path)
        documents = loader.load()

        for document in documents:
            document.metadata["arxiv_id"] = arxiv_id

        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=800,
            chunk_overlap=100
        )

        chunks = text_splitter.split_documents(documents)

        print(f"Total chunks: {len(chunks)}")

        batch_size = 5

        total_batches = (
            len(chunks) + batch_size - 1
        ) // batch_size

        for i in range(0, len(chunks), batch_size):

            batch = chunks[i:i + batch_size]

            vector_store.add_documents(batch)

            print(
                f"Indexed batch "
                f"{i // batch_size + 1}/"
                f"{total_batches}"
            )

        return {
            "status": "success",
            "chunks_indexed": len(chunks)
        }

    except Exception as e:

        print(f"Error indexing paper: {str(e)}")
        raise

    finally:

        if temp_pdf_path and os.path.exists(temp_pdf_path):
            os.remove(temp_pdf_path)
            print("Temporary PDF removed.")


def retrieve_context(
    arxiv_id: str,
    question: str,
    k: int = 4
):

    vector_store = get_vector_store()

    results = vector_store.similarity_search(
        question,
        k=k,
        filter={"arxiv_id": arxiv_id}
    )

    return [
        result.page_content
        for result in results
    ]