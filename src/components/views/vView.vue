<template>
    <c-loading v-if="loading" :error-msg="errorMsg"></c-loading>
    <div v-else class="container-fluid">
        <slot card-title><h4 v-show="viewTitle">{{ viewTitle }}</h4></slot>
        <c-loading v-if="loading" :error-msg="errorMsg"></c-loading>
        <div class="row" v-else>
            <v-widget v-for="(widget, key) in widgets" :c-widget="widget" v-if="!isHiddenField(key)"
                      :key="key"></v-widget>
        </div>
        <!-- campi nascosti -->
        <template v-for="(widget, key) in widgets" v-if="isHiddenField(key)">
            <v-widget :c-widget="widget" :key="key"></v-widget>
        </template>
        <div v-if="actions.length">
            <template v-for="(action,name) in actionsConf">
                <v-action :c-action="action"></v-action>
            </template>
        </div>
    </div>

</template>

<script>
import vRecord from "./vRecord";
import crud from "../../crud/confs";

crud.conf['v-view'] = {
    confParent: 'v-record',
    defaultWidgetType: 'w-text',
    primaryKey : 'id',
    routeName : 'view',
    fieldsConfig : {},
    actions : [],
    customActions: {},
    widgetTemplate : 'tpl-record-view',
};

export default {
    name: "v-view",
    extends: vRecord,
    props: {
        cType: {
            default: 'view'
        }
    },
    methods: {
        setRouteValues: function (route) {
            var that = this;
            if (route) {
                route.setValues({
                    modelName: that.modelName,
                    pk: that.pk,
                });
            }
            return route;
        }
    },
}
</script>

<style scoped>

</style>
