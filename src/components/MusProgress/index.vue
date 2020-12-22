<!--
 * @Descripttion:
 * @version:
 * @Author: jwj
 * @Date: 2020-12-22 22:27:40
 * @LastEditors: jwj
 * @LastEditTime: 2020-12-22 22:41:51
-->
<template>
  <div class="mus-progress">
    <transition name="el-fade-in-linear">
      <el-progress v-show="isShow" :percentage="percentage"></el-progress>
    </transition>
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
      }, 50)
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
  }
</style>
