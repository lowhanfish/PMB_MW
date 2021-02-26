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
              <v-row v-if="$store.state.reg.el == 1">
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

              <!-- <h1>{{StatusGel}}</h1> -->
              <div v-if="checkObjFl" :style="'margin-top:-20px; color :' +UMUM.color(obj_fl.stat_pembayaran) ">
                <span><b>Catatan : </b> </span><span class="h_catatan"><i>{{obj_fl.keterangan}}</i></span>
                <br><br>
              </div>
              <hr class="batasAbu" style="margin-top:-20px">
              <br>



              <div class="text-center"  id="downloader" :style="'display: '+downloader">
                <v-btn color="blue-grey" class="ma-2 white--text" @click="hreff('generateReport')">
                  Download Formulir
                  <v-icon right dark>mdi-cloud-download</v-icon>
                </v-btn>

                <v-btn color="blue-grey" class="ma-2 white--text" @click="hreff('generateCard')">
                  Download Kartu Ujian
                  <v-icon right dark>mdi-cloud-download</v-icon>
                </v-btn>
              </div>


              <br>
              <div id="tutupPortal" class="text-center" :style="'display: '+tutupPortal">
                <img src="/img/sorry.png" alt="" style="width:100px"> <br>
                <span class="h_sorry">MAAF SEPERTINYA PENDAFTARAN GEL-{{gelombang_id}} TIDAK/BELUM TERBUKA <br/> SILAHKAN MELIHAT JADWAL SPMB TAHUN {{tahun_id}} ...</span>
                <br>
              </div>

              <div id="nonDownloader" :style="'display: '+nonDownloader">
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
                      <compAS ref='compAS' v-if="$store.state.reg.el == 1"/>
                    </v-stepper-content>
                    <v-stepper-content step="2">
                      <compJP ref='compJP' v-if="$store.state.reg.el == 2"/>
                    </v-stepper-content>
                    <v-stepper-content step="3">
                      <compDD ref='compDD' v-if="$store.state.reg.el == 3"/>
                    </v-stepper-content>
                    <v-stepper-content step="4">
                      <compOT ref='compOT' v-if="$store.state.reg.el == 4"/>
                    </v-stepper-content>
                    <v-stepper-content step="5">
                      <compBL ref='compBL' v-if="$store.state.reg.el == 5"/>
                    </v-stepper-content>
                  </v-stepper-items>
                </v-stepper>
              </div>
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
import UMUM from "../../library/UMUM";



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
      obj_fl : null,
      checkObjFl : false,


      mdl_login : false,
      params: this.$store.state.params,

      form : {
        reg_fl_id : '',
        foto : '',
        ijazah : '',
        transkrip : '',
        bukti_transfer : '',
        keterangan : '',
        stat_pembayaran : '',
      },

      renderParams: {
          width: 250,
          height: 50,
          longtitle: true
      },
      loadingFetch : false,
      downloader : 'none',
      nonDownloader : 'block',
      tutupPortal : 'none',

      StatusGel : false,

      FETCHING : FETCHING,
      UMUM : UMUM,
    }
  },

  methods: {
    next(data) {
      this.$store.commit('ubahStateReg', { name : 'el',  list : data});
    },
    btnAdd(data){
      if (localStorage.token) {
        // console.log("ada")
        this.$store.commit('ubahStateReg', { name : 'add_data',  list : data});
        this.mdl_login = false
      } else {
        // console.log("Tidak ada")
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
             this.checkCatatan()
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

    async setData(data, parameter){
      this.$store.commit('ubahStatePB', { name : parameter,  valx : data});
      this.tessaja();
      this.checkCatatan();


      var status = (this.list_gelombang.find(item => item.gelombang_id === this.gelombang_id)).status
      this.StatusGel = status;


    },

    async asycFunc(){
      this.list_gelombang = await this.FETCHING.getGelombang();
      this.list_tahun = await this.FETCHING.getTahun()
      this.checkCatatan();

      this.StatusGel = this.list_gelombang[0].status

      console.log( this.list_gelombang)
    },

    async checkCatatan(){
      var fl = await this.FETCHING.postRegFl(this.tahun_id, this.gelombang_id);

      if (fl.message == 'Tidak ter-Authorisasi') {
        this.$store.commit('ubahState', { name : 'statusLogin',  list : false});
        localStorage.removeItem("token");
        localStorage.removeItem("profile");

      } else {
        this.$store.commit('ubahState', { name : 'statusLogin',  list : true});

        if (fl == undefined || fl == null || fl == '') {
          this.checkObjFl = false;
          this.downloader = "none";

          if (this.StatusGel == 0) {
            this.nonDownloader = "none";
            this.tutupPortal = 'block'
          } else {
            this.nonDownloader = "block";
            this.tutupPortal = 'none'
          }


          // console.log("Tidak ada")
        } else {
          this.obj_fl = fl[0];
          if (this.obj_fl.stat_pembayaran == 0) {
            this.checkObjFl = false;
          } else {
            this.checkObjFl = true;
          }

          if (this.obj_fl.stat_pembayaran == 2) {
              this.downloader = "block";
              this.nonDownloader = "none";
              this.tutupPortal = "none";
          } else {
              this.downloader = "none";
              if (this.StatusGel == 0) {
                this.nonDownloader = "none";
                this.tutupPortal = 'block'
              } else {
                this.nonDownloader = "block";
                this.tutupPortal = 'none'
              }
          }
        }
      }



    },


    hreff(data){

      var profile = JSON.parse(localStorage.profile);
      var gelombang_id = this.$store.state.pb.gelombang_id;
      var tahun_id = this.$store.state.pb.tahun_id;

      var userId = profile._id



      // console.log(gelombang_id)


      window.open(
        // 'http://localhost:5014/kartu/generateReport?gelombang_id=2&tahun_id=2021&userId=i33wt8iskl54ta7i',
        this.$store.state.URLX+'kartu/'+data+'?gelombang_id='+gelombang_id+'&tahun_id='+tahun_id+'&userId='+userId,
        '_blank'
      );



    },




    tessaja(){
      this.$refs.compAS.getView();
      // this.$refs.compJP.getView();
      // this.$refs.compDD.getView();
      // this.$refs.compOT.getView();
      // this.$refs.compBL.getView();
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
