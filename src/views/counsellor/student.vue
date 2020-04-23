<template>
  <el-main>
    <el-card>
      <div slot="header" class="clearfix">
        <span>学生列表</span>
        <el-button
          :loading="loading"
          style="float: right;margin-left: 8px"
          size="mini"
          type="primary"
          round
          @click="handleUpload"
        >导入学生信息
        </el-button>
      </div>
      <el-table :data="page.records" size="small">
        <el-table-column prop="studentId" label="学号" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="sex" label="性别" />
        <el-table-column prop="speciality" label="专业" />
        <el-table-column prop="clazz" label="班级" />
        <el-table-column label="操作">
          <template slot-scope="scope">
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
      <el-pagination
        :current-page.sync="page.current"
        :page-size.sync="page.size"
        :total="page.total"
        :page-sizes="[8, 10, 20, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="queryAll"
        @size-change="queryAll"
      />
    </el-card>
    <el-dialog :visible.sync="uploadDialogVisible" title="导入学生信息" width="800px">
      <el-form>
        <el-form-item label="请选择学生所属班级">
          <el-cascader
            v-model="unitId"
            :options="tree"
            :props="defaultProps"
            clearable
            style="width: 100%"
          />
        </el-form-item>
      </el-form>
      <upload-excel :on-success="handleSuccess" :before-upload="beforeUpload" :headers="['studentId', 'name', 'sex', 'idNumber']" />
    </el-dialog>
  </el-main>
</template>
<script>
import UploadExcel from '../../components/UploadExcel'
import { upload } from '@/api/student'
import { tree } from '@/api/unit'
import store from '@/store'
import { del, listByYearUnitId } from '@/api/student'

export default {
  components: { UploadExcel },
  data() {
    return {
      page: {
        current: 1,
        size: 8,
        total: null,
        records: []
      },
      loading: false,
      uploadDialogVisible: false,
      students: [],
      unitId: null,
      tree: [],
      defaultProps: {
        value: 'id',
        children: 'children',
        label: 'name',
        emitPath: false
      }
    }
  },
  mounted() {
    if (store.getters.counsellor.unitId == null) {
      const unWatch = this.$watch(function() {
        return store.getters.counsellor.unitId
      }, function(newVal, oldVal) {
        this.queryAll().then(() => {
          unWatch()
        })
      })
    } else {
      this.queryAll()
    }
  },
  methods: {
    queryAll() {
      return listByYearUnitId(store.getters.counsellor.unitId,
        { current: this.page.current, size: this.page.size }).then(res => {
        this.page = res.data
      })
    },
    handleDelete(item) {
      del(item.studentId).then(res => {
        this.$notify({
          title: res.data,
          type: 'success',
          duration: 2500
        })
        this.queryAll()
      })
    },
    queryTree() {
      tree(store.getters.counsellor.unitId).then(response => {
        this.tree = response.data
      })
    },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1
      if (isLt1M) {
        return true
      }
      this.$message({
        message: '请不要上传大于1M的文件',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results }) {
      this.loading = true
      this.students = results
      this.uploadDialogVisible = false
      upload(this.unitId, this.students).then(res => {
        this.$notify({
          title: res.data,
          type: 'success',
          duration: 2500
        })
        this.queryAll()
        this.loading = false
      }).catch(error => {
        this.$notify({
          title: error,
          type: 'error',
          duration: 2500
        })
      })
    },
    handleUpload() {
      this.uploadDialogVisible = true
      this.queryTree()
    }
  }
}
</script>

<style scoped>

</style>
