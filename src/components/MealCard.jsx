import React from "react";
function MealCard({ meal }) {
  const instructions = meal.strInstructions ?? "";
  const shortInstructions =
    instructions.length > 120
      ? instructions.slice(0, 140) + "..."
      : instructions;
  return (
    <div
      onClick={() => console.log(`Clicked ${meal.strMeal}`)}
      className="max-w-sm bg-[#181818] rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/30"
    >
      {/* Meal Image */}
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full h-48 object-cover"
      />

      {/* Content */}
      <div className="p-4">
        <h4 className="text-xl font-bold text-white">{meal.strMeal}</h4>
        <p className="text-sm text-gray-400">
          {meal.strCategory} • {meal.strArea}
        </p>
        <p className="mt-2 text-gray-300 text-sm">{shortInstructions}</p>
      </div>
    </div>
  );
}

export default MealCard;
