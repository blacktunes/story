import axios from 'axios'

// const url = 'http://127.0.0.1:9090'
const url = 'https://www.feizhouxianyu.cn:9090'

export function getTopic () {
  return axios.get(`${url}/getTopic`)
}

export function getMessage (name) {
  return axios.get(`${url}/getMessage?name=${name}`)
}
