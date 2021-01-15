<template>
    <span></span>
</template>

<script>
/* eslint-disable vue/no-unused-components */

import Vue from 'vue';
import cComponent from "./cComponent";
import jQuery from "jquery";
import Server from '../../crud/Server';
import crud from "../../crud/confs";
crud.conf['c-router'] = {
    defaultCommand : process.env.DEFAULT_COMMAND,
    contentId : 'crud-contents',
    lastComponent: null,
    lastHash: null
};
export default {
    name: "c-router",
    props: ['cDefaultCommand','cContentId'],
    extends: cComponent,
    mounted: function () {
        var that = this;
        var __do = function () {
            var cmd = that.getHash();
            if (cmd) {
                that.doCmd(cmd)
            }
        }
        // window.addEventListener('hashchange', function () {
        //     console.log('The hash has changed!');
        //     that.getHash();
        // }, false);

        jQuery( window ).on( 'hashchange', function( e ) {
            __do();
        });
        // jQuery( window ).on( 'crud-app-loaded', function( e ) {
        //   that.getHash();
        // } );
        that.$crud.EventBus.$on('router::doCmd', function (cmd) {
            console.log('EVENTO RICEVUTO', cmd);
            that.doCmd(cmd);
        })
        if (this.getHash())
            __do();
        else if (this.defaultCommand)
            window.location.href = '#' + this.defaultCommand;

        // if (!this.getHash() && this.defaultCommand)
        //     window.location.href = '#' + this.defaultCommand;
        //that.getHash();
    },
    dynamicData(conf) {
        if (this.cDefaultCommand)
            conf.defaultCommand = this.cDefaultCommand
        if (this.cContentId)
            conf.contentId = this.cContentId;
        return conf;
    },
    // data: function () {
    //     return {
    //         lastComponent: null,
    //         defaultCommand: this.cDefaultCommand ? this.cDefaultCommand : null,
    //         contentId: this.cContentId ? this.cContentId : 'app-content',
    //         lastHash: null
    //     }
    // },
    methods: {

        getHash: function () {
            var that = this;
            var hash = "";
            //controllo che non ci sia ! che sta per il numero casuale generato per poter riattivare l'evento change
            if (window.location.hash.indexOf('!') >= 0) {
                hash = window.location.hash.split('!')[1];
            } else
                hash = window.location.hash.substr(1);

            if (!hash)
                return null;
            return hash;
            // if (!hash && !that.defaultCommand)
            //     return;
            //
            // if (!hash) {
            //     hash = '#'+that.defaultCommand
            // }

            that.doCmd(hash);
            that.lastHash = hash;
            var path = that.getCmdPath(hash);
            let eventParams = {
                path: path,
                hash: hash
            }
            that.$crud.EventBus.$emit('set-path', eventParams);
            that._updateLinks(window.location.hash);
        },
        getCmdPath: function (cmd) {
            if (!cmd)
                return
            var tmp = cmd.split('?');
            console.log('split command', tmp);
            return [{label: tmp[0]}];
        },
        go: function (target) {
            var that = this;
            var href = jQuery(target.target).closest('a').attr('href');

            if (href) {
                href = href.substr(1);
                that.doCmd(href);
            }
        },

        doCmd: function (command) {
            var that = this;
            console.log('COMMAND ', command);
            var tmp = command.split('?');
            var params = that.getAllUrlParams(command);
            tmp = tmp[0].split(':');  // per comandi complessi ci possono essere i :
            var componentName = tmp[0];
            switch (componentName) {
                // case 'page':
                //     that._loadPage(params);
                //     break;
                case 'modal':
                case 'modal-big':
                    that._loadModal(componentName, params);
                    break;
                default:
                    that._loadComponent(componentName, params);
                    break;
            }
            return;
        },
        // _loadPage: function (params) {
        //     var that = this;
        //     if (that.lastComponent)
        //         that.lastComponent.$destroy();
        //
        //     var route = that.createRoute('pages');
        //     var path = params['path'].replaceAll('/', '.');
        //     route.setValues({
        //         path: path
        //     })
        //     delete params['path'];
        //     route.setParams(params);
        //     Server.route(route, function (html) {
        //         if (html.error) {
        //             that.errorDialog(html.msg);
        //             return;
        //         }
        //         var htmlNode = jQuery('<div>' + html + '</div>');
        //         jQuery.each(htmlNode.find('script'), function () {
        //             //console.log('script',jQuery(this).text());
        //             jQuery('body').append(jQuery(this));
        //             jQuery(this).remove();
        //         })
        //
        //         //console.log('html', htmlNode.html());
        //         var cdef = Vue.component('async-comp', {
        //             extends: that.$options.components['c-component'],
        //             template: htmlNode.html()
        //         });
        //
        //         var id = 'd' + (new Date().getTime());
        //
        //         jQuery('#' + that.contentId).html('<div id="' + id + '" ></div>');
        //         //console.log('componente container length id ' + id,jQuery('#' + id).length);
        //         var componente = new cdef();
        //         componente.$mount('#' + id);
        //         that.lastComponent = componente;
        //
        //     })
        // },

        _loadModal: function (modalType, params) {
            var that = this;
            if (that.lastComponent)
                that.lastComponent.$destroy();

            //var params = that.getAllUrlParams(command);

            var componentName = params['component'];
            var cTitle = params['dialog-title'] || '';
            delete params['component'];
            delete params['dialog-title'];
            var divId = 'd' + (new Date().getTime());
            that.customDialog({
                cTitle: cTitle,
                cContent: '<div id="' + divId + '"></div>',
                cBig: (modalType == 'modal-big'),
            })
            that._loadComponent(componentName, params, divId);
        },

        _loadComponent: function (componentName, params) {
            var that = this;
            console.log('componente', componentName, 'params', params);
            let elementId = params['targetId'] ? params['targetId'] : that.contentId;
            delete params['targetId'];
            console.log('that', that);
            // jQuery('#'+elementId).html('<component is="'+componentName+'" ></component>');

            if (!that.$options.components[componentName]) {
                // potrebbe essere un'ancora percio' nessuna eccezione, semplicemente non faccio nulla
                return;
                //throw 'Componente non trovato ' + componentName;
            }

            if (that.lastComponent)
                that.lastComponent.$destroy();

            let componente = new that.$options.components[componentName]({
                propsData: params,
                ref: componentName
            });
            let id = 'd' + (new Date().getTime());
            console.log('aggiungo compontent ' + elementId + ' id ' + id);
            jQuery('#' + elementId).html('<div id="' + id + '" ></div>');
            componente.$mount('#' + id);
            that.lastComponent = componente;
        },

        _updateLinks: function (href) {
            var that = this;
            //console.log('updateLink',href)
            var newHref = href.substr(1);  // tolgo la #
            if (href.indexOf('!') >= 0) {
                newHref = href.split("!")[1];
            }
            newHref = '#' + Math.floor(Math.random(100000) * 100000) + "!" + decodeURI(newHref);
            var decodeHref = decodeURI(href).replace(/"/g, '\\"');
            //console.log('STroinga escaèata',decodeHref.replace(/"/g,'\"'));
            jQuery('[href="' + decodeHref + '"]').attr('href', newHref);
        }
    }
}
</script>

<style scoped>

</style>
