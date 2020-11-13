<template>
  <div class="main feedback-main">
    <div class="main-content">
      <mus-header></mus-header>
      <div class="feedback-content">
        <div class="content">
          <div class="content-title mt28 mb40">
            <img src="@/assets/images/feedback/icon-title.png" />
          </div>
          <el-form ref="form" :model="form" :rules="rules" label-width="120px">
            <el-form-item label="标题" prop="title">
              <el-input v-model="form.title" class="w28"></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="type">
              <el-radio-group v-model="form.type">
                <el-radio :label="0">问题反馈</el-radio>
                <el-radio :label="1">举报投诉</el-radio>
                <el-radio :label="2">优化建议</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="反馈内容" prop="content">
              <el-input v-model="form.content" type="textarea" resize="none" rows="4" class="w46"></el-input>
            </el-form-item>
            <el-form-item v-if="!$store.getters.userInfo.userId" label="姓名" prop="proposer">
              <el-input v-model="form.proposer" class="w28"></el-input>
            </el-form-item>
            <el-form-item v-if="!$store.getters.userInfo.userId" label="邮箱" prop="email">
              <el-input v-model="form.email" class="w28"></el-input>
            </el-form-item>
            <el-form-item label=" ">
              <el-button v-loading="loading" plain type="warning" class="btn-success w28 mt24" @click="handleSubmit">提交</el-button>
            </el-form-item>
          </el-form>
          <div class="position-icon"></div>
        </div>
      </div>
      <mus-footer></mus-footer>
    </div>
  </div>
</template>
<script>
import { saveQuestion } from '@/api/feedback'
export default {
  name: 'Feedback',
  components: {
  },
  data() {
    let validatePhone = (rule, value, callback) => {
      let reg = /^1[0-9]{10}$/
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else if (!reg.test(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    let validateEmail = (rule, value, callback) => {
      let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else if (!reg.test(value)) {
        callback(new Error('请输入正确的邮箱格式'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      form: {
        title: '', // 问题标题
        content: '', // 问题内容
        type: 0,
        proposer: '', // 当未登录时必填	string	提交人姓名
        email: '' // 当未登录时必填	string	提交人邮箱
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择类型', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入具体意见', trigger: 'blur' }
        ],
        proposer: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        email: [
          { required: true, validator: validateEmail, trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    $route(route) {
      let type = route.query.type
      if (type) {
        this.$set(this.form, 'type', Number(type))
      }
    }
  },
  created() {
    let type = this.$route.query.type
    if (type) {
      this.$set(this.form, 'type', Number(type))
    }
  },
  methods: {
    handleSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          saveQuestion(this.form).then(res => {
            this.$message.success('提交成功')
            this.loading = false
            this.resetForm('form')
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.main{
  height:100%;
  .main-content{
    height:100%;
    display:flex;
    justify-content: space-between;
    flex-direction:column;
    .feedback-content{
      flex:1;
      overflow-y: auto;
      padding-top:20px;
      padding-bottom: 56px;
      >.content{
        width: 1120px;
        min-height:100%;
				margin:0 auto;
        display:flex;
        flex-direction: column;
        align-items:center;
        justify-content: center;
        position: relative;
        background-color: #f6f6f6;
        >.position-icon{
          position:absolute;
          right:0;
          bottom:50px;
          width:225px;
          height:288px;
          background-repeat: no-repeat;
					background-size:cover;
					background-position: center center;
					background-image:url('~@/assets/images/feedback/icon-bg.png');
        }
      }
    }
  }
}
</style>
<style lang="scss">
.feedback-main{
  .el-input{
    .el-input__inner{
      border-radius: 20px;
    }
  }
  .btn-success{
    border-radius: 20px;
  }
  .el-button--warning{
    border-radius: 20px;
  }
  .el-loading-mask{
    border-radius: 20px;
  }
}
</style>
