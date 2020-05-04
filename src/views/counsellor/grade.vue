<template>
  <el-main>
    <el-card>
      <div slot="header" class="clearfix">
        <span>综合测评(降序)</span>
        <el-button
          :loading="qualityLoading"
          style="float: right;margin-left: 8px"
          size="mini"
          type="primary"
          round
          @click="uploadQualityDialogVisible = true"
        >导入素质分数据
        </el-button>
        <el-button
          :loading="scoreLoading"
          style="float: right;margin-left: 8px"
          size="mini"
          type="primary"
          round
          @click="uploadScoreDialogVisible = true"
        >导入考试分数据
        </el-button>
      </div>
      <el-table :data="page.records" size="small">
        <el-table-column prop="studentId" label="学号" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="speciality" label="专业" />
        <el-table-column prop="clazz" label="班级" />
        <el-table-column prop="year" label="学期" />
        <el-table-column prop="score" label="考试分" />
        <el-table-column prop="quality" label="素质分" />
        <el-table-column prop="mark" label="综合" />
        <el-table-column prop="fail" label="挂科">
          <template slot-scope="scope">
            {{ scope.row.fail?'是':'否' }}
          </template>
        </el-table-column>
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
        @current-change="queryData"
        @size-change="queryData"
      />
    </el-card>
    <el-dialog :visible.sync="uploadScoreDialogVisible" title="导入考试分数据" :close-on-click-modal="false" width="700px">
      <el-form>
        <el-form-item label="学期:">
          <el-select v-model="year" placeholder="选择学期">
            <el-option
              v-for="(item, index) in years"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <upload-excel :on-success="handleSuccess1" :before-upload="beforeUpload" :headers="headers1" />
    </el-dialog>
    <el-dialog :visible.sync="uploadQualityDialogVisible" title="导入素质分数据" :close-on-click-modal="false" width="700px">
      <el-form>
        <el-form-item label="学期:">
          <el-select v-model="year" placeholder="选择学期">
            <el-option
              v-for="(item, index) in years"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <upload-excel :on-success="handleSuccess2" :before-upload="beforeUpload" :headers="headers2" />
    </el-dialog>
  </el-main>
</template>

<script>
import UploadExcel from '@/components/UploadExcel'
import { current } from '@/api/counsellor'
import { del, upload, listByUnit } from '@/api/grade'
import { listYears } from '@/api/admin'

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
      headers1: ['studentId', 'score', 'fail'],
      headers2: ['studentId', 'quality'],
      scoreLoading: false,
      qualityLoading: false,
      uploadScoreDialogVisible: false,
      uploadQualityDialogVisible: false,
      grades: [],
      years: [],
      year: null,
      defaultProps: {
        value: 'id',
        children: 'children',
        label: 'name',
        emitPath: false
      }
    }
  },
  mounted() {
    this.queryData()
    listYears().then(res => {
      this.years = res.data
    })
  },
  methods: {
    queryData() {
      current().then(res => {
        listByUnit(res.data.unitId, { current: this.page.current, size: this.page.size }).then(res => {
          this.page = res.data
        })
      })
    },
    handleDelete(item) {
      del(item.studentId, item.year).then(res => {
        this.$notify({
          title: res.data,
          type: 'success',
          duration: 2500
        })
        this.queryData()
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
    handleSuccess1({ results }) {
      this.scoreLoading = true
      this.grades = results
      this.uploadScoreDialogVisible = false
      upload(this.year, this.grades).then(res => {
        this.$notify({
          title: res.data,
          type: 'success',
          duration: 2500
        })
        this.scoreLoading = false
        this.queryData()
      }).catch(error => {
        this.$notify({
          title: error,
          type: 'error',
          duration: 2500
        })
        this.scoreLoading = false
      })
    },
    handleSuccess2({ results }) {
      this.qualityLoading = true
      this.grades = results
      this.uploadQualityDialogVisible = false
      upload(this.year, this.grades).then(res => {
        this.$notify({
          title: res.data,
          type: 'success',
          duration: 2500
        })
        this.qualityLoading = false
        this.queryData()
      }).catch(error => {
        this.$notify({
          title: error,
          type: 'error',
          duration: 2500
        })
        this.qualityLoading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
