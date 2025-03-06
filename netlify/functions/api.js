import express, { Router } from "express";
import serverless from "serverless-http";
import Axios from 'axios';

const api = express();

const router = Router();
router.get("/hello", (req, res) => res.send("Hello World!"));
router.post("/createCompanie/:name/:siret", (req, res, next)=>{

    const name = req.params.name;
    const siret = req.params.siret;
    Axios.post(
        'https://api.hubapi.com/crm/v3/objects/companies',
        {
            properties: {
                "name": name,
                "company_siret": siret
            }
        },
        {
            headers: {
                Authorization: `Bearer pat-na1-2ae0381d-ef96-41d8-8e60-81da0ac163a0`
            }
        }
    ).then(response => res.json(response.data))
});
router.get("/getCompaniesHubspot", (req, res, next)=>{
    Axios.get(
        'https://api.hubapi.com/crm/v3/objects/companies',
        {
            headers: {
                Authorization: `Bearer pat-na1-2ae0381d-ef96-41d8-8e60-81da0ac163a0`
            },
        }
    ).then(response => res.json(response.data))
});
api.use("/api/", router);

export const handler = serverless(api);