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
        <table style={{display: "flex", justifyContent: "center"}}>
            <tbody>
            {factures.length > 0 &&
                factures.map((val, key) => {
                    return (
                        <tr style={{justifyContent: "space-between", display: "flex", gap: "50px"}}>
                            <th scope="row">{val.type_texte}</th>
                            <th scope="row">{val.date}</th>
                            <th scope="row">{val.customer_supplier_title}</th>
                            <th scope="row">{val.total_with_tax} €</th>
                            <th scope="row">{val.status_text} €</th>
                        </tr>
                    )

                })
            }
            </tbody>
        </table>
    )
}

export default HomePage