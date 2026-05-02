from crewai import Agent
import os

# Pass the model name string to crewai.Agent to satisfy its expected llm type
llm = os.getenv("GOOGLE_MODEL", "gemini-2.5-flash")

def get_agents():
    classifier = Agent(
        role="Classifier",
        goal="Classify finance queries",
        backstory="Only classify. No extra explanation.",
        llm=llm,
        verbose=True
    )

    extractor = Agent(
        role="Extractor",
        goal="Extract financial data in JSON",
        backstory="Only extract structured data. No explanation.",
        llm=llm
    )

    decision = Agent(
        role="Decision Maker",
        goal="Determine risk and action",
        backstory="Only output JSON decisions.",
        llm="gemini-2.5-flash"
    )

    validator = Agent(
        role="Validator",
        goal="Fix and validate JSON outputs",
        backstory="Strict validator. No extra text.",
        llm=llm
    )

    responder = Agent(
        role="Responder",
        goal="Generate final response",
        backstory="Professional finance assistant.",
        llm=llm
    )

    return classifier, extractor, decision, validator, responder