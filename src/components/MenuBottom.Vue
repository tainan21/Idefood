<template class="" >
	<div id=""> 
        <BottomNavigation
        class="bottom"
        :options="options"
        :badge-color="badgeColor"
        :foreground-color="foregroundColor"
        v-model="selected"
      /> 
    </div>
</template>
<script>
import BottomNavigation from "../components/BottomNavigation.vue";
export default {
  name: "App",
  components: { BottomNavigation },
  data() {
    return {
     filters:{
       category: null,
     },
     selected: 1,
      options: [{
	    id: 1, icon: "pi pi-home", title: "Home", path: '../pages/foodburguer', badge: null,
     },
		{ id: 2, icon: "pi pi-shopping-cart", title: "Carrinho", path: '../pages/carrinho', badge: null },
	],
	foregroundColor: "#2E2E2E",
	badgeColor: "#6CFF6C",
    }
  }
};
</script>
