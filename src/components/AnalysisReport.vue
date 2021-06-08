<template>
    <v-bottom-sheet v-model="sheet" hide-overlay persistent style="overflow:scroll;">
        <v-sheet
            class="text-center"
            height="400px"
        >
            <v-btn
            class="mt-6"
            text
            color="red"
            @click="ReportSheetControl"
            >
            close
            </v-btn>
            <v-layout wrap>
            
                <v-flex xs12 sm12 md12>
                    <network-chart :netNodes="netNodes" :netLinks="netLinks"/>
                </v-flex>
                
            </v-layout>
            
        </v-sheet>
    </v-bottom-sheet>
</template>
<script>
import NetworkChart from '@/components/NetworkChart'
export default {
    data() {
        return{
            sheet: true,
            clusterGroup:null,
            color: ['#542E71','#FB3640','#FDCA40','#A799B7','#126E82','#91C788'],
            clusterContents:[
              '증가 성향', '감소 성향', 's파 패턴','역s파 패턴','최근 급증','최근 감소 또는 중간 피크 성향'
            ],

        }
    },
    components:{
        NetworkChart
    },

    methods:{
        ReportSheetControl(){
            this.$store.state.showReport = !this.$store.state.showReport
        },
        getColor(number){
            return this.color[number]
        },
        makeGroupCluster(){
            this.clusterGroup= [[],[],[],[],[],[]]
            for (var i in this.clusterData){
                if (this.clusterData[i].cluster ==0){
                    this.clusterGroup[0].push(this.clusterData[i].sigungu)
                }
                if (this.clusterData[i].cluster ==1){
                    this.clusterGroup[1].push(this.clusterData[i].sigungu)
                }
                if (this.clusterData[i].cluster ==2){
                    this.clusterGroup[2].push(this.clusterData[i].sigungu)
                }
                if (this.clusterData[i].cluster ==3){
                    this.clusterGroup[3].push(this.clusterData[i].sigungu)
                }
                if (this.clusterData[i].cluster ==4){
                    this.clusterGroup[4].push(this.clusterData[i].sigungu)
                }
                if (this.clusterData[i].cluster ==5){
                    this.clusterGroup[5].push(this.clusterData[i].sigungu)
                }
            }
        },

        makeNodes(){
            // id =0
            var nodes = []
            var links = []
            var id =1
            for(var cluster in this.clusterGroup){
                for (var node in this.clusterGroup[cluster]){
                    nodes.push({
                        'id': id,
                        'name': this.clusterGroup[cluster][node],
                        '_color': this.color[cluster]
                    })
                    id+=1
                }
            }
            id =1
            for(cluster in this.clusterGroup){
                if (this.clusterGroup[cluster].length>1){
                    node = this.clusterGroup[cluster].length
                    var cnt=0
                    var start = id;
                    while (cnt+1 < this.clusterGroup[cluster].length){
                        
                        links.push({
                            sid: id,
                            tid: id+1,
                            _color: 'black',
                            _svgAttrs:{'stroke-width':2,opacity:1},
                        })
                        id+=1;
                        cnt+=1
                    }
                    var end = id;
                    
                    
                    if (this.clusterGroup[cluster].length>2){
                        links.push({
                            sid: start,
                            tid: end,
                            _color: 'black',
                            _svgAttrs:{'stroke-width':2,opacity:1},
                        })
                    }
                    id+=1;
                    
                }
                else {
                    if (this.clusterGroup[cluster].length!=0)id+=1;
                }
            }
            return [nodes, links]
        }
    },
    async mounted(){
         await this.makeGroupCluster()
         var res = await this.makeNodes()
         this.$store.state.netNodes = res[0]
         this.$store.state.netLinks = res[1]
    },
    computed:{
        netNodes(){
            return this.$store.state.netNodes;
        },
        netLinks(){
            return this.$store.state.netLinks;
        },
        clusterData(){
             return this.$store.state.cluster;
        },
        showReport(){
            return this.$store.state.showReport;
        },
    },
    watch:{
        clusterData: function(){
        },
    }
}
</script>
<style scoped>
.sheet{
    display: flex;
    justify-content: center;
    align-content: center;
}
</style>