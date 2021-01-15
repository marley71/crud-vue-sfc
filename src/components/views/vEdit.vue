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
                <v-widget v-for="(widget, key) in widgets" :c-widget="widget" v-if="!isHiddenField(key)" :key="key"></v-widget>
            </div>
        </form>
        <div v-html="beforeActions"></div>
        <div class="clear-both" v-show="actions.length">
            <template v-for="(action,name) in actionsConf">
                <v-action :c-action="action"></v-action>
            </template>
        </div>
    </div>
</template>

<script>
import vRecord from "./vRecord";

import crud from "../../crud/confs";

crud.conf['v-edit'] = {
    confParent : 'v-record',
    beforeForm : null,
    beforeActions : null,
    // vecchia configurazione in base al tipo, eliminata
    //confParent : 'v-edit',
    primaryKey : 'id',
    routeName : 'edit',
    customActions : {},
    fieldsConfig : {
        id : 'w-hidden'
    },
    fields : [],
    widgetTemplate : 'tpl-record',
    actions : ['action-save','action-back']
};

export default {
    name: "v-edit",
    extends : vRecord,
    props : {
        cType : {
            default : 'edit'
        }
    },
    methods : {
        setRouteValues : function (route) {
            var that  = this;
            if (route) {
                route.setValues({
                    modelName : that.modelName,
                    pk :that.pk,
                });
            }
            return route;
        }
    },
}
</script>

<style scoped>

</style>
