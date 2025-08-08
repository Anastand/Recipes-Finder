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

  useEffect(() => {
    // this use effect is only for when we search
    setLoading(true);
    const fetchMeals = async () => {
      try {
        const responseData = await searchByMealName("Arrabiata");
        setMealData(responseData.meals[0]);
        console.log(`hello from fetch meal func with infor`);
      } catch (error) {
        setError(error);
        console.log("error is " + error);
      } finally {
        setLoading(false);
      }
    };
    fetchMeals();
  }, []);
  return (
    <>
      <div>hello from app.jsx</div>
      <div>{mealData && <MealCard meal={mealData} />}</div>
    </>
  );
}

export default App;
