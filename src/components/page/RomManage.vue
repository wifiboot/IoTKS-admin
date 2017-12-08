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
        <el-table :data="tableData2" border style="width: 100%" ref="multipleTable">
            <!--<el-table-column label="状态" width="100":filters="[{ text: '离线', value: '离线' }, { text: '未激活', value: '未激活' }]" :filter-method="filterTag">-->
                <!--<template slot-scope="scope">-->
                    <!--<el-tag :type="scope.row.zt == '离线' ? 'warning' : 'success'" close-transition>{{scope.row.zt}}</el-tag>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column prop="cjsj" label="创建时间" width="170"></el-table-column>
            <el-table-column prop="bbh" label="版本号" width="100"></el-table-column>
            <el-table-column prop="oem" label="OEM" width="70"></el-table-column>
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
                <template slot-scope="scope">
                    <el-button class="btn1" type="text" size="small" @click="handleEdit(scope.$index, scope.row)">下载</el-button>
                    <el-button class="btn1" type="text" size="small" @click="handleEdit(scope.$index, scope.row)">删除</el-button>
                    <el-button class="btn1" type="text" size="small" @click="handleEdit(scope.$index, scope.row)">{{scope.row.bblx=='test'?'上架':'下架'}}</el-button>
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

        <el-dialog title="添加ROM版本" :visible.sync="dialogFormVisible" class="digcont">
            <el-form :model="form">
                <!--<el-form-item label="上传" :label-width="formLabelWidth">-->
                    <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-change="handleChange"
                        :file-list="fileList3">
                        <el-button size="small" type="primary">选择文件</el-button>
                        <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
                    </el-upload>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="form.password" class="diainp" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="渠道名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" class="diainp" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" :label-width="formLabelWidth">
                    <el-input v-model="form.tel" class="diainp" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="" :label-width="formLabelWidth">
                    <el-input v-model="form.addr" class="diainp2" auto-complete="off" placeholder="请输入详细地址"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">创 建</el-button>
            </div>
        </el-dialog>

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
                        "oem":"LD",
                        "bblx":"test",
                        "sbxh":"zc9525a",
                        "xpxh":"MT7628AN",
                        "gxsm":"企业智能中枢测试"
                    },
                    {
                        "cjsj":"2017-11-17 14:05:58",
                        "bbh":"2.11.2514",
                        "oem":"LD",
                        "bblx":"official",
                        "sbxh":"zc9525a",
                        "xpxh":"MT7628AN+MT7610E",
                        "gxsm":"LD"
                    },
                    {
                        "cjsj":"2017-11-17 14:05:58",
                        "bbh":"2.11.2514",
                        "oem":"ZC",
                        "bblx":"official",
                        "sbxh":"zc9525a",
                        "xpxh":"MT7628AN",
                        "gxsm":"航信打印版本"
                    },
                    {
                        "cjsj":"2017-11-17 14:05:58",
                        "bbh":"2.11.2514",
                        "oem":"LD",
                        "bblx":"test",
                        "sbxh":"zc9525a",
                        "xpxh":"MT7628AN",
                        "gxsm":"企业智能中枢测试"
                    }


                ],

                form: {
                    user:'',
                        password:'',
                        name: '',
                        tel:'',
                        selectProv: '',
                        selectCity: '',
                        addr:'',
                        region: '',
                        date1: '',
                        date2: '',
                        delivery: false,
                        type: [],
                        resource: '',
                        desc: ''
                },
                formLabelWidth: '120px',
                fileList3: [{
//                    name: 'food.jpeg',
//                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
//                    status: 'finished'
                }]

            }
        },
        components: {
            Datasource
        },
        methods: {
            filterTag:function(value, row) {
                return row.zt === value;
            },
            handleChange:function(file, fileList) {
                this.fileList3 = fileList.slice(-3);
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
    .btn2{margin-bottom:5px;margin-left:0;}
    .diainp{width:217px;}
    .diainp2{width:400px;}
</style>
