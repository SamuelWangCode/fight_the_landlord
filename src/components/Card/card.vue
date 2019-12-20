//card
<template>
	<div :class="fCardClass">
		<img id="card" v-bind:src="value | append" ondragstart='return false;'/>
		<!-- <button type="text" @click="add">+1</button> -->
	</div>
</template>


<script>

export default{
	name: 'card',
	props:["value","cardtype","selected","picked"],
	methods:{
	},
	data() {
		return{
		}
	},
	directives:{
	},
	filters: {
		append(value){
			return "/static/assets/" + value + ".png"
		}
	},
	watch: {
	},
	computed: {
		fCardClass(){
			let size = ['handcard','outcard'];
			return {
				'handcard': this.cardtype == 1,
				'outcard': this.cardtype == 0,
				'selected': this.selected == 1,
				'picked': this.picked == 1,
			};
		}
	}
};

</script>

<style>
 	.selected {
      transform: translate3d(0, -20px, 0);
    }
    .picked {
      transition: background 0.1s linear all;
    }
	.handcard {
	flex-grow: 1;
	border: 1px solid #999999;
	width: 40px;
	height: 60px;
	display: inline-block;
	line-height: 16px;
	vertical-align: top;
	transition: transform .1s linear;
	}
	.outcard {
    border: 1px solid #999999;
    width: 28px;
    height: 42px;
    display: inline-block;
    vertical-align: top;
    }
</style>