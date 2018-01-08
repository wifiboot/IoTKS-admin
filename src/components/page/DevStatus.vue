<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i> 设备管理</el-breadcrumb-item>
                <el-breadcrumb-item>设备状态</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class='rad-group'>
            <el-radio-group v-model="radio3" @change="changeTab">
                <el-radio-button label="all">全部</el-radio-button>
                <el-radio-button label="online">在线</el-radio-button>
                <el-radio-button label="offline">离线</el-radio-button>
            </el-radio-group>
            <div class="handle-box2">
                <el-input v-model="select_word" placeholder="请输入设备MAC" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
        </div>

        <el-table :data="listData" border style="width: 100%" ref="multipleTable" v-loading="loading">
            <el-table-column label="状态" width="100":filters="[{ text: 'online', value: '在线' }, { text: 'offline', value: '离线' }]" :filter-method="filterTag">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status == 'offline' ? 'warning' : 'success'" close-transition>{{scope.row.status == 'online'?'在线':(scope.row.status == 'inactive'?'未激活':'离线')}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="mac" label="路由Mac" width="180"></el-table-column>
            <el-table-column prop="dev_type" label="设备型号" width="150"></el-table-column>
            <el-table-column prop="rom_verion" label="固件版本" width="150"></el-table-column>
            <el-table-column label="51盒子状态" width="150">
                <template slot-scope="scope">
                    <el-tag type="warning" class="orange">{{scope.row.hzzt}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="dyjzt" label="打印机状态" width="120">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.dyjzt == 'online'?'success': (scope.row.dyjzt == 'offline'?'danger':'warning')">{{scope.row.dyjzt == 'online'?'在线': (scope.row.dyjzt == 'offline'?'离线':'未知')}}</el-tag>
                </template>
            </el-table-column>
            <!--<el-table-column prop="gl" label="操作"></el-table-column>-->
            <el-table-column label="详情">
                <template slot-scope="scope">
                    <el-button class="btn1" type="info" size="small" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                @current-change ="handleCurrentChange"
                :current-page="currentPage"
                layout="prev, pager, next"
                :total="pageTotal">
            </el-pagination>
        </div>

    </div>
</template>

<script>
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

                radio3:'all',
                tableData2:[
                    {
                        "zt":"离线",
                        "lymac":"D4ee073BB0E0",
                        "sbxh":"zc9525a",
                        "gjbb":"1.08.1659",
                        "hzzt":0,
                        "dyjzt":"online",
                        "gl":"无线信息"
                    },
                    {
                        "zt":"未激活",
                        "lymac":"D4ee073BB0E0",
                        "sbxh":"9525a",
                        "gjbb":"1.03.599",
                        "hzzt":0,
                        "dyjzt":"offline",
                        "gl":"无线信息"
                    },
                    {
                        "zt":"离线",
                        "lymac":"D4ee073BB0E0",
                        "sbxh":"zc9525a",
                        "gjbb":"1.08.1659",
                        "hzzt":0,
                        "dyjzt":"offline",
                        "gl":"无线信息"
                    }

                ],
                select_word:'',

                loading:false,
                pageTotal:0,
                listData:[],
                currentPage:1

            }
        },
        created: function(){
            this.getData({},'');
        },
        methods: {
            getData: function(params,url){
                var self = this;
                self.loading = true;
                // var params = {
                //    page_size:10,
                //    current_page:1,
                //    sort:'asc'
                // };
                self.$axios.post(global_.baseUrl+'/device/list'+url ,params).then(function(res){
                   // console.log(res);
                    self.loading = false;
                    if(res.data.ret_code == 0){
                        if(JSON.stringify(params) == '{}'){
                            self.pageTotal = res.data.extra.length;
                            self.listData = res.data.extra.slice(0,10);
                        }else{
                            self.listData = res.data.extra;
                        }
                    }
                })
            },
            changeTab: function(){
                var url = '';
                if(this.radio3 == 'all'){
                    url = '';
                }else{
                    url = '/'+this.radio3;
                }
                this.getData({},url);
            },
            handleCurrentChange:function(val){
                this.currentPage = val;
                console.log(this.radio3,this.currentPage);
                var url = '';
                if(this.radio3 == 'all'){
                    url = '';
                }else{
                    url = '/'+this.radio3;
                }
                this.getData({page_size:10,current_page:this.currentPage},url);
            },
            search: function(){

            },
            filterTag:function(value, row) {
                return row.zt === value;
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
            changePage:function(values) {
                this.information.pagination.per_page = values.perpage;
                this.information.data = this.information.data;
            },
            onSearch:function(searchQuery) {
                this.query = searchQuery;
            }
        }
    }
</script>

<style src="../../../static/css/datasource.css"></style>
<style>
    .rad-group{margin-bottom:20px;}
    .handle-input{  width: 300px;  display: inline-block;  }
    .handle-box2{display:inline-block;float:right;}
    /*.el-table_1_column_5{color:#eb9e05;}*/
    .orange{color:#eb9e05;background-color:none;}
</style>
