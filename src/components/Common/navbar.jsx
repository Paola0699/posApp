import React from "react";
import { Link } from 'react-router-dom'
import firebase from '../../firebaseElements/firebase'
import { useEffect, useState } from "react";

function close() {
    firebase.auth().signOut().then(function () {
        
    }).catch(function (error) {
        // An error happened.
    });
}

function Navbar() {
    const [isActive, setisActive] = useState(false);
    return ( 
        <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="#">

                </a>
                <a
                    role="button"
                    className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="navbarBasicExample"

                    onClick={() => {
                        setisActive(!isActive);
                    }}
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample"
                className={`navbar-menu ${isActive ? "is-active" : ""}`}>
                <div className="navbar-start">
                    {/* <Link to={`${process.env.PUBLIC_URL}/general`} className="navbar-item">
                        Tabla General
                    </Link>

                    <Link to={`${process.env.PUBLIC_URL}/mapa`} className="navbar-item">
                        Mapa Interactivo
                    </Link>

                    <Link to={`${process.env.PUBLIC_URL}/reuniones`} className="navbar-item">
                        Reuniones y Acuerdos
                    </Link>
                    <Link to={`${process.env.PUBLIC_URL}/nueva-gestion`} className="navbar-item">
                        Gestiones
                    </Link>
                    <Link to={`${process.env.PUBLIC_URL}/directorio`} className="navbar-item">
                        Directorio
                    </Link>
                    <div className="navbar-item has-dropdown is-hoverable">
                        <a className="navbar-link">
                            Subir Información
                        </a>
                        <div className="navbar-dropdown">
                            <Link to={`${process.env.PUBLIC_URL}/nuevo`} className="navbar-item">
                                Alta de Municipios
                            </Link>
                            <Link to={`${process.env.PUBLIC_URL}/info-electoral`} className="navbar-item">
                                Alta de Información electoral
                            </Link>
                        </div>
                    </div> */}
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <Link onClick={close} to={`${process.env.PUBLIC_URL}`} className="button is-primary">
                                <strong>Cerrar Sesión</strong>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default Navbar;