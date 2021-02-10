

var dstore  = require("../store");
var store = dstore.default
this.$store = dstore;


var DataStore  = require("../store/state");
var storex = DataStore.default


// ini buat ambil menu pada saat tambah data
const getMasterMenu = async ()=>{
  return new Promise(resolve=>{
    fetch(storex.url.URL_DM_KLP_USERS + "listAdd", {
        method: "GET",
        headers: {
        "content-type": "application/json",
        authorization: "kikensbatara " + localStorage.token
        }
      })
        .then(res => res.json())
        .then(res_data => {
          // console.log(res_data)
          resolve(res_data)

    });
  })
}



// ini buat ambil menu pada saat edit data
const postMasterMenu = async (id)=>{
  return new Promise(resolve=>{
    fetch(storex.url.URL_DM_KLP_USERS + "listEdit", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify({
          menu_klp_id: id,
        })
      })
        .then(res => res.json())
        .then(res_data => {
          console.log(res_data)
          resolve(res_data)

    });
  })
}



// Ini buat ambil data di sidebar
const postMasterMenuGetSideBar = async (id)=>{
  return new Promise(resolve=>{
    fetch(storex.url.URL_DM_KLP_USERS + "listSidebar", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify({
          side_bar : true,
          menu_klp_id: id,
        })
      })
        .then(res => res.json())
        .then(res_data => {
          // console.log(res_data)
          resolve(res_data)

    });
  })
}



const getKlpUsers = async ()=>{
  return new Promise(resolve=>{
    fetch(storex.url.URL_DM_KLP_USERS + "list", {
        method: "GET",
        headers: {
        "content-type": "application/json",
        authorization: "kikensbatara " + localStorage.token
        }
      })
        .then(res => res.json())
        .then(res_data => {
          // console.log(res_data)
          resolve(res_data)

    });
  })
}











const barChart = store





module.exports = {
    barChart : barChart,
    getMasterMenu : getMasterMenu,
    postMasterMenu : postMasterMenu,
    getKlpUsers : getKlpUsers,
    postMasterMenuGetSideBar : postMasterMenuGetSideBar,

}
