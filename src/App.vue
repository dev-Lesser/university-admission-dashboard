<template>
  <v-app>
    <Header />
    <v-main>
      <v-container class="container" fluid  grid-list-sm>
        <v-layout no-gutters wrap class="home-layout">
          <v-flex xs10 sm6 md6>
            <search-bar />
          </v-flex>  
          <v-flex xs1 sm1 md1 v-if="selected">
            <v-btn class="ma-1" small @click="ReportSheetControl" >분석 군집화</v-btn>
          </v-flex>         
        </v-layout>
      </v-container>
      <v-container fluid grid-list-md >
        <v-layout no-gutters wrap class="home-layout"  v-if="!selected" >
          <before-select :contents="numberContents" />
        </v-layout>
        <v-layout no-gutters wrap class="home-layout" v-else >
          <v-flex  xs12 sm8 md8 >
            <v-card class="pa-3" >
              <bar-chart v-if="title != '서울' & title !='경기' "
              :chartdata="statisticsChartData" 
              :options="barChartOptions" 
              :title="title+' (입학자수 - 입학정원)'" 
              :labels="label" 
              class='bar-chart-graph' :height="heigthFirst*2" />

              <div v-else>
                <bar-chart 
                :chartdata="statisticsChartData.slice(0,statisticsChartData.length/2)" 
                :options="barChartOptionsMany" 
                :title="title+' (입학자수 - 입학정원)'" 
                :labels="label" 
                class='bar-chart-graph' :height="heigthFirst" />
                <bar-chart
                :chartdata="statisticsChartData.slice(statisticsChartData.length/2)" 
                :options="barChartOptionsMany" 
                :title="title+' (입학자수 - 입학정원)'" 
                :labels="label" 
                class='bar-chart-graph' :height="heigthFirst" />
              </div>
            </v-card>
          </v-flex>
          <v-flex  xs12 sm4 md4 >
            <v-card class="pa-3" height="620" >
              <analysis-info 
              :plusList="analysisData[0].labels.avgPlus" 
              :minusList="analysisData[0].labels.avgMinus"
              :lean="analysisData[0].lean[0]" />
              <pie-chart 
              :height="250"
              :chartdata="analysisData[0].dataAvg" 
              :options="pieChartOptions" 
              :title="title+' 행정구 평균변화량 분석 통계'" 
              :labels="['평균변화율증가 지역수','평균변화율감소 지역수']" 
              class='bar-chart-graph' />
              <analysis-info 
              :plusList="analysisData[0].labels.recentPlus" 
              :minusList="analysisData[0].labels.recentMinus" 
              :lean="analysisData[0].lean[1]" />

              <pie-chart 
              :height="250"
              :chartdata="analysisData[0].dataRecent" 
              :options="pieChartOptions" 
              :title="title+' 행정구 최근변화량 분석 통계'" 
              :labels="['최근변화율증가 지역수','최근변화율감소 지역수']" 
              class='bar-chart-graph' />
            </v-card>
          </v-flex>
            <v-flex  xs12 sm4 md4 >
              <v-card class="pa-3"  >
                <line-chart 
                :chartdata="datasets.rate" 
                :options="chartOptions" 
                :title="title" 
                :labels="label" 
                class='chart-graph' />
                
              </v-card>
          </v-flex>
            <v-flex  xs12 sm8 md8 >
                <v-card class="pa-3"  height="424">
                  <bar-chart  
                  :chartdata="datasets.full" 
                  :options="barChartOptionsMany" 
                  :title="title+' 입학정원'" 
                  :labels="label" 
                  class='bar-raw-chart' />
                  <bar-chart 
                  :chartdata="datasets.number" 
                  :options="barChartOptionsMany" 
                  :title="title + ' 입학자수'" 
                  :labels="label" 
                  class='bar-raw-chart' />
                </v-card>
            </v-flex>
            <analysis-report v-if="showReport"/>
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
import PieChart from '@/components/PieChart.js'
import BeforeSelect from '@/components/BeforeSelect'
import AnalysisInfo from '@/components/AnalysisInfo'
import AnalysisReport from '@/components/AnalysisReport'
import data from '@/assets/data_cluster.json'
export default {
  name: 'App',

  components: {
    Header,
    SearchBar,
    Footer,
    LineChart,
    BarChart,
    PieChart,
    BeforeSelect,
    AnalysisInfo,
    AnalysisReport
  },

  data: () => ({
    windowWidth: window.innerWidth,
    numberContents: '각 시도의 행정구역별 대학 입학자수 총합의 5년간 추이를 나타냅니다',
    rateContents:   '각 시도의 행정구역별 대학 입학정원 대비 입학자수(입학자수/입학정원)의 5년간 추이를 나타냅니다',
    fullContents:   '각 시도의 행정구역별 대학 입학정원 총합의 5년간 추이를 나타냅니다',
    label: [2016,2017,2018,2019,2020],
    showRaw: false,
    heigthFirst: 298,
    }),
    
  mounted(){
    this.$store.state.resultData = []
    this.$store.state.timeseriesData = data;
  },
  methods:{
    ReportSheetControl(){
      this.$store.state.showReport = !this.$store.state.showReport
    }
  },
  computed:{
    showReport(){
      return this.$store.state.showReport;
    },
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
    analysisData(){
      return this.$store.state.analysisData;
    },
    clusterData(){
      return this.$store.state.cluster;
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
    },
    barChartOptionsMany() {
      return {
          responsive: true,
          maintainAspectRatio: false,
          title: {
              display: true,
              text: this.title,
          },
          legend: {
              position: 'bottom',
              
          },
          tooltip: {
              enabled: true
          },
          elements: {
            line: {
                tension: 0
            }
          },
          scales: {
            yAxes: [{
                    display: true,
                    ticks: {
                        min: -1000,
                        steps: 5,
                        stepValue: 500,
                    }
                }]
          },
          
      }
    },
    pieChartOptions() {
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
    
  },
  watch:{
    barChartOptionsMany: function(){
      if (this.windowWidth<500){
        this.barChartOptionsMany.legend.display = false;
        this.heigthFirst = 200;
      }
      else this.barChartOptionsMany.legend.display = true;
    },
      // statisticsChartData: function(val){
      // }
      analysisData: function(){
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
  /* display:flex; */
  justify-content: center;

}
.bar-raw-chart {
  height: 184px;
}
</style>
