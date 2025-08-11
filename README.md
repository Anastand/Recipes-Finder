# 🍽️ Recipes Finder

A modern recipe search app built with **React**, **Vite**, and **Tailwind CSS**, powered by the [TheMealDB API](https://www.themealdb.com/api.php).

This project marks my current **React milestone** before moving into **Next.js** — showcasing my ability to handle API calls, routing, reusable components, and clean UI styling.
___
## 🧭 Learning Milestone

This project demonstrates my ability to:

* Fetch and render data from a public API
* Manage multiple state variables and UI conditions
* Structure React apps into reusable components & pages
* Style with Tailwind for responsive, clean layouts
* Use client-side routing for dynamic detail views

✅ Once the search suggestions & category filter are done, I’ll be ready to transition to **Next.js** for more advanced full-stack capabilities.

---

## 🚀 Features

### ✅ Current
- **Browse all meals** on page load (fetched from TheMealDB API)
- **Search by meal name** — fetches a single meal or shows a “No meal found” message
- **Dynamic details page** for each meal with:
  - Category & region
  - Full instructions
  - Meal image
- **Reusable `MealCard` component** with styled layout
- **Tailwind CSS styling** for responsive, modern design
- **React Router** for client-side navigation
- Amazon-style **search suggestions** while typing
- **Clickable suggestions** to navigate directly to details
- **Category filtering** (Vegetarian, Seafood, etc.)
- More UI polish and interactivity

### 📍 Roadmap
- Transition to **Next.js**:
  - Pages & routing
  - Server-side rendering (SSR)
  - Static site generation (SSG)
  - API routes

---

## 🛠️ Tech Stack

- **React 18** + Vite
- **Tailwind CSS** for styling
- **React Router v6**
- **TheMealDB API**
- **JavaScript (ES2020)**

---

## 📂 Project Structure

```

src/
components/
MealCard.jsx       # Reusable meal card UI
pages/
Home.jsx           # Main search & meal listing
Details.jsx        # Single meal view
services/
api.js             # API calls to TheMealDB
App.jsx              # Routes
index.css            # Tailwind setup
main.jsx             # App entry point

````

---

## ⚡ Getting Started

1. **Clone the repo**
   ```
   git clone https://github.com/Anastand/Recipes-Finder.git
   cd Recipes-Finder
    ```
2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open in your browser**

   ```
   http://localhost:5173
   ```

---

## 📅 Progress Timeline

This project is part of my learning journey towards becoming a **Next.js developer**.
Here’s how my skills have evolved so far:

1. **🎬 Movie App**

   * Learned basic React components & props
   * Consumed a public API (TMDB)
   * First deployment on Vercel

2. **🌦️ Weather App**

   * Used OpenWeather API
   * Improved state management and API error handling
   * Styled with Tailwind CSS

3. **🍽️ Recipes Finder (This Project)**

   * Multiple pages with React Router
   * Dynamic routing for details view
   * Modular service layer for API calls
   * Improved UI/UX and responsive layout
   * Preparing for search suggestions and filtering

**Next Step →** Build 1–2 more projects without tutorials, then move into **Next.js** for SSR, SSG, and API routes.

---



## 📜 License

MIT License — feel free to use and adapt.

```
I can also make **a simple visual timeline graphic** for the repo to make it stand out.  
Want me to make that too?
```
