import React from "react";
import { Link } from 'react-router-dom'

function Leftbar() {
    return (
        <aside class="menu is-hidden-mobile">
            <p class="menu-label">
                General</p>
            <ul class="menu-list">
                <li><a class="is-active">Dashboard</a></li>
            </ul>
            <p class="menu-label">
                Ventas</p>
            <ul class="menu-list">
                <li><Link to={`${process.env.PUBLIC_URL}/nueva-venta`} className="navbar-item">Nueva Venta</Link></li>
                <li><Link to={`${process.env.PUBLIC_URL}/ventas`} className="navbar-item">Historial de Ventas</Link></li>
            </ul>
            <p class="menu-label">
                Productos</p>
            <ul class="menu-list">
                <li><Link to={`${process.env.PUBLIC_URL}/productos`} className="navbar-item">Productos</Link></li>
                <li><Link to={`${process.env.PUBLIC_URL}/categorias`} className="navbar-item">Categorías</Link></li>
                <li><Link to={`${process.env.PUBLIC_URL}/proveedores`} className="navbar-item">Proveedores</Link></li>
            </ul>
            <p class="menu-label">
                Cerrar Sesión</p>
        </aside>
    )
}
export default Leftbar;