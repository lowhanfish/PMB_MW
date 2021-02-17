<template>
  <div>
    <v-card class="mb-12">
      <br />
      <v-row>

        <!-- <v-col cols="12" md="12" class="">
          <v-autocomplete
            v-model="form.program_id"
            class="placeholerku"
            :items="list_prog"
            :item-text="'uraian'"
            :item-value="'program_id'"
            label="Pilih Program"
            clearable
            outlined
            dense
          />
        </v-col> -->

        <v-col cols="12" md="6" class="" v-for="data in list_prodi" :key="data.prodi_id" style="padding-left:2%">
          <!-- <v-checkbox v-model="form.id" :label="'Fak '+data.fakultas_uraian+'-'+data.master_prodi_uraian+ ' - ('+data.program_singkatan+')'" color="success" value="success" hide-details></v-checkbox> -->
          <input type="checkbox" v-model="jpSelect" :value="data">
          <label for="vehicle1" style="padding-left:5px">
            <span class="prodi_prodi">({{data.program_singkatan}}) {{data.master_prodi_uraian}}</span> <br>
            <span class="prodi_fakultas" style="padding-left:22px;">{{data.fakultas_uraian}}</span>
          </label><br>


        </v-col>


      </v-row>
      <br>
      <hr class="batasAbu">
      <br>
      <span>Prodi Pilihan ke - </span> <br>
      <ol>
        <li v-for="data in jpSelect" :key="data.prodi_id">
          <span class="prodi_prodi">({{data.program_singkatan}}) {{data.master_prodi_uraian}}</span> -
          <span class="prodi_fakultas">{{data.fakultas_uraian}}</span>
        </li>
      </ol>
    </v-card>
    <v-btn color="light-green darken-2" @click="addDD()">Save & Continue</v-btn>
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
      form : {
        id : '',
        reg_jp_id : '',
        program_id : '',
        prodi_id : '',
        pendidikan_jurusan_id : '',
        tahun_id : '',
        gelombang_id : '',
        pilihan : '',
        userId : '',
        createdAt : '',
      },

      jpSelect : [],



      // list_prog : [],
      list_prodi : [],
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

      console.log(this.jpSelect)
        fetch(this.$store.state.url.URL_publish_as + 'addData', {
            method: "POST",
            headers: {
                'content-type' : 'application/json',
                authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
              form : this.jpSelect,
              pb : this.$store.state.pb
            })
            }).then(res_data => {
                // this.alertku("success", "sukses menambah data");
                // this.getDD();
                // this.getView();
                // this.next(3)
        });
    },

    next(data) {
      this.$store.commit('ubahStateReg', { name : 'el',  list : data});
    },
    btnAdd(data){
      this.$store.commit('ubahStateReg', { name : 'add_data',  list : data});
    },

    async asycFunc(){
      // this.list_prog = await this.FETCHING.getProg()
      this.list_prodi = await this.FETCHING.postProdiRelasi(this.$store.state.pb.pendidikan_jurusan_id)
    },


    setData(data, parameter){
      this.$store.commit('ubahStatePB', { name : parameter,  valx : data});
    },

  },

  mounted () {
    // this.getView();
    this.asycFunc();
  },
}
</script>

<style>
</style>
