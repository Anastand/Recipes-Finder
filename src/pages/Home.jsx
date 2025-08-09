import { useState, useEffect } from "react";
import { getAllMeals, searchByMealName } from "../services/api";
import MealCard from "../components/MealCard";

function Home() {
  const [mealData, setMealData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allMeals, setAllMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [validsearch, setvalidsearch] = useState(false);
  const [lastsearchTerm, setlastsearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedcategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
      .then((response) => response.json())
      .then((data) => setCategory(data.meals))
      .catch((err) => setError(err));
  }, []);

  useEffect(() => {
    if (!selectedcategory) return;
    fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedcategory}`
    )
      .then((response) => response.json())
      .then((data) => {
        setvalidsearch(false);
        setAllMeals(data.meals);
      });
  }, [selectedcategory]);

  useEffect(() => {
    setLoading(true);
    const getAllMealsFunc = async () => {
      try {
        const result = await getAllMeals();
        setAllMeals(result);
      } catch (error) {
        setError(error);
        console.log("error is " + error);
      } finally {
        setLoading(false);
      }
    };
    getAllMealsFunc();
  }, []);

  const handlevalidSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setvalidsearch(false);
      setMealData([]);
      return;
    }
    handleSearch();
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const currentsearch = searchTerm;
      const responseData = await searchByMealName(currentsearch);
      setlastsearchTerm(currentsearch);

      if (!responseData.meals) {
        setMealData(null);
        setvalidsearch(true);
        return;
      }

      setMealData(responseData.meals[0]);
      setvalidsearch(true);
      setSearchTerm("");
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
      setvalidsearch(true);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }
    const filtered = allMeals.filter((meals) =>
      meals.strMeal.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered);
  };

  return (
    <div className="px-4 sm:px-8 py-6">
      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
        {/* Category Dropdown */}
        <select
          value={selectedcategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 w-full md:w-auto bg-[#181818] text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <option value="">All Categories</option>
          {category.map((cat) => (
            <option key={cat.strCategory} value={cat.strCategory}>
              {cat.strCategory}
            </option>
          ))}
        </select>

        {/* Search */}
        <form
          onSubmit={handlevalidSearch}
          className="relative w-full md:w-64 flex"
        >
          <input
            type="text"
            placeholder="Search Meal"
            value={searchTerm}
            onChange={handleInputChange}
            className="flex-1 px-4 py-2 rounded-l-md bg-[#181818] text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 bg-yellow-500 hover:bg-yellow-600 hover:text-gray-800 text-black font-semibold rounded-r-md disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Search
          </button>

          {suggestions.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-[#181818] border border-gray-700 rounded-b-md shadow-lg z-10">
              {suggestions.map((meal) => (
                <li
                  key={meal.idMeal}
                  onClick={() => {
                    setSearchTerm(meal.strMeal);
                    setSuggestions([]);
                    handleSearch();
                  }}
                  className="px-4 py-2 cursor-pointer text-white hover:bg-[#2a2a2a] transition"
                >
                  {meal.strMeal}
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <p className="text-blue-400 text-lg font-semibold">Loading...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex justify-center items-center py-20">
          <p className="text-red-500 font-semibold">
            We had an error: {error.message || error}. Please reload.
          </p>
        </div>
      )}

      {/* Meals Display */}
      {!loading && !error && (
        <>
          {validsearch === false ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {allMeals.map((meal) => (
                <MealCard key={meal.idMeal} meal={meal} />
              ))}
            </div>
          ) : validsearch === true && mealData === null ? (
            <div className="flex justify-center items-center py-20">
              <p className="text-red-400 text-lg font-semibold">
                No meal found for "{lastsearchTerm}"
              </p>
            </div>
          ) : (
            <div className="flex justify-center">
              <MealCard meal={mealData} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
