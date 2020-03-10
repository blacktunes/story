<template>
  <div class="hello">
    <input type="text" v-model="text" maxlength="100">
    <button @click="click">提交</button>
    <span>字数：{{text.length}}/100</span>
    <p>（最少五个字）</p>
    <hr>
    <ul>
      <li v-for="(item, index) in list" :key="index">{{item.text}}</li>
    </ul>
    <hr>
    <input type="text" v-model="text" maxlength="100">
    <button @click="click">提交</button>
    <span>字数：{{text.length}}/100</span>
    <p>（最少五个字）</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HelloWorld',
  data () {
    return {
      text: '',
      list: []
    }
  },
  methods: {
    click () {
      if (this.text.length < 5) {
        return
      }
      axios({
        url: 'https://www.feizhouxianyu.cn:9090/mengxinjuzhusuo',
        method: 'post',
        params: {
          text: this.text
        }
      }).then(res => {
        if (res.status === 200) {
          this._getList()
          this.text = ''
        }
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

</style>
