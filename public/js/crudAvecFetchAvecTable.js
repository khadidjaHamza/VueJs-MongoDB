let page = 0;
var params = location.search.substring(1).split('&');
var param = params[0].split('=');
var loadIndex = function() {
		console.log("je suis d&ans le load")
		console.log(param)
	if(param.length > 1) {
	
		if(param[0] == "p") {
			getRequest1();
		}
			
		if(param[0] == "msg") {
			var msg = '<div class="alert alert-success" role="alert"><b><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> Ajout du restaurant réussi !</b></div>';
			
			if(param[1] == "modification") {
			
				msg = '<div class="alert alert-success" role="alert"><b><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> Modification du restaurant réussie !</b></div>';
			}
		   if(param[1] == "supprimer") {
			
				msg = '<div class="alert alert-success" role="alert"><b><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> Suppression du restaurant réussie !</b></div>';
			}
			document.querySelector("#info").innerHTML = msg;
			getRequest1();
		}
	}
}
function prevPage() {
    page--;
    if(page <= 0){
        document.querySelector("#btnPrev").style = "click:none;";
		document.querySelector("#btnPrev").style.color='#000'
		document.querySelector("#btnPrev").disabled = true; 
        page=0;
        getRequest2(0);
		console.log('aucune pas de page en arrier')
    }else {
        getRequest2(page);
    }
}

function nextPage() {
    page++;
    if(page > 0){
        document.querySelector("#btnNext").style = "";
		document.querySelector("#btnPrev").style = "";
    }
    getRequest2(page);
}

function getPage(nb){
    fetch('/api/getRestaurant?page='+nb).then(function(response) {
        response.json().then(res => afficheRestaurantsEnTable(res));
    }).catch(function (err) {
        console.log(err);
    })
}
// REQUETES GET getRequestNext
var pageNo = 1;
function getRequestNext() {
	console.log("on est dans le next"+pageNo);
	pageNo++;
	getRequest2(pageNo)
	
}
// REQUETES getRequestPrevious
function getRequestPrevious() {
	pageNo--;
	console.log("le num de la page"+pageNo)
	getRequest2(pageNo)
	    if(pageNo <= 0){
        document.querySelector("#btnPrev").style = "display:none;";
        pageNo=0;
        getRequest2(0);
    }else {
        getRequest2(pageNo);
    }
}
// REQUETES GET suivant
function getRequest1() {
	let url = "/api/getRestaurant";

	fetch(url)
		.then(function(responseJSON) {
        	responseJSON.json()
        	.then(function(res) {
        		// Maintenant res est un vrai objet JavaScript
        		afficheReponseGET(res);
        	});
    	})
    	.catch(function (err) {
        	console.log(err);
    });
}
function getRequest2(i) {
	
    let url = "/api/getRestaurant?page="+i;

    fetch(url)
        .then(function(responseJSON) {
            responseJSON.json()
            .then(function(res) {
                // Maintenant res est un vrai objet JavaScript
                afficheReponseGET(res);
            });
        })
        .catch(function (err) {
            console.log(err);
    });
}

function getRequest3() {
    let url = "/api/restaurants?page=2&pagesize=20";

    fetch(url)
        .then(function(responseJSON) {
            responseJSON.json()
            .then(function(res) {
                // Maintenant res est un vrai objet JavaScript
                afficheReponseGET(res);
            });
        })
        .catch(function (err) {
            console.log(err);
    });
}

