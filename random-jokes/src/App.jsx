import { useEffect, useState } from "react";
import JokesCard from "./JokesCard";

function App() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const url = "https://api.freeapi.app/api/v1/public/randomjokes";
    const options = {
        method: "GET",
        headers: { accept: "application/json" },
    };

    async function getJokes() {
        setLoading(true);
        try {
            const response = await fetch(url, options);
            const result = await response.json();

            setData(result.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getJokes();
    }, []);

    if (loading) {
        return (
            <div className="app-container">
                <div className="loading">Loading...</div>
            </div>
        );
    }

    return <>{data && data.map((joke) => <JokesCard data={joke} />)}</>;
}

export default App;
