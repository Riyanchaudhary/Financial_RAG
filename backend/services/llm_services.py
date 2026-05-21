import os

from openai import OpenAI

from dotenv import load_dotenv


load_dotenv()


client = OpenAI(
    api_key=os.getenv("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1"
)


def generate_response(query, retrieved_chunks):

    context = "\n\n".join(
        retrieved_chunks
    )

    prompt = f"""
    You are a financial AI analyst.

    Use the financial context below
    to answer the user's question.

    Context:
    {context}

    Question:
    {query}

    Answer clearly and professionally.
    """


    response = client.chat.completions.create(

        model="llama-3.1-8b-instant",

        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],

        temperature=0.3
    )


    return response.choices[0].message.content