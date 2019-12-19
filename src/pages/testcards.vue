// html代码
<template>
    <div class="container">
        <div class="leftContainer">
            <div style="float:left; width:80%">
                <img src="../assets/beimian.png" alt="扑克牌背面" class="img">
            </div>
            <div class="timer">
                30
            </div>
            <div class="remains">
                17
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
                    192
                </div>
                <button type="sumbit" v-on:click="changeaCards">按钮</button>
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
            <div class="remains">
                17
            </div>
            <div class="userName">
                卢本伟
            </div>
            <div class="score">
                score：300
            </div>
        </div>
        <cards
                :aCards="aCards"
                :aOutCards="aOutCards"
                oAgaOut=[]
                nCallLandlord=2
                :aSelfSelectCards="aSelfSelectCards"
                @onChangeSelectCards="handleChangeSelectCards"
                ></cards>
    </div>
</template>

// javaScript代码
<script>
import cards from '../components/Card/cards';



export default {
    name: 'testCard',
    components: {
        cards
    },
    data() {
        return{
            aSelfSelectCards:[],
            aCards : [1,2,3],
            aOutCards:[
            {
                value:5
            },
            {
                value:6
            }
            ],

        }
    },
    methods:{
        changeaCards(){
            this.aCards = [2,3,4];
            console.log("he");
        },
        handleChangeSelectCards(aCards = []){
            this.aSelfSelectCards = aCards;
            console.log("hi");
        }
    }
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