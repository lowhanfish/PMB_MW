import Vue from 'vue'


import sideBar from '../components/sideBar.vue'
import bottomBar from '../components/bottomBar.vue'



// const components = { BlMain, BlRegion, ... }

const components = {sideBar, bottomBar}

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
