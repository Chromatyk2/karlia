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
    const [entreprise, setEntreprise] = React.useState(null);
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
                setEntreprise(response.data);
                // setIsLoad(false)
                response.data.associations.contacts.results.map((val, key) => {
                    Axios.get(
                        '/api/getContactsByCompany/' + val.id
                    ).then(function (response) {
                        console.log(response.data)
                        // setIsLoad(false)
                    })
                })
            })
        }
    };
    return (
        <>
            <div style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                margin: "20px",
                alignItems: "center"
            }}>
                <div style={{width: "450px", display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "10px"}}>
                    <input style={{margin: "0", width: "420px"}} placeholder={"ID de fiche d'informations"}
                           id={"searchIdField"} type={"text"}/>
                </div>
                <button style={{height: "40px", margin: 0}} className={"buttonToSearchCompanies"}
                        onClick={searchEntrepriseById}>Chercher
                </button>
            </div>
            <div className={"allCompaniesContainer"}>
                {isLoad === true ?
                    <span className="loader"></span>
                    :
                    entreprise &&
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
                            maxWidth: "650px"
                        }}>
                            <div style={{display: "flex", flexFlow: "column", gap: "0"}}>
                                <p style={{
                                    margin: "0",
                                    fontSize: "20px",
                                    fontWeight: "bolder",
                                    maxWidth: "75%"
                                }}>{entreprise.properties.name}</p>
                                <p style={{
                                    margin: "0",
                                    fontWeight: "bolder",
                                    maxWidth: "75%",
                                    color:"rgb(185, 185, 185)",
                                    fontSize:"15px"
                                }}>{"Identifiant : "+entreprise.id}</p>
                            </div>
                            <div
                                style={{width: "350px", lineHeight: "15px"}}>
                                <p><span style={{color: "#b9b9b9"}}>SIRET :</span> {entreprise.properties.company_siret}</p>
                                <p>{entreprise.properties.address}</p>
                                <p> {entreprise.properties.zip}</p>
                                <p>{entreprise.properties.city}</p>
                            </div>
                        </div>
                    </>
                }
                {selectedCompanie &&
                    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}
                           contentLabel="Example Modal">
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "baseline"}}>
                            <p style={{fontWeight: "500", color: "rgb(87, 86, 86)"}}>Valider la création d'une fiche
                                pour {selectedCompanie.uniteLegale.denominationUniteLegale} ?</p>
                        </div>
                        <div className={"validationModalContainer"}>
                            <ValidationModal companie={selectedCompanie} change={closeModalValid}
                                             no={closeModalCancel}/>
                        </div>
                    </Modal>
                }
            </div>
            <NotificationContainer/>
        </>
    )
}

export default DeletePage