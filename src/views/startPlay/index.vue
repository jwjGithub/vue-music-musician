<template>
  <div class="main start-play">
    <div class="main-contnet">
      <mus-header class="start-play-head"></mus-header>
      <div class="content">
        <div class="content-main">
          <div class="left">
            <div class="tap-list">
              <div v-for="(item,index) in typeList" :key="index" class="list" :class="listActive == item.id ? 'active' : ''" @click="listActive = item.id">
                <i class="icon icon-playlist mr15"></i>
                <span>{{ item.baseName }}</span>
              </div>
              <div class="list" :class="listActive == 'bflb' ? 'active' : ''" @click="listActive = 'bflb'">
                <i class="icon icon-playlist mr15"></i>
                <span>播放列表</span>
              </div>
              <div class="list" :class="listActive == 'bfls' ? 'active' : ''" @click="listActive = 'bfls'">
                <i class="icon icon-history mr15"></i>
                <span>播放历史</span>
              </div>
              <div class="list" :class="listActive == 'scdgq' ? 'active' : ''" @click="listActive = 'scdgq'">
                <i class="icon icon-collect_b mr15"></i>
                <span>收藏的歌曲</span>
              </div>
            </div>
          </div>
          <div class="center">
            <div class="table-head">
              <div class="w4"></div>
              <div class="w4"></div>
              <div class="songname">歌曲名称</div>
              <div class="btns"></div>
              <div class="singer">歌手名</div>
              <div class="duration">播放数</div>
            </div>
            <div v-loading="loading" class="table-body">
              <el-scrollbar class="custom-scrollbar">
                <div v-for="(item,index) in dataList" :key="index" class="table-row">
                  <div class="table-col w4 text-center">
                    <el-checkbox v-model="item.checkbox"></el-checkbox>
                  </div>
                  <div class="table-col w4">{{ index + 1 }}</div>
                  <div class="table-col songname ellipsis">{{ item.title }}</div>
                  <div class="table-col btns">
                    <i class="icon icon-audition" @click="startPlay(item)"></i>
                    <!-- <i class="icon icon-pause_s"></i> -->
                    <i class="icon icon-more"></i>
                    <i class="icon icon-collect" @click="addToCollect(item)"></i>
                    <i class="icon icon-delete" @click="deletePlayList(item)"></i>
                  </div>
                  <div class="table-col singer ellipsis">{{ item.authorNames }}</div>
                  <div class="table-col duration">{{ item.auditionCounts }}</div>
                </div>
              </el-scrollbar>
            </div>
            <div class="table-footer">
              <div class="table-footer-left">
                <el-checkbox v-model="allChecked" @change="allCheckedChange">全选</el-checkbox>
              </div>
              <div class="table-footer-right ft12">
                共有
                <span class="ml5 mr5">19</span>
                首歌
              </div>
            </div>
          </div>
          <div class="right">
            <div class="position-icon"></div>
            <div class="music-head-img">
              <img :src="musicInfo.pic" />
            </div>
            <div class="music-lrc">
              <el-scrollbar class="custom-scrollbar">
                <pre v-if="lrcType == 'txt'" class="pre" v-html="lrcTxt"></pre>
                <div v-if="lrcType == 'lrc'" class="lyric-lrc">
                  <p v-for="(item,index) in lrcTxt" :key="index" :class="lrcTime >= item.time && lrcTime <= lrcTxt[index + 1].time? 'lrc-select': ''">
                    <!-- lrcTime > item.time && lrcTime < item? 'lrc-select' : '' -->
                    {{ item.text }}
                  </p>
                </div>
                <!-- <lrc></lrc> -->
              </el-scrollbar>
            </div>
          </div>
        </div>
      </div>
      <footer class="footer">
        <mus-aplayer
          ref="music"
          :list="dataList"
          :music-info="musicInfo"
          @play="startPlay"
          @lrcChange="lrcChange"
        ></mus-aplayer>
      </footer>
    </div>
  </div>
