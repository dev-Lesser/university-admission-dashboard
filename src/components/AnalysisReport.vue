<template>
    <v-bottom-sheet 
    v-model="sheet" 
    hide-overlay 
    scrollable
    inset
    style="display:flex;">
        <v-sheet
            class="text-center"
            
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
                <v-flex xs12 sm8 md8>
                    <network-chart :netNodes="netNodes" :netLinks="netLinks"/>
                </v-flex>
                <v-flex xs12 sm4 md4 style="align-items:center;display:grid;" id="cluster-icon">
                    <div v-for="(i,key) in color" :key=i>
                        <v-row no-gutters >
                            <v-col>
                                <v-chip class="ma-1" :color=i dark x-small >&nbsp;</v-chip> 
                            </v-col >
                            <v-col :md="2" style="font-size:13px;display:flex;align-items:center;" >
                                <v-img :src=clusterImg[key] :max-height="40" :max-width="40"/>
                            </v-col>
                            <v-col style="font-size:13px;display:flex;align-items:center;">
                                {{clusterContents[key]}} 
                            </v-col>
                            
                            
                        </v-row>
                        <v-divider />
                    </div>
                </v-flex>
            </v-layout>
        </v-sheet>
    </v-bottom-sheet>
</template>
<script>
import NetworkChart from '@/components/NetworkChart'
import p1 from '@/assets/p1.png'
import p2 from '@/assets/p2.png'
import p3 from '@/assets/p3.png'
import p4 from '@/assets/p4.png'
import p5 from '@/assets/p5.png'
import p6 from '@/assets/p6.png'

export default {
    data() {
        return{
            sheet: true,
            clusterGroup:null,
            color: ['#5A1846','#910D3F','#C70039','#A799B7','#FF5733','#FEC305'],
            clusterContents:[
                '증가 성향', '감소 성향', 's파 패턴','역s파 패턴','최근 급증','최근 감소/중간 피크 성향'
            ],
            clusterImg: [p1,p2,p3,p4,p5,p6]

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
@media screen and (min-width: 500px){
    #cluster-icon {
        display: none;
    }
}

</style>