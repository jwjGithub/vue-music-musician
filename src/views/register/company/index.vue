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
            <div>
              <i class="icon icon-sjx"></i>
            </div>
            <div class="step" :class="addActive != 0 ? 'active' : ''">
              <i class="icon" :class="addActive != 0 ? 'steps-3-active' : 'steps-2'"></i>
              <span class="ml30">详细信息</span>
            </div>
            <div>
              <i class="icon icon-sjx"></i>
            </div>
            <div class="step" :class="addActive == 2 ? 'active' : ''">
              <i class="icon" :class="addActive == 2 ? 'steps-3-active' : 'steps-3'"></i>
              <span class="ml30">注册成功</span>
            </div>
          </div>
          <div class="register-form">
            <el-form ref="form" :model="form" :rules="rules" label-width="260px">
              <el-form-item v-if="addActive == 0" label="用户名：" prop="username">
                <el-input v-model="form.username" class="w24"></el-input>
              </el-form-item>
              <el-form-item v-if="addActive == 0" label="手机号：" prop="mobile">
                <el-input v-model="form.mobile" class="w24"></el-input>
              </el-form-item>
              <el-form-item v-if="addActive == 0" label="手机验证码：" prop="phoneCode">
                <div class="w24 text-left">
                  <el-input v-model="form.phoneCode" class="w10"></el-input>
                  <el-button v-loading="phoneLoading" type="success" class="btn-success w13 ml10" :disabled="phoneSendCodeType" @click="getPhoneSendCode">{{ phoneSendCodeCount }}</el-button>
                </div>
              </el-form-item>
              <el-form-item v-if="addActive == 0" label="邮箱：" prop="email">
                <el-input v-model="form.email" class="w24"></el-input>
              </el-form-item>
              <el-form-item v-if="addActive == 0" label="邮箱验证码：" prop="emailCode">
                <el-input v-model="form.emailCode" class="w10"></el-input>
                <el-button v-loading="emailLoading" type="success" class="btn-success w13 ml10" :disabled="emailSendCodeType" @click="getEmailSendCode">{{ emailSendCodeCount }}</el-button>
              </el-form-item>
              <el-form-item v-if="addActive == 1" label="真实姓名：" prop="realname">
                <el-input v-model="form.realname" class="w50"></el-input>
              </el-form-item>
              <el-form-item v-if="addActive == 1" label="公司名称：" prop="companyName">
                <el-input v-model="form.companyName" class="w50"></el-input>
              </el-form-item>
              <el-form-item v-if="addActive == 1" label="公司性质：" prop="companyType">
                <el-select v-model="form.companyType" clearable placeholder="" class="w50">
                  <el-option label="国有企业" :value="1" />
                  <el-option label="集体企业" :value="2" />
                  <el-option label="联营企业" :value="3" />
                  <el-option label="股份合作制企业" :value="4" />
                  <el-option label="私营企业" :value="5" />
                  <el-option label="合伙企业" :value="6" />
                </el-select>
              </el-form-item>
              <el-form-item v-if="addActive == 1" label="地址：" prop="address">
                <el-input v-model="form.address" class="w50"></el-input>
              </el-form-item>
              <el-form-item v-if="addActive == 1" label="简介：" style="padding-bottom:66px;" prop="introduction">
                <Editor v-model="form.introduction" class="w50" />
              </el-form-item>
              <el-form-item v-if="addActive == 1" label="网址：" prop="url">
                <el-input v-model="form.url" class="w50"></el-input>
              </el-form-item>
              <el-form-item v-if="addActive == 1" label="营业执照：" prop="lisenceAtt">
                <!-- :headers="{'accessToken': getToken()}" -->
                <el-upload
                  class="avatar-uploader w24"
                  :action="baseURL + '/company/signup/uploadLisence'"
                  accept="image/*"
                  :before-upload="handleBeforeUpload"
                  :show-file-list="false"
                  :on-success="handleSuccess"
                >
                  <img v-if="imgUrl" :src="imgUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label=" ">
                <el-button v-if="addActive == 0" v-loading="loading" type="warning" class="btn-success w24 mt24" @click="handleConfirm">下一步</el-button>
                <el-button v-if="addActive == 1" v-loading="loading" type="warning" class="btn-success w24 mt24" @click="handleSubmit">提交</el-button>
              </el-form-item>
            </el-form>
            <div v-if="addActive == 2" class="register-ok">
              <div class="register-ok-row">
                <div class="register-ok-bg"></div>
                <el-button v-if="addActive == 2" v-loading="loading" plain type="warning" class="btn-success w24 mt24" @click="Go('/')">返回主页</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <mus-footer></mus-footer>
    </div>
  </div>
