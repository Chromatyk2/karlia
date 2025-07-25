import express, { Router } from "express";
import serverless from "serverless-http";
import Axios from 'axios';

const api = express();

const router = Router();
router.get("/createCompanie/:name/:siret/:create/:type/:naf/:effectif/:adress/:zip/:ville", (req, res, next)=>{
    const name = req.params.name;
    const siret = req.params.siret;
    const create = req.params.create;
    const type = req.params.type;
    const naf = req.params.naf;
    const effectif = req.params.effectif;
    const adress = req.params.adress;
    const zip = req.params.zip;
    const ville = req.params.ville;
    const secret = process.env.REACT_APP_CLIENT_SECRET;
    Axios.post(
        'https://api.hubapi.com/crm/v3/objects/companies',
        {
            properties: {
                "name": name,
                "company_siret": siret,
                "type_entreprise": type,
                "company_activite_principale_etablissement": naf,
                "company_facility_create_date": create,
                "numberofemployees": effectif,
                "address": adress,
                "zip": zip,
                "city": ville,
            }
        },
        {
            headers: {
                Authorization: 'Bearer '+secret
            }
        }
    ).then(response => res.json(response.data))
});
router.get("/getCompaniesHubspot/:idEntreprise", (req, res, next)=>{
    const secret = process.env.REACT_APP_CLIENT_SECRET;
    const idEntreprise = req.params.idEntreprise;
    Axios.get(
        'https://api.hubapi.com/crm/v3/objects/companies/'+idEntreprise+"?properties=company_siret,address,zip,city,name&associations=contacts,deals,tasks",
        {
            headers: {
                Authorization: 'Bearer '+secret
            },
        }
    ).then(response => res.json(response.data))
});
router.get("/getContactsByCompany/:idContact", (req, res, next)=>{
    const secret = process.env.REACT_APP_CLIENT_SECRET;
    const idContact = req.params.idContact;
    Axios.get(
        'https://api.hubapi.com/crm/v3/objects/contacts/'+idContact,
        {
            headers: {
                Authorization: 'Bearer '+secret
            },
        }
    ).then(response => res.json(response.data))
});

router.get("/getDealsByCompany/:idDeals", (req, res, next)=>{
    const secret = process.env.REACT_APP_CLIENT_SECRET;
    const idDeals = req.params.idDeals;
    Axios.get(
        'https://api.hubapi.com/crm/v3/objects/deals/'+idDeals,
        {
            headers: {
                Authorization: 'Bearer '+secret
            },
        }
    ).then(response => res.json(response.data))
});

router.get("/deleteContact/:idContact", (req, res, next)=>{
    const secret = process.env.REACT_APP_CLIENT_SECRET;
    const idContact = req.params.idContact;
    Axios.delete(
        'https://api.hubapi.com/crm/v3/objects/contacts/'+idContact,
        {
            headers: {
                Authorization: 'Bearer '+secret
            },
        }
    ).then(response => res.json(response.data))
});

router.get("/deleteDeal/:idDeal", (req, res, next)=>{
    const secret = process.env.REACT_APP_CLIENT_SECRET;
    const idDeal = req.params.idDeal;
    Axios.delete(
        'https://api.hubapi.com/crm/v3/objects/deals/'+idDeal,
        {
            headers: {
                Authorization: 'Bearer '+secret
            },
        }
    ).then(response => res.json(response.data))
});

router.get("/deleteCompany/:idCompany", (req, res, next)=>{
    const secret = process.env.REACT_APP_CLIENT_SECRET;
    const idCompany = req.params.idCompany;
    Axios.delete(
        'https://api.hubapi.com/crm/v3/objects/companies/'+idCompany,
        {
            headers: {
                Authorization: 'Bearer '+secret
            },
        }
    ).then(response => res.json(response.data))
});
api.use("/api/", router);

export const handler = serverless(api);