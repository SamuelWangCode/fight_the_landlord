// html代码
<template>
    <div class="container">
        <div class="leftContainer">
            <div style="float:left; width:80%">
                <img src="../assets/beimian.png" alt="扑克牌背面" class="img">
            </div>
                <outcards class="opponent2222222222222222222222222222222222222222222222222222222222222222222222222222"
                :aOutCards="aBOut"
                :bNoOut="bBNoOut"
                :nCallLandlord="BCallLandlord"></outcards>
            <div class="timer">
                30
            </div>

            <div class="remains">
                {{BCardsNumber}}
            </div>

            <div class="userName">
                卢本伟
            </div>
            <div class="score">
                score：300
            </div>
        </div>
        <div class="centerContainer">
            <div class="topContainer">
                <div class="dipai">
                    当前底牌：234
                </div>
                <div class="midScore">
                    {{midScore}}
                </div>
                <button type="sumbit" v-on:click="changeaCards">发牌</button>
                <button type="sumbit" v-on:click="renewACards([1,2,3,8])">修改牌</button>
                <button type="sumbit" v-on:click="Achupai([{'value':9},{'value':10}])">A出牌对3</button>
                <button type="sumbit" v-on:click="Abuchu">A不出</button>
                <button type="sumbit" v-on:click="Bchupai([{'value':14},{'value':15}])">B出牌对4</button>
                <button type="sumbit" v-on:click="Bbuchu">B不出</button>
                <button type="sumbit" v-on:click="Selfchupai([{'value':1},{'value':2}])">自己出牌对A</button>
                <button type="sumbit" v-on:click="Selfchupai([{'value':3},{'value':4}])">自己出牌对A2</button>
                <button type="sumbit" v-on:click="Selfbuchu">自己不出</button>
                <button type="sumbit" v-on:click="handleBtnTips">提示</button>
                <button type="sumbit" v-on:click="changeSelectedCards">改变选中的牌</button>
            </div>
            <div class="bottomContainer">
                
            </div>
        </div>
        <div class="rightContainer">
            <div class="timer">
                30
            </div>
            <div style="float:left; width:80%">
                <img src="../assets/beimian.png" alt="扑克牌背面" class="img">
            </div>
                <outcards class="opponent11111111111111111111111111111111111111111111111111111111111111111111111111111"
                :aOutCards="aAOut"
                :bNoOut="bANoOut"
                :nCallLandlord="ACallLandlord"></outcards>
            <div class="remains">
                {{ACardsNumber}}
            </div>
            <div class="userName">
                卢本伟
            </div>
            <div class="score">
                score：300
            </div>
        </div>
        <cards
            :aCards="aSelfCards"
            :aOutCards="aSelfOut"
            :oAgaOut="oLastOut"
            :bNoOut="bSelfNoOut"
            :nCallLandlord="nCallLandlord"
            :aSelfSelectCards="aSelfSelectCards"
            @onChangeSelectCards="handleChangeSelectCards"
            ></cards>
    </div>
</template>

// javaScript代码
<script>
import cards from '../components/Card/cards';
import outcards from "../components/Card/outcards"
import {CardControler} from '../api/cardcontroller.js';
import CARDSTYPE from '../api/CARDSTYPE.js';
import {CardHelper} from '../api/CardHelper.js';


