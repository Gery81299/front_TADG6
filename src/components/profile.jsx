import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const Profile = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controlar si el usuario está autenticado
    const [profileData, setProfileData] = useState({});

    const handleLogout = () => {
        // Realiza las acciones necesarias para cerrar la sesión, como limpiar localStorage y cambiar el estado de isLoggedIn
        setIsLoggedIn(false);
        localStorage.removeItem("session"); // Elimina la información de sesión del localStorage
        console.log("logout");
        window.location.href = "login";
      };


      const getProfile = async (email) => {
        try {
            console.log(email);
            const response = await axios.get("http://127.0.0.1:9000/api/usersIntern_byEmail?email="+email);
            console.log(response.data);
            setProfileData(response.data);
            console.log(profileData);
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

      const editProfile = async () => {
        window.location.href = "editProfile";
    };

    return(
        <div>
        <section style={{ backgroundColor: '#eee' }}>
      <div className="container py-5">
        <div className="row">
          <div className="col">
            <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item"><a href="#">User</a></li>
                <li className="breadcrumb-item active" aria-current="page">User Profile</li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: '150px' }}
                />
                <h5 className="my-3">{profileData["_Nombre"]}</h5>
                <p className="text-muted mb-1">{profileData["_Carrera"]}</p>
                <p className="text-muted mb-4">{profileData["_Universidad"]}</p>
                <div className="d-flex justify-content-center mb-2">
                  <button type="button" className="btn btn-primary" onClick={editProfile} >Editar</button>
                  <button type="button" className="btn btn-outline-primary ms-1">Actualizar</button>
                </div>
              </div>
            </div>
            <div className="card mb-4 mb-lg-0">
              <div className="card-body p-0">
                <ul className="list-group list-group-flush rounded-3">
                
                
                {profileData && profileData["_Gustos"] && profileData["_Gustos"].map((elemento) => (
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i className="fas fa-globe fa-lg text-warning"></i>
                    <p className="mb-0">{elemento}</p>
                  </li>
                ))}


                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Full Name</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{profileData["_Nombre"]} {profileData["_Apellido"]}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{profileData["_Correo"]}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Carrera</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{profileData["_Carrera"]} ({profileData["_Facultad"]})</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Universidad</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{profileData["_Universidad"]}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Enlace portafolio</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0"><a href={profileData["_Enlace_Portafolio"]} target="_blank">Enlace portafolio / CV</a></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="card mb-4 mb-md-0">
                  <div className="card-body">
                    <p className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status
                    </p>
                    <p className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</p>
                    <div className="progress rounded" style={{ height: '5px' }}>
                      <div className="progress-bar" role="progressbar" style={{ width: '80%' }} aria-valuenow="80"
                        aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</p>
                    <div className="progress rounded" style={{ height: '5px' }}>
                      <div className="progress-bar" role="progressbar" style={{ width: '72%' }} aria-valuenow="72"
                        aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</p>
                    <div className="progress rounded" style={{ height: '5px' }}>
                      <div className="progress-bar" role="progressbar" style={{ width: '89%' }} aria-valuenow="89"
                        aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</p>
                    <div className="progress rounded" style={{ height: '5px' }}>
                      <div className="progress-bar" role="progressbar" style={{ width: '55%' }} aria-valuenow="55"
                        aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</p>
                    <div className="progress rounded mb-2" style={{ height: '5px' }}>
                      <div className="progress-bar" role="progressbar" style={{ width: '66%' }} aria-valuenow="66"
                        aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card mb-4 mb-md-0">
                  <div className="card-body">
                    <p className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status
                    </p>
                    <p className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</p>
                    <div className="progress rounded" style={{ height: '5px' }}>
                      <div className="progress-bar" role="progressbar" style={{ width: '80%' }} aria-valuenow="80"
                        aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</p>
                    <div className="progress rounded" style={{ height: '5px' }}>
                      <div className="progress-bar" role="progressbar" style={{ width: '72%' }} aria-valuenow="72"
                        aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</p>
                    <div className="progress rounded" style={{ height: '5px' }}>
                      <div className="progress-bar" role="progressbar" style={{ width: '89%' }} aria-valuenow="89"
                        aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</p>
                    <div className="progress rounded" style={{ height: '5px' }}>
                      <div className="progress-bar" role="progressbar" style={{ width: '55%' }} aria-valuenow="55"
                        aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</p>
                    <div className="progress rounded mb-2" style={{ height: '5px' }}>
                      <div className="progress-bar" role="progressbar" style={{ width: '66%' }} aria-valuenow="66"
                        aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div className="card mb-4">
        <div className="card-body text-center">
        {/* ... Contenido del perfil ... */}
        <div className="d-flex justify-content-center mb-2">
            <button type="button" className="btn btn-danger" onClick={handleLogout}>
            Logout
            </button>
        </div>
        </div>
    </div>
    </div>
      );
}


export default Profile;
//export default Profile;