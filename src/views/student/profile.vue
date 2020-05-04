<template>
  <el-row :gutter="40">
    <el-col :span="12">
      <el-card header="个人信息">
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
    <el-col :span="12">
      <el-card :header="grade.year + '学年数据'">
        <div class="text item">
          考试平均分：{{ grade.score }}
        </div>
        <div class="text item">
          素质分：{{ grade.quality }}
        </div>
        <div class="text item">
          班级综合排名：{{ grade.classRank }}
        </div>
        <div class="text item">
          专业综合排名：{{ grade.specRank }}
        </div>
        <div class="text item">
          是否挂科：{{ grade.fail?'是':'否' }}
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { current } from '@/api/student'
import { grade } from '@/api/grade'

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
    current().then(res => {
      this.student = res.data
      grade(res.data.studentId).then(res => {
        this.grade = res.data
      })
    })
  }
}
</script>

<style scoped>
</style>
