<template>
  <div class="player-box" :class='{Act:view.openFlag}'>    
    <audio ref="player" id="player" :src="audio.songUrl"  @timeupdate='currentTime' @canplay='songLengths' controls  loop autoplay></audio>
   <!--<i class="material-icons"@click='soundChange'>{{volValue}}</i>-->
   <div class="a-slider">
    <p v-show='!view.openFlag' class="a-slider-p">{{audio.currentLength | time}}</p>
    <div class="a-slider-box"><slider v-model="sliderValue" @changeEvent='currentChange'></slider></div> 
     <p v-show='!view.openFlag' class="a-slider-p">{{songLength | time}}</p>
   </div>
   <div class="a-btn">
    <i class="material-icons a-btn-i" @click='prev'>skip_previous</i>
    <i class="material-icons a-btn-i" @click="togglePanel">{{playValue}}</i>
    <i class="material-icons a-btn-i" @click='next'>skip_next</i>
    </div>
    <div class="a-play" v-show='!view.openFlag'>
      <p>{{audio.title}}</p>
      <p>{{audio.singer}}</p>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import Slider from './slider.vue'
export default {
  name: 'player',
  components: {
    Slider
  },
  data() {
    return {
      songLength: 0,
      volFlag: true
    }
  },
  computed: {
    sliderValue() {
      const a = this.songLength === 0 ? 0 : Math.round((this.audio.currentLength / this.songLength) * 100)
      return a
    },
    volValue() {
      return this.volFlag ? 'volume_up' : 'volume_off'
    },
    playValue() {
      return this.audio.currentFlag ? 'pause' : 'play_arrow'
    },
    ...mapState([
      'audio',
      'view'
    ])
  },
  methods: {
    togglePanel() {
      const player = this.$refs.player
      if (player.src !== '') {
        if (!player.paused) {
          player.pause()
          document.title = `ccplayer`
          this.audio.currentFlag = false
        } else {
          player.play()
          document.title = `▶ - ${this.audio.title} ccplayer`
          this.audio.currentFlag = true
        }
      }
    },
    currentTime() {
      this.audio.currentLength = this.$refs.player.currentTime
    },
    songLengths() {
      this.songLength = this.$refs.player.duration
      document.title = `▶ - ${this.audio.title} ccplayer`
    },
    soundChange() {
      this.volFlag = !this.volFlag
      this.$refs.player.muted = !this.$refs.player.muted
    },
    currentChange(val) {
      this.$refs.player.currentTime = this.$refs.player.duration * val / 100
    },
    ...mapMutations([
      'prev',
      'next'
    ])
  },
  filters: {
    time(value) {
      var length = Math.floor(value)
      var minute = Math.floor(value / 60)
      if (minute < 10) {
        minute = '0' + minute
      }
      var second = length % 60
      if (second < 10) {
        second = '0' + second
      }
      return minute + ':' + second
    }
  }
}
</script>
<style>
audio{
  display: none;
}
.player-box{
  position: relative;
  line-height: 3rem;
}
.a-play{
  position: absolute;
  top: -3rem;;
  left: 0;
  height: 3rem;
  line-height: 1.5rem;  
  width: 100%;
  padding: 0 1rem;
  font-size: 0.8rem;
  text-align: left;
  background-color: #4a4a4a;
  background-color:rgba(74,74,74,0.9);
}
.a-slider{
  display: flex;
  justify-content: space-around;
  flex: 0 0 3rem;
}
.player-box.Act .a-slider{
  flex: 1 0 70%;
}
.a-slider-box{
  width: 100%;
  padding: 0 1.5rem;
}
.a-slider-p{
 font-size: 1rem;
}
.a-btn{
  flex:auto;
  font-size: 0; 
  display: flex;
  align-items: center;
  justify-content: center;
}
.player-box.Act .a-btn{

}
.a-btn-i{
  line-height: 6rem;  
  font-size: 3rem;
}
.a-btn-i:nth-of-type(2){
  font-size: 5rem;
}
.player-box.Act .a-btn-i{
  line-height: 2;  
  font-size: 1.5rem;
}
</style>
