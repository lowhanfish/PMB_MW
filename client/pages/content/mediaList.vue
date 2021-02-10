<template>
  <div class="mainPage">
    <v-container>
      <v-card class="mx-auto" outlined>
        <v-row style="background-color:#7aa2e5">
          <v-col cols="12" md="4">
            <span class="h_judul">List Mendia</span>
            <br />
            <span class="h_Sub_judul">Content</span>
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

          <br>

          <v-row>

            <v-col cols="12" md="4" v-for="index in 9" :key="index">
              <v-card class="mediaCard" color="#5289e7" dark>
                <v-row>
                  <v-col cols="12" md="8">
                    <span class="mediaTitle">Ini Judul beritanya</span> <br>
                    <div style="line-height: 90%; text-align: justify;">
                      <span class="mediaSubTitle text-justify">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</span>
                      <br>
                      <v-btn class="ml-2 mt-5" outlined rounded small> Lihat Detil</v-btn>
                    </div>
                  </v-col>

                  <v-col cols="12" md="4">
                     <v-img src="/img/2.png"></v-img>
                  </v-col>
                </v-row>



              </v-card>
            </v-col>




          </v-row>





                <!-- <div class="d-flex flex-no-wrap justify-space-between">
                  <div>
                    <v-card-title class="headline" v-text="'Judul Title'" />
                    <v-card-subtitle>
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </v-card-subtitle>
                    <v-card-actions>
                      <v-btn class="ml-2 mt-5" outlined rounded small> Lihat Detil</v-btn>
                    </v-card-actions>
                  </div>

                  <v-avatar class="ma-3" size="125" tile>
                    <v-img src="/img/2.png"></v-img>
                  </v-avatar>
                </div> -->










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
            <v-card-title class="h_modal_title bg-primaryku">
              <span>TAMBAH DATA</span>
            </v-card-title>
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
        ],
        items: [
          {
            color: '#1F7087',
            src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
            title: 'Supermodel',
            artist: 'Foster the People',
          },
          {
            color: '#952175',
            src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
            title: 'Halcyon Days',
            artist: 'Ellie Goulding',
          },
        ],
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
