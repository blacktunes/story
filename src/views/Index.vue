<template>
  <div>
    <!-- <l2d /> -->
    <img src="../assets/img/l2d.png" class="img">
  </div>
</template>

<script>
import { getTopic } from '../api/store'
// import l2d from '../components/Live2d'

export default {
  components: {
    // l2d
  },
  data () {
    return {
      topicList: []
    }
  },
  methods: {
    showPicker() {
      if (!this.picker) {
        this.picker = this.$createPicker({
          data: [this.topicList],
          alias: {
            value: 'name',
            text: 'topic'
          },
          onSelect: this.selectHandle
        })
      }
      this.picker.show()
    },
    selectHandle(selectedVal, selectedIndex, selectedText) {
      console.log(`Selected Item \n - value: ${selectedVal.join(', ')} \n - text: ${selectedText.join(' ')}`)
      this.$router.push(`/message?name=${selectedVal}`)
    }
  },
  mounted () {
    getTopic().then(res => {
      this.topicList = res.data
      this.showPicker()
    })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.img
  width 100%

.cube-popup_mask
      pointer-events none
.cube-popup-mask
  display none !important
.cube-picker-cancel
  display none !important
.cube-popup-content
  height 213px
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
      line-height 50px
      background rgba(0, 0, 0, .3)
      color #000
      z-index 200
      transition background 0.3s
      &:active
        background rgba(0, 0, 0, .1)
  .cube-picker-content
    background #eee
</style>
