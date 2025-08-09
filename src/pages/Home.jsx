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

  useEffect(() => {
    // this will run on page load and get all the meals
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
    e.preventDefault(); // prevents page reload and keeps input value
    if (!searchTerm.trim()) {
      // Empty search resets to all meals
      setvalidsearch(false);
      console.log("here from valid search");
      setMealData([]);
      return;
    }
    handleSearch();
  };

  const handleSearch = async (e) => {
    try {
      setLoading(true);
      const currentsearch = searchTerm;
      const responseData = await searchByMealName(currentsearch);
      setlastsearchTerm(currentsearch);

      if (!responseData.meals) {
        setMealData(null);
        setvalidsearch(true);
        console.log("herer from handle searc");
        return;
      }

      setMealData(responseData.meals[0]);
      setvalidsearch(true);
      setSearchTerm("");
      console.log(`hello from fetch meal func with infor`);
    } catch (error) {
      setError(error);
      console.log("error is " + error);
    } finally {
      setLoading(false);
      setvalidsearch(true);
      // setSearchTerm("");
    }
  };
  return (
    <>
      <div>
        <form onSubmit={handlevalidSearch} className="flex justify-center my-6">
          <input
            type="text"
            placeholder="Search Meal"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 px-4 py-2 rounded-l-md bg-[#181818] text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 bg-yellow-500 hover:bg-yellow-600 hover:text-gray-800 text-black font-semibold rounded-r-md disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Search
          </button>
        </form>
      </div>
      {/* <div> {mealData && <MealCard meal={mealData} />}</div> */}
      {/* <div>
        {allMeals.map((meal) => (
          <MealCard key={meal.idMeal} meal={meal} />
        ))}
      </div> */}
      {loading && (
        <div className="flex justify-center items-center mt-10">
          <p className="text-blue-600 text-lg font-semibold">Loading...</p>
        </div>
      )}
      {validsearch == false ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {allMeals.map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      ) : validsearch == true && mealData == null ? (
        <div className="flex justify-center items-center mt-10">
          <p className="text-red-600 text-lg font-semibold">
            No meal found for "{lastsearchTerm}"
          </p>
        </div>
      ) : (
        <div>
          <div className="flex justify-center">
            <MealCard meal={mealData} />
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
