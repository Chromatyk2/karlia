import React,{useState, useEffect} from 'react';
import Axios from "axios";
import moment from "moment/moment";

function DeleteModal(props) {
    const [isLoad, setIsLoad] = React.useState(false);
    const addCompanie = (e) => {
        props.change();
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
                    <button onClick={addCompanie} className={"validationButton"}>Oui
                    </button>
                    <button onClick={closeModal} className={"refuseButton"}>Non</button>
                </>
            }
        </>
    );
}

export default DeleteModal;