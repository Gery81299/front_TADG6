import React from "react";

function Projects() {

    return(
        

        <>
      <section id="project">

        <div className="project-header">

            <h3>PROYECTOS</h3>

        </div>

        <ul className="header-list">
            <li className="list">Nombre</li>
            <li className="list">Puestos</li>
            <li className="list">Integrantes</li>
        </ul>

        <div className="project-container">
            <a href="" className="project-box">
                <img src="proyecto.png" alt="proyecto"></img>
            </a>
            <a href="" className="project-box">
                <img src="proyecto.png" alt="proyecto"></img>
            </a>
            <a href="" className="project-box">
                <img src="proyecto.png" alt="proyecto"></img>
            </a>
            <a href="" className="project-box">
                <img src="proyecto.png" alt="proyecto"></img>
            </a>
            <a href="" className="project-box">
                <img src="proyecto.png" alt="proyecto"></img>
            </a>
            <a href="" className="project-box">
                <img src="proyecto.png" alt="proyecto"></img>
            </a>

        </div>

        <div>
        <button class="postular-button">Postular</button>
        </div>

      </section>
    </>
      );
    }


export default Projects;