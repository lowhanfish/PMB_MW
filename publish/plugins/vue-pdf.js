import Vue from 'vue'
import pdf from "vue-pdf";

// Vue.component('vue-pdf', pdf)

export default function () {
  Vue.component('pdf', pdf)
  Vue.prototype.pdf = pdf
}
