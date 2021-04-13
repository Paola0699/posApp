import React, { useEffect, useState, useRef } from "react";
import { Redirect } from 'react-router-dom'
import Breadcrum from "../Common/breadcrum";
import Hero from "../Common/hero";
import Leftbar from "../Common/leftbar";
import Navbar from "../Common/navbar"
import '../styles.scss';
import DataTable from 'react-data-table-component';
import firebase from '../../firebaseElements/firebase'
import Swal from 'sweetalert2'

function Cathegories() {
    const db = firebase.firestore();

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [cathegoriesList, setCathegoriesList] = useState([])
    const [redirect, setRedirect] = useState(false);
    const [usertype, setUser] = useState('')

    const nameRef = useRef();
    const descriptionRef = useRef();


    const fields = [
        nameRef,
        descriptionRef,
    ]

    const handleStepSubmit = e => {
        e.preventDefault();
        db.collection("cathegories").add({
            name: name,
            description: description,
        }).then(() => {
            fields.forEach(field => field.current.value = '')
            Swal.fire({
                icon: 'success',
                title: 'Creado',
                text: `¡La categoría se ha creado con éxito!`,
            })
        }).catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Ocurrio un error: ${error}`,
            })
        })
    }

    useEffect(() => {
        db.collection("cathegories").onSnapshot(doc => {
            let allCats = doc.docs.map(cath => {
                return {
                    id: cath.id,
                    ...cath.data()
                }
            })
            setCathegoriesList(allCats);
        });
    }, [])


    const data = [{ id: 1, title: 'Conan the Barbarian', year: '1982' }]
    const columns = [
        {
            name: 'Nombre',
            selector: 'name',
            sortable: true,
        },
        {
            name: 'Descripción',
            selector: 'description',
            sortable: true,
            right: true,
        },
    ];
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
    return  redirect ? <Redirect to={''} /> : (
        <>
            {usertype === "admin" ? <Navbar /> : null }
            <div className="container">
                <div className="columns is-mobile">
                    <div className="column is-3-desktop is-hidden-mobile">
                        <Leftbar />
                    </div>
                    <div className="column is-9-desktop is-12-mobile" style={{ overflow: 'scroll' }}>
                        <Breadcrum  parent='Inicio' children='Categorias'/>
                        <Hero title='Categorías' subtitle='Todas las Categorías' />
                        <br />
                        <div className='columns'>
                            <div className='column'>
                                <div className='card'>
                                    <header className="card-header">
                                        <p className="card-header-title">
                                            Nueva Categoría</p>
                                    </header>
                                    <div className="card-content">
                                        <div className="content">
                                            <form onSubmit={handleStepSubmit}>
                                                <div className="field">
                                                    <label className="label">Nombre</label>
                                                    <div className="control">
                                                        <input required ref={nameRef} onChange={e => setName(e.target.value)} className="input" type="text" placeholder="e.g Bebidas" />
                                                    </div>
                                                </div>

                                                <div className="field">
                                                    <label className="label">Descripción</label>
                                                    <div className="control">
                                                        <textarea required ref={descriptionRef} onChange={e => setDescription(e.target.value)} className="textarea" placeholder="Escribe una breve descripción sobre la categoría"></textarea>
                                                    </div>
                                                </div>

                                                {!description || !name ? <button disabled type="submit" value='submit' className='button is-success is-fullwidth'>Agregar Categoría</button> : <button type="submit" value='submit' className='button is-success is-fullwidth'>Agregar Categoría</button>}
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='column'>
                                <div className='card'>
                                    <header className="card-header">
                                        <p className="card-header-title">
                                            Categorías</p>
                                    </header>
                                    <div className="card-content">
                                        <div className="content">
                                            {cathegoriesList ? <DataTable
                                                noHeader={true}
                                                columns={columns}
                                                data={cathegoriesList}
                                                pagination={true}
                                                paginationComponentOptions={{ rowsPerPageText: 'Filas por pagina:', rangeSeparatorText: 'de' }}
                                            /> : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Cathegories;