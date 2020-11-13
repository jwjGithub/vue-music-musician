<template>
  <div class="lrcContainer">
    <div ref="lrc" class="lrc">
      歌词{{ this.$route.params.songid }}
      {{ getAllKey }}
      <p
        v-for="(item,key,index) in lrcData"
        :key="index"
        class="lrc-p"
        :class="{active:parseInt(currentTime) >= keyArr[index] && parseInt(currentTime) < keyArr[index+1]}"
      >
        {{ item }}{{ srcollLrc(key,index) }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LRC',
  props: {
    songid: {
      type: [String, Number],
      default: ''
    },
    durationTime: {
      type: [String, Number],
      default: 0
    },
    currentTime: {
      type: [String, Number],
      default: 0
    }
  },
  data() {
    return {
      lrc: {},
      lrcData: {},
      keyArr: []
    }
  },
  computed: {
    getAllKey() {
      this.lrcData.forEach(item => {
        this.keyArr.push(item)
      })
      return this.keyArr
    }
  },

  mounted() {
    const LRCUrl = this.HOST + '/v1/restserver/ting?method=baidu.ting.song.lry&songid=' + this.songid
    this.$axios.get(LRCUrl).then(res => {
      console.log(res.data)
      this.lrc = res.data
      // 数据格式处理
      var lyrics = res.data.lrcContent.split('\n')
      var lrcObj = {}
      for (var i = 0; i < lyrics.length; i++) {
        var lyric = decodeURIComponent(lyrics[i])
        var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g
        var timeRegExpArr = lyric.match(timeReg)
        if (!timeRegExpArr) continue
        var clause = lyric.replace(timeReg, '')
        for (var k = 0, h = timeRegExpArr.length; k < h; k++) {
          var t = timeRegExpArr[k]
          var min = Number(String(t.match(/\[\d*/i)).slice(1))
          var sec = Number(String(t.match(/\:\d*/i)).slice(1))
          var time = min * 60 + sec
          lrcObj[time] = clause
        }
      }
      this.lrcData = lrcObj
      console.log(this.lrcData)
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    srcollLrc(key, index) {
      const lrcDiv = this.$refs.lrc
      if (key < this.currentTime && key > this.currentTime - (this.keyArr[index + 1] - this.keyArr[index])) {
        lrcDiv.style.top = -((index - 2) * 30) + 'px'
      }
    }
  }
}
</script>

<style scoped>
.lrcContainer{
  width: 100%;
  height: 150px;
  overflow: hidden;
  position: relative;
}

.lrc{
  width: 100%;
  position: absolute;
  top: 0;
}
.active{
  color: red !important;
}
.lrc-p{
  height: 30px;
  line-height: 30px;
}

.up30{
  margin-top: -30px;
}
</style>
