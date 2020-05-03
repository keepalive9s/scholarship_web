<template>
  <el-main>
    <el-card>
      <div slot="header" class="clearfix">
        <span>组织结构</span>
        <el-button
          style="float: right;margin-left: 8px"
          size="mini"
          type="primary"
          round
          @click="unitAddDialogVisible = true"
        >添加
        </el-button>
        <el-button style="float: right;margin-left: 8px" size="mini" type="danger" round @click="delCheckUnit">删除</el-button>
      </div>
      <el-tree :data="noRootTree" :props="defaultProps" default-expand-all show-checkbox node-key="id" @check="handleCheckChange" />
    </el-card>
    <el-dialog title="添加新组织单位" :visible.sync="unitAddDialogVisible" width="800px" @open="queryTree" :close-on-click-modal="false">
      <el-form>
        <el-form-item label="组织名称">
          <el-input v-model="newUnit.name" />
        </el-form-item>
        <el-form-item label="上级组织">
          <el-cascader
            v-model="newUnit.pid"
            :options="tree"
            :props="defaultProps"
            clearable
            style="width: 100%"
            @change="handleChange"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="unitAddDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitNewUnit">确 定</el-button>
      </span>
    </el-dialog>
  </el-main>
</template>

<script>
import { noRootTree, tree, create, del } from '@/api/unit'

export default {
  data() {
    return {
      newUnit: { pid: '', name: '' },
      unitAddDialogVisible: false,
      tree: [],
      noRootTree: [],
      delCheck: [],
      defaultProps: {
        value: 'id',
        children: 'children',
        label: 'name',
        checkStrictly: true,
        emitPath: false
      }
    }
  },
  mounted: function() {
    this.queryNoRootTree()
  },
  methods: {
    handleCheckChange(data, checked) {
      this.delCheck = checked.checkedKeys
    },
    queryTree() {
      tree(1).then(response => {
        this.tree = response.data
      })
    },
    queryNoRootTree() {
      noRootTree(1).then(response => {
        this.noRootTree = response.data
      })
    },
    handleChange(value) {
      console.log(value)
    },
    submitNewUnit() {
      create(this.newUnit).then(res => {
        this.$notify({
          title: res.data,
          type: 'success',
          duration: 2500
        })
        this.queryNoRootTree()
        this.newUnit.pid = ''
        this.newUnit.name = ''
        this.unitAddDialogVisible = false
      })
    },
    delCheckUnit() {
      del(this.delCheck).then(res => {
        this.$notify({
          title: res.data,
          type: 'success',
          duration: 2500
        })
        this.queryNoRootTree()
      })
    }
  }
}
</script>

<style scoped>

</style>
