<template>
    <select class="form-input" v-bind:name="getFieldName()" v-model="value"
            v-on:change="change">
        <option v-for="key in domainValuesOrder" :value="key"
        >{{ domainValues[key] }}
        </option>
    </select>
</template>

<script>
import wBase from "./wBase";
import choice_mixin from "../../mixins/choice_mixin";
import crud from "../../crud/confs";

crud.conf['w-select'] = {
    domainValues: {},
    domainValuesOrder: [],
};
export default {
    name: "w-select",
    extends: wBase,
    mixins: [choice_mixin],
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
