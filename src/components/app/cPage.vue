<template>
    <div id="page_container"></div>
</template>

<script>
import Server from "../../crud/Server";
import jQuery from "jquery";
import cComponent from "../misc/cComponent";
import Vue from "vue";

export default {
    name: "c-page",
    extends : cComponent,
    props :  {
        cPath: {
            //type : 'String',
            required : true
        }
    },
    beforeDestroy() {
        if (this.component)
            this.component.$destroy();
    },
    mounted() {
        var that = this;

        var route = that.createRoute('pages');
        var path = that.cPath.replaceAll('/', '.');
        route.setValues({
            path: path
        })
        var params = {};
        route.setParams(params);
        Server.route(route, function (html) {
            if (html.error) {
                that.errorDialog(html.msg);
                return;
            }
            var htmlNode = jQuery('<div>' + html + '</div>');
            jQuery.each(htmlNode.find('script'), function () {
                //console.log('script',jQuery(this).text());
                jQuery('body').append(jQuery(this));
                jQuery(this).remove();
            })

            //console.log('html', htmlNode.html());
            var cdef = Vue.component('async-comp', {
                extends: that.$options.components['c-component'],
                template: htmlNode.html()
            });

            var id = 'd' + (new Date().getTime());

            //jQuery('#' + that.contentId).html('<div id="' + id + '" ></div>');
            //console.log('componente container length id ' + id,jQuery('#' + id).length);
            var componente = new cdef();
            componente.$mount('#page_container' );
            that.component = componente;

        })
    },
    data() {
        return {
            component : null,
        }
    }

}
</script>

<style scoped>

</style>
