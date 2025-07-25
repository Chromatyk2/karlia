import React,{useState, useEffect} from 'react';
import Axios from "axios";
import moment from "moment/moment";

function DeleteModal(props) {
    const [isLoad, setIsLoad] = React.useState(false);
    console.log(props.deals)
    console.log(props.contacts)
    console.log(props.companie)
    const deleteEntreprise = (e) => {
        props.deals.map((val, key) => {
            Axios.get(
                '/api/deleteDeal/' + val.id
            )
        })
        props.contacts.map((val, key) => {
            Axios.get(
                '/api/deleteContact/' + val.id
            )
        })
        Axios.get(
            '/api/deleteCompany/' + props.companie.id
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