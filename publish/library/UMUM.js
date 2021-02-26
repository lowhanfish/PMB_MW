
var dstore  = require("../store");
var store = dstore.state()

const tglConvert = (tgl) => {
  var date = new Date(tgl);
  var getBulan = date.getMonth() + 1; var bulan = '';
  if (getBulan == '1') {bulan = 'Jan'}
  else if(getBulan == '2') {bulan = 'Feb'}
  else if(getBulan == '3') {bulan = 'Mar'}
  else if(getBulan == '4') {bulan = 'Apr'}
  else if(getBulan == '5') {bulan = 'Mei'}
  else if(getBulan == '6') {bulan = 'Jun'}
  else if(getBulan == '7') {bulan = 'Jul'}
  else if(getBulan == '8') {bulan = 'Agt'}
  else if(getBulan == '9') {bulan = 'Sep'}
  else if(getBulan == '10') {bulan = 'Okt'}
  else if(getBulan == '11') {bulan = 'Nov'}
  else if(getBulan == '12') {bulan = 'Des'}

  return date.getDate() + " " + bulan + " " + date.getFullYear();
}


const checkNull = (data, variable)=>{
  if (data == null || data == undefined || data == '') {
    return variable
  } else {
    return data
  }
}


const color = (data)=>{
  if (data == 1) {
    return 'orange'
  } else if(data == 2) {
    return 'green'
  }else{
    return 'red'
  }
}


module.exports = {
    checkNull : checkNull,
    tglConvert : tglConvert,
    color : color,


}
