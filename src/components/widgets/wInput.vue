<template>
  <input class="form-control" :type="inputType" v-model="value" :name="getFieldName()" :change="change">
</template>

<script>
import wBase from './wBase.vue';
import crud from "../../crud/confs";

crud.conf['w-input'] = {
    inputType : 'text'
};

export default {
  name: "w-input",
  extends : wBase
}
</script>

<style scoped>

</style>
