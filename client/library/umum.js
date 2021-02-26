
const notifDelete = async ()=>{

  return new Promise(resolve=>{

    Swal.fire({
      title: 'Apakah anda yakin utk menghapus?',
      text: "Pilih button hapus untuk menghapus data ini!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Hapus!'
    }).then((result) => {
      if (result.isConfirmed) {
       resolve('');
      }
    })
  })
}



const replaceStr = (data) =>{
  var res = data.toString().replace(/\/|-| |@/g,'_X_');
    return res
}


const ArrToObj = (data) =>{
  var obj = data.reduce(function(acc, cur, i) {
    acc[replaceStr(cur.route)] = {
      readx : cur.readx,
      updatex : cur.updatex,
      deletex : cur.deletex,
      addx : cur.addx,
    };
    return acc;
  }, {});

  return obj
}

const tglConvert = (tgl) => {

  var date = new Date(tgl);
  var getBulan = date.getMonth() + 1; var bulan = '';
  if (getBulan == '1') {bulan = 'Jan'}
  else if(getBulan == '2') {bulan = 'Februari'}
  else if(getBulan == '3') {bulan = 'Maret'}
  else if(getBulan == '4') {bulan = 'April'}
  else if(getBulan == '5') {bulan = 'Mei'}
  else if(getBulan == '6') {bulan = 'Juni'}
  else if(getBulan == '7') {bulan = 'Juli'}
  else if(getBulan == '8') {bulan = 'Agustus'}
  else if(getBulan == '9') {bulan = 'September'}
  else if(getBulan == '10') {bulan = 'Oktober'}
  else if(getBulan == '11') {bulan = 'November'}
  else if(getBulan == '12') {bulan = 'Desember'}

  // console.log(date)

  return date.getDate() + " " + bulan + " " + date.getFullYear();
}



const statusGel = (data) =>{
  if (data == '0') {
    return 'Tertutup'
  } else {
    return 'Terbuka'
  }
}



module.exports = {

  notifDelete : notifDelete,
  replaceStr : replaceStr,
  ArrToObj : ArrToObj,
  tglConvert : tglConvert,
  statusGel : statusGel,

}
