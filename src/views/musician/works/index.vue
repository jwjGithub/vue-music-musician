<!--
 * @Date: 2020-11-26 14:19:44
 * @Description: 作品管理
 * @LastEditors: JWJ
 * @LastEditTime: 2020-11-30 13:34:52
 * @FilePath: \vue-music-musician\src\views\musician\works\index.vue
-->
<template>
  <div class="main upload-workes">
    <div class="main-content">
      <el-row>
        <el-col :span="24">
          <div class="mt40 text-center">
            <el-button-group>
              <el-button type="primary">全部作品</el-button>
              <el-button type="primary" plain>待售作品</el-button>
              <el-button type="primary" plain>已售作品</el-button>
              <el-button type="primary" plain>优先推送中</el-button>
              <el-button type="primary" plain>下架作品</el-button>
              <el-button type="primary" plain>草稿箱</el-button>
            </el-button-group>
          </div>
        </el-col>
        <el-col :span="24" class="pt40 pb20 pl20 pr20">
          <el-table
            v-loading="loading"
            :data="dataList"
            style="width: 100%"
          >
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="title" min-width="150" label="名称"></el-table-column>
            <el-table-column prop="type" min-width="150" label="分类">
              <template slot-scope="scope">
                <span v-if="scope.row.type == 1">词曲</span>
                <span v-if="scope.row.type == 2">Beat/BGM</span>
                <span v-if="scope.row.type == 3">作曲</span>
                <span v-if="scope.row.type == 4">作词</span>
              </template>
            </el-table-column>
            <el-table-column prop="optionalTypeDes" min-width="150" label="状态"></el-table-column>
            <el-table-column prop="creatorName" min-width="150" label="风格标签"></el-table-column>
            <el-table-column prop="" min-width="150" label="报价"></el-table-column>
            <el-table-column prop="createdTime" min-width="150" label="发布日期"></el-table-column>
            <el-table-column prop="expiredTime" min-width="150" label="预留状态"></el-table-column>
            <el-table-column prop="expiredTime" min-width="150" label="操作"></el-table-column>
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
    <mus-dialog
      :title="dialogOption.title"
      :loading="dialogOption.loading"
      :is-show="dialogOption.show"
      :width="'800px'"
      :is-show-close="false"
      @handleConfirm="handleConfirm"
    >
      <div class="pl24 pr24 pt24 pb24">
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
  getUserPushListPage
} from '@/api/musician/works'
export default {
  name: 'Works',
  data() {
    return {
      total: 0,
      loading: false,
      dataList: [],
      queryForm: {
        type: '', // 分类 1词曲2Beat/Bgm 3作曲 4作词
        status: '', // 出售状态 0 待售 1出售 2交易中 3已下架
        page: 1, // 当前页
        limit: 20 // 每页条数
      },
      // 默认弹窗对象
      dialogOption: {
        title: '',
        show: false
      }
    }
  },
  created() {
    this.getList('全部作品')
  },
  methods: {
    getList(type) {
      switch (type) {
        case '全部作品':
          this.getUserAllMusicListPage()
          break

        default:
          break
      }
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
    // 获取风格标签列表
    getTagListFG() {
      getTagsByType({ type: 1 }).then(res => {
        let list = res.data || []
        list.forEach(item => {
          item.type = 1
        })
        this.tagListFG = list
      })
    },
    // 获取情感标签列表
    getTagListQG() {
      getTagsByType({ type: 2 }).then(res => {
        let list = res.data || []
        list.forEach(item => {
          item.type = 2
        })
        this.tagListQG = list
      })
    },
    // 获取速度标签列表
    getTagListSD() {
      getTagsByType({ type: 3 }).then(res => {
        this.tagListSD = res.data || []
      })
    },
    // 词作者搜索
    searchLyricistsList(val) {
      this.lyricistsLoading = true
      searchMusicians({ stageName: val }).then(res => {
        this.lyricistsLoading = false
        this.lyricistsList = res.data || []
      }).catch(() => {
        this.lyricistsLoading = false
      })
    },
    // 曲作者搜索
    searchComposersList(val) {
      this.composersLoading = true
      searchMusicians({ stageName: val }).then(res => {
        this.composersLoading = false
        this.composersList = res.data || []
      }).catch(() => {
        this.composersLoading = false
      })
    },
    // 制作人搜索
    searchProducersList(val) {
      this.producersLoading = true
      searchMusicians({ stageName: val }).then(res => {
        this.producersLoading = false
        this.producersList = res.data || []
      }).catch(() => {
        this.producersLoading = false
      })
    },
    // 打开标签选择
    openDialog() {
      this.dialogOption = {
        title: '添加标签',
        show: true
      }
    },
    // 标签选择
    tagSelect(row) {
      // 添加
      if (this.form.tags.indexOf(row) === -1) {
        this.form.tags.push(row)
      } else { // 删除
        this.form.tags.splice(this.form.tags.indexOf(row), 1)
      }
      this.$forceUpdate()
    },
    // 标签选择回调
    handleConfirm() {
      this.dialogOption.show = false
    },
    // 用户过滤 -
    setUserFilter(data) {
      let list = JSON.parse(JSON.stringify(data))
      let arr = []
      list.forEach(item => {
        if (typeof item === 'string') {
          arr.push({
            authorName: item,
            // stageName: item,
            userId: null
          })
        } else {
          arr.push({
            authorName: item.stageName,
            userId: item.userId
          })
          // arr.push(item)
        }
      })
      return arr
    },
    // 保存
    saveSubmit(type) {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (!this.xuzhi) {
            this.$message.error('请勾选阅读须知')
            return false
          }
          let json = JSON.parse(JSON.stringify(this.form))
          json.postType = type === 0 ? 'post' : 'save'
          json.composers = this.setUserFilter(json.composers)
          json.lyricists = this.setUserFilter(json.lyricists)
          json.producers = this.setUserFilter(json.producers)
          this.loading = true
          saveWork(json).then(res => {
            this.loading = false
            this.$message.success('提交成功')
            this.resetForm('form')
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    // 打开附件上传
    openFileUpload() {
      this.$refs['upload-file'].click()
    },
    // 文件选择事件
    uploadFileChange() {
      let fileObj = this.$refs['upload-file']
      let files = fileObj.files
      if (files.length > 0) {
        let file = files[0]
        const reg = '.*\\.(mp3|MP3)'
        if (file.name.match(reg) == null) {
          this.$notify.error({ title: '请选择格式为“mp3”的文件' })
          return false
        }
        if (file.size > 1024 * 1024 * 20) {
          this.$notify.error({ title: '对不起，文件不能大于20M，请重新上传' })
          return false
        }
        let formData = new FormData()
        console.log(file, '-file')
        formData.append('musicFile', file)
        this.uploadLoading = true
        uploadMusic(formData).then(res => {
          let data = res.data || {}
          this.form.duration = data.duration
          this.form.musicAtt = data.musicAtt
          this.form.musicWatermarkAtt = data.musicWatermarkAtt
          this.uploadLoading = false
          this.uploadName = file.name
        }).catch(() => {
          this.uploadLoading = false
        })
      }
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
