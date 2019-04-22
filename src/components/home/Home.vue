<template>
  <el-container class="home-container">
    <!-- 头部 -->
    <el-header class="home-header">
      <el-row type="flex" align="middle">
        <el-col :span="6">
          <img src="@/assets/imgs/logo.png" alt="">
        </el-col>
        <el-col>
          <h1>电商后台管理系统</h1>
        </el-col>
        <el-col :span="6">
          <div>
            欢迎上海前端31期星曜会员
            <a href="javascript:;" class="logout">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <!-- 头部下方内容 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px" class="home-aside">
        <el-menu
        default-active="4"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :router="true"
        >
        <!-- 一级菜单的图标和名称 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="users">
              <!-- 二级菜单的图标和名称 -->
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>用户列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主内容区 -->
      <el-main>
        <!-- 子路由出口 -->
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {

  }
}
</script>

<style>
.home-container {
  height: 100%;
  background-color: #eaeef1;
}

.home-header {
  background-color: #b3c1cd;
}

.home-header img {
  width: 200px;
}

.home-header h1 {
  margin: 0;
  text-align: center;
  color: #fff;
  font-size: 28px;
  font-weight: bolder;
}

.home-header div {
  min-width: 235px;
  font-weight: bold;
}

.home-header .logout {
  color: #daa520;
}

.home-aside {
  background-color: #545c64;
}

.el-header {
  padding-left: 0;
}
</style>
