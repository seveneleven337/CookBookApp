from app import get_recipe_by_id, score_recipe, recommend_recipes, format_recipe


def test_get_recipe_by_id_found():
    recipe = get_recipe_by_id("53030")
    assert recipe is not None
    assert recipe["idMeal"] == "53030"


def test_get_recipe_by_id_not_found():
    recipe = get_recipe_by_id("999999")
    assert recipe is None


def test_score_recipe_same_recipe_is_excluded():
    recipe = {
        "idMeal": "1",
        "strCategory": "Chicken",
        "strArea": "Japanese",
        "strTags": "Asian,Chicken"
    }

    assert score_recipe(recipe, recipe) == -1


def test_score_recipe_same_category_scores_points():
    source = {
        "idMeal": "1",
        "strCategory": "Chicken",
        "strArea": "Japanese",
        "strTags": "Asian,Chicken"
    }

    candidate = {
        "idMeal": "2",
        "strCategory": "Chicken",
        "strArea": "American",
        "strTags": "Chicken,Dinner"
    }

    assert score_recipe(source, candidate) > 0


def test_format_recipe_returns_expected_fields():
    recipe = {
        "idMeal": "1",
        "strMeal": "Test Meal",
        "strCategory": "Chicken",
        "strArea": "Japanese",
        "strInstructions": "Cook it.",
        "strMealThumb": "https://example.com/image.jpg",
        "strTags": "Chicken,Asian",
        "extraField": "should not appear"
    }

    formatted = format_recipe(recipe)

    assert set(formatted.keys()) == {
        "idMeal",
        "strMeal",
        "strCategory",
        "strArea",
        "strInstructions",
        "strMealThumb",
        "strTags",
    }


def test_recommend_recipes_returns_max_6():
    recommendations = recommend_recipes("53030", limit=6)
    assert len(recommendations) <= 6


def test_recommend_recipes_returns_list():
    recommendations = recommend_recipes("53030", limit=6)
    assert isinstance(recommendations, list)