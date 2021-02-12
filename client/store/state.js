var URL = 'http://localhost:5014/';



const lolow = {
  counter: 'xxxx',
  URLX : URL,
    url: {
      URL_APP: URL,
      URL_DASHBOARD : URL + 'api/v1/dashboard/',
      URL_DM_MENU : URL + 'api/v1/menuList/',
      URL_DM_KLP_USERS : URL + 'api/v1/kelompokUsers/',
      URL_DM_REGISTRASI : URL + 'api/v1/registrasi/',

      URL_DM_master_agama : URL + 'api/v1/master_agama/',
      URL_DM_master_gelombang : URL + 'api/v1/master_gelombang/',
      URL_DM_master_jenis_kel : URL + 'api/v1/master_jenis_kel/',
      URL_DM_master_jurusan : URL + 'api/v1/master_jurusan/',
      URL_DM_master_pendidikan_jurusan : URL + 'api/v1/master_pendidikan_jurusan/',
      URL_DM_master_pendidikan : URL + 'api/v1/master_pendidikan/',
      URL_DM_masterFakultas : URL + 'api/v1/masterFakultas/',
      URL_DM_master_prodi : URL + 'api/v1/master_prodi/',
      URL_DM_master_program : URL + 'api/v1/master_program/',
      URL_DM_master_program_strata : URL + 'api/v1/master_program_strata/',
      URL_DM_master_tahun_studi : URL + 'api/v1/master_tahun_studi/',
      URL_DM_master_tahun : URL + 'api/v1/master_tahun/',

      URL_DM_master_des_kel : URL + 'api/v1/master_des_kel/',
      URL_DM_master_kecamatan : URL + 'api/v1/master_kecamatan/',
      URL_DM_master_kabupaten : URL + 'api/v1/master_kabupaten/',
      URL_DM_master_provinsi : URL + 'api/v1/master_provinsi/',
    },

    btn : {
      addx : true,
      updatex : true,
      deletex : true,

    },

    type : [
      {id : 0, uraian : 'Single Menu'},
      {id : 1, uraian : 'Multy Menu'}
    ],

    datatampil : [10,25, 50, 100, 250, 500],

    list_menu : null,
    aksesMenu : {},


}



export default lolow



// export default () => (lolow)
