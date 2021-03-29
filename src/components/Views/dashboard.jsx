import React, { useEffect, useState } from "react";
import { Redirect } from 'react-router-dom'
import Navbar from "../Common/navbar"
import '../styles.scss';

function Dashboard() {
    return (
        <>
            <Navbar />
            <h1>Felicidades inciiaste sesion</h1>
        </>
    )
}
export default Dashboard;