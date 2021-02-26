<template>
  <div>
      <hr class="batasAbu1">
    <div>

      <!-- <pre>{{formx}}</pre> -->
        <table style="width:100%" class="mytable">
          <tbody class="t_body">
            <tr>
              <td>
                <img src="/img/logo_mw.png" width="65px" alt />
              </td>
              <td class="text-center">
                <div style="margin-left:-16%">
                  <span class="kop1">UNIVERSITAS MANDALA WALUYA</span>
                  <br />
                  <span class="kop2">(UNIV-MW) KENDARI T.A {{tahun()}}</span>
                  <br />
                  <span
                    class="kop3"
                  >Jl. Jend. A.H. Nasution. No. G.37 Kambu Telp. (0401) 3191472 Kota Kendari</span>
                </div>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>

        <hr class="batasAbu1">
        <div class="kop2 text-center">
          <br>
          <span>FORMULIR PENDAFTARAN MAHASISWA BARU</span>
          <br />
        </div>
        <br />
      <div style="overflow-x:auto;" class="mytable">


        <table class="topku kop4 mytable" style="width:100%">
          <tbody class="t_body">
            <tr>
              <td>I</td>
              <td colspan="6">
                <b>IDENTITAS DIRI</b>
              </td>
            </tr>
            <tr>
              <td></td>
              <td class="topku">1.</td>
              <td>Nama Lengkap</td>
              <td class="topku">:</td>
              <td colspan="3">
                <span class="upper topku">{{formx.nama}}</span>
              </td>
            </tr>
            <tr>
              <td></td>
              <td class="topku">2.</td>
              <td class="topku">No KTP/ Nomor Kartu Keluarga</td>
              <td class="topku">:</td>
              <td colspan="3">
                <span class="upper topku">{{formx.no_ktp}}</span>
              </td>
            </tr>
            <tr>
              <td class="topku"></td>
              <td class="topku">3.</td>
              <td class="topku">Tempat & Tanggal Lahir</td>
              <td class="topku">:</td>
              <td colspan="3">
                <span class="topku"><span class="upper">{{formx.tpt_lahir}}</span>, {{UMUM.tglConvert(formx.tgl_lahir)}}</span>
              </td>
            </tr>
            <tr>
              <td class="topku"></td>
              <td class="topku">4.</td>
              <td class="topku">Jenis Kelamin</td>
              <td class="topku">:</td>
              <td colspan="3">
                <span class="upper topku">{{formx.master_jenis_kel_uraian}}</span>
              </td>
            </tr>
            <tr>
              <td class="topku"></td>
              <td class="topku">5.</td>
              <td class="topku">Agama</td>
              <td class="topku">:</td>
              <td colspan="3">
                <span class="upper topku">{{formx.master_agama_uraian}}</span>
              </td>
            </tr>
            <tr>
              <td class="topku"></td>
              <td class="topku">6.</td>
              <td class="topku">Hobby</td>
              <td class="topku">:</td>
              <td colspan="3">
                <span class="upper topku">{{formx.hobby}}</span>
              </td>
            </tr>
            <tr>
              <td></td>
              <td class="topku">7.</td>
              <td class="topku">Program Studi yang di pilih</td>
              <td class="topku">:</td>
              <td colspan="3">
                <div v-for="(data, index) in list_jp" :key="index">
                    <span class="upper">{{data.pilihan}}. ({{data.program}}) {{data.program_studi}} - {{data.fakultas}}</span>
                    <br />
                </div>
              </td>
            </tr>
            <tr>
              <td></td>
              <td class="topku">8.</td>
              <td class="topku">Alamat Tetap</td>
              <td class="topku">:</td>
              <td class="topku" colspan="3">
                <div>
                  <span>{{formx.alamat}}</span>
                  <br />
                </div>
                <div>
                  <span>Kabupaten / Kota : {{formx.master_kabupaten_uraian}}</span>
                  <br />
                </div>
                <div>
                  <span>Provinsi. {{formx.master_provinsi_uraian}}</span>
                  <br />
                </div>
              </td>
            </tr>
            <tr>
              <td></td>
              <td class="topku">9.</td>
              <td class="topku">Nomor Telepon / Handphone</td>
              <td class="topku">:</td>
              <td colspan="3" class="topku">
                <span class="upper topku"> {{formx.hp}}</span>
              </td>
            </tr>

            <tr>
              <td colspan="7">
                <br />
              </td>
            </tr>

            <tr>
              <td class="topku">II</td>
              <td class="topku" colspan="6">
                <b>ASAL <span v-if="formx.pendidikan_id == 1 || formx.pendidikan_id == 7 ">SEKOLAH</span> <span v-else>PT</span></b>
              </td>
            </tr>
            <tr>
              <td></td>
              <td class="topku">1.</td>
              <td class="topku">Nama <span v-if="formx.pendidikan_id == 1 || formx.pendidikan_id == 7 ">Sekolah</span> <span v-else>PT</span></td>
              <td class="topku">:</td>
              <td colspan="3">
                <span class="upper topku">{{formx.nama_sekolah}}</span>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>2.</td>
              <td><span v-if="formx.pendidikan_id == 1 || formx.pendidikan_id == 7 ">NIS</span> <span v-else>NIM</span> / Stambuk</td>
              <td>:</td>
              <td colspan="3">
                <span class="upper">{{formx.nis}}</span>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>3.</td>
              <td>Tahun Lulus</td>
              <td>:</td>
              <td colspan="3">
                <span class="upper">{{formx.thn_lulus}}</span>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>4.</td>
              <td>Nilai <span v-if="formx.pendidikan_id == 1 || formx.pendidikan_id == 7 ">UN</span> <span v-else>IPK</span></td>
              <td>:</td>
              <td colspan="3">
                <span class="upper">{{formx.nilai_un}}</span>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>5.</td>
              <td>Jurusan / Peminatan</td>
              <td>:</td>
              <td colspan="3">
                <span class="upper">{{formx.master_pendidikan_jurusan_uraian}}</span>
              </td>
            </tr>

            <tr>
              <td colspan="7">
                <br />
              </td>
            </tr>

            <tr>
              <td>III</td>
              <td colspan="6">
                <b>IDENTITAS ORANG TUA / WALI</b>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>1.</td>
              <td colspan="5">Nama & Tanggal Lahir Orang Tua / Wali</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>a. Ayah / Wali</td>
              <td>:</td>
              <td colspan="3">
                <span class="upper">{{formx.nm_ayah}}</span>
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>b. Ibu Kandung</td>
              <td>:</td>
              <td colspan="3">
                <span class="upper">{{formx.nm_ibu}}</span>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>2.</td>
              <td colspan="5">Pendidikan Orang Tua / Wali</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>a. Ayah / Wali</td>
              <td>:</td>
              <td colspan="3">
                <span class="upper">{{formx.master_pendidikan_ayah_uraian}}</span>
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>b. Ibu Kandung</td>
              <td>:</td>
              <td colspan="3">
                <span class="upper">{{formx.master_pendidikan_ibu_uraian}}</span>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>3.</td>
              <td colspan="5">Pekerjaan Tetap Orang Tua / Wali</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>a. Ayah / Wali</td>
              <td>:</td>
              <td colspan="3">
                <span class="upper">{{formx.pekerjaan_ayah}}</span>
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>b. Ibu Kandung</td>
              <td>:</td>
              <td colspan="3">
                <span class="upper">{{formx.pekerjaan_ibu}}</span>
              </td>
            </tr>
            <tr>
              <td></td>
              <td class="topku">4.</td>
              <td class="topku">Alamat Orang Tua / Wali</td>
              <td class="topku">:</td>
              <td colspan="3">
                <div>
                  <span class="upper">{{formx.alamat_ot}}</span>
                  <br />
                </div>
                <div>
                  <span class="upper">Kabupaten / Kota : {{formx.master_kabupaten_ot_uraian}}</span>
                  <br />
                </div>
                <div>
                  <span class="upper">Provinsi. {{formx.master_provinsi_ot_uraian}}</span>
                  <br />
                </div>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>5.</td>
              <td>Nomor Telepon / Handphone</td>
              <td>:</td>
              <td colspan="3">
                <span class="upper">{{formx.hp_ot}}</span>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>6.</td>
              <td>Penghasilan Orang Tua / Wali</td>
              <td>:</td>
              <td colspan="3">
                <span class="upper">{{formx.penghasilan}}</span>
              </td>
            </tr>
            <tr>
              <td colspan="7">
                <br />
                <br />
              </td>
            </tr>
            <tr>
              <td></td>
              <td class="topku"></td>
              <td class="topku">
                <img :src="$store.state.URLX+'uploads/'+formx.foto" style="max-height:151px" alt />
                <br />
              </td>
              <td class="topku">:</td>
              <td class="topku text-center" colspan="3">
                Kendari, {{UMUM.tglConvert(formx.tgl_kirim)}}
                <br />Calon Mahasiswa
                <br />
                <br />
                <br />
                <br />
                <br /><span class="upper"><strong>{{formx.nama}}</strong></span>
              </td>
            </tr>

            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>

            <tr>
              <td style="width:5%"></td>
              <td style="width:3%"></td>
              <td style="width:30%"></td>
              <td style="width:2%"></td>
              <td style="width:20%"></td>
              <td style="width:15%"></td>
              <td style="width:15%"></td>
            </tr>
          </tbody>
        </table>
      </div>




    </div>



  </div>
</template>

<script>
export default {
  props: ['UMUM', 'formx', 'tahun_id', 'list_jp'],
  data() {
    return {
      mdl_file_gambar: false,
      mdl_file_pdf: false,
    }
  },
  methods: {
    tahun() {
      var tahun = parseInt(this.tahun_id)
      return  tahun +'/'+(tahun + 1)
    }
  },
  mounted () {
    console.log(this.tahun_id)
  },

}
</script>

<style>
</style>
