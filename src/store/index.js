import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    timeseriesData: null,
    sido: null,
    resultData: [],
  },
  mutations: {},
  actions: {},
  modules: {}
});