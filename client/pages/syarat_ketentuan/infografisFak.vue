<template>
  <div class="mainPage">
    <v-container>
      <v-card class="mx-auto" outlined>
        <v-row class="barPage">
          <v-col cols="12" md="4">
            <span class="h_judul">Infografis Fakultas dan Biaya</span>
            <br />
            <span class="h_Sub_judul">Syarat & Ketentuan</span>
          </v-col>

          <v-col cols="12" md="4">
            <!-- <v-text-field class="placeholerku" prepend-inner-icon="mdi-magnify" dense solo clear-icon="mdi-close-circle" clearable placeholder="Cari Data" type="text"></v-text-field> -->
          </v-col>

          <v-col cols="12" md="4" style="padding-right:25px">
            <v-row no-gutters>
              <v-col cols="10">
                <v-autocomplete
                    v-model="filter.tahun_id"
                    :items="list_tahun"
                    :item-text="'uraian'"
                    :item-value="'tahun_id'"
                    label="Filter Tahun"
                    @input="cari_data()"
                    outlined
                    class="placeholerku"
                    solo
                    dense
                  />
              </v-col>
              <v-col cols="1">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn tile height="37.5px" elevation="2" color="primary" v-bind="attrs" v-on="on" @click="mdl_add = true" :disabled="!$store.state.btn.addx">
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

        <v-simple-table style="width:100%">
          <template v-slot:default>
            <thead style="background:#5289E7">
              <tr class="h_table_head">
                <th class="text-left" style="width:5%">No</th>
                <th class="text-left" style="width:80%">Fakultas</th>
                <th class="text-left" style="width:15%">Act</th>
              </tr>
            </thead>
            <tbody>
              <tr class="h_table_body" v-for="(data, index) in list_data" :key="data.id">
                <td class="text-center">{{indexing(index+1)}}.</td>
                <td>
                  <img width="100%" :src="$store.state.URLX+'uploads/'+data.img" alt="">
                </td>
                <td class="text-center">
                  <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn color="orange darken-1" fab small v-bind="attrs" v-on="on" @click="selectData(data), mdl_edit=true" :disabled="!$store.state.btn.updatex">
                          <v-icon color="white">mdi-pencil</v-icon>
                        </v-btn>
                      </template>
                      <span>Ubah Data</span>
                    </v-tooltip>
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

      <!-- =========================== ADD DATA ============================== -->
        <v-dialog v-model="mdl_add" persistent max-width="600px">

          <v-card>
            <v-app-bar flat class="bg-primaryku">
              <v-toolbar-title class="title white--text pl-0">
                Add File
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_add = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>

              <v-container>
                <br>
                 <v-file-input v-model="file" label="Pilih File" outlined dense :accept="accepted"/>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="mdl_add = false">Close</v-btn>
              <v-btn color="blue darken-1" text @click="addData()">Simpan</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <!-- =========================== ADD DATA ============================== -->

      <!-- =========================== EDIT DATA ============================== -->
        <v-dialog v-model="mdl_edit" persistent max-width="600px">

          <v-card>
            <v-app-bar flat class="orange lighten-2">
              <v-toolbar-title class="title white--text pl-0">
                Edit File
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_edit = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>

              <v-container>
                <br>
                  <v-file-input v-model="file" label="Pilih File" outlined dense :accept="accepted"/>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="mdl_edit = false">Close</v-btn>
              <v-btn color="blue darken-1" text @click="addData()">Simpan</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <!-- =========================== EDIT DATA ============================== -->

      <!-- =========================== HAPUS DATA ============================== -->
        <v-dialog v-model="mdl_remove" persistent max-width="400px">

          <v-card  class="red lighten-2">
            <v-card-text>
              <v-container class="text-center">
                 <v-form @submit.prevent="removeData">
                  <br>
                  <img src="/img/alert.png" style="width:75px; height:auto" alt=""> <br>
                  <span class="mediaTitle">ANDA YAKIN INGIN MENGHAPUS DATA..?</span>
                  <br><br>
                  <div class="text-center">
                    <v-btn color="red darken-2" @click="mdl_remove = false"  style="color:white" >Batal</v-btn>
                    <v-btn color="blue darken-1" style="color:white" type="submit">Hapus</v-btn>
                  </div>
                </v-form>

              </v-container>
            </v-card-text>
            <!-- <v-card-actions >
              <v-spacer></v-spacer>

            </v-card-actions> -->
          </v-card>
        </v-dialog>
      <!-- =========================== HAPUS DATA ============================== -->

      <!-- =========================== LIHAT FOTO ============================== -->
        <v-dialog v-model="mdl_file" persistent max-width="600px">

          <v-card>
            <v-app-bar flat class="light-green darken-2">
              <v-toolbar-title class="title white--text pl-0">
                File Gambar
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_file = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>

              <v-container>
                <br>
                <img width="100%" :src="$store.state.URLX+'uploads/'+fileOld" alt="">
              </v-container>
            </v-card-text>
              <br>
          </v-card>
        </v-dialog>
      <!-- =========================== LIHAT FOTO ============================== -->

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
          dokPersiapan_id : '',
          uraian : '',
          tahun_id : ''
        },

        filter : {
          tahun_id : '',
        },
        fileOld : '',
        file : null,

        page_first: 1,
        page_last: 0,
        page_limit : 20,
        cari_value: "",
        FETCHING : FETCHING,
        UMUM : UMUM,
        accepted : '',


        mdl_add : false,
        mdl_edit : false,
        mdl_remove : false,
        mdl_file : false,

        cthSelect : '',

        list_data : [],
        list_tahun : [],

      }
    },
    methods: {
      getView : function(){
        // this.$store.commit("shoWLoading");
        fetch(this.$store.state.url.URL_MAIN_dokInfografisFak + "view", {
            method: "POST",
            headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
                data_ke: this.page_first,
                cari_value: this.cari_value,
                page_limit : this.page_limit,
                tahun_id : this.filter.tahun_id
            })
        })
            .then(res => res.json())
            .then(res_data => {
              console.log(res_data)
              this.list_data = res_data.data;
              this.page_last = res_data.jml_data;
        });
      },


      addData(){
          var formData = new FormData();
          formData.append('pb', JSON.stringify(this.filter));
          formData.append('fileOld', this.fileOld)
          formData.append('file', this.file);

          fetch(this.$store.state.url.URL_MAIN_dokInfografisFak + 'addData', {
              method: "POST",
              headers: {
                  authorization: "kikensbatara " + localStorage.token
              },
              body: formData
              }).then(res_data => {
                  // this.alertku("success", "sukses menambah data");
                  // this.getDD();
                  this.getView();
          });
        },

      removeData : async function(data){

        await UMUM.notifDelete();
        fetch(this.$store.state.url.URL_MAIN_dokInfografisFak + "removeData", {
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

      selectData(file){
        this.fileOld = file.img
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
        }


      // ====================================== PAGINATE ====================================





    },
    mounted () {
      var d = new Date();
      var thn = d.getFullYear();
      this.filter.tahun_id = thn

      this.getView();
      this.funcAwait()


    },
  }
</script>

<style>
</style>
