var  express  =  require("express");
var  router  =  express.Router();
module.exports  =  router;

// Routing using

router.route('/')
    .get(function(request, response){
    	response.end("Hello world");
    });