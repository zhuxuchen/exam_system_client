<!--左边下拉导航栏-->
<template>
  <el-menu
      text-color="#fff"
      active-text-color="#fff"
      :default-active="this.$route.path"
      class="el-menu-vertical-demo"
      :collapse="flag"
      background-color="#124280"
      menu-trigger="click" router>
    <el-sub-menu v-for="(item,index) in menu" :index='item.index' :key="index">
      <template #title>
        <i class="iconfont" :class="item.icon"></i>
        <span class="title">{{item.title}}</span>
      </template>
      <el-menu-item-group v-for="(list,index1) in item.content" :key="index1">
        <el-menu-item class="item" @click="handleTitle(item.index)" :index="list.path" v-if="list.item1 != null">{{list.item1}}</el-menu-item>
        <el-menu-item class="item" @click="handleTitle(item.index)" :index="list.path" v-if="list.item2 != null">{{list.item2}}</el-menu-item>
        <el-menu-item class="item" @click="handleTitle(item.index)" :index="list.path" v-if="list.item3 != null">{{list.item3}}</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script>
import {mapState} from "vuex";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Left",
  data() {
    return {
    }
  },
  computed: mapState(["flag", "menu"]),
  methods: {
    addData() {
      console.log('addData')
      let role = this.$cookies.get("role")
      if (role == 0) {
        this.menu.push({
          index: '5',
          title: '教师管理',
          icon: 'icon-Userselect',
          content: [
            { item1:'教师管理',path:'/teacherManage' },
            { item2: '添加教师',path: '/addTeacher' }
          ]
        })
      }
    },
    // 点击标题传递参数给navigator组件
    handleTitle(index) {
      this.$bus.emit('sendIndex',index)
    },
    // handleOpen(key, keyPath) {
    //    console.log(key, keyPath);
    // },
    // handleClose(key, keyPath) {
    //    console.log(key, keyPath);
    // }
  },
  created() {
    this.addData()
  }
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 210px;
  min-height: 900px;
}
.el-menu-vertical-demo {
  height: 900px;
  background-color: #124280;
  z-index: 0;
}
.el-menu-vertical-demo .title {
  font-size: 16px;
  font-weight: bold;
  margin-left: 14px;
}
.el-submenu__title i {
  color: #fbfbfc !important;
}
</style>
