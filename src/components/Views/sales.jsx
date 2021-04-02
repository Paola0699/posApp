import { useEffect, useRef, useState } from 'react'
import firebase from '../../firebaseElements/firebase'
import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css';
import CurrencyFormat from 'react-currency-format';
import Swal from 'sweetalert2'
import { Redirect } from "react-router-dom"
import Navbar from "../Common/navbar"
import Hero from "../Common/hero";
import Breadcrum from "../Common/breadcrum";
import Leftbar from "../Common/leftbar";
import DataTable from 'react-data-table-component';

function Sales() {
    const db = firebase.firestore();
    const [salesList , setSalesList ] = useState([])

    useEffect(() => {
        db.collection("orders").onSnapshot(doc => {
            let allOrd = doc.docs.map(ord => {
                return {
                    id: ord.id,
                    ...ord.data()
                }
            })
            setSalesList(allOrd);
        });
    }, [])

    const columns = [
        {
            name: 'Método de Pago',
            selector: 'paymethod',
            sortable: true,
        },
        {
            name: 'Fecha',
            cell: row => row.date.toDate().toLocaleString('es-MX', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
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
                    <div class="column is-9-desktop is-12-mobile" style={{ overflowY: 'scroll', height: '650px', overflowX: 'hidden' }}>
                        <Breadcrum />
                        <Hero title="Ventas" subtitle="Consultar ventas" />
                        <br />
                        <div className='columns'>
                            <div className='column box'>
                                <DataTable
                                    noHeader={true}
                                    columns={columns}
                                    data={salesList}
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
export default Sales;