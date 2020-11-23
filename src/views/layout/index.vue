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
            <div class="nav-list">
              <div v-for="(item,index) in navList" :key="index" class="list" :class="item.name == navSelectName ? 'active' : ''">
                <div class="list-icon">
                  <i class="icon" :class="item.icon"></i>
                </div>
                <div class="title">{{ item.title }}</div>
              </div>
            </div>
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
  name: 'Layout',
  data() {
    return {
      navSelectName: '', // 路由选中name
      navList: [
        { title: '个人主页', icon: 'icon-musician-user', name: 'usere' },
        { title: '上传作品', icon: 'icon-musician-zpgl', name: 'UploadWorks' }
      ]
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.navSelectName = route.name
        console.log(route, 'route')
      },
      immediate: true
    }
  }
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
              padding:20px 0;
              width: 200px;
              height: calc(100% - 40px);
              background-image: linear-gradient(0deg,
                #bd3f32 0%,
                #cb356b 100%),
              linear-gradient(
                #a5055e,
                #a5055e);
              background-blend-mode: normal,
                normal;
              border-radius: 4px;
              >.list{
                width:100%;
                height:60px;
                display:flex;
                align-items: center;
                margin-bottom:1px;
                cursor: pointer;
                >.list-icon{
                  padding-left:56px;
                  padding-right:10px;
                }
                >.title{
                  flex:1;
                  overflow: hidden;
                  font-size:18px;
                  color: #fffefe;
                  letter-spacing: 1px;
                }
                &.active,&:hover{
                  background-color:#D76E93;
                }
              }
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

