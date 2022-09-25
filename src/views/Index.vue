// 教师端主页面
<template>
  <div id="index">
    <Header class="topbar"></Header>
    <section class="container">
      <div class="left_side">
        <Left></Left>
      </div>
      <div class="main_wrapper">
        <Navigator class="nav"></Navigator>
        <router-view></router-view>
      </div>
    </section>
  </div>
</template>

<script>
import Header from "@/components/common/Header";
import Left from "@/components/common/Left";
import Navigator from "@/components/common/Navigator";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Index",
  components: {
    Header,
    Left,
    Navigator
  }
}
</script>

<style lang="less" scoped>
#index .nav {
  box-shadow: 1px 0 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}
.container {
  display: flex;
  background-color: #fff;
}
.main_wrapper {
  overflow: hidden;
  flex: 1;
  background-color: #fff;
}
</style>
