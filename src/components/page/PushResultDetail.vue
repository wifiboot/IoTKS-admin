<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-upload"></i> 批量执行任务</el-breadcrumb-item>
                <el-breadcrumb-item>执行结果</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class=''>
            <div class="handle-box2 rad-group">
                <el-input v-model="select_word" placeholder="请输入任务ID" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
        </div>
        <el-table :data="appsData" border style="width: 100%" ref="multipleTable">
            <!--<el-table-column type="selection" width="55"></el-table-column>-->
            <el-table-column prop="response_timestamp" label="完成时间" width="180"></el-table-column>
            <el-table-column prop="mac" label="路由MAC" width="140"></el-table-column>
            <el-table-column prop="pubsub_status" label="设备状态" width="100">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.pubsub_status == 'response_ok' ? 'success' : 'warning'" close-transition>{{scope.row.pubsub_status == 'response_ok'?'在线': (scope.row.sbzt == 'offline'?'离线':'未知')}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="" label="之前版本" width="140"></el-table-column>
            <el-table-column prop="" label="更新后版本" width="120"></el-table-column>
            <el-table-column prop="operator_name" label="推送人" width="100"></el-table-column>
            <el-table-column prop="sjzt" label="升级状态" width="100">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.sjzt == 'success' ? 'success' : 'danger'" close-transition>{{scope.row.sjzt == 'success'?'成功': (scope.row.sjzt == 'fail'?'失败':'未知')}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button class="btn1" type="info" size="small" @click="handleEdit(scope.row.lymac)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>


    </div>
</template>

<script>
    import global_ from 'components/common/Global';
    export default {
        data: function(){
            const self = this;
            return {
                curId:'',
                curRadio:'',
                loading:false,
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

                appsData:[],
                filewareData:[],
                select_word:''

            }
        },
        created: function(){
            this.getParams();
        },
        methods: {
            getParams: function(){
                var self = this;
                self.curId = self.$route.query.curid;
                self.curRadio = self.$route.query.curRadio;
                if(self.curRadio == 'apps'){//插件升级
                    self.getAppsDetailData();
                }
                if(self.curRadio == 'firmware'){
                    self.getFirmwareData();
                }
            },
            getAppsDetailData: function(){
                var self = this;
                self.$axios.post(global_.baseUrl+'/manage/apps_detail',{uuid:self.curId}).then(function(res){
                    self.loading = false;
                    if(res.data.ret_code == '1001'){
                        self.$message({message:res.data.extra,type:'warning'});
                        setTimeout(function(){
                            self.$router.replace('login');
                        },2000)
                    }
                    if(res.data.ret_code == 0){
                        self.appsData = res.data.extra
                    }else{
                        self.$message.error(res.data.extra)
                    }
                },function(err){
                    self.loading = false;
                    console.log(err);
                });
            },
            getFirmwareData: function(){
                var self = this;
                self.$axios.post(global_.baseUrl+'/task/list/detail',{uuid:self.curId}).then(function(res){
                    self.loading = false;
                    if(res.data.ret_code == '1001'){
                        self.$message({message:res.data.extra,type:'warning'});
                        setTimeout(function(){
                            self.$router.replace('login');
                        },2000)
                    }
                    if(res.data.ret_code == 0){
                        self.filewareData = res.data.extra
                    }else{
                        self.$message.error(res.data.extra)
                    }
                },function(err){
                    self.loading = false;
                    console.log(err);
                });
            },
            handleEdit: function(mac){
                this.$router.push('/updateromstatus');
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
            handleCurrentChange:function(val){
//                this.cur_page = val;
//                this.getData();
            },
            changePage:function(values) {
                this.information.pagination.per_page = values.perpage;
                this.information.data = this.information.data;
            },
            onSearch:function(searchQuery) {
                this.query = searchQuery;
            }
        },
        computed:{
            getData:function(){
                const self = this;
                return self.information.data.filter(function (d) {
                    if(d.name.indexOf(self.query) > -1){
                        return d;
                    }
                })
            }
        },
    }
</script>
<style>
    .rad-group{margin-bottom:20px;}
    .handle-input{  width: 300px;  display: inline-block;  }
    .handle-box2{display:inline-block;float:right;}
</style>