</template>
<script>
import {
  getCompanyPhoneVerificationCode,
  getCompanyEmailVerificationCode,
  validityCode,
  saveCompanyRegister
} from '@/api/register/company'
import Editor from '@/components/Editor'
import { strlen } from '@/utils/index'
export default {
  name: 'RegisterCompany',
  components: {
    Editor
  },
  data() {
    let validateUserName = (rule, value, callback) => {
      let reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/
      let regNum = /^[0-9]+$/
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else if (!reg.test(value)) {
        callback(new Error('用户名仅支持中英文、数字和下划线,且不能为纯数字'))
      } else if (regNum.test(value)) {
        callback(new Error('用户名仅支持中英文、数字和下划线,且不能为纯数字'))
      } else if (strlen(value) > 14) {
        callback(new Error('用户名不能超过7个汉字或14个字符'))
      } else {
        callback()
      }
    }
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
      imgUrl: '', // 图片地址
      addActive: 0, // 添加步骤
      phoneSendCodeType: false, // 获取手机验证码状态 false 可以获取 true 不可获取
      phoneSendCodeCount: '获取验证码',
      emailSendCodeType: false, // 获取邮箱验证码状态 false 可以获取 true 不可获取
      emailSendCodeCount: '获取验证码',
      loading: false,
      emailLoading: false,
      phoneLoading: false,
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
        // gender: '', //  性别 male 男 female 女 unknown 未知
        companyName: '', // 公司名
        address: '', // 地址
        companyType: '', // 公司性质
        introduction: '', // 公司介绍
        url: '', // 网址
        lisenceAtt: '' // 公司附件Id
      },
      rules: {
        username: [
          { required: true, validator: validateUserName, trigger: 'blur' }
        ],
        mobile: [
          { required: true, validator: validatePhone, trigger: 'blur' }
        ],
        email: [
          { required: true, validator: validateEmail, trigger: 'blur' }
        ],
        phoneCode: [
          { required: true, message: '请输入手机验证码', trigger: 'blur' }
        ],
        emailCode: [
          { required: true, message: '请输入邮箱验证码', trigger: 'blur' }
        ],
        realname: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' }
        ],
        companyName: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ],
        companyType: [
          { required: true, message: '请选择公司性质', trigger: ['blur', 'change'] }
        ],
        address: [
          { required: true, message: '请输入公司地址', trigger: 'blur' }
        ],
        introduction: [
          { required: true, message: '请输入公司简介', trigger: 'blur' }
        ],
        lisenceAtt: [
          { required: true, message: '请上传营业执照', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  created() {

  },
  methods: {
    // 第一步保存回调
    handleConfirm() {
      // 公司注册第一步效验
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let phoneJson = {
            mobile: this.form.mobile,
            vercode: this.form.phoneCode,
            type: 'mobile'
          }
          this.loading = true
          // 验证手机验证码
          validityCode(phoneJson).then(res => {
            let emailJson = {
              email: this.form.email,
              vercode: this.form.emailCode,
              type: 'email'
            }
            validityCode(emailJson).then(res => {
              this.loading = false
              this.addActive = 1 // 跳转第二步
            }).catch(() => {
              this.loading = false
            })
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    // 第二部保存回调
    handleSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          saveCompanyRegister(this.form).then(res => {
            this.addActive = 2 // 注册完成
            this.loading = false
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
      this.$refs['form'].validateField(['mobile', 'username'], valid => { // 验证手机号码是否正确
        if (valid) {
          bl = false
          console.log('手机号正确')
          return false
        }
      })
      if (!bl) return false
      let json = {
        mobile: this.form.mobile,
        username: this.form.username
      }
      this.phoneLoading = true
      getCompanyPhoneVerificationCode(json).then(res => {
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
    },
    // 获取邮箱验证码
    getEmailSendCode() {
      let bl = true
      this.$refs['form'].validateField(['email'], valid => { // 验证手机号码是否正确
        if (valid) {
          bl = false
          console.log('邮箱正确')
          return false
        }
      })
      if (!bl) return false
      let json = {
        email: this.form.email
      }
      this.emailLoading = true
      getCompanyEmailVerificationCode(json).then(res => {
        let _this = this
        this.emailSendCodeType = true
        this.emailSendCodeCount = '60秒后重新获取'
        let count = 60
        let indexS = ''
        this.emailLoading = false
        function countTimeout() {
          indexS = setTimeout(() => {
            if (count <= 1) {
              _this.emailSendCodeType = false
              _this.emailSendCodeCount = '获取验证码'
            } else {
              count -= 1
              _this.emailSendCodeCount = count + '秒后重新获取'
              countTimeout()
            }
          }, 1000)
        }
        countTimeout()
      }).catch(() => {
        this.emailLoading = false
      })
    },
    // 选择文件回调
    handleBeforeUpload(file) {
      const reg = '.*\\.(jpg|png|gif|JPG|PNG|GIF)'
      if (file.name.match(reg) == null) {
        this.$notify.error({ title: '对不起，上传格式不正确，请重新上传' })
        return false
      }
      if (file.size > 1024 * 1024 * 10) {
        this.$notify.error({ title: '对不起，文件不能大于10M，请重新上传' })
        return false
      }
      return true
    },
    // 上传成功回调
    handleSuccess(res, file, fileList) {
      console.log(res, '---')
      this.imgUrl = res.data.url
      this.form.lisenceAtt = res.data.id
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
            .steps-2-active{
              width:30px;
              height:30px;
              background-size: cover;
              background-image:url('~@/assets/images/register/steps-2-active.png');
            }
            .steps-3{
              width:30px;
              height:30px;
              background-size: cover;
              background-image:url('~@/assets/images/register/steps-3.png');
            }
            .steps-3-active{
              width:30px;
              height:30px;
              background-size: cover;
              background-image:url('~@/assets/images/register/steps-3-active.png');
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
          .icon-sjx{
            width:25px;
            height:40px;
            background-size: cover;
            background-image:url('~@/assets/images/register/icon-sjx.png');
          }
        }
        .register-form{
          width:800px;
          margin:100px auto 100px auto;
          .register-ok{
            display:flex;
            align-items:center;
            justify-content: center;
            .register-ok-row{
              display:flex;
              flex-direction: column;
              align-items: center;
              .register-ok-bg{
                width:276px;
                height:209px;
                background-repeat: no-repeat;
                background-size: cover;
                background-image:url('~@/assets/images/register/company-register-ok.png');
              }
            }
          }
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
  .btn-success{
    border-radius: 20px;
  }
  .el-loading-mask{
    border-radius: 20px;
  }
  // 头像上传样式
  .avatar-uploader{
    text-align: left;
    .el-upload {
      border: 1px dashed #d9d9d9;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      // &:hover {
      //   border-color: #409EFF;
      // }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
      }
      .avatar {
        width: 100px;
        height: 100px;
        display: block;
      }
    }
  }
}
</style>
