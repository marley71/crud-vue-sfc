<template>
    <span>{{ value }}</span>
</template>

<script>
import wBase from './wBase.vue';
import crud from "../../crud/confs";

crud.conf['w-text'] = {
};

export default {
    name: "w-text",
    extends: wBase,
}
</script>

<style scoped>

</style>
