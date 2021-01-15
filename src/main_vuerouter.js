import Vue from 'vue'
import App from './App_vuerouter'
import VueRouter from 'vue-router'

//import { compileToFunctions } from 'vue-template-compiler'

import crud from "./crud/confs";
import core_mixin from "./mixins/core_mixin";
import dialogs_mixin from "./mixins/dialogs_mixin";

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import 'tailwindcss/base.css';
import 'tailwindcss/components.css';
import 'tailwindcss/utilities.css';

import jQuery from 'jquery';

crud.EventBus = new Vue();
Vue.prototype.$crud = crud;

//Vue.config.productionTip = false
require('./components/misc');

require('./components/widgets');
require('./components/views');

//require('./components/dialogs');
require('./components/cdialogs');

require('./components/app');

require('./components/widgetTemplates');
require('./components/prove');

// per avere la 'translate' unica sia direttamente in html sia in javascript
Vue.filter('translate', function (value,context,plural,params) {
    var langKey = context?context+'.'+value:value;
    return window.app.translate(langKey,plural,params);
})

Vue.use(VueRouter);

const rFoo = { template : '<div>foo</div>'}
const rManage = {template : '<c-manage :c-model="$route.params.model"></c-manage>'}

const routes = [
    {path : '/foo', component: rFoo},
    {path : '/manage/:model', component: rManage}
]

const router = new VueRouter({
    routes
})

window.app = new Vue({
    router,
    mounted() {
        console.log('main query',process.env);
    },
    mixins : [core_mixin,dialogs_mixin],
    render: h => h(App),
})
window.app.$mount('#app')
window.jQuery = jQuery;
