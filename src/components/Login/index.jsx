import React, { useEffect, useState, useRef } from "react";
import { Redirect } from 'react-router-dom'
import Swal from 'sweetalert2'
import firebase from '../../firebaseElements/firebase'
import POS from '../../pos.png'
import * as emailjs from 'emailjs-com'

function Login() {
    const db = firebase.firestore();
    const user = useRef();
    const password = useRef();

    const fields = [
        user,
        password
    ]

    function singIn(email, password) {
        let code = Math.floor(Math.random() * 1000000)
        emailjs.send("service_uczuyod", "template_ixpyiqb", {
            code: code,
            to_email: email,
        }, "user_ANxJpCrTZOWyOviagSs88").then(() => {
            Swal.fire({
                title: 'Ingrese el código',
                input: 'text',
                inputLabel: `Hemos enviado un código de seguridad de seis dígitos a ${email}`,
                showCancelButton: true,
                confirmButtonColor: '#41af4b',
                cancelButtonColor: '#3a4953',
                confirmButtonText: 'Continuar',
                cancelButtonText: 'Cancelar',
                inputValidator: (value) => {
                    if (!value) {
                        return 'Ingrese un código.'
                    }
                    if(Number(value) !== code){
                        return "Código incorrecto. Ingrese un código válido."
                    }
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    if (Number(result.value) === code) {
                        firebase.auth().signInWithEmailAndPassword(email, password)
                            .then((user) => {
                                // Signed in 
                                // ...
                            })
                            .catch((error) => {
                                var errorCode = error.code;
                                var errorMessage = error.message;
                                Swal.fire(
                                    '¡Error!',
                                    'Usuario y/o contraseña incorrectos',
                                    'error'
                                )
                            });
                    }
                    else {
                        Swal.fire(
                            '¡Error!',
                            'Código incorrecto. Vuelva a iniciar sesión',
                            'error'
                        )
                        fields.forEach(field => field.current.value = '')
                    }
                }
            })
        })
    }

    const [userType, setUserType] = useState("")
    const [mail, setMail] = useState("")
    const [pass, setPass] = useState("")

    useEffect(() => {
        //firebase.auth().signOut()//ELIMINAR close sesion at refresh 
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                //getUserType(user, setUserType)
                setUserType(true)//teporal
            }
            else
                console.log('no user')
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        singIn(mail, pass)
    }

    return userType ? <Redirect to={'dashboard'} /> : (
        <div className="App">
            <section className="hero is-primary is-fullheight">
                <div className="hero-body">
                    <div className="container" style={{ margin: '0' }}>
                        <div className="columns is-centered">
                            <div className="column is-5-tablet is-8-desktop">
                                <div className='columns box'>
                                    <div className='column is-hidden-mobile is-flex is-flex-direction-row is-align-items-center is-justify-content-center'>
                                        <img src={POS} style={{ width: '70%' }} />
                                    </div>
                                    <div className='column'>
                                        <form action="" onSubmit={handleSubmit} style={{ padding: '10%' }}>
                                            <div className="has-text-centered">
                                                <h1 className="title is-3" style={{ color: '#555' }}>Iniciar sesión</h1>
                                                <h2 className="subtitle is-6" style={{ color: '#757575' }}>Ingrese sus datos para continuar</h2>
                                                <hr className="login-hr" />
                                            </div>

                                            <div className="field">
                                                <p className="control">
                                                    <input ref={user} onChange={e => setMail(e.target.value)} className="input" type="email" placeholder="Usuario" />
                                                </p>
                                            </div>

                                            <div className="field">
                                                <p className="control">
                                                    <input ref={password} onChange={e => setPass(e.target.value)} className="input" type="password" placeholder="Contraseña" />
                                                </p>
                                            </div>

                                            <hr className="login-hr" />
                                            <div className="field" style={{ textAlign: 'center' }}>
                                                <button type="submit" value="Submit" className="button is-warning is-fullwidth ">
                                                    Iniciar sesión
                                        </button>
                                                <a>¿Olvidaste tu contraseña?</a>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div >
    )
}
export default Login;