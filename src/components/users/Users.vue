<template>
  <div class="users">
    <!-- 表格组件 -->
    <el-table :data="userList" stripe style="width: 100%">
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="address" label="用户状态"></el-table-column>
      <el-table-column prop="address" label="操作"></el-table-column>
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
import axios from 'axios'
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
    getUserList (pagenum = 1) {
      axios.get('http://localhost:8888/api/private/v1/users', {
        params: {
        // 查询条件
          query: '',
          // 当前页
          pagenum,
          // 每页大小
          pagesize: 3
        },
        // 通过请求头 传递token
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then(res => {
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
      })
    },
    // 切换分页 获取当前数据
    changePage (curPage) {
      // console.log('分页切换')
      this.getUserList(curPage)
    }
  }
}
</script>

<style>

</style>
