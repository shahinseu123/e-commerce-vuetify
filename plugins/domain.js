import Vue from 'vue'

const test = {
  name: 'http://localhost:8000',
  ping() {
      console.log('Ping')
  }
}

export default ({ app }, inject) => {
  inject('domain', test)
}