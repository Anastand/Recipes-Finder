import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { getAllMeals, searchByMealName } from "./services/api";
import { useEffect } from "react";
import MealCard from "./components/MealCard";

function App() {
  const [mealData, setMealData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allMeals, setAllMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [validsearch, setvalidsearch] = useState(false);
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
    handleSearch();
    console.log("here");
    console.log(validsearch);
  };

  const handleSearch = async (e) => {
    try {
      setLoading(true);
      const responseData = await searchByMealName(searchTerm);
      if (!responseData.meals) {
        setMealData(null);
        return;
      }
      setMealData(responseData.meals[0]);
      console.log(`hello from fetch meal func with infor`);
    } catch (error) {
      setError(error);
      console.log("error is " + error);
    } finally {
      setLoading(false);
      setvalidsearch(true);
    }
  };
  return (
    <>
      <div>
        <form type="text" onSubmit={handlevalidSearch}>
          <input
            type="text"
            placeholder="search Meal"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <button type="submit">search</button>
        </form>
      </div>
      {/* <div> {mealData && <MealCard meal={mealData} />}</div> */}
      {/* <div>
        {allMeals.map((meal) => (
          <MealCard key={meal.idMeal} meal={meal} />
        ))}
      </div> */}
      {validsearch == false ? (
        allMeals.map((meal) => <MealCard key={meal.idMeal} meal={meal} />)
      ) : validsearch == true ? (
        <div>
          <div className="flex justify-center">
            <MealCard meal={mealData} />
          </div>
          <div className="felx justify-center">
            <p>
              well go back the previous page or refresh , removing the searched term will not work
            </p>
          </div>
        </div>
      ) : (
        <p>No meal found for</p>
      )}
    </>
  );
}

export default App;
