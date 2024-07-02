import React, {useEffect, useState} from 'react';
import '../App.css'
import Axios from "axios";

function HomePage(props) {
    const [factures,setFactures] = useState([]);
    useEffect(() => {
        Axios.get(`/api/documents?type=4`,{headers: { Authorization: `Bearer e4e05o-8z7n8e-144030-zvpmas-nhonth` }})
            .then(function(response){
                setFactures(response.data.data);
            })
    }, []);
    console.log(factures)
    return (
        <table>
            <thead>
            <tr>
                <th scope="col">Document</th>
                <th scope="col">Date</th>
                <th scope="col">Client</th>
                <th scope="col">Montant</th>
                <th scope="col">Status</th>
            </tr>
            </thead>
            <tbody>
            {factures.length > 0 &&
                factures.map((val, key) => {
                    return (
                        <tr>
                            <th scope="row">{val.type_text}</th>
                            <th scope="row">{val.date}</th>
                            <th scope="row">{val.customer_supplier_title}</th>
                            <th scope="row">{val.total_with_tax} €</th>
                            <th scope="row">{val.status_text}</th>
                        </tr>
                    )

                })
            }
            </tbody>
        </table>
    )
}

export default HomePage