/*
* router for api / JSON
*/
import { Router } from "express";
import { Request, Response } from "express";

const express = require("express");
const router = express.Router();

router.get("/userFile", function(req: Request, res: Response) {

    res.render("userFile", {
        pageTitle: "userFile",
        pageId: "feedback"
    });
});

module.exports = router;