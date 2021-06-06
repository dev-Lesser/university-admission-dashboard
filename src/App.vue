<template>
  <v-app>
    <Header />
    

    <v-main>
      <v-container class="container" fluid  grid-list-md>
        <v-layout no-gutters wrap class="home-layout">
          <v-flex xs12 sm6 md6>
        <search-bar />
        </v-flex>
        
        </v-layout>
        

      </v-container>
      <v-container fluid grid-list-md>
        <v-layout no-gutters wrap class="home-layout">
          <v-flex xs10 sm10 md10 >
            <v-card class="pa-3">
            <line-chart  :chartdata="datasets" :options="chartOptions" :labels="[2016,2017,2018,2019,2020]" class='chart-graph' />
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import SearchBar from '@/components/SearchBar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LineChart from '@/components/LineChart.js'
import data from '@/assets/data.json'
export default {
  name: 'App',

  components: {
    Header,
    SearchBar,
    Footer,
    LineChart
  },

  data: () => ({
    datasets: [
        {fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {fillColor: "rgba(151,187,205,0.2)",
          strokeColor: "rgba(151,187,205,1)",
          data: [28, 48, 40, 19, 86, 27, 90]
        },
        {fillColor: "rgba(151,187,205,0.2)",
          strokeColor: "rgba(151,187,205,1)",
          data: [8, 41, 40, 19, 6, 27, 0]
        },
        {fillColor: "rgba(151,187,205,0.2)",
          strokeColor: "rgba(151,187,205,1)",
          data: [0, -3, 40, 1, 86, 7, 90]
        }
    ],
    timeseriesData: [[1,2,3,4],[2,3,1,3]]
    //
  }),
  mounted(){
    this.$store.state.timeseriesData = data;
    // console.log(this.$store.state.timeseriesData)
    // this.classifyData()
  },
  methods:{
    classifyData(){
      for (var i in this.timeseriesData){
        var data = this.timeseriesData[i]
        const result = {
          sido: null,
          sigungu: null,
          year: [],
          data: {
            'number': [],
            'full':   [],
            'rate':   []
          }
        }
        for (var key in data){
            if (key=='index'){
              var sigungu = data[key].split('|')[1]
              result['sigungu'] = sigungu
            }
            else if (key.split('|').length == 2){
              var [year, name] = key.split('|')
              result['year'].push(year)
              if (name == '입학정원'){
                result.data['full'].push(data[key])
              }
              else if (name == '입학자수'){
                result.data['number'].push(data[key])
              }
              else if (name == 'rate'){
                result.data['rate'].push(data[key])
              }
            }
            else{
              var sido = data[key];
              result['sido']=sido
            }
            if (data['시도'] == '경기'){
              this.$store.state.resultData.push(result)
            }
          
          
        }
        
      }
    }
  },
  computed:{
    numberData(){
      return this.$store.state.resultData;
    },
    sido(){
      return this.$store.state.sido
    },
    // timeseriesData() {
    //     return this.$store.state.timeseriesData;
    // },
    chartOptions() {
      return {
          responsive: true,
          maintainAspectRatio: false,
          title: {
              display: true,
              text: 'default',
          },
          legend: {
              position: 'bottom'
          },
          tooltip: {
              enabled: true
          },
      }
    }
  }
};
</script>
<style scoped>
.container{
  display:flex;
  justify-content: center;
}
.home-layout{
  display:flex;
  justify-content: center;

}
</style>
