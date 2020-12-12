<!--
 * @Date: 2020-11-20 14:30:56
 * @Description: 主页
 * @LastEditors: jwj
 * @LastEditTime: 2020-12-12 14:11:20
 * @FilePath: \vue-music-musician\src\views\musician\user\index.vue
-->
<template>
  <div class="main ">
    <div class="main-content">
      <el-row>
        <el-col :span="24" class="ptx30 pr40 plx50">
          <div class="top-info">
            <div class="head-img">
              <img src="@/assets/images/musician/default-head.png" />
            </div>
            <div class="info-texts">
              <div class="info-title">
                <div class="info-name">{{ $store.getters.userInfo.realname || '-' }}（{{ $store.getters.userInfo.stageName || '-' }}）</div>
                <el-button size="mini" @click="openDialog">编辑个人资料</el-button>
              </div>
              <div class="info-row">
                <div class="info-row-title ">入驻时间：</div>
                <div class="info-row-text">{{ $store.getters.userInfo.createTime || '-' }}</div>
              </div>
              <div class="info-row">
                <div class="info-row-title ">{{ $store.getters.userInfo.professiondesc || '-' }}</div>
              </div>
              <div class="info-row">
                <div class="info-row-title ">个人简介：</div>
                <div class="info-row-text" v-html="$store.getters.userInfo.introduction || '-'"></div>
              </div>
            </div>
          </div>
          <div class="zp-nums">
            <div class="nums-row">
              <i class="icon icon-musician-fb"></i>
              <p>已发布作品数</p>
              <div class="num">{{ countOption.postNum || 0 }}</div>
            </div>
            <div class="nums-xian"></div>
            <div class="nums-row">
              <i class="icon icon-musician-ysc"></i>
              <p>已出售作品数</p>
              <div class="num">{{ countOption.soldNum || 0 }}</div>
            </div>
            <div class="nums-xian"></div>
            <div class="nums-row">
              <i class="icon icon-musician-zps"></i>
              <p>交易中作品数</p>
              <div class="num">{{ countOption.soldingNum || 0 }}</div>
            </div>
            <div class="nums-xian"></div>
            <div class="nums-row">
              <i class="icon icon-musician-jyze"></i>
              <p>交易成功总额</p>
              <div class="num">￥{{ countOption.totaLProfit || 0 }}</div>
            </div>
          </div>
          <div class="mt40">
            <el-button-group>
              <el-button type="primary" :plain="day7Active != 'soldData'" @click="setEchartsData('soldData')">近7日交易量</el-button>
              <el-button type="primary" :plain="day7Active != 'playData'" @click="setEchartsData('playData')">近7日播放量</el-button>
              <el-button type="primary" :plain="day7Active != 'optionData'" @click="setEchartsData('optionData')">近7日预留量</el-button>
            </el-button-group>
          </div>
          <div class="main-echarts">
            <v-chart :options="echartsOption"></v-chart>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 修改个人信息弹框 -->
    <mus-dialog
      title="编辑个人资料"
      :loading="dialogOption.loading"
      :is-show="dialogOption.show"
      :width="'600px'"
      @handleClose="dialogOption.show = false"
      @handleConfirm="handleConfirm"
    >
      <div class="pl24 pr24 pt24 pb24">
        <el-form ref="form" :model="form" :rules="rules" label-width="150px">
          <el-form-item label="上传头像：" prop="profile">
            <el-upload
              class="avatar-uploader w24"
              accept="image/*"
              :action="baseURL + '/sys/user/uploadImg'"
              :headers="{'token': getToken()}"
              :before-upload="handleBeforeUpload"
              :show-file-list="false"
              :on-success="handleSuccess"
            >
              <img v-if="dialogOption.imgUrl" :src="dialogOption.imgUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="工种：" prop="profession">
            <el-checkbox-group v-model="form.profession">
              <el-checkbox
                v-for="(item,index) in professionList"
                :key="index"
                :label="item.CODE"
              >
                {{ item.DES }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="艺名：" prop="stageName">
            <el-input v-model="form.stageName" style="width:100%;"></el-input>
          </el-form-item>
          <el-form-item label="简介：" prop="introduction">
            <el-input v-model="form.introduction" type="textarea" resize="none" rows="4" style="width:100%;"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </mus-dialog>
  </div>
</template>
<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/polar'
import {
  getUserWorkCountInfo,
  getUserWorkCountHisInfo,
  updateMusicianInfo
} from '@/api/musician/user'
import {
  getMusicianProfession
} from '@/api/register/musician'
export default {
  name: 'UploadWorks',
  components: {
    'v-chart': ECharts
  },
  data() {
    return {
      // echarts 参数
      echartsOption: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
      },
      // 统计信息
      countOption: {
        soldNum: 0, // 已出售 作品
        postNum: 0, // 已发布作品
        soldingNum: 0, // 交易中作品
        totaLProfit: 0 // 卖出总金额
      },
      // 七日统计数量
      countEcharts: {
        dateArr: [], // 时间
        optionData: [], // 七日预留数量
        soldData: [], // 七日成交数量
        playData: [] // 七日播放数量
      },
      day7Active: '', // 当前选中图表
      // 默认弹窗对象
      dialogOption: {
        title: '',
        imgUrl: '',
        show: false
      },
      professionList: [], // 工种列表
      form: {
        profile: '', // 头像id
        stageName: '', // 艺名
        profession: '', // 工种
        introduction: '' // 个人简介
      },
      rules: {
        userCode: [
          { required: true, message: '请输入员工工号', trigger: 'blur' }
        ],
        truename: [
          { required: true, message: '请输入员工名称', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getUserWorkCountInfo()
    this.getUserWorkCountHisInfo()
  },
  methods: {
    // 获取统计信息
    getUserWorkCountInfo() {
      getUserWorkCountInfo().then(res => {
        this.countOption = res.data || {}
      })
    },
    // 查询七日统计数据 - 图标
    getUserWorkCountHisInfo() {
      getUserWorkCountHisInfo().then(res => {
        this.countEcharts = res.data || {}
        this.setEchartsData('soldData')
      })
    },
    // 设置图表数据
    setEchartsData(type) {
      this.day7Active = type
      this.$set(this.echartsOption.xAxis, 'data', this.countEcharts.dateArr)
      let series = [
        {
          data: this.countEcharts[this.day7Active],
          type: 'line'
        }
      ]
      this.$set(this.echartsOption, 'series', series)
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
      this.dialogOption.imgUrl = res.data.url || ''
      this.form.profile = res.data.id || ''
    },
    // 查询工种列表
    getMusicianProfession() {
      getMusicianProfession().then(res => {
        this.professionList = res.data || []
      })
    },
    openDialog() {
      this.getMusicianProfession()
      let userInfo = this.$store.getters.userInfo
      this.dialogOption = {
        title: '编辑个人资料',
        imgUrl: '',
        show: true
      }
      this.form = {
        profile: '', // 头像id
        stageName: userInfo.stageName, // 艺名
        profession: userInfo.profession && userInfo.profession.split(','), // 工种
        introduction: userInfo.introduction // 个人简介
      }
    },
    handleConfirm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.dialogOption.loading = true
          let json = JSON.parse(JSON.stringify(this.form))
          json.profession = json.profession.join(',')
          updateMusicianInfo(json).then(res => {
            this.$notify.success({
              title: '保存成功'
            })
            this.$store.dispatch('GetInfo')
            this.dialogOption.show = false
            this.dialogOption.loading = false
          }).catch(e => {
            this.dialogOption.loading = false
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
  >.main-content{
    .top-info{
      display:flex;
      >.head-img{
        width:100px;
        height: 100px;
        margin-right:34px;
        >img{
          width:100%;
          height:100%;
        }
      }
      >.info-texts{
        color:#333;
        >.info-title{
          display:flex;
          align-items:center;
          padding-bottom:30px;
          >.info-name{
            font-weight: 600;
            font-size: 30px;
            margin-right:10px;
          }
        }
        >.info-row{
          display:flex;
          font-size: 20px;
          margin-bottom:20px;
          >.info-row-text{
            flex:1;
            overflow: hidden;
            max-width: 500px;
            line-height: 30px;
            img{
              max-width: 100%;
              max-height:400px;
            }
          }
        }
      }
    }
    .zp-nums{
      display:flex;
      justify-content: center;
      >.nums-row{
        width:280px;
        height:136px;
        display:flex;
        flex-direction: column;
        align-items:center;
        justify-content: space-between;
        .icon-musician-fb{
          width: 60px;
          height: 48px;
          background-image:url('~@/assets/images/musician/icon-musician-fb.png');
        }
        .icon-musician-ysc{
          width: 49px;
          height: 54px;
          background-image:url('~@/assets/images/musician/icon-musician-ysc.png');
        }
        .icon-musician-zps{
          width: 48px;
          height: 48px;
          background-image:url('~@/assets/images/musician/icon-musician-zps.png');
        }
        .icon-musician-jyze{
          width: 52px;
          height: 49px;
          background-image:url('~@/assets/images/musician/icon-musician-jyze.png');
        }
        >p{
          font-size: 20px;
        }
        >.num{
          font-size: 36px;
        }
      }
      >.nums-xian{
        height:136px;
        width:0;
        border-left:2px solid #e4e4e4;
      }
    }
    .main-echarts{
      width:100%;
      height:300px;
    }
  }
}
</style>
<style lang="scss">
.main-echarts{
  .echarts {
    width: 100%;
    height: 100%;
  }
}
</style>
