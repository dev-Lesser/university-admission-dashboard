import { Pie } from 'vue-chartjs'
export default {
  extends: Pie,
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
        this.options.title.text = this.title;

        this.renderChart({
            labels: this.labels,
            datasets: [
              {
                backgroundColor: ['#00B5AA','#FF96AD'],
                data: this.chartData
              }
            ],
          },
        this.options
      );      
    }
  },
  watch: {
    chartdata: function() {
        this.chartData
      this.renderPieChart();
    }
  }
}
