import React, {useEffect, useState} from 'react';
import '../App.css'
import Axios from "axios";

function HomePage(props) {
    const [factures,setFactures] = useState(null);
    const [myCompanies,setMyCompanies] = useState(null);
    useEffect(() => {
        Axios.get(
            '/api/getCompaniesHubspot',
        ).then(function(response){
            console.log(response.data);
        })
    }, []);
    const searchEntrepriseBySiret = (e) => {
        const siret = document.getElementById('searchSiretField').value;
        const name = document.getElementById('searchNameField').value;
        if(siret.length > 0){
            Axios.get('https://api.insee.fr/api-sirene/3.11/siret?q=siret:'+siret,{
                headers: {
                    'X-INSEE-Api-Key-Integration':'b4bd23f3-1146-4e49-bd23-f31146ae49db'
                }
            }).then(function(response){
                setFactures(response.data.etablissements.filter(etablissement => etablissement.siret == siret));
            })
        }else if(name.length > 0 ){
            Axios.get('https://api.insee.fr/api-sirene/3.11/siret?q=denominationUniteLegale:'+name+'&nombre=1000',{
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
                            <tr>
                                <th scope="row">{val.uniteLegale.denominationUniteLegale}</th>
                                <th scope="row">{val.siren}</th>
                                <th scope="row">{val.siret}</th>
                                <th scope="row">{val.uniteLegale.dateCreationUniteLegale}</th>
                                <th scope="row">{val.uniteLegale.activitePrincipaleUniteLegale}</th>
                                <th scope="row">{val.adresseEtablissement.numeroVoieEtablissement + " " + val.adresseEtablissement.typeVoieEtablissement + " " + val.adresseEtablissement.libelleVoieEtablissement + " " + val.adresseEtablissement.complementAdresseEtablissement}</th>
                                <th scope="row">{val.adresseEtablissement.codePostalEtablissement}</th>
                                <th scope="row">{val.adresseEtablissement.libelleCommuneEtablissement}</th>
                                <th scope="row">{val.uniteLegale.categorieEntreprise}</th>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            }
            <>
                <input style={{display: "block", margin: "20px auto 0 auto"}} id={"searchSiretField"} type={"text"}/>
                <input style={{display: "block", margin: "20px auto 0 auto"}} id={"searchNameField"} type={"text"}/>
                <button onClick={searchEntrepriseBySiret}>Chercher</button>
            </>
        </>
    )
}

export default HomePage