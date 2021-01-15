<template>
    <div>
        <!-- input hidden for form compatibiliy --->
        <input type="hidden" :name="lngName">
        <input type="hidden" :name="latName">
        <div class="mb-2 form-label-group">
            <input :placeholder="label" class="form-control" v-on:change="searchAddress">
            <label>
                {{ label }}
            </label>
        </div>


        <!--        <div class="input-group mb-3">-->
        <!--            <div class="input-group-prepend">-->
        <!--                <span class="input-group-text" id="basic-addon1">{{'app.trova-indirizzo' | translate}}</span>-->
        <!--            </div>-->
        <!--            <input class="form-control" type="text" v-on:change="searchAddress"/>-->
        <!--        </div>-->
        <div c-map></div>
    </div>
</template>

<script>
import wBase from "./wBase";
import crud from "../../crud/confs";

crud.conf['w-map'] = {
    apiKey: null,
    map: null,
    marker: null,
    lat: 0,
    lng: 0,
    zoom: 8,
    height: 400,
    width: 'auto',
    lngName: 'lng',
    latName: 'lat'
};

export default {
    name: "w-map",
    extends: wBase,
    mounted: function () {
        this.initMap();
    },
    methods: {
        initMap: function () {
            var that = this;
            if (!that.apiKey)
                throw 'nessuna apiKey definita!';
            var random = 10; //Math.floor(Math.random() * 10000);
            window['__initMap' + random] = function () {
                that.jQe('[c-map]').css('height', that.height).css('width', that.width);
                var pos = {
                    lat: that.lat,
                    lng: that.lng
                }

                that.map = new google.maps.Map(that.jQe('[c-map]')[0], {
                    center: pos,
                    zoom: that.zoom
                });
                that.createMarker();
            }
            var scriptName = 'https://maps.googleapis.com/maps/api/js?key=' + that.apiKey + '&callback=__initMap' + random;
            if (!that.$crud._resources[scriptName])
                that._loadScript(scriptName);
            else
                window['__initMap' + random]();
        },
        createMarker: function () {
            var that = this;
            var pos = {
                lat: that.lat,
                lng: that.lng
            }
            that.marker = new google.maps.Marker({
                position: pos,
                map: that.map,
                draggable: true,
            });
            that.marker.addListener("dragend", function () {
                that._setHiddenValues();
                //console.log('position',that.marker.position);
            });
        },
        searchAddress: function (event) {
            var that = this;
            console.log('searchAddress', jQuery(event.target).val());
            var address = jQuery(event.target).val();
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({'address': address}, function (results, status) {
                if (results) {
                    if (results.length > 1) {
                        console.warn('multiple values', results);
                    }
                    console.log('results', results)
                    var foundOk = false;
                    for (var key in results) {
                        var item = results[key];
                        //console.log('item',item,'status',status);
                        if (status == google.maps.GeocoderStatus.OK) {
                            var position = new google.maps.LatLng(item.geometry.location.lat(), item.geometry.location.lng());
                            that.marker.setPosition(position);
                            break;
                        }
                    }
                    that.map.setCenter(that.marker.position);
                    that._setHiddenValues();
                } else {
                    that.errorDialog(status);
                }
            });

        },
        _setHiddenValues: function () {
            var that = this;
            that.jQe('input[name="' + that.latName + '"]').val(that.marker.position.lat());
            that.jQe('input[name="' + that.lngName + '"]').val(that.marker.position.lng());
        }
    }
}
</script>

<style scoped>

</style>