export default {
    name: 'testcards',
    components: {
        cards,
        outcards
    },
    data() {
        return{
            Players:["","","",""],

            passLordTime:0,   //不叫地主的次数
            callLordSeat:-1,  //叫地主的人的位置
            snatLordSeat:-1,  //抢地主的人的位置
            nCallLandlord:0,  //自己 抢/叫 地主的信息
            ACallLandlord:0,  //下家 抢/叫 地主的信息
            BCallLandlord:0,  //上家 抢/叫 地主的信息

            aSelfOut:[],      //自己的出牌
            aAOut:[],         //下家的出牌
            aBOut:[],         //上家的出牌

            bSelfNoOut:1,     //自己不出
            bANoOut:1,        //上家不出
            bBNoOut:1,        //下家不出
            midScore:30,      //分数

            ACardsNumber:20,  //下家剩的牌
            BCardsNumber:20,  //上家剩的牌






            nSelfSeat: -1,   //自己的位置（1，2，3）
            nBankerSeat:-2,  //地主的位置（1，2，3）
            aSelfCards:[],       //自己的手牌


            aSelfSelectCards:[],         //自己选中的牌
            nSelfSelectCasrdsType: 0,    //自己选中的牌的牌型
            nSelfSelectCasrdsPower: 0,   //自己选中的牌的大小
            bAvailOutCards: false,       //自己选中的牌能不能出
            aSelfAvailCards: [],         //推荐的出牌

            //上一次的出牌信息
            oLastOut: {
                nSeat: 0,
                aCards: [],
                nPower: 0,
                nType: 0
            },




            aOutCards:[
            {
                value:5
            },
            {
                value:6
            }
            ],
            outcards1:[
            ],
            NoOut1:0,
            NoOut2:0,

        }
    },
    watch: {
        'oLastOut'(newVal = {nSeat: -1, aCards: [], nPower: 0,nType: 0}){
            let {nSeat,aCards,nPower,nType} = newVal;
            if (nSeat != -1) {
                if(nSeat == 0){
                    aCards=[];
                    nPower = 0;
                    nType = 0;
                }
                let nNum = aCards.length;
                console.log("进行了可出牌的判断");
                console.log(nType);
                this.aSelfAvailCards = CardHelper.fGetAvailCards(this.aSelfCards, nType, nPower, nNum);
            }
        },
       'nBankerSeat'(newVal) {
            if (this.nBankerSeat == this.nSelfSeat) {
                // 自己成为地主时获取提示
                this.aSelfAvailCards = CardHelper.fGetAvailCards(this.aSelfCards, 0, 0, 0);
                console.log("成为地主，自己的出牌按钮v-if绑定的属性设置为true");
            }
        },
        'aSelfSelectCards'(aCards) {
            let nPower = CardControler.fGetCardsPower(aCards);
            let nType = CardControler.fGetCardsType(aCards);
            this.nSelfSelectCasrdsType = nType;
            this.nSelfSelectCasrdsPower = nPower;
            // 处理按钮
            let nCount = aCards.length;
            let oLastOut = this.oLastOut;
            let nLastCount = oLastOut.aCards && oLastOut.aCards.length ? oLastOut.aCards.length : 0;
            let nLastType = oLastOut.nType || 0;
            let nLastPower = oLastOut.nPower || 0;
            let bEnable = false;
            if (nType == CARDSTYPE.HUO_JIAN) {
              // 火箭最大
              bEnable = true;
            } else if (nType == CARDSTYPE.SI_ZHANG) {
              if (nLastType == CARDSTYPE.SI_ZHANG && nPower > nLastPower) {
                // 上家也是炸弹 则判断大小
                bEnable = true;
              } else if (nLastType != CARDSTYPE.SI_ZHANG && nLastType != CARDSTYPE.HUO_JIAN) {
                // 炸弹大于普通牌
                bEnable = true;
              }
            } else {
              if (nType == nLastType && nPower > nLastPower && nCount == nLastCount) {
                bEnable = true;
              } else if (nType != 0 && nLastCount == 0) {
                // 上家没出牌
                bEnable = true;
              } else if (oLastOut.nSeat == this.nSelfSeat){
                bEnable = true;
              }
            }
            if (nType == 0) {
              bEnable = false;
            }
            this.bAvailOutCards = bEnable;
        },
        'aSelfCards'(aCards){
            if(aCards.length == 0){
                console.log("自己胜利");
            }
        }
    },
    computed: {
    },
    mounted(){
        var object = [{
            value: 2
        },{
            value : 3
        }
        ]
        object = this.objectToObject(object)
        console.log(object)
    },
    methods:{
        objectToObject(objectArray){
            for(let object of objectArray){
                object.value += 1
            }
            return objectArray
        },
        changeaCards(){
            this.aSelfCards = [1,2,3,4,5,6,7,8,33];
            console.log("模拟发牌");
        },
        renewACards(SelfOutCards = []){
            console.log("更新自己的手牌");
            let tmpACards = this.aSelfCards;
            for(var i=0; i < SelfOutCards.length; i++){
                let idx = tmpACards.indexOf(SelfOutCards[i]);
                if(idx != -1){
                    tmpACards.splice(idx,1);
                }
            }
            this.aSelfCards = tmpACards;
            this.aSelectedCards = [];
        },
        Achupai(OutCards = []){
            this.bANoOut = 0;
            this.aAOut = OutCards;
            var aOutCards = this.ObjectToArray(OutCards);
            var oLastOutCards = {nSeat: -1, aCards: [], nPower: 0,nType: 0};
            oLastOutCards.nSeat = 1;
            oLastOutCards.aCards = aOutCards;
            oLastOutCards.nPower = CardControler.fGetCardsPower(aOutCards);
            oLastOutCards.nType = CardControler.fGetCardsType(aOutCards);
            if (oLastOutCards.nType == CARDSTYPE.SI_ZHANG || oLastOutCards.nType == CARDSTYPE.HUO_JIAN) {
                this.midScore *= 2;
            }
            this.oLastOut = oLastOutCards;


            this.ACardsNumber -= aOutCards.length;
            if(this.ACardsNumber == 0){
                console.log("自己输了");
            }
        },
        Bchupai(OutCards = []){
            this.bBNoOut = 0;
            this.aBOut = OutCards;
            var aOutCards = this.ObjectToArray(OutCards);
            var oLastOutCards = {nSeat: -1, aCards: [], nPower: 0,nType: 0};
            oLastOutCards.nSeat = 2;
            oLastOutCards.aCards = aOutCards;
            oLastOutCards.nPower = CardControler.fGetCardsPower(aOutCards);
            oLastOutCards.nType = CardControler.fGetCardsType(aOutCards);
            if (oLastOutCards.nType == CARDSTYPE.SI_ZHANG || oLastOutCards.nType == CARDSTYPE.HUO_JIAN) {
                this.midScore *= 2;
            }
            this.oLastOut = oLastOutCards;


            this.BCardsNumber -= aOutCards.length;
            if(this.BCardsNumber == 0){
                console.log("自己输了");
            }
            else{
                console.log('上家出过牌，自己的出牌按钮v-if绑定的属性设置为true');
            }
        },
        Selfchupai(OutCards = []){
            console.log("自己出牌了");
            this.bSelfNoOut = 0;
            this.aSelfOut = OutCards;
            var aOutCards = this.ObjectToArray(OutCards);
            var oLastOutCards = {nSeat: -1, aCards: [], nPower: 0,nType: 0};
            oLastOutCards.nSeat = 0;
            oLastOutCards.aCards = aOutCards;
            oLastOutCards.nPower = CardControler.fGetCardsPower(aOutCards);
            oLastOutCards.nType = CardControler.fGetCardsType(aOutCards);
            if (oLastOutCards.nType == CARDSTYPE.SI_ZHANG || oLastOutCards.nType == CARDSTYPE.HUO_JIAN) {
                this.midScore *= 2;
            }
            this.oLastOut = oLastOutCards;
            this.renewACards(aOutCards);
        },
        Abuchu(){
            this.bANoOut = 1;
            this.aAOut = [];
        },
        Bbuchu(){
            this.bBNoOut = 1;
            this.aBOut = [];
            console.log('上家不出，自己的出牌按钮v-if绑定的属性设置为true');
        },
        Selfbuchu(){
            this.bSelfNoOut = 1;
            this.aSelfOut = [];
        },
        ObjectToArray(Cards = []){
            var aCards = [];
            for(var i = 0; i < Cards.length; i++){
                aCards.push(Cards[i]['value']);
            }
            return aCards;
        },
        ArrayToObject(Cards = []){
            var aCards = [];
            for(var i = 0; i < Cards.length; i++){
                var o = { 'value': Cards[i] };
                aCards.push(o);
            }
            return aCards;
        },


        changeSelectedCards(){
            let aCards = [1,3];
            this.handleChangeSelectCards(aCards);
        },



        handleBtnTips() {
              let aCards = CardHelper.fGetHintCards();
              this.handleChangeSelectCards(aCards);
        },
        handleChangeSelectCards(aCards = []){
            this.aSelfSelectCards = aCards;
            console.log("hi");
        },
        handleCallLandlord(){

        },
        handleNoCallLandlord(){
            if(this.passLordTime == 2){
                console.log("restart");
            }
            else{

            }
        },
        handleSnatLandlord(){
            if(this.nSelfSeat == this.callLordSeat){
                console.log("I am Landlord");
            }
            else{

            }
        },
        handleNoSnatLandlord(){
            if(this.nSelfSeat == this.callLordSeat){
                console.log("this.snatLordSeat is Landlord");
            }
            else if (this.SnatLordSeat == -1 && this.callLordSeat == 1){
                console.log("this.callLordSeat is Landlord.");
            }
            else{

            }
        },
        comfirmCard(){
            aSelectedCards = CardControler.fSortOutCards(this.aSelfSelectCards);
            oSelectedCards = ArrayToObject(aSelectedCards);
        }



    },
};
</script>

// css代码
<style scoped>
.container{
    width: 100%;
    height: 100%;
}
.leftContainer{
    width: 25%;
    float: left;
    height: 100%;
    border-style: solid;
}
.centerContainer{
    width: 50%;
    float: left;
    height: 100%;
}
.topContainer{
    height: 50%;
    border-style: solid;
}
.bottomContainer{
    height: 50%;
    border-style: solid;
}
.rightContainer{
    width: 25%;
    float: right;
    height: 100%;
    border-style: solid;
}
.img{
    width: 80%;
    margin-top: 10%;
}
.timer{
    width: 20%;
    float:left;
    margin-top:40%;
    border-style: solid;
}
.remains{
    width: 100%;
    margin-top: 80%;

}
.userName{
    margin-top:40%;

}
.score{
    margin-bottom: 25%;
}
.dipai{
    border-style: solid;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10%;
    margin-bottom: 10%;
}
.midScore{
    width: 30%;
    font-weight: bold;
    font-size: 30px; 
    border-style: solid;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 5%;
}
</style>