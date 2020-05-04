<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <el-card header="管理学期">
        <el-input v-model="newYear" placeholder="添加新学期">
          <el-button slot="append" icon="el-icon-plus" @click="handleAdd" />
        </el-input>
        <ul>
          <li v-for="(item, index) in years" :key="index">
            {{ item }}
            <el-button type="text" @click="handleDelete(item)">删除</el-button>
          </li>
        </ul>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card header="设置当前学期">
        <el-select v-model="currentYear" placeholder="选择当前学期" @change="handleSetCurrent">
          <el-option
            v-for="(item, index) in years"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { delYear, addYear, listYears, setCurrentYear, getCurrentYear } from '@/api/admin'

export default {
  data() {
    return {
      years: [],
      currentYear: '',
      newYear: ''
    }
  },
  mounted() {
    this.handleList()
    this.handleGetCurrent()
  },
  methods: {
    handleAdd() {
      addYear(this.newYear).then(res => {
        this.$notify({
          title: res.data,
          type: 'success',
          duration: 2500
        })
        this.handleList()
        this.newYear = ''
      })
    },
    handleList() {
      listYears().then(res => {
        this.years = res.data
      })
    },
    handleSetCurrent() {
      setCurrentYear(this.currentYear).then(res => {
        this.$notify({
          title: res.data,
          type: 'success',
          duration: 2500
        })
      })
    },
    handleGetCurrent() {
      getCurrentYear().then(res => {
        this.currentYear = res.data
      })
    },
    handleDelete(item) {
      delYear(item).then(res => {
        this.$notify({
          title: res.data,
          type: 'success',
          duration: 2500
        })
        this.handleList()
      })
    }
  }
}
</script>

<style scoped>

</style>
