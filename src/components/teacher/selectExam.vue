<!-- 查询所有考试信息 -->
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
          <el-button @click="edit(scope.row.examCode)" type="primary" size="small">编辑</el-button>
          <el-button @click="deleteRecord(scope.row.examCode)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        v-model:currentPage="pagination.current"
        :page-sizes="[5, 10, 20, 40]"
        v-model:page-size="pagination.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total" class="page">
    </el-pagination>
    <!-- 编辑对话框-->
    <el-dialog
        title="编辑试卷信息"
        v-model="dialogVisible"
        width="30%">
      <section class="update">
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
              <el-date-picker type="date" placeholder="选择日期" v-model="form.examDate" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="持续时间">
            <el-input v-model="form.totalTime"></el-input>
          </el-form-item>
          <el-form-item label="总分">
            <el-input v-model="form.totalScore"></el-input>
          </el-form-item>
          <el-form-item label="试卷类型">
            <el-input v-model="form.type"></el-input>
          </el-form-item>
          <el-form-item label="考生提示">
            <el-input type="textarea" v-model="form.tips"></el-input>
          </el-form-item>
        </el-form>
      </section>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "selectExam",
  data() {
    return {
      // 分页后的考试信息
      pagination: {
        current: 1,
        total: 0,
        size: 5
      },
      // 保存点击以后当前试卷信息
      form: {},
      dialogVisible: false
    }
  },
  methods: {
    // 分页查询所有考试信息
    getExamInfo() {
      this.$axios.get('api/exam/' + this.pagination.current + '/' + this.pagination.size)
          .then( res => {
            this.pagination = res.data.data
          }).catch( () => {
            this.$message.error("获取信息失败，请稍后再试！")
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
    // 编辑试卷
    edit(examCode) {
      this.dialogVisible = true
      this.$axios.get('api/exam/' + examCode).then( res => {
        // 根据试卷id请求后台
        console.log(res.data)
        if (res.data.code == 200) {
          this.form = res.data.data
        }
      }).catch( () => {
        this.$message.error('error')
      })
    },
    // 确认关闭提醒
    // handleClose(done) {
    //   this.$confirm("确认关闭？").then( () => {
    //     done()
    //   }).catch( () => {
    //     this.$message.error()
    //   })
    // },
    // 提交修改后的试卷信息
    submit(){
      this.dialogVisible = false
      this.$axios.put('api/exam', {...this.form}).then( res => {
        if (res.data.code == 200) {
          this.$message.success("修改成功！")
        }
      })
      // 更新后重新获取试卷信息
      this.getExamInfo()
    },
    // 删除试卷信息
    deleteRecord(examCode) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 成功修改
        this.$axios.delete('api/exam/' + examCode).then( () => {
          this.getExamInfo()
        })
      })
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
