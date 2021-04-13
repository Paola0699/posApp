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
        }
    });
    return redirect ? <Redirect to={''} /> : (
        <>
            <Navbar />
            <div className="container">
                <div className="columns is-mobile">
                    <div className="column is-3-desktop is-hidden-mobile">
                        {usertype === "admin" ? <Leftbar /> : <Navbaruser />}
                    </div>
                    <div className="column is-9-desktop is-12-mobile" style={{ overflow: 'scroll' }}>
                        <Breadcrum />
                        <Hero title="Inicio" subtitle="Bienvenido Administrador" />
                        {/*  <section className="info-tiles">
                            <div className="tile is-ancestor has-text-centered">
                                <div className="tile is-parent">
                                    <article className="tile is-child box">
                                        <p className="title">439k</p>
                                        <p className="subtitle">Users</p>
                                    </article>
                                </div>
                                <div className="tile is-parent">
                                    <article className="tile is-child box">
                                        <p className="title">59k</p>
                                        <p className="subtitle">Products</p>
                                    </article>
                                </div>
                                <div className="tile is-parent">
                                    <article className="tile is-child box">
                                        <p className="title">3.4k</p>
                                        <p className="subtitle">Open Orders</p>
                                    </article>
                                </div>
                                <div className="tile is-parent">
                                    <article className="tile is-child box">
                                        <p className="title">19</p>
                                        <p className="subtitle">Exceptions</p>
                                    </article>
                                </div>
                            </div>
                        </section> */}
                        {/* <div className="columns">
                            <div className="column is-6">
                                <div className="card events-card">
                                    <header className="card-header">
                                        <p className="card-header-title">
                                            Events
                                </p>
                                        <a href="#" className="card-header-icon" aria-label="more options">
                                            <span className="icon">
                                                <i className="fa fa-angle-down" aria-hidden="true"></i>
                                            </span>
                                        </a>
                                    </header>
                                    <div className="card-table">
                                        <div className="content">
                                            <table className="table is-fullwidth is-striped">
                                                <tbody>
                                                    <tr>
                                                        <td width="5%"><i className="fa fa-bell-o"></i></td>
                                                        <td>Lorum ipsum dolem aire</td>
                                                        <td className="level-right"><a className="button is-small is-primary" href="#">Action</a></td>
                                                    </tr>
                                                    <tr>
                                                        <td width="5%"><i className="fa fa-bell-o"></i></td>
                                                        <td>Lorum ipsum dolem aire</td>
                                                        <td className="level-right"><a className="button is-small is-primary" href="#">Action</a></td>
                                                    </tr>
                                                    <tr>
                                                        <td width="5%"><i className="fa fa-bell-o"></i></td>
                                                        <td>Lorum ipsum dolem aire</td>
                                                        <td className="level-right"><a className="button is-small is-primary" href="#">Action</a></td>
                                                    </tr>
                                                    <tr>
                                                        <td width="5%"><i className="fa fa-bell-o"></i></td>
                                                        <td>Lorum ipsum dolem aire</td>
                                                        <td className="level-right"><a className="button is-small is-primary" href="#">Action</a></td>
                                                    </tr>
                                                    <tr>
                                                        <td width="5%"><i className="fa fa-bell-o"></i></td>
                                                        <td>Lorum ipsum dolem aire</td>
                                                        <td className="level-right"><a className="button is-small is-primary" href="#">Action</a></td>
                                                    </tr>
                                                    <tr>
                                                        <td width="5%"><i className="fa fa-bell-o"></i></td>
                                                        <td>Lorum ipsum dolem aire</td>
                                                        <td className="level-right"><a className="button is-small is-primary" href="#">Action</a></td>
                                                    </tr>
                                                    <tr>
                                                        <td width="5%"><i className="fa fa-bell-o"></i></td>
                                                        <td>Lorum ipsum dolem aire</td>
                                                        <td className="level-right"><a className="button is-small is-primary" href="#">Action</a></td>
                                                    </tr>
                                                    <tr>
                                                        <td width="5%"><i className="fa fa-bell-o"></i></td>
                                                        <td>Lorum ipsum dolem aire</td>
                                                        <td className="level-right"><a className="button is-small is-primary" href="#">Action</a></td>
                                                    </tr>
                                                    <tr>
                                                        <td width="5%"><i className="fa fa-bell-o"></i></td>
                                                        <td>Lorum ipsum dolem aire</td>
                                                        <td className="level-right"><a className="button is-small is-primary" href="#">Action</a></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <footer className="card-footer">
                                        <a href="#" className="card-footer-item">View All</a>
                                    </footer>
                                </div>
                            </div>
                            <div className="column is-6">
                                <div className="card">
                                    <header className="card-header">
                                        <p className="card-header-title">
                                            Inventory Search
                                </p>
                                        <a href="#" className="card-header-icon" aria-label="more options">
                                            <span className="icon">
                                                <i className="fa fa-angle-down" aria-hidden="true"></i>
                                            </span>
                                        </a>
                                    </header>
                                    <div className="card-content">
                                        <div className="content">
                                            <div className="control has-icons-left has-icons-right">
                                                <input className="input is-large" type="text" placeholder="" />
                                                <span className="icon is-medium is-left">
                                                    <i className="fa fa-search" />
                                                </span>
                                                <span className="icon is-medium is-right">
                                                    <i className="fa fa-check" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <header className="card-header">
                                        <p className="card-header-title">
                                            User Search
                                </p>
                                        <a href="#" className="card-header-icon" aria-label="more options">
                                            <span className="icon">
                                                <i className="fa fa-angle-down" aria-hidden="true"></i>
                                            </span>
                                        </a>
                                    </header>
                                    <div className="card-content">
                                        <div className="content">
                                            <div className="control has-icons-left has-icons-right">
                                                <input className="input is-large" type="text" placeholder="" />
                                                <span className="icon is-medium is-left">
                                                    <i className="fa fa-search"></i>
                                                </span>
                                                <span className="icon is-medium is-right">
                                                    <i className="fa fa-check"></i>
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