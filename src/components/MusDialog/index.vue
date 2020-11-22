<template>
  <div class="mus-dialog">
    <!-- v-dialogDrag -->
    <el-dialog

      :title="title"
      :visible.sync="isShow"
      :width="width"
      :before-close="handleClose"
      :close-on-click-modal="closeOnClickModal"
    >
      <slot></slot>
      <span slot="footer" class="dialog-footer">
        <el-button v-if="isShowOk" :loading="loading" type="primary" @click="handleConfirm">{{ loading == true ? loadingTitle : '确 定' }}</el-button>
        <el-button v-if="isShowClose && loading == false" @click="handleClose">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    isShow: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '30%'
    },
    // 默认点击遮罩是否关闭
    closeOnClickModal: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingTitle: {
      type: String,
      default: '确 定'
    },
    // 是否显示确认按钮 默认 true
    isShowOk: {
      type: Boolean,
      default: true
    },
    // 是否显示取消按钮 默认 true
    isShowClose: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
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
  .mus-dialog{
    max-width:80%;
    .el-dialog{
       border-radius:6px;
      .el-dialog__header{
        padding:0;
        height:60px;
        line-height:60px;
        background: #cb356b;
        // background-image: url('~@/assets/images/dialog/header-bg.png');
        // background-repeat: no-repeat;
        // background-size: 101% 100%;
        border-radius: 6px 6px 0 0 ;
        overflow:hidden;
        .el-dialog__title{
          margin-left:38px;
          font-size: 16px;
          line-height: 16px;
          color: #FFF;
        }
        .el-dialog__headerbtn{
          .el-dialog__close{
            color: #FFF;
          }
        }
      }
      .el-dialog__body{
        padding:0;
      }
      .el-dialog__footer{
        text-align: center;
        .dialog-footer{
          // display:flex;
          // justify-content:space-around;
          .el-button{
            margin: 0 40px;
            min-width: 100px;
          }
        }
      }
    }
  }
</style>
