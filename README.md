# 🧠 Autonomous AI Research Agent

> **An intelligent GenAI-powered research assistant that searches arXiv papers, processes research PDFs, retrieves relevant information using RAG, and generates context-grounded answers using a real LLM.**

---

## 📌 Overview

**Autonomous AI Research Agent** is a full-stack GenAI application designed to help users **discover, understand, and interact with research papers efficiently**.

Instead of manually reading lengthy research papers, users can search for a topic, select a research paper, and ask questions about it.

The system retrieves real research papers from **arXiv**, downloads and processes the selected paper's PDF, splits the content into meaningful chunks, converts those chunks into vector embeddings, stores them in a **Chroma vector database**, retrieves the most relevant sections for a user's question, and finally uses **Google Gemini LLM** to generate a context-grounded answer.

The project demonstrates the practical implementation of:

* Retrieval-Augmented Generation (RAG)
* Large Language Models (LLMs)
* Semantic Search
* Vector Databases
* PDF Document Processing
* AI-assisted Question Answering
* Full-stack AI application development

---

# 🚨 Problem Statement

Research papers contain large amounts of technical information and can be difficult and time-consuming to understand.

Traditional research workflows require users to:

1. Search for relevant papers.
2. Open multiple research papers.
3. Download and read lengthy PDFs.
4. Search manually for relevant information.
5. Understand technical concepts from different sections.
6. Compare information and identify important insights.

This process becomes inefficient when a user needs to analyze multiple papers or quickly find a specific answer.

### Problem

> **How can we build an intelligent research assistant that can retrieve relevant research papers, understand their content, and answer user questions using the actual information contained in those papers?**

---

# 💡 Proposed Solution

The Autonomous AI Research Agent addresses this problem by combining **arXiv search, document processing, RAG, vector search, and LLM-based generation** into a single application.

The system follows this process:

```text
User Query
     ↓
Search arXiv
     ↓
Select Research Paper
     ↓
Download PDF
     ↓
Extract Text
     ↓
Split Text into Chunks
     ↓
Generate Embeddings
     ↓
Store in Chroma Vector Database
     ↓
Retrieve Relevant Chunks
     ↓
Send Context + Question to Gemini LLM
     ↓
Generate Context-Grounded Answer
```

This allows the application to generate answers dynamically instead of relying on predefined or hard-coded responses.

---

# 🎯 Objectives

The main objectives of this project are:

* To build an intelligent research-paper assistant.
* To retrieve real research papers from arXiv.
* To process research-paper PDFs automatically.
* To implement a real RAG pipeline.
* To perform semantic similarity-based retrieval.
* To use a vector database for document retrieval.
* To integrate a real Large Language Model.
* To generate answers dynamically from research-paper context.
* To provide an easy-to-use interface for researchers and students.
* To demonstrate practical GenAI and full-stack development skills.

---

# ✨ Key Features

## 🔍 1. Research Paper Search

Search for research papers using the **arXiv API**.

Users can enter topics such as:

```text
Artificial Intelligence
RAG
Blockchain
Computer Vision
Large Language Models
Transformers
```

The system retrieves real research papers matching the query.

---

## 📄 2. Research Paper Reading

Users can select a paper and view important information including:

* Paper title
* Authors
* Abstract
* arXiv ID
* PDF information

The application can also download the selected paper PDF for deeper processing.

---

## 🧠 3. Real RAG Pipeline

The project implements a real **Retrieval-Augmented Generation pipeline**.

The selected PDF is:

```text
PDF
 ↓
Text Extraction
 ↓
Text Chunking
 ↓
Embedding Generation
 ↓
Vector Storage
 ↓
Semantic Retrieval
 ↓
LLM Generation
```

Instead of asking the LLM to answer using only its general knowledge, the system first retrieves relevant information from the selected research paper.

---

## 🔢 4. Local Embeddings

The project uses:

```text
BAAI/bge-small-en-v1.5
```

through **FastEmbed** to convert document chunks into numerical vector representations.

These embeddings allow the system to understand semantic similarity between:

```text
User Question
       ↕
Research Paper Chunks
```

---

## 🗄️ 5. Chroma Vector Database

The generated embeddings are stored in **Chroma**.

When a user asks a question, semantic similarity search is performed to retrieve the most relevant chunks from the selected paper.

The retrieval process uses:

```python
similarity_search(question, k=4)
```

This ensures that the LLM receives relevant paper content instead of the entire document.

---

## 🤖 6. Real Gemini LLM

The project uses **Google Gemini** for dynamic answer generation.

The current LLM integration uses:

```text
Gemini 3.6 Flash
```

The LLM receives:

