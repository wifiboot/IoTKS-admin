<template>
    <div class="login-wrap">
        <div class="ms-title">IoTKS管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p style="font-size:12px;line-height:30px;color:#999;">Tips : 用户名和密码随便填。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import global_ from 'components/common/Global';
    export default {
        data: function(){
            return {
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        {min:3,max:32,message:'长度在3到32个字符',trigger:'blur'},
                        {validator:function(rule,value,callback){
                            if(value.indexOf(' ') != -1){
                                callback(new Error('密码不能包含空格'));
                            }else{
                                callback();
                            }
                        }}
                    ]
                }
            }
        },
        created:function(){
            this.getData();
        },
        methods: {
            getData: function(){
                var self = this;
                console.log(global_.timeStamp('417865'));
//                self.$axios({
//                    method:'get',
////                    header: { "content-type": "application/json" },
//                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
//                    url:'https://wifi.kunteng.org/cgi-bin/luci/admin/system/getDeviceInfo?wx=wlife' ,
//                    data:{wx:'wlife'}
//                }).then(function(response) {
////                        response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
//                        console.log(response);
//                    },function(err){
////                        console.log(err);
//                });
                var params = {
                    wx:'wlife'
                };
                self.$axios.get('https://wifi.kunteng.org/cgi-bin/luci/admin/system/getDeviceInfo',{params}).then(function(res){
                    console.log(res);
                })


            },
            submitForm:function(formName) {
                const self = this;
                self.$refs[formName].validate(function(valid){
                    if (valid) {
                        self.$axios({
                            method:'get',
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                            url:global_.baseUrl + '/user/login'+self.ruleForm.password ,
//                            data:{wx:'wlife'}
                        }).then(function(response) {
                            console.log(response);
                        },function(err){
                            console.log(err);
                        });


                        localStorage.setItem('ms_username',self.ruleForm.username);
                        localStorage.setItem('storgePwd',self.ruleForm.password);
//                        self.$router.push('/readme');
                        self.$router.push('/basetable');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>
