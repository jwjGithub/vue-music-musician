<template>
  <header class="header header-main">
    <div class="head-main">
      <div class="left">
        <div class="img mrx27 ml48">
          <img src="@/assets/images/index/logo.png" />
        </div>
      </div>
      <div class="center">
        <el-button class="text-btn" :class="{'active': selectNav == 'home'}" type="text" @click="Go('/')">首页</el-button>
        <el-button class="text-btn" type="text">词曲库</el-button>
        <el-button class="text-btn" type="text">Beat/BGM</el-button>
        <el-button class="text-btn" type="text">合作</el-button>
        <el-button class="text-btn" :class="{'active': selectNav == 'ranking'}" type="text" @click="Go('/ranking')">榜单</el-button>
      </div>
      <div class="right">
        <div class="search-input-row mr11">
          <el-input class="search-input" placeholder="歌曲/歌单/音乐人"></el-input>
          <div class="search-icon">
            <i class="icon icon-search"></i>
          </div>
        </div>
        <!-- <div class="musician">
              <i class="icon icon-musician"></i>
              <span>音乐人</span>
            </div> -->
        <el-popover
          v-if="$store.getters.userInfo.userId"
          placement="bottom"
          width="116"
          trigger="hover"
        >
          <div class="popover-list">
            <div class="list">
              <el-button class="text-btn" type="text">上传原创</el-button>
            </div>
            <div class="list">
              <el-button class="text-btn" type="text">上传翻唱</el-button>
            </div>
            <div class="list">
              <el-button class="text-btn" type="text">上传伴奏</el-button>
            </div>
            <div class="list">
              <el-button class="text-btn" type="text">上传视频</el-button>
            </div>
            <div class="list">
              <el-button class="text-btn" type="text" @click="Go('/startPlay')">歌曲管理</el-button>
            </div>
          </div>
          <div slot="reference" class="upload">
            <i class="icon icon-upload"></i>
          </div>
        </el-popover>
        <el-popover
          v-if="$store.getters.userInfo.userId"
          placement="bottom"
          width="70px"
          trigger="hover"
        >
          <div class="popover-list">
            <div v-if="$store.getters.loginType == 'company'" class="list">
              <el-button class="text-btn" type="text" @click="GoWindow('http://47.94.21.246:9082/#/?token=' + getToken())">办公空间</el-button>
            </div>
            <div v-if="$store.getters.loginType == 'musician'" class="list">
              <el-button class="text-btn" type="text" @click="GoWindow('http://47.94.21.246:9082/#/?token=' + getToken())">个人空间</el-button>
            </div>
            <div class="list">
              <el-button class="text-btn" type="text" @click="logOut">退出登录</el-button>
            </div>
          </div>
          <div slot="reference" class="personal-link">
            <i class="icon icon-login-user"></i>
            <span>{{ $store.getters.userInfo.realname }}</span>
          </div>
        </el-popover>
        <!-- <template v-if="$store.getters.userInfo.userId">
          <div v-if="$store.getters.loginType == 'company'" class="personal-link" @click="GoWindow('http://47.94.21.246:9082/#/?token=' + getToken())">
            <i class="icon icon-login-company"></i>
            <span>办公空间</span>
          </div>
          <div v-if="$store.getters.loginType == 'musician'" class="personal-link" @click="GoWindow('http://47.94.21.246:9082/#/?token=' + getToken())">
            <i class="icon icon-login-user"></i>
            <span>个人空间</span>
          </div>
        </template> -->
        <div v-if="!$store.getters.userInfo.userId" class="register-login">
          <el-popover
            placement="bottom"
            width="116"
            trigger="hover"
          >
            <div class="popover-list">
              <div class="list">
                <el-button class="text-btn" type="text" @click="openLogin('musician')">音乐人登录</el-button>
              </div>
              <div class="list">
                <el-button class="text-btn" type="text" @click="openLogin('company')">公司登录</el-button>
              </div>
            </div>
            <span slot="reference" class="login-btn pointer">登录</span>
          </el-popover>

          <span>/</span>
          <el-popover
            placement="bottom"
            width="116"
            trigger="hover"
          >
            <div class="popover-list">
              <div class="list">
                <el-button class="text-btn" type="text" @click="goRegister('musician')">音乐人注册</el-button>
              </div>
              <div class="list">
                <el-button class="text-btn" type="text" @click="goRegister('company')">公司注册</el-button>
              </div>
            </div>
            <span slot="reference" class="login-btn pointer">注册</span>
          </el-popover>
        </div>
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogOption.show"
      :show-close="false"
      class="dialog-login"
    >
      <div slot="title" class="dialog-title">
        <div>登录曲库</div>
        <!-- <i class="icon qr-code"></i> -->
      </div>
      <div class="">
        <el-form ref="form" :model="form" :rules="rules" class="text-center" :inline="true">
          <el-form-item prop="username">
            <el-input v-model="form.username" class="w28" placeholder="请输入通行证、手机号或邮箱"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              class="w28"
              placeholder="请输入密码"
              :type="dialogOption.showPass == true ? 'text' : 'password'"
            >
              <i
                slot="suffix"
                class="pointer mr20 icon"
                :class="dialogOption.showPass == true ? 'icon-pass-show' : 'icon-pass-hidden'"

                @click="dialogOption.showPass = !dialogOption.showPass"
              ></i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button v-loading="dialogOption.loading" plain type="warning" class="w28" @click="handleConfirm">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <div class="left">
          <span class="btn">用户协议</span>
          <span>丨</span>
          <span class="btn">隐私政策</span>
        </div>
        <div class="right">
          <!-- <span class="btn mr34">注册</span> -->
          <span class="btn" @click="Go('/resetPass')">忘记密码</span>
        </div>
      </div>
    </el-dialog>
  </header>
