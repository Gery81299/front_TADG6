import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controlar si el usuario está autenticado

    const navigate = useNavigate(); // Cambia la variable

    useEffect(() => {
        // Verificar si ya existe una sesión al cargar la página
        const sessionData = localStorage.getItem("session");
        if (sessionData) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://127.0.0.1:9000/api/usersIntern_login", {
                "_Correo": email,
                "_Contraseña": password
            });
            console.log(response); // No necesitas comillas alrededor de response aquí
            if (response.data.message.includes("Credenciales válidas: Usuario existe.")) {
                console.log("Acceso concedido");
                window.confirm("acceso concedido");
                // Realiza acciones después de un inicio de sesión exitoso
                // Autenticación exitosa
                setIsLoggedIn(true);
                // Guardar la sesión en localStorage
                localStorage.setItem("session", JSON.stringify({ email }));
            } else {
                console.log("Acceso denegado");
                window.confirm("contraseña o correo incorrectos");
                // Realiza acciones cuando el inicio de sesión no es exitoso
            }
        } catch (error) {
            console.error("Error en la solicitud: ", error);
        }
    };

    if (isLoggedIn) {
        // Si el usuario está autenticado, redirigir a la página de inicio
        //window.location.href = "./profile.js"; // Cambia esto a la URL de tu página de inicio
        //navigate("./profile");
        console.log("isLoggedIn");
        window.location.href = "profile";
    }

    return (
        <>
            <div className="auth-form-container">
                <h2>LOGIN</h2>
                <form className="login-form">
                    <label htmlFor="email">email</label>
                    <input type="email" placeholder="test@email.com" id="email" name="email" onChange={(e) => setEmail(e.target.value)} />

                    <label htmlFor="password">contraseña</label>
                    <input type="password" placeholder="****" id="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                </form>
                <button onClick={handleLogin}>Ingresar</button>
            </div>
        </>
    );
};