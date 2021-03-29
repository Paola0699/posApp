import React, { useEffect, useState } from "react";
import '../styles.scss';

function Breadcrum() {
    return (
        <>
            <nav class="breadcrumb" aria-label="breadcrumbs">
                <ul>
                    <li><a href="../">Bulma</a></li>
                    <li><a href="../">Templates</a></li>
                    <li><a href="../">Examples</a></li>
                    <li class="is-active"><a href="#" aria-current="page">Admin</a></li>
                </ul>
            </nav>
        </>
    )
}
export default Breadcrum;