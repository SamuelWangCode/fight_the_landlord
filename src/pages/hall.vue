// html代码
<template>
    <div class="'container">
        <div class="leftContainer">
            <List header="房间列表" border>
                <ListItem v-for="room in allRoom" :key="room.index">
                    <p style="margin-left:auto;margin-right:auto;">roomId：{{room.roomNumber}}, playerNumber: {{room.playerNumber}}<Button type="primary" @click="enterRoomHandler(room.roomNumber)" :disabled = room.joinButtonDisabled>join the room</Button></p>
                </ListItem>
            </List>
        </div>
        <div class="rightContainer">
            <List :split='false' size="large">
                <ListItem><Button style="primer" @click="createRoomHandler">create room</Button></ListItem>
                <ListItem><Button style="primer" @click="joinRoomButtonTapped">join room</Button></ListItem>
                <div>
                <Modal :value="showModal" ok-text="OK" cancel-text="cancel" @on-ok = "enterRoomHandler(joinRoomNumber)" :closable="false" @on-cancel="cancel">
                    <Input v-model="joinRoomNumber" placeholder="please enter the room ID"></Input>
                </Modal>
                </div>
                <ListItem><Button style="primer">automatic matching</Button></ListItem>
                <ListItem><Button style="primer" to="information">self information</Button></ListItem>
            </List>
        </div>
    </div>
</template>

// javaScript代码
<script>
export default {
  name: "Hall",
  data() {
    return {
      joinRoomNumber: '',
      showModal:false,
      allRoom: [
        // { roomNumber: "12", playerNumber: "1", joinButtonDisabled: false},
        // { roomNumber: "13", playerNumber: "1", joinButtonDisabled: false},
        // { roomNumber: "14", playerNumber: "1", joinButtonDisabled: false},
        // { roomNumber: "15", playerNumber: "1", joinButtonDisabled: false}
      ],
      split: false
    };
  },
  methods:{
      cancel(){
          showModal = false;
      },
    createRoomHandler(){
        var object = {
            type: "createRoom",
        }
        this.socketApi.sendSock(object, this.getConfigResult)
    },
    enterRoomHandler(roomNumber){
        var object = {
            type: "enterRoom",
            roomId: roomNumber,
        }
        this.socketApi.sendSock(object, this.getConfigResult)
        this.showModal = false
    },
    joinRoomButtonTapped(){
        this.showModal = true
    },
    getConfigResult (res) {
      // 接收回调函数返回数据的方法
      console.log(res)
      res = JSON.parse(res)
      console.log(res.type)
      if(res.type=="createRoom"){
          console.log("创建房间")
          if(res.status=="success"){
              console.log("创建房间成功")
              this.$Notice.success({
                  title: "Create Room Success!"
                })
              this.$router.push("/gameRoom")
          }else if(res.status=="error"){
              console.log("没创成功")
              this.$Notice.error({
                  title: res.cause
              })
          }
      }else if(res.type=="enterRoom"){
          console.log("加入房间")
          if(res.status=="success"){
              console.log("加入房间成功")
              this.$Notice.success({
                  title: "Enter Room Success!"
                })
              this.$router.push("/gameRoom")
          }else if(res.status=="error"){
              console.log("没加入成功")
              this.$Notice.error({
                  title: res.cause
              })
          }
      }else if(res.type=="roomlist"){
          console.log("获取房间列表")
          var i = 0
          while(res.list[i]){
              this.allRoom[i].roomNumber = res.list[i].roomId
              this,allRoom[i].playerNumber = res.list[i].userNum
              if(res.list[i].userNum == 3){
                  this,allRoom[i].joinButtonDisabled = true
              }
          }
      }
    }
  },
  mounted(){

  }
};
</script>

// css代码
<style scoped>
.leftContainer{
    margin-top:5%;
    float: left;
    width: 60em;
}
.rightContainer{
    margin-top:5%;
    float: right;
    width: 30em;
}
.container{
    width: 100em;
    height: 100ex;
}
</style>