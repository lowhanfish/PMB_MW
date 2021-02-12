<template>
  <div class="mainPage">
    <v-container>
      <v-card class="mx-auto" outlined>
        <v-row class="barPage">
          <v-col cols="12" md="4">
            <span class="h_judul">Kelompok Pengguna</span>
            <br />
            <span class="h_Sub_judul">Authentikasi</span>
          </v-col>

          <v-col cols="12" md="4">
            <!-- <v-text-field class="placeholerku" prepend-inner-icon="mdi-magnify" dense solo clear-icon="mdi-close-circle" clearable placeholder="Cari Data" type="text"></v-text-field> -->
          </v-col>

          <v-col cols="12" md="4" style="padding-right:25px">
            <v-row no-gutters>
              <v-col cols="10">
                <v-text-field class="placeholerku" prepend-inner-icon="mdi-magnify" dense solo clear-icon="mdi-close-circle" clearable placeholder="Cari Data" type="text"></v-text-field>
              </v-col>
              <v-col cols="1">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn tile height="37.5px" elevation="2" color="primary" v-bind="attrs" v-on="on" @click="mdl_add = true, funcAwaitAdd()">
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

        <hr class="batasAbu" style="margin-bottom:1%"/>



          <!-- <h1>{{FETCHING.barChart}}</h1> -->
          <!-- <h1>{{$store.state.list_menu}}</h1> -->
          <!-- <h1>{{$store.state.counter}}</h1> -->


            <div >

              <v-simple-table style="width:100%">
                <template v-slot:default>
                  <thead>
                    <tr class="h_table_head" >
                      <th width="5%" class="text-center">No</th>
                      <th width="55%" class="text-left">Kelompok</th>
                      <th width="25%" class="text-center">Jml Akses</th>
                      <th width="15%" class="text-center">#Act</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr  class="h_table_body" v-for="(data, index) in list_data" :key="data.id">
                      <td class="text-center">{{indexing(index+1)}}.</td>
                      <td>{{data.uraian}}</td>
                      <td class="text-center">-</td>
                      <td class="text-center">
                        <v-btn-toggle >
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn color="orange" fab small v-bind="attrs" v-on="on" @click="selectData(data), mdl_edit=true">
                                <v-icon color="white">mdi-pencil</v-icon>
                              </v-btn>
                            </template>
                            <span>Ubah Data</span>
                          </v-tooltip>

                          <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn color="red darken-4" fab small v-bind="attrs" v-on="on" @click="removeData(data)">
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
                  color="orange darken-1"
                  @input="getView()"
                ></v-pagination>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-container>


    <!-- ++++++++++++++++++++++++++++++++++++++ MODAL ++++++++++++++++++++++++++++++++++++++++++ -->

      <!-- =========================== ADD DATA ============================== -->
        <v-dialog v-model="mdl_add" persistent max-width="1108px">

          <v-card>

            <v-app-bar flat class="bg-primaryku">
              <v-toolbar-title class="title white--text pl-0">
                Tambah Data
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_add = false, list_menu=[]">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>



            <v-card-text>

              <v-container>


                <v-row>
                  <v-col cols="12" md="12"  class="">
                    <small>*Nama Klp</small>
                    <v-text-field v-model="form.uraian" class="placeholerku" outlined dense required/>
                  </v-col>


                  <v-col cols="12" md="12"  class="divInput1">

                    <v-simple-table style="width:100%">
                      <template v-slot:default>
                        <thead>
                          <tr class="h_table_head" >
                            <th width="56%" colspan="3" class="text-left">Kelompok</th>
                            <th width="40%" class="text-center">#Act</th>
                          </tr>
                        </thead>
                        <tbody>
                          <template v-for="data in list_menu">
                            <tr  class="h_table_body" :key="data.id">
                              <td colspan="3">
                                <b>{{data.urutan}}. {{data.title}}</b>
                              </td>
                              <td class="vertical-center ">
                                <v-row  class="text-center vertical-center" v-if="!data.type">
                                  <v-checkbox v-model="data.readx" label="Read" color="green" />
                                  <v-checkbox v-model="data.addx" label="Add" color="blue" />
                                  <v-checkbox v-model="data.updatex" label="Edit" color="orange" />
                                  <v-checkbox v-model="data.deletex" label="Delete" color="red" />
                                </v-row>
                              </td>
                            </tr>

                            <template v-for="data1 in data.subItem">
                              <tr  class="h_table_body" :key="data1.id">
                                <td><b>{{data.urutan}}</b></td>
                                <td colspan="2">{{data1.urutan}}. {{data1.title}}</td>
                                <td class="text-center">
                                  <v-row  class="text-center vertical-center"  v-if="!data1.type">
                                    <v-checkbox v-model="data1.readx" label="Read" color="green" />
                                    <v-checkbox v-model="data1.addx" label="Add" color="blue" />
                                    <v-checkbox v-model="data1.updatex" label="Edit" color="orange" />
                                    <v-checkbox v-model="data1.deletex" label="Delete" color="red" />
                                  </v-row>
                                </td>
                              </tr>

                              <template v-for="data2 in data1.subItem" >
                                <tr  class="h_table_body" :key="data2.id">
                                  <td width="2%"><b>{{data.urutan}}</b></td>
                                  <td width="2%">{{data1.urutan}}</td>
                                  <td>
                                    <i>{{data2.urutan}}. {{data2.title}}</i>
                                  </td>
                                  <td class="text-center">
                                    <v-row  class="text-center vertical-center"  v-if="!data2.type">
                                      <v-checkbox v-model="data2.readx" label="Read" color="green" />
                                      <v-checkbox v-model="data2.addx" label="Add" color="blue" />
                                      <v-checkbox v-model="data2.updatex" label="Edit" color="orange" />
                                      <v-checkbox v-model="data2.deletex" label="Delete" color="red" />
                                    </v-row>
                                  </td>
                                </tr>
                              </template>

                            </template>

                          </template>
                        </tbody>
                      </template>
                    </v-simple-table>

                  </v-col>
                </v-row>

              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="mdl_add = false,  list_menu=[]">Close</v-btn>
              <v-btn color="blue darken-1" text @click="addData()">Simpan</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <!-- =========================== ADD DATA ============================== -->

      <!-- =========================== EDIT DATA ============================== -->
        <v-dialog v-model="mdl_edit" persistent max-width="1108px">

          <v-card>

            <v-app-bar flat color="orange lighten-2">
              <v-toolbar-title class="title white--text pl-0">
                Edit Data
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_edit = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>


            <v-card-text>
              <v-container>

                <v-row>
                  <v-col cols="12" md="12"  class="">
                    <small>*Nama Klp</small>
                    <v-text-field v-model="form.uraian" class="placeholerku" outlined dense required/>
                  </v-col>


                  <v-col cols="12" md="12"  class="divInput1">

                    <v-simple-table style="width:100%">
                      <template v-slot:default>
                        <thead>
                          <tr class="h_table_head" >
                            <th width="56%" colspan="3" class="text-left">Kelompok</th>
                            <th width="40%" class="text-center">#Act</th>
                          </tr>
                        </thead>
                        <tbody>
                          <template v-for="data in list_menu">
                            <tr  class="h_table_body" :key="data.id">
                              <td colspan="3">
                                <b>{{data.urutan}}. {{data.title}}</b>
                              </td>
                              <td class="vertical-center ">
                                <v-row  class="text-center vertical-center" v-if="!data.type">
                                  <v-checkbox v-model="data.readx" label="Read" color="green" />
                                  <v-checkbox v-model="data.addx" label="Add" color="blue" />
                                  <v-checkbox v-model="data.updatex" label="Edit" color="orange" />
                                  <v-checkbox v-model="data.deletex" label="Delete" color="red" />
                                </v-row>
                              </td>
                            </tr>

                            <template v-for="data1 in data.subItem">
                              <tr  class="h_table_body" :key="data1.id">
                                <td><b>{{data.urutan}}</b></td>
                                <td colspan="2">{{data1.urutan}}. {{data1.title}}</td>
                                <td class="text-center">
                                  <v-row  class="text-center vertical-center"  v-if="!data1.type">
                                    <v-checkbox v-model="data1.readx" label="Read" color="green" />
                                    <v-checkbox v-model="data1.addx" label="Add" color="blue" />
                                    <v-checkbox v-model="data1.updatex" label="Edit" color="orange" />
                                    <v-checkbox v-model="data1.deletex" label="Delete" color="red" />
                                  </v-row>
                                </td>
                              </tr>

                              <template v-for="data2 in data1.subItem" >
                                <tr  class="h_table_body" :key="data2.id">
                                  <td width="2%"><b>{{data.urutan}}</b></td>
                                  <td width="2%">{{data1.urutan}}</td>
                                  <td>
                                    <i>{{data2.urutan}}. {{data2.title}}</i>
                                  </td>
                                  <td class="text-center">
                                    <v-row  class="text-center vertical-center"  v-if="!data2.type">
                                      <v-checkbox v-model="data2.readx" label="Read" color="green" />
                                      <v-checkbox v-model="data2.addx" label="Add" color="blue" />
                                      <v-checkbox v-model="data2.updatex" label="Edit" color="orange" />
                                      <v-checkbox v-model="data2.deletex" label="Delete" color="red" />
                                    </v-row>
                                  </td>
                                </tr>
                              </template>

                            </template>

                          </template>
                        </tbody>
                      </template>
                    </v-simple-table>

                  </v-col>
                </v-row>

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

    <!-- ++++++++++++++++++++++++++++++++++++++ MODAL ++++++++++++++++++++++++++++++++++++++++++ -->
  </div>
