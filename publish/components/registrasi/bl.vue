<template>
  <div>
    <v-card class="mb-12">

      <!-- <pdf class="your-pdf-class" :src="'https://file-examples-com.github.io/uploads/2017/10/file-example_PDF_1MB.pdf'"></pdf> -->

      <v-simple-table style="width:100%">
          <template v-slot:default>
            <thead style="background:#80a65f">
              <tr class="h_table_head">
                <th class="text-center" style="width:10%">File</th>
                <th class="text-left" style="width:80%">Uraian</th>
                <th class="text-center" style="width:10%">Act</th>
              </tr>
            </thead>
            <tbody>

              <!-- ==================================================================================================================================== -->
              <tr class="h_table_body">
                <td class="text-center">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color="light-green darken-1" small depressed v-bind="attrs" v-on="on" @click="selectFile(form.foto), mdl_add = true, field='foto', accepted='image/*'">
                        <v-icon color="white">mdi-cloud-upload</v-icon>
                      </v-btn>
                    </template>
                    <span>Upload File</span>
                  </v-tooltip>
                </td>
                <td>Pas Foto 3x4 (png, jpg, jpeg)</td>
                <td class="text-center">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color="blue darken-1" small depressed v-bind="attrs" v-on="on" @click="selectFile(form.foto), mdl_file=true" :disabled="checkFile(form.foto)">
                        <v-icon color="white">mdi-file-image</v-icon>
                      </v-btn>
                    </template>
                    <span>Lihat File</span>
                  </v-tooltip>
                </td>
              </tr>
              <!-- ==================================================================================================================================== -->
              <tr class="h_table_body">
                <td class="text-center">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color="light-green darken-1" small depressed v-bind="attrs" v-on="on" @click="selectFile(form.ijazah), mdl_add = true, field='ijazah', accepted='.pdf'">
                        <v-icon color="white">mdi-cloud-upload</v-icon>
                      </v-btn>
                    </template>
                    <span>Upload File</span>
                  </v-tooltip>
                </td>
                <td>Ijazah/SKHU (pdf)</td>
                <td class="text-center">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color="blue darken-1" small depressed v-bind="attrs" v-on="on" @click="viewPdf(form.ijazah),mdl_file_pdf=true" :disabled="checkFile(form.ijazah)">
                        <v-icon color="white">mdi-file-pdf</v-icon>
                      </v-btn>
                    </template>
                    <span>Lihat File</span>
                  </v-tooltip>
                </td>
              </tr>
               <!-- ==================================================================================================================================== -->
              <tr class="h_table_body">
                <td class="text-center">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color="light-green darken-1" small depressed v-bind="attrs" v-on="on" @click="selectFile(form.transkrip), mdl_add = true, field='transkrip', accepted='.pdf'">
                        <v-icon color="white">mdi-cloud-upload</v-icon>
                      </v-btn>
                    </template>
                    <span>Upload File</span>
                  </v-tooltip>
                </td>
                <td>Transkrip (pdf)</td>
                <td class="text-center">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color="blue darken-1" small depressed v-bind="attrs" v-on="on" @click="viewPdf(form.transkrip),mdl_file_pdf=true" :disabled="checkFile(form.transkrip)">
                        <v-icon color="white">mdi-file-pdf</v-icon>
                      </v-btn>
                    </template>
                    <span>Lihat File</span>
                  </v-tooltip>
                </td>
              </tr>
              <!-- ==================================================================================================================================== -->
              <tr class="h_table_body">
                <td class="text-center">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color="light-green darken-1" small depressed v-bind="attrs" v-on="on" @click="selectFile(form.bukti_transfer), mdl_add = true, field='bukti_transfer', accepted='image/*'">
                        <v-icon color="white">mdi-cloud-upload</v-icon>
                      </v-btn>
                    </template>
                    <span>Upload File</span>
                  </v-tooltip>
                </td>
                <td>Foto Bukti Transfer Bank</td>
                <td class="text-center">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color="blue darken-1" small depressed v-bind="attrs" v-on="on" @click="selectFile(form.bukti_transfer), mdl_file=true" :disabled="checkFile(form.bukti_transfer)">
                        <v-icon color="white">mdi-file-pdf</v-icon>
                      </v-btn>
                    </template>
                    <span>Lihat File</span>
                  </v-tooltip>
                </td>
              </tr>
              <!-- ==================================================================================================================================== -->

            </tbody>
          </template>
        </v-simple-table>

    </v-card>
    <v-btn color="light-green darken-2" @click="mdl_sendData=true">Send data</v-btn>
    <v-btn text @click="btnAdd(false)">Cancel</v-btn>






      <!-- =========================== ADD DATA ============================== -->
        <v-dialog v-model="mdl_add" persistent max-width="600px">

          <v-card>
            <v-app-bar flat class="light-green darken-2">
              <v-toolbar-title class="title white--text pl-0">
                Unggah File
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_add = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>

              <v-container>
                <br>
                <v-file-input v-model="file" label="Pilih File" outlined dense :accept="accepted"/>
              </v-container>
            </v-card-text>
            <v-card-actions style="margin-top:-50px">
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="addDD()">Upload</v-btn>
              <v-btn color="red darken-1" text @click="mdl_add = false">Kembali</v-btn>
            </v-card-actions>
              <br>
          </v-card>
        </v-dialog>
      <!-- =========================== ADD DATA ============================== -->


      <!-- =========================== LIHAT FOTO ============================== -->
        <v-dialog v-model="mdl_file" persistent max-width="600px">

          <v-card>
            <v-app-bar flat class="light-green darken-2">
              <v-toolbar-title class="title white--text pl-0">
                File Gambar
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_file = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>

              <v-container>
                <br>
                <img width="100%" :src="$store.state.URLX+'uploads/'+fileOld" alt="">
              </v-container>
            </v-card-text>
              <br>
          </v-card>
        </v-dialog>
      <!-- =========================== LIHAT FOTO ============================== -->

      <!-- =========================== LIHAT PDF ============================== -->
        <v-dialog v-model="mdl_file_pdf" persistent max-width="980px">

          <v-card>
            <v-app-bar flat class="light-green darken-2">
              <v-toolbar-title class="title white--text pl-0">
                File Lampiran
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_file_pdf = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>

              <v-container>
                <br>
                <!-- <no-ssr>
                  <vuePdf src="https://file-examples-com.github.io/uploads/2017/10/file-example_PDF_1MB.pdf"></vuePdf>
                </no-ssr> -->




                <vuePdf
            v-for="i in numPages"
            :key="i"
            :src="pdfSrc"
            :page="i"
            style="display: inline-block; width: 100%"
          ></vuePdf>




                <!-- {{currentPage}} / {{pageCount}} -->

                <!-- <pdf
                  class="your-pdf-class"
                  :src="'https://file-examples-com.github.io/uploads/2017/10/file-example_PDF_1MB.pdf'"
                  :page="3"
                /> -->
                 <!-- <client-only>
                    <pdf class="your-pdf-class" :src="'https://file-examples-com.github.io/uploads/2017/10/file-example_PDF_1MB.pdf'" :page="1" @num-pages="pdfPageCount = $event"></pdf>
                    <div v-if="pdfPageCount > 1">
                        <div v-for="(pageNum, index) in pdfPageCount " :key="index">
                            <pdf class="your-pdf-class" :src="'https://file-examples-com.github.io/uploads/2017/10/file-example_PDF_1MB.pdf'" :page="pageNum" v-if="pageNum > 1"></pdf>
                        </div>
                    </div>
                </client-only> -->
              </v-container>
            </v-card-text>
              <br>
          </v-card>
        </v-dialog>
      <!-- =========================== LIHAT PDF ============================== -->

      <!-- =========================== LIHAT PDF ============================== -->
        <v-dialog v-model="mdl_sendData" persistent max-width="600px">

          <v-card>
            <v-app-bar flat class="red darken-2">
              <v-toolbar-title class="title white--text pl-0">
                KIRIM DATA
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_sendData = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>
                <br>
                <div class="text-center">
                  <span class="h_allertku">
                    APAKAH ANDA YAKIN <br> BAHWA DATA YANG DI-INPUTKAN SUDAH BENAR?
                  </span>
                </div>
                <br>

                <div class="text-center" style="margin-bottom:-20px">
                  <v-btn color="blue darken-1" style="color:white; margin:5px" @click="addFerify()">SIMPAN & KIRIM SEKARANG</v-btn>
                  <v-btn color="red darken-2" @click="btnAdd(false), mdl_sendData = false"  style="color:white; margin:5px" >SIMPAN & KIRIM NANTI</v-btn>
                </div>
            </v-card-text>
              <br>
          </v-card>
        </v-dialog>
      <!-- =========================== LIHAT PDF ============================== -->















  </div>
