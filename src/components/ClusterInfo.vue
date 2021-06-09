<template>
<v-menu v-model="info_on" offset-y open-on-hover >
    <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" text icon >
        <v-icon small dark>mdi-information-outline</v-icon>
        </v-btn>
    </template>
    <v-card width="300px" class="pa-3">
        <v-row no-gutters style="display:flex;">
            <v-col class="desc-columns">
                <strong>색상</strong>
            </v-col>
            <v-col :md="2" class="desc-columns">
                <strong>패턴</strong>
            </v-col>
            <v-col class="desc-columns-left">
                <strong>패턴설명</strong>
            </v-col>
        </v-row>
    
        <v-divider />
        <div v-for="(i,key) in color" :key=i>
            <v-row no-gutters>
                <v-col style="text-align: center;">
                    <v-chip class="ma-1" :color=i dark x-small>&nbsp;</v-chip>
                </v-col>
                <v-col style="font-size:13px;display:flex;align-items:center;justify-content: center;">
                    <v-img :src=clusterImg[key] :max-height="40" :max-width="40" />
                </v-col>
                <v-col style="font-size:13px;display:flex;align-items:center;justify-content: center;">
                    {{clusterContents[key]}}
                </v-col>
            </v-row>
            <v-divider />
        </div>
    </v-card>
</v-menu>
</template>
<script>
import p1 from '@/assets/p1.png'
import p2 from '@/assets/p2.png'
import p3 from '@/assets/p3.png'
import p4 from '@/assets/p4.png'
import p5 from '@/assets/p5.png'
import p6 from '@/assets/p6.png'

export default ({
    data() {
        return {
            info_on: null,
            info:true,
            color: ['#db5e56', '#d3db56', '#56db5e', '#56d3db', '#5e56db', '#db56d3'],
            clusterContents:[
                '증가 성향', '감소 성향', 's파 패턴','역s파 패턴','최근 급증','최근감소/중간피크 성향'
            ],
            clusterImg: [p1,p2,p3,p4,p5,p6]
        }
        
    },
})
</script>
<style scoped>
.sheet{
    display: flex;
    justify-content: center;
    align-content: center;
}
.desc-columns{
    font-size:13px;
    display:flex;
    align-items:center;
    justify-content:center;
}
.desc-columns-left{
    font-size:13px;
    display:flex;
    align-items:flex-start;
    justify-content:center;
}

</style>