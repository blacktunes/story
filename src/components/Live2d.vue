<template>
  <div id="live2d">
    <transition name="fade">
      <div v-show="live2dShow">
        <canvas id="live2d-main" width="500" height="730" ref="live2d"/>
      </div>
    </transition>
  </div>
</template>

<script>
import '../assets/js/live2d.min.js'

export default {
  data () {
    return {
      live2dShow: false
    }
  },
  mounted () {
    this.loadModel()
    this.$nextTick(() => {
      // this.loadEvent()
      this.$refs.live2d.style.height = 'calc(100vh - 213px)'
      this.live2dShow = true
    })
  },
  methods: {
    loadModel () {
      const url = `https://www.feizhouxianyu.cn/Terisa/model2.json`
      const callback = console.log('Live2D Ready')
      window.loadlive2d('live2d-main', url, callback)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  #live2d
    text-align center
    margin 0 auto
  #live2d-main
    cursor grab
    cursor -webkit-grab
    cursor -o-grab
    cursor -ms-grab
  #live2d-main:active
    cursor grabbing
    cursor -webkit-grabbing
    cursor -o-grabbing
    cursor -ms-grabbing

.fade-enter-active, .fade-leave-active
  transition opacity 3s
.fade-enter, .fade-leave-to
  opacity 0
</style>
