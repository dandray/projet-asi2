var  express  =  require("express");
var  app  =  express();
var  http  =  require("http");
var  CONFIG  =  require("./config.json");
process.env.CONFIG  =  JSON.stringify(CONFIG);
var  path  =  require("path");
var  fs = require('fs');	
var  defaultRoute  =  require("./app/routes/default.route.js");
var slidRouter = require("./app/routes/slid.router.js");
var  bodyParser = require('body-parser');
var utils = require("./app/utils/utils.js")

// init server
var  server  =  http.createServer(app);
server.listen(CONFIG.port);

// appel dans les autres modulesvar  CONFIG  =  JSON.parse(process.env.CONFIG);


app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true})); 
app.use(defaultRoute);
app.use(slidRouter);
app.use("/admin", express.static (path.join(__dirname, "public/admin")));
app.use("/watch", express.static (path.join(__dirname, "public/watch")));

	app.get("/loadPres", function (request, response) {
		fs.readdir(CONFIG.presentationDirectory, (err, files) => {
			if(err){
				response.end(500, err);
			}
			var metaFiles = [];

			for (var i in files) {
				if (path.extname(files[i]) === ".json") {
					metaFiles.push(files[i]);
				}
			}

			var result = {};
			var i = 0;
			metaFiles.forEach(function(file) {
				fs.readFile(path.join(CONFIG.presentationDirectory, file), function(err, data) {
					result[path.basename(file,'.pres.json')] = JSON.parse(data.toString());
					i++;
					result[content.id] = content;
					if (i === metaFiles.length) {
						response.end(JSON.stringify(result));
					}
				});
			});
		});
	});

app.post("/savePres", function(request,response) {
	console.dir(request.body);
    var pres = request.body;
    var id = pres.id;
    fs.writeFile(path.join(CONFIG.presentationDirectory, id+".pres.json"), JSON.stringify(pres), "utf8", response.end());
});

server.listen(CONFIG.port, function() {
	console.log("Server OK: " + CONFIG.port);
});	