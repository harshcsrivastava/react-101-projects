import { useEffect, useState } from "react";
import { api } from "./api.js";
import MealCard from "./MealCard.jsx";

function App() {
    const [data, setData] = useState(null);
    useEffect(() => {
        async function fetchMealData() {
            try {
                const response = await api.get("/");
                const result = response.data.data;
                setData(result.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchMealData();
    }, []);
    return (
        <main className="page-shell">
            <h1 className="page-title">Recipe to Go</h1>
            <section className="meal-grid">
                {data && data.map((meal, index) => (
                    <MealCard key={meal.idMeal ?? index} meal={meal} />
                ))}
            </section>
        </main>
    );
}
export default App;
