import React, { useEffect, useState, useRef } from "react";
import { Redirect } from 'react-router-dom'
import Breadcrum from "../Common/breadcrum";
import Hero from "../Common/hero";
import Leftbar from "../Common/leftbar";
import Navbar from "../Common/navbar"
import '../styles.scss';
import DataTable from 'react-data-table-component';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import Switch from "react-switch";
import firebase from '../../firebaseElements/firebase'
import Swal from 'sweetalert2'

function Products() {
    const db = firebase.firestore();

    const data = [{ id: 1, title: 'Conan the Barbarian', year: '1982' }]
    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState(false)
    const [name, setName] = useState("")
    const [cathegory, setCathegory] = useState("")
    const [description, setDescription] = useState("")
    const [provPrice, setProvPrice] = useState(0)
    const [price, setPrice] = useState(0)
    const [cathegoriesList, setCathegoriesList] = useState([])

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false)

    const nameRef = useRef();
    const cathegoryRef = useRef();
    const descriptionRef = useRef();
    const provPriceRef = useRef();
    const priceRef = useRef();
    const statusRef = useRef();

    const fields = [
        nameRef,
        cathegoryRef,
        descriptionRef,
        provPriceRef,
        priceRef,
        statusRef
    ]

    const handleChange = () => {
        if (checked) {
            setChecked(false)
        } else {
            setChecked(true)
        }
    }

    const handleStepSubmit = e => {
        e.preventDefault();
        console.log(name)
        console.log(cathegory)
        console.log(description)
        console.log(provPrice)
        console.log(price)
        console.log(checked)

        db.collection("products").add({
            name: name,
            cathegory: cathegory,
            description: description,
            provPrice: Number(provPrice),
            price: Number(price),
            status: checked,
        }).then(() => {
            fields.forEach(field => field.current.value = '')
            Swal.fire({
                icon: 'success',
                title: 'Creado',
                text: `¡El se ha creado con éxito!`,
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

    const columns = [
        {
            name: 'Title',
            selector: 'title',
            sortable: true,
        },
        {
            name: 'Year',
            selector: 'year',
            sortable: true,
            right: true,
        },
    ];
    return (
        <>
            <Navbar />
            <div class="container">
                <div class="columns is-mobile">
                    <div class="column is-3-desktop">
                        <Leftbar />
                    </div>
                    <div class="column is-9-desktop is-12-mobile" style={{ overflow: 'scroll' }}>
                        <Breadcrum />
                        <Hero />
                        <br />
                        <div className='columns'>
                            <div className='column is-8'>
                                <div class="select is-fullwidth">
                                    <select>
                                        <option>Filtrar Por Categoria</option>
                                        <option>With options</option>
                                    </select>
                                </div>
                            </div>
                            <div className='column is-4'>
                                <button className='button is-fullwidth is-success' onClick={onOpenModal}>Agregar Producto</button>
                            </div>
                        </div>
                        <DataTable
                            title="Arnold Movies"
                            columns={columns}
                            data={data}
                        />
                    </div>
                </div>
            </div>
            <Modal open={open} onClose={onCloseModal} center classNames={{
                modal: 'customModal',
            }}>
                <div style={{ padding: '2.8rem' }}>
                    <h1 className="title">Nuevo Producto</h1>
                    <hr className="login-hr" />

                    <form className='columns' onSubmit={handleStepSubmit}>
                        <div className='column'>
                            <h3 class="title is-4">General</h3>
                            <p class="subtitle is-6">Cambie la información general de este producto.</p>
                            <div class="field">
                                <label class="label">Nombre</label>
                                <div class="control">
                                    <input required  ref={nameRef} onChange={e => setName(e.target.value)} class="input" type="text" placeholder="Introduzca nombre del producto" />
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Categoría</label>
                                <div class="control">
                                    <div class="select is-fullwidth">
                                        <select ref={cathegoryRef} onChange={e => setCathegory(e.target.value)} >
                                            <option selected disabled value=''>Seleccione una Categoría</option>
                                            {cathegoriesList.map(cat =>
                                                <option key={cat.id} value={cat.id}> {cat.name} </option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Descripción</label>
                                <div class="control">
                                    <textarea ref={descriptionRef} onChange={e => setDescription(e.target.value)}  required class="textarea" placeholder="Escribe una breve descripción sobre el producto"></textarea>
                                </div>
                            </div>
                        </div>
                        <div className='column'>
                            <h3 class="title is-4">Precio</h3>
                            <div class="field">
                                <label class="label">Costo Proveedor</label>
                                <div class="control">
                                    <input required ref={provPriceRef} onChange={e => setProvPrice(e.target.value)} class="input" type="number" />
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Precio de Venta</label>
                                <div class="control">
                                    <input required ref={priceRef} onChange={e => setPrice(e.target.value)}  class="input" type="number" />
                                </div>
                            </div>

                            <Switch onChange={handleChange} checked={checked} />
                            <h3 class="title is-6">Vender en Punto de Venta</h3>
                            <p class="subtitle is-7">Haga que este producto esté activo y disponible a la venta en la tienda.</p>

                            <button type="submit" value='submit' className='button is-success is-fullwidth'>Guardar</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    )
}
export default Products;