```text
Research Paper Context
        +
User Question
        ↓
Gemini LLM
        ↓
Generated Answer
```

Therefore, answers are generated dynamically rather than being predefined in the source code.

---

## ❓ 7. Context-Grounded Question Answering

Users can ask questions such as:

```text
What problem is the author trying to solve?

What is the main contribution of this paper?

Explain the methodology used in this paper.

What are the important findings?

Explain this paper like I am a beginner.
```

The system retrieves relevant sections from the paper and uses them as context for the Gemini LLM.

If the required information cannot be found in the retrieved context, the system can indicate that the answer could not be found in the paper.

---

## 💡 8. AI-Generated Research Insights

The application can generate research insights based on a research topic and relevant paper summaries.

The generated insights can include:

* Key Insight
* Research Trend
* Research Gap
* Why It Matters

These insights are generated using the Gemini LLM.

---

# 🏗️ System Architecture

```text
                         ┌─────────────────────┐
                         │       USER          │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   React Frontend    │
                         │   Vite + Tailwind   │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │    FastAPI Backend  │
                         └──────────┬──────────┘
                                    │
                 ┌──────────────────┼──────────────────┐
                 │                  │                  │
                 ▼                  ▼                  ▼
          ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
          │ arXiv API   │    │ PDF Reader  │    │ Gemini LLM  │
          └─────────────┘    └──────┬──────┘    └──────▲──────┘
                                    │                  │
                                    ▼                  │
                             ┌─────────────┐           │
                             │ Text Chunking│           │
                             └──────┬──────┘           │
                                    │                  │
                                    ▼                  │
                             ┌─────────────┐           │
                             │  Embeddings │           │
                             │ FastEmbed   │           │
                             └──────┬──────┘           │
                                    │                  │
                                    ▼                  │
                             ┌─────────────┐           │
                             │   Chroma    │           │
                             │Vector Store │           │
                             └──────┬──────┘           │
                                    │                  │
                                    ▼                  │
                             Relevant Chunks ──────────┘
```

---

# 🔄 RAG Workflow

The complete RAG workflow works as follows:

### Step 1 — User Searches

The user enters a research topic.

Example:

```text
RAG
```

---

### Step 2 — arXiv Retrieval

The FastAPI backend sends the search request to the arXiv API.

The system receives relevant research papers.

---

### Step 3 — Paper Selection

The user selects a research paper.

For example:

```text
RAG-Star: Enhancing Deliberative Reasoning with Retrieval
Augmented Verification and Refinement
```

---

### Step 4 — PDF Download

The backend downloads the research paper PDF from arXiv.

---

### Step 5 — Text Extraction

The PDF is processed using **PyMuPDF**.

The textual content is extracted from the research paper.

---

### Step 6 — Chunking

The extracted text is divided into smaller chunks using:

```text
RecursiveCharacterTextSplitter
```

Current configuration:

```text
Chunk Size: 1000
Chunk Overlap: 150
```

Chunking makes semantic retrieval more effective.

---

### Step 7 — Embedding Generation

Each chunk is converted into an embedding vector using:

```text
BAAI/bge-small-en-v1.5
```

through FastEmbed.

---

### Step 8 — Vector Storage

The embeddings are stored in:

```text
Chroma Vector Database
```

Each chunk is associated with metadata such as the arXiv ID.

---

### Step 9 — Question Retrieval

When the user asks a question, the question is converted into a semantic representation and Chroma searches for the most relevant paper chunks.

For example:

```text
Question:
"What problem does the author solve?"

        ↓

Semantic Search

        ↓

Top Relevant Chunks
```

---

### Step 10 — LLM Generation

The retrieved chunks are combined with the user's question and sent to Gemini.

Conceptually:

```text
System Instructions
        +
Retrieved Context
        +
User Question
        ↓
Gemini LLM
        ↓
Generated Answer
```

---

### Step 11 — Answer Display

The generated answer is returned through FastAPI and displayed in the React frontend.

---

# 🤖 Agent Workflow

The current application follows an **agent-style multi-step research workflow**:

```text
Search
  ↓
Discover Papers
  ↓
Select Paper
  ↓
Read Paper
  ↓
Process Document
  ↓
Retrieve Relevant Information
  ↓
Generate Insights
  ↓
Answer Questions
```

This provides the foundation for future autonomous agent capabilities such as:

* Dynamic tool selection
* Multi-step planning
* Multi-paper research
* Research task decomposition
* Automatic source selection
* Iterative retrieval and verification

---

# 🧰 Technology Stack

## Frontend

* React
* Vite
* Tailwind CSS
* Lucide Icons
* JavaScript

## Backend

