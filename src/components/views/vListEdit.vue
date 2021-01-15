<template>
    <div>
        <h4 v-show="viewTitle">{{ viewTitle }}</h4>
        <c-loading v-if="loading" :error-msg="errorMsg"></c-loading>
        <div v-else>
            <div class="box-border border-1">
                <div class="float-left" v-if="collectionActionsName.length">
                    <template v-for="name in collectionActionsName">
                        <v-action :c-action="collectionActions[name]"></v-action>
                    </template>
                </div>
                <div v-if="paginator" class="float-right">
                    <c-paginator v-if="widgets.length > 0" v-show="pagination" v-bind:c-pagination="pagination"
                                 v-bind:c-route="route"></c-paginator>
                </div>
            </div>
            <div class="clear-both table-responsive">
                <table class="table table-striped">
                    <thead>
                    <tr v-if="widgets.length > 0">
                        <th v-show="recordActionsName.length">
                            <input c-row-check-all v-on:change="selectAllRows" v-if="needSelection"
                                   class="btn btn-sm btn-outline-secondary" type="checkbox">
                            <span>{{ "app.azioni" | translate }}</span>
                        </th>
                        <th v-for="key in keys" v-if="!isHiddenField(key)">
                            <action-order v-if="orderFields[key]" v-bind:c-conf="getOrderConf(key)"></action-order>
                            <span v-else>{{ key + '.label' | translate(langContext) }}</span>
                        </th>
                    </tr>
                    <tr v-if="widgets.length == 0">
                        <th v-show="recordActionsName.length">
                            {{ "app.nessun-elemento" | translate }}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(row,index) in widgets">
                        <td v-show="recordActionsName.length">

                            <div class="btn-group btn-group-sm" role="group">
                                <div v-if="needSelection" class="input-group-text bg-transparent">
                                    <input c-row-check type="checkbox">
                                </div>

                                <template v-for="(action,name) in recordActions[index]">
                                    <v-action :c-action="action"></v-action>
                                </template>
                            </div>

                        </td>
                        <td v-for="(widget, key) in row" v-if="!isHiddenField(key)">
                            <v-widget v-show="!editMode[index]" :c-widget="widget"></v-widget>
                            <v-widget v-show="editMode[index]" :c-widget="widgetsEdit[index][key]"></v-widget>
                        </td>
                        <template v-for="(widget, key) in row" v-if="isHiddenField(key)">
                            <v-widget :c-widget="widget" :key="key"></v-widget>
                        </template>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="clearfix">
                <div class="float-left" v-show="collectionActionsName.length">
                    <template v-for="name in collectionActionsName">
                        <v-action :c-action="collectionActions[name]"></v-action>
                    </template>
                </div>
                <div v-if="paginator" class="float-right">
                    <c-paginator v-if="widgets.length > 0" v-show="pagination" v-bind:c-pagination="pagination"
                                 v-bind:c-route="route"></c-paginator>
                </div>
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
                    if (!('value' in dconf))
                        dconf.value = null;
                    if (that.value[i][key])
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

</style>
