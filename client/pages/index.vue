<template>
  <div>
    <br />

    <!-- <pre>data : {{minat_Wilayah}}</pre> -->
    <hr class="batasAbu" />
    <v-card class="cardContent">
      <v-row>
        <v-col cols="12" md="3">
          <div>
            <v-row class="rowContent elevation-1">
              <v-col cols="3" class="roundLeft vertical-center" style="background:#9BC33C">
                <v-icon style="color:white; font-size:45px">mdi-chart-bar</v-icon>
              </v-col>
              <v-col cols="9" class="roundRight" style="background:#AFCF63">
                <span class="HomeBarTitle">Jumlah Pendaftar</span>
                <br />
                <span class="HomeBarSubTitle">{{registrator.pendaftar}}</span>
              </v-col>
            </v-row>
          </div>
        </v-col>

        <v-col cols="12" md="3">
          <div>
            <v-row class="rowContent elevation-1">
              <v-col cols="3" class="roundLeft vertical-center" style="background:#3CC3A7">
                <v-icon style="color:white; font-size:45px">mdi-account</v-icon>
              </v-col>
              <v-col cols="9" class="roundRight" style="background:#63CFB9">
                <span class="HomeBarTitle">Jumlah Proses</span>
                <br />
                <span class="HomeBarSubTitle">{{registrator.proses}}</span>
              </v-col>
            </v-row>
          </div>
        </v-col>

        <v-col cols="12" md="3">
          <div>
            <v-row class="rowContent elevation-1">
              <v-col cols="3" class="roundLeft vertical-center" style="background:#643CC3">
                <v-icon style="color:white; font-size:45px">mdi-alert-circle</v-icon>
              </v-col>
              <v-col cols="9" class="roundRight" style="background:#8363CF">
                <span class="HomeBarTitle">Jumlah Diterima</span>
                <br />
                <span class="HomeBarSubTitle">{{registrator.diterima}}</span>
              </v-col>
            </v-row>
          </div>
        </v-col>

        <v-col cols="12" md="3">
          <div>
            <v-row class="rowContent elevation-1">
              <v-col cols="3" class="roundLeft vertical-center" style="background:#C33C58">
                <v-icon style="color:white; font-size:45px">mdi-clipboard-alert</v-icon>
              </v-col>
              <v-col cols="9" class="roundRight" style="background:#CF6379">
                <span class="HomeBarTitle">Jumlah Dikembalikan</span>
                <br />
                <span class="HomeBarSubTitle">{{registrator.dikembalikan}}</span>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
      <br />

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
            @input="viewAll()"
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
            @input="viewAll()"
            outlined
            dense
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <div id="j_jenis_kelamin"></div>
        </v-col>
        <v-col cols="12" md="6">
          <div id="j_jenis_kelamin_jurusan"></div>
        </v-col>

        <v-col cols="12" md="6">
          <div id="j_pendapatan_ot"></div>
        </v-col>

        <v-col cols="12" md="6">
          <div id="j_minat_jurusan"></div>
        </v-col>

        <v-col cols="12" md="12">
          <hr class="batasAbu" /> <br>
          <div id="j_minat_daerah"></div>
        </v-col>

      </v-row>

        <br>
       <hr class="batasAbu" />
       <br>

      <!-- <div>
        <v-simple-table style="width:100%">
          <template v-slot:default>
            <thead  style="background:#5289E7">
              <tr class="h_table_head">
                <th class="text-left" style="width:5%">No</th>
                <th class="text-left" style="width:35%">Name</th>
                <th class="text-left" style="width:35%">Calories</th>
                <th class="text-left" style="width:15%">Act</th>
              </tr>
            </thead>
            <tbody>
              <tr>
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
      </div> -->

    </v-card>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'


import FETCHING from "../library/fetching";
import UMUM from "../library/umum.js";
import CHARTKU from "../library/chartku";

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  data() {
    return {
      FETCHING : FETCHING,
      UMUM : UMUM,
      CHARTKU : CHARTKU,
      key: '',

      filter : {
        tahun_id : '',
        gelombang_id : '',
      },
      list_tahun : [],
      list_gelombang : [],

      registrator : {
        pendaftar : '',
        proses : '',
        diterima : '',
        dikembalikan : '',
      },

      JK : [],
      pendapatanOT : [],
      JK_Jurusan : [],
      minat_Jurusan : [],
      minat_Wilayah : [],
    }
  },

  methods: {

    async getRegistrator(){
      this.registrator = await this.CHARTKU.postDashboard(this.filter.gelombang_id, this.filter.tahun_id, 'registrator');
      // console.log(this.registrator)
    },


    async j_jenis_kelamin(){

      this.JK = await this.CHARTKU.postDashboard(this.filter.gelombang_id, this.filter.tahun_id, 'JK');

      var idnya = 'j_jenis_kelamin';
      var title = 'JUMLAH BERDASARKAN JENIS KELAMIN'
      this.CHARTKU.pieChart(idnya, title, this.JK)
    },

    async j_jenis_kelamin_jurusan() {
       this.JK_Jurusan = await this.CHARTKU.postDashboard(this.filter.gelombang_id, this.filter.tahun_id, 'j_jenis_kelamin');
      var idnya = 'j_jenis_kelamin_jurusan';
      var title = 'JUMLAH BERDASARKAN JENIS KELAMIN / JURUSAN'
      CHARTKU.stackChart(idnya, title, this.JK_Jurusan.categories, this.JK_Jurusan.M1, this.JK_Jurusan.M2, this.JK_Jurusan.F1, this.JK_Jurusan.F2)


    },


    async j_pendapatan_ot(){
      this.pendapatanOT = await this.CHARTKU.postDashboard(this.filter.gelombang_id, this.filter.tahun_id, 'pendapatanOrangTua');
      var idnya = 'j_pendapatan_ot';
      var title = 'JUMLAH BERDASARKAN PENDAPATAN ORANG-TUA'
      CHARTKU.barChart(idnya, title, this.pendapatanOT.categories, this.pendapatanOT.data)
    },

    async j_minat_jurusan(){

      this.minat_Jurusan = await this.CHARTKU.postDashboard(this.filter.gelombang_id, this.filter.tahun_id, 'j_minat_jurusan');

      // console.log(this.minat_Jurusan )

      var idnya = 'j_minat_jurusan';
      var title = 'PRESENTASE BERDASARKAN MINAT JURUSAN (%)'
      CHARTKU.pieChart(idnya, title, this.minat_Jurusan)

    },

    async j_minat_daerah(){
      this.minat_Wilayah = await this.CHARTKU.postDashboard(this.filter.gelombang_id, this.filter.tahun_id, 'j_minat_daerah');
      var idnya = 'j_minat_daerah';
      var title = 'JUMLAH PENDAFTAR BERDASARKAN WILAYAH'
      CHARTKU.barChart(idnya, title, this.minat_Wilayah.categories, this.minat_Wilayah.data)
    },

    funcAwait : async function(){
      this.list_tahun = await this.FETCHING.getTahun();
      this.list_gelombang = await this.FETCHING.getGelombang();
    },


    viewAll(){
      this.getRegistrator();
      this.j_jenis_kelamin_jurusan();
      this.j_jenis_kelamin();
      this.j_pendapatan_ot();
      this.j_minat_jurusan();
      this.j_minat_daerah();
    }


  },

  mounted () {
    this.funcAwait();
    this.viewAll()
  },
}
</script>
