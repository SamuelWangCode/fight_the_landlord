<template>
		<div class="outcards">
			<div v-if="nCallLandlord">{{nCallLandlord | ftCallLandlord}}</div>
			<div v-if="bNoOut">PASS</div>
			<card v-for="(i2,index) in aOutCards" 
			      :value="i2.value"
			      :cardtype=0
			      :key="index"></card>
		</div>
</template>

<script>
import card from './card';
export default{
	name:"outCards",
	components: {
        card
    },
	props:['aOutCards','nCallLandlord','bNoOut'],
	data(){
		return{
		}
	},
	directives:{
	},
	filters:{
		ftCallLandlord(nCall){
			let aStr=['', '叫地主', '不叫', '抢地主', '不抢','准备']
			return aStr[nCall]
		},
	},
	watch: {
	},
	computed: {
	},
	methods: {
	}
};

</script>

<style>
	.outcards {
      width: 100%;
      margin-top: 60px;
      
    }
</style>