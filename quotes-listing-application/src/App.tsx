import { useEffect, useState } from "react";
import QuoteCard from "./components/QuoteCard";
import image from "./assets/image.png";
import './App.css'
type Quote = {
    id: string;
    content: string;
    author: string;
};

type QuotesApiResponse = {
    data: {
        data: Quote[];
    };
};

function App() {
    const [data, setData] = useState<Quote[]>([]);

    useEffect(() => {
        async function fetchQuotes() {
            const url = "https://api.freeapi.app/api/v1/public/quotes"; // ?page=1&limit=10&query=human
            const options = {
                method: "GET",
                headers: { accept: "application/json" },
            };

            try {
                const response = await fetch(url, options);
                const result: QuotesApiResponse = await response.json();
                setData(result.data.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchQuotes();
    }, []);

    return (
        <div className="app-container">
            <h1 className="app-title">Daily Quotes</h1>
            <div className="cards-container">
                {data.map((quote) => (
                    <QuoteCard
                        key={quote.id}
                        quote={quote.content}
                        author={quote.author}
                        imageSrc={image}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