function getRequest4() {

	document.querySelector('form').setAttribute("onsubmit", "updRestaurant(this)");
    document.querySelector('input[name="restaurant_id"]').setAttribute("readonly", "");
		//let url = "/api/getRestaurant?id="+param[1];
		let url = "/api/restaurants/" +param[1];
		console.log("test==="+url);
      fetch(url)
        .then(function(responseJSON) {
            responseJSON.json()
            .then(function(res) {
            document.querySelector('input[name="restaurant_id"]').setAttribute("value", res.data[0].restaurant_id);
			document.querySelector('input[name="name"]').setAttribute("value", res.data[0].name);
			document.querySelector('input[name="cuisine"]').setAttribute("value", res.data[0].cuisine);
            });
        })
        .catch(function (err) {
            console.log(err);
    });  
	
/* 		if(param.length > 1 && param[0] == "id" && param[1] != "") {
		document.querySelector('form').setAttribute("onsubmit", "updRestaurant(this)");
		document.querySelector('input[name="restaurant_id"]').setAttribute("readonly", "");
		
		 ajaxRequest('GET', 'api/getRestaurant/'+param[1], null, function(res) {
			document.querySelector('input[name="restaurant_id"]').setAttribute("value", res.data[0].restaurant_id);
			document.querySelector('input[name="name"]').setAttribute("value", res.data[0].name);
			document.querySelector('input[name="cuisine"]').setAttribute("value", res.data[0].cuisine);
		 });
		} */ 
}


// REQUETES POST
function postRequest() {
	
    let form = new FormData(document.getElementById('formCreate'));
    fetch("/api/createRestaurant", {
        method: "POST",
        body: form
    }).then(res => {
        res.json().then(res => {
            if(res.succes){
				getViewRestaurant();
                //alert("Succès de la création !");
            }
            else{
                console.log("ERROR");
                console.log(res.error);
            }
        });
    }).catch(function (err) {
        console.log(err);
    });

    document.querySelector("#restoNameC").value = "";
    document.querySelector("#restoTypeC").value = "";
}
var getViewRestaurant = function() {
	if(param.length > 1 && param[0] == "id" && param[1] != "") {		
		ajaxRequest('GET', 'api/getRestaurant/'+param[1]+'/1', null, function(res) {			
			document.querySelector('#view_restaurant').innerHTML = '<div class="panel panel-primary"><div class="panel-heading"><h3 class="panel-title">Informations du restaurant</h3></div>'
			+forEach(res.data[0])+'</div>';
		});
	}
};
var addRestaurant = function(form) {
	var formData = new FormData(form);
	    fetch("/api/createRestaurant", {
        method: "POST",
        body: form
    }).then(res => {
        res.json().then(res => {
            if(res.succes){
			location.href = res.redirect;
            }
            else{
                console.log("ERROR");
                console.log(res.error);
            }
        });
    }).catch(function (err) {
        console.log(err);
    });
}

var editRestaurant = function(form) {
	var formData = new FormData(form);
	console.log('le edit'+form.id)
	let id = form._id.value; // on peut aller chercher la valeur
                             // d'un champs d'un formulaire
                             // comme cela, si on connait le nom
                             // du champ (valeur de son attribut name)
    let url = "/api/restaurants/" + id;
	    fetch(URL, {
        method: "put",
        body: formData
    }).then(res => {
        res.json().then(res => {
            if(res.succes){
			location.href = res.redirect;
            }
            else{
                console.log("ERROR");
                console.log(res.error);
            }
        });
    }).catch(function (err) {
        console.log(err);
    });
}
// REQUETES PUT
function putRequest(event,id) {
    // Pour Ã©viter que la page ne se rÃ©-affiche
    event.preventDefault();

    // RÃ©cupÃ©ration du formulaire. Pas besoin de document.querySelector
    // ou document.getElementById puisque c'est le formulaire qui a gÃ©nÃ©rÃ©
    // l'Ã©vÃ©nement
    let form = event.target;
    // RÃ©cupÃ©ration des valeurs des champs du formulaire
    // en prÃ©vision d'un envoi multipart en ajax/fetch
    let donneesFormulaire = new FormData(event.target);

 

    let url = "/api/restaurants/" + id;

    fetch(url, {
        method: "PUT",
        body: donneesFormulaire
    })
    .then(function(responseJSON) {
        responseJSON.json()
            .then(function(res) {
                // Maintenant res est un vrai objet JavaScript
                afficheReponsePUT(res);
            });
        })
        .catch(function (err) {
            console.log(err);
    });
}

