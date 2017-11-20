<template>
  <div >
    <router-link to="/">
		<button class="btn btn-default btn-success navbar navbar-link navbar-left">Accueil </button>
    </router-link>
	<router-link :to="{ name: 'pageRestaurant'}">
		<button class="btn btn-default btn-success navbar navbar-link navbar-right" @click="redirect()">Ajouter Restaurant </button>
    </router-link>
		<button class="btn btn-default btn-success btn-right navbar navbar-link " @click="getRequest1()">Voir les restaurant </button>
		<div class="container-fluid">
		<h id="info"></h>
		</div>
   <h1>Liste des restaurants</h1>
   <div class="container">
	<table id="table" class="table table-striped table-borderes">
		<thead>
			<tr>
				<th @click="SortArrayByName()">Name</th>
				<th @click="SortArrayByName()">Cuisine</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="restaurant in restaurants">
				<td>{{restaurant.name}}</td>
				<td>{{restaurant.cuisine}}</td>
				<td class="text-center col-sm-1">
					<button id=restaurant._id class="btn btn-danger" @click="removeRestaurants(restaurant._id);" >
						<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
					</button>
				</td>
				<td class='text-center col-sm-1'>
				<router-link :to="{ name: 'pageRestaurantEdit' ,params: {id: restaurant._id,name: restaurant.name,cuisine:restaurant.cuisine},query:{id: restaurant._id,name: restaurant.name,cuisine:restaurant.cuisine}}">
					<a class='btn btn-warning'>
						<span class='glyphicon glyphicon-pencil' aria-hidden='true'>
						</span>
					</a>
				</router-link>
				</td>
			</tr>
		</tbody>
	</table>
  </div>       
                <nav class="container" >
					
						<div class="navbar-header navbar-left">
						    <button id="btnPrev" @click="prevPage()" class="btn btn-default btn-primary">Previous </button>
						</div>
						<ul class="nav navbar-nav navbar-right"/>
						    <button id="btnNext"@click="nextPage()" class="btn btn-default btn-primary ">Next </button>
					
				</nav>
    
	
  </div>

</template>


<script>
  import Vue from 'vue'
  import VueResource from 'vue-resource'
  Vue.use(VueResource)
  import axios from 'axios'
	let page = 0;
	var params = location.search.substring(1).split('&');
	var param = params[0].split('=');
  export default{

    data () {
      return {
		  restaurants: []
      }
    },
     http: {
      root: 'mongodb://localhost:27017/test'
    },
	props:["page","lastname","age"],
   methods: {
    prevPage() {
		page--;
		if(page <= 0){
			document.querySelector("#btnPrev").style = "click:none;";
			document.querySelector("#btnPrev").style.color='#000'
			document.querySelector("#btnPrev").disabled = true; 
			this.page=0;
			this.getRequest2(0);
			console.log('aucune pas de page en arrier')
		}else {
			this.getRequest2(page);
		}
	},

    nextPage() {
		
		page++;
		if(page > 0 && page < 50){
			document.querySelector("#btnNext").style = "";
			document.querySelector("#btnPrev").style.color='#fff'
			document.querySelector("#btnPrev").disabled = false;
			this.getRequest2(page);
		}
		if(page > 50){
			document.querySelector("#btnNext").style = "click:none;";
			document.querySelector("#btnNext").style.color='#000'
			document.querySelector("#btnNext").disabled = true; 
		}
		
		
	},
	getRequest2(i) {
	 
		//let url = "/api/getRestaurant?page="+i;
		
	    let url = "http://localhost:8080/api/getRestaurant?page="+i;
		
		fetch(url)
       .then(response => {
		  // console.log("klhjkhlk==<"+response.json());
         return response.json();
       })
       .then(data => {
           let restaurant = data.data[1];
             let nom = data.name;
             let cuisine = data.cuisine; 
			console.log(restaurant);
			this.restaurants = data.data;
        // this.todos = data;
       }).catch(err => {
         console.log("erreur dans le get : " + err)
       });
	},

	// REQUETES GET suivant
    getRequest1() {
			let url = "http://localhost:8080/api/getRestaurant";
		
		fetch(url)
       .then(response => {
         return response.json();
       })
       .then(data => {
           let restaurant = data.data[1];
             let nom = data.name;
             let cuisine = data.cuisine; 
			console.log(restaurant);
			this.restaurants = data.data;
        // this.todos = data;
       }).catch(err => {
         console.log("erreur dans le get : " + err)
       });
	},
	redirect(){
	
		this.$router.push('Restau1') 
	},
	removeRestaurants(restaurant) {
      var id = restaurant;
      console.log("id remove==="+restaurant);
	     let url = "http://localhost:8080/api/restaurants/" + id;
	    fetch(url, {
        method: "DELETE",
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
	  //afficher le tableau mise a jour
      this.getRequest1();
    },
		
	/**** SORT ARRAY ****/

	SortArrayByName(){
		  // On cree un tableau
		let table = document.getElementById("table");
		this.twPret(this.twInit);
		
	},
	twInitTableau() {
    // Initialise chaque tableau de classe « avectri »
       [].forEach.call( document.getElementsByClassName("avectri"), function(oTableau) {
		 
		   var oEntete = oTableau.getElementsByTagName("tr")[0];
		   var nI = 1;
		  // Ajoute à chaque entête (th) la capture du clic
		  // Un picto flèche, et deux variable data-*
		  // - Le sens du tri (0 ou 1)
		  // - Le numéro de la colonne
		  [].forEach.call( oEntete.querySelectorAll("th"), function(oTh) {
			//***********************oTh.addEventListener("click", twTriTableau, false);
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
    },
	twInit() {
		this.twInitTableau();
    },
    twPret(maFonction) {
		if (document.readyState != "loading"){
		  maFonction();
		} else {
		  document.addEventListener("DOMContentLoaded", maFonction);
		}
    },
	
	   twTriTableau() {
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
	},
	 computed:{
        counter(){
          return this.restaurants.length
        }
    },
	loadIndex () {
		console.log("je suis d&ans le load")
		console.log(param)
	if(param.length > 1) {
	
		if(param[0] == "p") {
			getRequest1();
		}
			
		if(param[1] == "ajout") {
			var msg = '<div class="alert alert-success" role="alert"><b><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> Ajout du restaurant réussi !</b></div>';
		
		}
			if(param[1] == "modification") {
			
				var msg = '<div class="alert alert-success" role="alert"><b><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> Modification du restaurant réussie !</b></div>';
			}
		   if(param[1] == "supprime") {
			
				msg = '<div class="alert alert-success" role="alert"><b><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> Suppression du restaurant réussie !</b></div>';
			}
			document.querySelector("#info").innerHTML = msg;
			this.getRequest1();
		
	}
}
	
  },

    mounted() {
	
	    this.loadIndex ();
	    this.getRequest1();

    },
	
  }
</script>


