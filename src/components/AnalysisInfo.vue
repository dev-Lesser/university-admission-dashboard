<template>
    <v-menu v-model="info_on" offset-y open-on-hover >
        <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" text icon >
            <v-icon small dark>mdi-information-outline</v-icon>
            </v-btn>
        </template>
        <v-card width="300px" >
            <v-card-subtitle class="explain_modal_head">변화율 증가 지역</v-card-subtitle>
            <v-card-subtitle class="explain_modal_text">
                <v-chip  class="ma-1" v-for="(i, key) in plusList" :key="key" small outlined>{{ i }}</v-chip>
            </v-card-subtitle>
            <v-card-subtitle class="explain_modal_head">변화율 감소 지역</v-card-subtitle>
            <v-card-subtitle class="explain_modal_text">
                <v-chip  class="ma-1" v-for="(i, key) in minusList" :key="key" small outlined>{{ i }}</v-chip>
            </v-card-subtitle>
            <v-card-subtitle class="explain_modal_head">변화율 평균</v-card-subtitle>
            <v-card-subtitle class="explain_modal_text">
                <v-chip  class="ma-1"  small outlined>{{ lean }}</v-chip>
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