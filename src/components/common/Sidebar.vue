<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import global_ from 'components/common/Global';
    export default {
        data() {
            return {
                items: [
                    {
                        icon: 'el-icon-menu',
                        index: '2',
                        title: '渠道管理',
                        subs: [
                            {
                                index: 'basetable',
                                title: '渠道列表'
                            },
                        ]
                    },
                    {
                        icon: 'el-icon-upload',
                        index: '3',
                        title: '批量执行任务',
                        subs: [
                            {
                                index: 'setpush',
                                title: '发起推送'
                            },
                            {
                                index: 'pushresult',
                                title: '推送结果'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-setting',
                        index: '4',
                        title: '设备管理',
                        subs: [
                            {
                                index: 'devstatus',
                                title: '设备状态'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-star-on',
                        index: '5',
                        title: 'ROM管理',
                        subs: [
                            {
                                index: 'rommanage',
                                title: 'ROM列表'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-date',
                        index: '6',
                        title: '插件管理',
                        subs: [
                            {
                                index: 'pluginmanage',
                                title: '插件列表'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-document',
                        index: '7',
                        title: '脚本管理',
                        subs: [
                            {
                                index: 'scriptmanage',
                                title: '脚本列表'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-share',
                        index: '8',
                        title: '设备型号管理',
                        subs: [
                            {
                                index: 'modelmanage',
                                title: '设备型号列表'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-star-off',
                        index: '9',
                        title: '辅助工具',
                        subs: [
                            {
                                index: 'sysinfo',
                                title: '路由SYSINFO查询'
                            }
                        ]
                    }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        methods:{
            getUser: function(){
                var self = this;
                self.$axios.post(global_.baseUrl+'/admin/info').then(function(res){
                    if(res.data.ret_code == 0){
                        self.curUser = res.data.ret_msg;
                        if(self.curUser == '1'){//普通管理员
                            self.items = [
                                {
                                    icon: 'el-icon-menu',
                                    index: '2',
                                    title: '渠道管理',
                                    subs: [
                                        {
                                            index: 'basetable',
                                            title: '渠道列表'
                                        },
                                    ]
                                },
                                {
                                    icon: 'el-icon-upload',
                                    index: '3',
                                    title: '批量执行任务',
                                    subs: [
                                        {
                                            index: 'setpush',
                                            title: '发起推送'
                                        },
                                        {
                                            index: 'pushresult',
                                            title: '推送结果'
                                        }
                                    ]
                                },
                                {
                                    icon: 'el-icon-setting',
                                    index: '4',
                                    title: '设备管理',
                                    subs: [
                                        {
                                            index: 'devstatus',
                                            title: '设备状态'
                                        }
                                    ]
                                },
                                {
                                    icon: 'el-icon-star-off',
                                    index: '9',
                                    title: '辅助工具',
                                    subs: [
                                        {
                                            index: 'sysinfo',
                                            title: '路由SYSINFO查询'
                                        }
                                    ]
                                }
                            ]
                        }else{
                            self.items = [
                                {
                                    icon: 'el-icon-menu',
                                    index: '2',
                                    title: '渠道管理',
                                    subs: [
                                        {
                                            index: 'basetable',
                                            title: '渠道列表'
                                        },
                                    ]
                                },
                                {
                                    icon: 'el-icon-upload',
                                    index: '3',
                                    title: '批量执行任务',
                                    subs: [
                                        {
                                            index: 'setpush',
                                            title: '发起推送'
                                        },
                                        {
                                            index: 'pushresult',
                                            title: '推送结果'
                                        }
                                    ]
                                },
                                {
                                    icon: 'el-icon-setting',
                                    index: '4',
                                    title: '设备管理',
                                    subs: [
                                        {
                                            index: 'devstatus',
                                            title: '设备状态'
                                        }
                                    ]
                                },
                                {
                                    icon: 'el-icon-star-on',
                                    index: '5',
                                    title: 'ROM管理',
                                    subs: [
                                        {
                                            index: 'rommanage',
                                            title: 'ROM列表'
                                        }
                                    ]
                                },
                                {
                                    icon: 'el-icon-date',
                                    index: '6',
                                    title: '插件管理',
                                    subs: [
                                        {
                                            index: 'pluginmanage',
                                            title: '插件列表'
                                        }
                                    ]
                                },
                                {
                                    icon: 'el-icon-document',
                                    index: '7',
                                    title: '脚本管理',
                                    subs: [
                                        {
                                            index: 'scriptmanage',
                                            title: '脚本列表'
                                        }
                                    ]
                                },
                                {
                                    icon: 'el-icon-share',
                                    index: '8',
                                    title: '设备型号管理',
                                    subs: [
                                        {
                                            index: 'modelmanage',
                                            title: '设备型号列表'
                                        }
                                    ]
                                },
                                {
                                    icon: 'el-icon-star-off',
                                    index: '9',
                                    title: '辅助工具',
                                    subs: [
                                        {
                                            index: 'sysinfo',
                                            title: '路由SYSINFO查询'
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                })
            },
        },
        mounted: function(){
            this.getUser();
        },
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
