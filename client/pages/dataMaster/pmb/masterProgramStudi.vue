<template>
  <div class="mainPage">
    <v-container>
      <v-card class="mx-auto" outlined>
        <v-row class="barPage">
          <v-col cols="12" md="4">
            <span class="h_judul">Master Program Studi</span>
            <br />
            <span class="h_Sub_judul">Master PMB</span>
          </v-col>

          <v-col cols="12" md="4">
            <!-- <v-text-field class="placeholerku" prepend-inner-icon="mdi-magnify" dense solo clear-icon="mdi-close-circle" clearable placeholder="Cari Data" type="text"></v-text-field> -->
            <v-autocomplete
              class="placeholerku"
              v-model="form.fakultas_id"
              :items="list_fakultas"
               @input="getView()"
              :item-text="'uraian'"
              :item-value="'id'"
              label="Filter Fakultas"
              solo clearable
              outlined
              dense
            />
          </v-col>

          <v-col cols="12" md="4" style="padding-right:25px">
            <v-row no-gutters class="paddingMin">
              <v-col cols="10">
                <v-text-field class="placeholerku" prepend-inner-icon="mdi-magnify" dense solo clear-icon="mdi-close-circle" v-model="cari_value" @input="getView()" clearable placeholder="Cari Data" type="text"></v-text-field>
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
                <th class="text-left" style="width:30%">Prodi</th>
                <th class="text-left" style="width:25%">Program</th>
                <th class="text-left" style="width:25%">Fakultas</th>
                <th class="text-left" style="width:15%">Act</th>
              </tr>
            </thead>
            <tbody>
              <tr class="h_table_body" v-for="(data, index) in list_data" :key="data.id">
                <td class="text-center">{{indexing(index+1)}}.</td>
                <td>{{data.uraian}}</td>
                <td>{{data.program_uraian}}</td>
                <td>{{data.fakultas_uraian}}</td>
                <td class="text-center">
                  <v-btn-toggle mandatory>

                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn color="light-green darken-1" fab small v-bind="attrs" v-on="on" @click="selectData(data), selectList(data), mdl_list=true" :disabled="!$store.state.btn.updatex">
                          <v-icon color="white">mdi-link-variant</v-icon>
                        </v-btn>
                      </template>
                      <span>Sinkronisasi Jurusan Pendaftar</span>
                    </v-tooltip>

                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn color="orange darken-1" fab small v-bind="attrs" v-on="on" @click="selectData(data), mdl_edit=true" :disabled="!$store.state.btn.updatex">
                          <v-icon color="white">mdi-pencil</v-icon>
                        </v-btn>
                      </template>
                      <span>Ubah Data</span>
                    </v-tooltip>

                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn color="red darken-4" fab small v-bind="attrs" v-on="on" @click="removeData(data)" :disabled="!$store.state.btn.deletex">
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

      <!-- =========================== ADD DATA ============================== -->
        <v-dialog v-model="mdl_add" persistent max-width="600px">

          <v-card>
            <v-app-bar flat class="bg-primaryku">
              <v-toolbar-title class="title white--text pl-0">
                Add Data
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_add = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>

              <v-container>
                <br>
                <v-autocomplete
                  v-model="form.fakultas_id"
                  :items="list_fakultas"
                  :item-text="'uraian'"
                  :item-value="'id'"
                  label="Fakultas"
                  clearable
                  outlined
                  dense
                />

                <v-autocomplete
                  v-model="form.program_id"
                  :items="list_program"
                  :item-text="'uraian'"
                  :item-value="'program_id'"
                  label="Program"
                  clearable
                  outlined
                  dense
                />
                <v-text-field v-model="form.uraian" class="placeholerku" label="Program Studi" outlined dense required/>

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
                Add Data
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_add = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>

              <v-container>
                <br>
                <v-autocomplete
                  v-model="form.fakultas_id"
                  :items="list_fakultas"
                  :item-text="'uraian'"
                  :item-value="'id'"
                  label="Fakultas"
                  clearable
                  outlined
                  dense
                />

                <v-autocomplete
                  v-model="form.program_id"
                  :items="list_program"
                  :item-text="'uraian'"
                  :item-value="'program_id'"
                  label="Program"
                  clearable
                  outlined
                  dense
                />
                <v-text-field v-model="form.uraian" class="placeholerku" label="Program Studi" outlined dense required/>

              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="mdl_edit = false">Close</v-btn>
              <v-btn color="blue darken-1" text @click="editData()">Simpan</v-btn>
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

      <!-- =========================== JUR LIST ============================== -->
        <v-dialog v-model="mdl_list" persistent max-width="950px">

          <v-card>
            <v-app-bar flat class="light-green darken-1">
              <v-toolbar-title class="title white--text pl-0">
                List Jurusan Berkesesuaian
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_list = false, emptyList()">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>

              <v-container>
                <br>
                <v-row>
                  <v-col cols="12" md="2">
                    <v-select
                      v-model="tampil_data2"
                      :items="$store.state.datatampil"
                      label="Data Tampil*"
                      outlined
                      dense
                      @input="selectList()"
                      required
                    />
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-autocomplete
                      v-model="list.pendidikan_id"
                      :items="list_pendidikan"
                      :item-text="'uraian'"
                      :item-value="'pendidikan_id'"
                      label="Filter Tingkat Pendidikan"
                      clearable
                      @input="selectList()"
                      outlined
                      dense
                    />
                  </v-col>
                  <v-col cols="12" md="5">
                    <v-text-field v-model="cari_value2" @input="selectList()" class="placeholerku" label="Cari Jurusan" outlined dense required/>
                  </v-col>
                  <v-col cols="12" md="1">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn color="light-green darken-3" v-bind="attrs" v-on="on" @click="viewListJurusan(), mdl_list_add = true">
                          <v-icon color="white">mdi-plus</v-icon>
                        </v-btn>
                      </template>
                      <span>Tambah Jurusan</span>
                    </v-tooltip>
                  </v-col>
                </v-row>


                <v-simple-table style="width:100%">
                  <template v-slot:default>
                    <thead style="background:#5289E7">
                      <tr class="h_table_head">
                        <th class="text-left" style="width:5%">No</th>
                        <th class="text-left" style="width:30%">Tingkat Pendidikan</th>
                        <th class="text-left" style="width:50%">Jurusan</th>
                        <th class="text-center" style="width:15%">Act</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="h_table_body" v-for="(data, index) in list_relasi" :key="data.pendidikan_jurusan_id">
                        <td class="text-center"  >{{indexingFunc(index+1, page_first2, tampil_data2)}}.</td>
                        <td>{{data.pendidikan_uraian}}</td>
                        <td>{{data.pendidikan_jurusan_uraian}}</td>
                        <td class="text-center">
                          <v-tooltip bottom>
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn color="red lighten-2" fab x-small depressed v-bind="attrs" v-on="on" @click="removeDataJurusan(data.relasi_prodi_jurusan_id)">
                                  <v-icon color="white">mdi-window-close</v-icon>
                                </v-btn>
                              </template>
                              <span>Hapus Jurusan</span>
                          </v-tooltip>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>


                <hr class="batasAbu" />

                <div class="text-center">

                    <v-row justify="center">
                      <v-col cols="12">
                        <v-container class="max-width">
                          <v-pagination
                            v-model="page_first2"
                            class="my-4"
                            :length="page_last2"
                            :total-visible="5"
                            @input="selectList()"
                            color="light-green darken-1"
                          ></v-pagination>
                        </v-container>
                      </v-col>
                    </v-row>

                </div>

              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="mdl_list = false">Close</v-btn>
            </v-card-actions>

          </v-card>
        </v-dialog>
      <!-- =========================== JUR LIST ============================== -->

      <!-- =========================== JUR LIST ADD ============================== -->
        <v-dialog v-model="mdl_list_add" persistent max-width="950px">

          <v-card>
            <v-app-bar flat class="light-green darken-1">
              <v-toolbar-title class="title white--text pl-0">
                Tambah Jurusan Berkesesuaian
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_list_add = false, list_pendidikan_jurusan =[]">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>

              <v-container>
                <br>
                <v-row>
                  <v-col cols="12" md="2">
                    <v-select
                      v-model="tampil_data1"
                      :items="$store.state.datatampil"
                      label="Data Tampil*"
                      outlined
                      dense
                      @input="viewListJurusan()"
                      required
                    />
                  </v-col>

                  <v-col cols="12" md="5">
                    <v-autocomplete
                      v-model="list.pendidikan_id"
                      :items="list_pendidikan"
                      :item-text="'uraian'"
                      :item-value="'pendidikan_id'"
                      label="Filter Tingkat Pendidikan"
                      clearable
                      @input="viewListJurusan()"
                      outlined
                      dense
                    />
                  </v-col>
                  <v-col cols="12" md="5">
                    <v-text-field v-model="cari_value1" @input="viewListJurusan()" class="placeholerku" label="Cari Jurusan" outlined dense required/>
                  </v-col>
                </v-row>


                <v-simple-table style="width:100%">
                  <template v-slot:default>
                    <thead style="background:#5289E7">
                      <tr class="h_table_head">
                        <th class="text-center" style="width:10%">
                          <input v-model="ambilSemuaJurusan" @change="pilihSemua()" type="checkbox">
                        </th>
                        <th class="text-left" style="width:5%">No</th>
                        <th class="text-left" style="width:30%">Tingkat Pendidikan</th>
                        <th class="text-left" style="width:55%">Jurusan</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="h_table_body" v-for="(data, index) in list_pendidikan_jurusan" :key="data.pendidikan_jurusan_id">
                        <td class="text-center">
                          <input v-model="list.pendidikan_jurusan_id" type="checkbox" :value="data">
                        </td>
                        <td class="text-center"  >{{indexingFunc(index+1, page_first1, tampil_data1)}}.</td>
                        <td>{{data.pendidikan_uraian}}</td>
                        <td>{{data.uraian}}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>


                <hr class="batasAbu" />

                <div class="text-center">

                    <v-row justify="center">
                      <v-col cols="12">
                        <v-container class="max-width">
                          <v-pagination
                            v-model="page_first1"
                            class="my-4"
                            :length="page_last1"
                            :total-visible="5"
                            @input="viewListJurusan()"
                            color="light-green darken-1"
                          ></v-pagination>
                        </v-container>
                      </v-col>
                    </v-row>

                </div>

              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="mdl_list_add = false, list_pendidikan_jurusan =[]">Close</v-btn>
              <v-btn color="blue darken-1" text @click="addDatajurusan()">Simpan</v-btn>
            </v-card-actions>

          </v-card>
        </v-dialog>
      <!-- =========================== JUR LIST ADD ============================== -->

    <!-- ++++++++++++++++++++++++++++++++++++++ MODAL ++++++++++++++++++++++++++++++++++++++++++ -->
  </div>
