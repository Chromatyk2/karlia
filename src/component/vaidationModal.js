import React,{useState, useEffect} from 'react';

function ValidationModal(props) {
    console.log(props.companie)
    return (
        <>
            <button className={"validationButton"}>Oui</button>
            <button className={"refuseButton"}>Non</button>
        </>
    );
}

export default ValidationModal;