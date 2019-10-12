const express = require("express");
const router = express.Router();
const { IndexController } = require("./controllers/IndexController");
const UrlController = require("./controllers/UrlController");
// root route
router.get("/", IndexController);
// get all urls
router.get("/urls", UrlController.index);
// shorturl API
router.get("/api/shorturl/:id", UrlController.show);
router.post("/api/shorturl/new", UrlController.store);
// Exporting object
module.exports = router;