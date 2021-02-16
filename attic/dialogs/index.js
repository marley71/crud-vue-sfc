import Vue from "vue";

import dBase from "./dBase";
Vue.component('d-base',dBase);

import dConfirm from "./dConfirm";
Vue.component('d-confirm', dConfirm);

import dError from "./dError";
Vue.component('d-error', dError);

import dMessage from "./dMessage";
Vue.component('d-message', dMessage);

import dWarning from "./dWarning";
Vue.component('d-warning', dWarning);

import dCustom from "./dCustom";
Vue.component('d-custom', dCustom);

import dAlert from "./dAlert";
Vue.component('d-alert', dAlert);
