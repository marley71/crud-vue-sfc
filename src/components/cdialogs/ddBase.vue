<script>
import cComponent from "../misc/cComponent";
import crud from "../../crud/confs";

crud.conf['d-base'] = {
    confParent: 'c-component',
    content : null,
    visible : true,
    message : '',
    //typeSize : '',
    typeSize : 'w-1/2',
    callbacks : {
    }
};

export default {
    name: "d-base",
    extends : cComponent,
    props :  {
        cConfDefaultName: {
            default: 'd-base',
        }
    },
    methods : {
        ok : function () {
            var that = this;
            var exist = that.callbacks['ok'] && {}.toString.call(that.callbacks['ok']) === '[object Function]'
            if (exist)
                return that.callbacks['ok'].apply(that);
            console.log('default ok');
            this.hide();
        },
        cancel : function () {
            var that = this;
            var exist = that.callbacks['cancel'] && {}.toString.call(that.callbacks['cancel']) === '[object Function]'
            if (exist)
                return that.callbacks['cancel'].apply(that);
            console.log('default cancel');
            this.hide();
        },
        show : function () {

        },
        hide : function () {
            var that = this;
            that.visible = false;
        },
        callCb : function (key) {
            var that = this;
            that.callbacks[key].apply(that);
        },
        destroy() {
            let that = this;
            console.log('destroy',that);
            that.$destroy();
            that.jQe().remove();
        }
    },
    // data :function () {
    //     var message = Array.isArray(this.cMessage)?this.cMessage:[this.cMessage];
    //     console.log('DIALOG MSG',Array.isArray(this.cMessage),message,this.cMessage);
    //     return {
    //         message : message,
    //         title : this.cTitle,
    //         typeSize : 'w-10/12',
    //         visible : true,
    //     }
    // }
}
</script>

<style scoped>

</style>
