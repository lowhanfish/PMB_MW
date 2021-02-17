
var dstore  = require("../store");
var store = dstore.state()




const checkNull = (data, variable)=>{
  if (data == null || data == undefined || data == '') {
    return variable
  } else {
    return data
  }
}


module.exports = {
    checkNull : checkNull,


}