</template>
<script>
export default {
  name: 'MusHeader',
  props: {
    selectNav: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogOption: {
        showPass: false, // 是否显示密码
        loading: false,
        show: false
      },
      loginType: '', // 登录类型 musician:音乐人登录 company:公司登录
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    console.log(this.$store.getters.userInfo.userId)
  },
  methods: {
    openLogin(loginType) {
      this.loginType = loginType
      this.dialogOption.show = true
      this.resetForm('form')
    },
    logOut() {
      this.$store.dispatch('FedLogOut').then(() => {
        location.reload()
      })
    },
    // 登录提交
    handleConfirm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.dialogOption.loading = true
          if (this.loginType === 'musician') {
            this.$store.dispatch('MusicianLogin', this.form).then(() => {
              console.log('-登录成功')
              this.dialogOption.loading = false
              this.dialogOption.show = false
            }).catch(() => {
              this.dialogOption.loading = false
            })
          }
          if (this.loginType === 'company') {
            this.$store.dispatch('CompanyLogin', this.form).then(() => {
              this.dialogOption.loading = false
              this.dialogOption.show = false
            }).catch(() => {
              this.dialogOption.loading = false
            })
          }
        }
      })
    },
    // 跳转注册
    goRegister(type) {
      this.Go('/register/' + type)
    }
  }
}
</script>
<style lang="scss" scoped>
.header{
  height:80px;
  box-shadow:0 2px 8px 0 rgba(0, 0, 0, 0.04);
  .head-main{
    width:auto;
    height:100%;
    max-width:1440px;
    margin:0 auto;
    display:flex;
    justify-content: space-between;
    .left{
      display:flex;
      align-items:center;
      .img{
        width:176px;
        height:45px;
        >img{
          width:100%;
          height:100%;
        }
      }
    }
    .center{
      display:flex;
      align-items:center;
      .text-btn{
        padding:12px 10px;
        color:inherit;
        margin: 0 10px;
        border-bottom:4px solid #FFF;
        &:hover,&.active{
          border-bottom:4px solid #ffae00;
          color:#ffae00;
        }
      }
    }
    .right{
      display:flex;
      align-items:center;
      padding-right:60px;
      .search-input-row{
        display:flex;
        align-items:center;
        width: 240px;
        height: 40px;
        padding: 0;
        border-radius: 20px;
        background-color: #f8f8f8;
        .search-icon{
          height:24px;
          padding-left:12px;
          padding-right:23px;
          .icon-search{
            cursor: pointer;
            width: 24px;
            height: 24px;
            background-size: contain;
            background-position: center center;
            background-image:url('~@/assets/images/index/icon-search.png');
          }
        }
      }
      .upload{
        width: 80px;
        height: 80px;
        margin-right: 23px;
        background-color: #ffae00;
        border-radius: 3px;
        text-align: center;
        justify-content: center;;
        align-items:center;
        color:#FFF;
        font-size:16px;
        cursor: pointer;
        .icon-upload{
          width: 32px;
          height: 28px;
          margin-top:24px;
          background-size: contain;
          background-position: center center;
          background-image:url('~@/assets/images/index/icon-upload.png');
        }
      }
      .icon-user{
        width: 26px;
        height: 28px;
        margin-right: 6px;
        background-size: contain;
        background-position: center center;
        background-image:url('~@/assets/images/index/login-user.png');
      }
      .register-login{
        margin-left:20px;
        font-size:14px;
      }
      .login-btn{
        font-size:14px;
        &:hover{
          color:#ffae00;
        }
      }
      .personal-link{
        display:flex;
        flex-direction: column;
        align-items:center;
        cursor: pointer;
        margin-right:20px;
        >span{
          margin-top:8px;
          color:#333;
          font-size:12px;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.header-main{
  .search-input{
    width:270px;
    >.el-input__inner{
      border: 0;
      padding-left: 28px;
      color: #000;
      font-size: 14px;
      background: transparent;
    }
  }
  .dialog-login{
    .el-dialog{
      width:500px;
      border-radius: 10px;
    }
    .dialog-title{
      height:54px;
      display:flex;
      align-items:center;
      justify-content: center;
      position: relative;
      font-size: 24px;
      color: #666666;
      .qr-code{
        position: absolute;
        right:0;
        width: 54px;
        height: 54px;
        background-size: contain;
        background-position: center center;
        background-image:url('~@/assets/images/index/qr-code.png');
      }
    }
    .dialog-footer{
      height:60px;
      display:flex;
      align-items:center;
      justify-content: space-between;
      padding:0 28px;
      font-size: 14px;
      color: #333333;
      .btn{
        &:hover{
          cursor: pointer;
          text-decoration: underline;
        }
      }
    }
    .el-dialog__header{
      padding:16px 16px 0 16px;
    }
    .el-dialog__footer{
      padding:0;
      background: #f8f8f8;
      border-radius: 0px 0px 10px 10px
    }
    .el-input--suffix{
      .el-input__inner{
        padding-right: 44px;
      }
    }
  }
}
.el-popover{
  min-width:116px;
}
.popover-list{
  .list{
    text-align: center;;
    .text-btn{
      color:inherit;
      &:hover{
        color:#ffae00;
      }
    }
  }
}
</style>
