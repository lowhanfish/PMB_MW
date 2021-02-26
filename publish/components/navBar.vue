<template>
  <div class="black">
    <div class="rowx fixed">
      <div class="colx logoBar" style="width:270px; ">
        <v-img class="logoBarImg" contain src="img/logo1.png" />
      </div>
      <div class="rowx barNavigation" align-center >
        <div class="abu_tua " align-center>
          <v-container class="text-right"  style="margin-top:-6px">
                  <v-menu offset-y v-if="imgProfile.status">
                    <template v-slot:activator="{ on, attrs }">
                      <v-avatar v-bind="attrs" v-on="on">
                        <img :src="imgProfile.img" alt="No Profile">
                      </v-avatar>
                    </template>
                    <v-list>
                      <v-list-item @click="logOut()">
                        <v-list-item-title>Logout</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
          </v-container>

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
      title: 'Vuetify.js'
    }
  },
  methods: {
    Route() {
      alert('Yesss')
    },
    logOut(){
      this.$store.commit('ubahState', { name : 'statusLogin',  list : false});
      localStorage.removeItem("token");
      localStorage.removeItem("profile");
    },
  },



  computed: {
    imgProfile() {
      if (this.$store.state.statusLogin) {

        var get_profile = JSON.parse(localStorage.profile);
        var profileku = get_profile.profile;



        return{
          status : true,
          img : profileku.img
        }
      } else {
        return{
          status : false,
          img : ''
        }
      }
    }
  },




  mounted () {
    // var get_profile = JSON.parse(localStorage.profile);
    // var profileku = get_profile.profile;

    // console.log(profileku)
  },
}
</script>
