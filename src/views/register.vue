<template>
  <div class="main register-main">
    <div class="main-content">
      <mus-header></mus-header>
      <div class="register-content">
        <div class="register-forms">
          <div class="steps">
            <div class="step active">
              <i class="icon steps-1"></i>
              <span class="ml30">基础信息</span>
            </div>
            <div>></div>
            <div class="step">
              <i class="icon steps-2"></i>
              <span class="ml30">详细信息</span>
            </div>
            <div>></div>
            <div class="step">
              <i class="icon steps-3"></i>
              <span class="ml30">注册成功</span>
            </div>
          </div>
          <div class="register-form">
            <el-form ref="form" :model="form" :rules="rules" label-width="160px" :inline="true">
              <el-form-item v-if="addActive == 0" label="用户姓名：" prop="username">
                <el-input v-model="form.username" class="w24"></el-input>
              </el-form-item>
              <el-form-item v-if="addActive == 0" label="手机号：" prop="mobile">
                <el-input v-model="form.mobile" class="w24"></el-input>
              </el-form-item>
              <el-form-item v-if="addActive == 0" label="验证码：" prop="phoneCode">
                <div class="w24 text-left">
                  <el-input v-model="form.phoneCode" class="w10"></el-input>
                  <el-button type="success" class="w13 ml10" :disabled="phoneSendCodeType" @click="getPhoneSendCode">{{ phoneSendCodeCount }}</el-button>
                </div>
              </el-form-item>
              <el-form-item v-if="addActive == 1" label="邮箱：" prop="email">
                <el-input v-model="form.email" class="w24"></el-input>
              </el-form-item>
              <el-form-item v-if="addActive == 1" label="验证码：" prop="phoneCode">
                <el-input v-model="form.phoneCode" class="w10"></el-input>
                <el-button type="success" class="w13 ml10" :disabled="phoneSendCodeType" @click="getPhoneSendCode">{{ phoneSendCodeCount }}</el-button>
              </el-form-item>
              <el-form-item v-if="addActive == 2" label="真名：" prop="realname">
                <el-input v-model="form.realname" class="w24"></el-input>
              </el-form-item>
              <el-form-item v-if="addActive == 2" label="性别：" prop="gender">
                <el-select v-model="form.gender" clearable placeholder="" class="w24">
                  <el-option label="男" value="MALE" />
                  <el-option label="女" value="FEMALE" />
                  <el-option label="未知" value="UNKNOW" />
                </el-select>
              </el-form-item>
              <el-form-item label=" ">
                <el-button type="warning" class="w24 mt24" @click="handleConfirm">下一步</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <mus-footer></mus-footer>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Register',
  data() {
    return {
      addActive: 0, // 添加步骤
      phoneSendCodeType: false, // 获取手机验证码状态 false 可以获取 true 不可获取
      phoneSendCodeCount: '获取验证码',
      emailSendCodeType: false, // 获取邮箱验证码状态 false 可以获取 true 不可获取
      emailSendCodeCount: '获取验证码',
      loading: false,
      dataList: [],
      roleList: [], // 角色列表
      queryForm: {
        status: '', // 审核状态，0正常，1作废，2审核中，3退回，多种状态传 1,2
        page: 1, // 当前页
        limit: 10 // 每页条数
      },
      form: {
        phoneCode: '', // 手机验证码
        emailCode: '', // 邮箱验证码
        username: '', // 用户名
        email: '', // 邮箱
        mobile: '', // 手机号
        realname: '', // 真名
        gender: '', //  性别 male 男 female 女 unknown 未知
        companyName: '', // 公司名
        address: '', // 地址
        introduction: '', // 公司介绍
        file: '' // 公司附件
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        phoneCode: [
          { required: true, message: '请输入手机验证码', trigger: 'blur' }
        ],
        userType: [
          { required: true, message: '请选择用户类型', trigger: ['blur', 'change'] }
        ],
        status: [
          { required: true, message: '请选择用户状态', trigger: ['blur', 'change'] }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: ['blur', 'change'] }
        ],
        userManageroleId: [
          { required: true, message: '请选择角色', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  created() {

  },
  methods: {
    // 保存回调
    handleConfirm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // if (this.form.userId) {
          //   this.saveEdit()
          // } else {
          //   this.saveAdd()
          // }
        } else {
          return false
        }
      })
    },
    // 获取手机验证码
    getPhoneSendCode() {
      let bl = true
      this.$refs['form'].validateField(['mobile', 'username'], valid => { // 验证手机号码是否正确
        if (!valid) {
          let json = {
            mobile: this.form.mobile,
            username: this.form.username
          }
          // getPhoneSendCode(json).then(res => {
          //   console.log(res, '--res')
          // })
          console.log('手机号正确')
        } else {
          bl = false
          return false
        }
      })
      console.log('效验')
      if (!bl) return false
      let _this = this
      this.phoneSendCodeType = true
      this.phoneSendCodeCount = '60秒后重新获取'
      let count = 60
      let indexS = ''
      // get_send_code(_this.$axios, { phone: _this.activationForm.username }).then(res => {
      //   let _data = res.data
      //   if (_data.statusCode === 200) {

      //   } else {
      //     _this.$Message.error(_data.statusMsg)
      //   }
      // }).catch(error => {
      //   console.log(error)
      // })
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
    .register-content{
      flex:1;
      .register-forms{
        width: 1100px;
        margin:0 auto;
        .steps{
          margin-top:30px;
          height: 100px;
          padding:0 60px;
          background-color: #f8f8f8;
          border-radius: 10px;
          display:flex;
          align-items:center;
          justify-content: space-around;
          .step{
            display:flex;
            align-items:center;
            .steps-1{
              width:30px;
              height:30px;
              background-size: cover;
              background-image:url('~@/assets/images/register/steps-1.png');
            }
            .steps-2{
              width:30px;
              height:30px;
              background-size: cover;
              background-image:url('~@/assets/images/register/steps-2.png');
            }
            .steps-3{
              width:30px;
              height:30px;
              background-size: cover;
              background-image:url('~@/assets/images/register/steps-3.png');
            }
            >span{
              font-family: PingFangSC-Regular;
              font-size: 18px;
              color: #ffae00;
            }
            &.active{
              >span{
                color: #6db93b;
              }
            }
          }
        }
        .register-form{
          width:600px;

          margin:100px auto 0 auto;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.register-main{
  .el-input{
    .el-input__inner{
      border-radius: 20px;
    }
  }
  .el-button{
    border-radius: 20px;
  }
}
</style>
