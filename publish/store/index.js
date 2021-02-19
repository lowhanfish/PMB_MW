
// var URL = 'https://dokumentasi.suara2020.com/';

var URL = 'http://localhost:5014/';

var d = new Date();
var thn = d.getFullYear();

// console.log(thn)

export const state = () => ({

    URLX : URL,
    url: {
      URL_APP: URL,
      URL_DASHBOARD : URL + 'api/v1/dashboard/',

      // URL_DM_master_jurusan : URL + 'api/v1/master_jurusan/',
      // URL_DM_masterFakultas : URL + 'api/v1/masterFakultas/',
      // URL_DM_master_program_strata : URL + 'api/v1/master_program_strata/',
      // URL_DM_master_tahun_studi : URL + 'api/v1/master_tahun_studi/',

      URL_publish_as : URL + 'api/v1/publish_as/',
      URL_publish_jp : URL + 'api/v1/publish_jp/',
      URL_publish_bt : URL + 'api/v1/publish_bt/',
      URL_publish_dd : URL + 'api/v1/publish_dd/',
      URL_publish_fl : URL + 'api/v1/publish_fl/',
      URL_publish_ot : URL + 'api/v1/publish_ot/',

      URL_DM_master_prodi : URL + 'api/v1/master_prodi/',
      URL_DM_master_gelombang : URL + 'api/v1/master_gelombang/',
      URL_DM_master_tahun : URL + 'api/v1/master_tahun/',
      URL_DM_master_program : URL + 'api/v1/master_program/',
      URL_DM_master_pendidikan_jurusan : URL + 'api/v1/master_pendidikan_jurusan/',
      URL_DM_master_pendidikan : URL + 'api/v1/master_pendidikan/',
      URL_DM_master_agama : URL + 'api/v1/master_agama/',
      URL_DM_master_jenis_kel : URL + 'api/v1/master_jenis_kel/',
      URL_DM_master_provinsi : URL + 'api/v1/master_provinsi/',
      URL_DM_master_kabupaten : URL + 'api/v1/master_kabupaten/',
      URL_DM_master_kecamatan : URL + 'api/v1/master_kecamatan/',
      URL_DM_master_des_kel : URL + 'api/v1/master_des_kel/',
    },

    reg : {
      add_data : false,
      edit_data : false,
      delete_data : false,
      login_data : false,
      el : 1
    },

    tes : '',

    // pb = variable yg dipakai Bersama
    pb : {
      tahun_id : thn,
      gelombang_id : 1,
      pendidikan_id : '',
      pendidikan_jurusan_id : '',
    }

})


export const mutations = {

  ubahState(state, { name, list }) {
    state[name] = list
  },

  ubahStateReg(state, { name, list }) {
    state.reg[name] = list
  },

  ubahStatePB(state, { name, valx }) {
    state.pb[name] = valx
  },




  notifAdd(state, n) {
    Swal.fire({
      icon: 'success',
      title: 'Sukses '+n+' data',
      showConfirmButton: false,
      timer: 1200
      // footer: '<a href>Why do I have this issue?</a>'
    })
  },
}





