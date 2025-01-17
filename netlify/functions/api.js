import express, { Router } from "express";
import serverless from "serverless-http";
import axios from "axios";

const api = express();

const router = Router();
router.get("/hello", (req, res) => res.send("Hello World!"));
router.get("/api/getCompaniesHubspot", (req, res, next)=>{

    axios.get(
        'https://api.hubapi.com/crm/v3/objects/contacts',
        {
            headers: {
                Authorization: `Bearer pat-na1-2ae0381d-ef96-41d8-8e60-81da0ac163a0`,
                'Content-Type': 'application/json',
            },
        },
        (err, data) => {
            res.send(data)
        }
    );
});
api.use("/api/", router);

export const handler = serverless(api);