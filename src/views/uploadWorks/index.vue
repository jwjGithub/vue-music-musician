<!--
 * @Date: 2020-11-20 14:30:56
 * @Description: 上传作品
 * @LastEditors: JWJ
 * @LastEditTime: 2021-01-27 10:29:59
 * @FilePath: \vue-music-musician\src\views\uploadWorks\index.vue
-->
<template>
  <div class="main upload-workes">
    <div class="main-content">
      <el-row>
        <el-col :span="24" class="ptx40 pr40 pl40">
          <el-form ref="form" :model="form" :rules="rules" label-width="200px">
            <el-form-item label="上传作品类型：" prop="type">
              <el-select v-model="form.type" class="w40" @change="clearValidate('form')">
                <el-option label="词曲" :value="1" />
                <el-option label="作词" :value="4" />
                <el-option label="作曲" :value="3" />
                <el-option label="Beat/BGM" :value="2" />
              </el-select>
            </el-form-item>
            <el-form-item label="作品名称：" prop="title">
              <el-input v-model="form.title" placeholder="请输入" maxlength="30" class="w40"></el-input>
            </el-form-item>
            <el-form-item v-if="form.type == 1 || form.type == 4" label="词作者：" prop="lyricists">
              <el-select
                v-model="form.lyricists"
                multiple
                filterable
                remote
                allow-create
                default-first-option
                :value-key="'userId'"
                :remote-method="searchLyricistsList"
                :loading="lyricistsLoading"
                placeholder="请搜索选择"
                class="w40 select-author-tag-lyricists"
                popper-class="select-popper-class-author"
                @change="(val) => { selectComposersChange(val,'select-author-tag-lyricists') }"
              >
                <el-option
                  v-for="(item,index) in lyricistsList"
                  :key="index"
                  :label="item.stageName"
                  :value="item"
                >
                  <div class="select-user-head-option">
                    <img :src="item.profile">
                    <span>{{ item.stageName }}</span>
                  </div>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="form.type == 1 || form.type == 3" label="曲作者：" prop="composers">
              <el-select
                v-model="form.composers"
                multiple
                filterable
                remote
                allow-create
                default-first-option
                :value-key="'userId'"
                :remote-method="searchComposersList"
                :loading="composersLoading"
                placeholder="请搜索选择"
                class="w40 select-author-tag-composers"
                popper-class="select-popper-class-author"
                @change="(val) => { selectComposersChange(val,'select-author-tag-composers') }"
              >
                <el-option
                  v-for="(item,index) in composersList"
                  :key="index"
                  :label="item.stageName"
                  :value="item"
                >
                  <div class="select-user-head-option">
                    <img :src="item.profile">
                    <span>{{ item.stageName }}</span>
                  </div>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="form.type == 2" label="制作人：" prop="producers">
              <el-select
                v-model="form.producers"
                multiple
                filterable
                remote
                allow-create
                default-first-option
                :value-key="'userId'"
                :remote-method="searchProducersList"
                :loading="producersLoading"
                placeholder="请搜索选择"
                class="w40 select-author-tag-producers"
                popper-class="select-popper-class-author"
                @change="(val) => { selectComposersChange(val,'select-author-tag-producers') }"
              >
                <el-option
                  v-for="(item,index) in producersList"
                  :key="index"
                  :label="item.stageName"
                  :value="item"
                >
                  <div class="select-user-head-option">
                    <img :src="item.profile">
                    <span>{{ item.stageName }}</span>
                  </div>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="作品标签：" prop="tags">
              <div class="w50">
                <el-tag
                  v-for="(item,index) in form.tags"
                  :key="index"
                  type=""
                  :effect="'dark'"
                >
                  {{ item.des }}
                </el-tag>
                <el-button type="text" icon="el-icon-plus" @click="openDialog">添加标签</el-button>
              </div>
            </el-form-item>
            <el-form-item v-if="form.type != 4" label="速度：" prop="speed">
              <div>
                <el-tag
                  v-for="item in tagListSD"
                  :key="item.code"
                  type=""
                  :effect="form.speed == item.code ? 'dark' : 'plain'"
                  @click="form.speed = item.code"
                >
                  {{ item.des }}
                </el-tag>
              </div>
            </el-form-item>
            <el-form-item label="价格：" prop="price">
              <el-input v-model="form.price" placeholder="请输入" type="number" class="w40"></el-input>
            </el-form-item>
            <el-form-item v-if="form.type == 1 || form.type == 4" label="歌词：" prop="lyricContent">
              <el-input v-model="form.lyricContent" type="textarea" :rows="4" placeholder="请输入" :resize="'none'" class="w40"></el-input>
              <p class="ft14 c-999 ml10 lh28">支持输入普通歌词和滚动歌词</p>
            </el-form-item>
            <el-form-item v-if="form.type !== 4" label="音频：" prop="musicAtt">
              <el-button type="primary" size="mini" icon="el-icon-plus" :loading="uploadLoading" @click="openFileUpload">{{ uploadName || '上传音频文件' }}</el-button>
              <span class="ft14 c-999 ml10 lh28">支持MP3格式，文件大小不超过20MB</span>
              <mus-progress ref="mus-progress"></mus-progress>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="xuzhi"></el-checkbox>
              <span class="ft12 ml5">我已阅读并同意平台上传<el-link type="primary" class="ft12 lh16">作品须知</el-link></span>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" :loading="loading" class="ml50 mr50" size="medium" @click="saveSubmit(0)">发布作品</el-button>
              <el-button class="ml50" :loading="loading" size="medium" @click="saveSubmit(1)">保存为草稿</el-button>
            </el-form-item>
          </el-form>
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
      @handleClose="dialogOption.show = false"
      @handleConfirm="handleConfirm"
    >
      <div class="pl24 pr24 pt24 pb24">
        <el-form :model="form" label-width="150px">
          <el-form-item label="风格（可多选）：">
            <el-tag
              v-for="item in tagListFG"
              :key="item.code"
              type=""
              :effect="form.tags.indexOf(item) !== -1 ? 'dark' : 'plain'"
              @click="tagSelect(item)"
            >
              {{ item.des }}
            </el-tag>
          </el-form-item>
          <el-form-item label="情感（可多选）：">
            <el-tag
              v-for="item in tagListQG"
              :key="item.code"
              type=""
              :effect="form.tags.indexOf(item) !== -1 ? 'dark' : 'plain'"
              @click="tagSelect(item)"
            >
              {{ item.des }}
            </el-tag>
          </el-form-item>
        </el-form>
      </div>
    </mus-dialog>
    <!-- 附件上传 -->
    <input ref="upload-file" type="file" accept=".mp3" style="display: none" @change="uploadFileChange" />
  </div>
