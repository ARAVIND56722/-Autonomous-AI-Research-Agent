const BASE_URL = "http://127.0.0.1:8000";

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

export async function askQuestion(query, question, paperSummary = "", paperTitle = "") {
  const response = await fetch(
    `${BASE_URL}/ask?query=${encodeURIComponent(query)}&question=${encodeURIComponent(
      question
    )}&paper_summary=${encodeURIComponent(paperSummary)}&paper_title=${encodeURIComponent(paperTitle)}`
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