<template>
    <c-loading v-if="loading" :error-msg="errorMsg"></c-loading>
    <div v-else class="well model-calendar">
        <div crud-hidden_fields></div>
        <div crud-view_elements>
            <div crud-calendar>
            </div>
        </div>
        <div crud-view_action class="hide">
            <div crud-field="data" crud-self>

            </div>
        </div>
    </div>
</template>

<script>

import vList from "../views/vList"
import crud from "../../crud/confs"
import Server from "../../crud/Server"

crud.conf['c-calendar'] = {
    confParent: 'v-list',
    routeName : 'calendar',
    resources : [
        //"https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.8.0/fullcalendar.min.css",
        //"https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.8.0/fullcalendar.js",
        //"https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.8.0/fullcalendar.print.min.css",
        //"https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.8.0/gcal.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.0.1/fullcalendar.css",
        "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.0.1/fullcalendar.js",
        // 'fullcalendar-3.8.0/fullcalendar.css',
        // 'fullcalendar-3.8.0/lib/moment.min.js',
        // 'fullcalendar-3.8.0/fullcalendar.js'
    ],
    calendarOptions : {
    }
}

crud.routes['calendar'] = {
    method: 'get',
    url: '/foorm/{modelName}',
    resultType: 'list',
    protocol: 'list',
    commonParams: {},  //parametri statici da aggiungere sempre alla chiamata
    values: {}, // vettore associativo dei parametri per la costruzione dell'url
    params: {},
}

export default {
    name: "c-calendar",
    extends : vList,
    // mounted() {
    //     var that = this;
    //     var __makeCalendar=function () {
    //         if (that.resourcesLoaded) {
    //             console.log('CALENDAR CONTAINER',that.jQe().find('[crud-calendar]').length);
    //             that.jQe().find('[crud-calendar]').fullCalendar(that.calendarOptions);
    //             that.calendarContainer = that.jQe().find('[crud-calendar]');
    //             that.loadEvents();
    //         } else {
    //             setTimeout(__makeCalendar,100)
    //         }
    //     }
    //     __makeCalendar();
    // },
    methods : {
        afterLoadResources() {
            var that = this;
            var __makeCalendar=function () {
                //aspetto che i dati siano caricari
                if (!that.loading) {
                    console.log('CALENDAR CONTAINER',that.jQe().find('[crud-calendar]').length);
                    that.calendarOptions.dayClick= function (date, jsEvent, view){
                        that.dayClick(date,jsEvent,view);
                    }
                    that.calendarOptions.eventClick = function (calEvent, jsEvent, view) {
                        that.eventClick(calEvent, jsEvent, view);
                    }

                    that.jQe().find('[crud-calendar]').fullCalendar(that.calendarOptions);
                    that.calendarContainer = that.jQe().find('[crud-calendar]');
                    that.loadEvents();
                } else {
                    setTimeout(__makeCalendar,100)
                }
            }
            __makeCalendar();
        } ,
        loadEvents: function () {
            var that = this;

            that.jQe().find('[crud-calendar]').fullCalendar('removeEvents');
            var events = [];
            //console.log(that.value);
            for (var i in that.value) {
                var value = that.value[i];
                //that.log.debug('calendar event value',value);
                var backgroundColor = 'green';
                var textColor = 'white';
                var title = 'notitle';
                if (that.backgroundColor) {

                    var params = {};
                    var args = that.backgroundColor.toString().match(/function\s*\w*\s*\((.*?)\)/)[1].split(/\s*,\s*/);
                    for (var a in args)
                        params[args[a]] = value[args[a]];
                    backgroundColor = that.backgroundColor.apply(that, Object.values(params));
                }
                if (that.textColor) {
                    var params = {};
                    var args = that.textColor.toString().match(/function\s*\w*\s*\((.*?)\)/)[1].split(/\s*,\s*/);
                    for (var a in args)
                        params[args[a]] = value[args[a]];
                    textColor = that.textColor.apply(that, Object.values(params));
                }
                if (typeof that.title === "function" ) {
                    var params = {};
                    var args = that.title.toString().match(/function\s*\w*\s*\((.*?)\)/)[1].split(/\s*,\s*/);
                    for (var a in args)
                        params[args[a]] = value[args[a]];
                    title = that.title.apply(that, Object.values(params));
                } else {
                    title = value[that.title];
                }
                //if (!parseInt(model.data.attivo))
                //  bgcolor = 'red';
                if (!value[that.data_inizio]) {
                    console.warn('data evento non valida. Scartato:', value);
                    continue;

                }
                var ev = {
                    id: value[that.id] ? model.data[that.id] : value.id,
                    title: title,
                    start: value[that.data_inizio],
                    end: value[that.data_fine] ? value[that.data_fine] : null,
                    backgroundColor: backgroundColor,
                    textColor: textColor,
                    jsondata : value,
                };
                //that.log.info(value,'evento ',ev);
                events.push(ev);

            }
            console.info('aggiunti eventi ', events);
            that.jQe().find('[crud-calendar]').fullCalendar('addEventSource', events);
        },

        dayClick: function (date, jsEvent, view) {
            console.log('dayClick',date, jsEvent, view);
        },
        eventClick: function (calEvent, jsEvent, view) {
            console.log('eventClick');
        }
    },
}
</script>

<style scoped>

</style>
