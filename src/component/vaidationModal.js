import React,{useState, useEffect} from 'react';

function ValidationModal(props) {
    console.log(props.companie)
    return (
        <>
            <button>Oui</button>
            <button>Non</button>
        </>
    );
}

export default ValidationModal;