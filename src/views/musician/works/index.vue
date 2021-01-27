<!--
 * @Date: 2020-11-26 14:19:44
 * @Description: 作品管理
 * @LastEditors: JWJ
 * @LastEditTime: 2021-01-27 10:30:11
 * @FilePath: \vue-music-musician\src\views\musician\works\index.vue
-->
<template>
  <div class="main musician-workes">
    <div class="main-content">
      <el-row>
        <el-col :span="24">
          <div class="mt40 ml20 mb20">
            <el-button-group>
              <el-button type="primary" :plain="activeListName != '全部作品'" @click="selectActiveClick('全部作品')">全部作品</el-button>
              <el-button type="primary" :plain="activeListName != '待售作品'" @click="selectActiveClick('待售作品')">待售作品</el-button>
              <el-button type="primary" :plain="activeListName != '已售作品'" @click="selectActiveClick('已售作品')">已售作品</el-button>
              <el-button type="primary" :plain="activeListName != '优先推送中'" @click="selectActiveClick('优先推送中')">优先推送中</el-button>
              <el-button type="primary" :plain="activeListName != '下架作品'" @click="selectActiveClick('下架作品')">下架作品</el-button>
              <el-button type="primary" :plain="activeListName != '草稿箱'" @click="selectActiveClick('草稿箱')">草稿箱</el-button>
            </el-button-group>
          </div>
        </el-col>
        <el-col>
          <el-form ref="queryForm" label-width="100px" :model="queryForm" :inline="true">
            <div class="query-item">
              <div class="left-query">
                <el-form-item label="分类：" prop="type">
                  <el-select v-model="queryForm.type" clearable placeholder="" class="w24" @change="getList">
                    <el-option value="" label="全部" />
                    <el-option :value="1" label="词曲" />
                    <el-option :value="4" label="作词" />
                    <el-option :value="3" label="作曲" />
                    <el-option :value="2" label="Beat/BGM" />
                  </el-select>
                </el-form-item>
              </div>
              <div class="right-btn">
                <el-form-item prop="title">
                  <el-input v-model="queryForm.title" placeholder="请输入作品名称" class="w24"></el-input>
                </el-form-item>
                <el-form-item prop="author">
                  <el-input v-model="queryForm.author" placeholder="请输入作者名称" class="w24"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" :loading="loading" @click="getList">
                    <i class="el-icon-search"></i>
                    <span>搜索</span>
                  </el-button>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </el-col>
        <el-col :span="24" class=" pb20 pl20 pr20">
          <el-table
            v-loading="loading"
            :data="dataList"
            :row-class-name="setRowClassName"
            style="width: 100%"
          >
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column type="index" width="55" align="center"></el-table-column>
            <el-table-column prop="title" min-width="120" label="名称"></el-table-column>
            <el-table-column prop="typeDesc" min-width="100" label="分类">
              <!-- <template slot-scope="scope">
                <span v-if="scope.row.type == 1">词曲</span>
                <span v-if="scope.row.type == 2">Beat/BGM</span>
                <span v-if="scope.row.type == 3">作曲</span>
                <span v-if="scope.row.type == 4">作词</span>
              </template> -->
            </el-table-column>
            <el-table-column prop="statusDesc" min-width="80" label="状态">
              <!-- <template slot-scope="scope">
                <span v-if="scope.row.status == 0">待售</span>
                <span v-if="scope.row.status == 1">出售</span>
                <span v-if="scope.row.status == 2">交易中</span>
                <span v-if="scope.row.status == 3">已下架</span>
              </template> -->
            </el-table-column>
            <el-table-column prop="stypeTagsDesc" min-width="150" label="作品标签" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span v-if="scope.row.stypeTagsDesc">{{ scope.row.stypeTagsDesc }},</span>
                <span>{{ scope.row.emotionTagsDesc }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="price" min-width="100" label="报价">
              <template slot-scope="scope">
                <span>{{ scope.row.price }}</span>
                <el-button type="text" icon="el-icon-edit" @click="openPrice(scope.row)"></el-button>
              </template>
            </el-table-column>
            <el-table-column prop="createdTime" min-width="180" label="发布日期"></el-table-column>
            <el-table-column label="操作" fixed="right" width="200">
              <template slot-scope="scope">
                <!-- <el-button v-if="scope.row.status === 0" size="mini" type="text" @click="openEdit(scope.row)">修改截止日期</el-button>
                <el-button v-if="scope.row.status === 0" size="mini" type="text" class="c-red" @click="openZuoFei(scope.row)">关闭</el-button>
                <el-button v-if="scope.row.status === 1" size="mini" type="text" @click="openEditPage(scope.row)">编辑</el-button>
                <el-button v-if="scope.row.status === 2" size="mini" type="text" @click="openFaBu(scope.row)">重新发布</el-button> -->
                <template v-if="scope.row.postStatus == 0">
                  <el-button size="mini" type="text" @click="openEdit(scope.row)">编辑</el-button>
                  <el-button size="mini" type="text" class="c-red" @click="openDelete(1,scope.row)">删除</el-button>
                </template>
                <template v-if="scope.row.status == 0 && scope.row.postStatus == 1">
                  <el-button size="mini" type="text" @click="$message.error('暂无此功能')">推广</el-button>
                  <el-button size="mini" type="text" @click="openEdit(scope.row)">编辑</el-button>
                  <el-button size="mini" type="text" @click="openXiaJia(1,3,scope.row)">下架</el-button>
                  <el-button size="mini" type="text" class="c-red" @click="openDelete(1,scope.row)">删除</el-button>
                </template>
                <template v-if="scope.row.status == 3">
                  <el-button size="mini" type="text" @click="openEdit(scope.row)">编辑</el-button>
                  <el-button size="mini" type="text" @click="openXiaJia(1,0,scope.row)">重新上架</el-button>
                  <el-button size="mini" type="text" class="c-red" @click="openDelete(1,scope.row)">删除</el-button>
                </template>
                <el-popover
                  placement="bottom"
                  width="200"
                  trigger="click"
                  @show="popoverShowCallback(scope.row)"
                >
                  <div>
                    <p v-for="(item,index) in yuLiuList" :key="index" class="lh28">{{ index + 1 }}.{{ item.companyName }}</p>
                  </div>
                  <el-button v-if="scope.row.isReservation == 1" slot="reference" class="ml10" size="mini" type="text">预留</el-button>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            v-show="total>0"
            :total="Number(total)"
            :page.sync="queryForm.page"
            :limit.sync="queryForm.limit"
            @pagination="getList"
          />
        </el-col>
      </el-row>
    </div>
    <!-- 新增/修改 弹窗 -->
    <!-- <mus-dialog
      :title="dialogOption.title"
      :loading="dialogOption.loading"
      :is-show="dialogOption.show"
      :width="'800px'"
      :is-show-close="false"
      @handleConfirm="handleConfirm"
    >
      <div class="pl24 pr24 pt24 pb24">
      </div>
    </mus-dialog> -->
    <!-- 修改价格 弹窗 -->
    <mus-dialog
      title="修改价格"
      :loading="dialogPrice.loading"
      :is-show="dialogPrice.show"
      :width="'600px'"
      @handleClose="dialogPrice.show = false"
      @handleConfirm="priceConfirm"
    >
      <div class="pl24 pr24 pt24 pb24">
        <el-form :model="dialogPrice" label-width="150px">
          <el-form-item label="价格：">
            <el-input v-model="dialogPrice.price" type="number" class="w24"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </mus-dialog>
  </div>
</template>
<script>
import {
  searchMusicians,
  getTagsByType,
  uploadMusic,
  saveWork
} from '@/api/uploadWorkes'
import {
  getUserAllMusicListPage,
  getUserOnSaleListPage,
  getUserSoldListPage,
  getUserPushListPage,
  getUserOffShelfListPage,
  getUserUnpublishedListPage,
  updateUserMusicPostStatus,
  updateUserMusicSaleStatus,
  updateUserMusicPrice,
  getOptionalComInfo
} from '@/api/musician/works'
export default {
  name: 'Works',
  data() {
    return {
      total: 0,
      loading: false,
      popoverShow: false,
      activeListName: '全部作品',
      dataList: [],
      yuLiuList: [], // 预留公司列表
      queryForm: {
        type: '', // 分类 1词曲2Beat/Bgm 3作曲 4作词
        status: '', // 出售状态 0 待售 1出售 2交易中 3已下架
        title: '', // 作品名称
        author: '', // 作者名称
        page: 1, // 当前页
        limit: 20 // 每页条数
      },
      // 默认弹窗对象
      dialogOption: {
        title: '',
        show: false
      },
      // 修改价格弹框
      dialogPrice: {
        id: '',
        price: '',
        loading: false,
        show: false
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      switch (this.activeListName) {
        case '全部作品':
          this.getUserAllMusicListPage()
          break
        case '待售作品':
          this.getUserOnSaleListPage()
          break
        case '已售作品':
          this.getUserSoldListPage()
          break
        case '优先推送中':
          this.getUserPushListPage()
          break
        case '下架作品':
          this.getUserOffShelfListPage()
          break
        case '草稿箱':
          this.getUserUnpublishedListPage()
          break
        default:
          break
      }
    },
    // 列表切换事件
    selectActiveClick(type) {
      this.queryForm.page = 1
      this.activeListName = type
      this.getList()
    },
    // 查询全部作品
    getUserAllMusicListPage() {
      this.loading = true
      getUserAllMusicListPage(this.queryForm).then(res => {
        this.dataList = res.data || []
        this.total = res.count || 0
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    // 查询待出售作品
    getUserOnSaleListPage() {
      this.loading = true
      getUserOnSaleListPage(this.queryForm).then(res => {
        this.dataList = res.data || []
        this.total = res.count || 0
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    // 查询已出售作品
    getUserSoldListPage() {
      this.loading = true
      getUserSoldListPage(this.queryForm).then(res => {
        this.dataList = res.data || []
        this.total = res.count || 0
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    // 查询优先推送作品
    getUserPushListPage() {
      this.loading = true
      getUserPushListPage(this.queryForm).then(res => {
        this.dataList = res.data || []
        this.total = res.count || 0
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    // 查询下架作品
    getUserOffShelfListPage() {
      this.loading = true
      getUserOffShelfListPage(this.queryForm).then(res => {
        this.dataList = res.data || []
        this.total = res.count || 0
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    // 查询草稿作品
    getUserUnpublishedListPage() {
      this.loading = true
      getUserUnpublishedListPage(this.queryForm).then(res => {
        this.dataList = res.data || []
        this.total = res.count || 0
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    // 行设置动态class
    setRowClassName(row) {
      console.log(row, '--')
      if (row.row.status === 3) {
        return 'mus-table-row-status-3'
      }
    },
    // 打开下架 type:1 单个 type:2 批量
    openXiaJia(type, status, row) {
      let title = type === 1 ? '单个' : '批量'
      let statusTitle = status === 3 ? '下架' : '重新上架'
      this.$confirm('此操作将' + title + statusTitle + '作品, 是否继续?', '作品' + statusTitle, {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        let json = {
          id: type === 1 ? row.id : this.selectOption.ids.join(','),
          status: status
        }
        // 单个上下架接口
        updateUserMusicSaleStatus(json).then(res => {
          this.$notify.success({
            title: '操作成功'
          })
          this.getList()
        })
      }).catch(() => {

      })
    },
    // 打开删除 type:1 单个 type:2 批量
    openDelete(type, row) {
      let title = type === 1 ? '单个' : '批量'
      this.$confirm('此操作将' + title + '删除作品, 是否继续?', '作品删除', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        let json = {
          id: type === 1 ? row.id : this.selectOption.ids.join(','),
          postStatus: -1
        }
        updateUserMusicPostStatus(json).then(res => {
          this.$notify.success({
            title: '操作成功'
          })
          this.getList()
        })
      }).catch(() => {

      })
    },
    // 打开修改价格
    openPrice(row) {
      this.dialogPrice = {
        id: row.id,
        price: row.price,
        loading: false,
        show: true
      }
    },
    // 修改价格回调
    priceConfirm() {
      if (!this.dialogPrice.price) {
        this.$message.error('请输入价格')
        return false
      }
      this.dialogPrice.loading = true
      let json = {
        id: this.dialogPrice.id,
        price: this.dialogPrice.price
      }
      updateUserMusicPrice(json).then(res => {
        this.dialogPrice.loading = false
        this.dialogPrice.show = false
        this.$notify.success({
          title: '操作成功'
        })
        this.getList()
      }).catch(() => {
        this.dialogPrice.loading = false
      })
    },
    // 预留显示公司回调
    popoverShowCallback(row) {
      getOptionalComInfo({ id: row.id }).then(res => {
        this.yuLiuList = res.data || []
      })
      console.log(row, 'rrrr')
    },
    // 跳转音乐作品编辑
    openEdit(row) {
      this.Go('/uploadWorks', { id: row.id })
    }
  }
}
</script>
<style lang="scss" scoped>
.upload-workes{
  .el-tag{
    cursor: pointer;
    margin-right:10px;
    margin-bottom:10px;
  }
}
</style>
<style lang="scss">
.musician-workes{
  .mus-table-row-status-3{
    background-color:#ddd;
    &.hover-row{
      >td{
        background-color:#ddd;
      }
    }
  }
}
</style>
