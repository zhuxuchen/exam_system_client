<!--添加学生-->
<template>
  <section class="add">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model="form.studentName"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="form.sex"></el-input>
      </el-form-item>
      <el-form-item label="学院">
        <el-input v-model="form.institute"></el-input>
      </el-form-item>
      <el-form-item label="所属专业">
        <el-input v-model="form.major"></el-input>
      </el-form-item>
      <el-form-item label="年级">
        <el-input v-model="form.grade"></el-input>
      </el-form-item>
      <el-form-item label="班级">
        <el-input v-model="form.clazz"></el-input>
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input v-model="form.tel"></el-input>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input v-model="form.cardId"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.pwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit()">立即创建</el-button>
        <el-button @click="cancel()">重置表单</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
export default {
  name: "addStudent",
  data() {
    return {
      form: { //表单数据初始化
        studentName: null,
        grade: null,
        major: null,
        clazz: null,
        institute: null,
        tel: null,
        email: null,
        pwd: null,
        cardId: null,
        sex: null,
        role: "2"
      }
    }
  },
  methods: {
    // 提交表单
    onSubmit() {
      this.$axios.post('api/student', {
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
        role: "2"
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
