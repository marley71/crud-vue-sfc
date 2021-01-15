<template>
    <component v-if="cWidget.type=='w-hidden'" :is="cWidget.type" :c-conf="cWidget"></component>
    <div class="w-full mb-2 relative" v-else>
        <component :is="cWidget.type" :c-conf="cWidget"></component>
        <label :for="cWidget.name" class="form-label">
            {{cWidget.label}}
        </label>
    </div>
</template>

<script>
export default {
    name: "tpl-record-view",
    props : ['cWidget'],
}
</script>

<style scoped>

</style>
