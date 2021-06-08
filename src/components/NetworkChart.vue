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
            nodeSize:15,
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
                force: 550,
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
            console(this.setForce)
            if (this.nodeSize.length >20 ) this.$store.state.force = 600
            console(this.setForce)
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