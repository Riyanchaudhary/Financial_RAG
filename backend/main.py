from fastapi import FastAPI

from services.pdf_loader import load_pdf_text

from services.text_chunker import chunk_text

from services.embedding_service import (
    create_embeddings,
    create_query_embedding
)

from services.vector_store import (
    store_embeddings,
    search_chunks
)
from services.llm_services import generate_response

app = FastAPI()


@app.get("/")
def home():

    return {
        "message": "Financial RAG System Running"
    }


@app.get("/read-pdf")
def read_pdf():

    try:

        text = load_pdf_text("data/NVIDIA.pdf")

        chunks = chunk_text(text)

        embeddings = create_embeddings(chunks)

        store_embeddings(chunks, embeddings)

        return {

            "message": "Embeddings stored successfully",

            "chunks_stored": len(chunks)
        }

    except Exception as e:

        return {
            "error": str(e)
        }


@app.get("/search")
def search(query: str):

    try:

        query_embedding = create_query_embedding(query)

        retrieved_chunks = search_chunks(
            query_embedding
        )

        response = generate_response(
            query,
            retrieved_chunks
        )

        return {

            "question": query,

            "retrieved_chunks": retrieved_chunks,

            "ai_response": response
        }

    except Exception as e:

        return {
            "error": str(e)
        }