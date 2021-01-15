<template>
    <c-loading v-if="loading" :error-msg="errorMsg"></c-loading>
    <div v-else>
        <div v-html="beforeForm"></div>
        <form enctype="multipart/form-data">
            <!-- campi nascosti -->
            <template v-for="(widget, key) in widgets" v-if="isHiddenField(key)">
                <v-widget :c-widget="widget" :key="key"></v-widget>
            </template>
            <div class="row">
                <v-widget v-for="(widget, key) in widgets" v-if="!isHiddenField(key)" :c-widget="widget"
                          :key="key"></v-widget>
            </div>
        </form>
        <div v-html="beforeActions"></div>
        <div class="p-3" v-show="actions.length">
            <template v-for="(action,name) in actionsConf">
                <v-action :c-action="action"></v-action>
            </template>
        </div>
    </div>
</template>

<script>
import vRecord from "./vRecord";

import crud from "../../crud/confs";

crud.conf['v-insert'] = {
    confParent: 'v-record',
    beforeForm: null,
    beforeActions: null,
    primaryKey : 'id',
    routeName : 'insert',
    widgetTemplate : 'tpl-record',
    actions : ['action-save','action-back'],
    fieldsConfig : {
        id : 'w-hidden'
    },
};

export default {
    name: "v-insert",
    extends: vRecord,
    props: {
        cType: {
            default: 'insert'
        }
    },
    methods: {
        setRouteValues: function (route) {
            var that = this;
            if (route) {
                route.setValues({
                    modelName: that.modelName
                });
            }
            return route;
        }
    }
}
</script>

<style scoped>

</style>
