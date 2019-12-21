<template>
	<div class="handcards-container selfcards-container">
		<div class="outcards">
			<div v-if="nCallLandlord">{{nCallLandlord | ftCallLandlord}}</div>
			<div v-if="bNoOut">PASS</div>
			<card v-for="(i2,index) in aOutCards" 
			      :value="i2.value"
			      :cardtype=0
			      :key="index"></card>
		</div>
			
		<div class="handcards"
		v-releaseoutside="handleReleaseOutside"
        v-touch-start="handleSelect"
        v-touch-move="handleMove"
        v-touch-end="handleRelease">
			<card v-for="(i,index) in aHandCards" 
				  :value="i.value"
				  :cardtype=1
				  :selected="i.selected"
			      :picked="i.picked"
			      :key="index"></card>
		</div>

	</div>
</template>

<script>
import card from './card';
import releaseoutside from '@/directive/releaseoutside';
import touchStart from '@/directive/touchstart';
import touchMove from '@/directive/touchmove';
import touchEnd from '@/directive/touchend';

import {CardControler} from '../../api/cardcontroller';

export default{
	name:"cards",
	components: {
        card
    },
	props:['aCards','aOutCards','nCallLandlord','bNoOut','oAgaOut','aSelfSelectCards'],
	data(){
		return{
		    nStartIdx: -1,
	        nEndIdx: -1,
	        aPickedCards: [],
	        aHandCards: [],
	        aUpCards: [],


			msg:[{
				cardtype:1,
				value:1,
				selected:1,
				picked:0,
			},
			{
				cardtype:1,
				value:2,
				selected:0,
				picked:0,
			},
			{
				cardtype:1,
				value:3,
				selected:0,
				picked:0,
			},
			{
				cardtype:1,
				value:10,
				selected:0,
				picked:0,
			},
			],

			msg2:[
			{
				cardtype:0,
				value:"13",
			},
			{
				cardtype:0,
				value:"16",
			},
			],
		}
	},
	directives:{
		releaseoutside,
		touchStart,
		touchMove,
		touchEnd
	},
	filters:{
		ftCallLandlord(nCall){
			let aStr=['', '叫地主', '不叫', '抢地主', '不抢']
			return aStr[nCall]
		},
	},
	watch: {
		'aCards' (newVal) {
			let aRet = [];
			newVal.forEach((nCard)=>{
				var o = {value: nCard, selected: false, picked: false};
				aRet.push(o);
			});
			this.aHandCards = aRet;
		},
		'aSelfSelectCards' (newVal) {
			this.handleMoveUpCards(newVal);
		}
	},
	computed: {
	},
	methods: {
		handleSelect(index = -1){
			if(index == -1){
				return;
			}
			let oCard = this.aHandCards[index];
			this.handlePickCardStart(oCard,index);
		},
		handleMove(index = -1) {
	      if (index == -1) {
	        return;
	      }
	      let oCard = this.aHandCards[index];
	      this.handlePickCardMove(oCard, index);
	    },
	    handleRelease(index = -1) {
	      if (index == -1) {
	        this.handleReleaseOutside();
	      } else {
	        let oCard = this.aHandCards[index];
	        this.handlePickCardEnd(oCard, index);
	      }
	    },
	    handleReleaseOutside(e) {
	      if (this.nStartIdx != -1 && this.aPickedCards.length > 0) {
	        this.handlePickCardEnd();
	      } else {
	        this.handleMoveDownAllCards();
	      }
	    },
	    handlePickCardStart(oCard = {}, index = -1) {
	      if (this.nStartIdx != -1) {
	        return;
	      }
	      let nCard = oCard.nCard || 0;
	      this.nStartIdx = index;
	      this.nEndIdx = index
	      this.aPickedCards = [nCard];
	      oCard.bPicked = true;
    	},
    	handlePickCardStart(oCard = {}, index = -1) {
	      if (this.nStartIdx != -1) {
	        return;
	      }
	      let nCard = oCard.value || 0;
	      this.nStartIdx = index;
	      this.nEndIdx = index
	      this.aPickedCards = [nCard];
	      oCard.bPicked = true;
	    },
	    handlePickCardMove(oCard = {}, index = -1) {
	      let nCard = oCard.nCard || 0;
	      if (this.nStartIdx == -1 || this.nEndIdx == index) {
	        return;
	      }
	      this.nEndIdx = index;
	      let nMinIdx = Math.min(this.nStartIdx, this.nEndIdx);
	      let nMaxIdx = Math.max(this.nStartIdx, this.nEndIdx);
	      this.aPickedCards = [];
	      this.aHandCards.forEach((oCard, idx)=>{
	        oCard.picked = idx >= nMinIdx && idx <= nMaxIdx;
	        oCard.picked && this.aPickedCards.push(oCard.value);
	      });
	    },
	    handlePickCardEnd(oCard = {}, index = -1) {
	      if (this.nStartIdx == -1) {
	        return;
	      }
	      let nCard = oCard.value || 0;
	      if (this.aPickedCards.indexOf(nCard) == -1 && nCard != 0) {
	        this.aPickedCards.push(nCard);
	      }
	      this.aHandCards.forEach((oCard, idx)=>{
	        oCard.picked = false;
	      });
	      this.nStartIdx = -1;
	      let aSelCards = CardControler.fTouchCards(this.aPickedCards, this.aCards, this.aUpCards, this.oAgaOut);
	      this.$emit('onChangeSelectCards', aSelCards);
	    },
	    handleMoveUpCards(aSelCards = []) {
	      this.aHandCards.forEach((oCard, idx)=>{
	        let nCard = oCard.value || 0;
	        oCard.selected = aSelCards.indexOf(nCard) > -1;
	      });
	      this.aUpCards = aSelCards;
	    },
	    handleMoveDownAllCards() {
	      this.aHandCards.forEach((oCard, idx)=>{
	        oCard.selected = false;
	      });
	      this.aUpCards = [];
	      this.$emit('onChangeSelectCards', this.aUpCards);
	    }
	}
};

</script>

<style>
	.outcards {
      width: 100%;
    }
	.handcards {
	margin-top: 60px;
	margin-bottom: 25px;
    display: inline-block;
    }
</style>