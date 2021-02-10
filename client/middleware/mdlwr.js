const replaceStr = (data) => {
  var res = data.toString().replace(/\/|-| |@/g, '_X_');
  return res
}


const checkPathku = (route) => {
  if (route.path == '/' || route.path == '/login') {
    return false
  }else{
    return true
  }

}




export default function ({ route, redirect, store }) {

  var listAkses = {};
  var routeSaatIni = replaceStr(route.path);

  var readx = 0;
  var updatex = 0;
  var deletex = 0;
  var addx = 0;

  console.log(store.state.aksesMenu)

  if (Object.keys(store.state.aksesMenu).length > 0 ) {

    if (checkPathku(route)) {
      listAkses = store.state.aksesMenu;
      readx = listAkses[routeSaatIni].readx;
      updatex = listAkses[routeSaatIni].updatex;
      deletex = listAkses[routeSaatIni].deletex;
      addx = listAkses[routeSaatIni].addx;
    }else{
    }

  }



  if (route.path == '/login') {
    if (localStorage.token) {
      return redirect("/")
    }
  } else {
    if (localStorage.token) {
      if (readx == 1 || !checkPathku(route)) {
        return true
      } else {
        return redirect("/")
      }
    } else {
      return redirect("/login")
    }
  }

}





