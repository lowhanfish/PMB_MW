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

  var readx = 1;
  var updatex = 1;
  var deletex = 1;
  var addx = 1;

  console.log(store.state.aksesMenu)

  if (Object.keys(store.state.aksesMenu).length > 0 ) {

    if (checkPathku(route)) {
      listAkses = store.state.aksesMenu;
      readx = listAkses[routeSaatIni].readx;

      updatex = listAkses[routeSaatIni].updatex;
      store.commit('ubahBtnState', { name : 'updatex',  list : updatex});

      deletex = listAkses[routeSaatIni].deletex;
      store.commit('ubahBtnState', { name : 'deletex',  list : deletex});

      addx = listAkses[routeSaatIni].addx;
      store.commit('ubahBtnState', { name : 'addx',  list : addx});
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





