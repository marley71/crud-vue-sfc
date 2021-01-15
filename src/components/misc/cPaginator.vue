<template>
    <div v-if="last_page" class="justify-center">
        <ul class="flex pagination pagination-pill justify-start mb-0">
            <li v-if="(parseInt(current_page) > 1)" class="paginator-item"> <!-- disabled -->
                <a class="" href="javascript:void(0)" tabindex="-1" v-on:click="firstPage()">&laquo;</a>
            </li>
            <li v-if="(current_page - 2) > 0 " class="paginator-item">
                <a v-on:click="setPage(current_page - 2)" class="" href="javascript:void(0)">
                    {{ current_page - 2 }}
                </a>
            </li>
            <li v-if="(current_page - 1) > 0 " class="paginator-item">
                <a v-on:click="setPage(current_page - 1)" class="" href="javascript:void(0)">
                    {{ current_page - 1 }}
                </a>
            </li>
            <li class="paginator-item hover:bg-transparent hover:text-gray-600"><a class="">
                pag. {{ current_page }} / {{ last_page }}
            </a></li>
            <li v-if="(current_page + 1) <=  last_page " class="paginator-item">
                <a v-on:click="setPage(current_page + 1)" class="" href="javascript:void(0)">
                    {{ current_page + 1 }}
                </a>
            </li>
            <li v-if="(current_page + 2) <=  last_page " class="paginator-item">
                <a v-on:click="setPage(current_page + 2)" class="" href="javascript:void(0)">
                    {{ current_page + 2 }}
                </a>
            </li>
            <li v-if="(parseInt(current_page) < last_page)" class="paginator-item">
                <a class="" href="javascript:void(0)" v-on:click="lastPage()">&raquo;</a>
            </li>
        </ul>
        <div class="text-center pl-3 text-xs">
            ({{ from + '-' + to + " di " + total }} elementi)
        </div>
    </div>
</template>

<script>
import cComponent from "./cComponent";
import crud from "../../crud/confs";

crud.conf['c-paginator'] = {
    confParent : 'c-component',
};

export default {
    name: "c-paginator",
    extends: cComponent,
    props: ['c-pagination'],
    data: function () {
        var that = this;
        //console.log('paginator',that.cPagination, that.$parent.pagination )
        var pagination = that.cPagination || that.$parent.data.pagination || {};
        var d = {
            current_page: 0,
            from: 0,
            to: 0,
            last_page: 0,
            per_page: 0,
            total: 0,
            pagination_steps: {}
        }
        return this.merge(d, pagination);
    },
    methods: {
        firstPage: function () {
            var that = this;
            if (parseInt(that.current_page) == 1)
                return;
            that.setPage(1);
        },
        prevPage: function () {
            var that = this;
            if (parseInt(that.current_page) <= 1)
                return;
            that.setPage(parseInt(that.current_page) - 1);
        },
        nextPage: function () {
            var that = this;
            if (parseInt(that.current_page) >= parseInt(that.last_page))
                return;
            that.setPage(parseInt(that.current_page) + 1);
        },
        setPage: function (page) {
            var that = this;
            var route = that.$parent.route;

            var params = route.getParams();
            params['page'] = parseInt(page);
            route.setParams(params);
            that.$parent.reload();
        },
        lastPage: function () {
            var that = this;
            if (parseInt(that.current_page) >= parseInt(that.last_page))
                return;
            that.setPage(that.last_page);
        },
    }
}
</script>

<style scoped>

</style>
