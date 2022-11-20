<template>
  <div id="login">
    <div class="bg"></div>
    <el-row class="main-container">
      <el-col :lg="8" :xs="16" :md="10" :span="10">
        <div class="top">
          <i class="iconfont icon-kaoshi"></i><span class="title">在线考试系统</span>
        </div>
        <div class="bottom">
          <div class="container">
            <p class="title">用户登录</p>
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
              <el-form-item label="用户名">
                <el-input v-model.number="formLabelAlign.username" @keyup.enter="login()" placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="formLabelAlign.password" @keyup.enter="login()" placeholder="请输入密码" type='password'></el-input>
              </el-form-item>
              <div class="submit">
                <el-button type="primary" class="row-login" @click="login()">登录</el-button>
              </div>
              <div class="options">
                <div>
                  <p class="find"><a href="javascript:;">找回密码</a></p>
                </div>

                <div class="register">
                  <span>没有账号?</span>
                  <span><a href="javascript:;">去注册</a></span>
                </div>
              </div>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>

    <section class="remind">
      <span>管理员账号：9527</span>
      <span>教师账号：20081001</span>
      <span>学生账号：20194084</span>
      <span>密码都是：123456</span>
    </section>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: `Login`,
  data() {
    return {
      labelPosition: 'left',
      formLabelAlign: {
        username: '20194084',
        password: '123456'
      }
    };
  },
  methods: {
    async login() {
      console.log('触发了login按钮')
      this.$axios.post('api/login', {
        ...this.formLabelAlign
      }).then(res => {
        console.log(res.data)
        let resData = res.data.data
        if (resData != null){
          if (resData.role == '0'){
            // 设置cookie并跳转到管理员页面
            this.$cookies.set("cname", resData.adminName)
            this.$cookies.set("cid", resData.adminId)
            this.$cookies.set("role", 0)
            //模拟生成token
            localStorage.setItem("token","adminIsLogin")
            // 跳转到管理员页面
            router.replace({path: '/index'})
          }else if (resData.role == '1'){
            // 设置cookie并跳转到教师页面
            this.$cookies.set("cname", resData.teacherName)
            this.$cookies.set("cid", resData.teacherId)
            this.$cookies.set("role", 1)
            //模拟生成token
            localStorage.setItem("token","teacherIsLogin")
            // 跳转到教师页面
            router.replace({path: '/index'})
          }else {
            this.$cookies.set("cname", resData.studentName)
            this.$cookies.set("cid", resData.studentId)
            this.$cookies.set("role", 2)
            //模拟生成token
            localStorage.setItem("token","studentIsLogin")
            // 跳转到学生页面
            router.replace({path: '/student'})
          }
        }else {
          this.$message.error("用户名或密码错误！")
        }
      })

    }
  }
}
</script>

<style lang="less" scoped>
.remind {
  border-radius: 4px;
  padding: 10px 20px;
  display: flex;
  position: fixed;
  right: 20px;
  bottom: 50%;
  flex-direction: column;
  color: #606266;
  background-color: #fff;
  border-left: 4px solid #409eff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)
}
.container {
  margin-bottom: 32px;
}
.container .el-radio-group {
  margin: 30px 0px;
}
a:link {
  color:#ff962a;
  text-decoration:none;
}
#login {
  font-size: 14px;
  color: #000;
  background-color: #fff;
}
#login .bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  overflow-y: auto;
  height: 100%;
  background: url('@/assets/img/loginbg.png')center top / cover no-repeat;
  background-color: #b6bccdd1 !important;
}
#login .main-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
#login .main-container .top {
  margin-top: 100px;
  font-size: 30px;
  color: #ff962a;
  display: flex;
  justify-content: center;
}
#login .top .icon-kaoshi {
  font-size: 80px;
}
#login .top .title {
  margin-top: 20px;
}
#login .bottom {
  display:flex;
  justify-content: center;
  background-color:#fff;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
#login .bottom .title {
  text-align: center;
  font-size: 30px;
}
.bottom .container .title {
  margin: 30px 0px;;
}
.bottom .submit .row-login {
  width: 100%;
  background-color: #04468b;
  border-color: #04468b;
  margin: 20px 0px 10px 0px;
  padding: 15px 20px;
}
.bottom .submit {
  display: flex;
  justify-content: center;
}
.bottom .options {
  margin-bottom: 40px;
  color: #ff962a;
  display: flex;
  justify-content: space-between;
}
.bottom .options > a {
  color: #ff962a;
}
.bottom .options .register span:nth-child(1) {
  color: #8C8C8C;
}
</style>
