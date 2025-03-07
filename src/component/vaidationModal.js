import React,{useState, useEffect} from 'react';
import Axios from "axios";

function ValidationModal(props) {
    console.log(props.companie)
    const addCompanie = (e) => {
        const name = e.target.name;
        const siret = e.target.value;
        Axios.get(
            '/api/createCompanie/'+name+'/'+siret
        ).then(function(response){
            console.log(response.data);
        })

    };function closeModal() {
        props.change();
    }
    return (
        <>
            <button className={"validationButton"}>Oui</button>
            <button onClick={closeModal} className={"refuseButton"}>Non</button>
        </>
    );
}

export default ValidationModal;