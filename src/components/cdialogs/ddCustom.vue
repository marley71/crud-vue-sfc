<template>
<!--    <div v-show="visible" class="modal opacity-0 pointer-events-none fixed w-full h-full top-0 left-0 flex items-center justify-center">-->
<!--        <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>-->

<!--        <div class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">-->

<!--            <div class="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50">-->
<!--                <svg class="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">-->
<!--                    <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>-->
<!--                </svg>-->
<!--                <span class="text-sm">(Esc)</span>-->
<!--            </div>-->
<!--            <div class="text-black-50" v-html="message">-->

<!--            </div>-->
<!--            &lt;!&ndash; Add margin if you want to see some of the overlay behind the modal&ndash;&gt;-->
<!--            <div class="modal-content py-4 text-left px-6">-->
<!--                &lt;!&ndash;Title&ndash;&gt;-->
<!--                <div class="flex justify-between items-center pb-3">-->
<!--                    <p class="text-2xl font-bold">Simple Modal!</p>-->
<!--                    <div class="modal-close cursor-pointer z-50">-->
<!--                        <svg class="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">-->
<!--                            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>-->
<!--                        </svg>-->
<!--                    </div>-->
<!--                </div>-->

<!--                &lt;!&ndash;Body&ndash;&gt;-->
<!--                <p>Modal content can go here</p>-->
<!--                <p>...</p>-->
<!--                <p>...</p>-->
<!--                <p>...</p>-->
<!--                <p>...</p>-->

<!--                &lt;!&ndash;Footer&ndash;&gt;-->
<!--                <div class="flex justify-end pt-2">-->
<!--                    <button class="px-4 bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2">Action</button>-->
<!--                    <button class="modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400">Close</button>-->
<!--                </div>-->

<!--            </div>-->
<!--        </div>-->
<!--    </div>-->




    <span v-show="visible">
        <div class="z-10 fixed inset-0 min-w-full min-h-full transition-opacity" @click.self="hide">
            <div class="absolute inset-0 bg-black opacity-50">
            </div>
        </div>
        <div class="fixed z-30 top-0 left-0 min-h-screen min-w-full flex items-center justify-center">
            <div class="relative bg-white rounded shadow p-8 m-4  max-h-full text-center opacity-100 z-20" :class="typeSize">
                <div class="clear-both mb-10 border-b text-2xl font-medium border-teal-600">
                    <span class="float-left">{{ title | translate }}</span>
                    <span class="float-right" v-on:click="hide">
                        <i class="fa fa-times" ></i>
                    </span>
                </div>
                <div class="mb-8 mt-8">
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
