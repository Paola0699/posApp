import Breadcrum from "../Common/breadcrum";
import React, { useEffect, useState, useRef } from "react";
import firebase from '../../firebaseElements/firebase'
import Hero from "../Common/hero";
import Leftbar from "../Common/leftbar";
import Navbar from "../Common/navbar"
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

function Newsupplier() {
    const db = firebase.firestore();

    const [nickName, setNickName] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [company, setCompany] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [cellphone, setCellphone] = useState('');
    const [street, setStreet] = useState('');
    const [street2, setStreet2] = useState('');
    const [suburb, setSuburb] = useState('');
    const [postCode, setPostCode] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [usertype, setUser] = useState('')

    const nickNameRef = useRef();
    const descriptionRef = useRef();
    const nameRef = useRef();
    const lastNameRef = useRef();
    const companyRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const cellphoneRef = useRef();
    const streetRef = useRef();
    const street2Ref = useRef();
    const suburbRef = useRef();
    const postCodeRef = useRef();
    const stateRef = useRef();
    const countryRef = useRef();

    const fields = [
        nickNameRef,
        descriptionRef,
        nameRef,
        lastNameRef,
        companyRef,
        emailRef,
        phoneRef,
        cellphoneRef,
        streetRef,
        street2Ref,
        suburbRef,
        postCodeRef,
        stateRef,
        countryRef,
    ]

    const handleStepSubmit = e => {
        e.preventDefault();

        db.collection("supplier").add({
           nickName: nickName,
           description: description,
           name: name,
           lastName: lastName,
           company: company,
           email: email,
           phone: phone,
           cellphone: cellphone,
           street: street,
           street2: street2,
           suburb: suburb,
           postCode: postCode,
           state: state,
           country: country
        }).then(() => {
            fields.forEach(field => field.current.value = '')
            Swal.fire({
                icon: 'success',
                title: 'Creado',
                text: `¡El proveedor se ha creado con éxito!`,
            })
        }).catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Ocurrio un error: ${error}`,
            })
        })
    }
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
                    <div className="column is-9-desktop is-12-mobile">
                        <Breadcrum  parent='Inicio' children='Nuevo Proveedor' />
                        <Hero title='Nuevo Proveedor' subtitle="Alta de proveedor"/>
                        <br />
                        <form onSubmit={handleStepSubmit} style={{ overflowY: 'scroll', height: '450px', overflowX: 'hidden' }}>
                            <div className='columns'>
                                <div className='column is-4'>
                                    <h3 className="title is-4">General</h3>
                                    <p className="subtitle is-6">Cómo se identifica y describe a su proveedor.</p>
                                </div>
                                <div className='column is-8'>
                                    <div className="field">
                                        <label className="label">Identificador Proveedor</label>
                                        <div className="control">
                                            <input ref={nickNameRef} onChange={e => setNickName(e.target.value)} required className="input" type="text" />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Descripción</label>
                                        <div className="control">
                                            <textarea ref={descriptionRef} onChange={e => setDescription(e.target.value)} required className="textarea"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr style={{backgroundColor: '#e5eaed'}}/>
                            <div className='columns'>
                                <div className='column'>
                                    <h3 className="title is-4">Información de Contacto</h3>
                                    <p className="subtitle is-6">El nombre oficial y los datos de contacto de su proveedor.</p>
                                </div>
                                <div className='column'>
                                    <div className="field">
                                        <label className="label">Nombre Proveedor</label>
                                        <div className="control">
                                            <input ref={nameRef} onChange={e => setName(e.target.value)} required className="input" type="text" />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Compañía</label>
                                        <div className="control">
                                            <input ref={companyRef} onChange={e => setCompany(e.target.value)} required className="input" type="text" />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Teléfono</label>
                                        <div className="control">
                                            <input ref={phoneRef} onChange={e => setPhone(e.target.value)} required className="input" type="text" />
                                        </div>
                                    </div>
                                </div>
                                <div className='column'>
                                    <div className="field">
                                        <label className="label">Apellidos</label>
                                        <div className="control">
                                            <input ref={lastNameRef} onChange={e => setLastName(e.target.value)} required className="input" type="text" />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Email</label>
                                        <div className="control">
                                            <input ref={emailRef} onChange={e => setEmail(e.target.value)} required className="input" type="email" />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Teléfono Celular</label>
                                        <div className="control">
                                            <input ref={cellphoneRef} onChange={e => setCellphone(e.target.value)} required className="input" type="text" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr style={{backgroundColor: '#e5eaed'}}/>
                            <div className='columns'>
                                <div className='column is-4'>
                                    <h3 className="title is-4">Dirección</h3>
                                </div>
                                <div className='column is-4'>
                                    <div className="field">
                                        <label className="label">Calle</label>
                                        <div className="control">
                                            <input ref={streetRef} onChange={e => setStreet(e.target.value)} required className="input" type="text" />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Colonia</label>
                                        <div className="control">
                                            <input ref={suburbRef} onChange={e => setSuburb(e.target.value)} required className="input" type="text" />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Estado</label>
                                        <div className="control">
                                            <input ref={stateRef} onChange={e => setState(e.target.value)} required className="input" type="text" />
                                        </div>
                                    </div>
                                </div>
                                <div className='column is-4'>
                                    <div className="field">
                                        <label className="label">Número</label>
                                        <div className="control">
                                            <input ref={street2Ref} onChange={e => setStreet2(e.target.value)} required className="input" type="text" />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Código Postal</label>
                                        <div className="control">
                                            <input ref={postCodeRef} onChange={e => setPostCode(e.target.value)} required className="input" type="text" />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">País</label>
                                        <div className="control">
                                            <input ref={countryRef} onChange={e => setCountry(e.target.value)} required className="input" type="text" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Link to={`${process.env.PUBLIC_URL}/proveedores`} className='button is-success' style={{marginRight:'1%'}}>Cancelar</Link><button type="submit" value='submit' className='button is-warning'>Guardar</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Newsupplier;