</template>

<script>

var vuePdf;
if (process.browser) {
  vuePdf = require('vue-pdf').default
}

// var loadingTask = vuePdf.createLoadingTask('https://file-examples-com.github.io/uploads/2017/10/file-example_PDF_1MB.pdf');

export default {
  components: {
    vuePdf,
  },
  // props: ["", ],
  data() {
    return {

      form : {
        reg_fl_id : '',
        foto : '',
        ijazah : '',
        transkrip : '',
        bukti_transfer : '',
        keterangan : '',
        stat_pembayaran : '',
      },
      field : '',
      fileOld : '',
      file : null,
      accepted : '',
      mdl_add : false,
      mdl_file : false,
      mdl_file_pdf : false,
      mdl_sendData :false,

      currentPage: 0,
      pageCount: 0,

      pdfSrc: '',
      pdfPageCount : 0,

      // src: loadingTask,
			numPages: undefined,

    }
  },


  methods: {
    getView : function(){
        // this.$store.commit("shoWLoading");
        fetch(this.$store.state.url.URL_publish_fl + "view", {
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

            // console.log(res_datax)

            if (res_datax.length > 0 ) {
              var res_data = res_datax[0]
              this.form = res_data;
              console.log(this.form.ijazah)
            } else {
              this.form = {
                foto : '',
                ijazah : '',
                transkrip : '',
                bukti_transfer : '',
                keterangan : '',
                stat_pembayaran : '',
              };
            }
      });
    },

    addDD(){

      var formData = new FormData();
      formData.append('pb', JSON.stringify(this.$store.state.pb));
      formData.append('reg_fl_id', this.form.reg_fl_id);
      formData.append('fileOld', this.fileOld);
      formData.append('field', this.field);
      formData.append('file', this.file);

      fetch(this.$store.state.url.URL_publish_fl + 'addData', {
          method: "POST",
          headers: {
              authorization: "kikensbatara " + localStorage.token
          },
          body: formData
          }).then(res_data => {
              // this.alertku("success", "sukses menambah data");
              // this.getDD();
              this.getView();
              this.next(5)
      });
    },

    addFerify(){
      fetch(this.$store.state.url.URL_publish_fl + 'addFerify', {
          method: "POST",
          headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify({
                pb: this.$store.state.pb,
                reg_fl_id : this.form.reg_fl_id
          })
      }).then(res_data => {
          this.btnAdd(false);
          this.mdl_sendData = false
          this.getView();
          this.next(1);
      });
    },




    next(data) {
      this.$store.commit('ubahStateReg', { name : 'el',  list : data});
    },

    btnAdd(data){
      this.$store.commit('ubahStateReg', { name : 'add_data',  list : data});
    },

    checkFile(data){
      if (data == undefined || data == null || data == '') {
        return true
      } else {
        return false
      }
    },

    viewPdf(data){
      // this.pdfSrc = vuePdf.createLoadingTask('https://file-examples-com.github.io/uploads/2017/10/file-example_PDF_1MB.pdf')
      this.pdfSrc = vuePdf.createLoadingTask(this.$store.state.URLX+'uploads/'+data)
      console.log(this.pdfSrc)
      this.pdfSrc.promise.then(pdf => {
        this.numPages = pdf.numPages;
      });
    },
    selectFile(file){
      this.fileOld = file
    }
  },
  mounted () {
    this.getView();

    // this.pdfSrc.promise.then(pdf => {

		// 	this.numPages = pdf.numPages;
		// });
  },
}
</script>

<style>
</style>
