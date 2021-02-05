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
                            <component v-bind:is="name" v-bind:c-conf="collectionActions[name]"></component>&nbsp;
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
                    <thead class="bg-gray-100">
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

                        <td v-for="(widget, key) in row" v-if="!isHiddenField(key)">
                            <v-widget v-show="!editMode[index]" :c-widget="widget"></v-widget>
                            <v-widget v-show="editMode[index]" :c-widget="widgetsEdit[index][key]"></v-widget>
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
<!--            <div class="clearfix">-->
<!--                <div class="float-left" v-show="collectionActionsName.length">-->
<!--                    <template v-for="name in collectionActionsName">-->
<!--                        <v-action :c-action="collectionActions[name]"></v-action>-->
<!--                    </template>-->
<!--                </div>-->
<!--                <div v-if="paginator" class="float-right">-->
<!--                    <c-paginator v-if="widgets.length > 0" v-show="pagination" v-bind:c-pagination="pagination"-->
<!--                                 v-bind:c-route="route"></c-paginator>-->
<!--                </div>-->
            </div>
        </div>
    </div>
</template>

<script>
import vList from './vList';
import crud from "../../crud/confs";

crud.conf['v-list-edit'] = {
    confParent: 'v-list',
    widgetsEdit: {},
    editMode: [],
    routeName : 'list',
    primaryKey : 'id',
    customActions: {},
    fieldsConfig : {},
    orderFields: {},
    widgetTemplate : 'tpl-list',
    actions : [
        'action-insert',
        'action-delete-selected',
        'action-view',
        'action-edit-mode',
        'action-delete',
        'action-save-row',
        'action-view-mode'
    ]
};

export default {
    name: "v-list-edit",
    extends: vList,
    beforeDestroy() {
        for (var row in this.widgetsEdit) {
            for (var key in this.widgetsEdit[row]) {
                this.getWidgetEdit(row, key).$destroy();
            }
        }
    },
    methods: {

        draw: function () {
            var that = this;
            that.editMode = new Array(that.value.length).fill(false);
            that.checkValidActions();
            that.createActionsConf();
            that.createWidgets();
            that.createWidgetsEdit();
            that.loading = false;
            setTimeout(function () {
                that.completed();
            }, 10);
        },

        createWidgetsEdit: function () {
            var that = this;
            that.setKeys();
            //console.log('Vlist-create widgets',that.data);
            var widgetsEdit = [];
            //var data = that.data;
            //var keys = that.getKeys();
            for (var i in that.value) {
                widgetsEdit.push({});
                for (var k in that.keys) {
                    var key = that.keys[k];
                    var dconf = that._defaultWidgetConfig(key, 'fieldsConfigEditMode');
                    // se non c'e' la configurazione in modalità edit lo forzo ad essere un w-input
                    if (!that.fieldsConfigEditMode || !that.fieldsConfigEditMode[key])
                        dconf.type = 'w-input';
                    dconf.cRef = that.getRefId(that._uid, 'redit', i, key);
                    dconf.modelData = that.value[i];
                    dconf.value = that.value[i][key];
                    dconf.name = that.getFieldName(key);
                    if (!('label' in dconf)) {
                        dconf.label = key;
                        dconf.label = that.$options.filters.translate(dconf.label + '.label', that.langContext);
                    } else {
                        dconf.label = that.$options.filters.translate(dconf.label);
                    }
                    widgetsEdit[i][key] = dconf;
                }
            }
            that.widgetsEdit = widgetsEdit;
        },

        setEditMode: function (index) {
            var that = this;
            //console.log('edit mode',index);
            if (that.actions.indexOf('action-delete') >= 0)
                that.hideRA(index, 'action-delete');
            if (that.actions.indexOf('action-edit-mode') >= 0)
                that.hideRA(index, 'action-edit-mode');
            if (that.actions.indexOf('action-view') >= 0)
                that.hideRA(index, 'action-view');

            if (that.actions.indexOf('action-view-mode') >= 0)
                that.showRA(index, 'action-view-mode');
            if (that.actions.indexOf('action-save-row') >= 0)
                that.showRA(index, 'action-save-row');
            //that.recordActions[index]['action-delete'].setVisible(false);
            that.$set(that.editMode, index, true);
        },
        setViewMode: function (index) {
            var that = this;
            that.$set(that.editMode, index, false);
            if (that.actions.indexOf('action-delete') >= 0)
                that.showRA(index, 'action-delete');
            if (that.actions.indexOf('action-edit-mode') >= 0)
                that.showRA(index, 'action-edit-mode');
            if (that.actions.indexOf('action-view') >= 0)
                that.showRA(index, 'action-view');

            if (that.actions.indexOf('action-view-mode') >= 0)
                that.hideRA(index, 'action-view-mode');
            if (that.actions.indexOf('action-save-row') >= 0)
                that.hideRA(index, 'action-save-row');
        },
        hideRA: function (index, name) {
            var that = this;
            var a = that.getRecordAction(index, name);
            a.setVisible(false);
        },
        showRA: function (index, name) {
            var that = this;
            var a = that.getRecordAction(index, name);
            a.setVisible(true);
        },
        getWidgetEdit: function (row, key) {
            var wConf = this.widgetsEdit[row][key];
            return this.$crud.cRefs[wConf.cRef];
        },
        setRowData(index,values) {
            for (var k in values) {
                this.getWidgetEdit(index,k).setValue(values[k]);
                this.getWidget(index,k).setValue(values[k]);
            }
        }
    }
}
</script>

<style scoped>
/*div[role=group] > button:first-child {*/
/*    !*border: 2px solid red;*!*/
/*    border-top-left-radius: 15px;*/
/*    border-bottom-left-radius: 15px;*/
/*}*/
/*div[role=group] > button:last-child {*/
/*    !*border: 2px solid red;*!*/
/*    border-top-right-radius: 15px;*/
/*    border-bottom-right-radius: 15px;*/
/*    border-left: none;*/
/*}*/
/*div[role=group] > button:not(:first-child):not(:last-child) {*/
/*    !*border: 2px solid red;*!*/
/*    border-left: none;*/
/*}*/
</style>
