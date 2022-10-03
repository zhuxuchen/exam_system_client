<!--教师管理页面-->
<template>
  <div class="all">
    <el-table :data="pagination.records" border>
      <el-table-column fixed="left" prop="teacherName" label="姓名" width="180"></el-table-column>
      <el-table-column prop="institute" label="学院" width="200"></el-table-column>
      <el-table-column prop="sex" label="性别" width="120"></el-table-column>
      <el-table-column prop="tel" label="联系方式" width="120"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="120"></el-table-column>
      <el-table-column prop="cardId" label="身份证号" width="120"></el-table-column>
      <el-table-column prop="type" label="职称" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template v-slot="scope">
          <el-button @click="checkGrade(scope.row.teacherId)" type="primary" size="small">编辑</el-button>
          <el-button @click="deleteById(scope.row.teacherId)" type="danger" size="small">删除</el-button>
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
        title="编辑教师信息"
        v-model="dialogVisible"
        width="30%">
      <section class="update">
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
  name: "teacherManage",
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
    // 获取教师信息
    getTeacherInfo(){
      // 分页查询所有教师信息
      this.$axios.get('api/teacher/' + this.pagination.current + '/' + this.pagination.size)
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
    // 修改教师信息
    checkGrade(teacherId) {
      this.dialogVisible = true
      this.$axios.get('api/teacher/' + teacherId).then( res => {
        this.form = res.data.data
      }).catch( () => {
        this.$message.error('error')
      })
    },
    // 确认提交信息
    submit() {
      this.dialogVisible = false
      this.$axios.put('api/teacher', {...this.form}).then( res => {
        if (res.data.code == 200) {
          this.$message.success("修改成功！")
        }
      }).catch( () => {
        this.$message.error('error')
      })
      // 更新后重新获取学生信息
      this.getTeacherInfo()
    },
    // 删除当前教师信息
    deleteById(teacherId) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 成功删除
        this.$axios.delete('api/teacher/' + teacherId).then( res => {
          if (res.data.code == 200) {
            this.$message.success("删除成功！")
          }
          this.getTeacherInfo()
        })
      }).catch( () => {
      })
    }
  },
  created() {
    this.getTeacherInfo()
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
