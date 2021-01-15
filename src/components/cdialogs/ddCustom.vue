<template>
    <span v-show="visible">
        <div class="z-10 fixed inset-0 min-w-full min-h-full transition-opacity" @click.self="hide">
            <div class="absolute inset-0 bg-black opacity-50">
            </div>
        </div>
        <div class="fixed z-30 top-0 left-0 min-h-screen min-w-full flex items-center justify-center">
            <div class="relative bg-white rounded shadow p-8 m-4  max-h-full text-center overflow-y-scroll opacity-100 z-20" :class="typeSize">
                <div class="mb-4 border-b text-2xl font-medium border-teal-600">
                  {{ title | translate }}
                    <span v-on:click="hide">
                        <i class="fa fa-times" ></i>
                    </span>
                </div>
                <div class="mb-8 text-left">
                    <div class="text-black-50" v-html="message">

                    </div>
                </div>
                <div v-if="Object.keys(callbacks).length > 0" class="modal-footer">
                    <template v-for="(cb,key) in callbacks">
                        <button type="button" class="text-black-50 py-2 px-4 rounded bg-gray-600  hover:bg-gray-800" v-on:click="callCb(key)">{{key | translate}}
                        </button>
                    </template>
                </div>
            </div>
        </div>

    </span>
</template>

<script>
import ddBase from "./ddBase";
export default {
    name: "d-custom",
    extends : ddBase,
    methods : {
        dynamicData(conf) {
            if (!conf.title) {
                conf.title = 'app.sitename';
            }
            return conf;
        }
    },
    // props : {
    //     'c-title': {
    //         default : ''
    //     },
    //     'c-content' : {
    //         default : ''
    //     },
    //     'c-callbacks' : {
    //         default : function () {
    //             return {}
    //         }
    //     }
    // }

}
</script>

<style scoped>

</style>
