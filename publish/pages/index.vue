<template>
  <div>

    <img class="ImgResponsive" src="/img/banner.png" />



    <div style="background-color:#fafafa; margin-top:-30px">
      <br><br>
      <v-row class="bdiver">
        <v-col cols="12" md="6" class="bg_main_color">
            <v-row >
              <v-col cols="12" md="2"></v-col>
              <v-col class="text-center" cols="12" md="9"  style="padding:3% 3% 3% 3%">
                <br>
                <comRegistrasi/>
                <br><br>
              </v-col>

              <v-col cols="12" md="1"></v-col>
            </v-row>
        </v-col>
          <div class="diverTengah">
            <img class="logo_tengah" src="/img/logo_mw.png" alt="">
        </div>
        <v-col cols="12" md="6" style="background;#fafafa">
            <v-row justify="center" align="center">
              <v-col cols="12" md="2"></v-col>

              <v-col cols="12" md="8" class="tengahVert">
                <div  style="padding-left:20px; padding-right:30px">
                  <hr class="batasAbu">
                  <span class="h_title_judul_hijau">DOKUMEN PERSIAPAN</span>
                  <hr class="batasAbu1"> <br>
                  <ul>
                    <li class="h_title_isi" v-for="data in list_dokPersiapan" :key="data.dokPersiapan_id">{{data.uraian}}</li>
                  </ul>
                </div>
              </v-col>
              <v-col cols="12" md="2"></v-col>

            </v-row>
        </v-col>

      </v-row>

    </div>




    <div style="background-color:#fafafa">
      <br><br>
      <v-row class="bdiver">
        <v-col cols="12" md="6"  class=""  >


          <v-row justify="center" align="center">
              <v-col cols="12" md="2"></v-col>

              <v-col cols="12" md="8" class="tengahVert" style="padding-left:20px; padding-right:30px" >
                <div  style="padding-left:20px; padding-right:30px">
                  <hr class="batasAbu">
                  <span class="h_title_judul_kuning">JADUAL SPMB</span>
                  <hr class="batasAbu1"> <br>
                  <ul>
                      <li class="h_title_isi">
                        <b>Proses Pendaftara</b>
                        <ul>
                          <li>Gel-I : 05 April - 26 Juni 2021</li>
                          <li>Gel-II : 12 Juli - 12 Agustus 2021</li>
                        </ul>
                      </li>

                      <li class="h_title_isi">
                        <b>Pelaksanaan Ujian Test Potensial Akademik (TPA)</b>
                        <ul>
                          <li>Gel-I : 29 Juni 2021</li>
                          <li>Gel-II : 14 Agustus 2021</li>
                        </ul>
                      </li>

                      <li class="h_title_isi">
                        <b>Pengumuman Hasil Test Potensial Akademik (TPA)</b>
                        <ul>
                          <li>Gel-I : 01 Juli 2021</li>
                          <li>Gel-II : 16 Agustus 2021</li>
                        </ul>
                      </li>

                      <li class="h_title_isi">
                        <b>Test Kesehatan & Wawancara</b>
                        <ul>
                          <li>Gel-I : 05 - 10 Juli 2021</li>
                          <li>Gel-II : 18 - 21 Agustus 2021</li>
                        </ul>
                      </li>

                      <li class="h_title_isi">
                        <b>Pengumuman Calon Mahasiswa yg diterima</b>
                        <ul>
                          <li>Gel-I : 13 Juli 2021</li>
                          <li>Gel-II : 24 Agustus 2021</li>
                        </ul>
                      </li>

                      <li class="h_title_isi">
                        <b>Registrasi, Pembayaran SPP dll</b>
                        <ul>
                          <li>Gel-I : 13 - 24 Juli 2021</li>
                          <li>Gel-II : 24 - 31 Agustus 2021</li>
                        </ul>
                      </li>


                  </ul>
                </div>
              </v-col>
              <v-col cols="12" md="2"></v-col>

            </v-row>
        </v-col>
        <v-col cols="12" md="6" class="bg_kuning_color padding-col text-center">
        <br>
        <a href="javascript:void(0)" @click="mdl_fakultas = true">
          <img class="gbr_pimpinan " src="/img/btn_prodi.png" alt="">
        </a>
        <br><br>
        </v-col>
      </v-row>

    </div>




    <!-- =========================== LIHAT FOTO ============================== -->
        <v-dialog v-model="mdl_fakultas" persistent max-width="1024px">
            <div class="blue-grey darken-4 text-right">
              <v-btn color="white" icon  @click="mdl_fakultas = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
              <img width="100%" :src="$store.state.URLX+'uploads/'+list_postDokInfografisFak.img+''" alt="">
        </v-dialog>
      <!-- =========================== LIHAT FOTO ============================== -->







  </div>
</template>

<script>

import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

import FETCHING from "../library/fetching";
import UMUM from "../library/UMUM";


export default {
  components: {
    Logo,
    VuetifyLogo,
    // agile: VueAgile
  },
  data() {
    return {
      filter : {
        tahun_id : '',
        gelombang_id : '',
      },
      list_dokPersiapan : [],
      list_postDokInfografisFak : {
        img : ''
      },

      mdl_fakultas : false,

      FETCHING : FETCHING,
      UMUM : UMUM,
    }
  },
  methods: {
    async asycFunc(){
      this.list_dokPersiapan = await this.FETCHING.postDokPersiapan(this.filter.tahun_id);
      this.list_postDokInfografisFak = await this.FETCHING.postDokInfografisFak(this.filter.tahun_id);
    },
  },
  mounted () {
    var d = new Date();
    var thn = d.getFullYear();
    this.filter.tahun_id = thn
    this.asycFunc();
  },
}
</script>
