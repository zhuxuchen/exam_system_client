<!--学生管理页面-->
<template>
  <div class="all">
    <el-table :data="pagination.records" :default-sort="{ prop: 'grade', order: 'descending' }" border>
      <el-table-column fixed="left" prop="studentName" label="姓名" width="180"></el-table-column>
      <el-table-column prop="institute" label="学院" width="200"></el-table-column>
      <el-table-column prop="major" label="专业" width="200"></el-table-column>
      <el-table-column prop="grade" label="年级" sortable width="200"></el-table-column>
      <el-table-column prop="clazz" label="班级" width="100"></el-table-column>
      <el-table-column prop="sex" label="性别" width="120"></el-table-column>
      <el-table-column prop="tel" label="联系方式" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template v-slot="scope">
          <el-button @click="checkGrade(scope.row.studentId)" type="primary" size="small">编辑</el-button>
          <el-button @click="deleteById(scope.row.studentId)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        v-model:currentPage="pagination.current"
        :page-sizes="[10, 20, 40, 80]"
        v-model:page-size="pagination.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total" class="page">
    </el-pagination>
    <!-- 编辑对话框-->
    <el-dialog
        title="编辑学生信息"
        v-model="dialogVisible"
        width="30%">
      <section class="update">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="姓名">
            <el-input v-model="form.studentName"></el-input>
          </el-form-item>
          <el-form-item label="学院">
            <el-input v-model="form.institute"></el-input>
          </el-form-item>
          <el-form-item label="专业">
            <el-input v-model="form.major"></el-input>
          </el-form-item>
          <el-form-item label="年级">
            <el-input v-model="form.grade"></el-input>
          </el-form-item>
          <el-form-item label="班级">
            <el-input v-model="form.clazz"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="form.sex"></el-input>
          </el-form-item>
          <el-form-item label="电话号码">
            <el-input v-model="form.tel"></el-input>
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
  name: "studentManage",
  data() {
    return {
      pagination: {
        current: 1,
        total: 0,
        size: 10
      },
      form: {},
      dialogVisible: false
    }
  },
  methods: {
    // 获取学生信息
    getStudentInfo() {
      this.$axios.get('api/students/' + this.pagination.current + '/' + this.pagination.size)
          .then( res => {
            this.pagination = res.data.data
          }).catch( () => {
            this.$message.error('error')
      })
    },
    //改变当前记录条数
    handleSizeChange(val) {
      this.pagination.size = val;
      this.getStudentInfo();
    },
    //改变当前页码，重新发送请求
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.getStudentInfo();
    },
    // 修改学生信息
    checkGrade(studentId) {
      this.dialogVisible = true
      this.$axios.get('api/student/' + studentId).then( res => {
        this.form = res.data.data
      }).catch( () => {
        this.$message.error('error')
      })
    },
    // 提交修改后的学生信息
    submit() {
      this.dialogVisible = false
      this.$axios.put('api/student', {...this.form}).then( res => {
        if (res.data.code == 200) {
          this.$message.success("修改成功！")
        }
      }).catch( () => {
        this.$message.error('error')
      })
      // 更新后重新获取学生信息
      this.getStudentInfo()
    },
    // 删除当前学生
    deleteById(studentId) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 成功删除
        this.$axios.delete('api/student/' + studentId).then( res => {
          if (res.data.code == 200) {
            this.$message.success("删除成功！")
          }
          this.getStudentInfo()
        })
      }).catch( () => {
      })
    }
  },
  created() {
    this.getStudentInfo()
  }
}
</script>

<style lang="less" scoped>
.all {
  padding: 0px 40px;
.page {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.edit {
  margin-left: 20px;
}
.el-table tr {
  background-color: #dd5862 !important;
}
}
.el-table .warning-row {
  background: #000 !important;
}

.el-table .success-row {
  background: #dd5862;
}
</style>
