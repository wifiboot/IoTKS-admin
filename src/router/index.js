import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/readme',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/',
                    component: resolve => require(['../components/page/Readme.vue'], resolve)
                },
                {
                    path: '/basetable',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve)
                },
                {
                    path: '/setpush',
                        component: resolve => require(['../components/page/SetPush.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/pushresult',
                        component: resolve => require(['../components/page/PushResult.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/devstatus',
                        component: resolve => require(['../components/page/DevStatus.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/rommanage',
                        component: resolve => require(['../components/page/RomManage.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/pluginmanage',
                        component: resolve => require(['../components/page/PluginManage.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/scriptmanage',
                        component: resolve => require(['../components/page/ScriptManage.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/modelmanage',
                        component: resolve => require(['../components/page/ModelManage.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/vuetable',
                    component: resolve => require(['../components/page/VueTable.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/baseform',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve)
                },
                {
                    path: '/vueeditor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve)    // Vue-Quill-Editor组件
                },
                {
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve)     // Vue-Quill-Editor组件
                },
                {
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve)       // Vue-Core-Image-Upload组件
                },
                {
                    path: '/basecharts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve)   // vue-schart组件
                },
                {
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve)    // 拖拽列表组件
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
