<template>
  <div class="main resetPass-main">
    <div class="main-content">
      <mus-header></mus-header>
      <div class="resetPass-content">
        <div class="content">
          <div class="content-title mt28 mb40">
            <img src="@/assets/images/resetPass/icon-title.png" />
          </div>
          <el-form ref="form" :model="form" :rules="rules" label-width="120px">
            <el-form-item label="身份证号：" prop="idCard">
              <el-input v-model="form.idCard" class="w28" @change="idCardChange"></el-input>
            </el-form-item>
            <el-form-item :disabled="!isIdCard" label="选择验证方式：" prop="updateType">
              <el-select v-model="form.updateType" placeholder="请选择" class="w28">
                <el-option :disabled="!cardInfo.mobile" label="手机号验证" value="mobile" />
                <el-option :disabled="!cardInfo.email" label="邮箱验证" value="email" />
              </el-select>
            </el-form-item>
            <el-form-item :disabled="!form.updateType" label="手机验证码：" prop="phoneCode">
              <div class="w28 text-left">
                <el-input v-model="form.phoneCode" class="w14"></el-input>
                <el-button v-loading="phoneLoading" type="success" class="btn-success w13 ml10" :disabled="phoneSendCodeType" @click="getPhoneSendCode">{{ phoneSendCodeCount }}</el-button>
              </div>
            </el-form-item>
            <el-form-item :disabled="!form.updateType" label="新密码：" prop="newPassword">
              <el-input v-model="form.newPassword" type="password" class="w28"></el-input>
            </el-form-item>
            <el-form-item :disabled="!form.updateType" label="确认密码：" prop="qrPassword">
              <el-input v-model="form.qrPassword" type="password" class="w28"></el-input>
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
import {
  hasIdCard,
  getVerificationCode,
  saveUpdatePass
} from '@/api/resetPass'
export default {
  name: 'ResetPass',
  components: {
  },
  data() {
    let validateIdCard = (rule, value, callback) => {
      let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else if (!reg.test(value)) {
        callback(new Error('请输入正确的身份证号'))
      } else {
        hasIdCard({ idCard: value }).then(res => {
          this.cardInfo = res.data || {}
          this.isIdCard = true
          callback()
        }).catch(() => {
          this.isIdCard = false
          this.cardInfo = {}
          callback(new Error('身份证不存在'))
        })
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.qrPassword !== '') {
          this.$refs.form.validateField('qrPassword')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      phoneLoading: false,
      phoneSendCodeType: false, // 获取手机验证码状态 false 可以获取 true 不可获取
      phoneSendCodeCount: '获取验证码',
      isIdCard: false, // 身份证是否正确
      cardInfo: { // 当前身份证包含信息
        mobile: '', // 身份证
        email: '' // 邮箱
      },
      form: {
        updateType: '', // mobile / email
        vercode: '', // 验证码
        idCard: '', // 身份证号
        newPassword: '', // 新密码
        qrPassword: '' // 密码确认
      },
      rules: {
        idCard: [
          { required: true, validator: validateIdCard, trigger: 'blur' }
        ],
        newPassword: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        qrPassword: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        vercode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        updateType: [
          { required: true, message: '请选择验证类型', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  watch: {
  },
  created() {
  },
  methods: {
    // 身份证change事件
    idCardChange(val) {
      this.$set(this.form, 'updateType', '')
      this.$set(this.form, 'vercode', '')
      this.$set(this.form, 'newPassword', '')
      this.$set(this.form, 'qrPassword', '')
    },
    handleSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          saveUpdatePass(this.form).then(res => {
            this.$message.success('修改密码成功，请重新登录')
            this.loading = false
            this.resetForm('form')
            this.Go('/')
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    // 获取手机验证码
    getPhoneSendCode() {
      let bl = true
      // 验证身份证和验证类型
      this.$refs['form'].validateField(['idCard', 'updateType'], valid => {
        if (valid) {
          bl = false
          return false
        }
      })
      if (!bl) return false
      let json = {
        updateType: this.form.updateType
      }
      if (this.form.updateType === 'mobile') {
        json.mobile = this.cardInfo.mobile
      }
      if (this.form.updateType === 'email') {
        json.email = this.cardInfo.email
      }
      this.phoneLoading = true
      getVerificationCode(json).then(res => {
        let _this = this
        this.phoneSendCodeType = true
        this.phoneSendCodeCount = '60秒后重新获取'
        let count = 60
        let indexS = ''
        this.phoneLoading = false
        function countTimeout() {
          indexS = setTimeout(() => {
            if (count <= 1) {
              _this.phoneSendCodeType = false
              _this.phoneSendCodeCount = '获取验证码'
            } else {
              count -= 1
              _this.phoneSendCodeCount = count + '秒后重新获取'
              countTimeout()
            }
          }, 1000)
        }
        countTimeout()
      }).catch(() => {
        this.phoneLoading = false
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
    .resetPass-content{
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
.resetPass-main{
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