// REQUETES DELETE
function deleteRequest(event) {
    // Pour Ã©viter que la page ne se rÃ©-affiche
    event.preventDefault();

    // RÃ©cupÃ©ration du formulaire. Pas besoin de document.querySelector
    // ou document.getElementById puisque c'est le formulaire qui a gÃ©nÃ©rÃ©
    // l'Ã©vÃ©nement
    let form = event.target;
 
    let id = form._id.value; // on peut aller chercher la valeur
                             // d'un champs d'un formulaire
                             // comme cela, si on connait le nom
                             // du champ (valeur de son attribut name)

    envoieRequeteFetchDelete(id);
}

function envoieRequeteFetchDelete(id) {
    let url = "/api/restaurants/" + id;
 		//var formData = new FormData(form);
	    fetch(url, {
        method: "DELETE",
       // body: form
    }).then(res => {
        res.json().then(res => {
            if(res.succes){
			location.href = res.redirect;
            }
            else{
                console.log("ERROR");
                console.log(res.error);
            }
        });
    }).catch(function (err) {
        console.log(err);
    }); 
}
//-------------------------------
// Affichage d'une rÃ©ponse JSON
function afficheReponseGET(reponse) {
      // Dans reponse.data j'ai les restaurants
    afficheRestaurantsEnTable(reponse.data);
}

function afficheReponsePOST(reponse) {
    let div = document.querySelector("#reponsePOST");
    div.innerHTML = reponse.msg;
}

function afficheReponsePUT(reponse) {
    let div = document.querySelector("#reponsePUT");
    div.innerHTML = reponse.msg;

    // On affiche le tableau Ã  jour
    getRequest1();
}

function afficheReponseDELETE(reponse) {
    let div = document.querySelector("#reponseDELETE");
    div.innerHTML = reponse.msg;
}

//------------ ici fonction pour creer tableau
function afficheRestaurantsEnTable(restaurants) {
    console.log("creer tableau");
    // On cree un tableau
	var html = '<table class="table table-hover">';
	let table = document.querySelector('tbody');
	table.innerHTML = "";
		
    // Je cree une ligne
    for(var i=0; i < restaurants.length; i++) {
        let ligne = table.insertRow();
        ligne.id = "restaurant" + i;

        let restaurant = restaurants[i];
        let nom = restaurant.name;
        let cuisine = restaurant.cuisine;

        let celluleNom = ligne.insertCell();
        celluleNom.innerHTML = nom;
        celluleNom.id = "restaurant" + i + "Nom" ;
 
        let celluleCuisine = ligne.insertCell();
        celluleCuisine.innerHTML = cuisine;
        celluleCuisine.id = "restaurant" + i + "Cuisine" ;

        let celluleRemove = ligne.insertCell();

	   celluleRemove.innerHTML = '<td class="text-center col-sm-1"><button id=' + restaurant._id + ' class="btn btn-danger" onclick="supprimerRestaurant(event);" ><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></td>';

        let celluleModifier = ligne.insertCell();
		//celluleModifier.innerHTML = '<button id=' + restaurant._id + ' onclick="modifierRestaurant(' + i + ');">Modifier</button></td>'; 
		celluleModifier.innerHTML = "<td class='text-center col-sm-1'><a class='btn btn-warning' href='view_restaurant.html?id="+restaurant._id+"'><span class='glyphicon glyphicon-pencil' aria-hidden='true'></span></a></td>";
    }


    // on ajoute le tableau au div
	
}

function supprimerRestaurant(event) {
    var id = event.target.id;

    envoieRequeteFetchDelete(id)

    // On affiche le tableau Ã  jour
    getRequest1();
}

function modifierRestaurant(noLigne) {
    let id = event.target.id;

   
	//putRequest(event,id);
    let nom = document.querySelector("#restaurant" + noLigne + "Nom").textContent;
    let cuisine = document.querySelector("#restaurant" + noLigne + "Cuisine").textContent;

    console.log("modifier Restaurant id=" + id + "avec nom="+nom + " cusine= "+ cuisine);

    // On remplit le formulaire
    let form = document.querySelector("#formulaireModification");
    form.nom.value = nom;
    form.cuisine.value = cuisine;
    form._id.value = id; 


}

