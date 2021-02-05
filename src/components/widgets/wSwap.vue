<template>
    <div>
        <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
            <input v-on:click="swap" type="checkbox"  class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
            <label for="toggle" class="toggle-label block overflow-hidden h-6 rounded-full  cursor-pointer"></label>
        </div>
        <label for="toggle" class="text-xs text-gray-700">{{slot | translate}}</label>
    </div>
<!--    <div class="flex justify-between items-center px-6 py-2 whitespace-nowrap">-->
<!--        <div-->
<!--            class="w-16 h-6 bg-gray-300 rounded-full px-1 flex-shrink-0 overflow-hidden items-center transform duration-300 ease-in-out"-->
<!--            :class="{ 'bg-green-400': toggleActive}">-->
<!--            <i class="far text-white transform duration-300 ease-in-out"-->
<!--               :class="toggleActive ? activeIcon : '-translate-x-5 opacity-none'+activeIcon"></i>-->
<!--            <input type="checkbox" v-model="value"-->
<!--                   class="switch-checkbox -ml-1 mr-10 mb-1 bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out"-->
<!--                   v-on:click="swap"-->
<!--                   :class="{ 'translate-x-6': toggleActive}"/>-->
<!--            <i class="far text-white transform duration-300 ease-in-out"-->
<!--               :class="toggleActive ? '' : '-translate-x-5 '+noIcon"></i>-->
<!--        </div>-->
<!--    </div>-->
</template>

<script>
import wBase from "./wBase";
import Server from "../../crud/Server";
import crud from "../../crud/confs";

crud.conf['w-swap'] = {
    switchClass: 'form-switch-success',
    dataSwitched: false,
    toggleActive: false,
    activeIcon: 'fa-check',
    noIcon: 'fa-times',
    routeName: 'set',
    iconClass: 'fa fa-circle',
    title: "swap",
    swapType: 'icon',  // possibili valori text,icon
    bgInactive : 'bg-gray-300',
    bgActive : 'bg-blue-400',
    defaultDomainValues: {
        icon: {
            0: 'fa fa-circle text-danger',
            1: 'fa fa-circle text-success'
        },
        text: {
            0: 'app.no',
            1: 'app.si'
        }
    },
    domainValues: {},
    slot: '',
};

export default {
    name: "w-swap",
    extends: wBase,
    mounted: function () {
        var that = this;
        if (Object.keys(that.domainValues).length == 0) {
            that.domainValues = that.defaultDomainValues[that.swapType];
        }

        var keys = Object.keys(that.domainValues).map(String);
        var _index = keys.indexOf("" + that.value);
        if (_index >= 0) {
            that.slot = that.domainValues["" + that.value];
            if (_index == 0 )
                that.toggleActive = false
            else
                that.toggleActive = true
        } else {
            that.slot = that.domainValues[keys[0]];
        }
        //that.toggleActive = true;
        //console.log('domainValues',that.domainValues,that.slot)
    },
    computed : {
        _getCurrent() {
            var that = this;
            var dV = that.getDV();
            var keys = Object.keys(dV);
            var value = that.value ? that.value : keys[0];
            var vs = keys.map(String);
            var index = vs.indexOf("" + value);
            return keys[index];
        }
    },
    methods: {
        getDV: function () {
            var that = this;
            //console.log('swaptype',that.swapType,'domainValues',that.domainValues)
            return (that.domainValues) ? that.domainValues : that.domainValues[that.swapType];
        },
        setRouteValues: function (route) {
            var that = this;
            //console.log('rswap RIDEFINITO', that.modelName, that.modelName)
            // var dV = that.getDV();
            // var keys = Object.keys(dV);
            // var value = that.value ? that.value : keys[0];
            // var vs = keys.map(String);
            // var index = vs.indexOf("" + value);
            // index = (index + 1) % vs.length;
            // console.log('rswap', index, keys,);
            route.setValues({
                modelName: that.modelName,
                //field : that.name, //that.conf.key?that.conf.key:that.cKey,
                //value : keys[index]
            });
            route.setParams({
                id: that.modelData.id,
                field: that.name,
                value: that._getNext()
            });
            return route;
        },
        _swap: function (key) {
            var that = this;
            var r = that._getRoute();
            that.setRouteValues(r);
            var dV = that.getDV();
            that.waitStart()
            Server.route(r, function (json) {
                that.waitEnd();
                if (json.error) {
                    //vueModal().title("Prova").text("Prova body").error().size('normal').show();
                    that.errorDialog(json.msg);
                    return;
                }
                that.toggleActive = !that.toggleActive;

                that.value = key;
                that.slot = dV[key];
                that.change();
                //vueModal().title("Prova").text("Prova body").error().size('normal').show();
            })
        },
        swap() {
            var that = this;
            //console.log('INDEX ',index,vs,keys,keys[index],vs[index]);
            that._swap(that._getNext());
        },
        /**
         * restituisce il valore successivo
         * @private
         */
        _getNext() {
            var that = this;
            var dV = that.getDV();
            var keys = Object.keys(dV);
            var value = that.value ? that.value : keys[0];
            var vs = keys.map(String);
            var index = vs.indexOf("" + value);
            index = (index + 1) % vs.length;
            return keys[index];
        },

    }
}
</script>

<style scoped>

/* CHECKBOX TOGGLE SWITCH */
/* @apply rules for documentation, these do not work as inline style */

.toggle-checkbox {
    @apply: right-0 border-green-400;
    right: 0;
    border-color: var(bgInactive);
}

.toggle-checkbox:checked {
    @apply: right-0 border-green-400;
    right: 0;
    border-color: var(bgActive);
}
.toggle-checkbox:checked + .toggle-label {
    @apply: var(bgActive);
    background-color: var(bgActive);
}
</style>
