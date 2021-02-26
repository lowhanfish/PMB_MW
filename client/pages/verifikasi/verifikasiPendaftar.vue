<template>
  <div class="mainPage">
    <v-container>
      <v-card class="mx-auto" outlined>
        <v-row class="barPage">
          <v-col cols="12" md="4">
            <span class="h_judul">Verifikasi Pendaftar</span>
            <br />
            <span class="h_Sub_judul">Tabel Verifikasi</span>
          </v-col>

          <v-col cols="12" md="4">
            <!-- <v-text-field class="placeholerku" prepend-inner-icon="mdi-magnify" dense solo clear-icon="mdi-close-circle" clearable placeholder="Cari Data" type="text"></v-text-field> -->
          </v-col>

          <v-col cols="12" md="4" style="padding-right:25px">
            <v-row no-gutters>
              <v-col cols="10">
                <v-text-field  v-model="cari_value" @input="cari_data()" class="placeholerku" prepend-inner-icon="mdi-magnify" dense solo clear-icon="mdi-close-circle" clearable placeholder="Cari Nama" type="text"/>
              </v-col>
              <v-col cols="1">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn tile height="37.5px" elevation="2" color="primary" v-bind="attrs" v-on="on" @click="mdl_add = true" disabled>
                      <v-icon color="white">mdi-plus</v-icon>
                    </v-btn>
                  </template>
                  <span>Tambah Data</span>
                </v-tooltip>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>

      <!-- <hr class="batasPrimary" /> -->

      <div>


        <br>

        <hr class="batasAbu" />
        <br>

        <v-row  no-gutters>
          <v-col cols="12" md="3" class="row_filter">
            <v-autocomplete
              v-model="filter.tahun_id"
              :items="list_tahun"
              :item-text="'uraian'"
              :item-value="'tahun_id'"
              label="Filter Tahun"
              @input="cari_data()"
              outlined
              dense
            />
          </v-col>
          <v-col cols="12" md="3" class="row_filter">
            <v-autocomplete
              v-model="filter.gelombang_id"
              :items="list_gelombang"
              :item-text="'uraian'"
              :item-value="'gelombang_id'"
              label="Filter Gelombang"
              @input="cari_data()"
              outlined
              dense
            />
          </v-col>
          <v-col cols="12" md="3" class="row_filter">
            <v-autocomplete
              v-model="filter.prodi_id"
              :items="list_prodi"
              :item-text="'uraian'"
              :item-value="'prodi_id'"
              label="Filter Prodi"
              @input="cari_data()"
              outlined
              dense
              clear-icon="mdi-close-circle"
              clearable
            />
          </v-col>
          <v-col cols="12" md="3" class="row_filter">
            <v-autocomplete
              v-model="filter.status"
              :items="$store.state.status"
              :item-text="'uraian'"
              :item-value="'id'"
              label="Filter Status"
              @input="cari_data()"
              outlined
              dense
            />
          </v-col>
        </v-row>

        <hr class="batasAbu" />

        <div class="text-center" v-if="loadingView">
          <br>
          <img src="/img/loading.gif" width="15%" alt="Loading"> <br>
          <span class="h_loading">LOADING..!</span> <br>
          <span class="h_loading_sub">Mohon tunggu..</span>
        </div>


        <v-simple-table style="width:100%" v-if="!loadingView">
          <template v-slot:default>
            <thead style="background:#5289E7">
              <tr class="h_table_head">
                <th class="text-left" style="width:5%">No</th>
                <th class="text-left" style="width:7%">No Test</th>
                <th class="text-left" style="width:30%">Nama</th>
                <th class="text-center" style="width:18%">KTP</th>
                <th class="text-left" style="width:15%">TTL</th>
                <th class="text-left" style="width:10%">JK</th>
                <th class="text-left" style="width:15%">Act</th>
              </tr>
            </thead>
            <tbody>
              <tr class="h_table_body" v-for="(data,index) in list_data" :key="index">
                <td class="text-center">{{indexing(index+1)}}.</td>
                <td>{{data.reg_dd_id}}</td>
                <td>{{data.nama}}</td>
                <td>{{data.no_ktp}}</td>
                <td>{{data.tpt_lahir}}, {{data.tgl_lahir}}</td>
                <td>{{data.master_jenis_kel_uraian}}</td>
                <td class="text-center">
                  <v-btn-toggle mandatory>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn color="light-blue darken-1" fab small v-bind="attrs" v-on="on" @click="getOne(data)">
                          <v-icon color="white">mdi-file-pdf</v-icon>
                        </v-btn>
                      </template>
                      <span>Lihat Formulir</span>
                    </v-tooltip>

                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn color="light-green darken-1" fab small v-bind="attrs" v-on="on" @click="selectData(data, 2) ,mdl_konfirmasi=true" :disabled="disabledCrud(filter.status)">
                          <v-icon color="white">mdi-comment-check</v-icon>
                        </v-btn>
                      </template>
                      <span>Konfirmasi Data</span>
                    </v-tooltip>

                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn color="red darken-4" fab small v-bind="attrs" v-on="on" @click="selectData(data, 3) ,mdl_kembalikan=true" :disabled="disabledCrud(filter.status)">
                          <v-icon color="white">mdi-close-box-outline</v-icon>
                        </v-btn>
                      </template>
                      <span>Kembalikan Data</span>
                    </v-tooltip>
                  </v-btn-toggle>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>

      <br />
      <hr class="batasAbu" />

      <div class="text-center" v-if="!loadingView">
        <v-container>
          <v-row justify="center">
            <v-col cols="12">
              <v-container class="max-width">
                <v-pagination
                  v-model="page_first"
                  class="my-4"
                  :length="page_last"
                  :total-visible="7"
                  @input="getView()"
                  color="orange darken-1"
                ></v-pagination>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-container>

    <!-- ++++++++++++++++++++++++++++++++++++++ MODAL ++++++++++++++++++++++++++++++++++++++++++ -->

      <!-- =========================== LIHAT DATA ============================== -->
        <v-dialog v-model="mdl_view" persistent max-width="1024px">

          <v-card>
            <v-app-bar flat class="light-green darken-1">
              <v-toolbar-title class="title white--text pl-0">
                Profil Pendaftar
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_view = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>

              <v-container>
                <!-- ISI KONTENT -->
                <profilPendaftar :formx="profileku" :UMUM="UMUM" :tahun_id="filter.tahun_id" :list_jp="list_jp"/>

              </v-container>
              <!-- <small>*indicates required field</small> -->
              <hr class="batasAbu">
              <br>
              <div class="text-center">
                <v-btn class="ma-2" outlined color="indigo" @click="viewPDF(profileku.ijazah)">File Ijazah</v-btn>
                <v-btn class="ma-2" outlined color="indigo" @click="viewPDF(profileku.transkrip)">File Transkrip</v-btn>
                <v-btn class="ma-2" outlined color="indigo" @click="viewImage(profileku.bukti_transfer)">Bukti Transfer</v-btn>
                <v-btn class="ma-2" outlined color="red darken-1"  @click="mdl_view = false">Close</v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-dialog>
      <!-- =========================== LIHAT DATA ============================== -->

      <!-- =========================== KEMBALIKAN DATA ============================== -->
        <v-dialog v-model="mdl_kembalikan" persistent max-width="600px">

          <v-card>
            <v-app-bar flat class="red darken-1">
              <v-toolbar-title class="title white--text pl-0">
                Form Pengembalian
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_kembalikan = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>
                <!-- ISI KONTENT -->
                <br>
                <v-textarea
                  v-model="form.keterangan"
                  outlined
                  label="Alasan Pengembalian"
                ></v-textarea>

            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="kembalikanData()">Kembalikan</v-btn>
              <v-btn color="red darken-1" text @click="mdl_kembalikan = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <!-- =========================== KEMBALIKAN DATA ============================== -->

      <!-- =========================== KONFIRMASI DATA ============================== -->
        <v-dialog v-model="mdl_konfirmasi" persistent max-width="600px">

          <v-card>
            <v-app-bar flat class="green darken-1">
              <v-toolbar-title class="title white--text pl-0">
                Form Konfirmasi
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_konfirmasi = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>
              <br>
              <div class="text-center">
                <span>Apakah anda yakin ingin mengonfirmasi pendaftar ini?</span>
              </div>

            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="kembalikanData()">Konfirmasi</v-btn>
              <v-btn color="red darken-1" text @click="mdl_konfirmasi = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <!-- =========================== KONFIRMASI DATA ============================== -->


      <!-- =========================== LIHAT FOTO ============================== -->
        <v-dialog v-model="mdl_file_gambar" persistent max-width="600px">

          <v-card>
            <v-app-bar flat class="light-green darken-2">
              <v-toolbar-title class="title white--text pl-0">
                File Gambar
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_file_gambar = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>

              <v-container>
                <br>
                <img width="100%" :src="$store.state.URLX+'uploads/'+file" alt="">
              </v-container>
            </v-card-text>
              <br>
          </v-card>
        </v-dialog>
      <!-- =========================== LIHAT FOTO ============================== -->



      <!-- =========================== LIHAT PDF ============================== -->
        <v-dialog v-model="mdl_file_pdf" persistent max-width="980px">

          <v-card>
            <v-app-bar flat class="light-green darken-2">
              <v-toolbar-title class="title white--text pl-0">
                File Lampiran
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_file_pdf = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>

              <v-container>
                <br>
                <vuePdf
                  v-for="i in numPages"
                  :key="i"
                  :src="pdfSrc"
                  :page="i"
                  style="display: inline-block; width: 100%"
                ></vuePdf>

              </v-container>
            </v-card-text>
              <br>
          </v-card>
        </v-dialog>
      <!-- =========================== LIHAT PDF ============================== -->

    <!-- ++++++++++++++++++++++++++++++++++++++ MODAL ++++++++++++++++++++++++++++++++++++++++++ -->
  </div>
