<template>
  <div class="childes bg_img">
    <!-- <div class="child_center">
        <v-card>
          <h1>sda</h1>
        </v-card>

    </div> -->
    <v-row class="child_center">
      <v-col cols="12" md="4" offset-md="4" style="padding-left : 15px; padding-right : 15px">
        <v-card  class="bg-form-login">
            <!-- <img src="img/card2.png" style="width:100%"> -->
          <div style="padding-top:5%; padding-left:10%; padding-right:10%; padding-bottom:5%">
            <br>
            <hr class="blueku">
            <img src="img/logo.png" style="width:100%" alt="">
            <hr class="blueku1">
            <br>
            <div  v-if="errorMessage" >
              <v-alert border="left" color="red lighten-2" style="color:white">
                  <strong>Warning!</strong> {{ errorMessage }}.
              </v-alert>
              <br>
            </div>


            <div class="text-center"  v-if="loadingku">
              <img src="img/loading-20.gif" alt="">
            </div>

            <v-form  @submit.prevent="btn_login()" v-if="!loadingku">
              <v-text-field
              v-model="user.username"
              label="Username"
              required />

              <v-text-field
              v-model="user.password"
              label="Password"
              type="password"
              required />

              <!-- <hr class="blueku"> -->
              <br>

              <v-btn type="submit" block color="#9bc33c">
                <span style="color:white">Login</span>
              </v-btn>

            </v-form>

            <br>

          </div>


        </v-card>
      </v-col>
    </v-row>

  </div>
</template>

<script>

// const ADD_URL = URL_APP + "api/v1/rincian_obyek/";

import FETCHING from "../library/fetching";
   import UMUM from "../library/umum";

  import Joi from "joi";
  const schema = Joi.object().keys({
    username: Joi.string().regex(/^[a-zA-Z0-9_]*$/).min(3).max(13).required()
  });


  export default {
    data : function(){
      return {

          errorMessage: '',
          user : {
            username : "",
            password : ""
          },

          url : {
            LOGIN_URL : this.$store.state.url.URL_APP + "auth/login",
          },
          loadingku : false,
          FETCHING : FETCHING,
          UMUM : UMUM,
      }
    },
    watch: {
      user: {
          handler() {
              this.errorMessage = "";
          },
          deep: true
      }
    },
    methods: {
      btn_login : function(){


        this.errorMessage = '';
        if(this.validUser()){
          this.loadingku = true;
          const body = {
            username : this.user.username,
            password : this.user.password
          }
          fetch(this.url.LOGIN_URL, {
            method : 'POST',
            headers : {
              'content-type' : 'application/json',
            },
            body : JSON.stringify(body),
          }).then((response) => {

            console.log(response);

                if (response.ok) {
                    return response.json();
                    this.$store.commit("shoWLoading");
                }

                return response.json().then(error => {
                    throw new Error(error.message);
                    this.$store.commit("shoWLoading");
                });
            })
            .then((result) => {
              console.log("=============================");
              console.log(result);
              // menyimpan token yang tergenerate dari server
              localStorage.token = result.token;
              localStorage.profile = JSON.stringify(result.profile);
              setTimeout(() => {

                this.loadingku = false;
                this.$router.push('/');
                // this.loadMenu();
                // location.reload();
              }, 1000);
            })
            .catch(error => {
              setTimeout(() => {
                this.loadingku = false;
                this.errorMessage = error.message;
              }, 1000);
            });;
        }
      },


      validUser: function(){

        const body = {
              username: this.user.username
        };

        const result = schema.validate(body);


        if (result.error === null || result.error ==undefined) {
          return true;
        }
        if (result.error.message.includes("username")) {
          this.errorMessage = "Username tidak valid";
        } else {
          this.errorMessage = "Username tidak valid2";
        }
        return false;
      },



      async loadMenu(){

        var get_profile = JSON.parse(localStorage.profile);
        var profileku = get_profile.profile;

        var dataMenu =await this.FETCHING.postMasterMenuGetSideBar(profileku.menu_klp)

        this.$store.commit('ubahState', { name : 'list_menu',  list : dataMenu});

        var cinta = {
          Data_cinta : 'adalah'
        }


        var data = []
        dataMenu.forEach(h => {
            if (h.type == 0) {
              data.push(h)
            } else {
              h.subItem.forEach(i => {
                  if (i.type == 0) {
                    data.push(i)
                  } else {
                    i.subItem.forEach(j => {
                        data.push(j)
                    });
                  }
              });
            }
        });

        var obj = UMUM.ArrToObj(data)
        // this.$store.commit('ubahState', { name : 'aksesMenu',  list : obj});

      },








    },
    mounted : function(){

    },
  };
</script>
