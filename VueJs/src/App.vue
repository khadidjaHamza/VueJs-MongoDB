<template>
  <div id="app">
  <div>
	<router-view></router-view>
  </div
  <restaurant></restaurant>
  </div>
</template>

<script>
 
	import Restaurants from './components/Restaurants.vue'
	import Restaurant from './components/Restaurant.vue'
	
  export default {
    name: 'app',
    components: {
	   Restaurants,
    }
  }

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}


.componentItem{
  flex-grow: 1;

}


</style>

