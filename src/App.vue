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
            <line-chart  :chartdata="datasets" :options="chartOptions" :title="title" :labels="[2016,2017,2018,2019,2020]" class='chart-graph' />
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
    title: null,
    colors: ['#E93B81', '#F5ABC9','#FFE5E2','#B6C9F0','#FBC6A4','#F4A9A8','#CE97B0','#AFB9CB',
      '#907FA4', '#A58FAA','#A6D6D6', '#A7BBC7','#8E9775','#4A503D'
    ]
    }),
  mounted(){
    this.$store.state.resultData = []
    this.$store.state.timeseriesData = data;
    this.classifyData()
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
              this.title = '강원'
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
            this.$store.state.resultData.push(result);
          }
        
        
      }
    }
  },
  watch:{
    numberData: function(){
      for (var i in this.$store.state.resultData){
        this.datasets.push({
          borderColor: this.colors[i],
          backgroundColor: "rgba(0,0,0,0)",
          data: this.$store.state.resultData[i].data.rate,
          label: this.$store.state.resultData[i].sigungu
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
              text: this.title,
          },
          legend: {
              position: 'bottom'
          },
          tooltip: {
              enabled: true
          },
          elements: {
            line: {
                tension: 0
            }
        }
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
