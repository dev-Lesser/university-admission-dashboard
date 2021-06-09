<template>
    <d3-network :net-nodes="netNodes" :net-links="netLinks" :options="options" style="background-color: white"/>
</template>

<script>
import D3Network from 'vue-d3-network'

export default {
    components:{
        D3Network
    },
    props:{
        'netNodes': Array,
        'netLinks':Array,
    },

    data() {
        return {
            nodeSize:24,
            canvas:false,
            nodes: null,
            links: null,
        }
        
        
    },
    created(){
        
    },
    mounted(){
       
    },
    computed:{
        setForce(){
            return this.$store.state.force;
        },

        options(){
            return{
                force: 450,
                size:{ w:300, h:300},
                nodeSize: this.nodeSize,
                nodeLabels: true,
                linkLabels: true,
                canvas: this.canvas
            }
        }
    },
    watch:{
        setForce: function(){
            if (this.nodeSize.length >20 ) this.$store.state.force = 400
        }
    }

}
</script>
<style scoped>
.link .selected {
    color: black;
    background-color: black;
}
</style>