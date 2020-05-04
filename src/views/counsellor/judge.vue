<template>
  <el-main>
    <el-card>
      <div slot="header" class="clearfix">
        <span>奖学金申请评审</span>
      </div>
      <el-table :data="tableData">
        <el-table-column prop="studentId" label="学号" width="120" />
        <el-table-column prop="name" label="姓名" width="100" />
        <el-table-column prop="spec" label="专业" width="130" />
        <el-table-column prop="clazz" label="班级" width="100" />
        <el-table-column prop="scholarship" label="奖学金" width="160" />
        <el-table-column prop="createTime" label="申请时间" />
        <el-table-column prop="state" label="结果" :formatter="stateToResult" width="80" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button round size="mini" type="primary" @click="handleJudge(scope.row)">评审</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :visible.sync="judgeDialogVisible" :title="judgeDetail.scholarship+'申请评审材料'">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-card header="申请人信息" shadow="hover">
              <div class="text item">
                学号：{{ judgeDetail.student.studentId }}
              </div>
              <div class="text item">
                姓名：{{ judgeDetail.student.name }}
              </div>
              <div class="text item">
                性别：{{ judgeDetail.student.sex }}
              </div>
              <div class="text item">
                班级：{{ judgeDetail.student.clazz }}
              </div>
              <div class="text item">
                专业：{{ judgeDetail.student.speciality }}
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card :header="judgeDetail.grade.year + '学年数据'" shadow="hover">
              <div class="text item">
                考试平均分：{{ judgeDetail.grade.score }}
              </div>
              <div class="text item">
                素质分：{{ judgeDetail.grade.quality }}
              </div>
              <div class="text item">
                班级综合排名：{{ judgeDetail.grade.classRank }}
              </div>
              <div class="text item">
                专业综合排名：{{ judgeDetail.grade.specRank }}
              </div>
              <div class="text item">
                是否挂科：{{ judgeDetail.grade.fail?'是':'否' }}
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-form label-width="100px" style="margin-top: 30px">
          <el-form-item label="奖学金等级">
            <el-select v-model="judgeDetail.level" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="评审通过">
            <el-switch v-model="judgeDetail.state" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitJudge">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </el-main>
</template>

<script>
import { current } from '@/api/counsellor'
import { judge, update } from '@/api/application'
import { student } from '@/api/student'
import { grade } from '@/api/grade'

export default {
  data() {
    return {
      judgeDetail: {
        studentId: null,
        scholarshipId: null,
        scholarship: null,
        level: null,
        state: false,
        student: {
          studentId: null,
          name: null,
          sex: null,
          clazz: null,
          speciality: null
        },
        grade: {
          year: null,
          score: null,
          quality: null,
          fail: null,
          classRank: null,
          specRank: null
        }
      },
      judgeDialogVisible: false,
      tableData: [],
      options: [{
        value: null,
        label: '不设置等级'
      }, {
        value: '一等',
        label: '一等'
      }, {
        value: '二等',
        label: '二等'
      }, {
        value: '三等',
        label: '三等'
      }]
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    stateToResult(row, column, cellValue) {
      if (cellValue) {
        if (row.level === null) {
          return '通过'
        } else {
          return row.level
        }
      } else {
        return '未通过'
      }
    },
    getTableData() {
      current().then(res => {
        judge(res.data.unitId).then(res => {
          this.tableData = res.data
        })
      })
    },
    handleJudge(row) {
      student(row.studentId).then(res => {
        this.judgeDetail.student = res.data
      })
      grade(row.studentId).then(res => {
        this.judgeDetail.grade = res.data
      })
      this.judgeDetail.state = row.state
      this.judgeDetail.level = row.level
      this.judgeDetail.scholarship = row.scholarship
      this.judgeDetail.studentId = row.studentId
      this.judgeDetail.scholarshipId = row.scholarshipId
      this.judgeDialogVisible = true
    },
    submitJudge() {
      update(this.judgeDetail).then(res => {
        this.$notify({
          title: res.data,
          type: 'success',
          duration: 2500
        })
        this.judgeDialogVisible = false
        this.getTableData()
      })
    }
  }
}
</script>

<style scoped>

</style>
