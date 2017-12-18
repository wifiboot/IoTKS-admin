<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 渠道管理</el-breadcrumb-item>
                <el-breadcrumb-item>渠道列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-button type="primary" icon="plus" class="handle-del mr10" @click="dialogFormVisible=true">新建用户</el-button>
            <el-input v-model="search_word" placeholder="请输入渠道名称或账号查找" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="search('searchForm')">查询</el-button>
        </div>
        <div class='rad-group'>
            <el-radio-group v-model="radio3" @change="changeTab">
                <el-radio-button label="全部"></el-radio-button>
                <el-radio-button label="未冻结"></el-radio-button>
                <el-radio-button label="已冻结"></el-radio-button>
            </el-radio-group>
        </div>
        <el-table :data="tableData2" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column prop="zh" label="账 号" width="130"></el-table-column>
            <el-table-column prop="qdmc" label="渠道名称" width="130"></el-table-column>
            <el-table-column prop="lxdh" label="联系电话" width="130"></el-table-column>
            <el-table-column label="冻结状态" width="120" :filters="[{ text: 'frozen', value: '已冻结' }, { text: 'Not frozen', value: '未冻结' }]" :filter-method="filterTag">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.djzt == 'frozen' ? 'warning' : 'success'" close-transition>{{scope.row.djzt=='frozen'?'已冻结':'未冻结'}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="ly" label="路由" width="80"></el-table-column>
            <el-table-column prop="zxsb" label="在线设备" width="100"></el-table-column>
            <el-table-column prop="cjsj" label="创建时间" width="150"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button class="btn1" size="small" type="text" @click="resetPwd(scope.$index, scope.row)">重置密码</el-button>
                    <el-button class="btn1" size="small" :type="scope.row.djzt == 'frozen' ? 'warning' : 'danger'" @click="frozen(scope.$index, scope.row)">{{scope.row.djzt=='frozen'?'解除冻结':'冻结账户'}}</el-button>
                    <el-button class="btn1" size="small" type="success" @click="toRouter(scope.row)">导入路由</el-button>
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

        <el-dialog title="新建子渠道" :visible.sync="dialogFormVisible" class="digcont">
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item label="账号" prop="user" :label-width="formLabelWidth">
                    <el-input v-model="form.user" class="diainp" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
                    <el-input v-model="form.password" type="password" class="diainp" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="渠道名称" prop="name" :label-width="formLabelWidth">
                    <el-input v-model="form.name" class="diainp" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="tel" :label-width="formLabelWidth">
                    <el-input v-model="form.tel" class="diainp" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="地址" :label-width="formLabelWidth">
                    <el-select size="small" style="width: 110px"
                               v-model="form.selectProv"
                               placeholder="请选择省份"
                               v-on:change="getProv($event)">
                        <el-option
                            v-for="item in provs"
                            :key="item.label"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select size="small" style="width: 104px"
                               v-if="form.selectProv!=''"
                               v-model="form.selectCity"
                               placeholder="请选择城市"
                               v-on:change="getCity($event)">
                        <el-option
                            v-for="item in citys"
                            :key="item.label"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="" :label-width="formLabelWidth">
                    <el-input v-model="form.addr" class="diainp2" auto-complete="off" placeholder="请输入详细地址"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveCreate('form')">创 建</el-button>
            </div>
        </el-dialog>

        <el-dialog title="导入路由" :visible.sync="showDialog" class="digcont">
            <div class='rad-group'>
                <el-radio-group v-model="radiotoRout" @change="changeTab2">
                    <el-radio-button label="文件上传"></el-radio-button>
                    <el-radio-button label="手动导入"></el-radio-button>
                </el-radio-group>
            </div>

            <el-upload
                class="upload-demo"
                ref="upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :auto-upload="false">
                <div>
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                </div>
                <div slot="tip" style="margin-top:20px;" class="el-upload__tip">只能上传XXX文件，且不超过500kb</div>
            </el-upload>

            <div slot="footer" class="dialog-footer">
                <el-button @click="showDialog = false">取 消</el-button>
                <el-button type="primary" @click="showDialog = false">保 存</el-button>
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
//                is_search: false,

                radio3:'全部',
                tableData2:[
                    {
                        "zh":"test@163.com",
                        "qdmc": "D4EE073B9180",
                        "lxdh":"13547895762",
                        "djzt":'frozen',
                        "ly":"1/1",
                        "zxsb":7,
                        "cjsj":"2017/11/13 11:41"
                    },{
                        "zh":"reytg@163.com",
                        "qdmc": "D4EE073B9180",
                        "lxdh":"13547895654",
                        "djzt":'Not frozen',
                        "ly":"6/1",
                        "zxsb":8,
                        "cjsj":"2017/11/13 11:41"
                    },{
                        "zh":"test@163.com",
                        "qdmc": "D4EE073B9180",
                        "lxdh":"13547895762",
                        "djzt":'frozen',
                        "ly":"1/1",
                        "zxsb":7,
                        "cjsj":"2017/11/13 11:41"
                    },{
                        "zh":"gdgd@163.com",
                        "qdmc": "D4EE073B5432",
                        "lxdh":"13547895762",
                        "djzt":'Not frozen',
                        "ly":"1/1",
                        "zxsb":0,
                        "cjsj":"2017/11/13 11:41"
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
                rules: {
                    user:[
                        {required: true, message: '请输入账号', trigger: 'blur'}
                    ],
                    password:[
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {validator:this.validatePwd,trigger:'blur'}
                    ],
                    name:[
                        {required: true, message: '请输入渠道名称', trigger: 'blur'}
                    ],
                    tel:[
                        {required: true, message: '请输入联系电话', trigger: 'blur'},
                        {validator:this.validateTel,trigger:'blur'}
                    ]
                },
                formLabelWidth: '120px',

                provs:global_.provs,
                citys: [],

                showDialog:false,
                radiotoRout:'文件上传',
                fileList:[{name: '路由器导入模板.xls', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
                search_word:''
            }
        },
        created: function(){
            this.getData();
//            this.requestDatalist();
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
            requestDatalist: function(){//获取数据列表
                var self = this;
                var params = {
                    wx:'wlife'
                };
                self.$axios.get('https://wifi.kunteng.org/cgi-bin/luci/admin/system/getDeviceInfo',{params}).then(function(res){
                    console.log(res);
                })
            },
            saveCreate: function(formName){
                var self = this;
                self.$refs[formName].validate(function(valid){
                    if(valid){
                        console.log('验证成功')
                    }else{
                        return false;
                        console.log('验证失败');
                    }
                });
                var params = {
                    user:self.form.user,
                    password:self.form.password,
                    name:self.form.name,
                    tel:self.form.tel,
                    addr:self.form.selectProv+self.form.selectCity+self.form.addr
                }
                console.log(params);
                return false;
                self.$axios.get('urlstr',{params}).then(function(res){
//                    console.log(res);
                })
            },
            frozen: function(i,data){
                
            },
            validateUser: function(rule,value,callback){
                if(value === ''){
                    callback(new Error('请输入账号'))
                }else{
                    callback();
                }
            },
            validatePwd: function(rule,value,callback){
                if(value === ''){
                    callback(new Error('请输入密码'))
                }else{
                    callback();
                }
            },
            validateTel:function(rule,value,callback){
                var regTel3 = /(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(value);
                if(!regTel3){
                    callback(new Error('电话号码输入有误！'))
                }else{
                    callback();
                }
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
            search:function(formstr){
                var self = this;
                if(self.search_word == ''){
                    self.$message({
                        message: '输入不能为空',
                        type: 'warning'
                    });
                    return false;
                }
                var params = {
                    search_word:self.search_word
                }

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
