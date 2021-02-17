<template>
  <div>
    <v-card class="mb-12"></v-card>
    <v-btn color="light-green darken-2">Save</v-btn>
    <v-btn text @click="btnAdd(false)">Cancel</v-btn>
  </div>
</template>

<script>
export default {
  // props: ["", ],
  data() {
    return {




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
