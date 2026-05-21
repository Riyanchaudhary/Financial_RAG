import chromadb

client = chromadb.PersistentClient(
    path="chroma_db"
)

collection = client.create_collection(
    name="financial_documents"
)

def store_embeddings(chunks, embeddings):

    ids = [str(i) for i in range(len(chunks))]

    collection.add(
        documents=chunks,
        embeddings=embeddings.tolist(),
        ids=ids
    )

def search_chunks(query_embedding):

    results = collection.query(
        query_embeddings=[query_embedding.tolist()],
        n_results=1
    )

    return results["documents"][0]