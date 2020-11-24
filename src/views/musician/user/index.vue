<!--
 * @Date: 2020-11-20 14:30:56
 * @Description: 主页
 * @LastEditors: JWJ
 * @LastEditTime: 2020-11-20 14:31:21
 * @FilePath: \vue-music-musician\src\views\uploadWorks\index.vue
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
                <div class="info-name">张三（艺名）</div>
                <el-button size="mini">编辑个人资料</el-button>
              </div>
              <div class="info-row">
                <div class="info-row-title ">入驻事件：</div>
                <div class="info-row-text">2020-10-30</div>
              </div>
              <div class="info-row">
                <div class="info-row-title ">作词、作曲、编曲</div>
              </div>
              <div class="info-row">
                <div class="info-row-title ">个人简介：</div>
                <div class="info-row-text">
                  显示三行，单行显示数字根据具体排版进行调整
                  剩余部分点击更多显示剩余部分点击更多显示剩
                </div>
              </div>
            </div>
          </div>
          <div class="zp-nums">
            <div class="nums-row">
              <i class="icon icon-musician-fb"></i>
              <p>已发布作品数</p>
              <div class="num">50</div>
            </div>
            <div class="nums-xian"></div>
            <div class="nums-row">
              <i class="icon icon-musician-ysc"></i>
              <p>已出售作品数</p>
              <div class="num">50</div>
            </div>
            <div class="nums-xian"></div>
            <div class="nums-row">
              <i class="icon icon-musician-zps"></i>
              <p>交易中作品数</p>
              <div class="num">50</div>
            </div>
            <div class="nums-xian"></div>
            <div class="nums-row">
              <i class="icon icon-musician-jyze"></i>
              <p>交易成功总额</p>
              <div class="num">￥5550</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: 'UploadWorks',
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
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
  }
}
</style>
