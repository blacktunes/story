<template>
  <transition name="fade">
    <div class="view-wrapper" v-show="show">
      <cube-scroll ref="scroll" :data="messageList" :options="scrollOptions">
        <div v-for="(item, index) in messageList" :key="index" class="scroll-item">
          <div class="bubble">
            <span>{{item.text}}</span>
          </div>
        </div>
      </cube-scroll>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import { getMessage } from '../api/store'

export default {
  data() {
    return {
      messageList: [],
      show: false,
      scrollOptions: {
        mouseWheel: true
      }
    }
  },
  created () {
    getMessage(this.$route.query.name).then(res => {
      this.messageList = res.data
      this.show = true
    })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .view-wrapper
    background #ddd
    height 100vh
    .scroll-item
      width 100%
      .bubble
        display inline-block
        padding: 7px 10px
        color: #333
        background: #fff
        box-shadow: 0 3px 2px rgba(0, 0, 0, 0.1)
        position: relative
        max-width: 420px
        min-width: 80px
        margin: 15px 20px 15px 15px
        &:before
          content: ''
          border-style: solid
          border-width: 0 10px 10px 0
          border-color: transparent #fff transparent transparent
          position: absolute
          top: 0
          left: -10px
        span
          font-size 13px

.fade-enter-active, .fade-leave-active
  transition opacity 0.5s
.fade-enter, .fade-leave-to
  opacity 0
</style>
