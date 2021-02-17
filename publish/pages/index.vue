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
                      <li class="h_title_isi">File Ijazah SLTA Sederajat Bagi Pendaftar D3, S1 (PDF)</li>
                      <li class="h_title_isi">File Transkrip dan Ijazah D-III Bagi Pendaftar Non Reguler/Alih Jenjang (PDF)</li>
                      <li class="h_title_isi">File Transkrip dan Ijazah S1-Keperawatan Bagi Pendaftar profesi Ners (PDF)</li>
                      <li class="h_title_isi">File Transkrip dan Ijazah S1 Bagi Pendaftar Prodi Magister (PDF)</li>
                      <li class="h_title_isi">File e-KTP (PDF)</li>
                      <li class="h_title_isi">File Kartu Keluarga (PDF)</li>
                      <li class="h_title_isi">File Ijazah SLTA Sederajat (PDF)</li>
                      <li class="h_title_isi">File Pas Foto Terbaru warna (png, jpeg, jpg)</li>
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
        <a href="javascript:void(0)">
          <img class="gbr_pimpinan " src="/img/btn_prodi.png" alt="">
        </a>
        <br><br>
        </v-col>
      </v-row>

    </div>







  </div>
</template>

<script>

import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo,
    // agile: VueAgile
  },
  data() {
    return {

    }
  },
  mounted () {




//  $(function() {

//     var deg = 0;
//     var rotate = 1;
//     var club_rotate = setInterval(club_rotate, 25);
//     $('.circle-item > li').not(".circle-item > *:nth-of-type(8)").mouseenter(function() {
//         rotate = 0
//     });
//     $('.circle-item > li').not(".circle-item > *:nth-of-type(8)").mouseleave(function() {
//         rotate = 1
//     });
//     function club_rotate() {
//         if (rotate == 0) {
//             return
//         }
//         deg = get_deg(deg + 1);
//         var deg0 = deg;
//         var $data = $('.circle-item').children().not(".circle-item > *:nth-of-type(8)");
//         var length = 13;
//         if ($(window).width() <= 540) {
//             length = 7
//         }
//         $data.each(function() {
//             $(this).css("-webkit-transform", "rotate(" + deg0 + "deg) translate(" + length + "em) rotate(-" + deg0 + "deg)").css("transform", "rotate(" + deg0 + "deg) translate(" + length + "em) rotate(-" + deg0 + "deg)");
//             deg0 = get_deg(deg0 + 51)
//         })
//     }

//     function get_deg(deg0) {
//         if (deg0 > 360)
//             return (deg0 - 360);
//         else return deg0
//     }
// });



  },
}
</script>
