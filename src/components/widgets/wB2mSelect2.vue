<template>
    <div>
        <div class="relative flex w-full flex-wrap items-stretch mb-3">
            <select type="text" c-select2 :placeholder="translate('app.digita-per-cercare')"
                    class="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pr-10"
                    v-model="value" v-on:change="change"
                    multiple="true"
            />
        </div>

<!--        <select c-select2 class="form-control m-select2" name="" multiple="true"-->
<!--                v-model="value" v-on:change="change">-->

<!--        </select>-->
        <div c-selected-items>
            <!-- hidden input for selected items -->
        </div>
    </div>
</template>

<script>
import wB2Select2 from "./wB2Select2";
import crud from "../../crud/confs";

crud.conf['w-b2-select2'] = {
    labelFields: [],
    resources: [
        'https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.12/css/select2.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.12/js/select2.min.js'
    ],
    routeName: 'autocomplete',
    route: null,
    primaryKey: 'id',
    allowClear: true,
    data: null,  // eventuali dati statici
};

export default {
    name: "w-b2m-elect2",
    extends: wB2Select2,
    methods: {

        getFieldName: function () {
            return this.name + '[]';
        },

        _connectEvents: function () {
            var that = this;
            that.jQe('[c-select2]').on('select2:select', function (e) {
                //that._renderHidden();
                that.change(e);
            });
            that.jQe('[c-select2]').on('select2:unselect', function (e) {
                //that._renderHidden();
                that.change(e);
            });
        },

        getValue: function () {
            var that = this;
            var selValues = that.jQe('[c-select2]').select2('data');
            //console.log('selValues',selValues);
            var values = [];
            for (var i in selValues) {
                values.push(selValues[i][that.primaryKey]);
            }
            //console.log('values',values);
            return values;
        },

        _getDataValues: function () {
            var that = this;
            var data = that.data || [];
            var value = that.value || [];
            for (var j in data) {
                //console.log('test',that.value[i],data[j][that.primaryKey])
                data[j].id = data[j][that.primaryKey];
                data[j].text = that.getLabel(data[j]);
                if (value.indexOf(data[j][that.primaryKey]) >= 0) {
                    data[j].selected = true;
                }
            }
            return data;
        }
    }
}
</script>

<style scoped>

</style>
