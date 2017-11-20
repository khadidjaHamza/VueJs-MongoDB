// REQUETES GET
function getRequest1() {
	let url = "/api/restaurants";

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

function getRequest2() {
    let url = "/api/restaurants?page=2";

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
    let url = "/api/restaurants/56b9f89be0adc7f00f348cf6";

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

// REQUETES POST
function postRequest(event) {
    // Pour éviter que la page ne se ré-affiche
    event.preventDefault();

    // Récupération du formulaire. Pas besoin de document.querySelector
    // ou document.getElementById puisque c'est le formulaire qui a généré
    // l'événement
    let form = event.target;
    // Récupération des valeurs des champs du formulaire
    // en prévision d'un envoi multipart en ajax/fetch
    let donneesFormulaire = new FormData(event.target);

    let url = "/api/restaurants";

    fetch(url, {
        method: "POST",
        body: donneesFormulaire
    })
    .then(function(responseJSON) {
        responseJSON.json()
            .then(function(res) {
                // Maintenant res est un vrai objet JavaScript
                afficheReponsePOST(res);
            });
        })
        .catch(function (err) {
            console.log(err);
    });
}

// REQUETES PUT
function putRequest(event) {
    // Pour éviter que la page ne se ré-affiche
    event.preventDefault();

    // Récupération du formulaire. Pas besoin de document.querySelector
    // ou document.getElementById puisque c'est le formulaire qui a généré
    // l'événement
    let form = event.target;
    // Récupération des valeurs des champs du formulaire
    // en prévision d'un envoi multipart en ajax/fetch
    let donneesFormulaire = new FormData(event.target);

    let id = form._id.value; // on peut aller chercher la valeur
                             // d'un champs d'un formulaire
                             // comme cela, si on connait le nom
                             // du champ (valeur de son attribut name)

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
    // Pour éviter que la page ne se ré-affiche
    event.preventDefault();

    // Récupération du formulaire. Pas besoin de document.querySelector
    // ou document.getElementById puisque c'est le formulaire qui a généré
    // l'événement
    let form = event.target;
    // Récupération des valeurs des champs du formulaire
    // en prévision d'un envoi multipart en ajax/fetch
    let donneesFormulaire = new FormData(event.target);

    let id = form._id.value; // on peut aller chercher la valeur
                             // d'un champs d'un formulaire
                             // comme cela, si on connait le nom
                             // du champ (valeur de son attribut name)

    let url = "/api/restaurants/" + id;

    fetch(url, {
        method: "DELETE",
        body: donneesFormulaire
    })
    .then(function(responseJSON) {
        responseJSON.json()
            .then(function(res) {
                // Maintenant res est un vrai objet JavaScript
                afficheReponseDELETE(res);
            });
        })
        .catch(function (err) {
            console.log(err);
    });
}
//-------------------------------
// Affichage d'une réponse JSON
function afficheReponseGET(reponse) {
    let div = document.querySelector("#reponseGET");
    div.innerHTML = reponse.msg;
}

function afficheReponsePOST(reponse) {
    let div = document.querySelector("#reponsePOST");
    div.innerHTML = reponse.msg;
}

function afficheReponsePUT(reponse) {
    let div = document.querySelector("#reponsePUT");
    div.innerHTML = reponse.msg;
}

function afficheReponseDELETE(reponse) {
    let div = document.querySelector("#reponseDELETE");
    div.innerHTML = reponse.msg;
}