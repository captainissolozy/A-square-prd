import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle';
import Navbar from "./components/navbar";
import Home from "./pages/home";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Lobby from "./pages/game/lobby";
import LoginPage from "./pages/login";
import RegisPage from "./pages/signup";
import Game from "./pages/game/gamePlay/Game";
import Customer from "./pages/customer"
import Supplier from "./pages/supplier"
import InCustomer from "./pages/inSide/Icustomer"

function App() {

    return (<>
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<LoginPage/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route
                        path="/login"
                        element={<LoginPage
                        />}
                    />
                    <Route
                        path="/regis"
                        element={<RegisPage
                        />}
                    />
                    <Route path="/lobby" element={<Lobby/>}/>
                    <Route path="/game" element={<Game/>}/>
                    <Route path="/customer" element={<Customer/>}/>
                    <Route path="/supplier" element={<Supplier/>}/>
                    <Route path="/inc" element={<InCustomer/>}/>
                </Routes>
            </BrowserRouter>
        </>);
}

export default App;