</template>

<script>

  import FETCHING from "../../../library/fetching";
  import UMUM from "../../../library/umum.js";



  export default {
    data () {
      return {


        form: {
            prodi_id : '',
            uraian: '',
            program_id : '',
            fakultas_id : '',
        },
        list : {
            relasi_prodi_jurusan : '',
            prodi_id : '',
            pendidikan_id : '',
            pendidikan_jurusan_id : []
        },

        tampil_data2 : 10,


        list_data :[],
        list_program :[],
        list_fakultas : [],
        list_pendidikan : [],
        list_pendidikan_jurusan : [],
        list_relasi : [],
        ambilSemuaJurusan : false,

        mdl_add : false,
        mdl_edit : false,
        mdl_remove : false,
        mdl_list : false,
        mdl_list_add : false,

        page_first: 1,
        page_last: 0,
        page_limit : 10,
        cari_value: "",

        page_first1: 1,
        page_last1: 0,
        cari_value1: '',
        tampil_data1: 10,

        page_first2: 1,
        page_last2: 0,
        cari_value2: '',
        tampil_data2: 10,




        FETCHING : FETCHING,
        UMUM : UMUM,


      }
    },
    methods: {
      getView : function(){
        // this.$store.commit("shoWLoading");
        fetch(this.$store.state.url.URL_DM_master_prodi + "view", {
            method: "POST",
            headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
                data_ke: this.page_first,
                cari_value: this.cari_value,
                page_limit : this.page_limit,
                fakultas_id : this.form.fakultas_id
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
        fetch(this.$store.state.url.URL_DM_master_prodi + "addData", {
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
        fetch(this.$store.state.url.URL_DM_master_prodi + "editData", {
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
        fetch(this.$store.state.url.URL_DM_master_prodi + "removeData", {
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
          this.form.prodi_id = data.prodi_id;
          this.form.uraian = data.uraian;
          this.form.program_id = data.program_id;
          this.form.fakultas_id = data.fakultas_id;

          this.list.prodi_id = data.prodi_id;

      },

      selectList : async function(){
        this.list_pendidikan = await this.FETCHING.getTingkatPendidikan();
        var res_data =  await this.FETCHING.postDataJurusan(this.list, this.page_first2, this.cari_value2, this.tampil_data2);
        this.list_relasi = res_data.data;
        this.page_last2 = res_data.jml_data;
      },

      viewListJurusan : async function(){
        var res_data =  await this.FETCHING.postAllDataJurusan(this.list, this.page_first1, this.cari_value1, this.tampil_data1);
        this.list_pendidikan_jurusan = res_data.data;
        this.page_last1 = res_data.jml_data;
      },

      addDatajurusan : function(){
          fetch(this.$store.state.url.URL_DM_master_prodi + "addDatajurusan", {
              method: "POST",
              headers: {
                  'content-type' : 'application/json',
                  authorization: "kikensbatara " + localStorage.token
              },
              body: JSON.stringify(this.list)
              }).then(res_data => {
                  this.$store.commit('notifAdd', 'Menambah')
                  this.selectList();
          });
      },
      removeDataJurusan : async function(idnya){
          await UMUM.notifDelete();
         fetch(this.$store.state.url.URL_DM_master_prodi + "removeDataRelasi", {
              method: "POST",
              headers: {
                "content-type": "application/json",
                authorization: "kikensbatara " + localStorage.token
              },
              body: JSON.stringify({
                  id: idnya,
              })
          }).then(res_data => {
                this.selectList();
                this.$store.commit('notifAdd', 'Menghapus')
          });
      },


      pilihSemua : function(){
        var data = this.list_pendidikan_jurusan
        // console.log(data)
        console.log('============')

        if(this.ambilSemuaJurusan){
            console.log('Data di ambil Semua');
            data.forEach(element => {
                this.list.pendidikan_jurusan_id.push(element)
            });


        }else{
            console.log('Data di lepas Semua');
            for (let j = 0; j < this.list.pendidikan_jurusan_id.length; j++) {
                for (let i = 0; i < data.length; i++) {
                    if(data[i].pendidikan_jurusan_id == this.list.pendidikan_jurusan_id[j].pendidikan_jurusan_id) {
                        this.list.pendidikan_jurusan_id.splice(j, 1);
                        console.log('data ke')
                    }
                  }
            }
        }

        console.log(this.list.pendidikan_jurusan_id.length)
      },

      emptyList (){
        this.list_pendidikan = [];
        this.list_relasi = [];
      },

      // ====================================== PAGINATE ====================================
        indexing : function(index){
            var idx = ((this.page_first-1)*this.page_limit)+index
            return idx
        },

        indexingFunc : function(index, page_first, page_limit ){
            var idx = ((page_first-1)*page_limit)+index
            return idx
        },

        cari_data : function(){
            this.page_first = 1;
            this.getData();
        },


        funcAwaitAdd : async function(){
          this.list_fakultas = await this.FETCHING.getFakultas();
          this.list_program = await this.FETCHING.getProgram()
        }


      // ====================================== PAGINATE ====================================





    },
    mounted () {
      this.getView();
      this.funcAwaitAdd()
      // this.funcAwait()


    },
  }
</script>

<style>
</style>
