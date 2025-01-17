import React, {useEffect, useState} from 'react';
import '../App.css'
import Axios from "axios";

function HomePage(props) {
    const [factures,setFactures] = useState(null);
    const [myCompanies,setMyCompanies] = useState(null);
    useEffect(() => {
        Axios.get(
            'https://api.hubapi.com/crm/v3/objects/companies',
            {
                headers:{
                    'Authorization': `Bearer ${process.env.REACT_APP_CLIENT_SECRET}`,
                    'Client-Id': process.env.REACT_APP_CLIENT_ID,
                    'Content-Type': 'application/json',
                }
            }
        ).then(function(response){
            setMyCompanies(response.data);
        })
    }, []);
    const searchEntreprise = (e) => {
        const siret = document.getElementById('searchSiretField').value;
        Axios.get('https://api.insee.fr/api-sirene/3.11/siret/'+siret,{
            headers: {
                'X-INSEE-Api-Key-Integration':'b4bd23f3-1146-4e49-bd23-f31146ae49db'
            }
        })
        .then(function(response){
            setFactures(response.data.etablissement);
        })
    };
    return (
        <>
            {factures &&
                <table style={{width: "90%", margin: "auto", paddingTop: "100px"}}>
                    <thead style={{backgroundColor: "aliceblue"}}>
                    <tr>
                        <th scope="col">Nom</th>
                        <th scope="col">SIREN</th>
                        <th scope="col">SIRET</th>
                        <th scope="col">Date de Création</th>
                        <th scope="col">Activité Principale</th>
                        <th scope="col">Adresse</th>
                        <th scope="col">Code Postale</th>
                        <th scope="col">Ville</th>
                        <th scope="col">Type d'entreprise</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">{factures.uniteLegale.denominationUniteLegale}</th>
                        <th scope="row">{factures.siren}</th>
                        <th scope="row">{factures.siret}</th>
                        <th scope="row">{factures.uniteLegale.dateCreationUniteLegale}</th>
                        <th scope="row">{factures.uniteLegale.activitePrincipaleUniteLegale}</th>
                        <th scope="row">{factures.adresseEtablissement.numeroVoieEtablissement + " " + factures.adresseEtablissement.typeVoieEtablissement + " " + factures.adresseEtablissement.libelleVoieEtablissement + " " + factures.adresseEtablissement.complementAdresseEtablissement}</th>
                        <th scope="row">{factures.adresseEtablissement.codePostalEtablissement}</th>
                        <th scope="row">{factures.adresseEtablissement.libelleCommuneEtablissement}</th>
                        <th scope="row">{factures.uniteLegale.categorieEntreprise}</th>
                    </tr>
                    </tbody>
                </table>
            }
            <>
                <input style={{display:"block", margin:"20px auto 0 auto"}} id={"searchSiretField"} type={"text"}/>
                <button onClick={searchEntreprise}>Chercher</button>
            </>
        </>
    )
}

export default HomePage