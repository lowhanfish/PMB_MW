<template>
  <div>
    <v-card class="mb-12">
      <br />
      <br />
      <v-row>
        <v-col cols="12" md="6" class="divInput">
          <v-text-field v-model="form.nm_ayah" class="placeholerku" label="Nama Ayah / Wali" outlined dense required />
        </v-col>
        <v-col cols="12" md="6" class="divInput">
          <v-text-field v-model="form.nm_ibu" class="placeholerku" label="Nama Ibu Kandung" outlined dense required />
        </v-col>
        <v-col cols="12" md="6" class="divInput">
          <v-autocomplete v-model="form.pendidikan_ayah"
            class="placeholerku"
            :items="list_pendidikan"
            :item-text="'uraian'"
            :item-value="'pendidikan_id'"
            label="Pendidikan Ayah / Wali"
            clearable
            outlined
            dense
          />
        </v-col>
        <v-col cols="12" md="6" class="divInput">
          <v-autocomplete v-model="form.pendidikan_ibu"
            class="placeholerku"
            :items="list_pendidikan"
            :item-text="'uraian'"
            :item-value="'pendidikan_id'"
            label="Pendidikan Ibu Kandung"
            clearable
            outlined
            dense
          />
        </v-col>

        <v-col cols="12" md="6" class="divInput">
          <v-text-field v-model="form.pekerjaan_ayah" class="placeholerku" label="Pekerjaan Tetap Ayah / Wali" outlined dense required />
        </v-col>
        <v-col cols="12" md="6" class="divInput">
          <v-text-field v-model="form.pekerjaan_ibu" class="placeholerku" label="Pekerjaan Tetap Ibu Kandung" outlined dense required />
        </v-col>
        <v-col cols="12" md="12" class="divInput">
          <br />
          <hr class="batasAbu" />
          <span>Alamat Orang Tua / Wali</span>
          <hr class="batasAbu1" />
          <br />
          <v-text-field v-model="form.alamat_ot" class="placeholerku" label="Alamat Lengkap Orang Tua / Wali" outlined dense required />
        </v-col>
        <v-col cols="12" md="6" class="divInput">
          <v-autocomplete v-model="form.provinsi_id"
            class="placeholerku"
            :items="list_prov"
            :item-text="'nama_provinsi'"
            :item-value="'provinsi_id'"
            @input="asycKab()"
            label="Provinsi"
            clearable
            outlined
            dense
          />
        </v-col>
        <v-col cols="12" md="6" class="divInput">
          <v-autocomplete v-model="form.kabupaten_id"
            class="placeholerku"
            :items="list_kab"
            :item-text="'nama_kabupaten'"
            :item-value="'kabupaten_id'"
            @input="asycKec()"
            label="Kota/Kabupaten"
            clearable
            outlined
            dense
          />
        </v-col>
        <v-col cols="12" md="6" class="divInput">
          <v-autocomplete v-model="form.kecamatan_id"
            class="placeholerku"
            :items="list_kec"
            :item-text="'nama_kecamatan'"
            :item-value="'kecamatan_id'"
            @input="asycDesKel()"
            label="Kecamatan"
            clearable
            outlined
            dense
          />
        </v-col>
        <v-col cols="12" md="6" class="divInput">
          <v-autocomplete v-model="form.des_kel_id"
            class="placeholerku"
            :items="list_des_kel"
            :item-text="'nama_des_kel'"
            :item-value="'des_kel_id'"
            label="Desa/Kelurahan"
            clearable
            outlined
            dense
          />
        </v-col>
        <v-col cols="12" md="6" class="divInput">
          <v-text-field v-model="form.hp_ot" class="placeholerku" label="Nomor Telepon / Handphone" outlined dense required />
        </v-col>
        <v-col cols="12" md="6" class="divInput">
          <v-text-field v-model="form.penghasilan" class="placeholerku" label="Penghasilan Orang Tua / Wali" type="number" placeholder="Angka tanpa tanda titik ' . ' contoh : 1000000" outlined dense required />
        </v-col>
      </v-row>
    </v-card>
    <v-btn color="light-green darken-2" @click="addDD">Save & Continue</v-btn>
    <v-btn text @click="btnAdd(false)">Cancel</v-btn>
  </div>
</template>

<script>

import FETCHING from "../../library/fetching";
import UMUM from "../../library/UMUM";


export default {
  // props: ["", ],
  data() {
    return {

      list_pendidikan : [],
      list_prov : [],
      list_kab : [],
      list_kec : [],
      list_des_kel : [],




      form: {
        reg_ot_id : '',
        nm_ayah : '',
        nm_ibu : '',
        pendidikan_ayah : '',
        pendidikan_ibu : '',
        pekerjaan_ayah : '',
        pekerjaan_ibu : '',
        alamat_ot : '',
        hp_ot : '',
        penghasilan : '',
        provinsi_id : '',
        kabupaten_id : '',
        kecamatan_id : '',
        des_kel_id : '',
        tahun_id : 1,
        gelombang_id : 0,
        userId : '',
    },

    FETCHING : FETCHING,
    UMUM : UMUM,


    }
  },


  methods: {

    getView : function(){
        // this.$store.commit("shoWLoading");
        fetch(this.$store.state.url.URL_publish_ot + "view", {
            method: "POST",
            headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
                pb: this.$store.state.pb
            })
        })
          .then(res => res.json())
          .then(res_datax => {

            console.log(res_datax)

            if (res_datax.length > 0 ) {
              var res_data = res_datax[0]
              this.form = res_data;
              this.asycKab();
              this.asycKec();
              this.asycDesKel();
            } else {
              this.form = {
                reg_ot_id : '',
                nm_ayah : '',
                nm_ibu : '',
                pendidikan_ayah : '',
                pendidikan_ibu : '',
                pekerjaan_ayah : '',
                pekerjaan_ibu : '',
                alamat_ot : '',
                hp_ot : '',
                penghasilan : '',
                provinsi_id : '',
                kabupaten_id : '',
                kecamatan_id : '',
                des_kel_id : '',
                tahun_id : 1,
                gelombang_id : 0,
                userId : '',
              };
            }
      });
    },

    addDD(){

      console.log(this.jpSelect)
        fetch(this.$store.state.url.URL_publish_ot + 'addData', {
            method: "POST",
            headers: {
                'content-type' : 'application/json',
                authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
              form : this.form,
              pb : this.$store.state.pb
            })
            }).then(res_data => {
                // this.alertku("success", "sukses menambah data");
                // this.getDD();
                this.getView();
                this.next(5)
        });
    },

    next(data) {
      this.$store.commit('ubahStateReg', { name : 'el',  list : data});
    },

    btnAdd(data){
      this.$store.commit('ubahStateReg', { name : 'add_data',  list : data});
    },

    async asycFunc(){
      this.list_pendidikan = await this.FETCHING.getPendidikan();
      this.list_prov = await this.FETCHING.getProv()
    },
    async asycKab(){
      this.list_kab = await this.FETCHING.postKab(this.form.provinsi_id)
    },
    async asycKec(){
      this.list_kec = await this.FETCHING.postKec(this.form.kabupaten_id)
    },
    async asycDesKel(){
      this.list_des_kel = await this.FETCHING.postDesKel(this.form.kecamatan_id)
    },

  },

  mounted () {
    this.asycFunc();
    this.getView();
  },
}
</script>

<style>
</style>