// donnees de test
var donneeServeur = {
    "msg":"restaurant recherchÃ©s avec succÃ¨s",
    "data":[
        {
            "_id":"56b9f89be0adc7f00f348d02",
            "address":{
                "building":"103-05",
                "coord":[-73.8642349,40.75356],
                "street":"37 Avenue",
                "zipcode":"11368"
            },
            "borough":"Queens",
            "cuisine":"Chinese",
            "grades":[  
                {
                    "date":"2014-04-21T00:00:00.000Z",
                    "grade":"A",
                    "score":10
                },
                {
                    "date":"2013-11-12T00:00:00.000Z",
                    "grade":"A","score":5
                },{"date":"2013-06-04T00:00:00.000Z","grade":"A","score":12},{"date":"2012-11-14T00:00:00.000Z","grade":"A","score":10},{"date":"2012-10-11T00:00:00.000Z","grade":"P","score":0},{"date":"2012-05-24T00:00:00.000Z","grade":"A","score":13},{"date":"2011-12-08T00:00:00.000Z","grade":"A","score":12},{"date":"2011-07-20T00:00:00.000Z","grade":"A","score":11}],"name":"Ho Mei Restaurant","restaurant_id":"40362432"},{"_id":"56b9f89be0adc7f00f348d03","address":{"building":"56","coord":[-73.991495,40.692273],"street":"Court Street","zipcode":"11201"},"borough":"Brooklyn","cuisine":"Donuts","grades":[{"date":"2014-12-30T00:00:00.000Z","grade":"A","score":8},{"date":"2014-01-15T00:00:00.000Z","grade":"A","score":9},{"date":"2013-01-08T00:00:00.000Z","grade":"A","score":11},{"date":"2012-01-19T00:00:00.000Z","grade":"A","score":10}],"name":"Dunkin' Donuts","restaurant_id":"40363098"},{"_id":"56b9f89be0adc7f00f348d04","address":{"building":"60","coord":[-74.0085357,40.70620539999999],"street":"Wall Street","zipcode":"10005"},"borough":"Manhattan","cuisine":"Turkish","grades":[{"date":"2014-09-26T00:00:00.000Z","grade":"A","score":9},{"date":"2013-09-18T00:00:00.000Z","grade":"A","score":13},{"date":"2012-09-21T00:00:00.000Z","grade":"A","score":9},{"date":"2012-05-09T00:00:00.000Z","grade":"A","score":11}],"name":"The Country Cafe","restaurant_id":"40362715"},{"_id":"56b9f89be0adc7f00f348d05","address":{"building":"7905","coord":[-73.8740217,40.7135015],"street":"Metropolitan Avenue","zipcode":"11379"},"borough":"Queens","cuisine":"Bagels/Pretzels","grades":[{"date":"2014-09-17T00:00:00.000Z","grade":"A","score":10},{"date":"2014-01-16T00:00:00.000Z","grade":"B","score":23},{"date":"2013-08-07T00:00:00.000Z","grade":"A","score":10},{"date":"2013-02-21T00:00:00.000Z","grade":"B","score":27},{"date":"2012-06-20T00:00:00.000Z","grade":"B","score":27},{"date":"2012-01-31T00:00:00.000Z","grade":"B","score":18}],"name":"Hot Bagels","restaurant_id":"40363565"},{"_id":"56b9f89be0adc7f00f348d06","address":{"building":"195","coord":[-73.9246028,40.6522396],"street":"East 56 Street","zipcode":"11203"},"borough":"Brooklyn","cuisine":"Caribbean","grades":[{"date":"2014-05-13T00:00:00.000Z","grade":"A","score":2},{"date":"2013-05-08T00:00:00.000Z","grade":"A","score":7},{"date":"2012-09-22T00:00:00.000Z","grade":"A","score":11},{"date":"2011-06-06T00:00:00.000Z","grade":"A","score":12}],"name":"Shashemene Int'L Restaura","restaurant_id":"40362869"},{"_id":"56b9f89be0adc7f00f348d07","address":{"building":"87-69","coord":[-73.8309503,40.7001121],"street":"Lefferts Boulevard","zipcode":"11418"},"borough":"Queens","cuisine":"American ","grades":[{"date":"2014-02-25T00:00:00.000Z","grade":"A","score":7},{"date":"2013-08-14T00:00:00.000Z","grade":"A","score":11},{"date":"2012-08-07T00:00:00.000Z","grade":"A","score":7},{"date":"2012-03-26T00:00:00.000Z","grade":"A","score":10},{"date":"2011-11-04T00:00:00.000Z","grade":"A","score":0},{"date":"2011-06-29T00:00:00.000Z","grade":"A","score":4}],"name":"Snack Time Grill","restaurant_id":"40363590"},{"_id":"56b9f89be0adc7f00f348d08","address":{"building":"1418","coord":[-73.95685019999999,40.7753401],"street":"Third Avenue","zipcode":"10028"},"borough":"Manhattan","cuisine":"Continental","grades":[{"date":"2014-06-02T00:00:00.000Z","grade":"A","score":9},{"date":"2013-12-27T00:00:00.000Z","grade":"A","score":8},{"date":"2013-03-18T00:00:00.000Z","grade":"B","score":26},{"date":"2012-02-01T00:00:00.000Z","grade":"A","score":7},{"date":"2011-07-06T00:00:00.000Z","grade":"B","score":25}],"name":"Lorenzo & Maria'S","restaurant_id":"40363630"},{"_id":"56b9f89be0adc7f00f348d09","address":{"building":"1031","coord":[-73.9075537,40.6438684],"street":"East 92 Street","zipcode":"11236"},"borough":"Brooklyn","cuisine":"American ","grades":[{"date":"2014-02-05T00:00:00.000Z","grade":"A","score":0},{"date":"2013-01-29T00:00:00.000Z","grade":"A","score":3},{"date":"2011-12-08T00:00:00.000Z","grade":"A","score":10}],"name":"Sonny'S Heros","restaurant_id":"40363744"},{"_id":"56b9f89be0adc7f00f348d0a","address":{"building":"405","coord":[-73.97534999999999,40.7516269],"street":"Lexington Avenue","zipcode":"10174"},"borough":"Manhattan","cuisine":"Sandwiches/Salads/Mixed Buffet","grades":[{"date":"2014-02-21T00:00:00.000Z","grade":"A","score":3},{"date":"2013-09-13T00:00:00.000Z","grade":"A","score":3},{"date":"2012-08-28T00:00:00.000Z","grade":"A","score":0},{"date":"2011-09-13T00:00:00.000Z","grade":"A","score":12},{"date":"2011-05-03T00:00:00.000Z","grade":"A","score":5}],"name":"Lexler Deli","restaurant_id":"40363426"},{"_id":"56b9f89be0adc7f00f348d0b","address":{"building":"148","coord":[-73.9806854,40.7778589],"street":"West 72 Street","zipcode":"10023"},"borough":"Manhattan","cuisine":"Pizza","grades":[{"date":"2014-12-08T00:00:00.000Z","grade":"A","score":13},{"date":"2014-05-05T00:00:00.000Z","grade":"B","score":18},{"date":"2013-04-05T00:00:00.000Z","grade":"A","score":13},{"date":"2012-03-30T00:00:00.000Z","grade":"A","score":9}],"name":"Domino'S Pizza","restaurant_id":"40363945"}]}


	/**** SORT ARRAY ****/

