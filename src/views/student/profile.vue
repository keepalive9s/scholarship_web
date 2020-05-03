<template>
  <el-row :gutter="20" type="flex" justify="center">
    <el-col :span="10">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>个人信息</span>
        </div>
        <div class="text item">
          学号：{{ student.studentId }}
        </div>
        <div class="text item">
          姓名：{{ student.name }}
        </div>
        <div class="text item">
          性别：{{ student.sex }}
        </div>
        <div class="text item">
          班级：{{ student.clazz }}
        </div>
        <div class="text item">
          专业：{{ student.speciality }}
        </div>
      </el-card>
    </el-col>
    <el-col :span="10">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>{{ grade.year }}学年数据</span>
        </div>
        <div class="text item">
          考试平均分：{{ grade.score }}
        </div>
        <div class="text item">
          素质分：{{ grade.quality }}
        </div>
        <div class="text item">
          班级排名：{{ grade.classRank }}
        </div>
        <div class="text item">
          专业排名：{{ grade.specRank }}
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { gradeInfo, student } from '@/api/student'
export default {
  data() {
    return {
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
    }
  },
  mounted() {
    gradeInfo('2018-2019').then(res => {
      this.grade = res.data
    })
    student().then(res => {
      this.student = res.data
    })
  }
}
</script>

<style scoped>
    .text {
        font-size: 14px;
    }
    .item {
        margin-bottom: 18px;
    }
    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }
    .box-card {
      margin-top: 25px;
      width: 480px;
    }
</style>
