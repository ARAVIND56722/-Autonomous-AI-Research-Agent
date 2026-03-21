import requests
import feedparser

ARXIV_API_URL = "http://export.arxiv.org/api/query"


def search_arxiv_papers(query: str = "", max_results: int = 6):
    clean_query = query.strip() if query.strip() else "artificial intelligence"

    params = {
        "search_query": f"all:{clean_query}",
        "start": 0,
        "max_results": max_results,
        "sortBy": "relevance",
        "sortOrder": "descending",
    }

    response = requests.get(ARXIV_API_URL, params=params, timeout=20)
    response.raise_for_status()

    feed = feedparser.parse(response.text)
    papers = []

    for index, entry in enumerate(feed.entries, start=1):
        authors = ", ".join(author.name for author in entry.get("authors", [])) or "Unknown Authors"

        published = entry.get("published", "")
        year = published[:4] if published else "N/A"

        entry_id = entry.get("id", "")
        arxiv_id = entry_id.split("/abs/")[-1] if "/abs/" in entry_id else entry_id

        pdf_link = ""
        for link in entry.get("links", []):
            if getattr(link, "title", "") == "pdf":
                pdf_link = link.href
                break

        if not pdf_link and arxiv_id:
            pdf_link = f"https://arxiv.org/pdf/{arxiv_id}.pdf"

        summary = " ".join(entry.get("summary", "").split())
        if len(summary) > 300:
            summary = summary[:300] + "..."

        papers.append(
            {
                "id": index,
                "arxiv_id": arxiv_id,
                "title": entry.get("title", "No Title").replace("\n", " ").strip(),
                "authors": authors,
                "year": year,
                "source": "arXiv",
                "summary": summary,
                "link": entry_id,
                "pdf_link": pdf_link,
            }
        )

    return papers