<template>
    <div class="flex w-full bg-white">
        <!-- start:col: -->
        <!-- start:portlet -->

        <c-loading v-if="loading" :error-msg="errorMsg"></c-loading>
        <div v-else class="w-full flex-col">
            <div class="portlet-header w-full border-b" :class="headerClass">
                <span v-show="viewTitle">{{ viewTitle }}</span>
                <!-- options and pagination -->
                <div class="w-full md:flex justify-between items-center  py-3">

                    <div v-if="paginator" class="flex w-full md:w-1/2 pb-2 md:pb-0 justify-center">
                        <!-- v-bind:c-route-conf="routeConf" -->
                        <c-paginator v-if="widgets.length > 0" v-show="pagination"
                                     v-bind:c-pagination="pagination" v-bind:c-route="route"></c-paginator>
                    </div>
                    <div class="flex w-full md:w-1/2 justify-center h-8" v-show="collectionActionsName.length">
                        <template v-for="name in collectionActionsName">
                            <component v-bind:is="name" v-bind:c-conf="collectionActions[name]"></component>
                        </template>
                    </div>

                </div>
                <!-- /options and pagination -->

                <!-- header -->
                <!-- portlet : header -->
                <!-- /portlet : header -->

                <!-- /header -->
            </div>
            <div class="">


                <div class="overflow-x-auto p-2 " :class="modelName">
<!--                    <table class="table-list table-auto w-full border rounded-lg">-->
                        <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                        <tr v-if="widgets.length > 0">
                            <th v-if="needSelection" class="text-gray-500 w--50">
                                <label class="">
                                    <input c-row-check-all v-on:change="selectAllRows"
                                           class="checkall" type="checkbox">
                                    <i></i>
                                </label>
                            </th>
                            <th v-show="recordActionsName.length"></th>
                            <th v-for="key in keys" v-if="!isHiddenField(key)"
                                class="text-gray-500 font-weight-normal fs--14" :class="key">
                                <action-order v-if="orderFields[key]"
                                              v-bind:c-conf="getOrderConf(key)"></action-order>
                                <span style="cursor:default"
                                      class="btn btn-default btn-xs mr-1 text-gray-500 font-weight-normal fs--14"
                                      v-else>{{ key + '.label' | translate(langContext) }}</span>
                                <!--                                <w-tooltip v-if="hasHelp(key)" :help="hasHelp(key)" :help-label="key"></w-tooltip>-->

                            </th>
                        </tr>
                        <tr v-if="widgets.length == 0">
                            <th v-show="recordActionsName.length" class="text-gray-500 w--50">
                                {{ "app.nessun-elemento" | translate }}
                            </th>
                        </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                        <!-- product -->
                        <tr v-for="(row,index) in widgets" :key="index">
                            <th v-if="needSelection">

                                <label
                                    class="form-checkbox form-checkbox-primary float-start">
                                    <input c-row-check type="checkbox">
                                    <i></i>
                                </label>


                            </th>
                            <th v-show="recordActionsName.length">
                                <div class="flex justify-center rounded-lg text-sm" role="group">
                                    <template v-for="(action,name) in recordActions[index]">
                                        <v-action :c-action="action" :key="name"></v-action>
                                    </template>
                                </div>

                            </th>

                            <td v-for="(widget, key) in row" v-if="!isHiddenField(key)" :class="key">
                                <v-widget :c-widget="widget" :key="key"></v-widget>
                            </td>
                            <template v-for="(widget, key) in row" v-if="isHiddenField(key)">
                                <v-widget :c-widget="widget" :key="key"></v-widget>
                            </template>
                        </tr>
                        </tbody>

                        <tfoot v-if="hasFooter">
                        <tr v-if="widgets.length > 0">
                            <th v-if="needSelection" class="text-gray-500 w--50">

                            </th>
                            <th v-show="recordActionsName.length"></th>
                            <th v-for="key in keys" v-if="!isHiddenField(key)"
                                class="text-gray-500 font-weight-normal fs--14">
                                <action-order v-if="orderFields[key]"
                                              v-bind:c-conf="getOrderConf(key)"></action-order>
                                <span style="cursor:default"
                                      class="btn btn-default btn-xs mr-1 text-gray-500 font-weight-normal fs--14"
                                      v-else>{{ key + '.label' | translate(langContext) }}</span>
                                <button v-if="hasHelp(key)"
                                        type="button"
                                        class="btn-xs btn-squared btn-light"
                                        data-trigger="focus"
                                        data-container="body"
                                        data-toggle="popover"
                                        data-placement="top"
                                        :data-content="hasHelp(key)">
                                    <i class="fi fi-round-question-full text-red-700"></i>
                                </button>

                            </th>
                        </tr>
                        </tfoot>


                    </table>
                </div>


            </div>
        </div>

    </div>
