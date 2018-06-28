<template>
	<div class="slider">
		<div 
			class="slider-trail"
			id="trails"
			ref="trail"
			@click="handleClick">
			<div 
				class="slider-fill"
				ref="step">
        <div class="redpoint" :style="{left:items.positionL}" v-for="(items,index) in arrs" :key="index" :value="index"  v-if="items.positionL !== 'NaNpx'">
          <span @click="toErrorMessage(index,$event)" class="points"></span>
          <span :class="{'tops2':(items.id+1)%4===1,'tops3':(items.id+1)%4===2,'tops4':(items.id+1)%4===3,'tops1':(items.id+1)%4===0}" class="spa1">{{items.badTime}}</span>
          </div></div>
			<div 
				class="slider-thumb"
				ref="btn"></div>
		</div>
	</div>
</template>


<script>
import { mapMutations, mapGetters } from 'vuex'
import {
  GET_ARRS
   } from '@/store/modules/player/actionTypes'
export default {
  data() {
    return {
      inputValue: this.value,
      ind: 0
    }
  },
  methods: {
    ...mapMutations('player', [
      GET_ARRS
    ]),
    handleClick(e) {
      const x = e.clientX - this.$refs.trail.getBoundingClientRect().left
      this.inputValue = Math.round((x / this.$refs.trail.offsetWidth) * 100)
      this.$emit('changeEvent', this.inputValue)
    },
    toErrorMessage(val, event) {
      this.ind = val
      this.$emit('toErrorMessage', this.ind, event)
    }
  },
  props: {
    value: {
      type: [String, Number],
      default: 0
    },
    max: {
      type: Number,
      default: 100
    }
  },
  computed: {
    ...mapGetters('player', [
      'arrs'
    ]),
    width() {
      return this.inputValue * (this.$refs.trail.offsetWidth / this.max) - this.$refs.btn.offsetWidth / 2
    },
    stepWidth() {
      return Math.max(0, this.width)
    },
    arrs: {
      get() {
        return this.$store.state.player.arrs
      },
      set(value) {
        this['GET_ARRS'](value)
      }
    }
  },
  mounted() {
    this.$refs.btn.style.left = this.width + 'px'
    this.$refs.step.style.width = this.stepWidth + 'px'
    // setTimeout(() => {
    //   this.arrs.map((item, ind) => {
    //     this.inds = item.id
    //   })
    // }, 2000)
  },
  watch: {
    value(val) {
      this.inputValue = val
    },
    inputValue(val) {
      this.$refs.btn.style.left = this.width + 'px'
      this.$refs.step.style.width = this.stepWidth + 'px'
    }
  }
}
</script>

<style lang="scss" scoped>
.slider {
	display: inline-block;
	position: relative;
	height: 50px;
	flex: 0.8;
	// width: 100%;
	list-style: none;
	// vertical-align: middle;
	user-select: none;
	display: flex;
	align-items: center;
	margin: 0 10px;
	.slider-trail {
		width: 100%;
		height: 5px;
		background-color: #868181;
		border-radius: 3px;
		position: relative;
		cursor: pointer;
		.slider-fill {
			width: 100px;
			height: 100%;
			background-color: #c4c4c4;
			&:hover {
				box-shadow: 0 0 10px #eee;
			}
		}
		.slider-thumb {
			width: 14px;
			height: 14px;
			background-color: #f8e71c;
			border-radius: 50%;
			position: absolute;
			top: -4px;
			left: 100px;
			&:hover {
				box-shadow:inset 0 0 10px #fff;
			}
		}
	}
	.redpoint{
     width: 6px;
     height: 6px;
		 position: absolute;
		 top: 0px;
     span{
       font-size: 10px;
       position: absolute;
       top: -13px;
       margin-right: 20px;
     }
    .points{
        width: 6px;
        height: 6px;
        background: #fff;
        border-radius: 50%;
        position: absolute;
        left: 0;
        top: 0px;
        display: inline-block;
        z-index: 9999;
     }
     .tops2{
       top:-13px;
     }
     .tops3{
        top:-2px;
     }
     .tops4{
       top:-29px;
     }
     .tops1{
       top:-40px;
     }
     
 }
 
 
}

</style>

