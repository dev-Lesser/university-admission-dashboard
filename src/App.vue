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
    colors: ['#E93B81', '#F5ABC9','#FFE5E2','#B6C9F0','#FBC6A4','#F4A9A8','#CE97B0','#AFB9CB',
      '#907FA4', '#A58FAA','#A6D6D6', '#A7BBC7','#8E9775','#4A503D'
    ]
    }),
  mounted(){
    this.$store.state.resultData = []
    this.$store.state.timeseriesData = data;
  },
  
 
  computed:{
    title(){
      return this.$store.state.title;
    },
    datasets(){
      return this.$store.state.datasets;
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
  },
  watch:{
    datasets: function(){
      
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