</template>
<script>
import {
  searchMusicians,
  getTagsByType,
  uploadMusic,
  saveWork,
  getMusicUploadInfo
} from '@/api/uploadWorkes'
import MusProgress from '@/components/MusProgress'
export default {
  name: 'UploadWorks',
  components: {
    MusProgress
  },
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
  watch: {
    $route(route) {
      let type = route.query.type
      if (type) {
        this.$set(this.form, 'type', Number(type))
      }
    }
  },
  created() {
    if (this.$route.query.type) {
      this.$set(this.form, 'type', Number(this.$route.query.type))
    }
    this.getTagListFG()
    this.getTagListQG()
    this.getTagListSD()
    if (this.$route.query && this.$route.query.id) {
      this.getMusicUploadInfo(this.$route.query.id)
    }
  },
  methods: {
    // 获取上传的音乐信息
    getMusicUploadInfo(id) {
      getMusicUploadInfo({ id: id }).then(res => {
        console.log(res, '--res')
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
    // 曲作者 change 事件
    selectComposersChange(val, name) {
      this.$nextTick(() => {
        let dom = document.querySelector(`.${name} .el-select__tags span`)
        val?.forEach((item, index) => {
          if (typeof item === 'string') {
            let tag = dom.querySelectorAll('.el-tag--info')[index]
            tag.style.border = '1px dashed #909399'
          }
        })
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
        if (this.form.tags.length >= 5) {
          this.$message.error('最多选择五个标签')
        } else {
          this.form.tags.push(row)
        }
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
            this.uploadName = ''
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
        this.$refs['mus-progress'].open()
        uploadMusic(formData).then(res => {
          let data = res.data || {}
          this.form.duration = data.duration
          this.form.musicAtt = data.musicAtt
          this.form.musicWatermarkAtt = data.musicWatermarkAtt
          this.uploadLoading = false
          this.uploadName = file.name
          this.$refs['mus-progress'].ok()
          this.$refs['upload-file'].value = '' // 清空file文件
          this.$refs['form'].validateField('musicAtt')
        }).catch(() => {
          this.$refs['upload-file'].value = '' // 清空file文件
          this.$refs['mus-progress'].error()
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
.select-user-head-option{
  display:flex;
  align-items: center;
  justify-content: space-between;
  >img{
    width:24px;
    height:24px;
    border-radius: 50%;
  }
}
</style>
