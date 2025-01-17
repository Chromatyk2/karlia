import express, { Router } from "express";
import serverless from "serverless-http";
import axios from "axios";

const api = express();

const router = Router();
router.get("/hello", (req, res) => res.send("Hello World!"));
router.get("/getCompaniesHubspot", (req, res, next)=>{
    axios.get('https://api.hubapi.com/crm/v3/objects/contacts')
    .then(response => res.json(response.data))
});
api.use("/api/", router);

export const handler = serverless(api);