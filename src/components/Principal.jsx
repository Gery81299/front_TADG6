import React from "react";

export const Principal = () => {
  return (
    <div>
      <section style={{ backgroundColor: '#eee' }}></section>  
      <div className="container py-5"> {/* Cambia "di" a "div" aquí */}
        <div className="row">
          <div className="col">
            <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item"><a href="#">Inicio</a></li>
                <li className="breadcrumb-item"><a href="#">Proyectos</a></li>
                <li className="breadcrumb-item"><a href="#">Amigos</a></li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Principal;
