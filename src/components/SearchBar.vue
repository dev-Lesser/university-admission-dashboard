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
              {name: '서울', avatar: seoul},{name: '부산', avatar: busan},
              {name: '대구', avatar: daegu},{name: '인천', avatar: incheon},
              {name: '광주', avatar: gwangju},{name: '대전', avatar: daejeon},
              {name: '울산', avatar: ulsan},{name: '세종', avatar: sejong},
              {name: '경기', avatar: gyeonggi},{name: '강원', avatar: gangwon},
              {name: '충북', avatar: chungbuk},{name: '충남', avatar: chungnam},
              {name: '전북', avatar: jeonbuk},{name: '전남', avatar: jeonnam},
              {name: '경북', avatar: kyeongbuk},{name: '경남', avatar: kyeongnam},
              {name: '제주', avatar: jeju},
            ],
            model: null,
            sido: null,
            colors: [
              '#db5e56','#dbb756','#a7db56','#56db5e','#56dbb7','#56a7db',
              '#5e56db','#b756db','#db56a7','#66c2a5','#fc8d62','#8da0cb',
              '#e78ac3','#a6d854','#ffd92f','#e5c494','#b3b3b3','#66c2a5',
              '#19122b','#17344b','#175b48','#3c7532','#7e7a35','#bb7966',
              '#d485af','#caa9e6','#c1d2f3','#d5f0ee'
            ],
            fillcolors:[
              'rgba(219, 94, 86, 0.6)','rgba(219, 183, 86, 0.6)','rgba(167, 219, 86, 0.6)',
              'rgba(86, 219, 94, 0.6)','rgba(86, 219, 183, 0.6)','rgba(86, 167, 219, 0.6)',
              'rgba(94, 86, 219, 0.6)','rgba(183, 86, 219, 0.6)','rgba(219, 86, 167, 0.6)',
              'rgba(102, 194, 165, 0.6)','rgba(252, 141, 98, 0.6)','rgba(141, 160, 203, 0.6)',
              'rgba(231, 138, 195, 0.6)','rgba(166, 216, 84, 0.6)','rgba(255, 217, 47, 0.6)',
              'rgba(229, 196, 148, 0.6)','rgba(179, 179, 179, 0.6)','rgba(102, 194, 165, 0.6)',
              'rgba(25, 18, 43, 0.6)','rgba(23, 52, 75, 0.6)','rgba(23, 91, 72, 0.6)',
              'rgba(60, 117, 50, 0.6)','rgba(126, 122, 53, 0.6)','rgba(187, 121, 102, 0.6)',
              'rgba(212, 133, 175, 0.6)','rgba(202, 169, 230, 0.6)','rgba(193, 210, 243, 0.6)','rgba(213, 240, 238, 0.6)'
            ],
            clusterContents:[
              '증가 성향', '감소 성향', 's파 패턴','역s파 패턴','최근 급증','최근 감소 또는 중간 피크 성향'
            ]
            
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
            backgroundColor: this.fillcolors[i],
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
            backgroundColor: this.fillcolors[i],
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

          // ** TODO **
          // 검색한 순간 한번만 해야함 // 지금 numberData, fullData, rateData가 값을 공유하고 있음 > 추후 수정 필요
          // console.log(this.fullData[i].cluster)
          this.$store.state.cluster.push({ // cluster 확인용 리스트
            cluster: this.fullData[i].cluster,
            contents: this.clusterContents[this.fullData[i].cluster],
            sigungu: this.fullData[i].sigungu
          })
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
              borderColor: this.colors[i],
              backgroundColor: this.fillcolors[i],
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
        this.$store.state.showReport = false
        this.$store.state.cluster = []
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
            },
            cluster: null // cluster 종류 설정 0~5 (0: 증가, 1:감소, 2 s파 3.역s파 4.최근 급증 5: 최근급감 또는 중간 피트)
          }
        for (var key in data){
            if (data['시도'] == this.sido){ 
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
              else if (key == 'cluster_id'){
                result.cluster= data[key]
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