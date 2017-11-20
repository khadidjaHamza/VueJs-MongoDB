<template>
	<div>

		
		<form method="put" action="javascript:;" @submit="editRestaurant(this)">
			<div class="col-sm-5">
			<div class="form-group">
				<label class="pull-left">ID*</label>
				<input type="text" class="form-control" id="restaurant_id" name="restaurant_id" placeholder="restaurant_id" v-model="_id" required>
		    </div>
				<div class="form-group">
					<label class="pull-left">Cuisine*</label>
					<input type="text" class="form-control" id="cuisine" name="cuisine" placeholder="cuisine" v-model="cuisine" required>
				</div>
					<div class="form-group">
					<label class="pull-left">Name*</label>
					<input type="text" class="form-control" id="name" name="name" placeholder="name" v-model="name" required>
				</div>
			</div>
			<div class="col-sm-offset-4 col-sm-4">
			<router-link :to="{ name: 'pageList?modification'}">
				<button  class="btn btn-primary col-xs-12" @click="editRestaurant(this,_id,name,cuisine)">Enregister</button>
			</router-link>
				<p>(*) Champs obligatoires.</p>
			</div>
			<div>
			
			</div>
							
		</form>
	</div>

</template>


<script>
  import Vue from 'vue'
  import VueResource from 'vue-resource'
  Vue.use(VueResource)
  import axios from 'axios'
	let page = 0;
	
  export default{

    data () {
      return {
		  restaurant: {name:'',cuisine:'',_id:''},
		  name:'',
		  cuisine:'',
		  _id:''
      }
    },
     http: {
      root: 'mongodb://localhost:27017/test'
    },
   methods: {

	editRestaurant (form) {
	var formData = new FormData(form);

	let id = form.id; // on peut aller chercher la valeur
                             // d'un champs d'un formulaire
                             // comme cela, si on connait le nom
                             // du champ (valeur de son attribut name)
      let url = "http://localhost:8080/api/restaurants/" + id;
/* 		    fetch(url, {
			method: "put",
			body: formData
    }).then(res => {console.log('le edit'+name)
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
    }); */
	},
  },


    mounted() {
	 this.name = this.$route.query.name
     this.cuisine = this.$route.query.cuisine
	 this._id = this.$route.query.id
    },
	
  }
</script>


