<template>
  <v-app dark>

    <sideBar v-if="!checkLogin"/>

    <v-main>

      <!-- <pre>{{$store.state.aksesMenu}}</pre> -->

      <v-container>
        <nuxt />
      </v-container>
    </v-main>
      <div  v-if="!checkLogin">
        <br><br>
        <div class="footerku">
          <span>&copy; {{ new Date().getFullYear() }} KyoKongga</span>
        </div>

      </div>
    <!-- <v-footer :absolute="!fixed" app class="footerku">
      <span>&copy; {{ new Date().getFullYear() }} KyoKongga</span>
    </v-footer> -->

  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,

      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
  methods: {


    cekToken(){
      fetch(this.$store.state.url.URL_APP + "checkAuth", {
          method: "GET",
          headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
          }
      })
          .then(res => res.json())
          .then(res_data => {
            // console.log(res_data)
              if (res_data.message == 'Tidak ter-Authorisasi') {
                localStorage.removeItem("token");
                localStorage.removeItem("profile");
                this.$router.push("/login");
              }
      });
    },


  },

  mounted () {
    this.cekToken();
  },
  computed: {
      checkLogin() {
          if (this.$route.name === 'login') {
              return true;
          } else {
              return false;
          }
          // return this.$route.name
      },

  },
}
</script>
