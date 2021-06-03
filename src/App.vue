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
    datasets: [],
    // timeseriesData: [[1,2,3,4],[2,3,1,3]]
    //
  }),
  mounted(){
    this.$store.state.resultData = []
    this.$store.state.timeseriesData = data;
    // console.log(this.$store.state.timeseriesData)
    this.classifyData()
    console.log(this.datasets)
  },
  methods:{
    classifyData(){
      for (var i in this.timeseriesData){
        var data = this.timeseriesData[i]
        const result = {
          insert: false,
          sido: null,
          sigungu: null,
          year: [],
          data: {
            'number': [], // 입학자수
            'full':   [], // 입학정원
            'rate':   [] // 비율 충원률
          }
        }
        for (var key in data){
            if (data['시도'] == '강원'){ // 나중 선택시 바꾸는 식으로 함수 변경 필요
              result.insert = true;
              if (key=='index'){
                var sigungu = data[key].split('|')[1]
                result['sigungu'] = sigungu
              }
              else if (key.split('|').length == 2){
                var [year, name] = key.split('|')
                if (!result['year'].includes(year)){
                  result['year'].push(year)
                }
                
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
            }
          
        }
        if (result.insert) {
            console.log(result)
            this.$store.state.resultData.push(result);
          }
        
        
      }
    }
  },
  watch:{
    numberData: function(){
    console.log(this.$store.state.resultData)
      for (var i in this.$store.state.resultData){
        this.datasets.push({
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          data: this.$store.state.resultData[i].data.rate
        })
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
    timeseriesData() {
        return this.$store.state.timeseriesData;
    },
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
