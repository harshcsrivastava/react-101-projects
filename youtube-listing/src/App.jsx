import { useEffect, useState } from "react";
import VideoCard from "./VideoCard.jsx";
import "./App.css";

function App() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch(
                    "https://api.freeapi.app/api/v1/public/youtube/videos",
                );
                if (!response.ok) throw new Error("Failed to fetch");
                const result = await response.json();
                setData(result.data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchVideos();
    }, []);

    if (loading) {
        return (
            <div className="app-container">
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Loading Videos...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="app-container">
                <div className="error-container">
                    <h2>⚠️ Error</h2>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Youtube</h1>
                <p>Discover some amazing videos</p>
            </header>

            <main className="products-grid">
                {data && data.length > 0 ? (
                    data.map((item) => (
                        <VideoCard key={item.items.id} items={item.items} />
                    ))

                ) : (
                    <div className="no-products">No Videos Available available</div>
                )}
            </main>
        </div>
    );
}

export default App;
