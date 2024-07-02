import React, {useEffect} from 'react';
import '../App.css'
import {Axios} from "axios";

function HomePage(props) {
    useEffect(() => {
        fetch('https://karlia.fr/app/api/v2/documents', {
            method: 'get',
            headers: new Headers({
                'Access-Control-Allow-Origin':'*',
                'method': 'GET',
                'Authorization': 'Bearer e4e05o-8z7n8e-144030-zvpmas-nhonth',
                'Content-Type': 'application/json'
            })
        });
    }, []);
    return (
        <>
            <p>Bonjour</p>
            <p>Ceci est un test</p>
        </>
    )
}

export default HomePage