* Python
* FastAPI
* Uvicorn

## AI / GenAI

* Google Gemini
* Gemini 3.6 Flash
* LangChain
* Retrieval-Augmented Generation (RAG)
* Prompt-based LLM generation

## Document Processing

* PyMuPDF
* RecursiveCharacterTextSplitter

## Embeddings

* FastEmbed
* BAAI/bge-small-en-v1.5

## Vector Database

* Chroma

## Research Data

* arXiv API

## Development Tools

* Git
* GitHub
* REST APIs
* Environment Variables

---

# 📁 Project Structure

```text
Autonomous-AI-Research-Agent/
│
├── backend/
│   │
│   ├── app/
│   │   ├── routes/
│   │   │   ├── ask.py
│   │   │   ├── insights.py
│   │   │   ├── read.py
│   │   │   └── search.py
│   │   │
│   │   ├── services/
│   │   │   ├── qa_service.py
│   │   │   ├── rag_service.py
│   │   │   ├── insights_service.py
│   │   │   └── paper_search.py
│   │   │
│   │   └── main.py
│   │
│   ├── data/
│   │   └── chroma_db/
│   │
│   ├── .env
│   ├── requirements.txt
│   └── ...
│
├── frontend/
│   │
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── QuestionAnswer.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

> **Note:** `.env`, generated vector database files, `node_modules`, and Python cache files should not be committed to GitHub.

---

# 🔌 Backend API Endpoints

The FastAPI backend provides several endpoints.

## Search Papers

```http
GET /search?query={topic}
```

Example:

```text
/search?query=artificial intelligence
```

Returns relevant arXiv papers.

---

## Read Paper

```http
GET /read?arxiv_id={arxiv_id}
```

Retrieves detailed information about a selected research paper.

---

## Generate Insights

```http
GET /insights?query={topic}
```

Generates AI-based research insights for the requested topic.

---

## Ask Question

```http
GET /ask
```

Parameters include:

```text
query
question
arxiv_id
paper_title
pdf_url
```

Example:

```text
/ask?query=RAG
     &question=What is the main contribution?
     &arxiv_id=...
     &paper_title=...
     &pdf_url=...
```

The endpoint:

1. Ensures the paper is indexed.
2. Retrieves relevant chunks.
3. Builds the LLM prompt.
4. Sends the context to Gemini.
5. Returns the generated answer.

---

# ⚙️ Installation

## 1. Clone the Repository

```bash
git clone https://github.com/ARAVIND56722/-Autonomous-AI-Research-Agent.git
```

```bash
cd -Autonomous-AI-Research-Agent
```

---

# 🐍 Backend Setup

Navigate to the backend:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate it on Windows:

```powershell
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

---

# 🔑 Environment Variables

Create:

```text
backend/.env
```

Add your Gemini API key:

```env
GEMINI_API_KEY=API_KEY
```

### ⚠️ Security

Never commit your `.env` file to GitHub.

The `.gitignore` should contain:

```gitignore
.env
__pycache__/
*.pyc
venv/
.venv/
node_modules/
data/chroma_db/
```

---

# 🚀 Run the Backend

From the `backend` directory:

```bash
uvicorn app.main:app --reload
```

The backend will run at:

```text
http://127.0.0.1:8000
```

API documentation is available at:

```text
http://127.0.0.1:8000/docs
```

---

# ⚛️ Frontend Setup

Open another terminal.

Navigate to:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

# 🖥️ Application Workflow

```text
┌──────────────────────────────┐
│        Search Research       │
│            Papers             │
└──────────────┬───────────────┘
               ↓
┌──────────────────────────────┐
│       Select a Paper         │
└──────────────┬───────────────┘
               ↓
┌──────────────────────────────┐
│       Read Paper Details     │
└──────────────┬───────────────┘
               ↓
┌──────────────────────────────┐
│      Generate AI Insights    │
└──────────────┬───────────────┘
               ↓
┌──────────────────────────────┐
│        Ask AI Questions      │
└──────────────┬───────────────┘
               ↓
┌──────────────────────────────┐
│       RAG Retrieval           │
└──────────────┬───────────────┘
               ↓
┌──────────────────────────────┐
│       Gemini LLM Answer       │
└──────────────────────────────┘
```

---

# 📸 Application Screenshots

##  Research Dashboard

<img width="1891" height="915" alt="image" src="https://github.com/user-attachments/assets/7f70b212-31fc-4760-bdb0-cac1b489e450" />

<img width="1882" height="906" alt="image" src="https://github.com/user-attachments/assets/48535a5b-c3ce-4a8f-8e26-977dd15112b8" />

---

## 🔍 Research Paper Search