function SortArrayByName(){
	  // On cree un tableau
	let table = document.getElementById("table");
}
  function twInitTableau() {
    // Initialise chaque tableau de classe « avectri »
       [].forEach.call( document.getElementsByClassName("avectri"), function(oTableau) {
       var oEntete = oTableau.getElementsByTagName("tr")[0];
       var nI = 1;
  	  // Ajoute à chaque entête (th) la capture du clic
  	  // Un picto flèche, et deux variable data-*
  	  // - Le sens du tri (0 ou 1)
  	  // - Le numéro de la colonne
      [].forEach.call( oEntete.querySelectorAll("th"), function(oTh) {
        oTh.addEventListener("click", twTriTableau, false);
        oTh.setAttribute("data-pos", nI);
        if(oTh.getAttribute("data-tri")=="1") {
         oTh.innerHTML += "<span class=\"flecheDesc\"></span>";
        } else {
          oTh.setAttribute("data-tri", "0");
          oTh.innerHTML += "<span class=\"flecheAsc\"></span>";
        }
        // Tri par défaut
        if (oTh.className=="selection") {
          oTh.click();
        }
        nI++;
      });
    });
  }
  
  function twInit() {
    twInitTableau();
  }
  function twPret(maFonction) {
    if (document.readyState != "loading"){
      maFonction();
    } else {
      document.addEventListener("DOMContentLoaded", maFonction);
    }
  }
  twPret(twInit);
  function twTriTableau() {
    // Ajuste le tri
    var nBoolDir = this.getAttribute("data-tri");
    this.setAttribute("data-tri", (nBoolDir=="0") ? "1" : "0");
    // Supprime la classe « selection » de chaque colonne.
    [].forEach.call( this.parentNode.querySelectorAll("th"), function(oTh) {oTh.classList.remove("selection");});
    // Ajoute la classe « selection » à la colonne cliquée.
    this.className = "selection";
    // Ajuste la flèche
    this.querySelector("span").className = (nBoolDir=="0") ? "flecheAsc" : "flecheDesc";

    // Construit la matrice
    // Récupère le tableau (tbody)
    var oTbody = this.parentNode.parentNode.parentNode.getElementsByTagName("tbody")[0]; 
    var oLigne = oTbody.rows;
    var nNbrLigne = oLigne.length;
    var aColonne = new Array(), i, j, oCel;
    for(i = 0; i < nNbrLigne; i++) {
      oCel = oLigne[i].cells;
      aColonne[i] = new Array();
      for(j = 0; j < oCel.length; j++){
        aColonne[i][j] = oCel[j].innerHTML;
      }
    }

    // Trier la matrice (array)
    // Récupère le numéro de la colonne
    var nIndex = this.getAttribute("data-pos");
    // Récupère le type de tri (numérique ou par défaut « local »)
    var sFonctionTri = (this.getAttribute("data-type")=="num") ? "compareNombres" : "compareLocale";
    // Tri
    aColonne.sort(eval(sFonctionTri));
    // Tri numérique
    function compareNombres(a, b) {return a[nIndex-1] - b[nIndex-1];}
    // Tri local (pour support utf-8)
    function compareLocale(a, b) {return a[nIndex-1].localeCompare(b[nIndex-1]);}
    // Renverse la matrice dans le cas d’un tri descendant
    if (nBoolDir==0) aColonne.reverse();
    
    // Construit les colonne du nouveau tableau
    for(i = 0; i < nNbrLigne; i++){
      aColonne[i] = "<td>"+aColonne[i].join("</td><td>")+"</td>";
    }

    // assigne les lignes au tableau
    oTbody.innerHTML = "<tr>"+aColonne.join("</tr><tr>")+"</tr>";
  }
var ajaxRequest = function(type, url, params, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open(type, url, true);
	xhr.responseType = 'json';

	xhr.send(params);
	xhr.onload = function() {
		callback(this.response);
	};
};

var forEach = function(obj) {
	var html = '<div class="panel panel-body">';
	for(var k in obj) {
		if(obj.hasOwnProperty(k) && typeof obj[k] !== 'object') {
			html += "<b>"+k+":</b> "+obj[k]+'<br>';
		}
	}

	for(var k in obj) {
		if(typeof obj[k] === 'object') {
			html += '<div class="panel panel-primary"><div class="panel-heading"><h3 class="panel-title">'+k+'</h3></div>';
			html += forEach(obj[k]);
		}
	}
	
	html += "</div></div>";
	
	return html;
};


