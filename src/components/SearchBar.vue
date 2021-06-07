<template>

    <v-autocomplete
            v-model="model"
            :items="items"
            outlined
            :loading="loading"
            dense
            chips
            small-chips
            label="행정구역을 선택하세요"
            chip
            color="black"
            prepend-icon="mdi-magnify"
          ></v-autocomplete>
</template>
<script>
export default {
    data() {
        return {
            title: true,
            items: [
              '서울', '부산', '대구', '인천', '광주',' 대전','울산','세종','경기','강원','충북', '충남',
              '전북', '전남', '경북', '경남', '제주'
            ],
            model: null,
            sido: null,
            colors: ['#E93B81', '#F5ABC9','#FFE5E2','#B6C9F0','#FBC6A4','#F4A9A8','#CE97B0','#AFB9CB',
              '#907FA4', '#A58FAA','#A6D6D6', '#A7BBC7','#8E9775','#4A503D'
            ],
        }
    },
    computed:{
      selected(){
        return this.$store.state.selected;
      },
      loading(){
          return this.$store.state.loading
      },
      numberData(){
        return this.$store.state.resultData;
      },
      fullData(){
        return this.$store.state.resultData;
      },
      rateData(){
        return this.$store.state.resultData;
      },
      timeseriesData() {
          return this.$store.state.timeseriesData;
      },
      datasets(){
        return this.$store.state.datasets;
      },
      statisticsData(){
        return this.$store.state.statisticsData;
      }
    },
    watch: {
      model (val) {
        this.$store.state.selected =true; // 시도 선택시 true
        this.sido = val;
        this.classifyData()
      },
      numberData: function(){
        for (var i in this.$store.state.resultData){
          this.$store.state.datasets['number'].push({
            borderColor: this.colors[i],
            backgroundColor: this.colors[i],
            data: this.$store.state.resultData[i].data.number,
            label: this.$store.state.resultData[i].sigungu
          })
        }
        this.$store.state.loading = false
      },
      fullData: function(){
        for (var i in this.$store.state.resultData){
          this.$store.state.datasets.full.push({
            borderColor: this.colors[i],
            backgroundColor: this.colors[i],
            data: this.$store.state.resultData[i].data.full,
            label: this.$store.state.resultData[i].sigungu
          })
        }
        for (i in this.fullData){
          var statData = []
          for (var idx=0;idx<5;idx++){
            var [full, number] = [this.fullData[i].data.full[idx], this.numberData[i].data.number[idx]]
            var level = number - full // 음수면 미달, 양수면 성황
            statData.push(level)
          }
          this.$store.state.statisticsData.push({
              sido    : this.fullData[i].sido,
              sigungu : this.fullData[i].sigungu,
              data    : statData,
              year    : this.fullData[i].year
            });
        }
        this.$store.state.loading = false
      },
      rateData: function(){
        for (var i in this.$store.state.resultData){
          this.$store.state.datasets.rate.push({
            borderColor: this.colors[i],
            backgroundColor: "rgba(0,0,0,0)",
            data: this.$store.state.resultData[i].data.rate,
            label: this.$store.state.resultData[i].sigungu
          })
        }
        
        this.$store.state.loading = false
      },
      statisticsData: function(){
        for (var i in this.$store.state.statisticsData){
            this.$store.state.statisticsChartData.push({
              borderColor: this.colors[i],
              backgroundColor: this.colors[i],
              data: this.$store.state.statisticsData[i].data,
              label: this.$store.state.statisticsData[i].sigungu
          })
        }
      }
    },
    methods: {
      clearVariables(){
        this.$store.state.statisticsData =[]
        this.$store.state.statisticsChartData = []
        this.$store.state.datasets = {
              'rate': [],
              'full': [],
              'number':[]
            },
        this.$store.state.resultData = []
        this.$store.state.title = ''
      },
      classifyData(){
        this.$store.state.loading = true
        this.clearVariables();
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
            if (data['시도'] == this.sido){ // 나중 선택시 바꾸는 식으로 함수 변경 필요
              this.$store.state.title = this.sido
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
        
    
}
</script>