</template>














<script>

  import FETCHING from "../../../library/fetching";
  import UMUM from "../../../library/umum.js";


  export default {
    data () {
      return {

        form : {
          id : '',
          uraian : '',
        },

        page_first: 1,
        page_last: 0,
        page_limit : 10,
        cari_value: "",
        FETCHING : FETCHING,
        UMUM : UMUM,


        mdl_add : false,
        mdl_edit : false,
        mdl_remove : false,

        cthSelect : '',

        list_data : [],
        list_menu : [],



      }
    },
    methods: {
      getView : function(){
        // this.$store.commit("shoWLoading");
        fetch(this.$store.state.url.URL_DM_KLP_USERS + "view", {
            method: "POST",
            headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
                data_ke: this.page_first,
                cari_value: this.cari_value,
                page_limit : this.page_limit,
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
        fetch(this.$store.state.url.URL_DM_KLP_USERS + "addData", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
              form : this.form,
              list_menu : this.list_menu
            })
        }).then(res_data => {
            this.getView();
            this.$store.commit('notifAdd', 'Menambah')
        });


      },

      editData : function(){
        fetch(this.$store.state.url.URL_DM_KLP_USERS + "editData", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
              form : this.form,
              list_menu : this.list_menu
            })
        }).then(res_data => {

            this.getView();
            this.$store.commit('notifAdd', 'Mengubah')
        });
      },

      removeData : async function(data){

        await UMUM.notifDelete();
        fetch(this.$store.state.url.URL_DM_KLP_USERS + "removeData", {
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
          this.list_menu = await this.FETCHING.postMasterMenu(data.id);

      },

      // ====================================== PAGINATE ====================================
        indexing : function(index){
            var idx = ((this.page_first-1)*this.page_limit)+index
            return idx
        },

        cari_data : function(){
            this.page_first = 1;
            this.getData();
        },


        funcAwaitAdd : async function(){
          // this.$store.commit('ubahState', {name : 'list_menu', list: await this.FETCHING.getMasterMenu()})
          // console.log(this.$store.state.list_menu)
          this.list_menu = await this.FETCHING.getMasterMenu();
        }


      // ====================================== PAGINATE ====================================





    },
    mounted () {
      this.getView();
      // this.funcAwait()


    },
  }
</script>

<style>
</style>
