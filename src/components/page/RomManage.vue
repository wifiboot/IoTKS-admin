<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-star-on"></i> ROM管理</el-breadcrumb-item>
                <el-breadcrumb-item>ROM列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box rad-group">
            <el-button type="primary" icon="plus" class="handle-del mr10" @click="dialogFormVisible=true">创建版本</el-button>
        </div>
        <el-table :data="tableData2" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <!--<el-table-column label="状态" width="100":filters="[{ text: '离线', value: '离线' }, { text: '未激活', value: '未激活' }]" :filter-method="filterTag">-->
                <!--<template slot-scope="scope">-->
                    <!--<el-tag :type="scope.row.zt == '离线' ? 'warning' : 'success'" close-transition>{{scope.row.zt}}</el-tag>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column prop="cjsj" label="创建时间" width="170"></el-table-column>
            <el-table-column prop="bbh" label="版本号" width="100"></el-table-column>
            <el-table-column label="版本类型" width="110" :filters="[{ text: 'test', value: '测试版本' }, { text: 'official', value: '正式版本' }]" :filter-method="filterTag">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.bblx == 'test' ? 'warning' : 'success'"  size="small" close-transition>{{scope.row.bblx=='test'?'测试版本':'正式版本'}}</el-tag>
                </template>
            </el-table-column>
            <!--<el-table-column label="51盒子状态" width="150">-->
                <!--<template scope="scope">-->
                    <!--<el-tag type="warning">{{scope.row.hzzt}}</el-tag>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column prop="sbxh" label="设备型号" width="100"></el-table-column>
            <el-table-column prop="xpxh" label="芯片型号" width="150"></el-table-column>
            <el-table-column prop="gxsm" label="更新说明" width="160"></el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button class="btn1" type="text" size="small" @click="handleEdit(scope.$index, scope.row)">下载</el-button>
                    <el-button class="btn1" type="text" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button class="btn1" type="text" size="small" @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
                    <el-button class="btn1" type="text" size="small" @click="handleEdit(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                @current-change ="handleCurrentChange"
                layout="prev, pager, next"
                :total="1000">
            </el-pagination>
        </div>

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

                dialogFormVisible:false,
                radio3:'全部',
                tableData2:[
                    {
                        "cjsj":"2017-11-17 14:05:58",
                        "bbh":"2.11.2514",
                        "bblx":"test",
                        "sbxh":"zc9525a",
                        "xpxh":"MT7628AN",
                        "gxsm":"企业智能中枢测试"
                    },
                    {
                        "cjsj":"2017-11-17 14:05:58",
                        "bbh":"2.11.2514",
                        "bblx":"official",
                        "sbxh":"zc9525a",
                        "xpxh":"MT7628AN+MT7610E",
                        "gxsm":"LD"
                    },
                    {
                        "cjsj":"2017-11-17 14:05:58",
                        "bbh":"2.11.2514",
                        "bblx":"official",
                        "sbxh":"zc9525a",
                        "xpxh":"MT7628AN",
                        "gxsm":"航信打印版本"
                    },
                    {
                        "cjsj":"2017-11-17 14:05:58",
                        "bbh":"2.11.2514",
                        "bblx":"test",
                        "sbxh":"zc9525a",
                        "xpxh":"MT7628AN",
                        "gxsm":"企业智能中枢测试"
                    }


                ]

            }
        },
        components: {
            Datasource
        },
        methods: {
            filterTag(value, row) {
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
            changeTab: function(){
                console.log(this.radio3);
                this.$message('选择'+ this.radio3);
            },
            handleCurrentChange:function(val){
                this.cur_page = val;
                this.getData();
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
    /*.el-table_1_column_5{color:#eb9e05;}*/
    .orange{color:#eb9e05;background-color:none;}
    .rad-group{margin-bottom:20px;}
    .btn2{margin-bottom:5px;margin-left:0;}
</style>
