from fastapi import FastAPI
import numpy as np
from keras.models import load_model
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS
origins = [
    'https://localhost',
    'https://localhost:3000'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["Content-Type"],
)

# Load the pre-trained model
model = load_model("C:/Users/gunja/Documents/DS and ML/ML/churn analysis/churn_model.h5")


@app.get('/')
async def root():
    return {"message": "Welcome to the Churn Prediction API!"}



@app.post("/predict")
async def predict(request: dict):
    try:
        # Parse the request data and convert values to appropriate types
        features = np.array([
            int(request.get("CreditScore", 0)),
            int(request.get("Geography", 0)),
            int(request.get("Gender", 0)),
            int(request.get("Age", 0)),
            int(request.get("Tenure", 0)),
            float(request.get("Balance", 0.0)),
            int(request.get("NumOfProducts", 0)),
            int(request.get("HasCrCard", 0)),
            int(request.get("IsActiveMember", 0)),
            float(request.get("EstimatedSalary", 0.0)),
            int(request.get("Complain", 0)),
            int(request.get("SatisfactionScore", 0)),  # Providing default value 0
            int(request.get("PointEarned", 0)),
            int(request.get("CardType_DIAMOND", 0)),
            int(request.get("CardType_GOLD", 0)),
            int(request.get("CardType_PLATINUM", 0)),
            int(request.get("CardType_SILVER", 0))
        ]).reshape(1, -1)  # Reshape to a 2D array
    except ValueError:
        return {"error": "Invalid data format"}

    # Perform prediction
    prediction = model.predict(features)[0]

    # Return the prediction result
    print(prediction)
    return {"prediction": int(prediction)}



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
