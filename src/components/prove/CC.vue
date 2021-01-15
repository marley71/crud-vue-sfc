<template>
    <div>
        <span >{{aConf.propa}}</span> <span >{{aConf.propc}}</span>
    </div>
</template>

<script>
import BB from './BB';
export default {
    name: "cc",
    extends : BB,
    props : {
        aConf : {
            type : Object,
            default () {
                return {
                    propc : 'propc ',
                }
            }
        }
    },
    methods : {
        getC(conf) {
            return window[conf];
        }
    }

}
</script>

<style scoped>

</style>
