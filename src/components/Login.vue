<template>
    <div class="login">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="big">通用后台管理系统</span>
            </div>
            <el-form  label-width="10px" :model="form" ref="form" :rules="loginFormRules">
                <!-- 用户名 -->
            <el-form-item  prop="username">
                <el-input prefix-icon="el-icon-s-custom" v-model="form.username"></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item  prop="password">
                <el-input prefix-icon="el-icon-lock" v-model="form.password" type="password"></el-input>
            </el-form-item>
            <!-- 登录按钮 -->
            <el-form-item class="btns" >
                <el-button type="primary" @click="login" >登录</el-button>
                <el-button type="info" @click="login" >注册</el-button>
            </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import { nameRule, pwdRule} from '../utils/vaildate.js'
import { setToken } from '../utils/setToken'
import { login } from '../api/api.js'
export default {
    data(){
        return{
            form:{
                username:'admin',
                password:'2A@#23ws'
            },
            loginFormRules:{
                username:[{validator:nameRule,trigger:'blur'}],
                password:[{validator:pwdRule,trigger:'blur'}]
            }
        }
    },
    methods:{
        login(){
            this.$refs.form.validate((valid)=>{
                if(valid){
                    console.log(this.form);
                    /*把这个登录方法封装成api进行调用
                     this.service.post('/login',this.form)
                    .then((res)=>{
                        if(res.data.status === 200){
                            setToken('username',res.data.username)
                            setToken('token',res.data.token)
                            this.$message.success('登录成功')
                            this.$router.push('/home')
                        }
                        console.log(res);
                    }) 
                    */
                   login(this.form).then((res)=>{
                            if(res.data.status === 200){
                            setToken('username',res.data.username)
                            setToken('token',res.data.token)
                            this.$message.success('登录成功')
                            this.$router.push('/home')
                        }
                        console.log(res);
                   })
                }else{
                    console.error(this.form);
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
    .big{
        font-size: 34px;
    }
    .login{
        width: 100%;
        height: 100%;
        position: absolute;
        background: url('../assets/beijing.jpg') center no-repeat ;
        .el-card{
            background: #65768557;
        }
        .box-card{
            width: 450px;
            margin: 200px auto;
        }
    }
    .btns{
        display: flex;
        justify-content: center;
    }
</style>