<template>
  <div class="mainPage">
    <v-container>
      <v-card class="mx-auto" outlined>
        <v-row style="background-color:#7aa2e5">
          <v-col cols="12" md="4">
            <span class="h_judul">Master Kelompok Koperasi</span>
            <br />
            <span class="h_Sub_judul">Data Master</span>
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
                    <v-btn tile height="37.5px" elevation="2" color="primary" v-bind="attrs" v-on="on" @click="mdl_add = true">
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

        <v-simple-table style="width:100%;">
          <template v-slot:default>
            <thead  style="background:#5289E7">
              <tr class="h_table_head">
                <th class="text-center" style="width:5%">No</th>
                <th class="text-center" style="width:10%">Kode</th>
                <th class="text-left" style="width:35%">Uraian</th>
                <th class="text-left" style="width:40%">Keterangan</th>
                <th class="text-center" style="width:10%">Act</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="data in 8" :key="data" class="h_tbody">
                <td class="text-center">1.</td>
                <td class="text-center">1</td>
                <td>Kopdar</td>
                <td>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</td>
                <td class="text-center">
                  <v-btn-toggle >

                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn color="orange" fab small v-bind="attrs" v-on="on" @click="mdl_edit=true">
                          <v-icon color="white">mdi-pencil</v-icon>
                        </v-btn>
                      </template>
                      <span>Ubah Data</span>
                    </v-tooltip>

                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn color="red darken-4" fab small v-bind="attrs" v-on="on" @click="mdl_remove=true">
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
                  v-model="page"
                  class="my-4"
                  :length="20"
                  :total-visible="7"
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
                Tambah Data
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_add = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>



            <v-card-text>

              <v-container>


                <div>
                  <small>*Kode</small>
                  <v-text-field class="placeholerku" outlined dense required/>
                </div>

                <div class="divInput">
                  <small>*Uraian</small>
                  <v-text-field class="placeholerku" outlined dense required/>
                </div>


              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="mdl_add = false">Close</v-btn>
              <v-btn color="blue darken-1" text >Simpan</v-btn>
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

                <div>
                  <small>*Kode</small>
                  <v-text-field class="placeholerku" outlined dense required/>
                </div>

                <div class="divInput">
                  <small>*Uraian</small>
                  <v-text-field class="placeholerku" outlined dense required/>
                </div>

              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="mdl_edit = false">Close</v-btn>
              <v-btn color="blue darken-1" text >Simpan</v-btn>
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
  export default {
    data () {
      return {
        page: 1,
        mdl_add : false,
        mdl_edit : false,
        mdl_remove : false,

        cthSelect : '',
        eventTestt : '',

        itemSelect : [
          {idItemSelect : 1, nama:'Nur Hidayat'},
          {idItemSelect : 2, nama:'Rizwan M Risal'},
        ]
      }
    },
    methods: {
      eventTest(item, queryText, itemText) {
        console.log(this.eventTestt);
          // how can I have here the index value?
      }
    },
  }
</script>

<style>
</style>
