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
    </div>
</template>

// javaScript代码
<script>
export default {
    name: 'GameRoom',
}
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
    height: 40%;
}
.bottomContainer{
    height: 40%;
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
</style>