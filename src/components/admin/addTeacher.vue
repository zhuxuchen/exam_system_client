<!--添加教师-->
<template>
  <section class="add">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model="form.teacherName"></el-input>
      </el-form-item>
      <el-form-item label="学院">
        <el-input v-model="form.institute"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="form.sex"></el-input>
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input v-model="form.tel"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.pwd"></el-input>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input v-model="form.cardId"></el-input>
      </el-form-item>
      <el-form-item label="职称">
        <el-input v-model="form.type"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit()">立即创建</el-button>
        <el-button @click="cancel()">取消</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
export default {
  name: "addTeacher",
  data() {
    return {
      form: { //表单数据初始化
        teacherName: null,
        institute: null,
        sex: null,
        tel: null,
        pwd: null,
        cardId:null,
        type: null,
        role: "1"
      }
    }
  },
  methods: {
    // 提交表单
    onSubmit() {
      this.$axios.post('api/teacher', {
        ...this.form
      }).then( res => {
        if (res.data.code == 200) {
          this.$message.success('添加成功！')
        }
      }).catch( () => {
        this.$message.error()
      })
    },
    // 重置表单
    cancel() {
      this.form = {
        role: "1"
      }
    }
  }
}
</script>

<style lang="less" scoped>
.add {
  padding: 0px 40px;
  width: 400px;
}
</style>
