var URL = 'http://localhost:5014/';



const lolow = {
  counter: 'xxxx',
  URLX : URL,
    url: {
      URL_APP: URL,
      URL_DASHBOARD : URL + 'api/v1/dashboard/',
      URL_DM_MENU : URL + 'api/v1/menuList/',
      URL_DM_KLP_USERS : URL + 'api/v1/kelompokUsers/',
      URL_DM_REGISTRASI : URL + 'api/v1/registrasi/',
    },
    // MENU: [
    //   {
    //     icon: 'mdi-apps',
    //     title: 'Home',
    //     type : 0,
    //     to: '/'
    //   },
    //   {
    //     icon: 'mdi-chart-bubble',
    //     title: 'Inspire',
    //     type : 0,
    //     to: '/inspire'
    //   },
    //   {
    //     icon: 'mdi-chart-bubble',
    //     title: 'Fonts',
    //     type : 0,
    //     to: '/fonts/fontsExample'
    //   },


    //   {
    //     icon: 'mdi-chart-bubble',
    //     title: 'Data Master',
    //     type : 1,
    //     subItem: [
    //       {
    //         title: 'Master Koperasi',
    //         type : 1,
    //         subItem: [
    //           {
    //             title: 'Kelompok Koperasi',
    //             type : 0,
    //             to: '/dataMaster/masterKoperasi/kelompokKoperasi'
    //           },
    //           {
    //             title: 'Sektor Usaha',
    //             type : 0,
    //             to: '/dataMaster/masterKoperasi/sektorUsaha'
    //           },


    //         ]

    //       },
    //       {
    //         title: 'Authorization',
    //         type : 1,
    //         subItem: [
    //           {
    //             title: 'Menu List',
    //             type : 0,
    //             to: '/dataMaster/authorization/menuList'
    //           },

    //           {
    //             title: 'Kelompok Pengguna',
    //             type : 0,
    //             to: '/dataMaster/authorization/klpUsers'
    //           },
    //         ]

    //       },
    //       {
    //         title: 'Authentication',
    //         type : 1,
    //         subItem: [
    //           {
    //             title: 'Registrasi',
    //             type : 0,
    //             to: '/dataMaster/authentication/registrasi'
    //           },
    //         ]

    //       },

    //     ],
    //   },



    //   {
    //     icon: 'mdi-chart-bubble',
    //     title: 'Cth Sub Menu',
    //     type : 1,
    //     subItem: [
    //       {
    //         title: 'Karamba',
    //         type : 0,
    //         to: '/inspire'
    //       },
    //       {
    //         title: 'Lautan',
    //         type : 0,
    //         to: '/'
    //       },
    //       // {
    //       //   title: 'Fonts',
    //       //   type : 1,
    //       //   subItem: [
    //       //     {
    //       //       title: 'Contoh Huruf',
    //       //       type : 0,
    //       //       to: '/fonts/fontsExample'
    //       //     },


    //       //   ]

    //       // },

    //     ],
    //   },

    //   {
    //     icon: 'mdi-chart-bubble',
    //     title: 'Contentn',
    //     type : 1,
    //     subItem: [
    //       {
    //         title: 'Tabel Standar',
    //         type : 0,
    //         to: '/content/tableStandard'
    //       },
    //       {
    //         title: 'List Media',
    //         type : 0,
    //         to: '/content/mediaList'
    //       },
    //     ],
    //   }

    //   // ++++++++++++++++++++++++ BATAS +++++++++++++++++++++++++
    // ],

    type : [
      {id : 0, uraian : 'Single Menu'},
      {id : 1, uraian : 'Multy Menu'}
    ],

    list_menu : null,
    aksesMenu : {},


}



export default lolow



// export default () => (lolow)
