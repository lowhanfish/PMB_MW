

var dstore = require("../store");
var store = dstore.default
this.$store = dstore;


var DataStore = require("../store/state");
var storex = DataStore.default



const barChart = (idnya, title, categories, data) => {
  const chart = Highcharts.chart(idnya, {
    chart: {
      borderColor: '#efefef',
      borderWidth: 2,
    },
    title: {
      text: title
    },
    subtitle: {
      text: ''
    },
    xAxis: {
      categories: categories
    },
    yAxis: {
      allowDecimals: false,
      min: 0,
      title: {
        text: ''
      }
    },
    series: [{
      type: 'column',
      colorByPoint: true,
      data: data,
      showInLegend: false
    }]
  });
}

const pieChart = (idnya, title, valuex) => {
  Highcharts.chart(idnya, {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      borderColor: '#efefef',
      borderWidth: 2,
      type: 'pie'
    },
    title: {
      text: title
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false
        },
        showInLegend: true
      }
    },
    series: [{
      name: 'Persentase',
      colorByPoint: true,
      data: valuex
    }]
  });
}

const stackChart = (idnya, title, categories, M1, M2, F1, F2) => {


  Highcharts.chart(idnya, {
    chart: {
      type: 'column',
      borderColor: '#efefef',
      borderWidth: 2,
    },
    title: {
      text: title
    },
    xAxis: {
      categories: categories
    },
    yAxis: {
      allowDecimals: false,
      min: 0,
      title: {
        text: ''
      }
    },
    legend: {
      labelFormatter: function () {
        return this.name + ' (' + this.userOptions.stack + ')';
      }
    },
    tooltip: {
      formatter: function () {
        var stackName = this.series.userOptions.stack;

        return '<b>' + stackName + '</b><br/><b>' + this.x + '</b><br/>' +
          this.series.name + ': ' + this.y + '<br/>' +
          'Total: ' + this.point.stackTotal;
      }
    },
    plotOptions: {
      column: {
        stacking: 'normal'
      }
    },
    series: [
      {
        name: 'Laki-Laki',
        data: M1,
        stack: 'Pilihan 1'
      },
      {
        name: 'Perempuan',
        data: F1,
        stack: 'Pilihan 1'
      },
      {
        name: 'Laki-Laki',
        data: M2,
        stack: 'Pilihan 2'
      },
      {
        name: 'Perempuan',
        data: F2,
        stack: 'Pilihan 2'
      }]
  });


}


const postDashboard = async (gelombang_id, tahun_id, route) => {
  return new Promise(resolve => {
    fetch(storex.url.URL_DASHBOARD + route, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: "kikensbatara " + localStorage.token
      },
      body: JSON.stringify({
        gelombang_id: gelombang_id,
        tahun_id: tahun_id,
      })
    })
      .then(res => res.json())
      .then(res_data => {
        // console.log(res_data)
        resolve(res_data)
      });
  })
}

module.exports = {
  pieChart: pieChart,
  barChart: barChart,
  postDashboard: postDashboard,
  stackChart: stackChart,
}
