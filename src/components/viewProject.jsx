import axios from "axios";
import React, { useEffect, useState } from "react";
import Principal from "./Principal";


export const ViewProject = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controlar si el usuario está autenticado
    const [project, setProject] = useState({});
    const [email, setEmail] = useState();
    const [positions, setPositions] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const { history } = props;

      const getProject = async (id) => {
        try {
            const response = await axios.get("http://127.0.0.1:9000/api/project_byId?id="+id);
            console.log(response.data);
            setProject(response.data);
            getPosition(response.data["_id"])
        } catch (error) {
            console.error("Error en la solicitud: ", error);
        }
      }

      const getPosition = async (projectId) => {
        try {
            const response = await axios.get("http://127.0.0.1:9000/api/approvedPosition_byProject?id="+projectId);
            if(response){
              response.data.map((elemento)=>{
                if (elemento["_codigo_puesto"] in positions) {
                  positions[elemento["_codigo_puesto"]].push(elemento["_correo"]);
                }else{
                  positions[elemento["_codigo_puesto"]] = [elemento["_correo"]];
                }
              })
              setPositions(positions);
              setIsLoading(false);
              console.log(positions);
            }
            
        } catch (error) {
            console.error("Error en la solicitud: ", error);
        }
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
            const correo= session.email;
            const codProject = session["cod_proyecto"];
            console.log(session);
            //console.log("correo" + correo);
            setEmail(correo);
            getProject(codProject);
          } else {
            window.location.href = "login";
          }
        }
      }, []);

      const handleRegresar = async() => {
        window.location.href = "Projects";
      }

      const handleInicio = async() => {
        window.location.href = "Principal";
      }

      const LoadingSpinner = () => (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="ms-2">Cargando...</p>
        </div>
      );

    return(
    <div>
        {isLoading ? ( // Muestra un indicador de carga mientras isLoading es verdadero
          <LoadingSpinner />
        ):(
        <section style={{ backgroundColor: '#FFFFFF' }}>
            <Principal/>


            <div className="container">
              <div className="row">
                  <div className="col">
                  <nav aria-label="breadcrumb" className="rounded-3 p-3 mb-4">
                      <div className="d-flex justify-content-center align-items-center">
                        <div className="col-lg-12">
                          <div className="card mb-4">
                            <div className="card-body">
                            <div className="row">
                                <div className="col-sm-3"><p className="mb-0">Título</p></div>
                                <div className="col-sm-9"><p className="text-muted mb-0">{project['_titulo']}</p></div>
                              </div>
                              <hr />
                              <div className="row">
                                <div className="col-sm-3"><p className="mb-0">Administrador</p></div>
                                <div className="col-sm-9"><p className="text-muted mb-0">{project['_administrador']}</p></div>
                              </div>
                              <hr />
                              <div className="row">
                                <div className="col-sm-3"><p className="mb-0">Descripción</p></div>
                                <div className="col-sm-9"><p className="text-muted mb-0">{project['_descripcion']}</p></div>
                              </div>
                              <hr />
                              <div className="row">
                                <div className="col-sm-3"><p className="mb-0">Objetivo</p></div>
                                <div className="col-sm-9"><p className="text-muted mb-0">{project['_objetivo']}</p></div>
                              </div>
                              <hr />
                              <div className="row">
                                <div className="col-sm-3"><p className="mb-0">Estado</p></div>
                                <div className="col-sm-9"><p className="text-muted mb-0">{project['_estado']}</p></div>
                              </div>
                              <hr />
                              <div className="row">
                                <div className="col-sm-3"><p className="mb-0">Tags</p></div>
                                <div className="col-sm-9">
                                  <div>
                                    {project && project["_tags"] && project["_tags"].map((elemento) => (
                                        <span className="badge bg-secondary" style={{ marginRight:"10px" }}>{elemento}</span>
                                    ))}    
                                  </div>
                                </div>
                              </div>
                              <hr />


                              <div className="row">
                                <div className="col-sm-12">
                                  <div className="row">
                                    <table className="table">
                                      <thead>
                                        <tr>
                                          <th>Nombre</th>
                                          <th>Descripción</th>
                                          <th>Habilidades</th>
                                          <th>Cantidad</th>
                                          <th>Reclutados</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {project && project["_puestos"] && project["_puestos"].map((elemento) => (
                                          <tr>
                                            <td>{elemento["_nombre"]}</td>
                                            <td>{elemento["_descripcion"]}</td>
                                            <td>
                                              {elemento && elemento["_habilidades"] && elemento["_habilidades"].map((valor) => (
                                                  <p className="badge bg-secondary" style={{ marginRight:"10px" }}>{valor}</p>
                                              ))}   
                                            </td>
                                            <td>{elemento["_cantidad"]}</td>
                                            <td>
                                              {elemento["_id"] in positions ? (
                                                positions[elemento["_id"]].map((valor) => (
                                                    <p className="">{valor}</p>
                                                ))
                                              ):null}
                                            </td>
                                          </tr>
                                        ))}   
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>



                              
                            </div>
                          </div>
                        </div>
                      </div>
                  </nav>
                  </div>
              </div>
            </div>

            

            <div className="container ">
              <div className="row">
                  <div className="col">
                  <nav aria-label="breadcrumb" className="rounded-3 p-3 mb-4">
                      <div className="d-flex justify-content-center align-items-center">
                          {project["_administrador"] == email ? (
                              <div className="form-group d-flex justify-content-between mt-3">
                                <button type="button" className="btn btn-secondary m-2" onClick={() => handleRegresar()}>Regresar</button>
                                <button type="button" className="btn btn-primary m-2">Editar</button>
                                <button type="button" className="btn btn-danger m-2">Eliminar</button>
                              </div>
                          ):(
                              <div className="form-group d-flex justify-content-between mt-3">
                                <button type="button" className="btn btn-secondary mr-2">Regresar</button>
                              </div>
                          )}
                      </div>
                  </nav>
                  </div>
              </div>
            </div>



            



  
        </section>  
        )}
        

    </div>
      );
}


export default ViewProject;
