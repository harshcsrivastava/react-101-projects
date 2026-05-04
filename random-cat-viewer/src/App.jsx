import { useEffect, useState } from "react";
import CatCard from "./CatCard";

function App() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const url = "https://api.freeapi.app/api/v1/public/cats/cat/random";
    const options = {
        method: "GET",
        headers: { accept: "application/json" },
    };

    async function getRandomCat() {
        setLoading(true);
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result.data);

            setData(result.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getRandomCat();
    }, []);

    if (loading) {
        return (
            <div className="app-container">
                <div className="loading">Loading...</div>
            </div>
        );
    }

    return (
        <>
            {data && <CatCard data={data} />}
            <button onClick={getRandomCat}>Fetch new</button>
        </>
    );
}

export default App;
