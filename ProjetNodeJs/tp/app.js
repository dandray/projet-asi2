var http = require("http");
var path = require("path");
var express = require("express");
var fs = require("fs");
var bodyParser = require('body-parser');

var CONFIG = require("./config.json");
process.env.CONFIG = JSON.stringify(CONFIG);
var defaultRoute = require("./app/routes/default.route.js");
var slidRouter = require("./app/routes/slid.router.js");
var utils = require("./app/utils/utils.js")

var app = express();

var server = http.createServer(app);

var IOController = require("./app/controllers/io.controller.js");

app.use(defaultRoute);
app.use(slidRouter);
app.use("/admin", express.static(path.join(__dirname,"public/admin")));
app.use("/watch", express.static(path.join(__dirname,"public/watch")));

app.get("/loadPres", function(request,response){
	fs.readdir(CONFIG.presentationDirectory, (err, files) => {
		if (err) {
			response.end(500,err);
		}

		var pres = {};
		var i = 0;

		var metaFiles = [];
		for (var j in files) {
			if (path.extname(files[j])===".json") {
				metaFiles.push(files[j]);
			}

		}

		metaFiles.forEach(function(file) {
		    if (path.extname(file)===".json") {
		    	fs.readFile(path.join(CONFIG.presentationDirectory, file), function(err,data) {
		    		pres[path.basename(file,'.pres.json')] = JSON.parse(data.toString());
		    		i++;
					if (i===metaFiles.length) {
			    		response.end(JSON.stringify(pres));
			    	}
		    	});
		    }
		});
	});
});

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true})); 


app.post("/savePres", function(request,response) {
	var pres = request.body;
	var id = pres.id;

	fs.writeFile(path.join(CONFIG.presentationDirectory, id+".pres.json"), JSON.stringify(pres), "utf8", response.end());
});

server.listen(CONFIG.port);

IOController.listen(server);