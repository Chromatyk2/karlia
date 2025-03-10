import React,{useState, useEffect} from 'react';
import Axios from "axios";
import moment from "moment/moment";

function ValidationModal(props) {
    console.log(props.companie)
    const addCompanie = (e) => {
        const name = props.companie.uniteLegale.denominationUniteLegale===null ? "Non rensigné" : props.companie.uniteLegale.denominationUniteLegale;
        const siret = props.companie.siret===null ? "" :props.companie.siret;
        const create = props.companie.uniteLegale.dateCreationUniteLegalemoment===null ? "Non rensigné" :moment(props.companie.uniteLegale.dateCreationUniteLegale).utc().format('YYYY-MM-DDT00:00:00.434Z');
        const type = props.companie.uniteLegale.categorieEntreprise===null ? "Non rensigné" :props.companie.uniteLegale.categorieEntreprise;
        const naf = props.companie.uniteLegale.activitePrincipaleUniteLegale===null ? "Non rensigné" :props.companie.uniteLegale.activitePrincipaleUniteLegale;
        const effectif = props.companie.uniteLegale.trancheEffectifsUniteLegale===null ? "Non rensigné" :props.companie.uniteLegale.trancheEffectifsUniteLegale;
        const adress = props.companie.adresseEtablissement.numeroVoieEtablissement+ " " + props.companie.adresseEtablissement.typeVoieEtablissement+ " " + props.companie.adresseEtablissement.libelleVoieEtablissementt+ " " + props.companie.adresseEtablissement.complementAdresseEtablissement;
        const cp = props.companie.adresseEtablissement.codePostalEtablissement===null ? "Non rensigné" :props.companie.adresseEtablissement.codePostalEtablissement;
        const ville = props.companie.adresseEtablissement.libelleCommuneEtablissement===null ? "Non rensigné" :props.companie.adresseEtablissement.libelleCommuneEtablissement;


        Axios.get(
            '/api/createCompanie/'+name+'/'+siret+'/'+create+'/'+type+'/'+naf+'/'+effectif+'/'+adress+'/'+cp+'/'+ville
        ).then(function(response){
            props.change();
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