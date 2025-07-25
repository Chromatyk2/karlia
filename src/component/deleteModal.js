import React,{useState, useEffect} from 'react';
import Axios from "axios";
import moment from "moment/moment";

function DeleteModal(props) {
    const [isLoad, setIsLoad] = React.useState(false);
    const deleteEntreprise = (e) => {
        props.deals.map((val, key) => {
            Axios.get(
                '/api/deleteDeals/' + val.id
            )
        })
        props.contacts.map((val, key) => {
            Axios.get(
                '/api/deleteContact/' + val.id
            )
        })
        Axios.get(
            '/api/deleteCompany/' + props.companie.is
        ).then(function(response){
            props.change();
        })
    }
    ;function closeModal() {
        props.no();
    }
    return (
        <>
            {isLoad === true ?
                <span className="loader"></span>
                :
                <>
                    <button onClick={deleteEntreprise} className={"validationButton"}>Oui
                    </button>
                    <button onClick={closeModal} className={"refuseButton"}>Non</button>
                </>
            }
        </>
    );
}

export default DeleteModal;