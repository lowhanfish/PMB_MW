<template>
  <div class="mainPage">
    <v-container>
      <v-card class="mx-auto" outlined>
        <v-row class="barPage">
          <v-col cols="12" md="4">
            <span class="h_judul">Menu List</span>
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
                    <v-btn tile height="37.5px" elevation="2" color="primary" v-bind="attrs" v-on="on" @click="mdl_add = true, form.jenis=1, form.parrent=null">
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



            <div v-for="data in list_data" :key="data.id">

              <v-simple-table>
                <template v-slot:default>
                    <tbody>
                        <tr>
                          <td width="5%" class="text-center">
                            <v-btn color="blue" depressed fab x-small  @click="showHide(''+data.id+'')" :disabled="checkLength(data.subItem)">
                              <v-icon color="white">mdi-chevron-down</v-icon>
                            </v-btn>
                          </td>
                          <td width="10%" class="text-center">
                            <v-icon large color="green darken-2">{{data.icon}}</v-icon>
                          </td>
                          <td width="30%"><b>{{data.urutan}}. {{data.title}}</b></td>
                          <td width="25%">{{data.route}}</td>
                          <td width="15%">{{renameType(data.type)}}</td>
                          <td width="15%" class="text-center">

                              <v-btn-toggle >

                                <v-tooltip bottom>
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn  depressed fab x-small color="primary" v-bind="attrs" v-on="on" @click="mdl_add = true, form.jenis=2, form.parrent=data.id" :disabled="checkType(data.type)">
                                      <v-icon color="white">mdi-plus</v-icon>
                                    </v-btn>
                                  </template>
                                  <span>Tambah Data Submenu</span>
                                </v-tooltip>

                                <v-tooltip bottom>
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn  depressed fab x-small color="orange" v-bind="attrs" v-on="on" @click="selectData(data), mdl_edit = true">
                                      <v-icon color="white">mdi-pencil</v-icon>
                                    </v-btn>
                                  </template>
                                  <span>Edit Data Menu</span>
                                </v-tooltip>

                                <v-tooltip bottom>
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn  depressed fab x-small color="red" v-bind="attrs" v-on="on" @click="selectData(data), mdl_remove = true">
                                      <v-icon color="white">mdi-delete</v-icon>
                                    </v-btn>
                                  </template>
                                  <span>Hapus Data Menu</span>
                                </v-tooltip>

                              </v-btn-toggle>


                          </td>
                        </tr>
                    </tbody>
                </template>
              </v-simple-table>

              <div :id="''+data.id+''" class="hidex">
                <div v-for="data1 in data.subItem" :key="data1.id">

                  <v-simple-table>
                    <template v-slot:default>
                        <tbody>
                            <tr class="light-blue lighten-5">
                              <td width="5%" class="text-center">
                                <v-btn color="blue" depressed fab x-small  @click="showHide(''+data1.id+'')" :disabled="checkLength(data1.subItem)" >
                                  <v-icon color="white">mdi-chevron-down</v-icon>
                                </v-btn>
                              </td>
                              <td width="10%" class="text-center">
                                <v-icon large color="green darken-2">{{data.icon}}</v-icon>
                              </td>
                              <td width="30%">{{data1.title}}</td>
                              <td width="25%">{{data1.route}}</td>
                              <td width="15%">{{renameType(data1.type)}}</td>
                              <td width="15%" class="text-center">

                                  <v-btn-toggle >

                                    <v-tooltip bottom>
                                      <template v-slot:activator="{ on, attrs }">
                                        <v-btn  depressed fab x-small color="primary" v-bind="attrs" v-on="on" @click="mdl_add = true, form.jenis=2, form.parrent=data1.id" :disabled="checkType(data1.type)">
                                          <v-icon color="white">mdi-plus</v-icon>
                                        </v-btn>
                                      </template>
                                      <span>Tambah Data Submenu</span>
                                    </v-tooltip>

                                    <v-tooltip bottom>
                                      <template v-slot:activator="{ on, attrs }">
                                        <v-btn  depressed fab x-small color="orange" v-bind="attrs" v-on="on" @click="selectData(data1), mdl_edit = true">
                                          <v-icon color="white">mdi-pencil</v-icon>
                                        </v-btn>
                                      </template>
                                      <span>Edit Data Menu</span>
                                    </v-tooltip>

                                    <v-tooltip bottom>
                                      <template v-slot:activator="{ on, attrs }">
                                        <v-btn  depressed fab x-small color="red" v-bind="attrs" v-on="on" @click="selectData(data1), mdl_remove = true">
                                          <v-icon color="white">mdi-delete</v-icon>
                                        </v-btn>
                                      </template>
                                      <span>Hapus Data Menu</span>
                                    </v-tooltip>

                                  </v-btn-toggle>


                              </td>
                            </tr>
                        </tbody>
                    </template>
                  </v-simple-table>



                  <div :id="''+data1.id+''" class="hidex">

                    <div v-for="data2 in data1.subItem" :key="data2.id">
                      <v-simple-table>
                        <template v-slot:default>
                            <tbody>
                                <tr class="light-blue lighten-4">
                                  <td width="5%" class="text-center">
                                    <v-btn color="blue" depressed fab x-small  disabled>
                                      <v-icon color="white">mdi-chevron-down</v-icon>
                                    </v-btn>
                                  </td>
                                  <td width="10%" class="text-center">
                                    <v-icon large color="green darken-2">{{data.icon}}</v-icon>
                                  </td>
                                  <td width="30%">{{data2.title}}</td>
                                  <td width="25%">{{data2.route}}</td>
                                  <td width="15%">{{renameType(data2.type)}}</td>
                                  <td width="15%" class="text-center">

                                      <v-btn-toggle >

                                        <v-tooltip bottom>
                                          <template v-slot:activator="{ on, attrs }">
                                            <v-btn  depressed fab x-small color="primary" v-bind="attrs"  disabled>
                                              <v-icon color="white">mdi-plus</v-icon>
                                            </v-btn>
                                          </template>
                                          <span>Tambah Data Submenu</span>
                                        </v-tooltip>

                                        <v-tooltip bottom>
                                          <template v-slot:activator="{ on, attrs }">
                                            <v-btn  depressed fab x-small color="orange" v-bind="attrs" v-on="on" @click="selectData(data2), mdl_edit = true">
                                              <v-icon color="white">mdi-pencil</v-icon>
                                            </v-btn>
                                          </template>
                                          <span>Edit Data Menu</span>
                                        </v-tooltip>

                                        <v-tooltip bottom>
                                          <template v-slot:activator="{ on, attrs }">
                                            <v-btn  depressed fab x-small color="red" v-bind="attrs" v-on="on" @click="selectData(data2), mdl_remove = true">
                                              <v-icon color="white">mdi-delete</v-icon>
                                            </v-btn>
                                          </template>
                                          <span>Hapus Data Menu</span>
                                        </v-tooltip>

                                      </v-btn-toggle>


                                  </td>
                                </tr>
                            </tbody>
                        </template>
                      </v-simple-table>

                    </div>

                  </div>





                </div>

              </div>






            </div>






      </div>

      <br />
      <hr class="batasAbu" />
      <br>
    </v-container>


    <!-- ++++++++++++++++++++++++++++++++++++++ MODAL ++++++++++++++++++++++++++++++++++++++++++ -->

      <!-- =========================== ADD DATA ============================== -->
        <v-dialog v-model="mdl_add" persistent max-width="600px">

          <v-card>

            <v-app-bar flat class="bg-primaryku">
              <v-toolbar-title class="title white--text pl-0">
                Tambah Data
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_add = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>



            <v-card-text>

              <v-container>


                <v-row>
                  <v-col cols="12" md="12"  class="">
                    <small>*Nama Menu</small>
                    <v-text-field v-model="form.title" class="placeholerku" outlined dense required/>
                  </v-col>


                  <v-col cols="12" md="6"  class="divInput1">
                    <small>*Icon (<a href="http://code.meta-platform.com/assets/mdi/preview.html" target="_blank">referensi</a>)</small>
                    <v-text-field v-model="form.icon" class="placeholerku" outlined dense required/>
                  </v-col>

                  <v-col cols="12" md="6"  class="divInput1">
                    <small>*Route</small>
                    <v-text-field v-model="form.route" class="placeholerku" outlined dense required/>
                  </v-col>

                  <v-col cols="12" md="6"  class="divInput1">
                    <small>*Type</small>
                    <v-autocomplete
                      v-model="form.type"
                      :items="$store.state.type"
                      :item-text="'uraian'"
                      :item-value="'id'"
                      outlined
                      dense
                      required
                    />
                  </v-col>

                  <v-col cols="12" md="6"  class="divInput1">
                    <small>*No Urut</small>
                    <v-text-field v-model="form.urutan" class="placeholerku" outlined dense required/>
                  </v-col>

                </v-row>

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
                    <small>*Nama Menu</small>
                    <v-text-field v-model="form.title" class="placeholerku" outlined dense required/>
                  </v-col>


                  <v-col cols="12" md="6"  class="divInput1">
                    <small>*Icon (<a href="http://code.meta-platform.com/assets/mdi/preview.html" target="_blank">referensi</a>)</small>
                    <v-text-field v-model="form.icon" class="placeholerku" outlined dense required/>
                  </v-col>

                  <v-col cols="12" md="6"  class="divInput1">
                    <small>*Route</small>
                    <v-text-field v-model="form.route" class="placeholerku" outlined dense required/>
                  </v-col>

                  <v-col cols="12" md="6"  class="divInput1">
                    <small>*Type</small>
                    <v-autocomplete
                      v-model="form.type"
                      :items="$store.state.type"
                      :item-text="'uraian'"
                      :item-value="'id'"
                      outlined
                      dense
                      required
                    />
                  </v-col>

                  <v-col cols="12" md="6"  class="divInput1">
                    <small>*No Urut</small>
                    <v-text-field v-model="form.urutan" class="placeholerku" outlined dense required/>
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
                <br>
                <img src="/img/alert.png" style="width:75px; height:auto" alt=""> <br>
                <span class="mediaTitle">ANDA YAKIN INGIN MENGHAPUS DATA..?</span>
                <br><br>
                <div class="text-center">
                  <v-btn color="red darken-2" @click="mdl_remove = false"  style="color:white" >Batal</v-btn>
                  <v-btn color="blue darken-1" style="color:white" @click="removeData()">Hapus</v-btn>
                </div>

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
  export default {
    data () {
      return {

        form : {
          id : '',
          title : '',
          icon : '',
          route : '',
          type : 0,
          jenis : 1,
          parrent : null,
          urutan : 0,
        },




        page: 1,
        mdl_add : false,
        mdl_edit : false,
        mdl_remove : false,

        cthSelect : '',

        list_data : [],


      }
    },
    methods: {
      getView : function(){
        // this.$store.commit("shoWLoading");
        fetch(this.$store.state.url.URL_DM_MENU + "view", {
            method: "POST",
            headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
                cari_value: ''
            })
        })
            .then(res => res.json())
            .then(res_data => {
              // console.log(res_data)
                this.list_data = res_data;
        });
      },


      addData : function(number) {
        // this.form.createdAt = UMUM.NOW()
        fetch(this.$store.state.url.URL_DM_MENU + "addData", {
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
        fetch(this.$store.state.url.URL_DM_MENU + "editData", {
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

      removeData : function(E){
        fetch(this.$store.state.url.URL_DM_MENU + "removeData", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify(this.form)
        }).then(res_data => {
            this.getView();
            this.mdl_remove = false;
            this.$store.commit('notifAdd', 'Menghapus')
        });

      },

      selectData : function(data){
          this.form.id = data.id;
          this.form.title = data.title;
          this.form.icon = data.icon;
          this.form.route = data.route;
          this.form.type = data.type;
          this.form.jenis = data.jenis;
          this.form.parrent = data.parrent;
          this.form.urutan = data.urutan;
      },

      showHide(data){
        var element = document.getElementById(data);
        element.classList.toggle("showx");
      },

      checkLength(data){
        if (data.length <= 0) {
          return true
        } else {
          return false
        }
      },

      checkType(data){
        if (data == 0) {
          return true
        } else {
          return false
        }
      },

      renameType(data){
        if (data == 0) {
          return 'Single Menu'
        } else {
          return 'Multy Menu'
        }
      }





    },
    mounted () {
      this.getView();

    },
  }
</script>

<style>
</style>
