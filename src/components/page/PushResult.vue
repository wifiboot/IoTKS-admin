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
                <el-radio-button label="1">ROM升级</el-radio-button>
                <el-radio-button label="2">插件升级</el-radio-button>
                <el-radio-button label="3">脚本推送</el-radio-button>
            </el-radio-group>
            <div class="handle-box2">
                <el-input v-model="select_word" placeholder="请输入任务ID" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
        </div>

        <el-table :data="listData" border style="width: 100%" ref="multipleTable">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="hostname">
                            <span>{{JSON.parse(props.row.response_msg).hostname }}</span>
                        </el-form-item>
                        <el-form-item label="boardname">
                            <span>{{JSON.parse(props.row.response_msg).boardname}}</span>
                        </el-form-item>
                        <el-form-item label="fwversion">
                            <span>{{ JSON.parse(props.row.response_msg).fwversion }}</span>
                        </el-form-item>
                        <el-form-item label="ssid">
                            <span>{{ JSON.parse(props.row.response_msg).ssid }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="request_msg" label="操作" width="100">
                <template slot-scope="scope">
                    <el-tag>{{JSON.parse(scope.row.request_msg).item == 'sysinfo'?'ROM升级':'其他'}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="request_timestamp" label="时间" width="160"></el-table-column>
            <el-table-column prop="user_id" label="任务ID" width="90"></el-table-column>
            <el-table-column prop="mac" label="指定MAC" width="150"></el-table-column>
            <el-table-column prop="status" label="升级方式" width="100"></el-table-column>
            <el-table-column label="结果" width="180">
                <el-table-column prop="response_msg" label="成功">
                    <template slot-scope="scope">
                        <el-tag type="success">{{JSON.parse(scope.row.response_msg).hostname}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="jg.sb" label="失败">
                    <template slot-scope="scope">
                        <el-tag type="danger">{{JSON.parse(scope.row.response_msg).item}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="jg.zxz" label="执行中">
                    <template slot-scope="scope">
                        <el-tag type="warning">{{JSON.parse(scope.row.response_msg).mac}}</el-tag>
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column prop="user_name" label="操作人" width="120"></el-table-column>
            <el-table-column label="详情">
                <template slot-scope="scope">
                    <el-button class="btn1" type="info" size="small" @click="handleEdit(scope.row.rwid)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagecont">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
            </el-pagination>
        </div>

    </div>
</template>

<script>
    import axios from 'axios';
    import Datasource from 'vue-datasource';
    import global_ from 'components/common/Global';
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

                radio3:'1',

                tableData2:[
                    {
                        "request_msg":{"item":"sysinfo","id":"c6219104-653a-4a41-9b59-fcceaba97941"},
                        "request_timestamp":"2017-11-28 18:18:29",
                        "user_id":"01029",
                        "mac":"D4EE71263AA",
                        "sjfs":"实时自动",
                        "jg":{
                            "cg":0,
                            "sb":1,
                            "zxz":4
                        },
                        "user_name":"王集",
                    },
                    {
                        "request_msg":{"item":"sysinfo","id":"c6219104-653a-4a41-9b59-fcceaba97941"},
                        "request_timestamp":"2017-11-28 18:18:29",
                        "user_id":"01029",
                        "mac":"D4EE71263AA",
                        "sjfs":"实时自动",
                        "jg":{
                            "cg":0,
                            "sb":1,
                            "zxz":4
                        },
                        "user_name":"王集",
                    },
                    {
                        "request_msg":{"item":"sysinfo","id":"c6219104-653a-4a41-9b59-fcceaba97941"},
                        "request_timestamp":"2017-11-28 18:18:29",
                        "user_id":"01029",
                        "mac":"D4EE71263AA",
                        "sjfs":"实时自动",
                        "jg":{
                            "cg":0,
                            "sb":1,
                            "zxz":4
                        },
                        "user_name":"王集",
                    },
                    {
                        "request_msg":{"item":"sysinfo","id":"c6219104-653a-4a41-9b59-fcceaba97941"},
                        "request_timestamp":"2017-11-28 18:18:29",
                        "user_id":"01029",
                        "mac":"D4EE71263AA",
                        "sjfs":"实时自动",
                        "jg":{
                            "cg":0,
                            "sb":1,
                            "zxz":4
                        },
                        "user_name":"王集",
                    }
                ],
                select_word:'',
                listData:[],
                currentPage:1

            }
        },
        created:function(){
            this.getList();
        },
        components: {},
        methods: {
            getList: function(){
                var self = this;
                var params = {
//                    page_size:"10",
                    current_page:"1"
                }
                self.$axios({
                    method:'post',
                    headers: {'Content-Type': 'application/json'},
                    url: global_.baseUrl + '/task/list',
                    data:params
                }).then(function(response) {
                    console.log(response.data);
                    self.listData = response.data.message;
                },function(err){
                    console.log(err);
                });
            },
            getData:function(){
                const self = this;
                return self.information.data.filter(function (d) {
                    if(d.name.indexOf(self.query) > -1){
                        return d;
                    }
                })
            },
            handleEdit: function(taskid){
//                this.$router.push('/pushresultdetail/'+taskid);
                this.$router.push('/pushresultdetail');
            },
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
            handleSizeChange:function(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange:function(val) {
                console.log(`当前页: ${val}`);
            },
            changePage:function(values) {
                this.information.pagination.per_page = values.perpage;
                this.information.data = this.information.data;
            },
            onSearch(searchQuery) {
                this.query = searchQuery;
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
    .demo-table-expand {  font-size: 0;  }
    .demo-table-expand label {  width: 90px;  color: #99a9bf;}
    .demo-table-expand .el-form-item {  margin-right: 0;  margin-bottom: 0;  width: 33%;  }
    .rad-group{margin-bottom:20px;}
    .handle-input{  width: 300px;  display: inline-block;  }
    .handle-box2{display:inline-block;float:right;}
    .pagecont{margin-top:30px;}
</style>
