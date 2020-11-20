<!--
 * @Date: 2020-11-20 13:57:24
 * @Description: 主体框架
 * @LastEditors: JWJ
 * @LastEditTime: 2020-11-20 14:29:26
 * @FilePath: \vue-music-musician\src\views\layout\index.vue
-->
<template>
  <div class="main index-main">
    <div class="main-content">
      <mus-header></mus-header>
      <div class="content">
        <div class="content-home">
          <div class="left-nav">
            <div class="nav-list"></div>
          </div>
          <div class="right-content">
            <el-scrollbar class="custom-scrollbar">
              <router-view />
            </el-scrollbar>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
  .main{
    width:100%;
    height:100%;
    .main-content{
      width:100%;
      height:100%;
      display:flex;
      flex-direction: column;
      >.content{
        flex:1;
        overflow:hidden;
        >.content-home{
          height:100%;
          margin:0 auto;
          display:flex;
          justify-content: center;
          >.left-nav{
            padding: 20px;
            >.nav-list{
              width: 200px;
              height: 100%;
              background-image: linear-gradient(0deg,
                #bd3f32 0%,
                #cb356b 100%),
              linear-gradient(
                #a5055e,
                #a5055e);
              background-blend-mode: normal,
                normal;
              border-radius: 4px;
            }
          }
          >.right-content{
            width:1180px;
            height:100%;
            background-color: #f8f8f8;
          }
        }
      }
    }
  }
</style>

