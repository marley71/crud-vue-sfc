import Vue from 'vue'

import vWidget from "./vWidget";
Vue.component('v-widget',vWidget);

import vAction from "./vAction";
Vue.component('v-action',vAction);

import vBase from "./vBase";
Vue.component('v-base', vBase);

import vCollection from "./vCollection";
Vue.component('v-collection',vCollection);

import vList from "./vList";
Vue.component('v-list',vList);

import vRecord from "./vRecord";
Vue.component('v-record',vRecord);

import vInsert from "./vInsert";
Vue.component('v-insert',vInsert);

import vEdit from "./vEdit";
Vue.component('v-edit',vEdit);

import vView from "./vView";
Vue.component('v-view',vView);

import vSearch from "./vSearch";
Vue.component('v-search',vSearch);

import vListEdit from "./vListEdit";
Vue.component('v-list-edit',vListEdit);

import vHasmany from "./vHasmany";
Vue.component('v-hasmany',vHasmany);
