<template>
    <v-menu v-model="info_on" offset-y open-on-hover >
        <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" text icon >
            <v-icon small dark>mdi-information-outline</v-icon>
            </v-btn>
        </template>
        <v-card width="300px" >
            <v-card-subtitle>충원차이 변화량의 평균을 각 행정구별로 계산하여 집계합니다.</v-card-subtitle>
            <v-divider />
                <v-card-subtitle class="explain_modal_head">변화율 평균</v-card-subtitle>
                
                <v-card-subtitle class="explain_modal_text">
                    <v-chip  class="ma-1" color="primary" small dark v-if="lean>0">+{{ Math.round(lean) }} 명</v-chip>
                    <v-chip  class="ma-1" color="red lighten-1" small text dark v-else>{{  Math.round(lean) }} 명</v-chip>
                </v-card-subtitle>
                <v-divider />
                <v-card-subtitle class="explain_modal_head">
                    <v-icon color="indigo darken-2"> mdi-elevation-rise</v-icon>
                    변화율 증가 지역

                </v-card-subtitle>

                
                <v-card-subtitle class="explain_modal_text">
                    <v-chip color="indigo darken-2" class="ma-1" v-for="(i, key) in plusList" :key="key" x-small outlined>{{ i }}</v-chip>
                </v-card-subtitle>
                <v-divider />
                <v-card-subtitle class="explain_modal_head">
                    <v-icon color="red lighten-2"> mdi-elevation-decline</v-icon>
                    변화율 감소 지역</v-card-subtitle>
                <v-card-subtitle class="explain_modal_text">
                    <v-chip color="red darken-3" class="ma-1" v-for="(i, key) in minusList" :key="key" x-small outlined>{{ i }}</v-chip>
                </v-card-subtitle>
            
            
        </v-card>
    </v-menu>
</template>
<script>
export default {
    props:{
        plusList: Array,
        minusList: Array,
        lean: Number,
    },
    data() {
        return{
            info_on: null,
            info: true
        }
        
    },
}
</script>
<style scoped>
.explain_modal_head {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

</style>