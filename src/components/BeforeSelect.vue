<template>
    <v-card :max-width="500">
        <v-img 
        :src="`https://picsum.photos/500/300?image=25`"
        aspect-ratio="1.4"
        :height="150"
        ></v-img>
    <v-card-title>Tutorial</v-card-title>
    <v-card-subtitle><strong>상단의 검색창에서 시도를 선택해 주세요.</strong></v-card-subtitle>
    <v-card-text v-for="i in contentsSplit" :key="i">{{i}}</v-card-text>
    </v-card>
</template>
<script>

export default ({
    props:{
        contents: String
    },
    computed:{
        contentsSplit: function(){
            return this.contents.split('.')
        }
    }
})
</script>
