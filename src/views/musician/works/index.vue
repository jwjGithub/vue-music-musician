<!--
 * @Date: 2020-11-26 14:19:44
 * @Description: 作品管理
 * @LastEditors: JWJ
 * @LastEditTime: 2020-11-26 14:21:15
 * @FilePath: \vue-music-musician\src\views\musician\works\index.vue
-->
<template>
  <div class="main upload-workes">
    <div class="main-content">
      <el-row>
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
export default {
  name: 'Works',
  data() {
    return {
      loading: false,
      uploadLoading: false, // 上传loading
      uploadName: '', // 上传名称
      xuzhi: false, // 须知
      lyricistsList: [], // 词作者列表
      lyricistsLoading: false, // 词作者loading
      composersList: [], // 曲作者列表
      composersLoading: false, // 曲作者loading
      producersList: [], // 制作人列表
      producersLoading: false, // 制作人loading
      tagListFG: [], // 风格标签列表
      tagListQG: [], // 情感标签列表
      tagListSD: [], // 速度标签列表
      form: {
        type: 1, // 作品类型(1：词曲，2：BEATBGM，3：作曲，4：作词)
        musicAtt: '', // 音乐作品附件id
        duration: '', // 时长
        musicWatermarkAtt: '', // 带水印音乐作品附件id
        title: '', // 作品名称
        composers: [], // 曲作者
        lyricists: [], // 词作者
        producers: [], // 制作人
        price: '', // 报价
        lyricContent: '', // 歌词文本
        tags: [], // 标签
        speed: '', // 速度
        postType: '' // 提交类型(save:保存到草稿箱,post:发布)
      },
      rules: {
        title: [
          { required: true, message: '请输入作品名称', trigger: 'blur' }
        ],
        composers: [
          { required: true, message: '请选择曲作者', trigger: ['blur', 'change'] }
        ],
        lyricists: [
          { required: true, message: '请选择词作者', trigger: ['blur', 'change'] }
        ],
        producers: [
          { required: true, message: '请选择制作人', trigger: ['blur', 'change'] }
        ],
        tags: [
          { required: true, message: '请选择标签', trigger: ['change'] }
        ],
        speed: [
          { required: true, message: '请选择速度', trigger: ['change'] }
        ],
        price: [
          { required: true, message: '请输入价格', trigger: 'blur' }
        ],
        lyricContent: [
          { required: true, message: '请输入歌词', trigger: 'blur' }
        ],
        musicAtt: [
          { required: true, message: '请上传音频文件', trigger: ['change'] }
        ]
      },
      // 默认弹窗对象
      dialogOption: {
        title: '',
        show: false
      }
    }
  },
  created() {
  },
  methods: {
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
