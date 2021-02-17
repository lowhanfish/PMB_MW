<template>
  <div>
    <a href="javascript:void(0)" @click="btnAdd(true)">
      <img class="gbr_pimpinan" src="/img/btn_reg.png" alt />
    </a>
    <!-- =========================== ADD DATA ============================== -->
    <v-dialog v-model="$store.state.reg.add_data" persistent max-width="950px">
      <v-card>
        <v-app-bar flat class="light-green darken-2">
          <v-toolbar-title class="title white--text pl-0">Add Data</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="white" icon @click="btnAdd(false)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-app-bar>
        <v-card-text>
          <v-container>
            <br />
            <v-row>
              <v-col cols="12" md="6" class="">
                <v-select v-model="tahun_id"
                  :items="list_tahun"
                  :item-text="'uraian'"
                  :item-value="'tahun_id'"
                  @input="setData(tahun_id, 'tahun_id')"
                  label="Pilih Tahun*"
                  outlined
                  dense
                  required
                />
              </v-col>

              <v-col cols="12" md="6" class="">
                <v-select v-model="gelombang_id"
                  :items="list_gelombang"
                  :item-text="'uraian'"
                  :item-value="'gelombang_id'"
                  @input="setData(gelombang_id, 'gelombang_id')"
                  label="Pilih Gelombang*"
                  outlined
                  dense
                  required
                />
              </v-col>

            </v-row>
            <hr class="batasAbu"  style="margin-top:-20px">
            <br><br>
            <v-stepper v-model="$store.state.reg.el" style="margin-top:-20px">
              <v-stepper-header>
                <v-stepper-step
                  @click="next(1)"
                  :complete="$store.state.reg.el > 1"
                  step="1"
                >Asal Sekolah</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step
                  @click="next(2)"
                  :complete="$store.state.reg.el > 2"
                  step="2"
                >Jurusan Peminatan</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step
                  @click="next(3)"
                  :complete="$store.state.reg.el > 3"
                  step="3"
                >Identitas Diri</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step
                  @click="next(4)"
                  :complete="$store.state.reg.el > 4"
                  step="4"
                >Identitas Org Tua/Wali</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step @click="next(5)" step="5">Lampiran dan Bukti transfer</v-stepper-step>
              </v-stepper-header>

              <v-stepper-items>
                <v-stepper-content step="1">
                  <compAS  ref='compAS' v-if="$store.state.reg.el == 1"/>
                </v-stepper-content>
                 <v-stepper-content step="2">
                  <compJP  v-if="$store.state.reg.el == 2"/>
                </v-stepper-content>
                <v-stepper-content step="3">
                  <compDD  v-if="$store.state.reg.el == 3"/>
                </v-stepper-content>
                <v-stepper-content step="4">
                  <compOT  v-if="$store.state.reg.el == 4"/>
                </v-stepper-content>
                <v-stepper-content step="5">
                  <compBL  v-if="$store.state.reg.el == 5"/>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- =========================== ADD DATA ============================== -->

    <!-- =========================== ADD LOGIN ============================== -->
    <v-dialog v-model="mdl_login" max-width="600px">
      <v-card class="red lighten-2">
        <v-card-text>
          <br />
          <div class="text-center">
            <!-- <h2 color="red">Ups... Mohon Login Terlebih Dahulu..!</h2> -->
            <br />
            <!-- <v-btn color="red darken-4" class="ma-2 white--text">
                  <v-icon left dark style="font-size:25px"> mdi-google </v-icon>
                  <span>LOGIN DENGAN EMAIL GOOGLE</span>
            </v-btn>-->
            <div class="text-center" v-if="loadingFetch">
              <img width="50%" src="img/loadung.gif" alt="">
              <div class="f_loading">
                <span >LOADING..!</span>
              </div>
            </div>
            <GoogleLogin
               v-if="!loadingFetch"
              class="btn_google_login"
              :params="params"
              :onSuccess="onSuccess"
              :onFailure="onFailure"
            >
              <img width="20px" src="/img/google.png" spinner-color="primary" spinner-size="20px" />

              <span class="h_btn_google_login">LOGIN DENGAN GOOGLE</span>
            </GoogleLogin>
            <br>

            <span class="h_ket">*Pastikan email yang anda gunakan masih aktif untuk informasi dari kami</span>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- =========================== ADD LOGIN ============================== -->
  </div>
</template>

<script>

import GoogleLogin from 'vue-google-login';
import FETCHING from "../../library/fetching";



export default {

  components: {
    GoogleLogin,
  },

  data() {
    return {

      gelombang_id : this.$store.state.pb.gelombang_id,
      list_gelombang : [],
      tahun_id : this.$store.state.pb.tahun_id,
      list_tahun : [],


      mdl_login : false,
      params: {
          client_id: "125938679529-kt7jhdavukuftahm8f3gaee8f98d6v4h.apps.googleusercontent.com" // local
          // client_id: "" // server
      },

      renderParams: {
          width: 250,
          height: 50,
          longtitle: true
      },
      loadingFetch : false,

      FETCHING : FETCHING,
    }
  },

  methods: {
    next(data) {
      this.$store.commit('ubahStateReg', { name : 'el',  list : data});
    },
    btnAdd(data){

      if (localStorage.token) {
        console.log("ada")
        this.$store.commit('ubahStateReg', { name : 'add_data',  list : data});
        this.mdl_login = false
      } else {
        console.log("Tidak ada")
        this.$store.commit('ubahStateReg', { name : 'add_data',  list : !data});
        this.mdl_login = true
      }



    },

    onSuccess(googleUser) {
      this.loadingFetch = true;
      var datax = googleUser.getBasicProfile()
      const useremail = {
        id : datax[Object.keys(datax)[0]],
        nama : datax[Object.keys(datax)[1]],
        email : datax[Object.keys(datax)[5]],
        foto : datax[Object.keys(datax)[4]],
      }
      // console.log(googleUser)
      // console.log(useremail)

      fetch(this.$store.state.URLX +'auth/loginUsers', {
        method : 'POST',
        headers : {
          'content-type' : 'application/json',
        },
        body : JSON.stringify(useremail),
      }).then((response) => {

        console.log(response);

          if (response.ok) {
              return response.json();
          }
          return response.json().then(error => {
              throw new Error(error.message);
          });
      })
      .then((result) => {
        console.log("=============================");
        localStorage.token = result.token;
        localStorage.profile = JSON.stringify(result.profile);
        setTimeout(() => {
          this.loadingFetch = false;

          console.log(result)

          // LOGIN SUKSES, LAKUKAN SESUATU..!!
          if (localStorage.token) {
            this.$store.commit('ubahStateReg', { name : 'add_data',  list : true});
            this.mdl_login = false
          } else {
            this.$store.commit('ubahStateReg', { name : 'add_data',  list : false});
            this.mdl_login = true
          }




        }, 1000);
      })
      .catch(error => {
        setTimeout(() => {
          this.errorMessage = error.message;
        }, 1000);
      });
    },

    onFailure(){
      console.log('gagal')
    },
    setData(data, parameter){
      this.$store.commit('ubahStatePB', { name : parameter,  valx : data});
      this.tessaja()
    },

    async asycFunc(){
      this.list_gelombang = await this.FETCHING.getGelombang();
      this.list_tahun = await this.FETCHING.getTahun()
    },


    tessaja(){
      this.$refs.compAS.getView();
    }

  },

  mounted () {
    var d = new Date();
    var thn = d.getFullYear();
    this.tahun_id =thn
    this.asycFunc();
  },




}
</script>

<style>
</style>
