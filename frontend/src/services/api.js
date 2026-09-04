const BASE_URL = "https://autonomous-ai-research-agent-cixj.onrender.com";

export async function searchPapers(query) {
  const response = await fetch(
    `${BASE_URL}/search?query=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch papers");
  }

  return await response.json();
}

export async function fetchInsights(query) {
  const response = await fetch(
    `${BASE_URL}/insights?query=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch insights");
  }

  return await response.json();
}

export async function askQuestion(query, question, arxivId = "", paperTitle = "", pdfUrl = "") {
  const response = await fetch(
    `${BASE_URL}/ask?query=${encodeURIComponent(query)}&question=${encodeURIComponent(
      question
    )}&arxiv_id=${encodeURIComponent(arxivId)}&paper_title=${encodeURIComponent(paperTitle)}&pdf_url=${encodeURIComponent(pdfUrl)}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch answer");
  }

  return await response.json();
}

export async function readPaper(arxivId) {
  const response = await fetch(
    `${BASE_URL}/read?arxiv_id=${encodeURIComponent(arxivId)}`
  );

  if (!response.ok) {
    throw new Error("Failed to read paper");
  }

  return await response.json();
}