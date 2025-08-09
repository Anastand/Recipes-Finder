import React from "react";

function MealCard({ meal }) {
  const instructions = meal.strInstructions ?? "";
  const shortInstructions =
    instructions.length > 140
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
      <div className="p-5">
        <h4 className="text-xl font-extrabold text-yellow-400 mb-1">
          {meal.strMeal}
        </h4>
        <p className="text-sm text-gray-400 mb-3">
          <span className="font-semibold">{meal.strCategory}</span> •{" "}
          <span className="italic">{meal.strArea}</span>
        </p>
        <p className="text-gray-300 text-sm leading-relaxed">
          {shortInstructions}
        </p>
      </div>
    </div>
  );
}

export default MealCard;
