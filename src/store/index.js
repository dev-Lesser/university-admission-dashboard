import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    timeseriesData: null,
    sido: null,
    resultData: [],
    selected: false,
    datasets:{
      'rate': [],
      'full': [],
      'number':[]
    },
    title: '',
    statisticsData: [],
    statisticsChartData: [],
    analysisData: [],
    cluster: [],
    showReport: false,
    sortedData: {
      'cluster0':[],
      'cluster1':[],
      'cluster2':[],
      'cluster3':[],
      'cluster4':[],
      'cluster5':[]
    },
    netNodes: null,
    netLinks: null,
    force: 1000,
    clusterData: [],
    groupedData: []
    // analysisData[0].labels.avgPlus
  },
  mutations: {},
  actions: {},
  modules: {}
});