import React, {useEffect, useState} from 'react';
import '../App.css'
import Axios from "axios";
import Modal from 'react-modal';
import ValidationModal from "./vaidationModal";
import moment from "moment";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import DeleteModal from "./deleteModal";

function DeletePage(props) {
    const [selectedCompanie,setSelectedCompanie] = useState();
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [isLoad, setIsLoad] = React.useState(false);
    const [entreprise, setEntreprise] = React.useState(null);
    const [contacts, setContacts] = useState([]);
    const [deals, setDeals] = useState([]);
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
        NotificationManager.success('Suppresion validée', 'Validation', 3000);
        setContacts([])
        setDeals([])
        setEntreprise(null)
    }function closeModalCancel() {
        setIsOpen(false);
    }
    const searchEntrepriseById = (e) => {
        setContacts([])
        setDeals([])
        setIsLoad(true)
        const idEntreprise = document.getElementById('searchIdField').value;
        if(idEntreprise.length > 0){
            Axios.get(
                '/api/getCompaniesHubspot/'+idEntreprise
            ).then(function(response){
                setEntreprise(response.data);
                // setIsLoad(false)
                const IDs = new Set(response.data.associations.contacts.results.map((item) => item.id));
                Array.from(IDs).map((val, key) => {
                    console.log(val);
                        Axios.get(
                            '/api/getContactsByCompany/' + val
                        ).then(function (response) {
                            const x = contacts.filter(item => item.id === response.data.id);
                            if(x.length === 0){
                                setContacts(contacts => [...contacts,response.data]);
                            }
                        })
                    })
                response.data.associations.deals.results.map((val, key) => {
                    Axios.get(
                        '/api/getDealsByCompany/' + val.id
                    ).then(function (response) {
                        setDeals(contacts => [...deals,response.data]);
                    })
                })
            })
            .finally(setIsLoad(false))
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
            <div className={"allCompaniesContainerDelete"}>
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
                            width: "500px",
                            marginLeft: "30px"
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
                                    color: "rgb(185, 185, 185)",
                                    fontSize: "15px"
                                }}>{"Identifiant : " + entreprise.id}</p>
                            </div>
                            <div
                                style={{width: "350px", lineHeight: "15px"}}>
                                <p><span style={{color: "#b9b9b9"}}>SIRET :</span> {entreprise.properties.company_siret}
                                </p>
                                <p>{entreprise.properties.address}</p>
                                <p> {entreprise.properties.zip}</p>
                                <p>{entreprise.properties.city}</p>
                            </div>
                            <button style={{position: "absolute", right: "20px", bottom: "20px"}}
                                    className={"buttonToSearchCompanies"} onClick={openModal}
                                    id={entreprise.id}>Supprimer
                            </button>
                        </div>
                    </>
                }
                <div style={{display: "flex", flexFlow: "column", justifyContent: "flex-start",gap: "20px",marginLeft: "30px"}}>
                    {isLoad === true ?
                        <span className="loader"></span>
                        :
                    contacts.length > 0 &&
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
                                width:"500px"
                            }}>
                                <p style={{
                                    margin: "0",
                                    fontSize: "25px",
                                    fontWeight: "bolder",
                                    maxWidth: "75%",
                                    marginBottom:"20px"
                                }}>Contacts</p>
                                {
                                    contacts.filter((item,key) => contacts.indexOf(item) === key).map((val, key) => {
                                        return (
                                            <>
                                                <div style={{display: "flex", flexFlow: "column", gap: "0"}}>
                                                    <p style={{
                                                        margin: "0",
                                                        fontSize: "20px",
                                                        maxWidth: "75%"
                                                    }}>{val.properties.firstname+" "+val.properties.lastname}</p>
                                                    <p style={{
                                                        margin: "0",
                                                        fontWeight: "bolder",
                                                        maxWidth: "75%",
                                                        color: "rgb(185, 185, 185)",
                                                        fontSize: "15px"
                                                    }}>{val.properties.email}</p>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                        </>
                    }
                    {isLoad === true ?
                        <span className="loader"></span>
                        :
                        deals.length > 0 &&
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
                                maxWidth: "650px",
                                width:"500px"
                            }}>
                                <p style={{
                                    margin: "0",
                                    fontSize: "25px",
                                    fontWeight: "bolder",
                                    maxWidth: "75%",
                                    marginBottom:"20px"
                                }}>Transactions</p>
                                {
                                    deals.map((val, key) => {
                                        return (
                                            <>
                                                <div style={{display: "flex", flexFlow: "column", gap: "0"}}>
                                                    <p style={{
                                                        margin: "0",
                                                        fontSize: "20px",
                                                        maxWidth: "75%"
                                                    }}>{val.properties.dealname}</p>
                                                    <p style={{
                                                        margin: "0",
                                                        fontWeight: "bolder",
                                                        maxWidth: "75%",
                                                        color: "rgb(185, 185, 185)",
                                                        fontSize: "15px"
                                                    }}>{moment(val.properties.createdate).utc().format('DD/MM/YYYY')}</p>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                        </>
                    }
                </div>
                {entreprise &&
                    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}
                           contentLabel="Example Modal">
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "baseline"}}>
                            <p style={{fontWeight: "500", color: "rgb(87, 86, 86)"}}>Confirmer la suppresion de l'entreprise et de toutes ses associations ? L'action est irréversible</p>
                        </div>
                        <div className={"validationModalContainer"}>
                            <DeleteModal companie={entreprise} contacts={contacts} deals={deals} change={closeModalValid}
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