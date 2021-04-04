import Breadcrum from "../Common/breadcrum";
import React, { useEffect, useState, useRef } from "react";
import firebase from '../../firebaseElements/firebase'
import Hero from "../Common/hero";
import Leftbar from "../Common/leftbar";
import Navbar from "../Common/navbar"
import Modal from 'react-responsive-modal';
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component';
import { Redirect } from 'react-router-dom'
import memoize from 'memoize-one';

function Suppliers() {
    const db = firebase.firestore();
    const [suppliersList, setSuppliersList] = useState([]);
    const [open, setOpen] = useState(false);
    const [locationDetail, setlocationDetail] = useState()
    const [redirect, setRedirect] = useState(false);
    const [usertype, setUser] = useState('')

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

    const columns = memoize((seSupp, modal) => [
        {
            name: 'Nombre',
            selector: 'nickName',
            sortable: true,
        },
        {
            name: 'Descripción',
            selector: 'description',
            sortable: true,
            wrap: true,
        },
        {
            name: 'Acciones',
            cell: row => <div className='is-flex'>
                <button onClick={() => { modal(true); seSupp(row) }} className='button is-success is-outlined' style={{ marginRight: '2%' }}>Detalles</button>
            </div>,
            left: true,
        },
    ]);

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

    const selectProduct = pro => {
        setlocationDetail(pro)
    }

    return redirect ? <Redirect to={''} /> : (
        <>
            {usertype === "admin" ? <Navbar /> : null }
            <div class="container">
                <div class="columns is-mobile">
                    <div class="column is-3-desktop is-hidden-mobile">
                        <Leftbar />
                    </div>
                    <div class="column is-9-desktop is-12-mobile" style={{ overflow: 'scroll' }}>
                        <Breadcrum  parent='Inicio' children='Proveedores' />
                        <Hero title='Proveedores' subtitle='Todos los Proveedores' />
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
                                    columns={columns(selectProduct, setOpen)}
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

            {locationDetail ? <Modal open={open} onClose={() => setOpen(false)} center classNames={{
                modal: 'customModal',
            }}>
                <div style={{ padding: '2.8rem' }}>
                    <h1 className="title">0{locationDetail.id}</h1>
                    <div className='columns'>
                        <div className='column'>
                            <h3 class="title is-4">General</h3>
                            <div class="field">
                                <label class="label">Identificador Proveedor</label>
                                <div class="control">
                                    {locationDetail.nickName} 
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Descripción</label>
                                <div class="control">
                                    {locationDetail.description}
                                </div>
                            </div>
                            <h3 class="title is-4">Dirección</h3>
                            <div class="field">
                                <label class="label">Domicilio</label>
                                <div class="control">
                                    {locationDetail.street + ' ' + locationDetail.street2 + ' ,  ' + locationDetail.suburb + " , " + locationDetail.postCode + ' , ' + locationDetail.state + ' , ' + locationDetail.country}
                                </div>
                            </div>

                        </div>
                        <div className='column'>
                            <h3 class="title is-4">Información de Contacto</h3>
                            <div class="field">
                                <label class="label">Nombre Proveedor</label>
                                <div class="control">
                                    {locationDetail.name + " " + locationDetail.lastName}
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Compañía</label>
                                <div class="control">
                                    {locationDetail.company}
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Teléfonos</label>
                                <div class="control">
                                    {locationDetail.phone + "  |  " + locationDetail.cellphone}
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Email</label>
                                <div class="control">
                                    {locationDetail.email}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
                : null}
        </>
    )
}
export default Suppliers;