<template>
  <div>
    <v-card class="mb-12">
      <br />
      <br />
      <v-row>
        <v-col cols="12" md="6" class="divInput">
          <v-text-field class="placeholerku" label="Uraian" outlined dense required />
        </v-col>
        <v-col cols="12" md="6" class="divInput">
          <v-text-field class="placeholerku" label="Uraian" outlined dense required />
        </v-col>
        <v-col cols="12" md="6" class="divInput">
          <v-text-field class="placeholerku" label="Uraian" outlined dense required />
        </v-col>
        <v-col cols="12" md="6" class="divInput">
          <v-text-field class="placeholerku" label="Uraian" outlined dense required />
        </v-col>
        <v-col cols="12" md="6" class="divInput">
          <v-text-field class="placeholerku" label="Uraian" outlined dense required />
        </v-col>
        <v-col cols="12" md="6" class="divInput">
          <v-text-field class="placeholerku" label="Uraian" outlined dense required />
        </v-col>
        <v-col cols="12" md="12" class="divInput">
          <br />
          <hr class="batasAbu" />
          <span>Alamat Orang Tua / Wali</span>
          <hr class="batasAbu1" />
          <br />
          <v-text-field class="placeholerku" label="Uraian" outlined dense required />
        </v-col>
        <v-col cols="12" md="6" class="divInput">
          <v-text-field class="placeholerku" label="Uraian" outlined dense required />
        </v-col>
        <v-col cols="12" md="6" class="divInput">
          <v-text-field class="placeholerku" label="Uraian" outlined dense required />
        </v-col>
        <v-col cols="12" md="6" class="divInput">
          <v-text-field class="placeholerku" label="Uraian" outlined dense required />
        </v-col>
        <v-col cols="12" md="6" class="divInput">
          <v-text-field class="placeholerku" label="Uraian" outlined dense required />
        </v-col>
        <v-col cols="12" md="6" class="divInput">
          <v-text-field class="placeholerku" label="Uraian" outlined dense required />
        </v-col>
        <v-col cols="12" md="6" class="divInput">
          <v-text-field class="placeholerku" label="Uraian" outlined dense required />
        </v-col>
      </v-row>
    </v-card>
    <v-btn color="light-green darken-2" @click="next(5)">Save & Continue</v-btn>
    <v-btn text @click="btnAdd(false)">Cancel</v-btn>
  </div>
</template>

<script>
export default {
  // props: ["", ],
  data() {
    return {


      list_prof : [
        {id : 1, uraian : 'aaa'},
        {id : 2, uraian : 'bbbbb'}
      ],
      list_kab : [
        {id : 1, uraian : 'aaa'},
        {id : 2, uraian : 'bbbbb'}
      ],
      list_kec : [
        {id : 1, uraian : 'aaa'},
        {id : 2, uraian : 'bbbbb'}
      ],
      list_des_kel : [
        {id : 1, uraian : 'aaa'},
        {id : 2, uraian : 'bbbbb'}
      ],

    }
  },


  methods: {

    addDD(){
        fetch(URL_D4 + this.queryDD, {
            method: "POST",
            headers: {
                'content-type' : 'application/json',
                authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify(this.dd)
            }).then(res_data => {
                this.alertku("success", "sukses menambah data");
                this.getDD();
        });
    },




    next(data) {
      this.$store.commit('ubahStateReg', { name : 'el',  list : data});
    },
    btnAdd(data){
      this.$store.commit('ubahStateReg', { name : 'add_data',  list : data});
    }
  },
}
</script>

<style>
</style>
