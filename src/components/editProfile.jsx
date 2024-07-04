import axios from "axios";
import React, { useEffect, useState } from "react";
import './login.css';

export const EditProfile = () => {

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [carrera, setCarrera] = useState('');
    const [facultad, setFacultad] = useState('');
    const [universidad, setUniversidad] = useState('');
    const [enlacePortafolio, setEnlacePortafolio] = useState('');
    const [enlacePresentacion, setEnlacePresentacion] = useState('');
    const [enlaceLinkedln, setEnlaceLinkedln] = useState('');
    //const [fotoPerfil, setFotoPerfil] = useState(null);
    //const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controlar si el usuario está autenticado

    const [profileData, setProfileData] = useState({});

    const updateProfile = async () =>{
        var jsonProfile = profileData;

        profileData["_Nombre"] = nombre;
        profileData["_Apellido"] = apellido;
        profileData["_Carrera"] = carrera;
        profileData["_Facultad"] = facultad;
        profileData["_Universidad"] = universidad;
        profileData["_Enlace_Portafolio"] = enlacePortafolio;
        profileData["_Enlace_Presentacion"] = enlacePresentacion;
        profileData["_Enlace_Linkedln"] = enlaceLinkedln;
        //profileData["_Foto_Perfil"] = fotoPerfil;

        try {
            window.confirm(profileData);
            const response = await axios.put("http://127.0.0.1:9000/api/usersIntern_update?email="+profileData["_Correo"], profileData);
            console.log(response); // No necesitas comillas alrededor de response aquí
            if (response.data.message.includes("Actualizado con éxito")) {
                window.confirm("Actualizado con éxito");
                window.location.href = "profile";
            } else {
                window.confirm("Algo salió mal, no se actualizó");
                // Realiza acciones cuando el inicio de sesión no es exitoso
            }
        } catch (error) {
            console.error("Error en la solicitud: ", error);
        }

        //window.confirm(profileData["_Correo"]);
    }


    const getProfile = async (email) => {
        try {
            console.log(email);
            const response = await axios.get("http://127.0.0.1:9000/api/usersIntern_byEmail?email="+email);
            console.log(response.data);
            setProfileData(response.data);
            setApellido(response.data["_Apellido"]);
            setNombre(response.data["_Nombre"]);
            setCarrera(response.data["_Carrera"]);
            setFacultad(response.data["_Facultad"]);
            setUniversidad(response.data["_Universidad"]);
            setEnlacePortafolio(response.data["_Enlace_Portafolio"]);
            setEnlacePresentacion(response.data["_Enlace_Presentacion"]);
            setEnlaceLinkedln(response.data["_Enlace_Linkedln"]);
            //setFotoPerfil(response.data["_Foto_Perfil"]);
        } catch (error) {
            console.error("Error en la solicitud: ", error);
        }
    }

    useEffect(() => {
        if (!localStorage.getItem("session")) {
            window.location.href = "login";
        } else {
            // Verificar si hay una sesión iniciada
            const sessionData = localStorage.getItem("session");
            if (sessionData) {
            const session = JSON.parse(sessionData);
            const email = session.email;
            getProfile(email);
            } else {
            window.location.href = "login";
            }
        }
    }, []);

    return (
        <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <div className="col-lg-8">
        <div className="card mb-4">
          <div className="card-body">
            <h2 className="mb-4">Actualización de perfil</h2>
            <form className="flex-column">
              <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input type="text" id="nombre" name="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} className="form-control" required/>
              </div>
              <div className="form-group">
                <label htmlFor="apellido">Apellidos</label>
                <input type="text" id="apellido" name="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} className="form-control" required />
              </div>
              <div className="form-group">
                <label htmlFor="carrera">Carrera</label>
                <input type="text" readOnly disabled id="carrera" name="carrera" value={carrera} onChange={(e) => setCarrera(e.target.value)} className="form-control" required />
              </div>
              <div className="form-group">
                <label htmlFor="facultad">Facultad</label>
                <input type="text" readOnly disabled id="facultad" name="facultad" value={facultad} onChange={(e) => setFacultad(e.target.value)} className="form-control" required />
              </div>
              <div className="form-group">
                <label htmlFor="universidad">Universidad</label>
                <input type="text" readOnly disabled id="universidad" name="universidad" value={universidad} onChange={(e) => setUniversidad(e.target.value)} className="form-control" required />
              </div>
              <div className="form-group">
                <label htmlFor="enlacePortafolio">Enlace Portafolio</label>
                <input type="url" id="enlacePortafolio" name="enlacePortafolio" value={enlacePortafolio} onChange={(e) => setEnlacePortafolio(e.target.value)} className="form-control" required />
              </div>
              <div className="form-group">
                <label htmlFor="enlacePresentacion">Enlace Presentacion</label>
                <input type="url" id="enlacePresentacion" name="enlacePresentacion" value={enlacePresentacion} onChange={(e) => setEnlacePresentacion(e.target.value)} className="form-control" required />
              </div>
              <div className="form-group">
                <label htmlFor="enlacePortafolio">Enlace Linkedln</label>
                <input type="url" id="enlacePortafolio" name="enlacePortafolio" value={enlaceLinkedln} onChange={(e) => setEnlaceLinkedln(e.target.value)} className="form-control" required />
              </div>

              <div className="form-group d-flex justify-content-between mt-3">
                <button type="button" className="btn btn-secondary mr-2" onClick={(e) => window.location.href = "profile"}>Cancelar</button>
                <button type="button" className="btn btn-primary" onClick={updateProfile}>Actualizar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
            
            
    );
};

export default EditProfile;

{/*

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
                            <p className="small fw-bold mt-2 pt-1 mb-0">
                            Don't have an account? <a href="#!" className="link-danger">Register</a>
                            </p>
                        </div>

                        </form>
                    </div>
                    </div>
                </div>
                <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
                    <div className="text-white mb-3 mb-md-0">
                    Copyright © 2020. All rights reserved.
                    </div>

                
                </div>
                </section>

*/}