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
                <li><a>Nueva Venta</a></li>
                <li><a>Historial de Ventas</a></li>
            </ul>
            <p class="menu-label">
                Productos</p>
            <ul class="menu-list">
                <li><a>Productos</a></li>
                <li><a>Categorías</a></li>
                <li><a>Proveedores</a></li>
            </ul>
            <p class="menu-label">
                Cerrar Sesión</p>
        </aside>
    )
}
export default Leftbar;