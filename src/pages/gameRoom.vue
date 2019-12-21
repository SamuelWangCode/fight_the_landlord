// html代码
// A是下家
// B是上家
<template>
    <div class="container">
        <Button @click="changeaCards">添加手牌</Button>
        <Button @click="testPlay">测试出牌</Button>
        <Button @click="testCall">测试叫地主</Button>
        <Button @click="ACall">A叫地主</Button>
        <Button @click="ANotCall">A不叫</Button>
        <Button @click="BCall">B叫地主</Button>
        <Button @click="BNotCall">B不叫</Button>
        <Button @click="ASnatch">A抢地主</Button>
        <Button @click="ANotSnatch">A不抢</Button>
        <Button @click="BSnatch">B抢地主</Button>
        <Button @click="BNotSnatch">B不抢</Button>
        <Button @click="changeaCards">添加手牌</Button>
        <div class="leftContainer">
            <div style="float:left; width:80%">
                <img src="../assets/beimian.png" alt="扑克牌背面" class="img">
            </div>
            <div class="timer">
                <!-- <outCards
                :aOutCards="BOutCards"
                :bNoOut="BNoOut"
                :nCallLandlord="BCallLandLord">
                </outCards> -->
                30
            </div>
            <div class="remains">
                {{leftCardRemains}}
                17
            </div>
            <div class="userName">
                {{leftUserName}}
                lbw
            </div>
            <div class="score">
                score：{{leftScore}}
            </div>
            <div class="userSign">
                {{leftUserSign}}
            </div>
        </div>
        <div class="centerContainer">
            <div class="topContainer">
                <div class="dipai">
                    当前底牌：
                </div>
                <div style="width:100%;height:20%;margin-top:2%;margin-bottom:2%">
                    <div style="float:left;width:50%">
                        <outCards
                        :aOutCards="BOutCards"
                        :bNoOut="BNoOut"
                        :nCallLandlord="BCallLandLord">
                    </outCards>
                    </div>
                    <div style="float:right;width:50%">
                        <outCards
                        :aOutCards="AOutCards"
                        :bNoOut="ANoOut"
                        :nCallLandlord="ACallLandLord">
                    </outCards>
                    </div>
                </div>
                <div class="midScore">
                    当前倍数：{{midScore}}
                </div>
            </div>
            <div class="bottomContainer">
                <!-- 准备 -->
                <Button class="buttonContainer" @click="setReady" v-if="readyTime" type="primary">{{ReadyText}}</Button>
                <!-- 出牌 -->
                <Button class="buttonContainer" @click="confirmCard" :disable="!bAvailOutCards" v-if="cardTime" type="primary">Confirm</Button>
                <!-- 叫地主 -->
                <Button class="buttonContainer" @click="callLord" v-if="callLordTime" type="primary">CallLord</Button>
                <!-- 抢地主 -->
                <Button class="buttonContainer" @click="snatchLord" v-if="snatchLordTime" type="primary">SnatchLord</Button>
                <!-- 提示 -->
                <Button style="width:10%;margin-top:1%; margin-left:-10%;" @click="help" v-if="cardTime" type="primary">Help</Button>
                <!-- 退出 -->
                <Button class="buttonContainer" @click="leaveRoom" v-if="readyTime" type="error">Exit</Button>
                <!-- 不要 -->
                <Button class="buttonContainer" @click="pass" v-if="cardTime" type="error">Pass</Button>
                <!-- 不叫 -->
                <Button class="buttonContainer" @click="doNotCallLord" v-if="callLordTime" type="error">never mind</Button>
                <!-- 不抢 -->
                <Button class="buttonContainer" @click="doNotSnatchLord" v-if="snatchLordTime" type="error">never mind</Button>
                <cards
                :aCards="aSelfCards"
                :aOutCards="aSelfOut"
                :nCallLandlord="nCallLandLord"
                :aSelfSelectCards="aSelfSelectCards"
                @onChangeSelectCards="handleChangeSelectCards"
                style="margin-bottom:20px;"
                ></cards>
                <div style="width:100%;margin-bottom:1%">
                    <div style="width:40%;margin-left:2%;margin-right:2%;float:left">
                        <div class="userMsg">
                            DaSima
                        </div>
                        <div class="userMsg">
                            Score:
                        </div>
                    </div>
                    <div style="width:40%;margin-left:2%;margin-right:2%;float:right">
                        <div class="userMsg">
                        {{myUserSign}} 农民
                        </div>
                    </div>
                    <div style="width:6%;margin-left:auto;margin-right:auto;border-style:ridge">
                        30
                    </div>
                </div>
            </div>
        </div>
        <div class="rightContainer">
            <div class="timer">
                <!-- <outCards
                :aOutCards="AOutCards"
                :bNoOut="ANoOut"
                :nCallLandlord="ACallLandLord">
                </outCards> -->
                30
            </div>
            <div style="float:left; width:80%">
                <img src="../assets/beimian.png" alt="扑克牌背面" class="img">
            </div> 
            <div class="remains">
                {{rightCardRemains}}
                17
            </div>
            <div class="userName">
                {{rightUserName}}
                PDD
            </div>
            <div class="score">
                score：{{rightScore}}
            </div>
            <div class="userSign">
                {{rightUserSign}}
            </div>
        </div>
    </div>
