import React, { useEffect, useState } from "react";
import '../styles.scss';

function Breadcrum(props) {
    const { parent, children} = props;
    return (
        <>
            <nav className="breadcrumb" aria-label="breadcrumbs">
                <ul>
                    <li><a href="./dashboard">{parent}</a></li>
                    <li className="is-active"><a href="#" aria-current="page">{children}</a></li>
                </ul>
            </nav>
        </>
    )
}
export default Breadcrum;