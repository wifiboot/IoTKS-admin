<template>
    <div class="header">
        <div class="logo">IoTKS管理系统</div>
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user-logo" src="../../../static/img/img.jpg">
                    {{username}}
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="loginout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
    import global_ from 'components/common/Global';
    export default {
        data() {
            return {
                name: 'linxin',

            }
        },
        computed:{
            username(){
                let username = localStorage.getItem('ms_username');
                return username ? username : this.name;
            }
        },
        methods:{
            handleCommand(command) {
                var self = this;
                if(command == 'loginout'){
                    self.$axios.post(global_.baseUrl+'/admin/logout').then(function(res){
                        if(res.data.ret_code == 0){
                            self.$message({message:res.data.extra,type:'success'});
                            localStorage.removeItem('ms_username');
                            localStorage.removeItem('userMsg');
                            self.$router.push('/login');
                        }else{
                            self.$message.error(res.data.extra);
                        }
                    },function(err){
                        self.$message.error(err);
                    });
                }
            }
        }
    }
</script>
<style scoped>
    .header{
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        color: #fff;
    }
    .header .logo{
        float: left;
        width:250px;
        text-align: center;
        font-size: 22px;
        line-height: 70px;
    }
    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
        line-height: 70px;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }
    .user-info .user-logo{
        position: absolute;
        left:0;
        top:15px;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }

    .diainp{width:217px;}
</style>
