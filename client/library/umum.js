
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





module.exports = {

  notifDelete : notifDelete,
  replaceStr : replaceStr,
  ArrToObj : ArrToObj

}
