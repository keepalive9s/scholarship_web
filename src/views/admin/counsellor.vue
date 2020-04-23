<template>
  <el-main>
    <el-card>
      <div slot="header" class="clearfix">
        <span>辅导员</span>
        <el-button
          style="float: right;margin-left: 8px"
          size="mini"
          type="primary"
          round
          @click="handleCreate"
        >添加
        </el-button>
      </div>
      <el-table :data="counsellors">
        <el-table-column prop="staffId" label="工号" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="collage" label="学院" />
        <el-table-column prop="year" label="年级" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              round
              size="mini"
              type="warning"
              @click="handleEdit(scope.row)"
            >编辑
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
    <el-dialog :visible.sync="updateDialogVisible" title="修改辅导员信息" width="800px">
      <el-form>
        <el-form-item label="姓名">
          <el-input v-model="counsellor.name" />
        </el-form-item>
        <el-form-item label="所属单位">
          <el-cascader
            v-model="counsellor.unitId"
            :options="tree"
            :props="defaultProps"
            clearable
            style="width: 100%"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitUpdate">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="createDialogVisible" title="添加辅导员信息" width="800px">
      <el-form>
        <el-form-item label="工号">
          <el-input v-model="counsellor.staffId" />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="counsellor.name" />
        </el-form-item>
        <el-form-item label="所属单位">
          <el-cascader
            v-model="counsellor.unitId"
            :options="tree"
            :props="defaultProps"
            clearable
            style="width: 100%"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitCreate">确 定</el-button>
      </span>
    </el-dialog>
  </el-main>
</template>

<script>
import { list, del, find, update, create } from '@/api/counsellor'
import { tree } from '@/api/unit'
export default {
  name: 'Counsellor',
  data() {
    return {
      updateDialogVisible: false,
      createDialogVisible: false,
      counsellor: {
        staffId: '',
        name: '',
        unitId: ''
      },
      counsellors: [],
      tree: [],
      defaultProps: {
        value: 'id',
        children: 'children',
        label: 'name',
        checkStrictly: true,
        emitPath: false
      }
    }
  },
  created() {
    this.listCounsellors()
  },
  methods: {
    queryTree() {
      tree(1).then(response => {
        this.tree = response.data
      })
    },
    listCounsellors() {
      list().then(res => {
        this.counsellors = res.data
      })
    },
    findCounsellor(id) {
      find(id).then(res => {
        this.counsellor = res.data
      })
    },
    updateCounsellor(data) {
      update(data).then(res => {
        this.$notify({
          title: res.data,
          type: 'success',
          duration: 2500
        })
        this.listCounsellors()
      })
    },
    handleDelete(item) {
      del(item.staffId).then(res => {
        this.$notify({
          title: res.data,
          type: 'success',
          duration: 2500
        })
        this.listCounsellors()
      })
    },
    handleEdit(item) {
      this.updateDialogVisible = true
      this.findCounsellor(item.staffId)
      this.queryTree()
    },
    handleCreate() {
      this.createDialogVisible = true
      this.counsellor = { staffId: '', name: '', unitId: '' }
      this.queryTree()
    },
    submitUpdate() {
      this.updateCounsellor(this.counsellor)
      this.updateDialogVisible = false
    },
    submitCreate() {
      this.createDialogVisible = false
      create(this.counsellor).then(res => {
        this.$notify({
          title: res.data,
          type: 'success',
          duration: 2500
        })
        this.listCounsellors()
      })
    }
  }
}
</script>

<style scoped>

</style>
