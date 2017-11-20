import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


let router = new VueRouter({
    mode: 'history', //History HTML 5 API
    routes: [
      {
        path: '/vuejs-getRestaurants/restau',
        component: require('../../components/Restaurants.vue'),
        name: 'pageList'
      },
	  {
        path: '/vuejs-getRestaurants/restau/?msg=ajout',
        component: require('../../components/Restaurants.vue'),
        name: 'pageList?ajout'
      },
      {
        path: '/vuejs-getRestaurants/restau/restau1',
        component: require('../../components/Restaurant.vue'),
        name: 'pageRestaurant'
      },
	     {
        path: '/vuejs-getRestaurants/restau/restauEdit',
        component: require('../../components/RestaurantEdit.vue'),
        name: 'pageRestaurantEdit'
      },
	  {
        path: '/vuejs-getRestaurants/restau/?msg=modification',
        component: require('../../components/RestaurantEdit.vue'),
        name: 'pageList?modification'
      },
      {
        path: '/vuejs-getRestaurants/createRestaurant/:id',
        component: r => require.ensure([], () => r(require('../../components/Restaurant.vue'))),
        name: 'pageCreate',
        props: true,
        beforeEnter: (to, from, next) => {
          console.log('>>> (beforeEnter) route pageCreate')
          next()
        }
      },
      {
        path: '*', //si on utilise une route qui n'est pas mappée, on est redirigée vers /
        redirect: '/vuejs-getRestaurants/restau'
      }

    ]
  }
)

router.beforeEach((to, from, next) => {
  console.log('>>> (beforeEach) Navigating from '+from.path+' to '+to.path)
  next()
})

router.afterEach((to, from) => {
  console.log('>>> (afterEach) Navigating from '+from.path+' to '+to.path)
})

export default router
