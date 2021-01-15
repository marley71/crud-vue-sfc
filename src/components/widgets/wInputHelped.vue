<template>
    <div>
        <input v-bind:readonly="!customValue"
               class="form-control" type="text" name="getFieldName()" v-model="value"
               v-on:change="change">
        <div>
            <div class="btn-group btn-group-sm" role="group" aria-label="...">
                <button v-for="dVal in domainValuesOrder" type="button"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1"
                        v-on:click="setValue(dVal)">{{ domainValues[dVal] }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import wBase from "./wBase";
import crud from "../../crud/confs";

crud.conf['w-input-helped'] = {
    domainValues: {},
    domainValuesOrder: [],
    customValue: false,
};


export default {
    name: "w-input-helped",
    extends: wBase,
    mounted: function () {
        var that = this;
        if (that.domainValuesOrder.length == 0 && Object.keys(that.domainValues).length > 0) {
            that.domainValuesOrder = Object.keys(that.domainValues);
        }
    }
}
</script>

<style scoped>

</style>
