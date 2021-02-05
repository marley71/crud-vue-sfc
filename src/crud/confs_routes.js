var conf_routes = {
    list: {
        method: 'get',
        url: '/foorm/{modelName}',
        resultType: 'list',
        protocol: 'list',
        commonParams: {},  //parametri statici da aggiungere sempre alla chiamata
        values: {}, // vettore associativo dei parametri per la costruzione dell'url
        params: {},
    },
    uploadfile: {
        method: 'post',
        //url         : '/api/json/{modelName}/uploadfile',
        url: '/uploadfile',
        resultType: 'record',
        protocol: 'record',
        commonParams: {},  //parametri statici da aggiungere sempre alla chiamata
        values: {}, // vettore associativo dei parametri per la costruzione dell'url
        params: {},
    },
    upload: {
        method: 'post',
        url: '/upload',
        resultType: 'record',
        protocol: 'record',
        commonParams: {},  //parametri statici da aggiungere sempre alla chiamata
        values: {}, // vettore associativo dei parametri per la costruzione dell'url
        params: {},
    },
    insert: {
        method: "get",
        url: '/foorm/{modelName}/new',
        resultType: 'record',
        protocol: 'record',
        type: 'create',
    },
    update: {
        method: "post",
        url: '/foorm/{modelName}/{pk}',
        resultType: 'record',
        protocol: 'record',
        type: 'update',
        commonParams: {_method: 'PUT'}
    },
    create: {
        method: "post",
        url: '/foorm/{modelName}',
        resultType: 'record',
        protocol: 'record',
        type: 'create',
        commonParams: {_method: 'POST'}
    },
    edit: {
        method: "get",
        url: '/foorm/{modelName}/{pk}/edit',
        //url         :'/foorm/{modelName}/{pk}/edit',
        resultType: 'record',
        protocol: 'record',
        type: 'update',
    },
    search: {
        method: "get",
        url: '/foorm/{modelName}/search',
        //url         :'/foorm/{modelName}/{pk}/edit',
        resultType: 'record',
        protocol: 'record'
    },
    view: {
        method: "get",
        url: '/foorm/{modelName}/{pk}/view',
        resultType: 'record',
        protocol: 'record',
        type: 'read',
    },
    delete: {
        method: "post",
        //url: '/foorm/{modelName}/{pk}',
        url : '/foormaction/delete/{modelName}/list',
        resultType: 'record',
        protocol: 'record',
        type: 'delete',
        commonParams: {_method: 'DELETE'}
    },
    'multi-delete': {
        method: "post",
        url: '/foorm/{modelName}/multi-delete',
        resultType: 'record',
        protocol: 'record',
        type: 'delete'
    },
    autocomplete: {
        method: "post",
        url: "/foormaction/autocomplete/{foormName}/{viewType}",
        resultType: 'list',
        protocol: 'list'

    },
    set: {
        method: "post",
        //url: '/api/json/set/{modelName}/{field}/{value}',
        url : "/foormaction/set/{modelName}/list",
        resultType: 'record',
        protocol: 'record'
    },
    pages: {
        url: '/crud/page/{path}',
    }
}

export default conf_routes
