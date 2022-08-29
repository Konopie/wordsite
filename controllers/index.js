const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require('./homeroutes');

//all router to use any routes declared in /api index.js and homeroutes.js
router.use("/api", apiRoutes);
router.use('/', homeRoutes);

module.exports = router;
