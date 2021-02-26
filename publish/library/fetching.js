
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

const postKab = async (provinsi_id)=>{
  return new Promise(resolve=>{
    fetch(store.url.URL_DM_master_kabupaten + "", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify({
          provinsi_id : provinsi_id,
        })
      })
        .then(res => res.json())
        .then(res_data => {
          // console.log(res_data)
          resolve(res_data)
    });
  })
}

const postKec = async (kabupaten_id)=>{
  return new Promise(resolve=>{
    fetch(store.url.URL_DM_master_kecamatan + "", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify({
          kabupaten_id : kabupaten_id,
        })
      })
        .then(res => res.json())
        .then(res_data => {
          // console.log(res_data)
          resolve(res_data)
    });
  })
}

const postDesKel = async (kecamatan_id)=>{
  return new Promise(resolve=>{
    fetch(store.url.URL_DM_master_des_kel + "", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify({
          kecamatan_id : kecamatan_id,
        })
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
          // console.log(res_data)
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



const postRegFl = async (tahun_id, gelombang_id)=>{
  var pb={
    tahun_id : tahun_id,
    gelombang_id : gelombang_id,
  }
  return new Promise(resolve=>{
    fetch(store.url.URL_publish_fl + "view", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: "kikensbatara " + localStorage.token
      },
      body: JSON.stringify({
        pb : pb
      })
    })
      .then(res => res.json())
      .then(res_data => {
        // console.log(res_data)
        resolve(res_data)
  });
  })
}


const postDokPersiapan = async (tahun_id)=>{
  return new Promise(resolve=>{
    fetch(store.url.URL_PUBLISH_publishDokPersiapan + "", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: "kikensbatara " + localStorage.token
      },
      body: JSON.stringify({
        tahun_id : tahun_id
      })
    })
      .then(res => res.json())
      .then(res_data => {
        // console.log(res_data)
        resolve(res_data)
  });
  })
}

const postDokInfografisFak = async (tahun_id)=>{
  return new Promise(resolve=>{
    fetch(store.url.URL_PUBLISH_publishDokInfografisFak + "", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: "kikensbatara " + localStorage.token
      },
      body: JSON.stringify({
        tahun_id : tahun_id
      })
    })
      .then(res => res.json())
      .then(res_data => {
        console.log(res_data)
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
    postKab : postKab,
    postKec : postKec,
    postDesKel : postDesKel,
    getProg : getProg,
    getPendidikan : getPendidikan,
    postPendidikanJurusan : postPendidikanJurusan,
    getTahun : getTahun,
    getGelombang : getGelombang,
    postProdiRelasi : postProdiRelasi,
    postRegFl : postRegFl,
    postDokPersiapan : postDokPersiapan,
    postDokInfografisFak : postDokInfografisFak,

}
