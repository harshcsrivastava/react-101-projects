import { useEffect, useState } from "react";
import ProductCard from "./ProductCard.jsx";

function App() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://api.freeapi.app/api/v1/public/randomproducts");
                if (!response.ok) throw new Error("Failed to fetch");
                const result = await response.json();
                setData(result.data.data);
                console.log(result.data.data);
                
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="app-container">
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Loading products...</p>
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
                <h1>Products</h1>
                <p>Discover our amazing collection</p>
            </header>
            
            <main className="products-grid">
                {data && data.length > 0 ? (
                    data.map((product) => <ProductCard key={product.id} product={product} />)
                ) : (
                    <div className="no-products">No products available</div>
                )}
            </main>
        </div>
    );
}

export default App;
