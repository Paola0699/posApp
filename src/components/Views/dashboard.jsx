import React, { useEffect, useState } from "react";
import { Redirect } from 'react-router-dom'
import Breadcrum from "../Common/breadcrum";
import Hero from "../Common/hero";
import Leftbar from "../Common/leftbar";
import Navbar from "../Common/navbar"
import Navbaruser from "../Common/navbaruser";
import '../styles.scss';
import firebase from '../../firebaseElements/firebase'


function Dashboard() {
    const db = firebase.firestore();

    const [redirect, setRedirect] = useState(false);
    const [usertype, setUser] = useState('')

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            db.collection("accounts").doc(user.uid).onSnapshot((doc) => {
                if (doc.data().type === 'admin') {
                    setUser("admin")
                }
                else setUser("user")
            })
        } else {
            setRedirect(true)
            console.log("No estoy loggeado")
        }
    });
    return redirect ? <Redirect to={''} /> : (
        <>
            <Navbar />
            <div class="container">
                <div class="columns is-mobile">
                    <div class="column is-3-desktop is-hidden-mobile">
                        {usertype === "admin" ? <Leftbar /> : <Navbaruser />}
                    </div>
                    <div class="column is-9-desktop is-12-mobile" style={{ overflow: 'scroll' }}>
                        <Breadcrum />
                        <Hero title="Inicio" subtitle="Bienvenido Administrador" />
                        {/*  <section class="info-tiles">
                            <div class="tile is-ancestor has-text-centered">
                                <div class="tile is-parent">
                                    <article class="tile is-child box">
                                        <p class="title">439k</p>
                                        <p class="subtitle">Users</p>
                                    </article>
                                </div>
                                <div class="tile is-parent">
                                    <article class="tile is-child box">
                                        <p class="title">59k</p>
                                        <p class="subtitle">Products</p>
                                    </article>
                                </div>
                                <div class="tile is-parent">
                                    <article class="tile is-child box">
                                        <p class="title">3.4k</p>
                                        <p class="subtitle">Open Orders</p>
                                    </article>
                                </div>
                                <div class="tile is-parent">
                                    <article class="tile is-child box">
                                        <p class="title">19</p>
                                        <p class="subtitle">Exceptions</p>
                                    </article>
                                </div>
                            </div>
                        </section> */}
                        {/* <div class="columns">
                            <div class="column is-6">
                                <div class="card events-card">
                                    <header class="card-header">
                                        <p class="card-header-title">
                                            Events
                                </p>
                                        <a href="#" class="card-header-icon" aria-label="more options">
                                            <span class="icon">
                                                <i class="fa fa-angle-down" aria-hidden="true"></i>
                                            </span>
                                        </a>
                                    </header>
                                    <div class="card-table">
                                        <div class="content">
                                            <table class="table is-fullwidth is-striped">
                                                <tbody>
                                                    <tr>
                                                        <td width="5%"><i class="fa fa-bell-o"></i></td>
                                                        <td>Lorum ipsum dolem aire</td>
                                                        <td class="level-right"><a class="button is-small is-primary" href="#">Action</a></td>
                                                    </tr>
                                                    <tr>
                                                        <td width="5%"><i class="fa fa-bell-o"></i></td>
                                                        <td>Lorum ipsum dolem aire</td>
                                                        <td class="level-right"><a class="button is-small is-primary" href="#">Action</a></td>
                                                    </tr>
                                                    <tr>
                                                        <td width="5%"><i class="fa fa-bell-o"></i></td>
                                                        <td>Lorum ipsum dolem aire</td>
                                                        <td class="level-right"><a class="button is-small is-primary" href="#">Action</a></td>
                                                    </tr>
                                                    <tr>
                                                        <td width="5%"><i class="fa fa-bell-o"></i></td>
                                                        <td>Lorum ipsum dolem aire</td>
                                                        <td class="level-right"><a class="button is-small is-primary" href="#">Action</a></td>
                                                    </tr>
                                                    <tr>
                                                        <td width="5%"><i class="fa fa-bell-o"></i></td>
                                                        <td>Lorum ipsum dolem aire</td>
                                                        <td class="level-right"><a class="button is-small is-primary" href="#">Action</a></td>
                                                    </tr>
                                                    <tr>
                                                        <td width="5%"><i class="fa fa-bell-o"></i></td>
                                                        <td>Lorum ipsum dolem aire</td>
                                                        <td class="level-right"><a class="button is-small is-primary" href="#">Action</a></td>
                                                    </tr>
                                                    <tr>
                                                        <td width="5%"><i class="fa fa-bell-o"></i></td>
                                                        <td>Lorum ipsum dolem aire</td>
                                                        <td class="level-right"><a class="button is-small is-primary" href="#">Action</a></td>
                                                    </tr>
                                                    <tr>
                                                        <td width="5%"><i class="fa fa-bell-o"></i></td>
                                                        <td>Lorum ipsum dolem aire</td>
                                                        <td class="level-right"><a class="button is-small is-primary" href="#">Action</a></td>
                                                    </tr>
                                                    <tr>
                                                        <td width="5%"><i class="fa fa-bell-o"></i></td>
                                                        <td>Lorum ipsum dolem aire</td>
                                                        <td class="level-right"><a class="button is-small is-primary" href="#">Action</a></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <footer class="card-footer">
                                        <a href="#" class="card-footer-item">View All</a>
                                    </footer>
                                </div>
                            </div>
                            <div class="column is-6">
                                <div class="card">
                                    <header class="card-header">
                                        <p class="card-header-title">
                                            Inventory Search
                                </p>
                                        <a href="#" class="card-header-icon" aria-label="more options">
                                            <span class="icon">
                                                <i class="fa fa-angle-down" aria-hidden="true"></i>
                                            </span>
                                        </a>
                                    </header>
                                    <div class="card-content">
                                        <div class="content">
                                            <div class="control has-icons-left has-icons-right">
                                                <input class="input is-large" type="text" placeholder="" />
                                                <span class="icon is-medium is-left">
                                                    <i class="fa fa-search" />
                                                </span>
                                                <span class="icon is-medium is-right">
                                                    <i class="fa fa-check" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card">
                                    <header class="card-header">
                                        <p class="card-header-title">
                                            User Search
                                </p>
                                        <a href="#" class="card-header-icon" aria-label="more options">
                                            <span class="icon">
                                                <i class="fa fa-angle-down" aria-hidden="true"></i>
                                            </span>
                                        </a>
                                    </header>
                                    <div class="card-content">
                                        <div class="content">
                                            <div class="control has-icons-left has-icons-right">
                                                <input class="input is-large" type="text" placeholder="" />
                                                <span class="icon is-medium is-left">
                                                    <i class="fa fa-search"></i>
                                                </span>
                                                <span class="icon is-medium is-right">
                                                    <i class="fa fa-check"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Dashboard;