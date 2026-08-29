from app.services.qa_service import generate_answer

if __name__ == "__main__":
    try:
        # Pass a mock arxiv id and pdf url to test the full pipeline
        print("Testing QA pipeline...")
        result = generate_answer(
            query="test", 
            question="What is this about?", 
            arxiv_id="2303.08774", # GPT-4 Technical Report
            paper_title="GPT-4 Technical Report",
            pdf_url="https://arxiv.org/pdf/2303.08774.pdf"
        )
        print("Success:")
        print(result)
    except Exception as e:
        import traceback
        traceback.print_exc()
        print(f"Error occurred: {type(e).__name__}: {e}")
