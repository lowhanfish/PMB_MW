import Vue from 'vue'

import navBar from '../components/navBar.vue'
import comRegistrasi from '../components/registrasi/registrasi.vue'
import compDD from '../components/registrasi/dd.vue'
import compAS from '../components/registrasi/as.vue'
import compOT from '../components/registrasi/ot.vue'
import compJP from '../components/registrasi/jp.vue'
import compBL from '../components/registrasi/bl.vue'


// import { VueAgile } from 'vue-agile'




// const components = { BlMain, BlRegion, ... }

const components = {navBar, comRegistrasi, compDD, compAS, compOT, compJP, compBL}

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
