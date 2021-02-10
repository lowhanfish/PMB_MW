<template>
  <div class="mainPage">
    <v-container>
      <v-card class="mx-auto" outlined>
        <v-row style="background-color:#7aa2e5">
          <v-col cols="12" md="4">
            <span class="h_judul">Tabel Standard</span>
            <br />
            <span class="h_Sub_judul">Tabel Standard</span>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field class="placeholerku" prepend-inner-icon="mdi-magnify" dense solo clear-icon="mdi-close-circle" clearable placeholder="Cari Data" type="text"></v-text-field>
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

        <hr class="batasAbu" />
        <br>

        <v-row>
          <v-col cols="12" md="6">
            <v-autocomplete
              v-model="cthSelect"
              :items="itemSelect"
              :item-text="'nama'"
              :item-value="'idItemSelect'"
              label="Model Autocomplete With Event"
              :value ="eventTestt"
              @keyup="eventTest()"
              outlined
              dense
              clearable
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-autocomplete
              v-model="cthSelect"
              :items="itemSelect"
              :item-text="'nama'"
              :item-value="'idItemSelect'"
              label="Model Autocomplete With Event"
              :value ="eventTestt"
              @keyup="eventTest()"
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
                <th class="text-left" style="width:35%">Name</th>
                <th class="text-left" style="width:35%">Calories</th>
                <th class="text-left" style="width:15%">Act</th>
              </tr>
            </thead>
            <tbody>
              <tr class="h_table_body">
                <td class="text-center">1.</td>
                <td>Oh</td>
                <td>Tuhan</td>
                <td class="text-center">
                  <v-btn-toggle mandatory>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn color="light-green darken-1" fab small v-bind="attrs" v-on="on">
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
                        <v-btn color="red darken-4" fab small v-bind="attrs" v-on="on">
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
                Messages
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_add = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>

              <v-container>



                <hr class="batasAbu" />
                <h3>MODEL 1</h3>
                <hr class="batasAbu" />
                <v-row>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Legal last name*"
                      hint="example of persistent helper text"
                      persistent-hint
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Legal last name*"
                      hint="example of persistent helper text"
                      persistent-hint
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-text-field label="Email*" required></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-text-field label="Contoh Lain"  required></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <v-select :items="['0-17', '18-29', '30-54', '54+']" label="Age*" required></v-select>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <v-autocomplete
                      :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                      label="Interests"
                      multiple
                    />
                  </v-col>

                </v-row>


                <br>
                <hr class="batasAbu" />
                <h3>MODEL 2</h3>
                <hr class="batasAbu" />

                <br>
                <v-text-field class="placeholerku" label="Input Data-7 " placeholder="Contoh Placeholder" outlined dense required/>
                <v-text-field class="placeholerku" label="Input Data-8 " placeholder="Contoh Placeholder" outlined dense required/>

                <div class="divInput">
                  <small>*Uraian</small>
                  <v-text-field class="placeholerku" outlined dense required/>
                </div>


                <v-selectv-model="cthSelect"
                  :items="itemSelect"
                  :item-text="'nama'"
                  :item-value="'idItemSelect'"
                  label="Model Select*"
                  outlined
                  dense
                  required
                />

                <v-autocomplete
                  v-model="cthSelect"
                  :items="itemSelect"
                  :item-text="'nama'"
                  :item-value="'idItemSelect'"
                  label="Model Autocomplete"

                  outlined
                  dense
                />

                <v-autocomplete
                  v-model="cthSelect"
                  :items="itemSelect"
                  :item-text="'nama'"
                  :item-value="'idItemSelect'"
                  label="Model Autocomplete With Event"
                  :value ="eventTestt"
                  @keyup="eventTest()"
                  outlined
                  dense
                />

                Hasil : {{cthSelect}}<br><br>

                <v-text-field class="placeholerku" label="Input Data-8 " placeholder="Contoh Placeholder" outlined dense required/>

              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="mdl_add = false">Close</v-btn>
              <v-btn color="blue darken-1" text >Simpan</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <!-- =========================== ADD DATA ============================== -->

    <!-- ++++++++++++++++++++++++++++++++++++++ MODAL ++++++++++++++++++++++++++++++++++++++++++ -->
  </div>
</template>

<script>
  export default {
    data () {
      return {
        page: 1,
        mdl_add : false,

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
