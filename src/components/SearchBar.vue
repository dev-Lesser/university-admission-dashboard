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
      item-text="name"
      item-value="name"
    >
      <template v-slot:selection="data">
        <v-chip
          v-bind="data.attrs"
          :input-value="data.selected"
          small
          outlined
          color="blue-grey darken-3"
          @click="data.select"
        >
          <v-avatar left>
            <v-img :src="data.item.avatar"></v-img>
          </v-avatar>
          {{ data.item.name }}
        </v-chip>
      </template>
      <template v-slot:item="data">
          <template >
            <v-list-item-avatar>
              <img :src="data.item.avatar">
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-html="data.item.name"></v-list-item-title>
            </v-list-item-content>
          </template>
        </template>
    </v-autocomplete>
</template>
<script>
import seoul from '@/assets/logo/seoul.jpg'
import busan from '@/assets/logo/busan.png'
import daegu from '@/assets/logo/daegu.png'
import incheon from '@/assets/logo/incheon.png'
import gwangju from '@/assets/logo/gwangju.png'
import daejeon from '@/assets/logo/daejeon.png'
import ulsan from '@/assets/logo/ulsan.png'
import sejong from '@/assets/logo/sejong.png'
import gyeonggi from '@/assets/logo/gyeonggi.png'
import gangwon from '@/assets/logo/gangwon.jpg'
import chungbuk from '@/assets/logo/chungbuk.png'
import chungnam from '@/assets/logo/chungnam.png'
import jeonbuk from '@/assets/logo/jeonbuk.jpg'
import jeonnam from '@/assets/logo/jeonnam.png'
import kyeongbuk from '@/assets/logo/kyeongbuk.jpg'
import kyeongnam from '@/assets/logo/kyeongnam.png'
import jeju from '@/assets/logo/jeju.jpg'

export default {
    data() {
        return {
            title: true,
            items: [
              {name: '서울', avatar: seoul},
              {name: '부산', avatar: busan},
              {name: '대구', avatar: daegu},
              {name: '인천', avatar: incheon},
              {name: '광주', avatar: gwangju},
              {name: '대전', avatar: daejeon},
              {name: '울산', avatar: ulsan},
              {name: '세종', avatar: sejong},
              {name: '경기', avatar: gyeonggi},
              {name: '강원', avatar: gangwon},
              {name: '충북', avatar: chungbuk},
              {name: '충남', avatar: chungnam},
              {name: '전북', avatar: jeonbuk},
              {name: '전남', avatar: jeonnam},
              {name: '경북', avatar: kyeongbuk},
              {name: '경남', avatar: kyeongnam},
              {name: '제주', avatar: jeju},
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
      },
      analysisData(){
        return this.$store.state.analysisData
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
              type: 'line',
              borderColor: this.colors[i],
              backgroundColor: 'rgba(0,0,0,0)',
              data: this.$store.state.statisticsData[i].data,
              label: this.$store.state.statisticsData[i].sigungu
          })
          this.$store.state.statisticsChartData.push({
              type: 'bar',
              // borderColor: this.colors[i],
              backgroundColor: this.colors[i],
              data: this.$store.state.statisticsData[i].data,
              label: this.$store.state.statisticsData[i].sigungu
          })
        }
        var minusCountAvg = 0
        var plusCountAvg= 0
        var minusCountRecent =0
        var plusCountRecent =0
        var avgPlusArea=[], avgMinusArea=[];
        var recentPlusArea=[], recentMinusArea  = [];
        var allLeanAvg = 0, allLeanRecent=0, cnt=0;
        for (i in this.$store.state.statisticsData){
            var data = this.$store.state.statisticsData[i].data;
            var sigungu = this.$store.state.statisticsData[i].sigungu;
            var leanAvg = data[4]-data[0] // 5년간 평균 변화율
            var leanRecent = data[4]-data[3] // 1년간 변화율
            allLeanAvg += leanAvg;
            allLeanRecent+=leanRecent;
            if (leanAvg <0) { // 평균 변화율 감소 ? why?
              minusCountAvg+=1
              avgMinusArea.push(sigungu)
            }
            else {
              plusCountAvg+=1
              avgPlusArea.push(sigungu)
            }
            if (leanRecent <0) { // 평균 변화율 감소
              minusCountRecent+=1
              recentMinusArea.push(sigungu)
            }
            else {
              plusCountRecent+=1
              recentPlusArea.push(sigungu)
            }
          cnt+=1
        }
        this.analysisData.push({
          dataAvg: [plusCountAvg, minusCountAvg],
          dataRecent: [plusCountRecent, minusCountRecent],
          lean: [allLeanAvg/cnt, allLeanRecent/cnt],
          labels: {
            avgPlus: avgPlusArea,
            avgMinus: avgMinusArea,
            recentPlus: recentPlusArea,
            recentMinus: recentMinusArea
          }
        })
        
      }
    },
    methods: {
      clearVariables(){
        this.$store.state.analysisData =[]
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