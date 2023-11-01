import axios from "axios";
import React, { useEffect, useState } from "react";
import Principal from "./Principal";


export const Projects = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controlar si el usuario está autenticado
    const [projectsAdmin, setProjectsAdmin] = useState({});
    const [projectsJoin, setProjectsJoin] = useState([]);
    const { history } = props;

      const getProjectsAdmin = async (email) => {
        try {
            const response = await axios.get("http://127.0.0.1:9000/api/project_byEmailAdmin?email="+email);
            console.log(response.data);
            setProjectsAdmin(response.data);
        } catch (error) {
            console.error("Error en la solicitud: ", error);
        }
      }

      const getProjectsJoin = async (email) => {
        try {
            const response = await axios.get("http://127.0.0.1:9000/api/approvedProject_byEmail?email="+email);
            console.log(response.data);
            setProjectsJoin(response.data);
        } catch (error) {
            console.error("Error en la solicitud: ", error);
        }
      }

      const getDetail = (codProject) => {
        //const sessionData = localStorage.getItem("session");
        const sessionData = JSON.parse(localStorage.getItem("session"));
        sessionData["cod_proyecto"] = codProject;

        localStorage.setItem("session", JSON.stringify(sessionData));
        window.location.href = "ViewProject";
      }

      useEffect(() => {
        if (!localStorage.getItem("session")) {
          window.location.href = "login";
        } else {
          var valor;
          // Verificar si hay una sesión iniciada
          const sessionData = localStorage.getItem("session");
          if (sessionData) {
            const session = JSON.parse(sessionData);
            const email = session.email;
            getProjectsAdmin(email);
            getProjectsJoin(email);
          } else {
            window.location.href = "login";
          }
        }
      }, []);

      const handleInicio = async() => {
        window.location.href = "Principal";
      }

      const handleCreateProject = async() => {
        window.location.href = "createProject";
      }

    return(
    <div>
        <section style={{ backgroundColor: '#FFFFFF' }}>
            <Principal/>

            <div className="container ">
              <div className="row">
                  <div className="col">
                  <nav aria-label="breadcrumb" className="rounded-3 p-3 mb-4">
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="card-title" style={{ color: '#FF0000' }}>Proyectos propios</h5>
                      </div>
                  </nav>
                  </div>
              </div>
            </div>

            {Array.isArray(projectsAdmin) && projectsAdmin.length > 0 ? (
                projectsAdmin.map((project, index) => (
                <div className="container ">
                <div className="row">
                    <div className="col">
                    <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="col-9 p-2" style={{ marginLeft: '30px'}}>
                            <h5 className="card-title">Titulo: {project["_titulo"]}</h5>
                            <p>{project["_descripcion"]}</p>
                            <p>Estado: {project["_estado"]}</p>
                            <div>
                                <span>Puestos: </span>
                                {project && project["_puestos"] && project["_puestos"].map((elemento) => (
                                    <span style={{ marginRight: '10px'}}>{elemento["_nombre"]}({elemento["_cantidad"]})</span>
                                ))}    
                            </div>
                            <div>
                                {project && project["_tags"] && project["_tags"].map((elemento) => (
                                    <span className="badge bg-secondary" style={{ marginRight:"10px" }}>{elemento}</span>
                                ))}    
                            </div>
                            </div>
                            <div className="col-3 text-center" >
                            <button type="button" className="btn btn-primary m-2"  onClick={() => getDetail(project["_id"])}>
                                Ver detalles
                            </button>
                            </div>
                        </div>
                    </nav>
                    </div>
                </div>
                </div>
            ))):(
                
              <div className="container ">
              <div className="row">
                  <div className="col">
                  <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="card-title">No hay proyectos propios</h5>
                      </div>
                  </nav>
                  </div>
              </div>
              </div>
            )}

            <div className="container ">
              <div className="row">
                  <div className="col">
                  <nav aria-label="breadcrumb" className="rounded-3 p-3 mb-4">
                      <div className="d-flex justify-content-center align-items-center">
                          <button type="button" className="btn btn-primary m-2" onClick={() => handleCreateProject()}>
                                Crear nuevo proyecto
                          </button>
                      </div>
                  </nav>
                  </div>
              </div>
            </div>

            <div className="container ">
              <div className="row">
                  <div className="col">
                  <nav aria-label="breadcrumb" className="rounded-3 p-3 mb-4">
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="card-title" style={{ color: '#FF0000' }}>Proyectos unidos</h5>
                      </div>
                  </nav>
                  </div>
              </div>
            </div>



            {Array.isArray(projectsJoin) && projectsJoin.length > 0 ? (
                projectsJoin.map((project, index) => (
                <div className="container ">
                <div className="row">
                    <div className="col">
                    <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="col-9 p-2" style={{ marginLeft: '30px'}}>
                            <h5 className="card-title">Titulo: {project["_titulo"]}</h5>
                            <p>{project["_descripcion"]}</p>
                            <p>Estado: {project["_estado"]}</p>
                            <div>
                                <span>Puestos: </span>
                                {project && project["_puestos"] && project["_puestos"].map((elemento) => (
                                    <span style={{ marginRight: '10px'}}>{elemento["_nombre"]}({elemento["_cantidad"]})</span>
                                ))}    
                            </div>
                            <div>
                                {project && project["_tags"] && project["_tags"].map((elemento) => (
                                    <span className="badge bg-secondary" style={{ marginRight:"10px" }}>{elemento}</span>
                                ))}    
                            </div>
                            </div>
                            <div className="col-3 text-center" >
                            <button type="button" className="btn btn-primary m-2"  onClick={() => getDetail(project["_id"])}>
                                Ver detalles
                            </button>
                            </div>
                        </div>
                    </nav>
                    </div>
                </div>
                </div>
            ))):(
                
              <div className="container ">
              <div className="row">
                  <div className="col">
                  <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="card-title">No te has unido a ningún proyecto aún</h5>
                      </div>
                  </nav>
                  </div>
              </div>
              </div>
            )}




            <div className="container ">
              <div className="row">
                  <div className="col">
                  <nav aria-label="breadcrumb" className="rounded-3 p-3 mb-4">
                      <div className="d-flex justify-content-center align-items-center">
                          <button type="button" className="btn btn-primary m-2" onClick={() => handleInicio()}>
                                Buscar nuevos proyectos
                          </button>
                      </div>
                  </nav>
                  </div>
              </div>
            </div>
            
        </section>

    </div>
      );
}


export default Projects;
