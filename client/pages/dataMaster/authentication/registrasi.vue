<template>
  <div class="mainPage">
    <v-container>
      <v-card class="mx-auto" outlined>
        <v-row class="barPage">
          <v-col cols="12" md="4">
            <span class="h_judul">Registrasi Pengguna</span>
            <br />
            <span class="h_Sub_judul">Authentikasi</span>
          </v-col>

          <v-col cols="12" md="4">
            <!-- <v-text-field class="placeholerku" prepend-inner-icon="mdi-magnify" dense solo clear-icon="mdi-close-circle" clearable placeholder="Cari Data" type="text"></v-text-field> -->
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

        <hr class="batasAbu" style="margin-bottom:1%"/>

            <div >

              <v-simple-table style="width:100%">
                <template v-slot:default>
                  <thead>
                    <tr class="h_table_head" >
                      <th width="5%" class="text-center">No</th>
                      <th width="35%" class="text-left">Nama</th>
                      <th width="20%" class="text-center">Username</th>
                      <th width="25%" class="text-center">Email</th>
                      <th width="15%" class="text-center">#Act</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr  class="h_table_body" v-for="(data, index) in list_data" :key="data.id">
                      <td class="text-center">{{indexing(index+1)}}.</td>
                      <td>{{data.nama}}</td>
                      <td>{{data.username}}</td>
                      <td class="text-left">{{data.email}}</td>
                      <td class="text-center">
                        <v-btn-toggle >

                          <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn color="green" fab small v-bind="attrs" v-on="on" @click="selectData(data), mdl_add_pass=true">
                                <v-icon color="white">mdi-key</v-icon>
                              </v-btn>
                            </template>
                            <span>Ubah Password</span>
                          </v-tooltip>

                          <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn color="orange" fab small v-bind="attrs" v-on="on" @click="selectData(data), mdl_edit=true">
                                <v-icon color="white">mdi-pencil</v-icon>
                              </v-btn>
                            </template>
                            <span>Ubah Data</span>
                          </v-tooltip>

                          <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn color="red darken-4" fab small v-bind="attrs" v-on="on" @click="removeData(data)">
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
                  color="orange darken-1"
                  @input="getView()"
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

            <v-app-bar flat class="bg-primaryku">
              <v-toolbar-title class="title white--text pl-0">
                Tambah User
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_add = false, list_menu=[]">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>



            <v-card-text>

              <v-container>

                  <v-alert outlined type="warning" prominent border="left"  v-if="errorMessage">
                    <strong>Warning!</strong> {{ errorMessage }}.
                  </v-alert>

                <v-row>
                  <v-col cols="12" md="12"  class="">
                    <small>*Nama Lengkap</small>
                    <v-text-field v-model="dataku.nama" class="placeholerku" outlined dense required/>
                  </v-col>

                  <v-col cols="12" md="12"  class="divInput1">
                    <small>*Nomor Kontak</small>
                    <v-text-field v-model="dataku.hp" class="placeholerku" outlined dense required/>
                  </v-col>

                  <v-col cols="12" md="12"  class="divInput1">
                    <small>*Email</small>
                    <v-text-field v-model="dataku.email" class="placeholerku" outlined dense required/>
                  </v-col>

                  <v-col cols="12" md="12"  class="divInput1">
                    <small>*Username</small>
                    <v-text-field v-model="dataku.username" class="placeholerku" outlined dense required/>
                  </v-col>

                  <v-col cols="12" md="12"  class="divInput1">
                    <small>*Password</small>
                    <v-text-field  type="password" v-model="dataku.password" class="placeholerku" outlined dense required/>
                  </v-col>

                  <v-col cols="12" md="12"  class="divInput1">
                    <small>*Confirm Password</small>
                    <v-text-field  type="password" v-model="dataku.confirmPassword" class="placeholerku" outlined dense required/>
                  </v-col>

                  <v-col cols="12" md="12"  class="divInput1">
                    <small>*Klp Pengguna</small>
                    <v-autocomplete
                      v-model="dataku.menu_klp"
                      :items="list_level"
                      :item-text="'uraian'"
                      :item-value="'id'"
                      outlined
                      dense
                      required
                    />
                  </v-col>


                </v-row>

              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="mdl_add = false,  list_menu=[]">Close</v-btn>
              <v-btn color="blue darken-1" text @click="addData()">Simpan</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <!-- =========================== ADD DATA ============================== -->

      <!-- =========================== EDIT DATA ============================== -->
        <v-dialog v-model="mdl_edit" persistent max-width="600px">

          <v-card>

            <v-app-bar flat color="orange lighten-2">
              <v-toolbar-title class="title white--text pl-0">
                Edit User
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_edit = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>


            <v-card-text>
              <v-container>

                <v-row>
                  <v-col cols="12" md="12"  class="">
                    <small>*Nama Lengkap</small>
                    <v-text-field v-model="dataku.nama" class="placeholerku" outlined dense required/>
                  </v-col>

                  <v-col cols="12" md="12"  class="divInput1">
                    <small>*Nomor Kontak</small>
                    <v-text-field v-model="dataku.hp" class="placeholerku" outlined dense required/>
                  </v-col>

                  <v-col cols="12" md="12"  class="divInput1">
                    <small>*Email</small>
                    <v-text-field v-model="dataku.email" class="placeholerku" outlined dense required/>
                  </v-col>

                  <v-col cols="12" md="12"  class="divInput1">
                    <small>*Username</small>
                    <v-text-field v-model="dataku.username" class="placeholerku" outlined dense required/>
                  </v-col>

                  <v-col cols="12" md="12"  class="divInput1">
                    <small>*Klp Pengguna</small>
                    <v-autocomplete
                      v-model="dataku.menu_klp"
                      :items="list_level"
                      :item-text="'uraian'"
                      :item-value="'id'"
                      outlined
                      dense
                      required
                    />
                  </v-col>

                </v-row>

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

      <!-- =========================== EDIT PASS ============================== -->
        <v-dialog v-model="mdl_add_pass" persistent max-width="600px">

          <v-card>

            <v-app-bar flat class="green">
              <v-toolbar-title class="title white--text pl-0">
                Ubah Password
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_add_pass = false, list_menu=[]">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>



            <v-card-text>

              <v-container>
                 <v-alert outlined type="warning" prominent border="left"  v-if="errorMessage">
                    <strong>Warning!</strong> {{ errorMessage }}.
                  </v-alert>
                <v-row>
                  <v-col cols="12" md="12"  class="">
                    <small>*Password Baru</small>
                    <v-text-field type="password" v-model="dataku.password" class="placeholerku" outlined dense required/>
                  </v-col>

                  <v-col cols="12" md="12"  class="divInput1">
                    <small>*Confirm Password Baru</small>
                    <v-text-field type="password" v-model="dataku.confirmPassword" class="placeholerku" outlined dense required/>
                  </v-col>

                </v-row>

              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="mdl_add_pass = false,  list_menu=[]">Close</v-btn>
              <v-btn color="blue darken-1" text @click="editDataPassword()">Simpan</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <!-- =========================== EDIT PASS ============================== -->

      <!-- =========================== HAPUS DATA ============================== -->
        <v-dialog v-model="mdl_hapus" persistent max-width="400px">

          <v-card  class="red lighten-2">
            <v-card-text>
              <v-container class="text-center">
                 <v-form @submit.prevent="removeData">
                  <br>
                  <img src="/img/alert.png" style="width:75px; height:auto" alt=""> <br>
                  <span class="mediaTitle">ANDA YAKIN INGIN MENGHAPUS DATA..?</span>
                  <br><br>
                  <div class="text-center">
                    <v-btn color="red darken-2" @click="mdl_hapus = false"  style="color:white" >Batal</v-btn>
                    <v-btn color="blue darken-1" style="color:white" type="submit">Hapus</v-btn>
                  </div>
                </v-form>

              </v-container>
            </v-card-text>
            <!-- <v-card-actions >
              <v-spacer></v-spacer>

            </v-card-actions> -->
          </v-card>
        </v-dialog>
      <!-- =========================== HAPUS DATA ============================== -->

    <!-- ++++++++++++++++++++++++++++++++++++++ MODAL ++++++++++++++++++++++++++++++++++++++++++ -->
  </div>
