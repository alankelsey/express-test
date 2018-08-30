"use strict";


// import { Router } from "express";
import { Request, Response } from "express";

const express = require("express");
const router = express.Router();
const userFile = require("../data/userFile.json");


/**
 * GET /api
 * List of API examples.
 */
router.get("/api", function(req: Request, res: Response) {
  // const data = req.app.get('appData');
  // res.json(userFile);
  res.json();
});

module.exports = router;

