import { useEffect, useState } from "react";
import UserCard from "./components/UserCard";
import "./App.css";

function App() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const url = "https://api.freeapi.app/api/v1/public/randomusers";
        const options = {
            method: "GET",
            headers: { accept: "application/json" },
        };

        async function getRandomUsers() {
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

        getRandomUsers();
    }, []);

    if (loading) {
        return (
            <div className="app-container">
                <div className="loading">Loading...</div>
            </div>
        );
    }

    return (
        <div className="app-container">
            <h1 className="app-title">Random Users</h1>
            <div className="cards-grid">
                {data && data.map((u, index) => (
                    <UserCard key={index} data={u} />
                ))}
            </div>
        </div>
    );
}

export default App;
