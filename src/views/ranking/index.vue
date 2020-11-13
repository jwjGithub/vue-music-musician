<template>
  <div class="main ranking-main">
    <div class="main-content">
      <mus-header :select-nav="'ranking'"></mus-header>
      <div class="ranking-content">
        <div class="content">
          <!-- <el-scrollbar class="custom-scrollbar"> -->
          <div class="ranking-list">
            <div v-for="(item,index) in typeList" :key="index" class="list">
              <div class="title">{{ item.name }}</div>
              <div class="table-head">
                <div class="w3 c-999"></div>
                <div class="w12 c-999">歌名</div>
                <div class="w7 c-999">歌手</div>
                <div class="w7 c-999">作词</div>
                <div class="w7 c-999">作曲</div>
              </div>
              <div v-loading="loading" class="table-body">
                <el-scrollbar class="custom-scrollbar">
                  <div v-for="(itemChildren,indexChildren) in item.num" :key="indexChildren" class="table-row" :class="indexChildren == 2 ? 'active' : ''">
                    <div class="table-col w3 c-999">{{ (indexChildren + 1) }}</div>
                    <div class="table-col w12 ellipsis music-name">天数有个月亮、地下有个婆娘</div>
                    <div class="table-col w7 ellipsis c-999">周杰伦轮轮</div>
                    <div class="table-col w7 ellipsis c-999">李昌杰杰杰</div>
                    <div class="table-col w7 ellipsis c-999">兜兜又转转</div>
                  </div>
                </el-scrollbar>
              </div>
            </div>
          </div>
          <!-- </el-scrollbar> -->
        </div>
      </div>
      <!-- <mus-footer></mus-footer> -->
    </div>
  </div>
</template>
<script>
import { saveQuestion } from '@/api/feedback'
export default {
  name: 'Ranking',
  components: {
  },
  data() {
    return {
      loading: false,
      form: {
      },
      typeList: [
        { name: '抖音热歌榜', num: 50 },
        { name: '酷狗top500', num: 500 },
        { name: 'QQ音乐热歌榜', num: 300 },
        { name: '网易云飙升榜', num: 100 }
      ],
      dataList: []
    }
  },
  watch: {
  },
  created() {
  },
  methods: {
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
    .ranking-content{
      flex:1;
      overflow:hidden;
      margin:0 auto;
      // display:flex;
      // justify-content: center;
      >.content{
        width:100%;
        height:100%;
        .ranking-list{
          display:flex;
          width:100%;
          height:100%;
          .list{
            display:flex;
            flex-direction: column;
            padding:30px 0 0 0;
            margin:0 10px 40px 10px;
            width:360px;
            border-bottom:1px solid #eee;
            >.title{
              text-align: center;
              margin-bottom:20px;
            }
            .table-head{
              height:36px;
              display:flex;
              align-items:center;
              background-color:#F8F8F8;
              border-bottom: 4px solid #FFAE00;
              padding-right:10px;
              >div{
                font-size:14px;
                color:#999;
                text-align: center;
              }
            }
            .table-body{
              flex:1;
              overflow: hidden;
              .table-row{
                padding-right:10px;
                cursor: pointer;
                display:flex;
                font-size:12px;
                color:#333;
                border-bottom:1px solid #EEE;
                .table-col{
                  height:40px;
                  line-height:40px;
                  text-align: center;
                }
                &:hover,&.active{
                  background-color:#fff1d2;
                  .music-name{
                    color:#FF9000;
                  }
                }
              }
              & .table-row:last-child{
                border-bottom:none;
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
.ranking-main{
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
