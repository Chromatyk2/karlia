import React,{useState, useEffect} from 'react';
import Axios from "axios";

function ValidationModal(props) {
    console.log(props.companie)
    const addCompanie = (e) => {
        const name = e.target.name;
        const siret = e.target.siret;
        console.log(name);
        console.log(siret);
        // Axios.get(
        //     '/api/createCompanie/'+name+'/'+siret
        // ).then(function(response){
        //     console.log(response.data);
        // })

    }
    ;function closeModal() {
        props.change();
    }
    return (
        <>
            <button onClick={addCompanie} siret={props.companie.siret} name={props.companie.uniteLegale.denominationUniteLegale} className={"validationButton"}>Oui</button>
            <button onClick={closeModal} className={"refuseButton"}>Non</button>
        </>
    );
}

export default ValidationModal;