</template>
<script>
import aplayer from 'vue-aplayer'
import musicUrl from '@/assets/audio/test1.mp3'
import musicAuthor from '@/assets/images/logo.png'
import MusAplayer from '@/components/MusAplayer'
// import lrc from './index2'
import {
  getUserDefaultMusicList,
  getUserHisMusicList,
  getUserCollectMusicList,
  getCompanyOptionalBaseList,
  getCompanyOptionalMusicList,
  getMusicInfo,
  addToCollect,
  removeFromCollect,
  addToDefault,
  removeFromDefault,
  removeFromhistory,
  addToCompanyOptional,
  removeFromCompanyOptional,
  getLrc
} from '@/api/startPlay'
export default {
  name: '',
  components: {
    // aplayer,
    // lrc,
    MusAplayer
  },
  data() {
    return {
      loading: false,
      lrcTxt: '',
      lrcType: '',
      lrcTime: 0, // 当前播放时间
      listActive: 'bflb', // 当前列表类型
      allChecked: false, // 全选
      // videoOptions: {
      //   progress: false,
      //   progressPercent: 0,
      //   successPercent: 0,
      //   music: {
      //     title: '测试标题',
      //     artist: 'jwj',
      //     pic: musicAuthor,
      //     src: musicUrl,
      //     lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'
      //   }
      // },
      // 音乐对象
      musicInfo: {
        title: '暂无歌曲', // 歌曲名称
        artist: '', // 作者
        pic: '', // 歌曲头像
        src: '' // 歌曲链接
      },
      typeList: [], // 歌曲自选库列表
      dataInfo: {}, // 当前播放详情
      dataList: [] // 播放列表
    }
  },
  watch: {
    listActive(val) {
      switch (val) {
        case 'bflb':
          this.getUserDefaultMusicList()
          break
        case 'bfls':
          this.getUserHisMusicList()
          break
        case 'scdgq':
          this.getUserCollectMusicList()
          break
        default:
          // 查询自选库列表
          this.getCompanyOptionalMusicList()
          break
      }
    }
  },
  created() {
    // 判断当前是公司用户进入 才查询自选库
    if (this.$store.getters.loginType === 'company') {
      this.getCompanyOptionalBaseList()
    }
    this.getUserDefaultMusicList()
  },
  methods: {
    // 获取当前登录人所在公司自选库列表
    getCompanyOptionalBaseList() {
      getCompanyOptionalBaseList().then(res => {
        this.typeList = res.data || []
      })
    },
    // 获取当前登录人默认播放列表
    getUserDefaultMusicList() {
      this.loading = true
      getUserDefaultMusicList().then(res => {
        this.dataList = res.data || []
        this.loading = false
        this.$refs.music.play()
      }).catch(() => {
        this.loading = false
      })
    },
    // 获取当前登录人历史播放列表
    getUserHisMusicList() {
      this.loading = true
      getUserHisMusicList().then(res => {
        this.dataList = res.data || []
        this.loading = false
        this.$refs.music.play()
      }).catch(() => {
        this.loading = false
      })
    },
    // 获取当前登录人（音乐人）收藏播放列表
    getUserCollectMusicList() {
      this.loading = true
      getUserCollectMusicList().then(res => {
        this.dataList = res.data || []
        this.loading = false
        this.$refs.music.play()
      }).catch(() => {
        this.loading = false
      })
    },
    // 获取获取自选库音乐播放列表
    getCompanyOptionalMusicList() {
      this.loading = true
      getCompanyOptionalMusicList({ opBaseId: this.listActive }).then(res => {
        this.dataList = res.data || []
        this.loading = false
        this.$refs.music.play()
      }).catch(() => {
        this.loading = false
      })
    },
    // 设置当前播放列表类型
    setListActive(type) {
      this.listActive = type
    },
    // 播放
    startPlay(row) {
      this.dataInfo = JSON.parse(JSON.stringify(row))
      this.getMusicInfo()
    },
    // 获取音乐详情
    getMusicInfo() {
      let json = {
        musicId: this.dataInfo.musicId, // 音乐id
        isPlay: true // 是否播放true/false
      }
      getMusicInfo(json).then(res => {
        let data = res.data || {}
        this.musicInfo.title = data.title
        this.musicInfo.artist = data.artist
        this.musicInfo.pic = data.imgTempUrl
        this.musicInfo.src = data.musicTempUrl
        this.$forceUpdate()
      })
      this.getLrc(this.dataInfo.musicId)
    },
    // 删除播放列表
    deletePlayList(row) {
      switch (this.listActive) {
        case 'bflb':
          this.removeFromDefault([row.id])
          break
        case 'bfls':
          this.removeFromhistory([row.id])
          break
        case 'scdgq':
          this.removeFromCollect([row.id])
          break
        default:
          // 从自选库列表移除
          this.removeFromCompanyOptional([row.id])
          break
      }
      // 手动移除列表
      this.removePlayList([row.id])
    },
    // 移除播放列表
    removePlayList(list) {
      list.forEach(id => {
        for (let i = 0, len = this.dataList.length; i < len; i++) {
          let item = this.dataList[i]
          if (id === item.id) {
            this.dataList.splice(i, 1)
            break
          }
        }
      })
    },
    // 添加到收藏列表
    addToCollect(row) {
      addToCollect([row.id]).then(res => {
        this.$notify.success({
          title: '添加成功'
        })
      })
    },
    // 添加播放列表
    addPlayList(row) {
      switch (this.listActive) {
        case 'bflb':
          this.removeFromDefault([row.id])
          break
        case 'bfls':
          this.removeFromhistory([row.id])
          break
        case 'scdgq':
          this.removeFromCollect([row.id])
          break
        default:
          // 从自选库列表移除
          this.removeFromCompanyOptional([row.id])
          break
      }
    },
    // 从收藏列表移除
    removeFromCollect(ids) {
      removeFromCollect(ids).then(res => {
        this.$notify.success({
          title: '操作成功'
        })
      })
    },
    // 从默认列表移除
    removeFromDefault(ids) {
      removeFromDefault(ids).then(res => {
        this.$notify.success({
          title: '操作成功'
        })
      })
    },
    // 从历史列表移除
    removeFromhistory(ids) {
      removeFromhistory(ids).then(res => {
        this.$notify.success({
          title: '操作成功'
        })
      })
    },
    // 从自选库列表移除
    removeFromCompanyOptional(ids) {
      removeFromCompanyOptional(ids).then(res => {
        this.$notify.success({
          title: '操作成功'
        })
      })
    },
    // 全选change事件
    allCheckedChange(val) {
      this.dataList.forEach(item => {
        item.checkbox = val
      })
      // this.$forceUpdate()
    },
    // 获取歌词
    getLrc(id) {
      getLrc({ musicId: id }).then(res => {
        if (res.data && res.data.type === 'txt') {
          this.lrcTxt = res.data.txt
        }
        if (res.data && res.data.type === 'lrc') {
          this.lrcTxt = res.data.lrc || []
        }
        this.lrcType = res.data && res.data.type
        console.log(res.data.txt, '---')
      })
    },
    // 获取当前播放时间
    lrcChange(time) {
      this.lrcTime = time || 0
      console.log(time, 'time')
    },
    setLrcClass(item, index) {
      let oldItem = index > 0 ? this.lrcTxt[index - 1] : 0
      if (this.lrcTime >= item.time && this.lrcTime <= oldItem.time) {
        console.log('1111111111111111')
        return 'lrc-select'
      } else {
        return ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .main{
    height:100%;
    .main-contnet{
      height:100%;
      display:flex;
      flex-direction: column;
      justify-content:space-between;
      .content{
        flex:1;
        overflow: hidden;
        .content-main{
          height:100%;
          display:flex;
          justify-content: space-between;
          .left{
            width:280px;
            height:100%;
            border-right:1px solid #ebebeb;
            .tap-list{
              padding: 14px 18px 0 22px;
              .list{
                height: 40px;
                line-height: 40px;
                font-size: 14px;
                color: #333;
                margin-bottom: 10px;
                padding: 0 10px;
                background-color: #FFF;
                border-radius: 5px;
                display:flex;
                align-items:center;
                transition: color,border,background-color .3s linear 0s;
                cursor: pointer;
                .icon-playlist{
                  width: 20px;
                  height: 16px;
                  background-image:url('~@/assets/images/icon/playlist.png');
                }
                .icon-history{
                  width: 20px;
                  height: 20px;
                  background-image:url('~@/assets/images/icon/history.png');
                }
                .icon-collect_b{
                  width: 20px;
                  height: 18px;
                  background-image:url('~@/assets/images/icon/collect_b.png');
                }
                &.active,&:hover{
                  color:#FFF;
                  background-color: #FFAE00;
                  .icon-playlist{
                    background-image:url('~@/assets/images/icon/playlist-active.png');
                  }
                  .icon-history{
                    background-image:url('~@/assets/images/icon/history-active.png');
                  }
                  .icon-collect_b{
                    background-image:url('~@/assets/images/icon/collect_b-active.png');
                  }
                }
              }
            }
          }
          .center{
            padding:25px 30px 0;
            flex:1;
            display:flex;
            flex-direction: column;
            justify-content: space-between;
            overflow: hidden;
            .table-head{
              height:38px;
              display:flex;
              align-items:center;
              border-bottom: 1px solid #f2f2f2;
              >div{
                font-size:12px;
                color:#333;
              }
            }
            .table-body{
              flex:1;
              overflow: hidden;
              .table-row{
                display:flex;
                font-size:12px;
                color:#333;
                .table-col{
                  height:50px;
                  line-height:50px;
                  &.btns{
                    display:flex;
                    align-items: center;
                    justify-content: center;
                    >.icon{
                      cursor: pointer;
                      width:16px;
                      height:16px;
                      margin:0 5px;
                      display: none;
                      &.icon-audition{
                        // height:14px;
                        background-image:url('~@/assets/images/icon/audition.png');
                      }
                      &.icon-pause_s{
                        display:none;
                        background-image:url('~@/assets/images/icon/pause_s.png');
                      }
                      &.icon-more{
                        background-image:url('~@/assets/images/icon/more.png');
                      }
                      &.icon-collect{
                        background-image:url('~@/assets/images/icon/collect.png');
                      }
                      &.icon-delete{
                        background-image:url('~@/assets/images/icon/delete.png');
                      }
                    }
                  }
                }
                &:hover,&.active{
                  background-color:#f9f9f9;
                  .table-col{
                    &.btns{
                      >.icon{
                        display: block;
                      }
                    }
                  }
                }
              }
            }
            .table-footer{
              height: 60px;
              border-top: 1px solid #f2f2f2;
              display:flex;
              align-items:center;
              justify-content: space-between;
            }
            .table-head,.table-body{
              .songname{
                width:calc(63% - 240px);
                text-align: left;
              }
              .btns{
                width:16%;
                margin-left: 10px;
                min-width:170px;
                overflow:hidden;
              }
              .singer{
                width: 21%;
                margin-left: 10px;
                text-align: left;
              }
              .duration{
                width:60px;
                overflow:hidden;
                text-align: center;
                margin-right:25px;
              }
            }
          }
          .right{
            position: relative;
            width:350px;
            border-left:1px solid #ebebeb;
            display:flex;
            flex-direction: column;
            .music-head-img{
              width: 210px;
              height: 210px;
              margin: 20px auto 0 auto;
              border-radius: 5px;
              box-shadow: 0 4px 14px 0 rgba(0,0,0,.12);
              >img{
                width:100%;
                height:100%;
              }
            }
            .music-lrc{
              flex:1;
              overflow: hidden;
              padding:20px;
              .pre{
                text-align: center;
                font-size:14px;
                line-height: 2;
                color:#666;
              }
              .lyric-lrc{
                >p{
                  font-family: '宋体';
                  text-align: center;
                  font-size:14px;
                  line-height: 3;
                  color:#666;
                }
                .lrc-select{
                  color:red !important;
                }
                // .lrc-select:last-child{
                //   color:red !important;
                // }
              }
            }
            .position-icon{
              position: absolute;
              left: -11px;
              top: 50%;
              margin-top: -64px;
              width: 18px;
              height: 129px;
              background: url('~@/assets/images/r_switch.png');
              z-index: 14;
            }
          }
        }
      }
      .footer{
        height:60px;
        box-shadow: 0 0 1px 1px rgba(0,0,0,.05);
        .main-aplayer{
          width:100%;
          height:100%;
          margin:0;
        }
      }
    }
  }
</style>
<style lang="scss">
.start-play{
  .start-play-head{
    .head-main{
      >.center{
        flex:1;
      }
    }
  }
  .search-input{
    width:270px;
    >.el-input__inner{
      border: 0;
      padding-left: 28px;
      color: #000;
      font-size: 14px;
      background: transparent;
    }
  }
}
.el-popover{
  min-width:116px;
}
.popover-list{
  .list{
    text-align: center;;
    .text-btn{
      color:inherit;
      &:hover{
        color:#00B0A8;
      }
    }
  }
}

.main-aplayer{

  .aplayer-body{
    .aplayer-pic{
      width:60px;
      height:60px;
    }
    .aplayer-info{
      height:55px !important;
      padding:5px 10px 0 10px !important;
    }
  }
}
</style>
