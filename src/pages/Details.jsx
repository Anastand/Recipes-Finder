import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMealById } from "../services/api";

function Details() {
  const [meal, setMeal] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { mealID } = useParams();

  useEffect(() => {
    const fetchMealInfo = async () => {
      try {
        setLoading(true);
        const result = await getMealById(mealID);
        setMeal(result);
      } catch (err) {
        setError(err.message || "Something went wrong");
        console.error(`we had an error: ${err}`);
      } finally {
        setLoading(false);
      }
    };
    fetchMealInfo();
  }, [mealID]);

  if (!meal) {
    return (
      <div className="text-center mt-10 text-gray-400">
        No meal details found.
      </div>
    );
  }

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({ ingredient, measure });
    }
  }

  return (
    <>
      {loading && (
        <div className="flex justify-center items-center mt-10">
          <p className="text-blue-600 text-lg font-semibold">Loading...</p>
        </div>
      )}

      {error && (
        <div className="flex justify-center items-center mt-10">
          <p className="text-center mt-10 text-red-600">
            We had an error: {error}, please reload the page.
          </p>
        </div>
      )}

      {meal && (
        <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-[#1a1a1a] to-[#222222] rounded-xl shadow-xl border border-yellow-600 text-white">
          {/* Title */}
          <h1 className="text-4xl font-extrabold mb-8 text-yellow-400 text-center md:text-left">
            {meal.strMeal}
          </h1>

          {/* Image + Badges */}
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full max-w-sm rounded-lg shadow-lg object-cover border border-yellow-700"
            />

            <div className="flex flex-col justify-start gap-6 flex-1">
              {/* Badges */}
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-1 bg-[#2a2a2a] border border-yellow-600 rounded-full text-yellow-300 font-medium shadow-sm">
                  🍽 {meal.strCategory}
                </span>
                <span className="px-4 py-1 bg-[#2a2a2a] border border-yellow-600 rounded-full text-yellow-300 font-medium shadow-sm">
                  🌍 {meal.strArea}
                </span>
              </div>

              {/* Ingredients */}
              <div>
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                  Ingredients
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ingredients.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center bg-[#2a2a2a] p-3 rounded-lg border border-yellow-700 shadow-sm"
                    >
                      <span className="font-semibold">{item.ingredient}</span>
                      <span className="text-gray-400">{item.measure}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <hr className="border-yellow-700 mb-8" />
          <p className="leading-relaxed text-gray-300 text-base md:text-lg max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-600 scrollbar-track-gray-900">
            {meal.strInstructions}
          </p>
          {meal.strYoutube && (
            <div className="mt-10">
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                Watch the Recipe
              </h2>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  className="w-full h-[400px] rounded-lg border border-yellow-700 shadow-lg"
                  src={`https://www.youtube.com/embed/${
                    meal.strYoutube.split("v=")[1]
                  }`}
                  title={meal.strMeal}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Details;
