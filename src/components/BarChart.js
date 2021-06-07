import { Bar } from 'vue-chartjs'
export default {
  extends: Bar,
  props: ['chartdata', 'options', 'title', 'labels'],
  mounted () {
    this.renderPieChart(this.chartdata, this.options)
  },
  computed: {
    chartData: function() {
      return this.chartdata;
    }
  },
  methods:{
    renderPieChart: function() {
        this.options.title.text = this.title 
        this.renderChart(
          {
            labels: this.labels,
            datasets: this.chartData
          },
          this.options
        );      
    }
  },
  watch: {
    chartdata: function() {
      this.renderPieChart();
    }
  }
}
