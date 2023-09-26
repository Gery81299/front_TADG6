import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import {Login} from "./components/login"; // Importa tus componentes
import {Profile} from "./components/profile"; // Importa tus componentes

const AppRouter = () => {
    //const location = useLocation();
    return ( 
    <Router >
        <Routes >
            <Route path = "/login" element={<Login />}/> 
            <Route path = "/profile" element={<Profile />}/> 
            <Route path = "/" element={<Login />}/> 
            <Route path = "" element={<Login />}/> 
            { /* Agrega más rutas según tus necesidades */ } 
        </Routes> 
    </Router>
    );
};

export default AppRouter;