</template>














<script>


import Joi from "joi";

const schema = Joi.object().keys({
    username: Joi.string().regex(/^[a-zA-Z0-9_]*$/).min(3).max(13).required(),
    password: Joi.string().min(6).required(),
  });
import UMUM from "../../../library/umum.js";
import FETCHING from "../../../library/fetching";


export default {
  data() {
    return {

        form : {
            id : '',
            uraian : '',
            createdAt : '',
        },

        dataku: {
            id : '',
            username : "",
            nama : '',
            hp: "",
            email: "",
            password : "",
            confirmPassword: "",
            menu_klp : 0
        },
        list_data : [],
        list_level : [],

         errorMessage: '',

        page_limit : 8,
        page_first: 1,
        page_last: 0,
        cari_value: "",
        cek_load_data : true,


        mdl_add: false,
        mdl_edit: false,
        mdl_hapus : false,
        btn_add: false,
        mdl_add_pass : false,

        FETCHING : FETCHING,
        UMUM : UMUM
    }
  },
  methods: {


    getView: function() {

        fetch(this.$store.state.url.URL_DM_REGISTRASI + "view", {
            method: "POST",
            headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
                data_ke: this.page_first,
                page_limit : this.page_limit,
                cari_value: this.cari_value
            })
        })
            .then(res => res.json())
            .then(res_data => {
                this.list_data = res_data.data;
                this.page_last = res_data.jmlData;
                // console.log(res_data);
        });
    },

    addData: function() {
      this.errorMessage = "";
        if (this.validUser()) {
            // Jika user sdh valid lakukan pengiriman data ke server
            const body = {
              username: this.dataku.username,
              password: this.dataku.password
            };
            this.signingUp = true;

            fetch(this.$store.state.url.URL_DM_REGISTRASI+'signup', {
                method: "POST",
                body: JSON.stringify(this.dataku),
                headers: {
                    "content-type": "application/json",
                    authorization: "kikensbatara " + localStorage.token
                }
            }).then((response) => {
                this.signingUp = false;
                if (response.ok) {
                    this.$store.commit('notifAdd', 'Menambah')
                    this.getView();
                    // this.$router.push('/login');
                    // return response.json();
                }
                else{
                  return response.json().then(error => {
                    throw new Error(error.message);
                  });

                }
            })
            .catch((error) => {
              setTimeout(() => {
                this.signingUp = false;
                this.errorMessage = error.message;
              }, 1000);
            });
        }else{
          console.log("tidak valid");

        }

    },

    editData: function() {
        fetch(this.$store.state.url.URL_DM_REGISTRASI + "editData", {
            method: "POST",
            headers: {
                'content-type' : 'application/json',
                authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
                id : this.dataku.id,
                menu_klp : this.dataku.menu_klp,
                nama : this.dataku.nama,
                username : this.dataku.username,
                email: this.dataku.email,
                hp: this.dataku.hp
            })
        }).then(res_data => {
            this.$store.commit('notifAdd', 'Mengubah')
            this.getView();
        });
    },

    editDataPassword: function() {
      if (this.dataku.password !== this.dataku.confirmPassword) {
          this.errorMessage = "Password dan Confirm Password harus sama. !";
          return false;
      }
      else{
        this.errorMessage = '';
        fetch(this.$store.state.url.URL_DM_REGISTRASI + "editDataPass", {
            method: "POST",
            headers: {
                'content-type' : 'application/json',
                authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
                id : this.dataku.id,
                password : this.dataku.password,
            })
        }).then(res_data => {
            this.$store.commit('notifAdd', 'Mengubah')
            this.getView();
        });

      }

    },

    removeData: function(idnya) {
        fetch(this.$store.state.url.URL_DM_REGISTRASI + "removeData", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
                id: idnya,
            })
        }).then(res_data => {
            this.getView();
            this.Notify('Sukses Merubah Data', 'warning', 'check_circle_outline');
        });
    },



    validUser : function(){
      if (this.dataku.password !== this.dataku.confirmPassword) {
          this.errorMessage = "Password dan Confirm Password harus sama. !";
          return false;
      }
      // Memulai proses validasi melalui skema Joi yang sebelumnya dibuat
      // req.body merupakan data yang di kirim oleh client dan schema merupakan skema joi yg di buat sebelumnya
      const body = {
              username: this.dataku.username,
              password: this.dataku.password
      };


      const result = schema.validate(body);

      console.log(result.error)

      if (result.error == null || result.error ==undefined) {
          return true;
      }

      if (result.error.message.includes("username")) {
          // jika pesan error yang dihasilkan mengandung char "username" maka
          this.errorMessage = "Username tidak valid (Min : 6 dan Max : 14 Karakter)";
      } else {
          this.errorMessage = "Password tidak valid (Min : 6 Karakter)";
        //   console.log(result.error);

      }
      return false;
    },

    selectData : function(data){
      this.dataku.id = data.id;
      this.dataku.username = data.username;
      this.dataku.nama = data.nama;
      this.dataku.hp = data.hp;
      this.dataku.email = data.email;
      this.dataku.menu_klp = data.menu_klp;

    },


    // ====================================== PAGINATE ====================================
        Notify : function(message, positive, icon){
          this.$q.notify({
            message: message,
            color: positive,
            icon: icon,
            position : 'top',
            timeout: 500,
          })
        },

        cari_data : function(){
            this.page_first = 1;
            this.getView();
        },

        indexing : function(index){
            var idx = ((this.page_first-1)*this.page_limit)+index
            return idx
        },

        async awaitFetch(){
          this.list_level = await this.FETCHING.getKlpUsers();
        }




    // ====================================== PAGINATE ====================================







  },

  mounted () {
    this.getView();
    this.awaitFetch()
  },
}
</script>




