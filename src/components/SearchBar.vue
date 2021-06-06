<template>
<v-expansion-panels>
    <v-expansion-panel>
    <v-expansion-panel-header>
        행정구역 검색
    </v-expansion-panel-header>
    <v-expansion-panel-content>
        
            <v-autocomplete
              v-model="title"
              :disabled="loading"
              :items="sido"
              chips
              color="blue-grey lighten-2"
              label="행정구역"
              item-text="name"
              item-value="name"
            >
              <template v-slot:selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  close
                  @click="data.select"
                  @click:close="remove(data.item)"
                >
                  
                  
                </v-chip>
              </template>
              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-item-content v-text="data.item"></v-list-item-content>
                </template>
                <template v-else>
                  
                  <v-list-item-content>
                    <v-list-item-title v-html="data.item.name"></v-list-item-title>
                  </v-list-item-content>
                </template>
              </template>
            </v-autocomplete>
    </v-expansion-panel-content>
    </v-expansion-panel>
</v-expansion-panels>
</template>
<script>
export default {
    data() {
        return {
            title: true,
            friends:['서울','경기'],
            sido: [
            { name: '서울', },
            { name: '경기', },
            { name: '대전',},
            { name: '인천', },
            ]
        }
    },
    computed:{
        loading(){
            return this.$store.state.loading
        }
    },
    methods: {
      remove (item) {
          console.log(item)
        const index = this.friends.indexOf(item.name)
        if (index >= 0) this.friends.splice(index, 1)
      },
    },
        
    
}
</script>