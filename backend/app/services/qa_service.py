from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from app.services.rag_service import retrieve_context, index_paper


def extract_text(response):
    content = response.content

    if isinstance(content, str):
        return content.strip()

    if isinstance(content, list):
        parts = []

        for block in content:
            if isinstance(block, dict):
                text = block.get("text")
                if text:
                    parts.append(text)
            elif isinstance(block, str):
                parts.append(block)

        return "".join(parts).strip()

    return str(content).strip()


def generate_answer(
    query: str = "",
    question: str = "",
    arxiv_id: str = "",
    paper_title: str = "",
    pdf_url: str = ""
):
    topic = query.strip() if query else "Autonomous AI Research"
    asked = question.strip() if question else "What is the main idea?"

    llm = ChatGoogleGenerativeAI(
        model="gemini-3.6-flash",
        temperature=0.2
    )

    if arxiv_id:

        index_paper(arxiv_id, pdf_url)

        context_chunks = retrieve_context(
            arxiv_id,
            asked,
            k=4
        )

        context = "\n\n---\n\n".join(context_chunks)

        prompt = ChatPromptTemplate.from_messages([
            (
                "system",
                """You are an expert AI research assistant.

Answer the question ONLY using the retrieved context from
the research paper titled "{paper_title}".

Do not use information that is not supported by the provided context.

If the answer cannot be found in the retrieved context, say:
"I cannot find the answer to that in this paper."

Provide a clear and concise answer."""
            ),
            (
                "user",
                """Retrieved paper context:

{context}

Question:
{question}"""
            )
        ])

        chain = prompt | llm

        response = chain.invoke({
            "paper_title": paper_title,
            "context": context,
            "question": asked
        })

        answer = extract_text(response)

    else:

        prompt = ChatPromptTemplate.from_messages([
            (
                "system",
                "You are an expert AI research assistant. Answer questions about {topic}."
            ),
            (
                "user",
                "{question}"
            )
        ])

        chain = prompt | llm

        response = chain.invoke({
            "topic": topic,
            "question": asked
        })

        answer = extract_text(response)

    return {
        "topic": topic,
        "question": asked,
        "paper_title": paper_title,
        "answer": answer
    }