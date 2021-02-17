<template>
  <div>
    <v-card class="mb-12">

      <!-- {{FETCHING.barChart}} -->
      <br />
      <br />
      <v-row>
        <v-col cols="12" md="6" class="divInput">
          <v-text-field v-model="form.nama"  class="placeholerku" label="1.Nama Lengkap" outlined dense required />
        </v-col>
        <v-col cols="12" md="6" class="divInput">
          <v-text-field v-model="form.no_ktp" class="placeholerku" label="2.No KTP/ Nomor Kartu Keluarga" outlined dense required
          />
        </v-col>
        <v-col cols="12" md="6" class="divInput">
          <v-text-field v-model="form.tpt_lahir" class="placeholerku" label="3.Tempat Lahir" outlined dense required />
        </v-col>
        <v-col cols="12" md="6" class="divInput">
          <v-text-field type="date" v-model="form.tgl_lahir" class="placeholerku" label="3.Tanggal Lahir" outlined dense required />
        </v-col>
        <v-col cols="12" md="6" class="divInput">
          <v-autocomplete v-model="form.jenis_kel_id"
            class="placeholerku"
            :items="list_kel"
            :item-text="'uraian'"
            :item-value="'jenis_kel_id'"
            label="4.Jenis Kelamin"
            clearable
            outlined
            dense
          />
        </v-col>
        <v-col cols="12" md="6" class="divInput">
          <v-autocomplete v-model="form.agama_id"
            class="placeholerku"
            :items="list_agama"
            :item-text="'uraian'"
            :item-value="'agama_id'"
            label="5.Agama"
            clearable
            outlined
            dense
          />
        </v-col>
        <v-col cols="12" md="6" class="divInput">
          <v-text-field v-model="form.alamat" class="placeholerku" label="6.Alamat Tetap" outlined dense required />
        </v-col>
        <v-col cols="12" md="6" class="divInput">
          <v-autocomplete v-model="form.provinsi_id"
            class="placeholerku"
            :items="list_prov"
            :item-text="'nama_provinsi'"
            :item-value="'provinsi_id'"
            label="7.Provinsi"
            clearable
            outlined
            dense
          />
        </v-col>
        <v-col cols="12" md="6" class="divInput">
          <v-autocomplete v-model="form.kabupaten_id"
            class="placeholerku"
            :items="list_kab"
            :item-text="'uraian'"
            :item-value="'id'"
            label="8.Kota/Kabupaten"
            clearable
            outlined
            dense
          />
        </v-col>
        <v-col cols="12" md="6" class="divInput">
          <v-autocomplete v-model="form.kecamatan_id"
            class="placeholerku"
            :items="list_kec"
            :item-text="'uraian'"
            :item-value="'id'"
            label="9.Kecamatan"
            clearable
            outlined
            dense
          />
        </v-col>
        <v-col cols="12" md="6" class="divInput">
          <v-autocomplete v-model="form.des_kel_id"
            class="placeholerku"
            :items="list_des_kel"
            :item-text="'uraian'"
            :item-value="'id'"
            label="10.Desa/Kelurahan"
            clearable
            outlined
            dense
          />
        </v-col>
        <v-col cols="12" md="6" class="divInput">
          <v-text-field v-model="form.hp" class="placeholerku" label="11.Nomor Telepon / Handphone" outlined dense required />
        </v-col>
        <v-col cols="12" md="12" class="divInput">
          <v-text-field v-model="form.hobby" class="placeholerku" placeholder="Lebih dari satu pisahkan dengan tanda koma (,)" label="12.Hoby" outlined dense required />
        </v-col>
      </v-row>
    </v-card>
    <v-btn color="light-green darken-2"  @click="next(4)">Save & Continue</v-btn>
    <v-btn text @click="btnAdd(false)">Cancel</v-btn>
  </div>
</template>

<script>

import FETCHING from "../../library/fetching";


export default {
  // props: ["", ],
  data() {
    return {

      list_kelamin : [],
      list_agama : [],
      list_prov : [],
      list_kab : [],
      list_kec : [],
      list_des_kel : [],
      list_kel : [],



      form: {
        reg_d4_dd_id : '',
        nama : '',
        no_ktp : '',
        tpt_lahir : '',
        tgl_lahir : '',
        jenis_kel_id : '',
        agama_id : '',
        hobby : '',
        prodi_id : '',
        alamat : '',
        provinsi_id : '',
        kabupaten_id : '',
        kecamatan_id : '',
        des_kel_id : '',
        nama_provinsi : '',
        nama_kabupaten : '',
        nama_kecamatan : '',
        nama_des_kel : '',
        hp : '',
        tahun_id : 1,
        // program_id : PROGRAM_ID,
        userId : '',
        gelombang_id : 0,
    },




    FETCHING : FETCHING,



    }
  },


  methods: {



    next(data) {
      this.$store.commit('ubahStateReg', { name : 'el',  list : data});
    },
    btnAdd(data){
      this.$store.commit('ubahStateReg', { name : 'add_data',  list : data});
    },
    async asycFunc(){
      this.list_agama = await this.FETCHING.getAgama()
      this.list_kel = await this.FETCHING.getJenisKelamin()
      this.list_prov = await this.FETCHING.getProv()

    }
  },

  mounted () {
    this.asycFunc();
  },
}
</script>

<style>
</style>
