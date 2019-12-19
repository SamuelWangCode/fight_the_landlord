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
            <div class="userSign">
                农民
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
            </div>
            <div class="bottomContainer">
                <Button class="buttonContainer">Ready</Button>
                <div style="border-style:solid;margin-top:1%;margin-left:3%;margin-right:3%;width:10%;height:20%;display:inline-block;">
                    30
                </div>
                <Button class="buttonContainer">Exit</Button>
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
            <div class="userSign">
                农民
            </div>
        </div>
    </div>
</template>

// javaScript代码
<script>
export default {
    name: 'GameRoom',
    data() {

    },
    methods: {

    }
}
</script>

// css代码
<style scoped>
.container{
    width: 100%;
    height: 100%;
    color: #475164;
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
    height: 50%;
}
.topContainer{
    height: 30%;
    border-style: solid;
}
.bottomContainer{
    height: 25ex;
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
    width: 30%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1ex;
    margin-bottom: 20%;
}
.midScore{
    width: 30%;
    font-weight: bold;
    font-size: 30px; 
    border-style: solid;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1%;
}
.userSign {
    width: 100%;
    font-weight: bold;
    margin-bottom: 20%;
}
.buttonContainer {
    width: 10%;
    margin-top: 1%;
    margin-left: 15%;
    margin-right: 15%;
}
</style>