</template>

<script>
import vCollection from "./vCollection";
import jQuery from "jquery";
import crud from "../../crud/confs";

crud.conf['v-list'] = {
    confParent: 'v-collection',
    headerClass: null,
    hasFooter: null,
    widgets: {},
    keys: [],
    route: null,
    pagination: {},
    defaultWidgetType: 'w-text',
    json: {},

    // vecchia conf.list rimossa e messa qui
    // confParent : 'v-list',
    primaryKey : 'id',
    routeName : 'list',
    customActions: {},
    fieldsConfig : {},
    orderFields: {},
    widgetTemplate : 'tpl-list',
    actions : ['action-insert','action-delete-selected','action-view','action-edit','action-delete']
};

export default {
    name: "v-list",
    extends: vCollection,
    methods: {

        isOrderField: function (key) {
            var that = this;
            if (that.orderFields[key])
                return true;
            return false;
        },

        getOrderConf: function (key) {
            var that = this;
            var widgetsRow = that.widgets[0];
            var translateKey = that.langContext ? that.langContext + '.' : '';
            translateKey += key + '.label';
            var conf = that.getActionConfig('action-order', 'collection');
            conf.title = that.translate('app.ordina') + ' ' + widgetsRow[key].label; //that.translate(translateKey);
            conf.text = widgetsRow[key].label; //that.translate(translateKey);
            conf.orderField = that.orderFields[key] ? that.orderFields[key] : key;
            //if (that.data.order_field)
            var order = that.metadata.order || {};
            //console.log('GETORDERCONF CALLED',key,order);
            conf.orderDirection = (order.field == conf.orderField) ? order.direction : null;
            conf.view = that;
            return conf;
        },
        selectAllRows: function () {
            var that = this;
            var sel = that.jQe('[c-row-check-all]').prop('checked');
            that.jQe('[c-row-check]').prop('checked', sel);
        },
        selectedRows: function () {
            var that = this;
            var sel = [];
            that.jQe('[c-row-check]').each(function () {
                if (jQuery(this).prop('checked')) {
                    var index = jQuery(this).closest('tr').index();
                    sel.push(that.value[index].id);
                }
            });
            //console.log('select3ed',sel);
            return sel;
        },
        setRouteValues: function (route) {
            var that = this;
            if (route) {
                route.setValues({
                    modelName: that.modelName
                });
                console.log('setRouteValues', that);
                if (that.routeConf) {
                    var _conf = that._loadRouteConf() || {};
                    console.log('routeConf params', _conf);
                    var params = route.getParams();
                    var p2 = _conf.params || {};
                    for (var k in p2) {
                        params[k] = p2[k];
                    }
                    route.setParams(params);
                }
            }
            return route;
        }
    },
    watch: {
        routeConf: {
            deep: true,
            handler() {
                this.reload();

            }
        },
        // value : {
        //     deep : true,
        //     handler() {
        //         this.reload();
        //     }
        // }
    }
}
</script>

<style scoped>

</style>
