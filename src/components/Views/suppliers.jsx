import Breadcrum from "../Common/breadcrum";
import React, { useEffect, useState, useRef } from "react";
import firebase from '../../firebaseElements/firebase'
import Hero from "../Common/hero";
import Leftbar from "../Common/leftbar";
import Navbar from "../Common/navbar"
import Modal from 'react-responsive-modal';
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component';

function Suppliers() {
    const db = firebase.firestore();
    const [suppliersList, setSuppliersList] = useState([]);

    useEffect(() => {
        db.collection("supplier").onSnapshot(doc => {
            let allSup = doc.docs.map(sup => {
                return {
                    id: sup.id,
                    ...sup.data()
                }
            })
            setSuppliersList(allSup);
        });
    }, [])

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
        },
        {
            name: 'Acciones',
            selector: 'description',
            sortable: true,
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
                        <Hero  title='Proveedores' subtitle='Todos los Proveedores'/>
                        <br />
                        <div className='columns'>
                            <div className='column is-8'></div>
                            <div className='column is-4'>
                                <Link to={`${process.env.PUBLIC_URL}/proveedores/nuevo-proveedor`} className='button is-fullwidth is-success'>Agregar Proveedor</Link>
                            </div>
                        </div>
                        <div className='columns'>
                            <div className='column box'>
                                <DataTable
                                    noHeader={true}
                                    columns={columns}
                                    data={suppliersList}
                                    pagination={true}
                                    overflowY={true}
                                    paginationComponentOptions={{ rowsPerPageText: 'Filas por pagina:', rangeSeparatorText: 'de' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Suppliers;