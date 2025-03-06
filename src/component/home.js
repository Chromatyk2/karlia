import React, {useEffect, useState} from 'react';
import '../App.css'
import Axios from "axios";

function HomePage(props) {
    const [factures,setFactures] = useState(null);
    const [myCompanies,setMyCompanies] = useState(null);
    useEffect(() => {
        Axios.get(
            '/api/getCompaniesHubspot', {
                headers: {
                    'authorization': 'Bearer pat-na1-2ae0381d-ef96-41d8-8e60-81da0ac163a0',
                    'content-type': 'application/json'
                }
            }
        ).then(function(response){
            console.log(response.data);
        })
        Axios.get(
            '/api/hello',
        )
    }, []);
    const searchEntrepriseBySiret = (e) => {
        const siret = document.getElementById('searchSiretField').value;
        const name = document.getElementById('searchNameField').value;
        const cp = document.getElementById('searchCpField').value;
        if(siret.length > 0){
            Axios.get('https://api.insee.fr/api-sirene/3.11/siret?q=siret:'+siret,{
                headers: {
                    'X-INSEE-Api-Key-Integration':'b4bd23f3-1146-4e49-bd23-f31146ae49db'
                }
            }).then(function(response){
                setFactures(response.data.etablissements.filter(etablissement => etablissement.siret == siret));
            })
        }else if(name.length > 0 ){
            if(cp.length > 0 ){
                Axios.get('https://api.insee.fr/api-sirene/3.11/siret?q=denominationUniteLegale:"'+name+'" AND codePostalEtablissement:'+cp+'*&nombre=1000',{
                    headers: {
                        'X-INSEE-Api-Key-Integration':'b4bd23f3-1146-4e49-bd23-f31146ae49db'
                    }
                }).then(function(response){
                    setFactures(response.data.etablissements);
                })
            }else{
                Axios.get('https://api.insee.fr/api-sirene/3.11/siret?q=denominationUniteLegale:"'+name+'"&nombre=1000',{
                    headers: {
                        'X-INSEE-Api-Key-Integration':'b4bd23f3-1146-4e49-bd23-f31146ae49db'
                    }
                }).then(function(response){
                    setFactures(response.data.etablissements);
                })
            }
        }else if (cp.length > 0){
            Axios.get('https://api.insee.fr/api-sirene/3.11/siret?q=codePostalEtablissement:'+cp+'*&nombre=1000',{
                headers: {
                    'X-INSEE-Api-Key-Integration':'b4bd23f3-1146-4e49-bd23-f31146ae49db'
                }
            }).then(function(response){
                setFactures(response.data.etablissements);
            })
        }

    };
    return (
        <>
            <input style={{marginBottom:"15px"}} placeholder={"SIRET"}
                   id={"searchSiretField"} type={"text"}/>
            <div style={{display: "flex", justifyContent: "center", gap: "20px", flexFlow: "row"}}>
                <input style={{margin:0}} placeholder={"Nom de l'entreprise"}
                       id={"searchNameField"} type={"text"}/>
                <input style={{margin:0}} placeholder={"Code Postal"}
                       id={"searchCpField"} type={"text"}/>
            </div>
            <button onClick={searchEntrepriseBySiret}>Chercher</button>
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
                    {factures.map((val, key) => {
                        return (
                            <tr style={{backgroundColor: key % 2 ? "aliceblue" : "white"}}>
                                <th scope="row">{val.uniteLegale.denominationUniteLegale}</th>
                                <th scope="row">{val.siren}</th>
                                <th scope="row">{val.siret}</th>
                                <th scope="row">{val.uniteLegale.dateCreationUniteLegale}</th>
                                <th scope="row">{val.uniteLegale.activitePrincipaleUniteLegale}</th>
                                <th scope="row">{val.adresseEtablissement.numeroVoieEtablissement + " " + val.adresseEtablissement.typeVoieEtablissement + " " + val.adresseEtablissement.libelleVoieEtablissement + ", " + val.adresseEtablissement.complementAdresseEtablissement}</th>
                                <th scope="row">{val.adresseEtablissement.codePostalEtablissement}</th>
                                <th scope="row">{val.adresseEtablissement.libelleCommuneEtablissement}</th>
                                <th scope="row">{val.uniteLegale.categorieEntreprise}</th>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            }
        </>
    )
}

export default HomePage