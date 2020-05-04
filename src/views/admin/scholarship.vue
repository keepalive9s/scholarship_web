<template>
  <el-main>
    <el-card>
      <div slot="header" class="clearfix">
        <span>奖学金</span>
        <el-button
          style="float: right;margin-left: 8px"
          size="mini"
          type="primary"
          round
          @click="createDialogVisible = true"
        >创建奖学金
        </el-button>
      </div>
      <el-table :data="tableData">
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="year" label="学期" />
        <el-table-column prop="assigned" label="获奖人数" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button round size="mini" type="primary" @click="showUpdateDialog(scope.row)">修改</el-button>
            <el-button round size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog :visible.sync="createDialogVisible" title="创建奖学金" :close-on-click-modal="false">
      <el-form label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="createData.name" />
        </el-form-item>
        <el-form-item label="介绍">
          <el-input v-model="createData.description" type="textarea" rows="6" />
        </el-form-item>
        <el-form-item label="要求">
          <el-input v-model="createData.requirement" type="textarea" rows="6" />
        </el-form-item>
        <el-form-item label="学期">
          <el-select v-model="createData.year" placeholder="选择学期">
            <el-option
              v-for="(item, index) in years"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitCreate">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="updateDialogVisible" title="修改奖学金信息" :close-on-click-modal="false">
      <el-form :model="updateData" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="updateData.name" disabled />
        </el-form-item>
        <el-form-item label="介绍">
          <el-input v-model="updateData.description" type="textarea" rows="6" />
        </el-form-item>
        <el-form-item label="要求">
          <el-input v-model="updateData.requirement" type="textarea" rows="6" />
        </el-form-item>
        <el-form-item label="学期">
          <el-input v-model="updateData.year" disabled />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitUpdate">确 定</el-button>
      </span>
    </el-dialog>
  </el-main>
</template>

<script>
import { del, create, listAll, find, update } from '@/api/scholarship'
import { listYears } from '@/api/admin'

export default {
  data() {
    return {
      createData: {
        name: null,
        description: null,
        requirement: null,
        year: null
      },
      updateData: {
        name: null,
        description: null,
        requirement: null,
        year: null
      },
      tableData: [],
      years: [],
      createDialogVisible: false,
      updateDialogVisible: false,
      defaultProps: {
        value: 'id',
        children: 'children',
        label: 'name',
        emitPath: false
      }
    }
  },
  mounted() {
    this.showTable()
    listYears().then(res => {
      this.years = res.data
    })
  },
  methods: {
    showTable() {
      listAll().then(res => {
        this.tableData = res.data
      })
    },
    showUpdateDialog(data) {
      find(data.id).then(res => {
        this.updateData = res.data
      })
      this.updateDialogVisible = true
    },
    submitCreate() {
      create(this.createData).then(res => {
        this.$notify({
          title: res.data,
          type: 'success',
          duration: 2500
        })
        this.showTable()
        this.createDialogVisible = false
      }).catch(error => {
        this.$notify({
          title: error.data,
          type: 'error',
          duration: 2500
        })
      })
    },
    submitUpdate() {
      update(this.updateData).then(res => {
        this.$notify({
          title: res.data,
          type: 'success',
          duration: 2500
        })
        this.showTable()
        this.updateDialogVisible = false
      }).catch(error => {
        this.$notify({
          title: error.data,
          type: 'error',
          duration: 2500
        })
      })
    },
    handleDelete(item) {
      del(item.id).then(res => {
        this.$notify({
          title: res.data,
          type: 'success',
          duration: 2500
        })
        this.showTable()
      })
    }
  }
}
</script>

<style scoped>

</style>
