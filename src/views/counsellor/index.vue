<template>
  <div>
    <el-header>
      <el-menu mode="horizontal" :router="true" default-active="1" @select="handleSelect">
        <el-menu-item index="1" route="/counsellor/student">学生管理</el-menu-item>
        <el-menu-item index="2" route="/counsellor/grade">成绩管理</el-menu-item>
        <el-submenu index="4">
          <template slot="title">{{ counsellor.name }}</template>
          <el-menu-item index="4-1" route="/counsellor/password">修改密码</el-menu-item>
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
    counsellor() {
      return store.getters.counsellor
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
