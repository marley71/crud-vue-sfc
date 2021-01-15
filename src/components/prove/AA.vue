<template>
    <div>
        <span >{{aConf.propa}}</span>
    </div>
</template>

<script>
import cComponent from "../misc/cComponent";
export default {
    name: "aa",
    extends : cComponent,
    props : {
        aConf : {
            type : Object,
            default () {
                return {
                    propa : 'propa',
                    propc : 'ssss'
                }
            }
        }
    }
}
</script>

<style scoped>

</style>
