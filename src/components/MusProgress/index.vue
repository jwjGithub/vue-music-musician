<!--
 * @Descripttion:
 * @version:
 * @Author: jwj
 * @Date: 2020-12-22 22:27:40
 * @LastEditors: JWJ
 * @LastEditTime: 2021-01-28 11:01:05
-->
<template>
  <div class="mus-progress">
    <transition name="el-fade-in-linear">
      <el-progress v-show="isShow" class="progress" :percentage="percentage"></el-progress>
    </transition>
    <el-button v-if="isShow" type="text" circle size="mini" icon="el-icon-circle-close" class="c-red ft18" title="取消上传" @click="cancelUpload"></el-button>
  </div>
</template>

<script>
export default {
  name: 'MusProgress',
  props: {
  },
  data() {
    return {
      isShow: false,
      percentage: 0,
      interval: null
    }
  },
  watch: {
    percentage(n) {
      if (n >= 100) {
        clearInterval(this.interval)
        setTimeout(() => {
          this.isShow = false
        }, 1000)
      }
    }
  },
  created() {
  },
  methods: {
    open(json = {}) {
      this.isShow = true
      this.percentage = 0
      this.interval = setInterval(() => {
        if (this.percentage < 99) {
          this.percentage++
        }
      }, 600)
    },
    ok() {
      clearInterval(this.interval)
      this.interval = setInterval(() => {
        if (this.percentage < 100) {
          this.percentage++
        }
      }, 30)
    },
    error() {
      clearInterval(this.interval)
      this.isShow = false
      this.percentage = 0
    },
    // 取消上传
    cancelUpload() {
      clearInterval(this.interval)
      this.isShow = false
      this.percentage = 0
      this.$emit('cancel')
    },
    handleClose() {
      this.$emit('handleClose')
    },
    handleConfirm() {
      this.$emit('handleConfirm')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .mus-progress{
    width: 400px;
    display:flex;
    align-items: center;
    .progress{
      width:360px;
    }
  }
</style>
