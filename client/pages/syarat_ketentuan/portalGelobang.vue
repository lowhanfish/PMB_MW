<template>
  <div class="mainPage">
    <v-container>
      <v-card class="mx-auto" outlined>
        <v-row class="barPage">
          <v-col cols="12" md="4">
            <span class="h_judul">Portal Gelombang</span>
            <br />
            <span class="h_Sub_judul">Syarat & Ketentuan</span>
          </v-col>

          <v-col cols="12" md="4">
            <!-- <v-text-field class="placeholerku" prepend-inner-icon="mdi-magnify" dense solo clear-icon="mdi-close-circle" clearable placeholder="Cari Data" type="text"></v-text-field> -->
          </v-col>

          <v-col cols="12" md="4" style="padding-right:25px">
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
                <th class="text-left" style="width:50%">Gelombang</th>
                <th class="text-left" style="width:20%">Status</th>
                <th class="text-left" style="width:15%">Act</th>
              </tr>
            </thead>
            <tbody>
              <tr class="h_table_body" v-for="(data, index) in list_data" :key="data.id">
                <td class="text-center">{{indexing(index+1)}}.</td>
                <td>{{data.uraian}}</td>
                <td>{{UMUM.statusGel(data.status)}}</td>
                <td class="text-center">
                  <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn color="orange darken-1" fab small v-bind="attrs" v-on="on" @click="selectData(data), mdl_edit=true" :disabled="!$store.state.btn.updatex">
                          <v-icon color="white">mdi-cog</v-icon>
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



      <!-- =========================== EDIT DATA ============================== -->
        <v-dialog v-model="mdl_edit" persistent max-width="600px">

          <v-card>
            <v-app-bar flat class="orange lighten-2">
              <v-toolbar-title class="title white--text pl-0">
                Add Data
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_edit = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>

              <v-container>
                <br>

                <v-select v-model="form.status"
                  :items="$store.state.statusOpen"
                  :item-text="'uraian'"
                  :item-value="'id'"
                  label="Model Select*"
                  outlined
                  dense
                  required
                />

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
          gelombang_id : '',
          uraian : '',
          status : 1,
          keterangan : '',
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


      }
    },
    methods: {
      getView : function(){
        // this.$store.commit("shoWLoading");
        fetch(this.$store.state.url.URL_DM_master_gelombang + "view", {
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



      editData : function(){
        fetch(this.$store.state.url.URL_DM_master_gelombang + "editData", {
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



      selectData : async function(data){
          this.form.gelombang_id = data.gelombang_id;
          this.form.uraian = data.uraian;
          this.form.status = data.status;
          this.form.keterangan = data.keterangan;

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
