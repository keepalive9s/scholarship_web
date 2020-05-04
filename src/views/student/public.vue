<template>
  <el-main>
    <el-card>
      <div slot="header" class="clearfix">
        <span>奖学金名单公示</span>
      </div>
      <el-table :data="tableData">
        <el-table-column prop="studentId" label="学号" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="spec" label="专业" />
        <el-table-column prop="clazz" label="班级" />
        <el-table-column prop="year" label="学年" />
        <el-table-column prop="scholarship" label="奖学金" />
        <el-table-column prop="level" label="等级" />
      </el-table>
    </el-card>
  </el-main>
</template>

<script>
import { publicity } from '@/api/application'

export default {
  data() {
    return {
      tableData: []
    }
  },
  mounted() {
    publicity().then(res => {
      this.tableData = res.data
    })
  },
  methods: {}
}
</script>

<style scoped>

</style>
