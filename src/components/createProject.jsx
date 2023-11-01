import axios from "axios";
import React, { useEffect, useState } from "react";
import Principal from "./Principal";


export const CreateProject = (props) => {

    //const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controlar si el usuario está autenticado
    const [email, setEmail] = useState();
    const [administrador, setAdministrador] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [objetivo, setObjetivo] = useState('');
    const [titulo, setTitulo] = useState('');
    const [estado, setEstado] = useState('');
    const [positions, setPositions] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const { history } = props;




    const [rows, setRows] = useState([{}]);

  const addRow = () => {
    setRows([...rows, {}]);
  };

  const deleteRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };













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
            setAdministrador(correo);
            setEstado("Reclutando");
            //const codProject = session["cod_proyecto"];
            console.log(session);
            //console.log("correo" + correo);
            setEmail(correo);
            //getProject(codProject);
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
        <section style={{ backgroundColor: '#FFFFFF' }}>
            <Principal/>


            <div className="container d-flex flex-column align-items-center justify-content-center">
                <div className="col-lg-12">
                    <div className="card mb-4">
                        <div className="card-body">
                            <form className="flex-column">
                                <div className="form-group d-flex justify-content-between mt-3">
                                    <label htmlFor="administrador" className="col-2">Administrador</label>
                                    <input type="text" disabled id="administrador" name="administrador" value={administrador} onChange={(e) => setAdministrador(e.target.value)} className="form-control mx-2" required />
                                </div>
                                <div className="form-group d-flex justify-content-between mt-3">
                                    <label htmlFor="titulo" className="col-2">Título</label>
                                    <input type="text" id="titulo" name="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} className="form-control mx-2" required />
                                </div>
                                <div className="form-group d-flex justify-content-between mt-3">
                                    <label htmlFor="descripcion" className="col-2">Descripción</label>
                                    <textarea type="text" id="descripcion" name="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} className="form-control mx-2" required />
                                </div>
                                <div className="form-group d-flex justify-content-between mt-3">
                                    <label htmlFor="objetivo" className="col-2">Objetivo</label>
                                    <textarea type="text" id="objetivo" name="objetivo" value={objetivo} onChange={(e) => setObjetivo(e.target.value)} className="form-control mx-2" required />
                                </div>
                                <div className="form-group d-flex justify-content-between mt-3">
                                    <label htmlFor="estado" className="col-2">Estado</label>
                                    <input type="text" disabled id="estado" name="estado" value={estado} onChange={(e) => setEstado(e.target.value)} className="form-control mx-2" required />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            

            <div className="container ">
                <div className="row">
                    <div className="col">
                        <nav aria-label="breadcrumb" className="rounded-3 p-3 mb-4">
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="form-group d-flex justify-content-between mt-3">
                                <button type="button" className="btn btn-secondary m-2" onClick={() => handleRegresar()}>Regresar</button>
                                <button type="button" className="btn btn-primary m-2">Crear</button>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>

        </section>  



        <div className="container">
            <table className="table">
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Habilidades</th>
                    <th>Cantidad</th>
                </tr>
                </thead>
                <tbody>
                {rows.map((row, index) => (
                    <tr key={index}>
                    <td>
                        <input type="text" className="form-control" />
                    </td>
                    <td>
                        <textarea type="text" className="form-control" />
                    </td>
                    <td>
                        <input type="text" className="form-control" />
                    </td>
                    <td>
                        <input type="text" className="form-control" />
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="d-flex justify-content-center align-items-center">
                <div className="form-group d-flex justify-content-between mt-3">
                    <button className="btn btn-primary mx-2" onClick={addRow}>
                        Añadir Fila
                    </button>
                    <button className="btn btn-danger" onClick={() => deleteRow(1)}>
                        Eliminar última Fila
                    </button>
                </div>
            </div>
        </div>
    </div>
      );
}


export default CreateProject;
