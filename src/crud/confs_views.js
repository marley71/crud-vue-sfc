var confs_views = {
    // 'v-hasmany' : {
    //     confParent : 'v-collection',
    //     defaultWidgetType : 'w-input',
    // },
    'v-hasmany-view' : {
        confParent : 'v-collection',
        defaultWidgetType : 'w-text',
    },
    'v-hasone' : {
        confParent : 'v-record',
        defaultWidgetType : 'w-input',
        loaded : false,
    }
}

export default confs_views
