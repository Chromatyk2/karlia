import React,{useState, useEffect} from 'react';
import Axios from "axios";

function ValidationModal(props) {
    console.log(props.companie)
    const addCompanie = (e) => {
        const name = props.companie.uniteLegale.denominationUniteLegale;
        const siret = props.companie.siret;
        const create = props.companie.uniteLegale.dateCreationUniteLegale;
        const type = props.companie.uniteLegale.categorieEntreprise;
        const naf = props.companie.uniteLegale.activitePrincipaleUniteLegale;
        const effectif = props.companie.uniteLegale.trancheEffectifsUniteLegale;
        const adress = props.companie.adresseEtablissement.numeroVoieEtablissement + " " + props.companie.adresseEtablissement.typeVoieEtablissement + " " + props.companie.adresseEtablissement.libelleVoieEtablissement+ " " + props.companie.adresseEtablissement.complementAdresseEtablissement;
        const cp = props.companie.adresseEtablissement.codePostalEtablissement;
        const ville = props.companie.adresseEtablissement.libelleCommuneEtablissement;


        Axios.get(
            '/api/createCompanie/'+name+'/'+siret+'/'+create+'/'+type+'/'+naf+'/'+effectif+'/'+adress+'/'+cp+'/'+ville
        ).then(function(response){
            console.log(response.data);
        })

    }
    ;function closeModal() {
        props.change();
    }
    return (
        <>
            <button onClick={addCompanie} name={props.companie.uniteLegale.denominationUniteLegale} className={"validationButton"}>Oui</button>
            <button onClick={closeModal} className={"refuseButton"}>Non</button>
        </>
    );
}

export default ValidationModal;