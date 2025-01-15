import React, {useEffect, useState} from 'react';
import '../App.css'
import Axios from "axios";

function HomePage(props) {
    const [factures,setFactures] = useState([]);
    const [selected,setSelected] = useState([]);
    useEffect(() => {
        Axios.get('https://api.insee.fr/api-sirene/3.11/siret/47759310700048',{
            headers: {
                'X-INSEE-Api-Key-Integration':'b4bd23f3-1146-4e49-bd23-f31146ae49db'
            }
        })
        .then(function(response){
            setFactures(response.data.data);
        })
    }, []);
    const searchEntreprise = (e) => {
        if(e.target.checked === false){
            setSelected(oldSelected => {
                return oldSelected.filter(id => id !== e.target.value)
            })
        }else{
            setSelected(selectedArray => [...selectedArray,e.target.value]);
        }
    };
    return (
        <>
                    <button onClick={searchEntreprise}>Envoyer</button>
        </>
    )
}

export default HomePage