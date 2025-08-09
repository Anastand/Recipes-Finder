import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMealById } from "../services/api";

function Details() {
  const [meal, setMeal] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { mealID } = useParams();

  useEffect(() => {
    const fetchMealInfo = async () => {
      try {
        setLoading(true);
        const result = await getMealById(mealID);
        setMeal(result);
      } catch (error) {
        setError(error);
        console.log(`we had an error : ${error}`);
      } finally {
        setLoading(false);
      }
    };
    fetchMealInfo();
  }, [mealID]);
  {
    console.log(meal);
  }
  {
    loading && (
      <div className="flex justify-center items-center mt-10">
        <p className="text-blue-600 text-lg font-semibold">Loading...</p>
      </div>
    );
  }
  {
    error && (
      <div className="flex justify-center items-center mt-10">
        <p className="text-center mt-10 text-red-600">
          we had an error : {error}, pls reload the page
        </p>
      </div>
    );
  }
  return (
    <div className="max-w-3xl mx-auto p-8 bg-gradient-to-r from-[#1a1a1a] to-[#222222] rounded-xl shadow-xl border border-yellow-600 text-white transition-transform transform hover:scale-[1.02]">
      <h1 className="text-4xl font-extrabold mb-8 text-yellow-400 text-center md:text-left">
        {meal.strMeal}
      </h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full max-w-xs rounded-lg shadow-lg object-cover"
        />
        <div className="text-sm text-gray-400 space-y-3">
          <p>
            <span className="font-semibold text-yellow-400">Category:</span>{" "}
            {meal.strCategory}
          </p>
          <p>
            <span className="font-semibold text-yellow-400">Area:</span>{" "}
            {meal.strArea}
          </p>
        </div>
      </div>
      <hr className="border-yellow-700 mb-8" />
      <p className="leading-relaxed text-gray-300 text-base md:text-lg max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-600 scrollbar-track-gray-900">
        {meal.strInstructions}
      </p>
      {/* Optional: embed video here */}
    </div>
  );
}

export default Details;
