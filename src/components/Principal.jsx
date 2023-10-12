import axios from "axios";
import React, { useState } from "react";

export const Principal = () => {

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


    // Función para manejar la navegación
  const handleNavigation = (destination) => {
    if (destination === "inicio") {
      // Redirige a la página de inicio
      //history.push("/inicio"); // Reemplaza "/inicio" con la ruta deseada
    } else if (destination === "proyectos") {
      // Redirige a la página de proyectos
      //history.push("/proyectos"); // Reemplaza "/proyectos" con la ruta deseada
    } else if (destination === "amigos") {
      // Redirige a la página de amigos
      //history.push("/amigos"); // Reemplaza "/amigos" con la ruta deseada
    }
    // Puedes agregar más casos según tus necesidades
  };

  return (
<div>
  <section style={{ backgroundColor: '#eee' }}></section>
  <div className="container py-5">
    <div className="row">
      <div className="col">
        <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
          <ol className="breadcrumb mb-0">
            <div className="d-flex justify-content-between align-items-center">
              <div className="Botones Principal" style={{marginLeft:'30px'}}>
                {/* Botones de navegación */}
                <button type="button" className="btn btn-primary m-2" onClick={() => handleNavigation("Principal")}>
                  Inicio
                </button>
                <button type="button" className="btn btn-primary m-2" onClick={() => handleNavigation("proyectos")}>
                  Proyectos
                </button>
                <button type="button" className="btn btn-primary m-2" onClick={() => handleNavigation("Grupos")}>
                  Mis Grupos
                </button>
                <button type="button" className="btn btn-primary m-2" onClick={() => handleNavigation("solicitudes")}>
                  Solicitudes
                </button>
              </div>
              <div className="d-flex align-items-center">
                <div style={{ marginLeft: '480px' }}>
                  <p className="text-muted mb-0">{profileData["_Nombre"]}</p>
                </div>
                <div style={{marginLeft:'30px'}}>
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle img-fluid"
                    style={{ width: '50px' }}
                  />
                </div>
                <div className="card-body text-center" style={{marginLeft:'30px'}}>
                <button type="button" className="btn btn-danger m-2" onClick={handleLogout}>
                  Logout
                </button>
                </div>
              </div>
            </div>
          </ol>
        </nav>
      </div>
    </div>
  </div>
</div>
  );
};

export default Principal;
