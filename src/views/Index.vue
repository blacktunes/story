<template>
  <div class="index-wrapper">
    <l2d ref="l2d"/>
    <transition name="fade">
      <div v-show="imgShow" @click.prevent="imgClick">
        <img src="../assets/img/l2d.png" class="img">
      </div>
    </transition>
    <transition name="slide-top">
      <div class="text" v-show="imgShow">
        <p>因为live2d目前有恶性bug</p>
        <p>所以想看的话就点一下图</p>
    </div>
    </transition>
  </div>
</template>

<script>
import { getTopic } from '../api/store'
import l2d from '../components/Live2d'

export default {
  components: {
    l2d
  },
  data () {
    return {
      topicList: [],
      imgShow: false
    }
  },
  methods: {
    imgClick () {
      this.imgShow = false
      this.picker.hide()
      this.$refs.l2d.loadModel()
    },
    showPicker() {
      if (!this.picker) {
        this.picker = this.$createPicker({
          data: [this.topicList],
          alias: {
            value: 'name',
            text: 'topic'
          },
          confirmTxt: ' ',
          onSelect: this.selectHandle
        })
      }
      this.picker.show()
      document.getElementsByClassName('cube-picker-choose')[0].classList.remove('border-bottom-1px')
    },
    selectHandle(selectedVal, selectedIndex, selectedText) {
      console.log(`Selected Item \n - value: ${selectedVal.join(', ')} \n - text: ${selectedText.join(' ')}`)
      this.$router.push(`/message?name=${selectedVal}`)
    }
  },
  mounted () {
    this.imgShow = true
    getTopic().then(res => {
      this.topicList = res.data
      this.showPicker()
    })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.index-wrapper
  height 100vh
  background #ddd
  .img
    width 100%
    pointer-events none
  .text
    background rgba(150, 150, 150, 0.5)
    width 100vw
    text-align center
    position fixed
    top 15px
    font-size 14px
    line-height 18px
    padding 5px 0
    color #333

.cube-popup_mask
  pointer-events none
.cube-popup-mask
  pointer-events none
.cube-picker-cancel
  display none !important
.cube-popup-content
  height 213px
  background transparent
  .cube-picker-panel
    background transparent
  .cube-picker-choose
    height 0
    .cube-picker-title
      display none
    .cube-picker-confirm
      position fixed
      right 0px
      bottom 0px
      padding 0
      width 50px
      height 50px
      background rgba(0, 0, 0, .3)
      color #ddd
      z-index 200
      border-radius 100% 0 0 0
      transition all 0.3s
      &:after
        position absolute
        top 1px
        right 13px
        content: '→'
      &:active
        background rgba(0, 0, 0, .1)
        color #555
  .cube-picker-content
    background transparent
    li
      color #ddd
    .border-bottom-1px
      background transparent
      border-bottom 1px solid #ddd
    .border-top-1px
      background transparent
      border-top 1px solid #ddd

.fade-enter-active, .fade-leave-active
  transition opacity .5s
.fade-enter, .fade-leave-to
  opacity 0

.slide-top-enter-active, .slide-top-leave-active
  transition all .3s
.slide-top-enter, .slide-top-leave-to
  transform translate(0, -100%)
</style>
