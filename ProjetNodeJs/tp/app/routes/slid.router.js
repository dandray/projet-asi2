// user.route.js

var multer = require("multer");
var SlidController = require("./../controllers/slid.controller.js");
var express = require("express");
var router = express.Router();
module.exports = router;

var storage = multer.memoryStorage();
var multerMiddleware = multer({"storage":storage});

router.get("/slids", function(request,response) { SlidController.list(request,response);});

//Creation de la Slide (POST)
router.post("/slids", multerMiddleware.single("file"), function(request,response) { SlidController.create(request,response); });

//Liste des slides (GET)
router.route("/slids/:slidId")
	.get(function(request,response) { SlidController.read(request,response); });
