from pathlib import Path
import json
import os
import jwt
from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import List

app = FastAPI(
    root_path="/api/recommendation",
    docs_url="/docs",
    redoc_url=None,
    openapi_url="/openapi.json"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost", "https://cookbook.fi"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

JWT_SECRET = os.getenv("JWT_SECRET")
JWT_ALGORITHM = "HS256"

security = HTTPBearer()

file_path = Path(__file__).parent / "recipes.json"

with open(file_path, "r", encoding="utf-8") as file:
    recipes = json.load(file)

class RecipeRequest(BaseModel):
    recipe_id: str

class User(BaseModel):
    id: int
    email: str

class Recipe(BaseModel):
    idMeal: str
    strMeal: str
    strCategory: str
    strArea: str
    strInstructions: str
    strMealThumb: str
    strTags: str

class RecommendationResponse(BaseModel):
    user: User
    liked_recipe_id: str
    recommendations: List[Recipe]

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    token = credentials.credentials

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or expired token",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])

        user_id = payload.get("id")
        email = payload.get("email")

        if user_id is None or email is None:
            raise credentials_exception

        return {
            "id": user_id,
            "email": email
        }

    except jwt.InvalidTokenError:
        raise credentials_exception

def get_recipe_by_id(recipe_id):
    for recipe in recipes:
        if recipe["idMeal"] == recipe_id:
            return recipe
    return None


def score_recipe(source_recipe, candidate_recipe):
    if candidate_recipe["idMeal"] == source_recipe["idMeal"]:
        return -1

    score = 0

    if candidate_recipe.get("strCategory") == source_recipe.get("strCategory"):
        score += 3

    if candidate_recipe.get("strArea") == source_recipe.get("strArea"):
        score += 2

    source_tags = source_recipe.get("strTags", "") or ""
    candidate_tags = candidate_recipe.get("strTags", "") or ""

    source_tag_list = [tag.strip().lower() for tag in source_tags.split(",") if tag.strip()]
    candidate_tag_list = [tag.strip().lower() for tag in candidate_tags.split(",") if tag.strip()]

    shared_tags = set(source_tag_list) & set(candidate_tag_list)
    score += len(shared_tags)

    return score


def format_recipe(recipe):
    return {
        "idMeal": recipe.get("idMeal", ""),
        "strMeal": recipe.get("strMeal", ""),
        "strCategory": recipe.get("strCategory", ""),
        "strArea": recipe.get("strArea", ""),
        "strInstructions": recipe.get("strInstructions", ""),
        "strMealThumb": recipe.get("strMealThumb", ""),
        "strTags": recipe.get("strTags", "") or ""
    }


def recommend_recipes(recipe_id, limit=6):
    source_recipe = get_recipe_by_id(recipe_id)

    if source_recipe is None:
        return []

    scored_recipes = []

    for recipe in recipes:
        score = score_recipe(source_recipe, recipe)
        if score > 0:
            scored_recipes.append((score, recipe))

    scored_recipes.sort(key=lambda item: item[0], reverse=True)
    top_recipes = scored_recipes[:limit]

    return [format_recipe(recipe) for score, recipe in top_recipes]

# @app.get("/")
# def root():
#     return {"message": "Recipe recommendation API is running"}


@app.post(
    "/api/recommend",
    response_model=RecommendationResponse,
    response_model_exclude_unset=True,
    responses={
        200: {
            "content": {
                "application/json": {
                    "example": {
                        "user": {
                            "id": 1,
                            "email": "test@mail.com"
                        },
                        "liked_recipe_id": "53030",
                        "recommendations": [
                            {
                                "idMeal": "52772",
                                "strMeal": "Teriyaki Chicken",
                                "strCategory": "Chicken",
                                "strArea": "Japanese",
                                "strInstructions": "Cook...",
                                "strMealThumb": "https://...",
                                "strTags": "Asian,Chicken"
                            }
                        ]
                    }
                }
            }
        }
    }
)
def recommend(
    request: RecipeRequest,
    current_user: dict = Depends(get_current_user)
):
    source_recipe = get_recipe_by_id(request.recipe_id)

    if source_recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found")

    recommendations = recommend_recipes(request.recipe_id, limit=6)

    return RecommendationResponse(
        user=User(**current_user),
        liked_recipe_id=request.recipe_id,
        recommendations=[Recipe(**r) for r in recommendations]
    )