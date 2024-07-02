import React, {useEffect} from 'react';
import '../App.css'
import Axios from "axios";

function HomePage(props) {
    useEffect(() => {
        Axios.get(`/api/documents?type=4`,{headers: { Authorization: `Bearer e4e05o-8z7n8e-144030-zvpmas-nhonth` }})
    }, []);
    return (
        <>
            <p>Bonjour</p>
            <p>Ceci est un test</p>
        </>
    )
}

export default HomePage