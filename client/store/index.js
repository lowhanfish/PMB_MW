
// var URL = 'https://dokumentasi.suara2020.com/';









export const state = () => ({



})


export const mutations = {

  ubahState(state, { name, list }) {
    state[name] = list
  },
  ubahBtnState(state, { name, list }) {
    state.btn[name] = list
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



