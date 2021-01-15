import Vue from "vue";

import ddBase from "./ddBase";
Vue.component('d-base',ddBase);

import ddConfirm from "./ddConfirm";
Vue.component('d-confirm', ddConfirm);

import ddError from "./ddError";
Vue.component('d-error', ddError);

import ddMessage from "./ddMessage";
Vue.component('d-message', ddMessage);

import ddWarning from "./ddWarning";
Vue.component('d-warning', ddWarning);

import ddCustom from "./ddCustom";
Vue.component('d-custom', ddCustom);

import ddAlert from "./ddAlert";
Vue.component('d-alert', ddAlert);
