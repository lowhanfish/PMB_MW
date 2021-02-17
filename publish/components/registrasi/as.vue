<template>
  <div>
    <v-form @submit.prevent="addDD()" v-model="validForm">
      <v-card class="mb-12">
        <br />
        <br />
        <v-row>
          <v-col cols="12" md="6" class="divInput">
            <v-autocomplete v-model="form.pendidikan_id"
              class="placeholerku"
              :items="list_pendidikan"
              :item-text="'uraian'"
              :item-value="'pendidikan_id'"
              @input="selectPendidikanJurusan()"
              label="Pendidikan Terahir"
              clearable
              outlined
              dense
              :rules="rules"
              required
            />
          </v-col>
          <v-col cols="12" md="6" class="divInput">
            <v-autocomplete v-model="form.pendidikan_jurusan_id"
              class="placeholerku"
              :items="list_pendidikan_jurusan"
              :item-text="'uraian'"
              :item-value="'pendidikan_jurusan_id'"
              :search-input.sync="searchPendidikan_id"
              @keyup="selectPendidikanJurusan()"
              label="Jurusan"
              clearable
              outlined
              dense
              :rules="rules"
              required
            />
          </v-col>
          <v-col cols="12" md="6" class="divInput">
            <v-text-field v-model="form.nama_sekolah" class="placeholerku" label="Nama Sekolah/Universitas Terahir" placeholder="Nama Sekolah atau Universitas Terahir" outlined dense required />
          </v-col>
          <v-col cols="12" md="6" class="divInput">
            <v-text-field v-model="form.nis" class="placeholerku" label="NIS/NIM" placeholder="NIS atau NIM" outlined dense required />
          </v-col>
          <v-col cols="12" md="6" class="divInput">
            <v-text-field v-model="form.thn_lulus" class="placeholerku" type="number" label="Tahun Lulus" outlined dense required />
          </v-col>
          <v-col cols="12" md="6" class="divInput">
            <v-text-field v-model="form.nilai_un" class="placeholerku" label="Nilai UAN/IPK" placeholder="Nilai UAN atau IPK" outlined dense required />
          </v-col>

        </v-row>
          <!-- {{$store.state.pb.gelombang_id}} <br/>
          {{$store.state.pb.tahun_id}} -->
          <!-- <h1>{{form.gelombang_id()}}</h1> -->
          <!-- <h1>{{searchPendidikan_id}}</h1> -->
      </v-card>
      <v-btn color="light-green darken-2" type="submit" :disabled="!validForm">Save & Continue</v-btn>
      <v-btn text @click="btnAdd(false)">Cancel</v-btn>
    </v-form>
  </div>
</template>

<script>

import FETCHING from "../../library/fetching";
import UMUM from "../../library/UMUM";
export default {
  // props: ["", ],
  data() {
    return {
      form : {
        reg_as_id : '',
        nama_sekolah : '',
        nis : '',
        thn_lulus : '',
        pendidikan_id : '',
        pendidikan_jurusan_id : '',
        pendidikan_jurusan_uraian : '',
        nilai_un : '',
        userId : '',
      },
      searchPendidikan_id :null,
      list_pendidikan : [],
      list_pendidikan_jurusan : [],
      FETCHING : FETCHING,
      UMUM : UMUM,

      validForm: false,
      rules: [v => !!v || 'Data tidak boleh kosong'],
    }
  },


  methods: {

    getView : function(){
        // this.$store.commit("shoWLoading");
        fetch(this.$store.state.url.URL_publish_as + "view", {
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

              if (res_datax.length > 0 ) {
                var res_data = res_datax[0]
                this.form.reg_as_id = res_data.reg_as_id;
                this.form.nama_sekolah = res_data.nama_sekolah;
                this.form.nis = res_data.nis;
                this.form.thn_lulus = res_data.thn_lulus;
                this.form.pendidikan_id = res_data.pendidikan_id;
                this.form.pendidikan_jurusan_id = res_data.pendidikan_jurusan_id;
                this.form.nilai_un = res_data.nilai_un;
                this.form.userId = res_data.userId;

                // this.setData(this.UMUM.checkNull(res_data.tahun_id, this.$store.state.pb.tahun_id), 'tahun_id')
                // this.setData(this.UMUM.checkNull(res_data.gelombang_id, this.$store.state.pb.tahun_id), 'gelombang_id')
                this.setData(res_data.pendidikan_jurusan_id, 'pendidikan_jurusan_id')
                this.searchPendidikan_id = res_data.pendidikan_jurusan_uraian;
                this.selectPendidikanJurusan();
              } else {
                this.form = {
                  reg_as_id : '',
                  nama_sekolah : '',
                  nis : '',
                  thn_lulus : '',
                  pendidikan_id : '',
                  pendidikan_jurusan_id : '',
                  pendidikan_jurusan_uraian : '',
                  nilai_un : '',
                  userId : '',
                };
              }
        });
      },

    addDD(){
        fetch(this.$store.state.url.URL_publish_as + 'addData', {
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
                this.next(2)
        });
    },

    next(data) {
      this.$store.commit('ubahStateReg', { name : 'el',  list : data});
    },
    btnAdd(data){
      this.$store.commit('ubahStateReg', { name : 'add_data',  list : data});
    },

    async asycFunc(){
      this.list_pendidikan = await this.FETCHING.getPendidikan()
    },

    async selectPendidikanJurusan(){
      // console.log(this.searchPendidikan_id)
      this.list_pendidikan_jurusan =  await this.FETCHING.postPendidikanJurusan(this.form.pendidikan_id, this.searchPendidikan_id)
      // console.log(this.list_pendidikan_jurusan)
    },

    setData(data, parameter){
      this.$store.commit('ubahStatePB', { name : parameter,  valx : data});
    },

  },

  mounted () {
    this.getView();
    this.asycFunc();
  },
}
</script>

<style>
</style>
