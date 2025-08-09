
const BASE_URL="https://www.themealdb.com/api/json/v1/1/"

export const searchByMealName = async (meal) => {
  const response = await fetch(`${BASE_URL}search.php?s=${meal}`)
  const data = await response.json()
  console.log(data)
  return data
}

export const getMealById = async(id) => {
  const resp = await fetch(`${BASE_URL}/lookup.php?i=${id}`)
  const da = await resp.json()
  console.log(da)
  return da.meals[0]
}


export const getAllMeals = async() => {
  const res = await fetch(`${BASE_URL}search.php?s=`)
  const dat = await res.json()
  // console.log(dat.meals)
  return dat.meals
}