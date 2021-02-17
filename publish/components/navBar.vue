<template>
  <div class="black">
    <div class="rowx fixed">
      <div class="colx logoBar" style="width:270px; ">
        <v-img class="logoBarImg" contain src="img/logo1.png" />
      </div>

      <div class="rowx barNavigation" align-center >
        <div class="abu_tua " align-center>
          <v-container class="bottonDrawer text-right"  @click.stop="drawer = !drawer" >
                <span style="color:white; font-size:8pt"><b>MENU</b></span>
                <v-icon style="color:white">mdi-menu</v-icon>
          </v-container>

          <!-- <ul class="menu_ul TopMenuList">
            <li class="menu_li">
              <router-link class="h_nav" to="/">Home</router-link>
            </li>
            <li class="menu_li">
              <router-link class="h_nav" to="/">Berita</router-link>
            </li>
            <li class="menu_li">
              <div class="dropdown">
                <router-link class="h_nav" to="/">Profil</router-link>
                  <div class="dropdown-content" >
                    <router-link class="h_nav_sub" to="/">Peraturan Daerah1</router-link>
                    <router-link class="h_nav_sub" to="/">Peraturan Daerah2</router-link>
                    <div class="dropdown1">

                      <router-link class="h_nav_sub" to="/">Peraturan Daerah yang alami</router-link>
                      <div class="dropdown-content1" >
                        <router-link class="h_nav_sub" to="/">Peraturan Daerah</router-link>
                        <router-link class="h_nav_sub" to="/">Peraturan Daerah</router-link>
                        <router-link class="h_nav_sub" to="/">Peraturan Daerah</router-link>
                      </div>

                    </div>
                    <router-link class="h_nav_sub" to="/">Peraturan Daerah</router-link>
                  </div>
              </div>
            </li>
            <li class="menu_li">
              <div class="dropdown">
                <router-link class="h_nav" to="/">Data/Informasi</router-link>
                  <div class="dropdown-content" >
                    <router-link class="h_nav_sub" to="/">Peraturan Daerah1</router-link>
                    <router-link class="h_nav_sub" to="/">Peraturan Daerah2</router-link>
                    <div class="dropdown1">

                      <router-link class="h_nav_sub" to="/">Peraturan Daerah yang alami</router-link>
                      <div class="dropdown-content1" >
                        <router-link class="h_nav_sub" to="/">Peraturan Daerah</router-link>
                        <router-link class="h_nav_sub" to="/">Peraturan Daerah</router-link>
                        <router-link class="h_nav_sub" to="/">Peraturan Daerah</router-link>
                      </div>

                    </div>
                    <router-link class="h_nav_sub" to="/">Peraturan Daerah</router-link>
                  </div>
              </div>
            </li>
            <li class="menu_li">
              <router-link class="h_nav" to="/">Agenda/Pengumuman</router-link>
            </li>
            <li class="menu_li">
              <router-link class="h_nav" to="/">Subdomain</router-link>
            </li>
             <li class="menu_li">
              <div class="dropdown">
                <router-link class="h_nav" to="/">Gallery</router-link>
                  <div class="dropdown-content" >
                    <router-link class="h_nav_sub" to="/">Foto</router-link>
                    <router-link class="h_nav_sub" to="/">Video</router-link>
                  </div>
              </div>
            </li>



          </ul>-->
        </div>
      </div>
    </div>

    <v-navigation-drawer class="yellow accent-4" v-model="drawer" absolute temporary style="z-index:2">
      <v-list>
      <v-img style="margin-top:-3%" max-height="100%" max-width="100%" src="/img/card.png"></v-img>
        <template v-for="(item, i) in $store.state.MENU">
          <!-- ========================== SUNGLE ========================== -->

          <v-list-item :key="i" :to="item.to" router exact v-if="item.type == 'single'">
            <v-list-item-action>
              <v-icon class="h_iconMenu">{{ item.icon }}</v-icon>
            </v-list-item-action>

            <v-list-item-content style="text-align:left">
              <v-list-item-title class="h_menu">{{item.title}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <!-- ========================== SUNGLE ========================== -->

          <!-- ========================= MULTI =========================== -->



          <v-list-group :value="false" no-action :key="i" v-if="item.type == 'multy'">
            <template v-slot:activator>
              <v-list-item-action>
                <v-icon  class="h_iconMenu">mdi-chart-bubble</v-icon>
              </v-list-item-action>

              <v-list-item-content style="text-align:left">
                <v-list-item-title class="h_menu">{{item.title}}</v-list-item-title>
              </v-list-item-content>
            </template>

            <template v-for="(item2, i2) in item.subItem">
              <!-- ========================== SUB MENU ========================== -->
              <v-list-item link :key="i2" :to="item2.to" v-if="item2.type == 'single'">
                <v-list-item-title class="h_menu1">{{item2.title}}</v-list-item-title>
              </v-list-item>
              <!-- ========================== SUB MENU ========================== -->

              <!-- ========================== SUB- SUB MENU ========================== -->
              <v-list-group :value="false" no-action sub-group ripple :key="i2" v-if="item2.type == 'multy'">
                <template v-slot:activator>
                  <v-list-item-content style="text-align:left">
                    <v-list-item-title class="h_menu1">{{item2.title}}</v-list-item-title>
                  </v-list-item-content>
                </template>

                <v-list-item link v-for="(item3, i3) in item2.subItem" :key="i3" :to="item3.to">
                  <v-list-item-title class="h_menu1">{{item3.title}}</v-list-item-title>
                </v-list-item>

              </v-list-group>
              <!-- ========================== SUB- SUB MENU ========================== -->
            </template>
          </v-list-group>

          <!-- ========================= MULTI =========================== -->
        </template>


        </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data () {
    return {

      drawer: null,

      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      title: 'Vuetify.js'
    }
  },
  methods: {
    Route() {
      alert('Yesss')
    }
  },
}
</script>