<img width="1722" height="832" alt="image" src="https://github.com/user-attachments/assets/33303ac7-b69c-42be-ac02-0db65d4626ad" />

<img width="1853" height="918" alt="image" src="https://github.com/user-attachments/assets/e15494ac-77fd-4e08-b3cd-8d3f9d9de44e" />

---

## 📄 Paper Details

<img width="1853" height="918" alt="image" src="https://github.com/user-attachments/assets/e15494ac-77fd-4e08-b3cd-8d3f9d9de44e" />

---
## 💡 AI Research Insights

<img width="1850" height="877" alt="image" src="https://github.com/user-attachments/assets/1d008e85-ad4e-405f-a9b5-4c37aab865e5" />

---

## ❓ RAG-Based Question Answering

<img width="1888" height="917" alt="image" src="https://github.com/user-attachments/assets/a458e52e-cd5b-42f6-8baf-096d0e2c8869" />

---

# 🔐 Security Considerations

The project uses an API key for Gemini access.

The API key should:

* Be stored in `.env`.
* Never be hard-coded into Python source files.
* Never be committed to GitHub.
* Never be exposed in the frontend.
* Never be shared publicly.

The frontend communicates with the FastAPI backend, while the backend handles communication with the Gemini API.

---

# 📈 Advantages

### ⚡ Faster Research

Users can quickly obtain information from research papers without manually searching through every page.

### 🧠 Context-Aware Answers

The LLM receives relevant information retrieved from the selected paper.

### 🔎 Semantic Search

The system retrieves information based on meaning rather than simple keyword matching.

### 🤖 Dynamic Generation

Answers are generated dynamically using the Gemini LLM.

### 📚 Research-Focused

The system is designed specifically for interacting with research papers.

### 💻 Full-Stack Implementation

The project combines frontend, backend, APIs, vector search, document processing, and GenAI.

---

# ⚠️ Current Limitations

The current implementation has some limitations:

* Retrieval is primarily focused on a selected paper.
* The system currently processes extracted PDF text rather than understanding every visual element of a paper.
* Tables, figures, mathematical equations, and images may require specialized processing.
* Multi-paper reasoning is not yet fully implemented.
* Advanced autonomous planning is not yet implemented.
* Vector retrieval quality depends on document chunking and embedding quality.
* Gemini API availability and quota depend on the configured Google AI project.

---

# 🔮 Future Enhancements

## 📚 Multi-Paper RAG

Allow users to select multiple papers and ask questions across all of them.

```text
Paper A ─┐
Paper B ─┼──→ Vector Database ──→ LLM
Paper C ─┘
```

---

## 🔗 Source Citations

Display the exact paper page, section, or retrieved chunk used to generate each answer.

Example:

```text
Answer:
...

Sources:
📄 Page 4
📄 Page 7
📄 Section 3.2
```

---

## 📊 Paper Comparison

Allow users to compare multiple research papers automatically.

```text
Paper A
   +
Paper B
   ↓
AI Comparison
   ↓
Methodology
Advantages
Limitations
Findings
Research Gap
```

---

## 🧮 Better Document Understanding

Improve processing of:

* Tables
* Figures
* Equations
* Images
* Captions
* References

---

# 🏆 What This Project Demonstrates

This project demonstrates practical knowledge of:

```text
Artificial Intelligence
        ↓
Generative AI
        ↓
Large Language Models
        ↓
RAG
        ↓
Embeddings
        ↓
Vector Databases
        ↓
Semantic Search
        ↓
PDF Processing
        ↓
FastAPI
        ↓
React
        ↓
Full-Stack AI Development
```

---

# 🎓 Learning Outcomes

Through this project, the following concepts were implemented and explored:

* How LLM-powered applications work.
* How RAG reduces dependence on the LLM's general knowledge.
* How documents are converted into embeddings.
* How vector databases perform semantic retrieval.
* How retrieved context is provided to an LLM.
* How FastAPI can be used to build AI APIs.
* How React can communicate with an AI backend.
* How external APIs can be integrated into AI applications.
* How research documents can be processed automatically.

---

# 👨‍💻 Author

**Aravind**

B.Tech Artificial Intelligence and Data Science

---

# ⭐ Project Highlights

```text
🔍 Real arXiv Research Paper Search
📄 PDF Processing
🧩 Text Chunking
🔢 Local Semantic Embeddings
🗄️ Chroma Vector Database
🧠 Real RAG Pipeline
🤖 Gemini LLM
❓ Context-Grounded Q&A
💡 AI Research Insights
⚡ FastAPI Backend
⚛️ React Frontend
🎨 Modern Research UI
```

---

# ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.
