<template>
  <div class="exam">
    <el-table :data="pagination.records" border>
      <el-table-column fixed="left" prop="source" label="试卷名称" width="180"></el-table-column>
      <el-table-column prop="description" label="介绍" width="200"></el-table-column>
      <el-table-column prop="institute" label="所属学院" width="120"></el-table-column>
      <el-table-column prop="major" label="所属专业" width="200"></el-table-column>
      <el-table-column prop="grade" label="年级" width="100"></el-table-column>
      <el-table-column prop="examDate" label="考试日期" width="120"></el-table-column>
      <el-table-column prop="totalTime" label="持续时间" width="120"></el-table-column>
      <el-table-column prop="totalScore" label="总分" width="120"></el-table-column>
      <el-table-column prop="type" label="试卷类型" width="120"></el-table-column>
      <el-table-column prop="tips" label="考生提示" width="400"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template v-slot="scope">
          <el-button @click="add(scope.row.paperId,scope.row.source)" type="primary" size="small">增加题库</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        v-model:currentPage="pagination.current"
        :page-sizes="[4, 8, 10, 20]"
        v-model:page-size="pagination.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total" class="page">
    </el-pagination>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "addAnswer",
  data() {
    return {
      form: {}, //保存点击以后当前试卷的信息
      pagination: { //分页后的考试信息
        current: 1, //当前页
        total: 0, //记录条数
        size: 4 //每页条数
      },
    }
  },
  methods: {
    getExamInfo() {
      this.$axios.get('api/exam/' + this.pagination.current + '/' + this.pagination.size)
          .then(res => {
            this.pagination = res.data.data
          })
    },
    //改变当前记录条数
    handleSizeChange(val) {
      this.pagination.size = val
      this.getExamInfo()
    },
    //改变当前页码，重新发送请求
    handleCurrentChange(val) {
      this.pagination.current = val
      this.getExamInfo()
    },
    add(paperId,source) { //增加题库
      router.push({path:'/addAnswerChildren',query: {paperId: paperId,subject:source}})
    }
  },
  created() {
    this.getExamInfo()
  }
}
</script>

<style lang="less" scoped>
.exam {
  padding: 0px 40px;
.page {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.edit{
  margin-left: 20px;
}
}
</style>
