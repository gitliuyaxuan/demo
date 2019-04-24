
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
      pagesize: 3,
      // 搜索条件
      searchText: '',
      // 控制添加用户对话框的展示和隐藏
      isShowUserAddDialog: false,
      // 添加用户数据
      userAddForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 添加用户 -- 表单验证
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 5, max: 12, message: '用户名长度为5到12个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 12, message: '密码长度为6到12个字符', trigger: 'blur'}
        ],
        email: [
          { pattern: /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
            message: '邮箱格式不正确',
            trigger: 'blur' }
        ],
        mobile: [
          { pattern: /^1(3|4|5|7|8)\d{9}$/,
            message: '手机号码格式不正确',
            trigger: 'blur'
          }
        ]
      },
      // 编辑用户数据
      isShowUserEditDialog: false,
      userEditForm: {
        id: '',
        email: '',
        mobile: '',
        // 显示数据
        username: ''
      }
    }
  },

  methods: {
    // 分页获取数据
    async getUserList (pagenum = 1, query = '') {
      const url = 'http://localhost:8888/api/private/v1/users'
      const options = {
        params: {
        // 查询条件
          query,
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
      this.getUserList(curPage, this.searchText)
    },
    // 切换用户状态
    async changeUserStare (user) {
      try {
        const res = await this.$http.put(
          `/users/${user.id}/state/${user.mg_state}`,
          null,
          {
            // headers: {
            //   Authorization: localStorage.getItem('token')
            // }
          }
        )
        if (res.data.meta.status === 200) {
        // 表示设置用户状态成功
          this.$message({
            type: 'success',
            message: res.data.meta.msg,
            duration: 1000
          })
        } else {
          // 表示设置用户状态失败
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
    },
    // 查询数据
    search () {
      // 默认查询第一页数据
      this.getUserList(1, this.searchText)
    },
    // 根据用户id删除数据
    async delUserById (id) {
      // 弹出确认对话框
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        // 发送请求 删除数据
        const res = await this.$http.delete(`/users/${id}`)
        if (res.data.meta.status === 200) {
          this.$message({
            type: 'success',
            message: res.data.meta.msg
          })
          // 刷新列表数据
          this.getUserList(1, this.searchText)
        } else {
          this.$message({
            type: 'warning',
            message: res.data.meta.msg
          })
        }
      } catch (er) {
        // 点击取消按钮
        this.$message({
          type: 'info',
          message: '取消删除'
        })
        console.log('取消删除', er)
      }
    },
    // 展示用户添加对话框
    showUserAddDialog () {
      this.isShowUserAddDialog = true
    },
    // 添加用户
    async addUser () {
      try {
        // 先进行表单验证
        await this.$refs.userAddFormRef.validate()
        // 再进行添加用户逻辑
        const res = await this.$http.post('/users', this.userAddForm)
        if (res.data.meta.status === 201) {
        // 关闭对话框
          this.isShowUserAddDialog = false
          // 提示用户添加成功
          this.$message({
            type: 'success',
            message: res.data.meta.msg
          })
          // 重新获取数据 (刷新列表数据)
          this.getUserList(1, this.searchText)
        }
      } catch (error) {
        // 表单验证失败
      }
    },
    // 隐藏用户添加对话框
    hideUserAddDialog () {
      // 重置表单
      this.$refs.userAddFormRef.resetFields()
    },
    // 展示用户编辑对话框
    showUserEditDialog (user) {
      this.isShowUserEditDialog = true
      for (let key in this.userEditForm) {
        this.userEditForm[key] = user[key]
      }
    },
    // 编辑用户
    async updateUser () {
      // 解构
      const {id, email, mobile} = this.userEditForm
      const res = await this.$http.put(`/users/${id}`, {
        email,
        mobile
      })
      // 解构
      const {
        meta: {status, msg: message}
      } = res.data
      if (status === 200) {
        // 关闭对话框
        this.isShowUserEditDialog = false
        // 提示用户编辑用户成功
        this.$message({
          type: 'success',
          message
        })
        // 刷新列表数据
        this.getUserList(this.pagenum, this.searchText)
      }
    }
  }
}
