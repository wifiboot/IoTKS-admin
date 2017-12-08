<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-upload"></i> 批量执行任务</el-breadcrumb-item>
                <el-breadcrumb-item>推送结果</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class='rad-group'>
            <el-radio-group v-model="radio3" @change="changeTab">
                <el-radio-button label="ROM升级"></el-radio-button>
                <el-radio-button label="插件升级"></el-radio-button>
                <el-radio-button label="脚本推送"></el-radio-button>
            </el-radio-group>
            <div class="handle-box2">
                <el-input v-model="select_word" placeholder="请输入任务ID" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
        </div>

        <!--<div class="plugins-tips">vue-datasource：一个用于动态创建表格的vue.js服务端组件。访问地址：-->
            <!--<a href="https://github.com/coderdiaz/vue-datasource" target="_blank">vue-datasource</a>-->
        <!--</div>-->
        <!--<datasource language="en" :table-data="getData" :columns="columns" :pagination="information.pagination"
                :actions="actions"
                v-on:change="changePage"
                v-on:searching="onSearch"></datasource>-->

        <el-table :data="tableData2" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <!--<el-table-column type="selection" width="55"></el-table-column>-->
            <el-table-column prop="cz" label="操作" width="100"></el-table-column>
            <el-table-column prop="sj" label="时间" width="180"></el-table-column>
            <el-table-column prop="rwid" label="任务ID" width="90"></el-table-column>
            <el-table-column prop="zdmac" label="指定MAC" width="140"></el-table-column>
            <el-table-column prop="sjfs" label="升级方式" width="100"></el-table-column>
            <el-table-column label="结果" width="240">
                <el-table-column prop="jg.cg" label="成功"></el-table-column>
                <el-table-column prop="jg.sb" label="失败"></el-table-column>
                <el-table-column prop="jg.zxz" label="执行中"></el-table-column>
            </el-table-column>
            <el-table-column prop="czr" label="操作人" width="80"></el-table-column>
            <el-table-column label="详情">
                <template slot-scope="scope">
                    <el-button class="btn1" type="info" size="small" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>


    </div>
</template>

<script>
    import axios from 'axios';
    import Datasource from 'vue-datasource';
    export default {
        data: function(){
            const self = this;
            return {
                url: './static/datasource.json',
                information: {
                    pagination:{},
                    data:[]
                },
                columns: [
                    {
                        name: 'Id',
                        key: 'id',
                    },
                    {
                        name: 'Name',
                        key: 'name',
                    },
                    {
                        name: 'email',
                        key: 'email',
                    },
                    {
                        name: 'ip',
                        key: 'ip',
                    }
                ],
                actions: [
                    {
                        text: 'Click',
                        class: 'btn-primary',
                        event: function(e, row) {
                            self.$message('选中的行数： ' + row.row.id)
                        }
                    }
                ],
                query:'',

                radio3:'ROM升级',

                tableData2:[
                    {
                        "cz":"ROM升级",
                        "sj":"2017-11-28 18:18:29",
                        "rwid":"01029",
                        "zdmac":"D4EE71263AA",
                        "sjfs":"实时自动",
                        "jg":{
                            "cg":0,
                            "sb":1,
                            "zxz":4
                        },
                        "czr":"王集",
                    },
                    {
                        "cz":"ROM升级",
                        "sj":"2017-11-28 18:18:29",
                        "rwid":"01029",
                        "zdmac":"D4EE71263AA",
                        "sjfs":"实时自动",
                        "jg":{
                            "cg":0,
                            "sb":1,
                            "zxz":4
                        },
                        "czr":"王集",
                    },
                    {
                        "cz":"ROM升级",
                        "sj":"2017-11-28 18:18:29",
                        "rwid":"01029",
                        "zdmac":"D4EE71263AA",
                        "sjfs":"实时自动",
                        "jg":{
                            "cg":0,
                            "sb":1,
                            "zxz":4
                        },
                        "czr":"王集",
                    },
                    {
                        "cz":"ROM升级",
                        "sj":"2017-11-28 18:18:29",
                        "rwid":"01029",
                        "zdmac":"D4EE71263AA",
                        "sjfs":"实时自动",
                        "jg":{
                            "cg":0,
                            "sb":1,
                            "zxz":4
                        },
                        "czr":"王集",
                    }
                ],
                select_word:''

            }
        },
        components: {
            Datasource
        },
        methods: {
            test: function(event){
                console.log(event);
            },
            arraySpanMethod: function(row, column, rowIndex, columnIndex){
                if (rowIndex % 2 === 0) {
                    if (columnIndex === 0) {
                        return [1, 2];
                    } else if (columnIndex === 1) {
                        return [0, 0];
                    }
                }
            },
            changeTab: function(){
                console.log(this.radio3);
//                this.$message('选择'+ this.radio3);
            },
            search: function(){

            },
            handleCurrentChange:function(val){
//                this.cur_page = val;
//                this.getData();
            },
            changePage(values) {
                this.information.pagination.per_page = values.perpage;
                this.information.data = this.information.data;
            },
            onSearch(searchQuery) {
                this.query = searchQuery;
            }
        },
        computed:{
            getData(){
                const self = this;
                return self.information.data.filter(function (d) {
                    if(d.name.indexOf(self.query) > -1){
                        return d;
                    }
                })
            }
        },
        beforeMount(){
            if(process.env.NODE_ENV === 'development'){
                this.url = '/ms/table/source';
            };
            axios.get(this.url).then( (res) => {
                this.information = res.data;
            })
        }
    }
</script>

<style src="../../../static/css/datasource.css"></style>
<style>
    .rad-group{margin-bottom:20px;}
    .handle-input{  width: 300px;  display: inline-block;  }
    .handle-box2{display:inline-block;float:right;}
</style>
