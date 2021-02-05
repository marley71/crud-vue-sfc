<template>
      <div id="app">
        <c-router c-content-id="crud-contents"></c-router>
<!--          <c-page c-path="views"></c-page>-->
      </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
//import HelloWorld from './components/HelloWorld.vue'
//import wInput from './components/widgets';
//import wInput from './components/widgets/wInput.vue'
import cRouter from "./components/misc/cRouter";


export default {
    name: 'App',
    components: {
        cRouter
        //HelloWorld,wInput
    },
    mounted() {
        //this.$crud.EventBus.$emit('crud-app-loaded');
        //console.log('process.env.TRASLATIONS_FILES',process.env.TRASLATIONS_FILES)
        // if (process.env.TRASLATIONS_FILES) {
        //     this.loadResource(process.env.TRASLATIONS_FILES,function () {
        //         window.dispatchEvent(new Event('crud-app-loaded'))
        //     })
        //     console.log('process.env.TRASLATIONS_FILES',process.env.TRASLATIONS_FILES)
        //     //that.loadResource()
        // } else
        //     window.dispatchEvent(new Event('crud-app-loaded'))


    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
