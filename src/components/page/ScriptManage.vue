<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-document"></i> 脚本管理</el-breadcrumb-item>
                <el-breadcrumb-item>脚本列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-button type="primary" icon="plus" class="handle-del mr10" @click="dialogFormVisible=true">上传脚本</el-button>
        </div>
        <el-table :data="tableData2" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column prop="cjmc" label="插件名称" width="130"></el-table-column>
            <el-table-column prop="bbh" label="版本号" width="130"></el-table-column>
            <el-table-column prop="kfz" label="开发者" width="130"></el-table-column>
            <el-table-column prop="scsj" label="上传时间" width="180"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button class="btn1" size="small" type="success" @click="resetPwd(scope.$index, scope.row)">下载</el-button>
                    <el-button class="btn1" size="small" type="danger" @click="toRouter(scope.row)">删除</el-button>
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

        <el-dialog title="添加脚本文件" :visible.sync="dialogFormVisible" class="digcont">
            <el-form :model="form">
                <el-form-item label="上传脚本" :label-width="formLabelWidth">
                    <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :file-list="fileList">
                        <el-button size="small" type="primary">选择文件</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="脚本名称" :label-width="formLabelWidth">
                    <el-input v-model="form.password" class="diainp" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="版本号" :label-width="formLabelWidth">
                    <el-input v-model="form.name" class="diainp" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="开发者" :label-width="formLabelWidth">
                    <el-input v-model="form.tel" class="diainp" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="脚本说明" :label-width="formLabelWidth">
                    <el-input v-model="form.addr" class="diainp" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">添 加</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import global_ from 'components/common/Global';
    export default {
        data: function() {
            return {
                url: './static/vuetable.json',
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,

                radio3:'全部',
                tableData2:[
                    {
                        "cjmc":"apbridge",
                        "bbh": "0.7.2.2",
                        "kfz":"王爱明",
                        "scsj":'2017/11/13 11:41'
                    },{
                        "cjmc":"apfree_wifidog",
                        "bbh": "2.3.0.7.2.2",
                        "kfz":"张华",
                        "scsj":'2017/11/13 18:20'
                    },{
                        "cjmc":"apbridge",
                        "bbh": "0.7.2.2",
                        "kfz":"傅山",
                        "scsj":'2017/11/13 11:41'
                    },{
                        "cjmc":"apbridge",
                        "bbh": "0.7.2.2",
                        "kfz":"我爱罗",
                        "scsj":'2017/11/13 11:41'
                    },{
                        "cjmc":"apbridge",
                        "bbh": "0.7.2.2",
                        "kfz":"王爱明",
                        "scsj":'2017/11/13 11:41'
                    }
                ],
                dialogFormVisible: false,
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

                provs:global_.provs,
                citys: [],

                showDialog:false,
                radiotoRout:'文件上传',
                fileList:[{name: '路由器导入模板.xls', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
            }
        },
        created: function(){
            this.getData();
        },
        computed: {
//            data: function(){
//                const self = this;
//                return self.tableData.filter(function(d){
//                    let is_del = false;
//                    for (let i = 0; i < self.del_list.length; i++) {
//                        if(d.name === self.del_list[i].name){
//                            is_del = true;
//                            break;
//                        }
//                    }
//                    if(!is_del){
//                        if(d.address.indexOf(self.select_cate) > -1 &&
//                            (d.name.indexOf(self.select_word) > -1 ||
//                            d.address.indexOf(self.select_word) > -1)
//                        ){
//                            return d;
//                        }
//                    }
//                })
//            }
        },
        methods: {
            handlePreview:function(file) {
                console.log(file);
            },
            getProv: function(prov){
                let tempCity=[];
                this.citys=[];
                this.selectCity='';
                let allCity=global_.allCity;
                for (var val of allCity){
                    if (prov == val.prov){
                        console.log(val);
                        tempCity.push({label: val.label, value: val.label})
                    }
                }
                this.citys = tempCity;
            },
            getCity: function (city) {
                console.log(city);
                console.log(this.selectCity)
            },
            changeTab: function(){
                console.log(this.radio3);
                this.$message('选择'+ this.radio3);
            },
            changeTab2: function(){
                console.log(this.radiotoRout);
//                this.$message('选择'+ this.radiotoRout);
            },
            submitUpload:function() {
                console.log('上传到服务器');
                this.$refs.upload.submit();
            },
            handleRemove:function(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview:function(file) {
                console.log(file);
            },
            toRouter: function(data){
                var self = this;
                self.showDialog = true;
                console.log(data);
            },
            handleCurrentChange:function(val){
                this.cur_page = val;
                this.getData();
            },
            getData:function(){
                let self = this;
                if(process.env.NODE_ENV === 'development'){
                    self.url = '/ms/table/list';
                };
                self.$axios.post(self.url, {page:self.cur_page}).then(function(res){
                    self.tableData = res.data.list;
                })
            },
            search:function(){
                this.is_search = true;
            },
            formatter:function(row, column) {
                return row.address;
            },
            filterTag:function(value, row) {
                return row.tag === value;
            },
            handleEdit:function(index, row) {
                this.$message('编辑第'+(index+1)+'行');
            },
            handleDelete:function(index, row) {
                this.$message.error('删除第'+(index+1)+'行');
            },
            addUsr:function(){
                const self = this,
                    length = self.multipleSelection.length;
                let str = '';
                self.del_list = self.del_list.concat(self.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += self.multipleSelection[i].name + ' ';
                }
                self.$message.error('删除了'+str);
                self.multipleSelection = [];
            },
            handleSelectionChange:function(val) {
                this.multipleSelection = val;
            }
        }
    }
</script>

<style scoped>
    .handle-box{
        margin-bottom: 20px;
    }
    .handle-select{
        width: 120px;
    }
    .handle-input{
        width: 300px;
        display: inline-block;
    }

    .rad-group{margin-bottom:20px;}
    .btn1{margin-bottom:5px;margin-top:5px;margin-left:0;}
    /*.digcont{width:600px;}*/
    .diainp{width:217px;}
    .diainp2{width:400px;}
    .upload-demo{}
</style>

