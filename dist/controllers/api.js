"use strict";
// add to tsconfig if still needed
// "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const userFile = require("../data/userFile.json");
/**
 * GET /api
 * List of API examples.
 *
 * using this for a place holder to get the router/username json working
 */
router.get("/api", function (req, res) {
    // const data = req.app.get('appData');
    // res.json(userFile);
    res.json(this.userFile);
});
module.exports = router;
//# sourceMappingURL=api.js.map