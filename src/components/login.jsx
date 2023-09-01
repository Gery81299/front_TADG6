import React, { useState } from "react";
import axios from "axios";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            console.log("1");
            const response = await axios.post("http://127.0.0.1:9000/api/usersIntern_login", {
                "_Correo": email,
                "_Contraseña": password
            });
            console.log("2");
            console.log(response); // No necesitas comillas alrededor de response aquí
            if (response.data.message.includes("Credenciales válidas: Usuario existe.")) {
                console.log("Acceso concedido");
                window.confirm("acceso concedido");
                // Realiza acciones después de un inicio de sesión exitoso
            } else {
                console.log("Acceso denegado");
                window.confirm("contraseña o correo incorrectos");
                // Realiza acciones cuando el inicio de sesión no es exitoso
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };

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