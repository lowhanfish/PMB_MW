<template>
  <div>
    <br />
    <hr class="batasAbu" />
    <v-card class="cardContent">
      <v-row>
        <v-col cols="12" md="3">
          <div>
            <v-row class="rowContent elevation-1">
              <v-col cols="3" class="roundLeft vertical-center" style="background:#256AE1">
                <v-icon style="color:white; font-size:45px">mdi-chart-bar</v-icon>
              </v-col>
              <v-col cols="9" class="roundRight" style="background:#5289E7">
                <span class="HomeBarTitle">Jumlah Kontent</span>
                <br />
                <span class="HomeBarSubTitle">54</span>
              </v-col>
            </v-row>
          </div>
        </v-col>

        <v-col cols="12" md="3">
          <div>
            <v-row class="rowContent elevation-1">
              <v-col cols="3" class="roundLeft vertical-center" style="background:#E125C8">
                <v-icon style="color:white; font-size:45px">mdi-account</v-icon>
              </v-col>
              <v-col cols="9" class="roundRight" style="background:#E752D3">
                <span class="HomeBarTitle">Jumlah Kontent</span>
                <br />
                <span class="HomeBarSubTitle">54</span>
              </v-col>
            </v-row>
          </div>
        </v-col>

        <v-col cols="12" md="3">
          <div>
            <v-row class="rowContent elevation-1">
              <v-col cols="3" class="roundLeft vertical-center" style="background:#E19C25">
                <v-icon style="color:white; font-size:45px">mdi-alert-circle</v-icon>
              </v-col>
              <v-col cols="9" class="roundRight" style="background:#E7B052">
                <span class="HomeBarTitle">Jumlah Kontent</span>
                <br />
                <span class="HomeBarSubTitle">54</span>
              </v-col>
            </v-row>
          </div>
        </v-col>

        <v-col cols="12" md="3">
          <div>
            <v-row class="rowContent elevation-1">
              <v-col cols="3" class="roundLeft vertical-center" style="background:#5FC13E">
                <v-icon style="color:white; font-size:45px">mdi-clipboard-alert</v-icon>
              </v-col>
              <v-col cols="9" class="roundRight" style="background:#7FCD65">
                <span class="HomeBarTitle">Jumlah Kontent</span>
                <br />
                <span class="HomeBarSubTitle">54</span>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
      <br />
      <hr class="batasAbu" />
      <br>

      <v-row>
        <v-col cols="12" md="6">
          <div id="chart1"></div>
        </v-col>

        <v-col cols="12" md="6">
          <div id="pieChart1"></div>
        </v-col>
      </v-row>

        <br>
       <hr class="batasAbu" />
       <br>

      <div>
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
      </div>

    </v-card>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  data() {
    return {
      key: ''
    }
  },

  methods: {

    chart1(chartku) {
      const chart = Highcharts.chart(chartku, {
          chart: {
              borderColor: '#efefef',
              borderWidth: 2,
          },
          title: {
              text: 'Ini title Data 1'
          },
          subtitle: {
              text: 'dan ini subtitlenya'
          },
          xAxis: {
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          },
          series: [{
              type: 'column',
              colorByPoint: true,
              data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
              showInLegend: false
          }]
      });


    },

    pieChart1(datax){

      // Build the chart
      Highcharts.chart(datax, {
          chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              borderColor: '#efefef',
              borderWidth: 2,
              type: 'pie'
          },
          title: {
              text: 'Browser market shares in January, 2018'
          },
          tooltip: {
              pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          accessibility: {
              point: {
                  valueSuffix: '%'
              }
          },
          plotOptions: {
              pie: {
                  allowPointSelect: true,
                  cursor: 'pointer',
                  dataLabels: {
                      enabled: false
                  },
                  showInLegend: true
              }
          },
          series: [{
              name: 'Brands',
              colorByPoint: true,
              data: [{
                  name: 'Chrome',
                  y: 61.41,
                  sliced: true,
                  selected: true
              }, {
                  name: 'Internet Explorer',
                  y: 11.84
              }, {
                  name: 'Firefox',
                  y: 10.85
              }, {
                  name: 'Edge',
                  y: 4.67
              }, {
                  name: 'Safari',
                  y: 4.18
              }, {
                  name: 'Other',
                  y: 7.05
              }]
          }]
      });

    }


  },

  mounted () {
    this.chart1('chart1');
    this.pieChart1('pieChart1');
  },
}
</script>
