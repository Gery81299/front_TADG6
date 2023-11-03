import axios from "axios";
import React, { useEffect, useState } from "react";
import Principal from "./Principal";



export const Inicio = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controlar si el usuario está autenticado
    const [projectsDiscover, setProjectsDiscover] = useState({});
    const [likeCounts, setLikeCounts] = useState({}); // Contadores de likes
    const [dislikeCounts, setDislikeCounts] = useState({}); // Contadores de dislikes
    const [userReactions, setUserReactions] = useState({}); // Registro de las reacciones del usuario

    const getDetail = (codProject) => {
        //const sessionData = localStorage.getItem("session");
        const sessionData = JSON.parse(localStorage.getItem("session"));
        sessionData["cod_proyecto"] = codProject;

        localStorage.setItem("session", JSON.stringify(sessionData));
        window.location.href = "ViewProject";
    }

    const getDiscover = async (email) => {
    try {
        console.log(email);
        const response = await axios.get("http://127.0.0.1:9000/api/project_discover?email="+email);
        console.log(response.data);
        setProjectsDiscover(response.data);

        // Inicializar los contadores y las reacciones del usuario
        const initialLikeCounts = {};
        const initialDislikeCounts = {};
        const initialUserReactions = {};

        response.data.forEach((project) => {
            initialLikeCounts[project._id] = project._likes;
            initialDislikeCounts[project._id] = project._dislikes;
            initialUserReactions[project._id] = null;
        });

        setLikeCounts(initialLikeCounts);
        setDislikeCounts(initialDislikeCounts);
        setUserReactions(initialUserReactions);

        console.log("proyectos por descubrir: ");
        console.log(projectsDiscover);
        } catch (error) {
            console.error("Error en la solicitud: ", error);
        }
    }

    const handleReaction = (projectId, reaction) => {
        // Comprueba si el usuario ya ha reaccionado en ese proyecto
        if (userReactions[projectId] === null) {
            if (reaction === 'like') {
                setLikeCounts({ ...likeCounts, [projectId]: likeCounts[projectId] + 1 });
            } else if (reaction === 'dislike') {
                setDislikeCounts({ ...dislikeCounts, [projectId]: dislikeCounts[projectId] + 1 });
            }
    
            setUserReactions({ ...userReactions, [projectId]: reaction });
        } else {
            // Si el usuario cambia su reacción, actualiza los contadores en consecuencia
            if (userReactions[projectId] === 'like' && reaction === 'dislike') {
                setLikeCounts({ ...likeCounts, [projectId]: likeCounts[projectId] - 1 });
                setDislikeCounts({ ...dislikeCounts, [projectId]: dislikeCounts[projectId] + 1 });
            } else if (userReactions[projectId] === 'dislike' && reaction === 'like') {
                setLikeCounts({ ...likeCounts, [projectId]: likeCounts[projectId] + 1 });
                setDislikeCounts({ ...dislikeCounts, [projectId]: dislikeCounts[projectId] - 1 });
            }
    
            setUserReactions({ ...userReactions, [projectId]: reaction });
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
            getDiscover(email);
        } else {
            window.location.href = "login";
        }
    }
    }, []);

    return(
    <div>
                
        <section style={{ backgroundColor: '#eee' }}>
            <div className="container py-5">
                <Principal />
            </div>


            <div className="container ">
              <div className="row">
                  <div className="col">
                  <nav aria-label="breadcrumb" className="rounded-3 p-3 mb-4">
                    <h5 className="card-title" style={{ color: '#FF0000' , textAlign:'center'}}>Descubre Proyectos Nuevos</h5>
                  </nav>
                  </div>
              </div>
            </div>

            {Array.isArray(projectsDiscover) && projectsDiscover.length > 0 ? (
                projectsDiscover.map((project, index) => (
                <div className="container ">
                    <div className="row">
                        <div className="col">
                        <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="col-9 p-2" style={{ marginLeft: '30px'}}>
                                    <h5 className="card-title">Titulo: {project["_titulo"]}</h5>
                                    <p>{project["_descripcion"]}</p>
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
                                    <div className="col-3 text-center" style={{ marginTop: '10px'}}>
                                        <button
                                            type="button"
                                            className={`btn btn-primary m-2 ${userReactions[project._id] === 'like' ? 'active' : ''}`}
                                            onClick={() => handleReaction(project._id, 'like')}
                                        >
                                            {likeCounts[project._id]} Like
                                        </button>
                                        <button
                                            type="button"
                                            className={`btn btn-primary m-2 ${userReactions[project._id] === 'dislike' ? 'active' : ''}`}
                                            onClick={() => handleReaction(project._id, 'dislike')}
                                        >
                                            {dislikeCounts[project._id]} Dislike
                                        </button>
                                    </div>
                                </div>
                                <div className="col-3 text-center" >
                                <button type="button" className="btn btn-primary m-2"  onClick={() => getDetail(project["_id"])}>
                                    Ver detalles
                                </button>
                                <button type="button" className="btn btn-primary m-2"  onClick={() => getDetail(project["_id"])}>
                                    Postular
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
                            <h5 className="card-title">No hay proyectos para descubrir</h5>
                        </div>
                    </nav>
                    </div>
                </div>
              </div>
            )}

        </section>
        
    </div>
      );
}


export default Inicio;