</template>

<script>

import FETCHING from "../../library/fetching";
import UMUM from "../../library/umum.js";

var vuePdf;
if (process.browser) {
  vuePdf = require('vue-pdf').default
}

  export default {
    components: {
      vuePdf,
    },

    data () {
      return {
        form : {
          gelombang_id : "",
          tahun_id : "",
          userId : '',
          reg_fl_id : '',
          stat_pembayaran : 1,
          keterangan : '',
          singkatan : '',
          email : '',
        },

        file : '',
        list_data : [],
        list_tahun : [],
        list_gelombang : [],
        list_prodi : [],

        profileku : null,
        list_jp : [],


        mdl_view : false,
        mdl_kembalikan : false,
        mdl_konfirmasi : false,
        mdl_file_gambar : false,
        mdl_file_pdf : false,

        filter : {
          tahun_id : '',
          gelombang_id : '',
          prodi_id : '',
          status : 1,
        },

        page_first: 1,
        page_last: 0,
        page_limit : 10,
        cari_value: "",
        FETCHING : FETCHING,
        UMUM : UMUM,


        pdfSrc: '',
        pdfPageCount : 0,
        numPages: undefined,

        loadingView : false,


      }
    },
    methods: {
      getView : function(){
        // this.$store.commit("shoWLoading");
        this.loadingView = true;
        fetch(this.$store.state.url.URL_MAIN_verifikasi + "view", {
            method: "POST",
            headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
                data_ke: this.page_first,
                cari_value: this.cari_value,
                page_limit : this.page_limit,
                tahun_id : this.filter.tahun_id,
                gelombang_id : this.filter.gelombang_id,
                prodi_id : this.filter.prodi_id,
                status : this.filter.status,
            })
        })
            .then(res => res.json())
            .then(res_data => {
              console.log(res_data)
              this.list_data = res_data.data;
              this.page_last = res_data.jml_data;
              this.loadingView = false;
        });
      },


      getOne : function(data){
        // this.$store.commit("shoWLoading");
        fetch(this.$store.state.url.URL_MAIN_verifikasi + "getOne", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
                userId : data.userId,
                tahun_id : this.filter.tahun_id,
                gelombang_id : this.filter.gelombang_id,
            })
        })
            .then(res => res.json())
            .then(res_data => {
              this.profileku = res_data.data[0];
              this.list_jp = res_data.jp;
              this.mdl_view = true;
              console.log(res_data)

        });
      },

      viewImage(file){
        this.file = file
        this.mdl_file_gambar = true
      },

      viewPDF(file){
        this.pdfSrc = vuePdf.createLoadingTask(this.$store.state.URLX+'uploads/'+file)
        this.pdfSrc.promise.then(pdf => {
          this.numPages = pdf.numPages;
        });
        this.mdl_file_pdf = true
      },


      kembalikanData : function(number) {
        // this.form.createdAt = UMUM.NOW()
        fetch(this.$store.state.url.URL_MAIN_verifikasi + "kembalikanData", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify(this.form)
        }).then(res_data => {
            this.mdl_konfirmasi = false;
            this.mdl_kembalikan = false;
            this.getView();
            this.$store.commit('notifAdd', 'Mengembalikan')
        });
      },

      // editData : function(){
      //   fetch(this.$store.state.url.URL_MAIN_verifikasi + "editData", {
      //       method: "POST",
      //       headers: {
      //         "content-type": "application/json",
      //         authorization: "kikensbatara " + localStorage.token
      //       },
      //       body: JSON.stringify(this.form)
      //   }).then(res_data => {

      //       this.getView();
      //       this.$store.commit('notifAdd', 'Mengubah')
      //   });
      // },

      // removeData : async function(data){

      //   await UMUM.notifDelete();
      //   fetch(this.$store.state.url.URL_MAIN_verifikasi + "removeData", {
      //       method: "POST",
      //       headers: {
      //         "content-type": "application/json",
      //         authorization: "kikensbatara " + localStorage.token
      //       },
      //       body: JSON.stringify(data)
      //   }).then(res_data => {
      //       this.getView();
      //       this.mdl_remove = false;
      //       this.$store.commit('notifAdd', 'Menghapus')
      //   });

      // },

      selectData : async function(data, value){
        console.log(data)
          this.form.gelombang_id = data.gelombang_id;
          this.form.tahun_id = data.tahun_id;
          this.form.userId = data.userId;
          this.form.reg_fl_id = data.reg_fl_id;
          this.form.keterangan = data.keterangan;
          this.form.singkatan = data.singkatan;
          this.form.email = data.email;
          this.form.stat_pembayaran = value;
      },
      disabledCrud(data){
        if (data == 2 || data == 3) {
          return true
        } else {
          return false
        }
      },

      // ====================================== PAGINATE ====================================
        indexing : function(index){
            var idx = ((this.page_first-1)*this.page_limit)+index
            return idx
        },

        cari_data : function(){
            this.page_first = 1;
            this.getView();
        },


        funcAwait : async function(){
          this.list_tahun = await this.FETCHING.getTahun();
          this.list_gelombang = await this.FETCHING.getGelombang();
          this.list_prodi = await this.FETCHING.getProdi();
          this.filter.gelombang_id = this.list_gelombang[0].gelombang_id;
          this.getView();
        }


      // ====================================== PAGINATE ====================================





    },
    mounted () {

      var d = new Date();
      var thn = d.getFullYear();
      this.filter.tahun_id = thn
      this.funcAwait();


    },
  }
</script>

<style>
</style>
