import React, { useEffect, useState } from "react";
import '../styles.scss';

function Breadcrum(props) {
    const { parent, children} = props;
    return (
        <>
            <nav class="breadcrumb" aria-label="breadcrumbs">
                <ul>
                    <li><a href="./dashboard">{parent}</a></li>
                    <li class="is-active"><a href="#" aria-current="page">{children}</a></li>
                </ul>
            </nav>
        </>
    )
}
export default Breadcrum;