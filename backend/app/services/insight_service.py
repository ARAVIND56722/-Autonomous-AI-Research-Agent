from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from app.services.paper_search import search_arxiv_papers
import json

def generate_insights(query: str = ""):
    topic = query.strip() if query.strip() else "Autonomous AI Research"
    
    # 1. Fetch papers for context
    papers = search_arxiv_papers(topic, max_results=5)
    
    # 2. Extract summaries
    summaries = []
    for p in papers:
        summaries.append(f"Title: {p['title']}\nSummary: {p['summary']}")
    
    context = "\n\n".join(summaries)
    
    try:
        # 3. Generate insights using LLM with structured output
        llm = ChatGoogleGenerativeAI(model="gemini-3.6-flash", temperature=0.7)
        
        prompt = ChatPromptTemplate.from_messages([
            ("system", "You are an expert AI research analyst. Based on the provided recent research paper summaries about '{topic}', generate insights. "
                       "Output MUST be raw JSON format with exactly these keys: 'topic', 'key_insight', 'research_trend', 'research_gap', 'why_it_matters'. "
                       "Do not include markdown code blocks, just raw JSON."),
            ("user", "Paper Summaries:\n{context}")
        ])
        
        chain = prompt | llm
        response = chain.invoke({
            "topic": topic,
            "context": context
        })
        
        content = response.content

        if isinstance(content, list):
            parts = []
            for block in content:
               if isinstance(block, dict):
                   text = block.get("text")
                   if text:
                      parts.append(text)
               elif isinstance(block, str):
                    parts.append(block)
            content = "".join(parts)

        content = content.strip()
        if content.startswith("```json"):
            content = content[7:-3]
        if content.startswith("```"):
            content = content[3:-3]
        
        insights = json.loads(content)
        # ensure topic is set
        insights["topic"] = topic
        return insights
    except Exception as e:
        # Fallback if LLM or JSON parsing fails
        print(f"Error generating insights from LLM: {e}")
        return {
            "topic": topic,
            "key_insight": f"Recent papers discuss various advancements in {topic}.",
            "research_trend": "There is a strong focus on applying new methods.",
            "research_gap": "Further research is needed to unify these approaches.",
            "why_it_matters": "These developments are crucial for the field."
        }