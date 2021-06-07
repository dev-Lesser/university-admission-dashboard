<template>
  <v-app>
    <Header />

    <v-main>
      <v-container class="container" fluid  grid-list-sm>
        <v-layout no-gutters wrap class="home-layout">
          <v-flex xs6 sm6 md6>
            <search-bar />
          </v-flex>         
        </v-layout>
      </v-container>
      <v-container fluid grid-list-md >
        <v-layout no-gutters wrap class="home-layout"  >
          <v-flex  xs12 sm12 md10 >
              <v-card class="pa-3" height="300">
                <line-chart v-if="selected" 
                :chartdata="datasets.rate" 
                :options="chartOptions" 
                :title="title" 
                :labels="label" 
                class='chart-graph' />
                <before-select v-else :contents="rateContents" />
              </v-card>
          </v-flex>
          <v-flex  xs12 sm12 md10 >
              <v-card class="pa-3" height=300>
                <bar-chart v-if="selected" 
                :chartdata="statisticsChartData" 
                :options="barChartOptions" 
                :title="'(입학자수 - 입학정원)'" 
                :labels="label" 
                class='bar-chart-graph' />
                <before-select v-else :contents="numberContents" />
              </v-card>
            </v-flex>
        </v-layout>
      </v-container>
      <v-divider />
      <!-- 입학정원 , 입학자수 차트 -->
        <v-container fluid grid-list-md id="raw-data" >
          <v-layout no-gutters wrap class="home-layout"  >
            <v-flex  xs12 sm12 md5 >
              <v-card class="pa-3" height="300" v-if="selected" >
                <bar-chart  
                :chartdata="datasets.full" 
                :options="barChartOptions" 
                :title="title+' 입학정원'" 
                :labels="label" 
                class='bar-chart-graph' />
              </v-card>
              <!-- <v-card class="pa-3" height="300" v-else >
                <before-select :contents="fullContents" />
              </v-card> -->
            </v-flex>
            <v-flex  xs12 sm12 md5 >
              <v-card class="pa-3" height="300" v-if="selected"  >
                <bar-chart 
                :chartdata="datasets.number" 
                :options="barChartOptions" 
                :title="title + ' 입학자수'" 
                :labels="label" 
                class='bar-chart-graph' />
              </v-card>
              <!-- <v-card class="pa-3" height="300" v-else >
                <before-select :contents="numberContents" />
              </v-card> -->
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
import BarChart from '@/components/BarChart.js'
import BeforeSelect from '@/components/BeforeSelect'
import data from '@/assets/data.json'
export default {
  name: 'App',

  components: {
    Header,
    SearchBar,
    Footer,
    LineChart,
    BarChart,
    BeforeSelect
  },

  data: () => ({
    colors: ['#E93B81', '#F5ABC9','#FFE5E2','#B6C9F0','#FBC6A4','#F4A9A8','#CE97B0','#AFB9CB',
      '#907FA4', '#A58FAA','#A6D6D6', '#A7BBC7','#8E9775','#4A503D'
    ],
    numberContents: '각 시도의 행정구역별 대학 입학자수 총합의 5년간 추이를 나타냅니다',
    rateContents:   '각 시도의 행정구역별 대학 입학정원 대비 입학자수(입학자수/입학정원)의 5년간 추이를 나타냅니다',
    fullContents:   '각 시도의 행정구역별 대학 입학정원 총합의 5년간 추이를 나타냅니다',
    label: [2016,2017,2018,2019,2020],
    showRaw: false,
    }),
    
  mounted(){
    this.$store.state.resultData = []
    this.$store.state.timeseriesData = data;
  },
  
 
  computed:{
    
    selected(){
      return this.$store.state.selected;
    },
    title(){
      return this.$store.state.title;
    },
    datasets(){
      
      return this.$store.state.datasets;
    },
    statisticsData(){
      return this.$store.state.statisticsData;
    },  
    statisticsChartData(){
      return this.$store.state.statisticsChartData;
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
              position: 'left'
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
    },
    barChartOptions() {
      return {
          responsive: true,
          maintainAspectRatio: false,
          title: {
              display: true,
              text: this.title,
          },
          legend: {
              position: 'left'
          },
          tooltip: {
              enabled: true
          },
          
      }
    },
    
  },
  watch:{
      // statisticsChartData: function(val){
      // }
    }
};
</script>
<style scoped>
.container{
  display:flex;
  justify-content: center;
}
.home-layout{
  /* display:flex; */
  justify-content: center;

}
.chart-graph{
  height: 250px;
}
.bar-chart-graph{
  height: 250px;
}
</style>
