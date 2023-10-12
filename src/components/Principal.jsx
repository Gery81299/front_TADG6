import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Principal = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controlar si el usuario está autenticado

    const handleLogout = () => {
        // Realiza las acciones necesarias para cerrar la sesión, como limpiar localStorage y cambiar el estado de isLoggedIn
        setIsLoggedIn(false);
        localStorage.removeItem("session"); // Elimina la información de sesión del localStorage
        console.log("logout");
        window.location.href = "login";
      };

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
      <div className="container py-5"> {/* Cambia "di" a "div" aquí */}
        <div className="row">
          <div className="col">
            <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
              <ol className="breadcrumb mb-0">
                <button type="button" className="btn btn-primary m-2" onClick={() => handleNavigation("Principal")}>Inicio</button>
                <button type="button" className="btn btn-primary m-2" onClick={() => handleNavigation("proyectos")}>Proyectos</button>
                <button type="button" className="btn btn-primary m-2" onClick={() => handleNavigation("amigos")}>Amigos</button>
                <button type="button" className="btn btn-primary m-2" onClick={() => handleNavigation("solicitudes")}>solicitudes</button>
                <button type="button" className="btn btn-danger m-2" onClick={handleLogout}>Logout</button>
                <div className="card-body text-center">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: '50px', marginLeft: '600px' }}
                />
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
