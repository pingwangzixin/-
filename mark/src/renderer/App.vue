<template>
  <div id="app">
  	<!--自定义头-->
  	<!--<Header></Header>-->
    <router-view></router-view>
  </div>
</template>

<script>
//	import Header from './components/header.vue';
	
  export default {
    name: 'app',
    data (){
    	return {
    		
    	}
    },
    methods : {
    	
    },
    components : {
//  	Header : Header
    }
  }
</script>

<style>
  /* CSS */
</style>
