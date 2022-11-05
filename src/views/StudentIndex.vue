<template>
  <div id="student">
    <el-row class="padding-50">
      <el-col :span="24">
        <ul class="list">
          <li class="logo" @click="exam()"><i class="iconfont icon-kaoshi"></i><span>Exam-Online</span></li>
          <li><a href="javascript:;" @click="exam()">我的试卷</a></li>
          <li><a href="javascript:;" @click="practice()">我的练习</a></li>
          <li><router-link to="/scoreTable" replace>我的分数</router-link></li>
          <li><router-link to="/message" replace>给我留言</router-link></li>
          <li><a href="javascript:;">待定</a></li>
          <li class="right" @mouseenter="flag = !flag" @mouseleave="flag = !flag">
            <a href="javascript:;"><i class="iconfont icon-Userselect icon"></i>{{user.userName}}</a>
            <div class="msg" v-if="flag">
              <p @click="manage()">管理中心</p>
              <p class="exit" @click="exit()">退出</p>
            </div>
          </li>
        </ul>
      </el-col>
    </el-row>
    <!--  路由区域  -->
    <div class="main">
      <router-view :user="user"></router-view>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import {mapState} from "vuex";

export default {
  data(){
    return {
      flag: false,
      user: {}
    }
  },
  methods: {
    // 用户信息
    userInfo() {
      let studentName = this.$cookies.get("cname")
      let studentId = this.$cookies.get("cid")
      console.log(studentName)
      console.log(studentId)
      this.user.userName = studentName
      this.user.userId = studentId
    },
    // 跳转到考试模式
    exam() {
      console.log("触发了我的试卷")
      let isPractice = false
      this.$store.commit("practice", isPractice)
      router.replace({path: '/student'})
    },
    // 跳转到我的练习
    practice() {
      console.log("触发了我的练习")
      let isPractise = true
      this.$store.commit("practice", isPractise)
      router.replace({path: '/startexam'})
    },
    // 管理中心
    manage() {
      console.log("触发了管理中心")
      router.push({path: '/manager'})
    },
    // 退出登录
    exit() {
      console.log("触发了退出登录")
      this.$cookies.remove("cname")
      this.$cookies.remove("cid")
      localStorage.removeItem("token")
      router.push("/")
    }
  },
  created() {
    this.userInfo()
  },
  computed:mapState(["isPractice"])
}
</script>

<style scoped>
.right .icon {
  margin-right: 6px;
}
#student .padding-50 {
  margin: 0 auto;
  padding: 0 50px;
  box-shadow: 0 0 10px 4px rgba(1,149,255,0.1);
  background-color: #fff;
}
.list a {
  text-decoration: none;
  color: #334046;
}
li {
  list-style: none;
  height: 60px;
  line-height: 60px;
}
#student .list{
  display: flex;
}
#student .list li {
  padding: 0 20px;
  cursor: pointer;
}
#student .list li:hover {
  background-color: #0195ff;
  transition: all 2s ease;
}
#student .list li:hover a {
  color: #fff;
}
#student .list .right {
  margin-left: auto;
  position: relative;
}
#student .list li.right :hover a {
  color: #000;
}
#student .list .logo {
  display: flex;
  font-weight: bold;
  color: #2f6c9f;
}
#student .list .logo i {
  font-size: 50px;
}
.right .msg {
  text-align: center;
  position: absolute;
  top: 60px;
  left: 0px;
  display: flex;
  flex-direction: column;
  border-radius: 2px;
  border-bottom: 3px solid #0195ff;
  background-color: #fff;
}
.right .msg p {
  height: 40px;
  line-height: 40px;
  width: 105px;
}
.right .msg p:hover {
  background-color: #0195ff;
}
</style>
