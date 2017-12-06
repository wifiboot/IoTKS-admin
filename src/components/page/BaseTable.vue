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
            <el-input v-model="select_word" placeholder="请输入渠道名称或账号查找" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="search">查询</el-button>
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
            <el-form :model="form">
                <el-form-item label="账号" :label-width="formLabelWidth">
                    <el-input v-model="form.user" class="diainp" auto-complete="off"></el-input>
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
                <el-form-item label="地址" :label-width="formLabelWidth">
                    <el-select size="small" style="width: 110px"
                               v-model="selectProv"
                               placeholder="请选择省份"
                               v-on:change="getProv($event)">
                        <el-option
                            v-for="item in provs"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select size="small" style="width: 104px"
                               v-if="selectProv!=''"
                               v-model="selectCity"
                               placeholder="请选择城市"
                               v-on:change="getCity($event)">
                        <el-option
                            v-for="item in citys"
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
                <el-button type="primary" @click="dialogFormVisible = false">创 建</el-button>
            </div>
        </el-dialog>

        <el-dialog title="导入路由" :visible.sync="showDialog" class="digcont">
            <el-form :model="form">
                <el-form-item label="账号" :label-width="formLabelWidth">
                    <el-input v-model="form.user" class="diainp" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="form.password" class="diainp" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
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
                is_search: false,

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
                    name: '',
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
                selectProv: '',
                selectCity: '',

                showDialog:false
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

</style>
