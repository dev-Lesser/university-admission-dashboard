<template>
    <v-app-bar class="app-bar" color="blue-grey darken-3" dark  app>

      <v-btn text @click="toHome"><v-toolbar-title >대학 신입생 충원률 분석</v-toolbar-title></v-btn>

      <v-spacer></v-spacer>
    </v-app-bar>
</template>
<script>

export default ({
  methods:{
    toHome(){
      this.$store.state.selected=false;
    }
  }
})
</script>
