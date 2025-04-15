import express from "express";
import { findFirstAid, scanDisease, symptomsAnalyzer } from "../controllers/disease.controller.js";
import fileUpload from "express-fileupload"

const diseaseRouter = express.Router();

// scan disease 
diseaseRouter.post("/scan-disease", fileUpload({
    createParentPath: true
}), scanDisease);

// Symptoms Analyzer
diseaseRouter.post("/symptoms-analyzer", fileUpload({
    createParentPath: true
}), symptomsAnalyzer);

// find first aid 
diseaseRouter.post("/first-aid", fileUpload({
    createParentPath: true
}), findFirstAid);


export default diseaseRouter;