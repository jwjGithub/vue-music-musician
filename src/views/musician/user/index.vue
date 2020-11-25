<!--
 * @Date: 2020-11-20 14:30:56
 * @Description: 主页
 * @LastEditors: JWJ
 * @LastEditTime: 2020-11-25 15:29:38
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
                <el-button size="mini">编辑个人资料</el-button>
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
  </div>
</template>
<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/polar'
import {
  getUserWorkCountInfo,
  getUserWorkCountHisInfo
} from '@/api/musician/user'
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
      day7Active: '' // 当前选中图表
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
          width: 40px;
          height: 32px;
          background-image:url('~@/assets/images/musician/icon-musician-fb.png');
        }
        .icon-musician-ysc{
          width: 33px;
          height: 36px;
          background-image:url('~@/assets/images/musician/icon-musician-ysc.png');
        }
        .icon-musician-zps{
          width: 32px;
          height: 32px;
          background-image:url('~@/assets/images/musician/icon-musician-zps.png');
        }
        .icon-musician-jyze{
          width: 35px;
          height: 33px;
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
