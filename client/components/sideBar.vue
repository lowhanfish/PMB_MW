<template>
  <div>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app   class="grey darken-2">
<!-- style="background-color: #5289e7" -->
<!-- class="grey darken-1" -->

      <v-list>
      <v-img lazy-src="https://picsum.photos/id/11/10/6" style="margin-top:-3%" max-height="100%" max-width="100%" src="/img/card.png"></v-img>

         <v-list-item to="/" router exact>
          <v-list-item-action>
            <v-icon class="h_iconMenu">mdi-home</v-icon>
          </v-list-item-action>

          <v-list-item-content style="text-align:left">
            <v-list-item-title class="h_menu">Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>


        <template v-for="(item, i) in $store.state.list_menu">
          <!-- ========================== SUNGLE ========================== -->

            <v-list-item :key="i" :to="item.route" router exact v-if="item.type == 0">
              <v-list-item-action>
                <v-icon class="h_iconMenu">{{ item.icon }}</v-icon>
              </v-list-item-action>

              <v-list-item-content style="text-align:left">
                <v-list-item-title class="h_menu">{{item.title}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

          <!-- ========================== SUNGLE ========================== -->

          <!-- ========================= MULTI =========================== -->

            <v-list-group :value="false" no-action :key="i" v-if="item.type == 1 && checkLength(item.subItem)">
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
                <v-list-item link :key="i2" :to="item2.route" v-if="item2.type == 0">
                  <v-list-item-title class="h_menu1">{{item2.title}}</v-list-item-title>
                </v-list-item>
                <!-- ========================== SUB MENU ========================== -->

                <!-- ========================== SUB- SUB MENU ========================== -->
                  <v-list-group :value="false" no-action sub-group ripple :key="i2" v-if="item2.type == 1 && checkLength(item2.subItem)">
                    <template v-slot:activator>
                      <v-list-item-content style="text-align:left">
                        <v-list-item-title class="h_menu1">{{item2.title}}</v-list-item-title>
                      </v-list-item-content>
                    </template>

                    <v-list-item link v-for="(item3, i3) in item2.subItem" :key="i3" :to="item3.route">
                      <v-list-item-title class="h_menu1">{{item3.title}}</v-list-item-title>
                    </v-list-item>

                  </v-list-group>
                <!-- ========================== SUB- SUB MENU ========================== -->
              </template>
            </v-list-group>

          <!-- ========================= MULTI =========================== -->
        </template>

        <v-list-item router exact @click="logout()">
          <v-list-item-action>
            <v-icon class="h_iconMenu">mdi-check</v-icon>
          </v-list-item-action>

          <v-list-item-content style="text-align:left">
            <v-list-item-title class="h_menu">Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>


      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" fixed app style="background-color: #9bc33c">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" style="color:white" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <!-- <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>-->
    </v-app-bar>
  </div>
</template>

<script>


  import FETCHING from "../library/fetching";
   import UMUM from "../library/umum";








export default {
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: '',

      list_data : [],
      FETCHING : FETCHING,
    }
  },

  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("profile");
      this.$router.push("/login");
    },

    checkLength(data){
      if (data.length <= 0) {
        return false
      } else {
        return true
      }
    },



    async loadMenu(){

      var get_profile = JSON.parse(localStorage.profile);
      var profileku = get_profile.profile;

      var dataMenu =await this.FETCHING.postMasterMenuGetSideBar(profileku.menu_klp)

      this.$store.commit('ubahState', { name : 'list_menu',  list : dataMenu});

      var cinta = {
        Data_cinta : 'adalah'
      }


      var data = []
      dataMenu.forEach(h => {
          if (h.type == 0) {
            data.push(h)
          } else {
            h.subItem.forEach(i => {
                if (i.type == 0) {
                  data.push(i)
                } else {
                  i.subItem.forEach(j => {
                      data.push(j)
                  });
                }
            });
          }
      });

      var obj = UMUM.ArrToObj(data)
      this.$store.commit('ubahState', { name : 'aksesMenu',  list : obj});

    },

  },

  mounted () {
    this.loadMenu();
  },
}
</script>

