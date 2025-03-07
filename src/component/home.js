import React, {useEffect, useState} from 'react';
import '../App.css'
import Axios from "axios";
import Modal from 'react-modal';
import ValidationModal from "./vaidationModal";

function HomePage(props) {
    const [factures,setFactures] = useState(null);
    const [myCompanies,setMyCompanies] = useState(null);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }
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
            <div style={{margin: "30px",width: "500px",display: "block",marginLeft: "auto",marginRight: "auto"}}>
                <input style={{marginBottom: "15px", width:"100%"}} placeholder={"SIRET"}
                       id={"searchSiretField"} type={"text"}/>
                <div style={{display: "flex", justifyContent: "center", gap: "20px", flexFlow: "row"}}>
                    <input style={{margin: 0}} placeholder={"Nom de l'entreprise"}
                           id={"searchNameField"} type={"text"}/>
                    <input style={{margin: 0}} placeholder={"Code Postal"}
                           id={"searchCpField"} type={"text"}/>
                </div>
                <button className={"buttonToSearchCompanies"} onClick={searchEntrepriseBySiret}>Chercher</button>
            </div>
            <div className={"allCompaniesContainer"}>
                {factures &&
                    factures.map((val, key) => {
                        return (
                            <>
                                <div style={{
                                    display: "flex",
                                    flexFlow: "column",
                                    background: "#fefefe",
                                    padding: "20px",
                                    borderRadius: "20px",
                                    fontWeight: "500",
                                    color: "#575656",
                                    filter: "drop-shadow(2px 4px 6px black)"
                                }}>
                                    <p style={{
                                        margin: "0",
                                        fontSize: "20px",
                                        fontWeight: "bolder"
                                    }}>{val.uniteLegale.denominationUniteLegale}</p>
                                    <div style={{display: "flex", justifyContent: "space-around", color: "#b9b9b9"}}>
                                        <p>Informations juridiques</p>
                                        <p>Adresse de l'entreprise</p>
                                    </div>
                                    <div style={{display: "flex", gap: "25px"}}>
                                        <div style={{width: "400px", borderRight: "3px solid gray", lineHeight: "15px"}}>
                                            <p><span style={{color: "#b9b9b9"}}>SIRET :</span> {val.siret}</p>
                                            <p><span
                                                style={{color: "#b9b9b9"}}>Dénomination légale :</span> {val.uniteLegale.denominationUniteLegale}
                                            </p>
                                            <p><span
                                                style={{color: "#b9b9b9"}}>Date de création :</span> {val.uniteLegale.dateCreationUniteLegale}
                                            </p>
                                            <p><span
                                                style={{color: "#b9b9b9"}}>Type d'entreprise :</span> {val.uniteLegale.categorieEntreprise}
                                            </p>
                                            <p><span
                                                style={{color: "#b9b9b9"}}>Code NAF :</span> {val.uniteLegale.activitePrincipaleUniteLegale}
                                            </p>
                                            <p><span
                                                style={{color: "#b9b9b9"}}>Effectif :</span> {val.uniteLegale.trancheEffectifsUniteLegale}
                                            </p>
                                        </div>
                                        <div style={{width: "300px", lineHeight: "15px"}}>
                                            <p>{val.adresseEtablissement.numeroVoieEtablissement + " " + val.adresseEtablissement.typeVoieEtablissement + " " + val.adresseEtablissement.libelleVoieEtablissement}</p>
                                            <p>{val.adresseEtablissement.complementAdresseEtablissement}</p>
                                            <p>{val.adresseEtablissement.codePostalEtablissement}</p>
                                            <p>{val.adresseEtablissement.libelleCommuneEtablissement}</p>

                                        </div>
                                    </div>
                                    <button style={{position: "absolute", right: "20px", bottom: "20px"}} className={"buttonToSearchCompanies"} onClick={openModal} value={val.siret}
                                            name={val.uniteLegale.denominationUniteLegale}>Ajouter
                                    </button>
                                </div>
                                <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}
                                       contentLabel="Example Modal">
                                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "baseline"}}>
                                        <p style={{fontWeight: "500", color: "rgb(87, 86, 86)"}}>Valider la création d'une fiche pour {val.uniteLegale.denominationUniteLegale} ?</p>
                                    </div>
                                    <div className={"validationModalContainer"}>
                                        <ValidationModal companie={val} change={closeModal}/>
                                    </div>
                                </Modal>
                            </>
                        )
                    })}
            </div>
        </>
    )
}

export default HomePage