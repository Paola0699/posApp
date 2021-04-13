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
import CurrencyFormat from 'react-currency-format';


function Products() {
    const db = firebase.firestore();

    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState(false)
    const [name, setName] = useState("")
    const [cathegory, setCathegory] = useState("")
    const [description, setDescription] = useState("")
    const [provPrice, setProvPrice] = useState(0)
    const [price, setPrice] = useState(0)
    const [supplier, setSupplier] = useState("")
    const [cathegoriesList, setCathegoriesList] = useState([])
    const [productsList, setProductsList] = useState([])
    const [filteredProductsList, setFilteredProductsList] = useState([])
    const [suppliersList, setSuppliersList] = useState([])
    const [redirect, setRedirect] = useState(false);
    const [usertype, setUser] = useState('')

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false)

    const nameRef = useRef();
    const cathegoryRef = useRef();
    const descriptionRef = useRef();
    const provPriceRef = useRef();
    const priceRef = useRef();
    const statusRef = useRef();
    const supplierRef = useRef();

    const fields = [
        nameRef,
        cathegoryRef,
        descriptionRef,
        provPriceRef,
        priceRef,
        statusRef,
        supplierRef,
    ]

    const handleChange = () => {
        setChecked(!checked)
    }

    const handleStepSubmit = e => {
        e.preventDefault();

        db.collection("products").add({
            name: name,
            cathegory: cathegory,
            description: description,
            provPrice: Number(provPrice),
            price: Number(price),
            status: checked,
            created: firebase.firestore.Timestamp.now(),
            supplier: supplier,
        }).then(() => {
            fields.forEach(field => field.current.value = '')
            Swal.fire({
                icon: 'success',
                title: 'Creado',
                text: `¡El producto se ha creado con éxito!`,
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
        db.collection("products").onSnapshot(doc => {
            let allProd = doc.docs.map(prod => {
                return {
                    id: prod.id,
                    ...prod.data()
                }
            })
            setProductsList(allProd);
            setFilteredProductsList(allProd)
        });
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

    const filterProducts = filterBy => {
        if (filterBy != '0')
            setFilteredProductsList(productsList.filter(product => product.cathegory === filterBy))
        else
            setFilteredProductsList(productsList)
    }

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
            name: 'Costo Proveedor',
            selector: row => row.provPrice,
            cell: row => <CurrencyFormat
                decimalScale={2}
                fixedDecimalScale={true}
                value={row.provPrice}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
            />,
            sortable: true,
        },
        {
            name: 'Precio Venta',
            selector: row => row.price,
            cell: row => <CurrencyFormat
                decimalScale={2}
                fixedDecimalScale={true}
                value={row.price}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
            />,
            sortable: true,
        },
        {
            name: 'Status',
            selector: 'status',
            cell: row => <div>{row.status ? <h1 style={{ color: '#41af4b', fontWeight: '700' }}>Disponible</h1> : <h1 style={{ color: '#3a4953', fontWeight: '700' }}>No Disponible</h1>}</div>,
            sortable: true,
        },
        {
            name: 'Fecha Creación',
            cell: row => row.created.toDate().toLocaleString('es-MX', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            sortable: true,
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
    return redirect ? <Redirect to={''} /> : (
        <>

            {usertype === "admin" ? <Navbar /> : null }

            <div className="container">
                <div className="columns is-mobile">
                    <div className="column is-3-desktop is-hidden-mobile">
                        <Leftbar />
                    </div>
                    <div className="column is-9-desktop is-12-mobile" style={{ overflow: 'scroll' }}>
                        <Breadcrum parent='Inicio' children='Productos' />
                        <Hero title="Productos" subtitle="Todos los Productos" />
                        <br />
                        <div className='columns'>
                            <div className='column is-8'>
                                <div className="select is-fullwidth">
                                    <select onChange={e => filterProducts(e.target.value)}>
                                        <option selected value='0'>Seleccione una Categoría</option>
                                        {cathegoriesList.map(cat =>
                                            <option key={cat.id} value={cat.id}> {cat.name} </option>
                                        )}
                                    </select>
                                </div>
                            </div>
                            <div className='column is-4'>
                                <button className='button is-fullwidth is-success' onClick={onOpenModal}>Agregar Producto</button>
                            </div>
                        </div>
                        <div className='columns'>
                            <div className='column box'>
                                <DataTable
                                    noHeader={true}
                                    columns={columns}
                                    data={filteredProductsList}
                                    pagination={true}
                                    overflowY={true}
                                    paginationComponentOptions={{ rowsPerPageText: 'Filas por pagina:', rangeSeparatorText: 'de' }}
                                />
                            </div>
                        </div>
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
                            <h3 className="title is-4">General</h3>
                            <p className="subtitle is-6">Cambie la información general de este producto.</p>
                            <div className="field">
                                <label className="label">Nombre</label>
                                <div className="control">
                                    <input required ref={nameRef} onChange={e => setName(e.target.value)} className="input" type="text" placeholder="Introduzca nombre del producto" />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Categoría</label>
                                <div className="control">
                                    <div className="select is-fullwidth">
                                        <select ref={cathegoryRef} onChange={e => setCathegory(e.target.value)} >
                                            <option selected disabled value='0'>Seleccione una Categoría</option>
                                            {cathegoriesList.map(cat =>
                                                <option key={cat.id} value={cat.id}> {cat.name} </option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Descripción</label>
                                <div className="control">
                                    <textarea ref={descriptionRef} onChange={e => setDescription(e.target.value)} required className="textarea" placeholder="Escribe una breve descripción sobre el producto"></textarea>
                                </div>
                            </div>
                        </div>
                        <div className='column'>
                            <div className="field">
                                <label className="label">Proveedor</label>
                                <div className="control">
                                    <div className="select is-fullwidth">
                                        <select ref={supplierRef} onChange={e => setSupplier(e.target.value)}>
                                            <option selected disabled value=''>Seleccione un Proveedor</option>
                                            {suppliersList.map(sup =>
                                                <option key={sup.id} value={sup.nickName}> {sup.nickName} </option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <h3 className="title is-4">Precio</h3>
                            <div className="field">
                                <label className="label">Costo Proveedor</label>
                                <div className="control">
                                    <input required ref={provPriceRef} onChange={e => setProvPrice(e.target.value)} className="input" type="number" />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Precio de Venta</label>
                                <div className="control">
                                    <input required ref={priceRef} onChange={e => setPrice(e.target.value)} className="input" type="number" />
                                </div>
                            </div>
                            <Switch ref={statusRef} onChange={handleChange} checked={checked} />
                            <h3 className="title is-6">Vender en Punto de Venta</h3>
                            <p className="subtitle is-7">Haga que este producto esté activo y disponible a la venta en la tienda.</p>
                            {!name || !description || !cathegory || !provPrice || !price ? <button disabled type="submit" value='submit' className='button is-success is-fullwidth'>Guardar</button> : <button type="submit" value='submit' className='button is-success is-fullwidth'>Guardar</button>}
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    )
}
export default Products;