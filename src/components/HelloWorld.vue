<template>
  <div id="mengxin">
    <div class="menu">
      <div @click="isToBottom">
        <input type="checkbox" v-model="toBottom">
        <span>有新消息自动跳转最后</span>
      </div>
      <button @click="scrollToBottom">跳到最底</button>
    </div>
    <hr>
    <p>在线人数：{{onlineNum}}</p>
    <hr>
    <input type="text" v-model="text" maxlength="100" placeholder="最少五个字">
    <button @click="send">提交</button>
    <span>字数：{{text.length}}/100</span>
    <hr>
    <ol>
      <li v-for="(item, index) in list" :key="index">{{item.text}}</li>
    </ol>
    <hr>
    <input type="text" v-model="text" maxlength="100" placeholder="最少五个字">
    <button @click="send">提交</button>
    <span>字数：{{text.length}}/100</span>
    <hr>
      <p>在线人数：{{onlineNum}}</p>
    <hr>
    <div class="menu">
      <div @click="isToBottom">
        <input type="checkbox" v-model="toBottom">
        <span>有新消息自动跳转最后</span>
      </div>
      <button @click="scrollToTop">回到顶部</button>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      text: '',
      list: [],
      toBottom: false,
      onlineNum: 0
    }
  },
    sockets: {
    // 建立连接自动调用connect
    connect: function () {
      // 与socket.io连接后回调
      // console.log('conn')
    },
    connect_error: () => {
      // console.log('connErr')
    },
    disconnect: () => {
      // console.log('disconn')
    },
    receiveMessage: function (data) {
      this.list.push(data)
      this.scrollToBottom()
    },
    updateOnline: function (num) {
      this.onlineNum = num
    }
  },
  methods: {
    isToBottom () {
      this.toBottom = !this.toBottom
    },
    send () {
      if (this.text.length < 5) {
        return
      }
      this.$socket.emit('sendMessage', {
        text: this.text,
      })
      this.text = ''
    },
    autoTOBottom () {
      if (this.toBottom) {
        this.scrollToBottom()
      }
    },
    scrollToBottom () {
      this.$nextTick(() => {
        document.body.scrollTop = document.body.scrollHeight
        document.documentElement.scrollTop = document.documentElement.scrollHeight
        // let speed = document.documentElement.scrollHeight / 10
        // var timer = setInterval(() => {
        //   document.documentElement.scrollTop += speed
        //   console.log(document.documentElement.scrollTop + document.documentElement.clientHeight, document.documentElement.scrollHeight)
        //   if (document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        //     clearInterval(timer)
        //     timer = null
        //   }
        // }, 30)
      })
     },
     scrollToTop () {
       this.$nextTick(() => {
         document.body.scrollTop = 0
         document.documentElement.scrollTop = 0
        // let speed = document.documentElement.scrollHeight / 10
        // var timer = setInterval(() => {
        //   console.log(timer)
        //   document.documentElement.scrollTop -= speed
        //   if (document.documentElement.scrollTop === 0) {
        //     clearInterval(timer)
        //     timer = null
        //   }
        // }, 30)
      })
     },
    _getList () {
      axios.get('https://www.feizhouxianyu.cn:9090/mengxinjuzhusuo').then(res => {
        if (res.status === 200) {
          this.list = res.data.results
        }
      })
    }
  },
  created () {
    this._getList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.menu {
  display: flex;
  justify-content: space-between;
}
</style>
