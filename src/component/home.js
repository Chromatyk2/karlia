import React, {useEffect} from 'react';
import '../App.css'
import {Axios} from "axios";

function HomePage(props) {
    useEffect(() => {
        fetch('https://karlia.fr/app/api/v2/documents', {
            method: 'get',
            headers: new Headers({
                ":authority:": "karlia.fr",
                ":method:": "GET",
                ":path:": "/app/api/v2/documents",
                ":scheme:": "https",
                "___internal-Request-Id:": "111b9ddf-605e-46c1-8512-1e391f85b94c",
                "Accept":"*/*",
                "Accept-Encoding":
                "gzip, deflate, br, zstd",
                "Accept-Language":
                "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
                "Authorization":
                "Bearer e4e05o-8z7n8e-144030-zvpmas-nhonth",
                "Cookie":
                "PHPSESSID=310jrjfq8hckeaa9f1bq5kevrn; karliaEmail=contact%40l4m.fr; karliaCompany=4030; karliaUser=5684; karliaCookieId=41364; karliaCookieToken=16p4lk1u-u0l1tvp9-ndea4y0b-2bturui9-xicp5lno-ccudwioy-0aqwcmku; selected_tab_home=1; crisp-client%2Fsession%2F7844008c-3a06-4d00-9562-47a37214cffe=session_946b805b-cf16-4241-aab7-ea298242fc5c; crisp-client%2Fsocket%2F7844008c-3a06-4d00-9562-47a37214cffe=1",
                "Priority":
                "u=1, i",
                "Sec-Ch-Ua-Mobile":
                "?0",
                "Sec-Ch-Ua-Platform":
                "Windows",
                "Sec-Fetch-Dest":
                "empty",
                "Sec-Fetch-Mode":
                "cors",
                "Sec-Fetch-Site":
                "none"
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