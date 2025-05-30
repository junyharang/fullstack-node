import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./components/home/Home.tsx";
import Completed from "./components/completed/Completed.tsx";
import Important from "./components/important/Important.tsx";
import Proceed from "./components/proceeding/proceed.tsx";

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/completed" element={<Completed />} />
                    <Route path="/important" element={<Important />} />
                    <Route path="/proceeding" element={<Proceed />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
