<template>
  <div class="mainPage">
    <v-container>
      <v-card class="mx-auto" outlined>
        <v-row class="barPage">
          <v-col cols="12" md="4">
            <span class="h_judul">Terverifikasi</span>
            <br />
            <span class="h_Sub_judul">Tabel terverifikasi</span>
          </v-col>

          <v-col cols="12" md="4">
            <!-- <v-text-field class="placeholerku" prepend-inner-icon="mdi-magnify" dense solo clear-icon="mdi-close-circle" clearable placeholder="Cari Data" type="text"></v-text-field> -->
          </v-col>

          <v-col cols="12" md="4" style="padding-right:0px">
            <v-row no-gutters>
              <v-col cols="1"></v-col>
              <v-col cols="1">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn tile height="37.5px" style="margin-left:-38px" elevation="2" color="primary" v-bind="attrs" v-on="on" @click="mdl_add = true" disabled>
                      <v-icon color="white">mdi-file-excel</v-icon>
                    </v-btn>
                  </template>
                  <span>Tambah Data</span>
                </v-tooltip>
              </v-col>
              <v-col cols="8">
                <v-text-field  disabled class="placeholerku" prepend-inner-icon="mdi-magnify" dense solo clear-icon="mdi-close-circle" clearable placeholder="Cari Nama" type="text"/>
              </v-col>
              <v-col cols="1">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn tile height="37.5px" elevation="2" color="primary" v-bind="attrs" v-on="on" @click="mdl_add = true" disabled>
                      <v-icon color="white">mdi-printer</v-icon>
                    </v-btn>
                  </template>
                  <span>Tambah Data</span>
                </v-tooltip>
              </v-col>

              <v-col cols="1"></v-col>

            </v-row>
          </v-col>
        </v-row>
      </v-card>

      <!-- <hr class="batasPrimary" /> -->

      <div>

        <!-- <pre>{{list_data}}</pre> -->
        <br>

        <hr class="batasAbu" />
        <br>

        <v-row  no-gutters>
          <v-col cols="12" md="6" class="row_filter">
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
          <v-col cols="12" md="6" class="row_filter">
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
          <!-- <v-col cols="12" md="3" class="row_filter">
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
          </v-col> -->
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
            <thead>
                <tr>
                    <th width="5%" scope="col" class="text-center h_midle h_cetak_head">NO TEST</th>
                    <th width="23%" scope="col" class="text-center h_midle h_cetak_head">NAMA</th>
                    <th width="8%" scope="col" class="text-center h_midle h_cetak_head">
                        TEMPAT<br>LAHIR
                    </th>
                    <th width="8%" scope="col" class="text-center h_midle h_cetak_head">TGL<br>LAHIR</th>
                    <th width="5%" scope="col" class="text-center h_midle h_cetak_head">
                        JENIS<br>KELAMIN
                    </th>
                    <th width="5%" scope="col" class="text-center h_midle h_cetak_head">AGAMA</th>
                    <th width="23%" scope="col" class="text-center h_midle h_cetak_head">PRODI PILIHAN</th>
                    <th width="23%" scope="col" class="text-center h_midle h_cetak_head">ASAL SEKOLAH</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="data in list_data" :key="data.reg_fl_id">
                    <td scope="row" class="text-center h_cetak_body h_top">{{conversi00(data.no_test)}}</td>
                    <td class="h_cetak_body h_besar h_top">{{data.dd_nama}}</td>
                    <td class="h_cetak_body h_besar h_top">{{data.dd_tpt_lahir}}</td>
                    <td class="h_cetak_body text-center h_top">{{data.dd_tgl_lahir}}</td>
                    <td class="text-center h_cetak_body h_top">{{data.dd_jenis_kelamin_uraian}}</td>
                    <td class="text-center h_cetak_body h_top">{{data.dd_agama}}</td>
                    <td class="h_cetak_body h_besar h_top">
                        <template v-for="(data1, i) in data.jp">
                            <span :key="data1.jp">{{data1.jp_prodi_uraian}}</span>
                            {{filterJurusanLength(data.jp, i)}}
                        </template>
                    </td>
                    <td class="h_cetak_body h_besar h_top"> {{data.as_nama_sekolah}} </td>
                </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>

      <br />
      <hr class="batasAbu" />


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


              </v-container>
              <!-- <small>*indicates required field</small> -->
              <hr class="batasAbu">
              <br>
              <div class="text-center">
                <v-btn class="ma-2" outlined color="red darken-1"  @click="mdl_view = false">Close</v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-dialog>
      <!-- =========================== LIHAT DATA ============================== -->


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



        mdl_view : false,


        filter : {
          tahun_id : '',
          gelombang_id : '',
          prodi_id : '',
          status : 1,
        },

        list_data : [],
        list_tahun : [],
        list_gelombang : [],
        list_prodi : [],


        FETCHING : FETCHING,
        UMUM : UMUM,


        loadingView : false,




      }
    },
    methods: {
      getView : function(){
        // this.$store.commit("shoWLoading");
        this.loadingView = true;
        fetch(this.$store.state.url.URL_MAIN_laporanVerifikasi + "view", {
            method: "POST",
            headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({

                tahun_id : this.filter.tahun_id,
                gelombang_id : this.filter.gelombang_id,
                status : 2,
            })
        })
            .then(res => res.json())
            .then(res_data => {
              // console.log(res_data)
              this.list_data = res_data;
              this.loadingView = false;
              // this.list_data = res_data;
              // this.page_last = res_data.jml_data;
        });
      },






      // ====================================== PAGINATE ====================================
        indexing : function(index){
            var idx = ((this.page_first-1)*this.page_limit)+index
            return idx
        },

        cari_data : function(){
            this.getView();
        },


        funcAwait : async function(){
          this.list_tahun = await this.FETCHING.getTahun();
          this.list_gelombang = await this.FETCHING.getGelombang();
          this.list_prodi = await this.FETCHING.getProdi();
          this.filter.gelombang_id = this.list_gelombang[0].gelombang_id;
          this.getView();
        },

        filterJurusanLength : function(data, value){
            if (data.length > 1) {

                if (value == (data.length-1)) {
                    return ''
                } else {
                    return ' / '
                }

            } else {
                return ''
            }
        },

        conversi00 : function (params) {
            return ('000' + params).slice(-4)
        },


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
