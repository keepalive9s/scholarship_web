<template>
  <div>
    <el-header>
      <el-menu mode="horizontal" :router="true" default-active="1" @select="handleSelect">
        <el-menu-item index="1" route="/student/profile">个人信息</el-menu-item>
        <el-menu-item index="2" route="/student/scholarship">奖学金</el-menu-item>
        <el-menu-item index="3" route="/student/public">奖学金公示</el-menu-item>
        <el-submenu index="4">
          <template slot="title">{{ student.name }}</template>
          <el-menu-item index="4-1" route="/student/password">修改密码</el-menu-item>
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
import store from '@/store'
export default {
  data() {
    return {
    }
  },
  computed: {
    student() {
      return store.getters.student
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath)
    },
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
