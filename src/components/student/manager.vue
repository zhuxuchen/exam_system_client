<!--管理中心-->
<template>
  <div id='manager'>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <h3 class="alter">修改你的密码</h3>
      <el-form-item label="密码" prop="pass" class="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'manager',
  data() {
    // 检查密码是否输入的规则
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    // 确认密码的规则
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: '',
        checkPass: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let studentId = this.$cookies.get("cid")
          this.$axios.put('api/studentpwd', {
            pwd: this.ruleForm.pass,
            studentId
          }).then(res => {
            if(res.data != null ) { //修改成功提示
              this.$message.success("密码修改成功！")
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName){
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
#manager .pass  label{
  color: red;
  font-size: 20px;
}
#manager {
  width: 600px;
  margin: 0 auto;
  margin-top: 100px;
  text-align: center;
  margin-bottom: 300px;
}
#manager .alter {
  margin: 30px 0px;
}
</style>
