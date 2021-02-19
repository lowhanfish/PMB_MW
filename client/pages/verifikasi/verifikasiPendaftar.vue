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


        <v-simple-table style="width:100%">
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
                        <v-btn color="light-green darken-1" fab small v-bind="attrs" v-on="on" @click="mdl_view = true">
                          <v-icon color="white">mdi-file-pdf</v-icon>
                        </v-btn>
                      </template>
                      <span>Lihat Data</span>
                    </v-tooltip>

                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn color="orange darken-1" fab small v-bind="attrs" v-on="on">
                          <v-icon color="white">mdi-pencil</v-icon>
                        </v-btn>
                      </template>
                      <span>Ubah Data</span>
                    </v-tooltip>

                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn color="red darken-4" fab small v-bind="attrs" v-on="on" @click="mdl_kembalikan=true">
                          <v-icon color="white">mdi-delete</v-icon>
                        </v-btn>
                      </template>
                      <span>Hapus Data</span>
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

      <div class="text-center">
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
                <profilPendaftar userId="xxxx" tahun_id="2021"/>

              </v-container>
              <!-- <small>*indicates required field</small> -->
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="mdl_view = false">Close</v-btn>
            </v-card-actions>
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
              <v-container>
                <!-- ISI KONTENT -->

              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text >Kembalikan</v-btn>
              <v-btn color="red darken-1" text @click="mdl_kembalikan = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <!-- =========================== KEMBALIKAN DATA ============================== -->

    <!-- ++++++++++++++++++++++++++++++++++++++ MODAL ++++++++++++++++++++++++++++++++++++++++++ -->
  </div>
</template>

<script>

import FETCHING from "../../library/fetching";
import UMUM from "../../library/umum.js";

  export default {

    data () {
      return {
        form : {
          id : '',
          uraian : '',
          singkatan : '',
        },
        page_first: 1,
        page_last: 0,
        page_limit : 10,
        cari_value: "",
        FETCHING : FETCHING,
        UMUM : UMUM,

        list_data : [],
        list_tahun : [],
        list_gelombang : [],
        list_prodi : [],


        mdl_view : false,
        mdl_kembalikan : false,

        FETCHING : FETCHING,
        UMUM : UMUM,

        cthSelect : '',
        eventTestt : '',

        filter : {
          tahun_id : '',
          gelombang_id : '',
          prodi_id : '',
          status : 1,

        }



      }
    },
    methods: {
      getView : function(){
        // this.$store.commit("shoWLoading");
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
        });
      },


      addData : function(number) {
        // this.form.createdAt = UMUM.NOW()
        fetch(this.$store.state.url.URL_MAIN_verifikasi + "addData", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify(this.form)
        }).then(res_data => {
            this.getView();
            this.$store.commit('notifAdd', 'Menambah')
        });


      },

      editData : function(){
        fetch(this.$store.state.url.URL_MAIN_verifikasi + "editData", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify(this.form)
        }).then(res_data => {

            this.getView();
            this.$store.commit('notifAdd', 'Mengubah')
        });
      },

      removeData : async function(data){

        await UMUM.notifDelete();
        fetch(this.$store.state.url.URL_MAIN_verifikasi + "removeData", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify(data)
        }).then(res_data => {
            this.getView();
            this.mdl_remove = false;
            this.$store.commit('notifAdd', 'Menghapus')
        });

      },

      selectData : async function(data){
          this.form.id = data.id;
          this.form.uraian = data.uraian;
          this.form.singkatan = data.singkatan;

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
