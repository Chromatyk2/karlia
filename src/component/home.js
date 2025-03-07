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
    const addCompanie = (e) => {
        const name = e.target.name;
        const siret = e.target.value;
        Axios.get(
            '/api/createCompanie/'+name+'/'+siret
        ).then(function(response){
            console.log(response.data);
        })

    };
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
            <div className={"allCompaniesContainer"}>
                {factures &&
                    factures.map((val, key) => {
                    return (
                        <div style={{display: "flex",flexFlow: "column",background: "white",padding: "20px",borderRadius: "20px"}}>
                            <p style={{fontSize: "20px",fontWeight: "bolder"}}>{val.uniteLegale.denominationUniteLegale}</p>
                            <p>Informations juridiques</p>
                            <div style={{display:"flex",gap:"15px"}}>
                                <div style={{width: "400px", borderRight: "3px solid gray"}}>
                                    <p>SIRET : {val.siret}</p>
                                    <p>Dénomination légale : {val.uniteLegale.denominationUniteLegale}</p>
                                    <p>Date de création : {val.uniteLegale.dateCreationUniteLegale}</p>
                                    <p>Type d'entreprise : {val.uniteLegale.categorieEntreprise}</p>
                                    <p>Code NAF : {val.uniteLegale.activitePrincipaleUniteLegale}</p>
                                    <p>Effectif : {val.uniteLegale.trancheEffectifsUniteLegale}</p>
                                </div>
                                <div style={{width: "300px"}}>
                                    <p>Adresse de l'entreprise</p>
                                    <p>{val.adresseEtablissement.numeroVoieEtablissement + " " + val.adresseEtablissement.typeVoieEtablissement + " " + val.adresseEtablissement.libelleVoieEtablissement}</p>
                                    <p>{val.adresseEtablissement.complementAdresseEtablissement}</p>
                                    <p>{val.adresseEtablissement.codePostalEtablissement}</p>
                                    <p>{val.adresseEtablissement.libelleCommuneEtablissement}</p>

                                </div>
                            </div>
                        </div>
                    )
                    })}
            </div>
        </>
    )
}

export default HomePage