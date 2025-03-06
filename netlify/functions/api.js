import express, { Router } from "express";
import serverless from "serverless-http";
import axios from "axios";

const api = express();

const router = Router();
router.get("/hello", (req, res) => res.send("Hello World!"));
router.get("/getCompaniesHubspot", (req, res, next)=>{
    axios.post(
        'https://api.hubapi.com/crm/v3/objects/companies',
        {
            headers: {
                Authorization: `Bearer pat-na1-2ae0381d-ef96-41d8-8e60-81da0ac163a0`,
                Content-Type:"application/json"
            },
            properties:{
                "name": "Test Pierre"
            }
        }
    ).then(response => res.json(response.data))
});
api.use("/api/", router);

export const handler = serverless(api);