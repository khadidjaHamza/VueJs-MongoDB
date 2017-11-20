<template>
	<div>

		
		<form method="post" action="javascript:;" @submit="addRestaurant(this)">
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
			<router-link :to="{ name: 'pageList?ajout'}">
				<button type="submit" class="btn btn-primary col-xs-12">Enregister</button>
		   </router-link>
		    <h1>name restau == {{name}} cuisine == {{cuisine}}, dont id {{_id}} !!!!</h1>
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
	   
	addRestaurant(form) {
	var formData = new FormData(form);
		let url = "/api/createRestaurant";
        let newRestaurant = {
			name: this.restaurant.name,
			cuisine: this.restaurant.cuisine,
			_id: this.restaurant._id
		}
		axios.post(url).then((response)=>{
			
			console.log(response.data);
		})
		  .catch((error)=>{
			  console.log(error);
		  })
	}
  },

    mounted() {
	 this.name = this.$route.query.name
     this.cuisine = this.$route.query.cuisine
	 this._id = this.$route.query.id
    },
	
  }
</script>


