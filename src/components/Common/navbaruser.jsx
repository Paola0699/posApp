import React from "react";
import { Link } from 'react-router-dom'
import firebase from '../../firebaseElements/firebase'
import { useEffect, useState } from "react";

function Navbaruser() {
    return (
        <aside class="menu is-hidden-mobile">
            <p class="menu-label">
                General</p>
            <ul class="menu-list">
                <li><Link to={`${process.env.PUBLIC_URL}/dashboard`} className="navbar-item">Dashboard</Link></li>
            </ul>
            <p class="menu-label">
                Ventas</p>
            <ul class="menu-list">
                <li><Link to={`${process.env.PUBLIC_URL}/nueva-venta`} className="navbar-item">Nueva Venta</Link></li>
                <li><Link to={`${process.env.PUBLIC_URL}/ventas`} className="navbar-item">Historial de Ventas</Link></li>
            </ul>
        </aside>
    )
}
export default Navbaruser;