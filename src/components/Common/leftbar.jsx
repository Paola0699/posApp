import React from "react";
import { Link } from 'react-router-dom'

function Leftbar() {
    return (
        <aside className="menu is-hidden-mobile">
            <p className="menu-label">
                General</p>
            <ul className="menu-list">
                <li><Link to={`${process.env.PUBLIC_URL}/dashboard`} className="navbar-item">Dashboard</Link></li>
            </ul>
            <p className="menu-label">
                Ventas</p>
            <ul className="menu-list">
                <li><Link to={`${process.env.PUBLIC_URL}/nueva-venta`} className="navbar-item">Nueva Venta</Link></li>
                <li><Link to={`${process.env.PUBLIC_URL}/ventas`} className="navbar-item">Historial de Ventas</Link></li>
            </ul>
            <p className="menu-label">
                Productos</p>
            <ul className="menu-list">
                <li><Link to={`${process.env.PUBLIC_URL}/productos`} className="navbar-item">Productos</Link></li>
                <li><Link to={`${process.env.PUBLIC_URL}/categorias`} className="navbar-item">Categorías</Link></li>
                <li><Link to={`${process.env.PUBLIC_URL}/proveedores`} className="navbar-item">Proveedores</Link></li>
            </ul>
        </aside>
    )
}
export default Leftbar;