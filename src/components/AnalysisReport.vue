<template>
    <v-bottom-sheet 
    v-model="sheet" 
    scrollable 
    no-click-animation 
    persistent 
    style="display:flex;">
        <v-card class="text-center pb-5">
            <div style="background-color:rgba(144,55,199,0.8);" @click="ReportSheetControl">
                <v-btn class="ma-3" text dark >
                    close
                </v-btn>
            </div>
            <v-divider />
            <v-card-text>
                <v-layout wrap style="padding: 10px;display: flex;justify-content: center;">
                    <v-flex xs12 sm8 md8>
                        <v-card-subtitle>행정구별 유사 패턴 군집화
                            <cluster-info />
                        </v-card-subtitle>
                    </v-flex>
                </v-layout>
                <v-layout wrap style="padding: 10px;display: flex;justify-content: center;">
                    <v-flex xs12 sm8 md8>
                        <network-chart style="display: flex;justify-content: center;" :netNodes="netNodes" :netLinks="netLinks" />
                    </v-flex>
                    <v-flex xs12 sm8 md8>
                        <cluster-group-line-chart :nodes="netNodes" :links="netLinks" />
                    </v-flex>
                </v-layout>
            </v-card-text>
        </v-card>
    </v-bottom-sheet>
</template>
<script>
    import NetworkChart from '@/components/NetworkChart'
    import ClusterGroupLineChart from '@/components/ClusterGroupLineChart'
    import ClusterInfo from '@/components/ClusterInfo'
    export default {
        data() {
            return {
                sheet: true,
                clusterGroup: null,
                color: ['#db5e56', '#d3db56', '#56db5e', '#56d3db', '#5e56db', '#db56d3'],
            }
        },
        components: {
            ClusterInfo,
            NetworkChart,
            ClusterGroupLineChart
        },
        async mounted() {
            await this.makeGroupCluster();
            var res = await this.makeNodes();
            this.$store.state.netNodes = res[0]
            this.$store.state.netLinks = res[1]
        },
        methods: {
            ReportSheetControl() {
                this.$store.state.showReport = !this.$store.state.showReport
            },
            getColor(number) {
                return this.color[number]
            },
            async makeGroupCluster() {
                this.clusterGroup = [
                    [],
                    [],
                    [],
                    [],
                    [],
                    []
                ]
                for (var i in this.clusterData) {
                    if (this.clusterData[i].cluster == 0) {
                        this.clusterGroup[0].push(this.clusterData[i].sigungu)
                    }
                    if (this.clusterData[i].cluster == 1) {
                        this.clusterGroup[1].push(this.clusterData[i].sigungu)
                    }
                    if (this.clusterData[i].cluster == 2) {
                        this.clusterGroup[2].push(this.clusterData[i].sigungu)
                    }
                    if (this.clusterData[i].cluster == 3) {
                        this.clusterGroup[3].push(this.clusterData[i].sigungu)
                    }
                    if (this.clusterData[i].cluster == 4) {
                        this.clusterGroup[4].push(this.clusterData[i].sigungu)
                    }
                    if (this.clusterData[i].cluster == 5) {
                        this.clusterGroup[5].push(this.clusterData[i].sigungu)
                    }
                }
            },
            async makeNodes() {
                var nodes = []
                var links = []
                var id = 1
                for (var cluster in this.clusterGroup) {
                    for (var node in this.clusterGroup[cluster]) {
                        nodes.push({
                            'id': id,
                            'name': this.clusterGroup[cluster][node],
                            '_color': this.color[cluster]
                        })
                        id += 1
                    }
                }
                id = 1
                for (cluster in this.clusterGroup) {
                    if (this.clusterGroup[cluster].length > 1) {
                        node = this.clusterGroup[cluster].length
                        var cnt = 0
                        var start = id;
                        while (cnt + 1 < this.clusterGroup[cluster].length) {
                            links.push({
                                sid: id,
                                tid: id + 1,
                                _color: 'black',
                                _svgAttrs: {
                                    'stroke-width': 2,
                                    opacity: 1
                                },
                            })
                            id += 1;
                            cnt += 1
                        }
                        var end = id;
                        if (this.clusterGroup[cluster].length > 2) {
                            links.push({
                                sid: start,
                                tid: end,
                                _color: 'black',
                                _svgAttrs: {
                                    'stroke-width': 2,
                                    opacity: 1
                                },
                            })
                        }
                        id += 1;
                    } else {
                        if (this.clusterGroup[cluster].length != 0) id += 1;
                    }
                }
                return [nodes, links]
            }
        },
        computed: {
            netNodes() {
                return this.$store.state.netNodes;
            },
            netLinks() {
                return this.$store.state.netLinks;
            },
            clusterData() {
                return this.$store.state.cluster;
            },
            showReport() {
                return this.$store.state.showReport;
            },
        },
        watch: {
            clusterData: function() {},
        }
    }
</script>
<style scoped>

</style>