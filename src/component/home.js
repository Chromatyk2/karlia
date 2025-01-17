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
        if(siret !== null){
            Axios.get('https://api.insee.fr/api-sirene/3.11/siret/'+siret,{
                headers: {
                    'X-INSEE-Api-Key-Integration':'b4bd23f3-1146-4e49-bd23-f31146ae49db'
                }
            })
                .then(function(response){
                    setFactures(response.data);
                })
        }else{
            Axios.get('https://api.insee.fr/api-sirene/3.11/siret?q=denominationUniteLegale:'+name,{
                headers: {
                    'X-INSEE-Api-Key-Integration':'b4bd23f3-1146-4e49-bd23-f31146ae49db'
                }
            })
                .then(function(response){
                    setFactures(response.data);
                })

        }
    };
    console.log(factures)
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
                    {factures.data.map((val, key) => {
                        return (
                            <tr>
                                <th scope="row">{val.etablissements.uniteLegale.denominationUniteLegale}</th>
                                <th scope="row">{val.etablissements.siren}</th>
                                <th scope="row">{val.etablissements.siret}</th>
                                <th scope="row">{val.etablissements.uniteLegale.dateCreationUniteLegale}</th>
                                <th scope="row">{val.etablissements.uniteLegale.activitePrincipaleUniteLegale}</th>
                                <th scope="row">{val.etablissements.adresseEtablissement.numeroVoieEtablissement + " " + val.etablissements.adresseEtablissement.typeVoieEtablissement + " " + val.etablissements.adresseEtablissement.libelleVoieEtablissement + " " + val.etablissements.adresseEtablissement.complementAdresseEtablissement}</th>
                                <th scope="row">{val.etablissements.adresseEtablissement.codePostalEtablissement}</th>
                                <th scope="row">{val.etablissements.adresseEtablissement.libelleCommuneEtablissement}</th>
                                <th scope="row">{val.etablissements.uniteLegale.categorieEntreprise}</th>
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