import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Principal } from "./components/Principal"; 
import { EditProfile } from "./components/editProfile"; 
import { Login } from "./components/login"; 
import { Profile } from "./components/profile"; 
import { Projects } from "./components/projects"; 
import {ViewProject} from "./components/viewProject";
import {CreateProject} from "./components/createProject";
import {Inicio} from "./components/inicio";



const AppRouter = () => {
    //const location = useLocation();
    return ( 
    <Router >
        <Routes >
            <Route path = "/login" element={<Login />}/> 
            <Route path = "/profile" element={<Profile />}/> 
            <Route path = "/editProfile" element={<EditProfile />}/> 
            <Route path = "/" element={<Inicio />}/> 
            <Route path = "" element={<Inicio />}/> 
            <Route path = "/principal" element={<Principal />}/>
            <Route path = "/projects" element={<Projects />}/>
            <Route path = "/viewProject" element={<ViewProject />}/>
            <Route path = "/createProject" element={<CreateProject />}/>
            <Route path = "/inicio" element={<Inicio />}/> 
            { /* Agrega más rutas según tus necesidades */ } 
        </Routes> 
    </Router>
    );
};

export default AppRouter;