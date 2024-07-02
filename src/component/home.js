import React, {useEffect} from 'react';
import '../App.css'
import {Axios} from "axios";

function HomePage(props) {
    useEffect(() => {
        fetch("https://karlia.fr/app/api/v2/documents",{'Authorization': 'Bearer o0qe5a-o5anz3-144030-jtijcb-g6b3yn'}
        )
        .then(res => res.json());
    }, []);
    return (
        <>
            <p>Bonjour</p>
            <p>Ceci est un test</p>
        </>
    )
}

export default HomePage