<script>
import cComponent from "../misc/cComponent";
import crud from "../../crud/confs";

crud.conf['d-base'] = {
    confParent: 'c-component',
    content : null,
    visible : true,
    message : '',
    typeSize : '',
};

export default {
    name: "d-base",
    extends : cComponent,
    props :  {
        cConfDefaultName: {
            default: 'd-base',
        },
        // 'cMessage' : {
        //     default : ''
        // },
        // 'cAutohide' : {
        //     default : true
        // },
        // cButtonConf : {
        //     default : function() {
        //         return {}
        //     }
        // },
        // cBig : {
        //     default : false
        // }
    },
    // mounted : function () {
    //     var that = this;
    //     that.show();
    // },
    methods : {
        ok : function () {
            console.log('default ok');
            this.hide();
        },
        cancel : function () {
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
            that.cCallbacks[key].apply(that);
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
