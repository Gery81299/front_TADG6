import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './login.css';

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
        console.log("isLoggedIn");
        //window.location.href = "profile";
        window.location.href = "Principal";
    }

    return (
        
            
            <section className="vh-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                        className="img-fluid"
                        alt="Sample image"
                        />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form>
                        <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                            <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                            <button type="button" className="btn btn-primary btn-floating mx-1">
                            </button>

                            <button type="button" className="btn btn-primary btn-floating mx-1">
                            </button>

                            <button type="button" className="btn btn-primary btn-floating mx-1">
                            </button>
                        </div>

                        <div className="divider d-flex align-items-center my-4">
                            <p className="text-center fw-bold mx-3 mb-0">Or</p>
                        </div>

                        {/* Email input */}
                        <div className="form-outline mb-4">
                            <input
                            type="email"
                            id="email"
                            className="form-control form-control-lg"
                            placeholder="test@email.com"
                            name="email" onChange={(e) => setEmail(e.target.value)} />
                            <label className="form-label" htmlFor="email">
                            Email address
                            </label>
                        </div>

                        {/* Password input */}
                        <div className="form-outline mb-3">
                            <input
                            type="password"
                            id="password" name="password" onChange={(e) => setPassword(e.target.value)} 
                            className="form-control form-control-lg"
                            placeholder="****"
                            />
                            <label className="form-label" htmlFor="password">
                            Password
                            </label>
                        </div>

                        <div className="d-flex justify-content-between align-items-center">
                            {/* Checkbox */}
                            <div className="form-check mb-0">
                            <input
                                className="form-check-input me-2"
                                type="checkbox"
                                value=""
                                id="form2Example3"
                            />
                            <label className="form-check-label" htmlFor="form2Example3">
                                Remember me
                            </label>
                            </div>
                            <a href="#!" className="text-body">
                            Forgot password?
                            </a>
                        </div>

                        <div className="text-center text-lg-start mt-4 pt-2">
                            <button
                            type="button"
                            className="btn btn-primary btn-lg"
                            style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                            onClick={handleLogin} >
                            Login
                            </button>
                            {/*<p className="small fw-bold mt-2 pt-1 mb-0">
                            Don't have an account? <a href="#!" className="link-danger">Register</a>
                            </p>*/}
                        </div>

                        </form>
                    </div>
                    </div>
                </div>
                <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
                    {/* Copyright */}
                    <div className="text-white mb-3 mb-md-0">
                    Copyright © 2023. All rights reserved.
                    </div>
                    {/* Copyright */}

                
                </div>
                </section>
    );
};