</template>

// javaScript代码
<script>
import cards from '../components/Card/cards';
import OutCards from '../components/Card/outcards';
import {CardControler} from '../api/cardcontroller'
import {CardHelper} from '../api/CardHelper.js';
import CARDSTYPE from '../api/CARDSTYPE.js';

export default {
    name: 'GameRoom',
    data() {
        return{
            userIds:['','',''],
            BOutCards:"",
            BNoOut:0,
            BCallLandLord:0,
            AOutCards:"",
            ANoOut:0,
            ACallLandLord:0,
            nCallLandLord:0,
            passLordTime: 0,
            callLordSeat: -1,
            snatchLordSeat:-1,
            nBankerSeat:-1,
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

            nSelfSeat: this.$store.state.seat,
            midScore:'',
            ReadyText: "Ready",
            readyTime: true,
            cardTime: false,
            callLordTime: false,
            snatchLordTime: false,
            myUserSign: '',
            aSelfSelectCards:[],
            aSelfCards : [1,2,3],
            aSelfOut:[],
            leftCardRemains:'',
            leftUserName:'',
            leftScore:'',
            leftUserSign:'',
            rightCardRemains:'',
            rightUserName:'',
            rightScore:'',
            rightUserSign:''
        }
    },
    components: {
        cards,
        OutCards
    },
    computed:{

    },
    methods: {
        // 判断一个位置与自己的关系 0:自己 1：下家 2：上家
        judgeRelation(seat){
            var dis = seat-this.nSelfSeat;
            if(dis==0){
                return 0
            }else if(dis==1||dis==-2){
                return 1
            }else if(dis==2||dis==-1){
                return 2
            }else{
                return null
            }
        },
        // json与牌的数组转换
        jsonToCard(json){
            var cards = json.cards
            console.log(cards)
            var cardArray = []
            for(let a of cards){
                cardArray.push(a.value + 1)
            }
            return cardArray
        },
        // 提示
        help(){
            let aCards = CardHelper.fGetHintCards();
            this.handleChangeSelectCards(aCards);
        },
        // 更新自己的手牌
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
        // 变更手牌
        changeaCards(){
            // this.aCards = [2,3,4]
            var json = {
                "seat":"2",
                "cards":[
                    {
                        "value":0
                    },
                    {
                        "value":1
                    },
                    {
                        "value":2
                    },
                    {
                        "value":3
                    },
                    {
                        "value":4
                    },
                    {
                        "value":5
                    },
                    {
                        "value":6
                    },
                    {
                        "value":7
                    },
                    {
                        "value":8
                    },
                    {
                        "value":9
                    },
                    {
                        "value":10
                    },
                    {
                        "value":11
                    },
                    {
                        "value":12
                    },
                    {
                        "value":13
                    },
                    {
                        "value":14
                    },
                    {
                        "value":15
                    },
                    {
                        "value":16
                    }
                ]
            }
            var cards = this.jsonToCard(json)
            cards = CardControler.fSortHandCards(cards)
            this.aSelfCards = cards
            console.log("he");
        },
        // 更改选中的牌
        handleChangeSelectCards(aCards = []){
            this.aSelfSelectCards = aCards;
            console.log("hi");
        },
        // 开始游戏
        gameStart(){
            this.readyTime = false
            this.midScore = 30
        },
        // 准备
        setReady(){
            if(this.ReadyText=="Ready"){
                this.myUserSignr = "Ready"
                this.ReadyText = "Unready"

            }else{
                this.myUserSign = ""
                this.ReadyText = "Ready"
            }
        },
        // 离开房间
        leaveRoom(){
            var object = {
                type: "leaveRoom",
            }
            this.socketApi.sendSock(object, this.getConfigResult)
        },

        // 获得地主信息
        getLandLord(seat){
            this.nCallLandLord = 0
            this.ACallLandLord = 0
            this.BCallLandLord = 0
            this.snatchLordTime = false
            this.callLordTime = false
            this.leftCardRemains = 17
            this.rightCardRemains = 17
            this.leftUserSign = "farmer"
            this.rightUserSign = "farmer"
            this.myUserSign = "farmer"
            if(seat==0){
                this.myUserSign = "landLord"
            }else if(seat==1){
                this.rightUserSign = "landLord"
                this.rightCardRemains = 20
            }else if(seat==2){
                this.leftUserSign = "landLord"
                this.leftCardRemains = 20
            }
        },
        // 出牌
        confirmCard(){
            var aSelectedCards = CardControler.fSortOutCards(this.aSelfSelectCards);
            var oSelectedCards = this.ArrayToObject(aSelectedCards);
            this.Selfchupai(oSelectedCards)
        },
        // 不出
        pass(){

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


            this.rightCardRemains -= aOutCards.length;
            if(this.rightCardRemains == 0){
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


            this.leftCardRemains -= aOutCards.length;
            if(this.leftCardRemains == 0){
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
                var o = { 'value': Cards[i]};
                aCards.push(o);
            }
            return aCards;
        },
        // 叫地主
        callLord(){
            this.callLordSeat = 0
            this.nCallLandLord = 1
            this.callLordTime = false
        },
        // 不叫
        doNotCallLord(){
            if(this.passLordTime==2){
                // 重新发牌，这时应值此值为0
                this.changeaCards();
                this.ACallLandLord = 0
                this.BCallLandLord = 0
                this.callLordTime = false
            }
            else{
                this.passLordTime+=1
                this.nCallLandLord = 2
                this.callLordTime = false
            }
        },
        // 抢地主
        snatchLord(){
            if(this.callLordSeat==0){
                this.midScore*=2
                //自己是地主
                console.log("自己是地主")
            }
            else{
                this.snatchLordSeat = 0;
                this.nCallLandLord = 3;
                this.midScore*=2
                this.snatchLordTime = false;
            }
        },
        // 不抢
        doNotSnatchLord(){
            if(this.callLordSeat == 1 && this.snatchLordSeat == -1){
                //下家是地主
                console.log("下家是地主")
            }else{
                this.nCallLandLord=4;
                this.snatchLordTime = false;
            }
        },
        // 返回websocket
        getConfigResult (res) {
            var _this = this
            // 接收回调函数返回数据的方法
            console.log(res)
            res = JSON.parse(res)
            console.log(res.type)
            if(res.type=="leaveRoom"){
                if(res.status == "success"){
                    this.$Notice.success({
                        title: "leave room success!"
                    })
                    _this.socketApi.shutDownWebsocket()
                    this.$router.push("/hall")
                }else if(res.status =="error"){
                    this.$Notice.error({
                        title: res.cause
                    })
                }else if(res.userId){
                    var rel = this.judgeRelation(res.seat)
                    if(rel==1){
                        this.rightScore = ''
                        this.rightUserName = ''
                        this.userIds[res.seat - 1] = ''
                    }
                    this.$Notice.error({
                    title:"有人离开了房间"
                })
                }
            }else if(res.type=="enterRoom"){
                this.userIds[res.seat - 1] = res.userId
                console.log(this.userIds)
                var rel = this.judgeRelation(res.seat)
                if(rel==1){
                    this.rightUserName = res.userName
                    this.rightScore = res.score
                }else if (rel==2){
                    this.leftUserName = res.userName
                    this.leftScore = res.score
                }
                this.$Notice.message({
                    title:"有人加入了房间"
                })
            }else if(res.type=="ready"){

            }else if(res.type=="unready"){

            }else if(res.type=="dealCards"){
                this.gameStart();

            }else if(res.type=="getLord"){

            }else if(res.type=="competeLord"){

            }else if(res.type=="passLord"){

            }else if(res.type=="doubleScore"){

            }else if(res.type=="getBaseCards"){

            }else if(res.type=="play"){

            }
        },
        // 测试开始出牌
        testPlay(){
            this.gameStart(),
            this.snatchLordTime = false
            this.callLordTime = false
            this.cardTime = true
        },
        // 测试叫地主
        testCall(){
            this.gameStart(),
            this.snatchLordTime = false
            this.callLordTime = true
            this.cardTime = false
        },
        // 测试抢地主
        testSnatch(){
            this.gameStart(),
            this.snatchLordTime = true
            this.callLordTime = false
            this.cardTime = false
        },
        // 下家叫地主
        ACall(){
            this.ACallLandLord=1
            this.callLordSeat = 1
        },
        // 下家不叫
        ANotCall(){
            this.passLordTime += 1;
            this.ACallLandLord = 2
        },
        // 上家叫地主
        BCall(){
            this.BCallLandLord=1
            this.callLordSeat = 2
            this.callLordTime = false;
            this.snatchLordTime = true;
        },
        // 上家不叫
        BNotCall(){
            this.passLordTime += 1;
            this.BCallLandLord = 2
        },
        // 下家抢地主
        ASnatch(){
            this.snatchLordSeat = 1
            this.ACallLandLord = 3
            this.midScore*=2
        },
        // 下家不抢
        ANotSnatch(){
            this.ACallLandLord = 4
        },
        // 上家抢地主
        BSnatch(){
            this.snatchLordSeat = 2
            this.BCallLandLord = 3
            this.midScore*=2
            this.snatchLordTime = true
        },
        // 上家不抢
        BNotSnatch(){
            this.BCallLandLord = 4;
            this.snatchLordTime = true
        },
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
    mounted(){
        // --------------------------------------测试用---------------------------------------------------
        this.nSelfSeat = this.$store.state.seat
        console.log(this.nSelfSeat)
        this.userIds[this.nSelfSeat - 1] = this.$store.state.userID
        console.log(this.userIds)
        var object = {
            type: "emptyResponse",
        }
        this.socketApi.sendSock(object, this.getConfigResult)
    }
}
</script>

// css代码
<style scoped>
.container{
    width: 100%;
    height: 100%;
    color: #475164;
    /*background-image: url(/static/assets/GameDesk.jpg);*/
}
.leftContainer{
    width: 15%;
    float: left;
    height: 100%;
    border-style: solid; 
}
.centerContainer{
    width: 70%;
    float: left;
    height: 100%;
}
.topContainer{
    height: 45%;
    border-style: solid; 
}
.bottomContainer{
    height: 55%;
    border-style: solid; 
}
.rightContainer{
    width: 15%;
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
    margin-top:30%;
    border-style: ridge; 
}
.remains{
    width: 30%;
    height: 10%;
    margin-top: 70%;
    margin-left: auto;
    margin-right: auto;
}
.userName{
    margin-top:40%;
    width:auto;
    margin-left: auto;
    margin-right: auto;
}
.score{
    margin-bottom: 15%;
}
.dipai{
    border-style: solid; 
    width: 30%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1ex;
    margin-bottom: 3%;
}
.midScore{
    width: 30%;
    font-weight: bold;
    font-size: 30px; 
    border-style: solid; 
    margin-left: auto;
    margin-right: auto;
    margin-top: 13%;
    margin-bottom: 1%;
}
.userMsg {
    font-weight: bold;
    margin-left: 4%;
    margin-right: 4%;
    display: inline;
}
.buttonContainer {
    width: 10%;
    margin-top: 1%;
    margin-left: 19%;
    margin-right: 19%;
}
</style>