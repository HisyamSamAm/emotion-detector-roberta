from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import pipeline

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the sentiment analysis model
model_name = "cardiffnlp/twitter-roberta-base-sentiment-latest"
sentiment_pipeline = pipeline("sentiment-analysis", model=model_name, return_all_scores=True)

class SentimentRequest(BaseModel):
    text: str

@app.post("/analyze-sentiment")
async def analyze_sentiment(request: SentimentRequest):
    result = sentiment_pipeline(request.text)
    # result is a list of dicts for all scores, e.g., [{'label': 'LABEL_0', 'score': 0.1}, ...]
    # Map LABEL_0 to negative, LABEL_1 to neutral, LABEL_2 to positive
    label_map = {
        'LABEL_0': 'negative',
        'LABEL_1': 'neutral',
        'LABEL_2': 'positive'
    }
    scores = {}
    for item in result[0]:  # result[0] is the list for the first (only) input
        label = label_map.get(item['label'], item['label'])
        scores[label] = item['score']
    return scores

@app.get("/")
async def root():
    return {"message": "Emotion Detector API"}