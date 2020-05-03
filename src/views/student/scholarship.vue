<template>
  <el-main>
    <el-card>
      <div slot="header" class="clearfix">
        <span>奖学金</span>
      </div>
      <el-table :data="tableData">
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="year" label="学期" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              round
              size="mini"
              type="primary"
              @click="showDetailDialog(scope.row)"
            >查看
            </el-button>
            <el-button
              round
              size="mini"
              type="success"
              @click="handleSubmit(scope.row)"
            >申请
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog :visible.sync="detailDialogVisible" :title="detailData.year+'学年'+detailData.name+'奖学金详细信息'">
      <el-form label-width="50px">
        <el-form-item label="介绍">
          <el-input v-model="detailData.description" type="textarea" rows="6"/>
        </el-form-item>
        <el-form-item label="要求">
          <el-input v-model="detailData.requirement" type="textarea" rows="6"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </el-main>
</template>

<script>
import { list, find } from '@/api/scholarship'
import { create } from '@/api/application'

export default {
  data() {
    return {
      detailData: {
        name: '',
        description: '',
        requirement: '',
        year: ''
      },
      tableData: [],
      detailDialogVisible: false
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
    showDetailDialog(data) {
      find(data.id).then(res => {
        this.detailData = res.data
      })
      this.detailDialogVisible = true
    },
    handleSubmit(item) {
      create(item.id).then(res => {
        this.$notify({
          title: res.data,
          type: 'success',
          duration: 2500
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
