<template>
    <div class="flex justify-between items-center bg-yellow-200 relative text-yellow-600 py-3 px-3 rounded-lg">
        <div>
            <span class="font-semibold text-yellow-700">Bummer !!!</span>
            A simple warning alert—check it out!
        </div>
        <div>
            <button type="button" class=" text-yellow-700">
                <span class="text-2xl">&times;</span>
            </button>
        </div>
    </div>
</template>

<script>
import ddBase from "./ddBase";

export default {
    name: "d-alert",
    extends : ddBase,
    props : {
        'cMessage': {
            default : ''
        },
        'cTime' : {
            default: 2000,
        },
        'cClasses' : {
            default : 'alert alert-primary'
        }
    },
    // mounted() {
    //     var that = this;
    //     if (that.cTime !== 0) {
    //         setTimeout(function() {
    //             that.destroy();
    //         }, that.cTime);
    //     }
    // }
}
</script>

<style scoped>

</style>
