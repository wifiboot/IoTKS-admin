<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-button type="primary" icon="plus" class="handle-del mr10" @click="dialogFormVisible=true">新建用户</el-button>
            <!--<el-select v-model="select_cate" placeholder="筛选省份" class="handle-select mr10">-->
                <!--<el-option key="1" label="广东省" value="广东省"></el-option>-->
                <!--<el-option key="2" label="湖南省" value="湖南省"></el-option>-->
            <!--</el-select>-->
            <el-input v-model="select_word" placeholder="请输入渠道名称或账号查找" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </div>
        <div class='rad-group'>
            <el-radio-group v-model="radio3" @change="changeTab">
                <el-radio-button label="全部"></el-radio-button>
                <el-radio-button label="未冻结"></el-radio-button>
                <el-radio-button label="已冻结"></el-radio-button>
            </el-radio-group>
        </div>
        <el-table :data="tableData2" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <!--<el-table-column type="selection" width="55"></el-table-column>-->
            <el-table-column prop="zh" label="账 号" width="150"></el-table-column>
            <el-table-column prop="qdmc" label="渠道名称" width="150"></el-table-column>
            <el-table-column prop="lxdh" label="联系电话" width="150"></el-table-column>
            <el-table-column prop="ly" label="路由" width="80"></el-table-column>
            <el-table-column prop="zxsb" label="在线设备" width="100"></el-table-column>
            <el-table-column prop="cjsj" label="创建时间" width="150"></el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button class="btn1" size="small" @click="handleEdit(scope.$index, scope.row)">分配设备</el-button>
                    <el-button class="btn1" size="small" type="info" @click="handleDelete(scope.$index, scope.row)">修改权限</el-button>
                    <el-button class="btn1" size="small" type="danger" @click="resetPwd(scope.$index, scope.row)">重置密码</el-button>
                    <el-button class="btn1" size="small" type="warning" @click="frozen(scope.$index, scope.row)">冻结账户</el-button>
                    <el-button class="btn1" size="small" type="success" @click="toRouter(scope.$index, scope.row)">导入路由</el-button>
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

        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="活动名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动区域" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
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
                        "ly":"1/1",
                        "zxsb":7,
                        "cjsj":"2017/11/13 11:41"
                    },{
                        "zh":"reytg@163.com",
                        "qdmc": "D4EE073B9180",
                        "lxdh":"13547895654",
                        "ly":"6/1",
                        "zxsb":8,
                        "cjsj":"2017/11/13 11:41"
                    },{
                        "zh":"test@163.com",
                        "qdmc": "D4EE073B9180",
                        "lxdh":"13547895762",
                        "ly":"1/1",
                        "zxsb":7,
                        "cjsj":"2017/11/13 11:41"
                    },{
                        "zh":"gdgd@163.com",
                        "qdmc": "D4EE073B5432",
                        "lxdh":"13547895762",
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
                formLabelWidth: '120px'
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
            changeTab: function(){
                console.log(this.radio3);
                this.$message('选择'+ this.radio3);
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
                self.$axios.post(self.url, {page:self.cur_page}).then((res) => {
                    self.tableData = res.data.list;
                })
            },
            search(){
                this.is_search = true;
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.$message('编辑第'+(index+1)+'行');
            },
            handleDelete(index, row) {
                this.$message.error('删除第'+(index+1)+'行');
            },
            addUsr(){
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
            handleSelectionChange(val) {
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

</style>
