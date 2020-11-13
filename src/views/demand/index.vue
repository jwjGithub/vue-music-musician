<template>
  <div class="main index-main">
    <div class="main-content">
      <mus-header></mus-header>
      <div class="demand-list">
        <template>
          <div v-for="(item,index) in 10" :key="index" class="list">
            <div class="left">
              <img src="@/assets/images/test.jpg" />
            </div>
            <div class="center">
              <div class="title">
                标题需求标题需求标题需求标题需求
              </div>
              <div class="text ellipsis2">
                这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字
                这句话一共有十个汉字这句话一
                这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字
                这句话一共有十个汉字这句话一
              </div>
            </div>
            <div class="right">
              <div class="right-row">
                <i class="icon icon-company mr6"></i>
                <p class="ellipsis flex-1">公司名称</p>
              </div>
              <div class="right-row">
                <i class="icon icon-company mr6"></i>
                <p class="ellipsis flex-1">2020-10-10 20:20:20</p>
              </div>
              <div class="right-row">
                <i class="icon icon-company mr6"></i>
                <p class="ellipsis flex-1">21</p>
              </div>
            </div>
          </div>
        </template>
        <pagination
          v-show="total>0"
          :total="Number(total)"
          :page.sync="queryForm.page"
          :limit.sync="queryForm.limit"
          @pagination="getList"
        />
      </div>
      <mus-footer></mus-footer>
    </div>
  </div>
</template>
<script>
import { getList } from '@/api/demand'
import Pagination from '@/components/Pagination'
export default {
  name: 'Demand',
  components: {
    Pagination
  },
  data() {
    return {
      loading: false,
      total: 0,
      dataList: [],
      queryForm: {
        page: 1,
        limit: 10
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      getList(this.queryForm).then(res => {
        this.dataList = res.data || []
        this.total = res.count || 0
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .main{
    .main-content{
      .demand-list{
        width:1000px;
        margin:0 auto;
        padding:26px;
        >.list{
          padding:20px;
          border-bottom:1px solid #EEE;
          display:flex;
          justify-content: space-between;
          >.left{
            width:100px;
            height:100px;
            border:1px solid #CCC;
            margin-right:20px;
            img{
              width:100%;
              height:100%;
            }
          }
          >.center{
            flex:1;
            overflow: hidden;
            padding-right:40px;
            >.title{
              font-size: 18px;
              color: #333333;
              line-height:36px;
            }
            >.text{
              font-size: 14px;
              color: #666666;
              line-height:28px;
            }
          }
          >.right{
            width:180px;
            margin-top:17px;
            height:80px;
            padding-left:20px;
            border-left:1px solid #eee;
            display:flex;
            flex-direction: column;
            justify-content: space-between;
            font-size: 14px;
            color: #999999;
            >.right-row{
              display:flex;
              align-items:center;
            }
          }
        }
      }
    }
  }
</style>

