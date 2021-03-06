#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var fs      = require('fs');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var connectionString = process.env.OPENSHIFT_MONGODB_DB_URL ? process.env.OPENSHIFT_MONGODB_DB_URL+"gamesprodb" : "gamesprodb";
//var db = mongojs(connectionString,["login","Favourite"]);
//var db = mongojs.connect("gamesprodb",["login","Favourite"]);


var db = mongojs(connectionString,["login","Favourite"]);

/**
 *  Define the sample application.
 */
var SampleApp = function() {

    
    var self = this;


    /*  ================================================================  */
    /*  Helper functions.                                                 */
    /*  ================================================================  */

    /**
     *  Set up server IP address and port # using env variables/defaults.
     */
    self.setupVariables = function() {
        //  Set the environment variables we need.
        self.ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
        self.port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

        if (typeof self.ipaddress === "undefined") {
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
            self.ipaddress = "127.0.0.1";
        };
    };


    /**
     *  Populate the cache.
     */
    self.populateCache = function() {
        if (typeof self.zcache === "undefined") {
            self.zcache = { 'index.html': '' };
        }

        //  Local cache for static content.
        self.zcache['index.html'] = fs.readFileSync('./index.html');
    };


    /**
     *  Retrieve entry (content) from cache.
     *  @param {string} key  Key identifying content to retrieve from cache.
     */
    self.cache_get = function(key) { return self.zcache[key]; };


    /**
     *  terminator === the termination handler
     *  Terminate server on receipt of the specified signal.
     *  @param {string} sig  Signal to terminate on.
     */
    self.terminator = function(sig){
        if (typeof sig === "string") {
           console.log('%s: Received %s - terminating sample app ...',
                       Date(Date.now()), sig);
           process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()) );
    };


    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
    self.setupTerminationHandlers = function(){
        //  Process on exit and signals.
        process.on('exit', function() { self.terminator(); });

        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
         'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function(element, index, array) {
            process.on(element, function() { self.terminator(element); });
        });
    };


    /*  ================================================================  */
    /*  App server functions (main app logic here).                       */
    /*  ================================================================  */

    /**
     *  Create the routing table entries + handlers for the application.
     */
    self.createRoutes = function() {
        self.routes = { };

        self.routes['/asciimo'] = function(req, res) {
            var link = "http://i.imgur.com/kmbjB.png";
            res.send("<html><body><img src='" + link + "'></body></html>");
        };

        self.routes['/'] = function(req, res) {
            res.setHeader('Content-Type', 'text/html');
            res.send(self.cache_get('index.html') );
        };
    };


    /**
     *  Initialize the server (express) and create the routes and register
     *  the handlers.
     */
    self.initializeServer = function() {
        self.createRoutes();
        self.app = express();
		self.app.use(bodyParser.json());
        //  Add handlers for the app (from the routes).
        for (var r in self.routes) {
            self.app.get(r, self.routes[r]);
        }
    };


    /**
     *  Initializes the sample application.
     */
    self.initialize = function() {
        self.setupVariables();
        self.populateCache();
        self.setupTerminationHandlers();

        // Create the express server and routes.
        self.initializeServer();
    };


    /**
     *  Start the server (starts up the sample application).
     */
    self.start = function() {
        //  Start the app on the specific interface (and port).
        self.app.listen(self.port, self.ipaddress, function() {
            console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now() ), self.ipaddress, self.port);
        });
		
		self.app.use(bodyParser.json());
        self.app.use(express.static(__dirname + '/client'));

        self.app.post("/registerUser", function(request, response){
            console.log(request.body);
			db.login.insert(request.body, function(err, record){
				if(err){
					console.log(err);
				}
				else{
					response.json(record);
				}
			});
			
        });
		
		self.app.post("/AddGame", function(request, response){
		//console.log("hey I am addGame");
            console.log(request.body);
			db.Favourite.insert(request.body, function(err, record){
				if(err){
					console.log(err);
				}
				else{
					response.json(record);
				}
			});
			
			
			
        });
		
		self.app.get("/RetireveGame/:name", function(request, response){
		console.log("hey I am retrieve");
		var name=request.params.name;
          //  console.log(request.body);
			//console.log(name);
			db.Favourite.find({ user: name }, function(err, record){
				if(err){
					console.log(err);
				}
				else{
					response.json(record);
				}
			});
			
			
			
        });
		
		
		self.app.delete("/DeletegameList/:_id", function (req, res) {
    var id = req.params._id;
    console.log(id);
    db.Favourite.remove({ _id: mongojs.ObjectId(id) }, function (err, doc) {
        res.json(doc);
    });

});
		
		
		
		self.app.get("/RetriveAll", function(request, response){
				//console.log(request.body);
{db.Favourite.find(function(err,data)
	{response.json(data);

	});

	}});
		
		
		
		self.app.post("/validateLogin", function(request, response){
            console.log(request.body);
			db.login.find({username:request.body.username,password:request.body.password}, function(err, record){
				if(err){
					console.log("User name and password doesn't match");
				}
				else{
					response.json(record);
				}
			});
			
        });
		self.app.post("/getreviews", function(request, response){
            console.log(request.body);
			db.login.find({username:request.body.username,password:request.body.password}, function(err, record){
				if(err){
					console.log("User name and password doesn't match");
				}
				else{
					response.json(record);
				}
			});
			
        });

    };

};   /*  Sample Application.  */



/**
 *  main():  Main code.
 */
var zapp = new SampleApp();
zapp.initialize();
zapp.start();

