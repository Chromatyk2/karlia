import express, { Router } from "express";
import serverless from "serverless-http";
import Axios from "axios";

const api = express();

const router = Router();
router.get("/hello", (req, res) => res.send("Hello World!"));
router.get("/getCompaniesHubspot", (req, res, next)=>{
    Axios.get(
        'https://api.hubapi.com/crm/v3/objects/companies',
        {
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_CLIENT_SECRET}`
            },
        }
    ).then(response => res.json(response.data))
});
api.use("/api/", router);

export const handler = serverless(api);