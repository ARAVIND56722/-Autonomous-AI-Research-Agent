import requests
import feedparser

ARXIV_API_URL = "http://export.arxiv.org/api/query"


def get_arxiv_paper_details(arxiv_id: str):
    if not arxiv_id:
        raise ValueError("arXiv ID is required")

    params = {
        "id_list": arxiv_id
    }

    response = requests.get(ARXIV_API_URL, params=params, timeout=20)
    response.raise_for_status()

    feed = feedparser.parse(response.text)

    if not feed.entries:
        return None

    entry = feed.entries[0]

    authors = ", ".join(author.name for author in entry.get("authors", [])) or "Unknown Authors"
    published = entry.get("published", "")
    updated = entry.get("updated", "")

    pdf_link = ""
    for link in entry.get("links", []):
        if getattr(link, "title", "") == "pdf":
            pdf_link = link.href
            break

    if not pdf_link and "id" in entry:
        paper_id = entry.id.split("/abs/")[-1]
        pdf_link = f"https://arxiv.org/pdf/{paper_id}.pdf"

    summary = " ".join(entry.get("summary", "").split())

    categories = []
    if "tags" in entry:
        categories = [tag["term"] for tag in entry.tags]

    return {
        "arxiv_id": arxiv_id,
        "title": entry.get("title", "No Title").replace("\n", " ").strip(),
        "authors": authors,
        "published": published,
        "updated": updated,
        "summary": summary,
        "categories": categories,
        "link": entry.get("id", ""),
        "pdf_link": pdf_link,
    }