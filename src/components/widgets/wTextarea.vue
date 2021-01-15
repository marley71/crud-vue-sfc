<template>
    <textarea :maxlength="maxlength"
              class="form-control" :class="{'js-form-advanced-char-count-down' : charleft}"
              data-output-target=".js-form-advanced-char-left"
              v-model="value" :name="getFieldName()"
              v-on:change="change"></textarea>
</template>

<script>
import wBase from "./wBase";
import crud from "../../crud/confs";

crud.conf['w-textarea'] = {
    maxlength: 1000,
    charleft: false,
};

export default {
    name: "w-textarea",
    extends: wBase
}
</script>

<style scoped>

</style>
