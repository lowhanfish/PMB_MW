
var dstore  = require("../store");
var store = dstore.state()



const getJenisKelamin = async ()=>{
  return new Promise(resolve=>{
    fetch(store.url.URL_DM_master_jenis_kel + "", {
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


const getAgama = async ()=>{
  return new Promise(resolve=>{
    fetch(store.url.URL_DM_master_agama + "", {
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


const getProv = async ()=>{
  return new Promise(resolve=>{
    fetch(store.url.URL_DM_master_provinsi + "", {
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


const getPendidikan = async ()=>{
  return new Promise(resolve=>{
    fetch(store.url.URL_DM_master_pendidikan + "", {
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

const postPendidikanJurusan = async (pendidikan_id, uraian)=>{
  return new Promise(resolve=>{
    fetch(store.url.URL_DM_master_pendidikan_jurusan + "", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify({
          pendidikan_id : pendidikan_id,
          uraian : uraian,
        })
      })
        .then(res => res.json())
        .then(res_data => {
          // console.log(res_data)
          resolve(res_data)
    });
  })
}





const getProg = async ()=>{
  return new Promise(resolve=>{
    fetch(store.url.URL_DM_master_program + "", {
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


const postProdiRelasi = async (pendidikan_jurusan_id)=>{
  console.log("GET GELOMBANG")
  return new Promise(resolve=>{
    fetch(store.url.URL_DM_master_prodi + "getRelasiPeminatan", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify({
          pendidikan_jurusan_id : pendidikan_jurusan_id
        })
      })
        .then(res => res.json())
        .then(res_data => {
          console.log(res_data)
          resolve(res_data)
    });
  })
}


const getTahun = async ()=>{
  return new Promise(resolve=>{
    fetch(store.url.URL_DM_master_tahun + "", {
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


const getGelombang = async ()=>{
  console.log("GET GELOMBANG")
  return new Promise(resolve=>{
    fetch(store.url.URL_DM_master_gelombang + "", {
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








// console.log(dstore)


const barChart = dstore.state().URLX






module.exports = {
    barChart : barChart,
    getJenisKelamin : getJenisKelamin,
    getAgama : getAgama,
    getProv : getProv,
    getProg : getProg,
    getPendidikan : getPendidikan,
    postPendidikanJurusan : postPendidikanJurusan,
    getTahun : getTahun,
    getGelombang : getGelombang,
    postProdiRelasi : postProdiRelasi,

}
