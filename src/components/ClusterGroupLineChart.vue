<template>
    <div style="margin-top:50px;">
        <v-divider />
        <v-card-subtitle>6가지 패턴으로 분류된 행정구들은 필터링하여 그래프로 표시합니다.</v-card-subtitle>
        <div v-for="data,key in groupedData" :key="key">
            <v-layout wrap style="display:flex;align-items:center;" v-if="data.length!=0">
                <v-flex xs12 sm3 md3>
                    <v-card-subtitle>
                    <v-btn  
                    dark
                    class="mt-3"
                    :color="color[key]" 
                    small > 
                        {{clusterContents[key]}} 
                    </v-btn> 
                    </v-card-subtitle>
                    <v-card-subtitle >
                        <v-chip class="ma-1" outlined v-for="region,num in clusterData[key]" small :key="num">{{region}}</v-chip>
                    </v-card-subtitle>
                </v-flex>
                <v-divider />
                <v-flex xs12 sm9 md9>
                    <line-chart
                        :chartdata="data" 
                        :options="chartOptions" 
                        :title="title" 
                        :labels="[2016,2017,2018,2019,2020]" 
                        class='chart-graph' />
                </v-flex>
            </v-layout>
                <v-divider  v-if="data.length!=0"/>
        </div>
    </div>
</template>
<script>
import LineChart from '@/components/LineChart.js'
export default {
    components:{
        LineChart
    },
    data(){
        return{
            groups:[],
            result:[],
            color: ['#db5e56', '#d3db56', '#56db5e', '#56d3db', '#5e56db', '#db56d3'],
            noneContents:[
                '증가패턴의 지역은 없습니다.','감소패턴의 지역은 없습니다.','s파패턴의 지역은 없습니다.',
                '역s파의 지역은 없습니다.','최근급증패턴의 지역은 없습니다.','최근감소/중간피크 패턴의 지역은 없습니다.'
            ],
            clusterContents:[
                '증가패턴', '감소패턴', 's파 패턴','역s파 패턴','최근급증 패턴','최근감소/중간피크 패턴'
            ],
        }
    },
    mounted(){
    },
    computed:{
        title(){
            return this.$store.state.title;
        },
        nodes(){
            return this.$store.state.netNodes;
        },
        links(){
            return this.$store.state.netLinks;
        },
        clusterData(){
            return this.$store.state.clusterData;
        },
        groupedData(){
            
            return this.$store.state.groupedData;
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
                    position: 'left'
                },
                tooltip: {
                    enabled: true
                },
                elements: {
                    line: {
                        tension: 0.2
                    }
                }
            }
        },
    },
    watch:{
        nodes: function(){
            var colorList = ['#db5e56', '#d3db56', '#56db5e', '#56d3db', '#5e56db', '#db56d3'];
            var color = this.nodes[0]._color
            var result =[[],[],[],[],[],[]];

            var data=[]
            for (var i=0;i<this.nodes.length;i++){
                if (color != this.nodes[i]._color){
                    result[colorList.indexOf(color)]=data
                    data=[]
                    color = this.nodes[i]._color
                }
                if (i+1==this.nodes.length){
                    result[colorList.indexOf(color)]=data
                }
                data.push(this.nodes[i].name)
            }
            this.$store.state.clusterData = result;
        },
        
        clusterData: function(){
            this.$store.state.groupedData = []
            for (var i in this.clusterData){
                var result = []
                for (var j in this.clusterData[i]){
                    for (var k in this.$store.state.datasets.rate){
                        if (this.$store.state.datasets.rate[k].label == this.clusterData[i][j]){
                            
                            result.push(this.$store.state.datasets.rate[k])
                        }
                    }                    
                }
                this.$store.state.groupedData.push(result)

                
            }
            this.groupedData = this.$store.state.groupedData
        },
        // groupedData: function(){
        //     // return this.$store.state.groupedData;
        // },
    },
    methods:{
        
    }
}
</script>
<style scoped>
.chart-graph {
    height:200px;
}
</style>