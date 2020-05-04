<template>
  <div>
    <el-header>
      <el-menu mode="horizontal" :router="true" default-active="1">
        <el-menu-item index="1" route="/admin/scholarship">奖学金管理</el-menu-item>
        <el-menu-item index="2" route="/admin/unit">组织管理</el-menu-item>
        <el-menu-item index="3" route="/admin/counsellor">辅导员管理</el-menu-item>
        <el-menu-item index="4" route="/admin/system">系统设置</el-menu-item>
        <el-submenu index="5">
          <template slot="title">{{ username }}</template>
          <el-menu-item index="5-1" route="/admin/password">修改密码</el-menu-item>
          <el-menu-item @click="handleLogout">注销</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  computed: {
    username() {
      return this.$store.getters.username
    }
  },
  mounted() {
  },
  methods: {
    handleLogout() {
      this.$store.dispatch('logout').then(() => {
        this.$router.push({ path: '/login' })
      })
    }
  }
}
</script>

<style scoped>

</style>
