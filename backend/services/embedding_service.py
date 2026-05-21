from sentence_transformers import SentenceTransformer


# Load pretrained embedding model
model = SentenceTransformer("all-MiniLM-L6-v2")


# Create embeddings for document chunks
def create_embeddings(chunks):

    embeddings = model.encode(chunks)

    return embeddings


# Create embedding for user query
def create_query_embedding(query):

    embedding = model.encode(query)

    return embedding