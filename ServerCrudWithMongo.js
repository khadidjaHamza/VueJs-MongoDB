const express  = require('express');
const app      = express();
const port     = process.env.PORT || 8080;
const server   = require('http').Server(app);
// pour les formulaires multiparts
var multer = require('multer');
var multerData = multer();
const formidable = require('formidable');
const mongoDBModule = require('./app_modules/crud-mongo');

// Pour les formulaires standards
const bodyParser = require('body-parser');
// pour les formulaires multiparts
var multer = require('multer');
var multerData = multer();

// Cette ligne indique le rÃ©pertoire qui contient
// les fichiers statiques: html, css, js, images etc.
app.use(express.static(__dirname + '/public'));
// ParamÃ¨tres standards du modyle bodyParser
// qui sert Ã  rÃ©cupÃ©rer des paramÃ¨tres reÃ§us
// par ex, par l'envoi d'un formulaire "standard"
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Lance le serveur avec express
server.listen(port);

console.log("Serveur lancÃ© sur le port : " + port);
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8083');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
 console.log("testtttt");
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
//------------------
// ROUTES
//------------------
// Utile pour indiquer la home page, dans le cas
// ou il ne s'agit pas de public/index.html
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/view_restaurant.html/:id', function(req, res) {
	res.sendFile(__dirname + "/" + "/public/view_restaurant.html");
})
app.get('/restaurant.html', function(req, res) {
	res.sendFile(__dirname + "/" + "/public/restaurant.html");
})

// Ici des routes en :
// http GET (pour rÃ©cupÃ©rer des donnÃ©es)
// http POST : pour insÃ©rer des donnÃ©es
// http PUT pour modifier des donnÃ©es
// http DELETE pour supprimer des donnÃ©es

//----------------------------------------------
// Ces routes forment l'API de l'application !!
//----------------------------------------------

// Test de la connexion Ã  la base
app.get('/api/connection', function(req, res) {
	// Pour le moment on simule, mais aprÃ¨s on devra
	// rÃ©ellement se connecte Ã  la base de donnÃ©es
	// et renvoyer une valeur pour dire si tout est ok
   mongoDBModule.connexionMongo(function(err, db) {
   	let reponse;

   	if(err) {
   		console.log("erreur connexion");
   		reponse = {
   			msg: "erreur de connexion err=" + err
   		}
   	} else {
   		reponse = {
   			msg: "connexion Ã©tablie"
   		}
   	}
   	res.send(JSON.stringify(reponse));

   });
});
// On va rÃ©cupÃ©rer des restaurants par un GET (standard REST) 
// cette fonction d'API peut accepter des paramÃ¨tres
// pagesize = nombre de restaurants par page
// page = no de la page
// Oui, on va faire de la pagination, pour afficher
// par exemple les restaurants 10 par 10
app.get('/api/getRestaurant', function(req, res) { 
	// Si prÃ©sent on prend la valeur du param, sinon 1
    let page = parseInt(req.query.page || 1);
    // idem si present on prend la valeur, sinon 10
    let pagesize = parseInt(req.query.pagesize || 10);

 	mongoDBModule.findRestaurants(page, pagesize, function(data) {
 		var objdData = {
 			msg:"restaurant recherchÃ©s avec succÃ¨s",
 			data: data
 		}
 		res.send(JSON.stringify(objdData)); 
 	});	
}); 

// RÃ©cupÃ©ration d'un seul restaurant par son id
/* app.get('/api/restaurants/:id', function(req, res) {
	var id = req.params.id;
    let page = parseInt(req.query.page || 1);
    // idem si present on prend la valeur, sinon 10
    let pagesize = parseInt(req.query.pagesize || 10);

 	mongoDBModule.findRestaurantById(id, function(data) {
 		var objdData = {
 			msg:"restaurant recherchÃ©s avec succÃ¨s",
 			data: data
 		}
 		res.send(JSON.stringify(objdData)); 
 	});	
 
}); */
app.get('/api/restaurants/:id', function(req, res) {
	var fields = {}
	
 	if(!req.params.v) {
		fields = {
					"restaurant_id": 1, 
					"name": 1, 
					"cuisine": 1, 
				};
	}
	mongoDBModule.connexionMongo(function(err, db) {
		 mongoDBModule.findRestaurant({"restaurant_id": req.params.id}, fields, {}, db, function(datas) {
			response = {
				data: datas,
			};console.log("kjhdljh====>"+datas);
			res.end(JSON.stringify(response));
			db.close();
		}); 
	}); 
})
// Creation d'un restaurant par envoi d'un formulaire
// On fera l'insert par un POST, c'est le standard REST
app.post('/api/createRestaurant', multerData.fields([]), function(req, res) {
   mongoDBModule.connexionMongo(function(err, db) {
        if(!err) {
            let form = new formidable.IncomingForm();
            form.parse(req, function (err, fields, files) {

                let toInsert = {name : fields.restoName, cuisine : fields.restoType};
                db.collection("restaurants").insertOne(toInsert, function(err, result) {
                    if(!err){
                        res.send(JSON.stringify({
                            succes : true,
                            error : null,
							redirect: "/?msg=ajout"
                        }));
                    }else{
                        res.send(JSON.stringify({
                            succes : false,
                            error : err
                        }));
                    }
                });
            });
        }
    });
});


// Modification d'un restaurant, on fera l'update par
// une requÃªte http PUT, c'est le standard REST
app.put('/api/restaurants/:id', multerData.fields([]), function(req, res) {
	var id = req.params.id;
    console.log("lid est "+id);
 	mongoDBModule.updateRestaurant(id, req.body, function(data) {
 		res.send(JSON.stringify(data)); 
 	});
});

// Suppression d'un restaurant
// On fera la suppression par une requÃªte http DELETE
// c'est le standard REST
app.delete('/api/restaurants/:id', function(req, res) {
	var id = req.params.id;

 	mongoDBModule.deleteRestaurant(id, function(data) {
 		     res.send(JSON.stringify({
                            succes : true,
							error : null,
							redirect: "/?msg=supprime"
                        }));
 	});
})
