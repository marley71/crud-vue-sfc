
import jQuery from "jquery";

var dialogs_mixin = {
    methods : {
        // inputW : function (bodyProps,callbacks) {
        //     var that = this;
        //     var props =  {
        //         value : [],
        //     }
        //     var d = new that.$options.components['v-list']({
        //         propsData : props,
        //     });
        //     var id= 'd' + (new Date().getTime());
        //     jQuery('body').append('<div id="'+id+'"></div>');
        //     d.$mount('#'+id);
        //     return d;
        // },
        __dialog(name,bodyProps,callbacks) {
            var that = this;
            var cConf = {};
            console.log('bodyProps',bodyProps);
            if (typeof bodyProps === 'string' || bodyProps instanceof String || bodyProps instanceof Array) {
                cConf.message = bodyProps;
            } else
                cConf = bodyProps;
            if (callbacks)
                cConf.callbacks = callbacks;

            var d = new that.$options.components[name]({
                propsData : {
                    cConf : cConf
                }
            });
            var id= 'd' + (new Date().getTime());
            jQuery('body').append('<div id="'+id+'"></div>');
            d.$mount('#'+id);
            return d;
        },
        messageDialog : function (bodyProps,callbacks) {
            return this.__dialog('d-message',bodyProps,callbacks);
        },
        errorDialog : function (bodyProps,callbacks) {
            return this.__dialog('d-error',bodyProps,callbacks);
        },

        confirmDialog : function (bodyProps,callbacks) {
            return this.__dialog('d-confirm',bodyProps,callbacks);
        },

        warningDialog : function (bodyProps,callbacks) {
            return this.__dialog('d-warning',bodyProps,callbacks);
        },

        customDialog : function (bodyProps,callbacks) {
            return this.__dialog('d-custom',bodyProps,callbacks);
        },

        alert : function (message,classes,time) {
            return this._alert(message,classes,time);
        },

        alertSuccess : function (message,time) {
            return this._alert(message,'alert alert-success',time);
        },
        alertError : function (message,time) {
            return this._alert(message,'alert alert-danger',time);
        },
        alertInfo : function (message,time) {
            return this._alert(message,'alert alert-info',time);
        },
        alertWarning : function (message,time) {
            return this._alert(message,'alert alert-warning',time);
        },

        _alert : function (message,classes,time) {
            var that = this;
            var props = {
                cMessage : message,
                cClasses : classes,
            }
            if (time)
                props.cTime = time;
            var d = new that.$options.components['d-alert']({
                propsData : props,
                //methods : callbacks,
            });
            var id= 'd' + (new Date().getTime());
            jQuery('body').append('<div id="'+id+'"></div>');
            d.$mount('#'+id);
            return d;
        },
        popover : function (element,content,title) {
            jQuery(element).popover({
                html : true,
                content : content,
                title : title,
                trigger : 'click'

            });
            jQuery(element).popover('show');
            jQuery(element).click(function () {
                console.log('aaaa');
                jQuery(element).popover('hide');
            })
        }
    }
}

export default dialogs_mixin;
