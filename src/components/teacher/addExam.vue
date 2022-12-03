<!-- 添加考试 -->
<template>
  <section class="add">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="试卷名称">
        <el-input v-model="form.source"></el-input>
      </el-form-item>
      <el-form-item label="介绍">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="所属学院">
        <el-input v-model="form.institute"></el-input>
      </el-form-item>
      <el-form-item label="所属专业">
        <el-input v-model="form.major"></el-input>
      </el-form-item>
      <el-form-item label="年级">
        <el-input v-model="form.grade"></el-input>
      </el-form-item>
      <el-form-item label="考试日期">
        <el-col :span="11">
          <el-date-picker
            placeholder="选择日期"
            v-model="form.examDate"
            format="YYYY/MM/DD"
            value-format="YYYY-MM-DD"
            style="width: 100%;">
          </el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="持续时间">
        <el-input-number v-model="form.totalTime" :min="0" controls-position="right"></el-input-number>
      </el-form-item>
      <el-form-item label="总分">
        <el-input-number v-model="form.totalScore" :min="0" controls-position="right"></el-input-number>
      </el-form-item>
      <el-form-item label="考试类型">
        <el-select v-model="form.type">
          <el-option v-for="items in typeOpt" :key="items.value" :value="items.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="考生提示">
        <el-input type="textarea" v-model="form.tips"></el-input>
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
  name: "addExam",
  data() {
    return {
      typeOpt: [
        {value: "开卷"}, {value: "闭卷"}
      ],
      form: {
        source: null,
        description: null,
        institute: null,
        major: null,
        grade: null,
        examDate: null,
        totalTime: 120,
        totalScore: 100,
        type: "闭卷",
        tips: null,
        paperId: null
      }
    }
  },
  methods: {
    onSubmit() {
     this.$axios.get('api/examManagePaperId').then( res => {
       // 获取后端发送来的paperId，使paperId自增
       this.form.paperId = res.data.data.paperId + 1
       this.$axios.post('api/exam', {...this.form}).then( res => {
         if (res.data.code == 200) {
           this.$message.success("添加成功！")
         }
       }).catch( () => {
         this.$message.error()
       })
     })
    },
    // 重置表单
    cancel() {
       this.form = {
         totalTime: 120,
         totalScore: 100,
         type: "闭卷",
       }
    },
  },
}
</script>

<style lang="less" scoped>
.add {
  padding: 0px 40px;
  width: 400px;
}
</style>
