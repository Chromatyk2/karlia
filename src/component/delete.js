import React, {useEffect, useState} from 'react';
import '../App.css'
import Axios from "axios";
import Modal from 'react-modal';
import ValidationModal from "./vaidationModal";
import moment from "moment";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

function DeletePage(props) {
    const [selectedCompanie,setSelectedCompanie] = useState();
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [isLoad, setIsLoad] = React.useState(false);
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
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }function closeModalValid() {
        setIsOpen(false);
        NotificationManager.success('L\'entreprise et ses associations ont bien été supprimées', 'Validation', 3000);
    }function closeModalCancel() {
        setIsOpen(false);
    }
    const searchEntrepriseById = (e) => {
        setIsLoad(true)
        const idEntreprise = document.getElementById('searchIdField').value;
        if(idEntreprise.length > 0){
            Axios.get(
                '/api/getCompaniesHubspot/'+idEntreprise
            ).then(function(response){
                console.log(response.data);
                setIsLoad(false)
            })
        }
    };
    return (
        <>
            <div style={{width: "100%",display: "flex",justifyContent: "center",margin: "20px",alignItems: "center"}}>
                <div style={{width: "450px",display: "flex", justifyContent: "center",flexWrap: "wrap",gap: "10px"}}>
                    <input style={{margin: "0", width: "420px"}} placeholder={"ID de fiche d'informations"}
                           id={"searchIdField"} type={"text"}/>
                </div>
                <button style={{height: "40px", margin:0}} className={"buttonToSearchCompanies"} onClick={searchEntrepriseById}>Chercher</button>
            </div>
            {/*<div className={"allCompaniesContainer"}>*/}
            {/*    {isLoad === true ?*/}
            {/*        <span className="loader"></span>*/}
            {/*        :*/}
            {/*        factures &&*/}
            {/*        factures.map((val, key) => {*/}
            {/*            return (*/}
            {/*                <>*/}
            {/*                    <div style={{*/}
            {/*                        display: "flex",*/}
            {/*                        flexFlow: "column",*/}
            {/*                        background: "#fefefe",*/}
            {/*                        padding: "20px",*/}
            {/*                        borderRadius: "20px",*/}
            {/*                        fontWeight: "500",*/}
            {/*                        color: "#575656",*/}
            {/*                        filter: "drop-shadow(2px 4px 6px black)",*/}
            {/*                        maxWidth:"650px"*/}
            {/*                    }}>*/}
            {/*                        <div style={{display: "flex", flexFlow: "row", gap: "10px"}}>*/}
            {/*                            <p style={{*/}
            {/*                                margin: "0",*/}
            {/*                                fontSize: "20px",*/}
            {/*                                fontWeight: "bolder",*/}
            {/*                                maxWidth:"75%"*/}
            {/*                            }}>{val.uniteLegale.denominationUniteLegale}</p>*/}
            {/*                            {val.periodesEtablissement[0].etatAdministratifEtablissement == 'F' ?*/}
            {/*                                <div style={{*/}
            {/*                                    color: "red",*/}
            {/*                                    backgroundColor: "rgba(255,0,0,0.3)",*/}
            {/*                                    borderRadius: "10px",*/}
            {/*                                    width: "170px",*/}
            {/*                                    textAlign: "center",*/}
            {/*                                    padding: "2px",*/}
            {/*                                    height:"23px"*/}
            {/*                                }}>Fermé*/}
            {/*                                    - {moment(val.periodesEtablissement[0].dateDebut).utc().format('DD/MM/YYYY')}</div> :*/}
            {/*                                <div style={{*/}
            {/*                                    color: "green",*/}
            {/*                                    backgroundColor: "rgba(0,255,0,0.3)",*/}
            {/*                                    borderRadius: "10px",*/}
            {/*                                    width: "80px",*/}
            {/*                                    textAlign: "center",*/}
            {/*                                    padding: "2px",*/}
            {/*                                    height:"23px"*/}
            {/*                                }}>Ouvert</div>*/}
            {/*                            }*/}
            {/*                        </div>*/}
            {/*                        <div style={{display: "flex", justifyContent: "space-around", color: "#b9b9b9"}}>*/}
            {/*                            <p>Informations juridiques</p>*/}
            {/*                            <p>Adresse de l'entreprise</p>*/}
            {/*                        </div>*/}
            {/*                        <div style={{display: "flex", gap: "25px"}}>*/}
            {/*                            <div*/}
            {/*                                style={{width: "350px", borderRight: "3px solid gray", lineHeight: "15px"}}>*/}
            {/*                                <p><span style={{color: "#b9b9b9"}}>SIRET :</span> {val.siret}</p>*/}
            {/*                                <p><span*/}
            {/*                                    style={{color: "#b9b9b9"}}>Dénomination légale :</span> {val.uniteLegale.denominationUniteLegale}*/}
            {/*                                </p>*/}
            {/*                                <p><span*/}
            {/*                                    style={{color: "#b9b9b9"}}>Date de création :</span> {val.uniteLegale.dateCreationUniteLegale}*/}
            {/*                                </p>*/}
            {/*                                <p><span*/}
            {/*                                    style={{color: "#b9b9b9"}}>Type d'entreprise :</span> {val.uniteLegale.categorieEntreprise}*/}
            {/*                                </p>*/}
            {/*                                <p><span*/}
            {/*                                    style={{color: "#b9b9b9"}}>Code NAF :</span> {val.uniteLegale.activitePrincipaleUniteLegale}*/}
            {/*                                </p>*/}
            {/*                                <p><span*/}
            {/*                                    style={{color: "#b9b9b9"}}>Effectif :</span> {val.uniteLegale.trancheEffectifsUniteLegale}*/}
            {/*                                </p>*/}
            {/*                            </div>*/}
            {/*                            <div style={{width: "250px", lineHeight: "15px"}}>*/}
            {/*                                <p>{val.adresseEtablissement.numeroVoieEtablissement + " " + val.adresseEtablissement.typeVoieEtablissement + " " + val.adresseEtablissement.libelleVoieEtablissement}</p>*/}
            {/*                                <p>{val.adresseEtablissement.complementAdresseEtablissement}</p>*/}
            {/*                                <p>{val.adresseEtablissement.codePostalEtablissement}</p>*/}
            {/*                                <p>{val.adresseEtablissement.libelleCommuneEtablissement}</p>*/}

            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                        <button style={{position: "absolute", right: "20px", bottom: "20px"}}*/}
            {/*                                className={"buttonToSearchCompanies"} onClick={openModal} value={key}*/}
            {/*                                name={val.uniteLegale.denominationUniteLegale}>Ajouter*/}
            {/*                        </button>*/}
            {/*                    </div>*/}
            {/*                </>*/}
            {/*            )*/}
            {/*        })}*/}
            {/*    {selectedCompanie &&*/}
            {/*        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}*/}
            {/*               contentLabel="Example Modal">*/}
            {/*            <div style={{display: "flex", justifyContent: "space-between", alignItems: "baseline"}}>*/}
            {/*                <p style={{fontWeight: "500", color: "rgb(87, 86, 86)"}}>Valider la création d'une fiche pour {selectedCompanie.uniteLegale.denominationUniteLegale} ?</p>*/}
            {/*            </div>*/}
            {/*            <div className={"validationModalContainer"}>*/}
            {/*                <ValidationModal companie={selectedCompanie} change={closeModalValid} no={closeModalCancel}/>*/}
            {/*            </div>*/}
            {/*        </Modal>*/}
            {/*    }*/}
            {/*</div>*/}
            {/*<NotificationContainer/>*/}
        </>
    )
}

export default DeletePage