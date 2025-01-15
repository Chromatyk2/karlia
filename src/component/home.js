import React, {useEffect, useState} from 'react';
import '../App.css'
import Axios from "axios";

function HomePage(props) {
    const [factures,setFactures] = useState([]);
    const [selected,setSelected] = useState([]);
    const searchEntreprise = (e) => {
        const siret = document.getElementById('searchSiretField').value;
        Axios.get('https://api.insee.fr/api-sirene/3.11/siret/'+siret,{
            headers: {
                'X-INSEE-Api-Key-Integration':'b4bd23f3-1146-4e49-bd23-f31146ae49db'
            }
        })
        .then(function(response){
            console.log(response)
            setFactures(response);
        })
    };
    return (
        <>
            {factures.length > 0 ?
                JSON.stringify(factures, null, 2)
                :
                <>
                    <input id={"searchSiretField"} type={"text"}/>
                    <button onClick={searchEntreprise}>Chercher</button>
                </>
            }

        </>
    )
}

export default HomePage