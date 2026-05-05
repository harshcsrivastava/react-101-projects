import {  useState } from "react";
import { Login, Register } from "./component/index.js";
const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div className="relative h-screen overflow-hidden">
            <button
                onClick={() => setIsLoggedIn(!isLoggedIn)}
                className="fixed right-4 top-4 z-30 rounded-full border border-white/50 bg-white/80 px-4 py-2 text-sm font-semibold text-gray-700 shadow-lg shadow-teal-950/10 backdrop-blur-md transition-all hover:bg-white hover:shadow-xl"
            >
                {isLoggedIn ? "Switch to Register" : "Switch to Login"}
            </button>
            {isLoggedIn ? <Login /> : <Register />}
        </div>
    );
};

export default App;
