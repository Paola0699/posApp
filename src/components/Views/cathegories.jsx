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
    return (
        <>
            <Navbar />
            <div class="container">
                <div class="columns is-mobile">
                    <div class="column is-3-desktop is-hidden-mobile">
                        <Leftbar />
                    </div>
                    <div class="column is-9-desktop is-12-mobile" style={{ overflow: 'scroll' }}>
                        <Breadcrum />
                        <Hero title='Categorías' subtitle='Todas las Categorías' />
                        <br />
                        <div className='columns'>
                            <div className='column'>
                                <div className='card'>
                                    <header class="card-header">
                                        <p class="card-header-title">
                                            Nueva Categoría</p>
                                    </header>
                                    <div class="card-content">
                                        <div class="content">
                                            <form onSubmit={handleStepSubmit}>
                                                <div class="field">
                                                    <label class="label">Nombre</label>
                                                    <div class="control">
                                                        <input required ref={nameRef} onChange={e => setName(e.target.value)} class="input" type="text" placeholder="e.g Bebidas" />
                                                    </div>
                                                </div>

                                                <div class="field">
                                                    <label class="label">Descripción</label>
                                                    <div class="control">
                                                        <textarea required ref={descriptionRef} onChange={e => setDescription(e.target.value)} class="textarea" placeholder="Escribe una breve descripción sobre la categoría"></textarea>
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
                                    <header class="card-header">
                                        <p class="card-header-title">
                                            Categorías</p>
                                    </header>
                                    <div class="card-content">
                                        <div class="content">
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