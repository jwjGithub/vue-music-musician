<template>
  <!-- 自定义播放插件 -->
  <div class="aplayer">
    <div class="left">
      <i class="prev" title="上一首" @click="LastSong"></i>
      <i v-show="music.play == false" class="play" title="播放" @click="playMusic"></i>
      <i v-show="music.play == true" class="pause" title="暂停" @click="playMusic"></i>
      <i class="r_switch" title="下一首" @click="nextSong"></i>
    </div>
    <div class="center">
      <div class="music-pic">
        <img :src="music.pic" />
      </div>
      <div class="music-info">
        <div class="info-head">
          <div class="artist-title">{{ music.title }}</div>
          <div>

          </div>
        </div>
        <div class="music-slider">
          <div class="progress">
            <audio ref="music" loop="loop" :src="music.url" @loadedmetadata="getmusicLength" @timeupdate="timeUpdate">
              当前浏览器不支持audio
            </audio>
            <el-slider
              v-model="music.currentTime"
              :max="music.audioLength"
              class="aplayer-slider"
              @change="changeMusicTime"
            ></el-slider>
          </div>
          <div class="music-time">
            <span class="start">{{ Math.floor(parseInt(music.currentTime)/60) }}:{{ parseInt(music.currentTime)%60 }}</span>
            <span class="line">/</span>
            <span class="end">{{ Math.floor(parseInt(music.audioLength) / 60) }}:{{ parseInt(music.audioLength) % 60 }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <i class="random"></i>
      <i class="volume"></i>
      <el-slider v-model="volume" class="aplayer-slider volume-slider"></el-slider>
    </div>
  </div>
</template>
<script>
import musicUrl from '@/assets/audio/test1.mp3'
import defaultPic from '@/assets/images/aplayer/cover.png' // 默认歌曲头像
export default {
  name: 'MusAplayer',
  props: {
    musicInfo: {
      type: Object,
      default() {
        return {
          title: '暂无歌曲', // 歌曲名称
          artist: '', // 作者
          pic: defaultPic, // 歌曲头像
          src: musicUrl // 歌曲链接
        }
      }
    },
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      current: 0, // 当前播放下标
      total: 0, // 当前播放列表总长度
      music: {
        title: '暂无歌曲', // 歌曲名称
        artist: '', // 作者
        pic: defaultPic, // 歌曲头像
        play: false, // 播放还是暂停 true播放中
        audioLength: 0, // audio时长
        url: '', // 音频课件url
        currentTime: 0, // 当前播放时间
        lastTime: null// 标记时间戳
      },
      // 音量
      volume: 50
    }
  },
  watch: {
    volume(val) {
      if (this.$refs.music) {
        this.$refs.music.volume = (val / 100)
        sessionStorage.MUSICVOLUME = val
      }
    },
    list: {
      handler(n, o) {
        if (this.list.length > 0) {
          this.total = this.list.length
        }
      },
      immediate: false, // 刷新加载
      deep: true
    },
    musicInfo: {
      handler(n, o) {
        if (this.musicInfo) {
          this.music = {
            title: this.musicInfo.title || '暂无歌曲', // 歌曲名称
            artist: this.musicInfo.artist || '', // 作者
            pic: this.musicInfo.pic || defaultPic, // 歌曲头像
            play: false, // 播放还是暂停 true播放中
            audioLength: 0, // audio时长
            url: this.musicInfo.src || '', // 音频课件url
            currentTime: 0, // 当前播放时间
            lastTime: null// 标记时间戳
          }
          // this.music.title = this.musicInfo.title || '暂无歌曲'
          // this.music.artist = this.musicInfo.artist || ''
          // this.music.pic = this.musicInfo.pic || defaultPic
          // this.music.url = this.musicInfo.src || ''
        }
      },
      immediate: false, // 刷新加载
      deep: true
    }
  },
  created() {
    // 获取以缓存音量并设置
    let volume = sessionStorage.MUSICVOLUME
    if (volume) {
      this.volume = Number(volume)
    }
  },
  mounted() {

  },
  methods: {
    play() {
      setTimeout(() => {
        this.current = 0
        this.$emit('play', this.list[0])
      }, 500)
    },
    // 上一首
    LastSong() {
      let current = this.current - 1
      this.current = current < 0 ? this.total - 1 : current
      this.$emit('play', this.list[this.current])
    },
    // 下一首
    nextSong() {
      let current = this.current + 1
      this.current = current >= this.total ? 0 : current
      this.$emit('play', this.list[this.current])
    },
    // 播放/暂停
    playMusic() {
      if (this.music.play) {
        this.music.play = false
        this.$refs.music.pause()
      } else {
        this.music.play = true
        Math.abs(this.music.currentTime - this.$refs.music.currentTime) > 2 ? this.$refs.music.currentTime = this.music.currentTime : ''
        this.$refs.music.play().then(() => {

        }).catch(() => {
        // 当前第一次页面加载不允许自动播放
          this.music.play = false
        })
        this.$refs.music.muted = false
      }
    },
    changeMusicTime(val) {
      if (this.$refs.music) {
        this.$refs.music.currentTime = val
      }
    },
    // 获取音乐长度
    getmusicLength() {
      this.$refs.music.volume = (this.volume / 100)
      this.music.audioLength = this.$refs.music.duration
      // 初始化播放
      this.playMusic()
    },
    timeUpdate() {
      let nowTime = Date.now()
      let gapTime = 1000
      if (!this.music.lastTime || nowTime - this.music.lastTime > gapTime) {
        if (this.$refs.music) {
          let time = this.$refs.music.currentTime
          this.music.currentTime = time
          this.$emit('lrcChange', time * 1000)
        }
        this.music.lastTime = nowTime
      }
    }
  }
}
</script>
<style lang="scss" scoped>
	.aplayer{
		height: 60px;
    background: #fff;
    box-shadow: 0 0 1px 1px rgba(0,0,0,.05);
    position: relative;
    z-index: 112;
		display:flex;
		justify-content: space-between;
		color:#333;
		.left{
			width: 280px;
			height: 60px;
			display:flex;
			align-items:center;
			justify-content: center;
			.prev{
				width:17px;
				height:18px;
				cursor: pointer;
				background-repeat: no-repeat;
				background-size:cover;
				background-image:url('~@/assets/images/aplayer/prev.png');
			}
			.play{
				width:50px;
				height:50px;
				margin:0 40px;
				cursor: pointer;
				background-repeat: no-repeat;
				background-size:cover;
				background-image:url('~@/assets/images/aplayer/play.png');
			}
			.pause{
				width:50px;
				height:50px;
				margin:0 40px;
				cursor: pointer;
				background-repeat: no-repeat;
				background-size:cover;
				background-image:url('~@/assets/images/aplayer/pause.png');
			}
			.r_switch{
				width:17px;
				height:18px;
				cursor: pointer;
				background-repeat: no-repeat;
				background-size:cover;
				background-image:url('~@/assets/images/aplayer/r_switch.png');
			}
		}
		.center{
			flex:1;
			overflow: hidden;
			display:flex;
			.music-pic{
				width: 46px;
				height: 46px;
				overflow: hidden;
				margin: 7px 15px 0 15px;
				border-radius: 3px;
				>img{
					width:100%;
					height:100%;
				}
			}
			.music-info{
				flex:1;
				overflow: hidden;
				display:flex;
				flex-direction: column;
				.info-head{
					padding-top:7px;
					padding-left:10px;
					height:24px;
					display:flex;
				}
				.music-slider{
					display:flex;
					justify-content: space-between;
					.progress{
						flex:1;
						overflow: hidden;
					}
					.music-time{
						width:95px;
						font-size: 12px;
						display:flex;
						justify-content: flex-end;
						align-items:center;
						.line{
							margin:0 5px;
						}
					}
				}
			}
		}
		.right{
			width: 350px;
			height: 60px;
			display:flex;
			align-items:center;
			justify-content: center;
			>.random{
				width:24px;
				height:20px;
				cursor: pointer;
				background-repeat: no-repeat;
				background-size:cover;
				background-image:url('~@/assets/images/aplayer/random.png');
			}
			>.volume{
				margin:0 8px 0 30px;
				width:22px;
				height:20px;
				cursor: pointer;
				background-repeat: no-repeat;
				background-size:cover;
				background-image:url('~@/assets/images/aplayer/volume.png');
			}
			.volume-slider{
				width:100px;
			}
		}
	}
</style>
<style lang="scss">
	.aplayer{
		.aplayer-slider{
			.el-slider__bar{
				height:2px;
				background-color:#FFAE00;
			}
			.el-slider__runway{
				margin:16px 0 16px 10px;
				height:2px;
			}
			.el-slider__button-wrapper{
				top:-17px;
			}
			.el-slider__button{
				width:14px;
				height:14px;
				border:none;
				background-repeat: no-repeat;
				background-size:cover;
				background-image:url('~@/assets/images/aplayer/circle2.png');
			}
		}
	}
</style>
