<template>
  <v-app>
    <Header />
    <v-main id="top">
      <v-container fluid  >
        <v-layout no-gutters wrap class="home-layout">
          <v-flex xs8 sm6 md6>
            <search-bar />
          </v-flex>  

        </v-layout>
      </v-container>
      <v-container fluid grid-list-md >
        <v-layout no-gutters wrap class="home-layout"  v-if="!selected" >
          <before-select :contents="contents" />
        </v-layout>
        <v-layout wrap class="home-layout" v-else >
          <v-flex  xs12 sm7 md7 >
                <v-card class="pa-3"  >
                  <v-card-subtitle>{{this.title}} 지역별 입학자수 및 입학정원을 보여줍니다.</v-card-subtitle>
                  <bar-chart 
                  :chartdata="datasets.number" 
                  :options="barChartOptionsMany" 
                  :title="title + ' 입학자수'" 
                  :labels="label" 
                  class='bar-raw-chart' />
                  <bar-chart  
                  :chartdata="datasets.full" 
                  :options="barChartOptionsMany" 
                  :title="title+' 입학정원'" 
                  :labels="label" 
                  class='bar-raw-chart' />
                  
                </v-card>
            </v-flex>
          <v-flex  xs12 sm7 md7 >
            <v-card class="pa-3" >
              <v-card-subtitle>{{title}} 지역 5년간 행정구별 (입학자수 - 입학정원) 추이를 보여줍니다.</v-card-subtitle>
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
                class='bar-chart-graph' :height="heigthFirst*2" />
                <bar-chart
                :chartdata="statisticsChartData.slice(statisticsChartData.length/2)" 
                :options="barChartOptionsMany" 
                :title="title+' (입학자수 - 입학정원)'" 
                :labels="label" 
                class='bar-chart-graph' :height="heigthFirst*2" />
              </div>
            </v-card>
          </v-flex>
          <v-flex  xs12 sm7 md7 >
            <v-card class="pa-3"  >
              <v-card-subtitle>
                {{title}} 지역 5년간의 (입학자수 - 입학정원) 평균변화량과 최근1년간의  (입학자수 - 입학정원) 의 변화량을 분석하여
                증가지역과 감소지역을 집계한 결과를 보여줍니다.
                 </v-card-subtitle>
              <analysis-info 
              :plusList="analysisData ?analysisData[0].labels.avgPlus :'' " 
              :minusList="analysisData ?analysisData[0].labels.avgMinus : ''"
              :lean="analysisData ?analysisData[0].lean[0] : '' " />
              <pie-chart 
              :height="250"
              :chartdata="analysisData?analysisData[0].dataAvg:''" 
              :options="pieChartOptions" 
              :title="title+' 평균변화량 지역수 집계'" 
              :labels="['5년 평균변화율증가 지역수','5년 평균변화율감소 지역수']" 
              class='bar-chart-graph' />
              <v-divider/>
              <analysis-info 
              :plusList="analysisData ?analysisData[0].labels.recentPlus : '' " 
              :minusList="analysisData ?analysisData[0].labels.recentMinus: '' " 
              :lean="analysisData ? analysisData[0].lean[1] : '' " />

              <pie-chart 
              :height="250"
              :chartdata="analysisData ?analysisData[0].dataRecent : '' " 
              :options="pieChartOptions" 
              :title="title+' 최근변화량 지역수 집계'" 
              :labels="['최근1년 변화율증가 지역수','최근1년 변화율감소 지역수']" 
              class='bar-chart-graph' />
            </v-card>
          </v-flex>
            <v-flex  xs12 sm7 md7 >
              <v-card class="pa-3"  >
                <v-card-actions>
                  <v-card-subtitle>5년간의 충원률의 추이를 나타냅니다. 버튼을 눌러 군집별 패턴분석을 볼 수 있습니다.</v-card-subtitle>
                  <v-spacer />
                  <v-btn 
                  @click="ReportSheetControl" 
                  outlined 
                  dark 
                  color="purple darken-3"> <v-icon small>mdi-chart-bubble</v-icon>군집 분석</v-btn>
                </v-card-actions>
                <line-chart 
                :chartdata="datasets.rate" 
                :options="chartOptions" 
                :title="title" 
                :labels="label" 
                class='chart-graph' />
                
              </v-card>
          </v-flex>
          <v-flex xs12 sm7 md7 v-if="selected" style="display:flex;justify-content:center;">
              
              <v-btn href="#top" outlined ><v-icon class="mr-3" small>mdi-triangle</v-icon> 맨위로</v-btn>
          </v-flex> 
          <v-flex xs12 sm7 md7 v-if="selected" style="display:flex;justify-content:center;">
            <analysis-report v-if="showReport"/>
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
    AnalysisReport,
  },

  data: () => ({
    windowWidth: window.innerWidth,
    contents: `각 시도의 행정구역별 대학의 최근 5년간의 입학자수, 입학정원 데이터를 분석하여, 
    입학자수와 입학정원의 차이, 그 차이의 5년간의 평균, 최근 1년간의 평균의 지역별 분포 "파이차트"를 보여줍니다.
    입학자수/입학정원의 매년 비율을 % 로 표현하고, 입학자수, 입학정원을 "막대그래프"로 표현합니다.
    군집화 분석에서는 "클러스터링"으로 총 6개로 분류된 패턴을 가지고 서로 비슷한 패턴이라면 같은 색상 및 노드로 표현하는 "네트워크맵"을 구현하였습니다.`,
    label: [2016,2017,2018,2019,2020],
    showRaw: false,
    heigthFirst: 248,
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
  justify-content: center

}
.bar-raw-chart {
  height: 304px;
}
.analysis-btn{
    animation-duration: 700ms;
    animation-name: blink;
    animation-iteration-count: infinite;
    animation-direction: alternate;
}
.chart-graph{
  height: 500px;
}

@keyframes blink {
   from {
      opacity: 1;
   }
   to {
      opacity: 0.5;
   }
 }

</style>
