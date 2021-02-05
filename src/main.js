import Vue from 'vue'
import App from './App.vue'
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
//require('')
//window.crud = crud;
window.app = new Vue({
    mounted() {
        var that = this;
        console.log('main query',process.env);
        var settings = [process.env.TRASLATIONS_FILES,process.env.ROUTES_FILES,process.env.CONFS_FILES];

        var _recursive = function (sindex,files,findex,callback) {
            that.loadResource(files[findex],function () {
                console.log('_recursive',sindex,files[findex]);
                let conf,lang,routes;
                switch (sindex) {
                    case 0:
                        that.$crud.lang = that.merge(that.$crud.lang,lang);
                        break;
                    case 1:
                        that.$crud.routes = that.merge(that.$crud.routes,routes);
                        break;
                    case 2:
                        that.$crud.conf = that.merge(that.$crud.conf,conf);
                        break;
                    default:
                        console.log('onno trovato',sindex);
                }

                if (findex < files.length-1) {
                    _recursive(sindex,files,findex+1,callback);
                } else {
                    return callback();
                }
            });
        }


        var _settingsRecursive = function (i) {
            if (settings[i]) {
                var files = settings[i].split(',');
                _recursive(i, files, 0, function () {
                    if (i < settings.length - 1) {
                        _settingsRecursive(i + 1);
                    } else {
                        window.dispatchEvent(new Event('crud-app-loaded'))
                    }
                });
            } else {
                if (i < settings.length - 1) {
                    _settingsRecursive(i + 1);
                } else {
                    window.dispatchEvent(new Event('crud-app-loaded'))
                }
            }
        }
        _settingsRecursive(0);
    },
    mixins : [core_mixin,dialogs_mixin],
    render: h => h(App),
})
window.app.$mount('#app')
window.jQuery = jQuery;
