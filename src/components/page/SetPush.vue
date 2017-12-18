<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-upload"></i> 批量执行任务</el-breadcrumb-item>
                <el-breadcrumb-item>发起推送</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class='rad-group mb40'>
            <el-radio-group v-model="radio" @change="changeTab">
                <el-radio-button label="升级ROM"></el-radio-button>
                <el-radio-button label="安装插件"></el-radio-button>
                <el-radio-button label="推送脚本"></el-radio-button>
            </el-radio-group>
        </div>

        <div class="form-box tab-cont" v-if="showRadio0">
            <el-form ref="form" :model="form0" label-width="150px">
                <el-form-item label="输入指定MAC">
                    <el-input type="textarea" v-model="form0.desc"></el-input>
                </el-form-item>
                <el-form-item label="选择设备型号">
                    <el-select v-model="form0.devnum" placeholder="请选择">
                        <el-option key="bbk" label="R7800" value="bbk"></el-option>
                        <el-option key="xtc" label="小天才" value="xtc"></el-option>
                        <el-option key="imoo" label="imoo" value="imoo"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择分支">
                    <el-select v-model="form0.branch" placeholder="请选择">
                        <el-option key="bbk" label="普通分支(1.0只有这一个版本)" value="bbk"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择ROM版本">
                    <el-select v-model="form0.romversion" placeholder="请选择">
                        <el-option key="bbk" label="2.05.38061 R7800" value="bbk"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所选文件">
                    <text>http://cloud.kunteng.org/super/firmware/52123b95</text>
                </el-form-item>
                <el-form-item label="升级方式">
                    <el-radio-group v-model="form0.uptype">
                        <el-radio label="实时自动升级"></el-radio>
                        <el-radio label="用户自动升级"></el-radio>
                        <el-radio label="定时自动升级(整点时刻)"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="配置更新">
                    <el-radio-group v-model="form0.update">
                        <el-radio label="保留用户原有配置"></el-radio>
                        <el-radio label="更改用户原有配置(填选)"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="操作人">
                    <el-input v-model="form0.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">执行</el-button>
                    <!--<el-button>取消</el-button>-->
                </el-form-item>
            </el-form>
        </div>
        <div class="form-box tab-cont" v-if="showRadio1">
            <el-form ref="form" :model="form1" label-width="150px">
                <el-form-item label="输入指定MAC">
                    <el-input class="textarea-mac" type="textarea" v-model="form1.mac" placeholder="以换行符分割，最多输入100条mac"></el-input>
                </el-form-item>
                <el-form-item label="选择要安装的插件">
                    <!--<el-select v-model="form1.plug" placeholder="请选择">-->
                        <!--<el-option key="apbridge" label="apbridge" value="bbk"></el-option>-->
                        <!--<el-option key="apfree_wifidog" label="apfree_wifidog" value="xtc"></el-option>-->
                        <!--<el-option key="apmodectl" label="apmodectl" value="imoo"></el-option>-->
                        <!--<el-option key="apmodectl_wd" label="apmodectl_wd"" value="imoo"></el-option>-->
                        <!--<el-option key="cloudPlugin" label="cloudPlugin" value="imoo"></el-option>-->
                        <!--<el-option key="frpc" label="frpc" value="imoo"></el-option>-->
                        <!--<el-option key="jsInjector" label="jsInjector" value="imoo"></el-option>-->
                        <!--<el-option key="kt-base-files" label="kt-base-files" value="imoo"></el-option>-->
                        <!--<el-option key="luasocket" label="luasocket" value="imoo"></el-option>-->
                        <!--<el-option key="mosquitto" label="mosquitto" value="imoo"></el-option>-->
                        <!--<el-option key="jsInjector" label="jsInjector" value="imoo"></el-option>-->
                    <!--</el-select>-->
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                            v-for="item in pluginList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择插件的版本">
                    <el-select v-model="form1.plug" placeholder="请选择">
                        <el-option key="apbridge" label="0.7.22" value="bbk"></el-option>
                        <el-option key="apfree_wifidog" label="apfree_wifidog" value="xtc"></el-option>
                        <el-option key="apmodectl" label="apmodectl" value="imoo"></el-option>
                        <el-option key="apmodectl_wd" label="apmodectl_wd"" value="imoo"></el-option>
                        <el-option key="cloudPlugin" label="cloudPlugin" value="imoo"></el-option>
                        <el-option key="frpc" label="frpc" value="imoo"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">安装</el-button>
                    <!--<el-button>取消</el-button>-->
                </el-form-item>
            </el-form>
        </div>
        <div class="form-box tab-cont" v-if="showRadio2">
            <el-form ref="form" :model="form2" label-width="150px">
                <el-form-item label="输入指定MAC">
                    <el-input class="textarea-mac" type="textarea" v-model="form2.mac" placeholder="以换行符分割，最多输入100条mac"></el-input>
                </el-form-item>
                <el-form-item label="选择要安装的脚本">
                    <el-select v-model="form2.plug" placeholder="请选择">
                        <el-option key="apbridge" label="apbridge" value="bbk"></el-option>
                        <el-option key="apfree_wifidog" label="apfree_wifidog" value="xtc"></el-option>
                        <el-option key="apmodectl" label="apmodectl" value="imoo"></el-option>
                        <el-option key="apmodectl_wd" label="apmodectl_wd"" value="imoo"></el-option>
                        <el-option key="cloudPlugin" label="cloudPlugin" value="imoo"></el-option>
                        <el-option key="frpc" label="frpc" value="imoo"></el-option>
                        <el-option key="jsInjector" label="jsInjector" value="imoo"></el-option>
                        <el-option key="kt-base-files" label="kt-base-files" value="imoo"></el-option>
                        <el-option key="luasocket" label="luasocket" value="imoo"></el-option>
                        <el-option key="mosquitto" label="mosquitto" value="imoo"></el-option>
                        <el-option key="jsInjector" label="jsInjector" value="imoo"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择脚本的版本">
                    <el-select v-model="form2.plug" placeholder="请选择">
                        <el-option key="apbridge" label="0.7.22" value="bbk"></el-option>
                        <el-option key="apfree_wifidog" label="apfree_wifidog" value="xtc"></el-option>
                        <el-option key="apmodectl" label="apmodectl" value="imoo"></el-option>
                        <el-option key="apmodectl_wd" label="apmodectl_wd"" value="imoo"></el-option>
                        <el-option key="cloudPlugin" label="cloudPlugin" value="imoo"></el-option>
                        <el-option key="frpc" label="frpc" value="imoo"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">安装</el-button>
                    <!--<el-button>取消</el-button>-->
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                form0: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: true,
                    type: ['步步高'],
                    resource: '小天才',
                    desc: '',

                    devnum:'',
                    branch:'',
                    romversion:'',
                    uptype:'实时自动升级',
                    update:'保留用户原有配置'

                },

                radio:'升级ROM',
                showRadio0:true,
                showRadio1:false,
                showRadio2:false,
                form1:{
                    mac:'',
                    plug:''
                },
                form2:{
                    mac:'',
                    plug:''
                },
                pluginList:[
                    {
                        value:'apbridge',
                        label:'apbridge'
                    },{
                        value:'apfree_wifidog',
                        label:'apfree_wifidog'
                    },{
                        value:'frpc',
                        label:'frpc'
                    },{
                        value:'cloudPlugin',
                        label:'cloudPlugin'
                    },{
                        value:'apbridge',
                        label:'apbridge'
                    },{
                        value:'apmodectl',
                        label:'apmodectl'
                    },{
                        value:'kt-base-files',
                        label:'kt-base-files'
                    },{
                        value:'apbridge',
                        label:'apbridge'
                    },{
                        value:'jsInjector',
                        label:'jsInjector'
                    },{
                        value:'apbridge',
                        label:'apbridge'
                    }
                ]
            }
        },
        methods: {
            changeTab: function(){
                var self = this;
                console.log(this.radio);
                if(self.radio == '升级ROM'){
                    self.showRadio0 = true;
                    self.showRadio1 = false;
                    self.showRadio2 = false;
                }
                if(self.radio == '安装插件'){
                    self.showRadio0 = false;
                    self.showRadio1 = true;
                    self.showRadio2 = false;
                }
                if(self.radio == '推送脚本'){
                    self.showRadio0 = false;
                    self.showRadio1 = false;
                    self.showRadio2 = true;
                }
//                this.$message('选择'+ this.radio3);
            },
            onSubmit:function() {
                this.$message.success('提交成功！');
            }
        }
    }
</script>
<style>
    .mb40{margin-bottom:40px;}
    .tab-cont{padding:40px;border-top:1px solid #dfe6ec;}
    /*.textarea-mac{height:160px;}*/
</style>
