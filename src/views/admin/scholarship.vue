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
        <el-table-column prop="assigned" label="已分配" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              round
              size="mini"
              type="success"
              @click="showDistributeDialog(scope.row)"
            >分配名额
            </el-button>
            <el-button
              round
              size="mini"
              type="primary"
              @click="showUpdateDialog(scope.row)"
            >修改
            </el-button>
            <el-button
              round
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
            >删除
            </el-button>
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
          <el-input v-model="createData.description" type="textarea" />
        </el-form-item>
        <el-form-item label="要求">
          <el-input v-model="createData.requirement" type="textarea" />
        </el-form-item>
        <el-form-item label="学期">
          <el-input v-model="createData.year" />
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
          <el-input v-model="updateData.description" type="textarea" />
        </el-form-item>
        <el-form-item label="要求">
          <el-input v-model="updateData.requirement" type="textarea" />
        </el-form-item>
        <el-form-item label="学期">
          <el-input v-model="updateData.year" disabled />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitCreate">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="distributeDialogVisible" title="分配名额" :close-on-click-modal="false">
      <span slot="footer" class="dialog-footer">
        <el-button @click="distributeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitCreate">确 定</el-button>
      </span>
    </el-dialog>
  </el-main>
</template>

<script>
import { del, create, list, find } from '@/api/scholarship'

export default {
  name: 'Scholarship',
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
      createDialogVisible: false,
      updateDialogVisible: false,
      distributeDialogVisible: false,
      defaultProps: {
        value: 'id',
        children: 'children',
        label: 'name',
        emitPath: false
      }
    }
  },
  mounted() {
    this.listAll()
  },
  methods: {
    listAll() {
      list().then(res => {
        this.tableData = res.data
      })
    },
    showUpdateDialog(data) {
      find(data.id).then(res => {
        this.updateData = res.data
      })
      this.updateDialogVisible = true
    },
    showDistributeDialog(data) {
      // find(data.id).then(res => {
      //   this.updateData = res.data
      // })
      this.distributeDialogVisible = true
    },
    submitCreate() {
      create(this.createData).then(res => {
        this.$notify({
          title: res.data,
          type: 'success',
          duration: 2500
        })
        this.listAll()
        this.createDialogVisible = false
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
        this.listAll()
      })
    }
  }
}
</script>

<style scoped>

</style>
