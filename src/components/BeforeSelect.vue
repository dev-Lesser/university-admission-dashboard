<template>
    <div>
        <v-img 
        :src="`https://picsum.photos/500/300?image=25`"
        aspect-ratio="1.4"
        :height="150"
        ></v-img>
    <v-card-title>Ready</v-card-title>
    <v-card-subtitle>상단의 검색창에서 시도를 선택해 주세요.</v-card-subtitle>
    <v-card-text>{{contents}}</v-card-text>
    </div>
</template>
<script>

export default ({
    props:{
        contents: String
    }
})
</script>
