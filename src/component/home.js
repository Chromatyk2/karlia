import React, {useEffect, useState} from 'react';
import {BrowserRouter, Link} from "react-router-dom";
import '../App.css'
import Axios from "axios";
import Modal from 'react-modal';
import ValidationModal from "./vaidationModal";
import moment from "moment";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

function HomePage(props) {
    const [factures,setFactures] = useState(null);
    const [myCompanies,setMyCompanies] = useState(null);
    const [selectedCompanie,setSelectedCompanie] = useState();
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [isLoad, setIsLoad] = React.useState(false);
    const [allFiches, setAllFiches] = React.useState([]);
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
    function openModal(e) {
        const companie = e.target.value;
        setSelectedCompanie(factures[companie]);
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }function closeModalValid() {
        setIsOpen(false);
        NotificationManager.success('La fiche a bien été créée', 'Validation', 3000);
    }function closeModalCancel() {
        setIsOpen(false);
    }
    useEffect(() => {
        Axios.get(
            '/api/getCompaniesHubspot',
        ).then(function(response){
            setAllFiches(response.data.data)
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
        setIsLoad(true)
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
                setIsLoad(false)
            })
        }else if(name.length > 0 ){
            if(cp.length > 0 ){
                Axios.get('https://api.insee.fr/api-sirene/3.11/siret?q=denominationUniteLegale:"'+name+'" AND codePostalEtablissement:'+cp+'*&nombre=1000',{
                    headers: {
                        'X-INSEE-Api-Key-Integration':'b4bd23f3-1146-4e49-bd23-f31146ae49db'
                    }
                }).then(function(response){
                    setFactures(response.data.etablissements);
                    setIsLoad(false)
                })
            }else{
                Axios.get('https://api.insee.fr/api-sirene/3.11/siret?q=denominationUniteLegale:"'+name+'"&nombre=1000',{
                    headers: {
                        'X-INSEE-Api-Key-Integration':'b4bd23f3-1146-4e49-bd23-f31146ae49db'
                    }
                }).then(function(response){
                    setFactures(response.data.etablissements);
                    setIsLoad(false)
                })
            }
        }else if (cp.length > 0){
            Axios.get('https://api.insee.fr/api-sirene/3.11/siret?q=codePostalEtablissement:'+cp+'*&nombre=1000',{
                headers: {
                    'X-INSEE-Api-Key-Integration':'b4bd23f3-1146-4e49-bd23-f31146ae49db'
                }
            }).then(function(response){
                setFactures(response.data.etablissements);
                setIsLoad(false)
            })
        }

    };
    return (
        <>
            <select>
                {

                }
            </select>
            <div style={{width: "100%",display: "flex",justifyContent: "center",margin: "20px",alignItems: "center"}}>
                <div style={{width: "450px",display: "flex", justifyContent: "center",flexWrap: "wrap",gap: "10px"}}>
                    <input style={{margin: "0", width: "420px"}} placeholder={"SIRET"}
                           id={"searchSiretField"} type={"text"}/>
                    <input style={{margin: 0}} placeholder={"Nom de l'entreprise"}
                           id={"searchNameField"} type={"text"}/>
                    <input style={{margin: 0}} placeholder={"Code Postal"}
                           id={"searchCpField"} type={"text"}/>
                </div>
                <button style={{height: "40px", margin:0}} className={"buttonToSearchCompanies"} onClick={searchEntrepriseBySiret}>Chercher</button>
            </div>
            <div className={"allCompaniesContainer"}>
                <Link to="/delete">Accueil</Link>
                {isLoad === true ?
                    <span className="loader"></span>
                    :
                    factures &&
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
                                    filter: "drop-shadow(2px 4px 6px black)",
                                    maxWidth:"650px"
                                }}>
                                    <div style={{display: "flex", flexFlow: "row", gap: "10px"}}>
                                        <p style={{
                                            margin: "0",
                                            fontSize: "20px",
                                            fontWeight: "bolder",
                                            maxWidth:"75%"
                                        }}>{val.uniteLegale.denominationUniteLegale}</p>
                                        {val.periodesEtablissement[0].etatAdministratifEtablissement == 'F' ?
                                            <div style={{
                                                color: "red",
                                                backgroundColor: "rgba(255,0,0,0.3)",
                                                borderRadius: "10px",
                                                width: "170px",
                                                textAlign: "center",
                                                padding: "2px",
                                                height:"23px"
                                            }}>Fermé
                                                - {moment(val.periodesEtablissement[0].dateDebut).utc().format('DD/MM/YYYY')}</div> :
                                            <div style={{
                                                color: "green",
                                                backgroundColor: "rgba(0,255,0,0.3)",
                                                borderRadius: "10px",
                                                width: "80px",
                                                textAlign: "center",
                                                padding: "2px",
                                                height:"23px"
                                            }}>Ouvert</div>
                                        }
                                    </div>
                                    <div style={{display: "flex", justifyContent: "space-around", color: "#b9b9b9"}}>
                                        <p>Informations juridiques</p>
                                        <p>Adresse de l'entreprise</p>
                                    </div>
                                    <div style={{display: "flex", gap: "25px"}}>
                                        <div
                                            style={{width: "350px", borderRight: "3px solid gray", lineHeight: "15px"}}>
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
                                        <div style={{width: "250px", lineHeight: "15px"}}>
                                            <p>{val.adresseEtablissement.numeroVoieEtablissement + " " + val.adresseEtablissement.typeVoieEtablissement + " " + val.adresseEtablissement.libelleVoieEtablissement}</p>
                                            <p>{val.adresseEtablissement.complementAdresseEtablissement}</p>
                                            <p>{val.adresseEtablissement.codePostalEtablissement}</p>
                                            <p>{val.adresseEtablissement.libelleCommuneEtablissement}</p>

                                        </div>
                                    </div>
                                    <button style={{position: "absolute", right: "20px", bottom: "20px"}}
                                            className={"buttonToSearchCompanies"} onClick={openModal} value={key}
                                            name={val.uniteLegale.denominationUniteLegale}>Ajouter
                                    </button>
                                </div>
                            </>
                        )
                    })}
                {selectedCompanie &&
                        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}
                               contentLabel="Example Modal">
                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "baseline"}}>
                                <p style={{fontWeight: "500", color: "rgb(87, 86, 86)"}}>Valider la création d'une fiche pour {selectedCompanie.uniteLegale.denominationUniteLegale} ?</p>
                            </div>
                            <div className={"validationModalContainer"}>
                                <ValidationModal companie={selectedCompanie} change={closeModalValid} no={closeModalCancel}/>
                            </div>
                        </Modal>
                    }
            </div>
            <NotificationContainer/>
        </>
    )
}

export default HomePage