/**
 * Created by pier on 20/12/17.
 */

import jQuery from "jquery";

const Server = {};


/**
 * ritorna l'url reale nel dominio in cui si lavora
 * in caso di subdomain aggiunge il subdomain all'url passato
 * @param url, url a cui aggiungere il prefisso subdomain
 * @returns {*}
 *
 * **/
Server.getUrl = function (url) {
    return Server.subdomain?Server.subdomain + url:url;
};

Server.getHearders = function() {
    return {
        'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
    }
}

Server.post = function (url, params, callback) {
    var realUrl = Server.getUrl(url);
    jQuery.ajax({
        url: realUrl,
        headers: Server.getHearders(),
        type: 'POST',
        data: params,
    }).done(function(json) {
        callback(json);
    }).fail(function (data, error, msg) {
        callback({error:1,msg:msg});
    });
};

Server.get = function (url, params, callback) {
    var realUrl = Server.getUrl(url);
    jQuery.ajax({
        url: realUrl,
        headers: Server.getHearders(),
        type: 'GET',
        data: params,
    }).done(function(json) {
        callback(json);
    }).fail(function (data, error, msg) {
        callback({error:1,msg:msg});
    });
};

Server.route = function(route,callback) {
    var __cb = callback?callback:function (json) {console.debug(route.className,json)};
    var realUrl = Server.getUrl(route.getUrl());
    var params = route.getParams();
    Server[route.getMethod()](realUrl,params,function (json) {
        __cb(json);
    })
};

Server.subdomain = null;

export default Server;
