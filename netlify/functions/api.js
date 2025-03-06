import express, { Router } from "express";
import serverless from "serverless-http";
import axios from "axios";

const api = express();

const router = Router();
router.get("/hello", (req, res) => res.send("Hello World!"));
router.post("/getCompaniesHubspot", (req, res, next)=>{
    axios.post(
        'https://api.hubapi.com/crm/v3/objects/companies',
        {
            headers: {
                'authorization': `Bearer pat-na1-2ae0381d-ef96-41d8-8e60-81da0ac163a0`,
                'content-type': application/json

            },
            data: {
                associations: [
                    {
                        types: [
                            {
                                "associationCategory": "HUBSPOT_DEFINED",
                                "associationTypeId": 450
                            }
                        ],
                        to: {
                            "id": "30750051148"
                        }
                    }
                ],
                objectWriteTraceId: "string",
                properties: {
                    "name": "test"
                }

            }
        }
    ).then(response => res.json(response.data))
});
api.use("/api/", router);

export const handler = serverless(api);