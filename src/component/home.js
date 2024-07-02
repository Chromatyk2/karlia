import React, {useEffect, useState} from 'react';
import '../App.css'
import Axios from "axios";

function HomePage(props) {
    const [factures,setFactures] = useState([]);
    const [selected,setSelected] = useState([]);
    useEffect(() => {
        Axios.get(`/api/documents?type=4`,{headers: { Authorization: `Bearer e4e05o-8z7n8e-144030-zvpmas-nhonth` }})
            .then(function(response){
                setFactures(response.data.data);
            })
    }, []);
    const onChangeCheckBox = (e) => {
        setSelected(selectedArray => [...selectedArray,e.target.value]);
    };
    const updateDate = (e) => {
        Axios.all([
            selected.map((val, key) => {
                Axios.post('/api/documents/'+val,
                    {
                        date: Date()
                    },
                    {
                        headers:
                            {
                                Authorization: `Bearer e4e05o-8z7n8e-144030-zvpmas-nhonth`
                            }
                    }
                )
            })
        ])
        .then(function(response){
            console.log(response);
        })
    };
    return (
        <>
            <table style={{width: "90%", margin: "auto", paddingTop: "100px"}}>
                <thead style={{backgroundColor: "aliceblue"}}>
                <tr>
                    <th scope="col">Document</th>
                    <th scope="col">Date</th>
                    <th scope="col">Client</th>
                    <th scope="col">Montant</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {factures.length > 0 &&
                    factures.map((val, key) => {
                        return (
                            <tr style={{backgroundColor: key % 2 ? "aliceblue" : "white"}}>
                                <th scope="row">{val.type_text}</th>
                                <th scope="row">{val.date}</th>
                                <th scope="row">{val.customer_supplier_title}</th>
                                <th scope="row">{val.total_with_tax} €</th>
                                <th scope="row">{val.status_text}</th>
                                <th scope="row"><input type="checkbox" value={val.id} onChange={onChangeCheckBox}/></th>
                            </tr>
                        )

                    })
                }
                </tbody>
            </table>
            {selected.length > 0 &&
                <button onClick={updateDate}>Mettre à la date du jour</button>
            }
        </>
    )
}

export default HomePage