<template>
  <div class="users">
    <!-- 表格组件 -->
    <el-table :data="userList" stripe style="width: 100%">
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="address" label="用户状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" @change="changeUserStare(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" plain icon="el-icon-edit"></el-button>
          <el-button size="mini" type="danger" plain icon="el-icon-delete"></el-button>
          <el-button size="mini" type="success" plain icon="el-icon-check">分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pagesize"
      :current-page="pagenum"
      @current-change="changePage">
    </el-pagination>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  created () {
    this.getUserList()
  },
  data () {
    return {
      // 用户列表数据
      userList: [],
      // 总条数
      total: 0,
      // 当前页
      pagenum: 1,
      // 每页大小
      pagesize: 3
    }
  },
  methods: {
    // 分页获取数据
    async getUserList (pagenum = 1) {
      const url = 'http://localhost:8888/api/private/v1/users'
      const options = {
        params: {
        // 查询条件
          query: '',
          // 当前页
          pagenum,
          // 每页大小
          pagesize: 3
        }
        // 通过请求头 传递token
        // headers: {
        //   Authorization: localStorage.getItem('token')
        // }
      }
      // 使用await 等待 Promise结果
      const res = await this.$http.get(url, options)
      console.log('用户列表数据', res)

      if (res.data.meta.status === 200) {
        // 获取数据成功
        this.userList = res.data.data.users
        // 设置总条数
        this.total = res.data.data.total
        // 设置当前页
        this.pagenum = res.data.data.pagenum
      } else {
        // 失败 token失效 跳回到登录页面
        this.$router.push('/login')
        // 清除token
        localStorage.removeItem('token')
      }
    },

    // 切换分页 获取当前数据
    changePage (curPage) {
      // console.log('分页切换')
      this.getUserList(curPage)
    },
    // 切换用户状态
    async changeUserStare (user) {
      try {
        const res = await this.$http.put(`/users/${user.id}/state/${user.mg_state}`, null, {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        if (res.data.meta.status === 200) {
        // 表示设置用户状态成功
          this.$message({
            type: 'success',
            message: res.data.meta.msg,
            duration: 1000
          })
        } else {
          this.$message({
            type: 'warning',
            message: res.data.meta.msg
          })
        }
      } catch (er) {
        this.$message({
          type: 'error',
          message: '设置状态失败'
        })
      }
    }
  }
}
</script>

<style>

</style>
