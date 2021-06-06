<template>
  <v-app>
    <Header />
    

    <v-main>
      <v-container class="container" fluid  grid-list-md>
        <v-layout no-gutters wrap class="home-layout">
          <v-flex xs12 sm6 md6>
        <search-bar />
        </v-flex>
        </v-layout>

      </v-container>
      
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import SearchBar from '@/components/SearchBar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  name: 'App',

  components: {
    Header,
    SearchBar,
    Footer
  },

  data: () => ({
    //
  }),
};
</script>
<style scoped>
.container{
  display:flex;
  justify-content: center;
}
.home-layout{
  display:flex;
  justify-content: center;

}
</style>
