// ICI c'est autorisé par la norme REST car
// "count" est un mot réservé, on ne risque pas de
// le prendre pour une TABLE ou une collection
// cf la partie "reserved words" de
// https://blog.octo.com/designer-une-api-rest/
app.get('/api/restaurants/count', function(req, res) { 
	// on renvoie le nombre de restaurants
 	mongoDBModule.countRestaurants(function(data) {
 		var objdData = {
 			msg:"Count effectué avec succès",
 			data: data
 		}
 		res.send(JSON.stringify(objdData)); 
 	});     	
});

// On va récupérer des restaurants par un GET (standard REST) 
// cette fonction d'API peut accepter des paramètres
// pagesize = nombre de restaurants par page
// page = no de la page
// Oui, on va faire de la pagination, pour afficher
// par exemple les restaurants 10 par 10
app.get('/api/restaurants', function(req, res) { 
	// Si présent on prend la valeur du param, sinon 1
    let page = parseInt(req.query.page || 0);
    // idem si present on prend la valeur, sinon 10
    let pagesize = parseInt(req.query.pagesize || 10);
    let nom = req.query.nom;

	if(nom) {
    	// find by name
	 	mongoDBModule.findRestaurantsByName(nom, page, pagesize, function(data) {
	 		var objdData = {
	 			msg:"restaurant recherchés par nom avec succès",
	 			data: data
	 		}
	 		res.send(JSON.stringify(objdData)); 
	 	}); 
    } else {
    	// find normal
	 	mongoDBModule.findRestaurants(page, pagesize, function(data) {
	 		var objdData = {
	 			msg:"restaurant recherchés avec succès",
	 			data: data
	 		}
	 		res.send(JSON.stringify(objdData)); 
	 	}); 

    }
});