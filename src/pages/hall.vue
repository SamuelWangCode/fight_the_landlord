// html代码
<template>
    <div class="'container">
        <div class="leftContainer">
            <List header="房间列表" border>
                <ListItem v-if="hasRoom" v-for="room in allRoom" :key="room.index">
                    <p style="margin-left:auto;margin-right:auto;">roomId：{{room.roomNumber}}, playerNumber: {{room.playerNumber}}     <Button type="primary" @click="enterRoomHandler(room.roomNumber)" :disabled = room.joinButtonDisabled>join the room</Button></p>
                </ListItem>
                <ListItem v-else>
                    <p style="margin-left:auto;margin-right:auto;">No room now</p>
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
    hasRoom: false,
      joinRoomNumber: '',
      showModal:false,
      allRoom: [
        // { roomNumber: '', playerNumber: '', joinButtonDisabled: false},
        // { roomNumber: "13", playerNumber: "1", joinButtonDisabled: false},
        // { roomNumber: "14", playerNumber: "1", joinButtonDisabled: false},
        // { roomNumber: "15", playerNumber: "1", joinButtonDisabled: false}
      ],
      split: false
    };
  },
  methods:{
    createRoomList(objectArray){
        objectArray = objectArray ? objectArray : []
        // console.log(objectArray.length)
        if(objectArray.length==0){
            this.hasRoom = false
            console.log(this.hasRoom)
        }else{
            this.hasRoom = true
            var roomList = []
            for(let object of objectArray){
                var roomNumber = object.roomId;
                var playerNumber= object.userNum;
                var joinDisabled = true
                if(playerNumber==3){
                    joinDisabled = true
                }else{
                    joinDisabled = false
                }
                var data = {
                    roomNumber: roomNumber,
                    playerNumber: playerNumber,
                    joinButtonDisabled: joinDisabled
                }
                roomList.push(data)
            }
            return roomList
        }
    },
    cancel(){
          this.showModal = false;
    },
    createRoomHandler(){
        console.log("创建房间按下")
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
              console.log("房间号:" + res.roomId)
              this.$store.commit("changeSeat", res.seat)
              this.$Notice.success({
                  title: "Create Room Success!"
                })
            //   setTimeout(1000)
              this.$store.commit("changeRoom", res.roomId)
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
              this.$store.commit("changeSeat",res.seat)
              this.$store.commit("changeRoom", res.roomId)
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
        //   console.log("获取房间列表")
        //   console.log(res.list)
        var list = res.list?res.list:[]
        if(list.length==0){
            this.hasRoom=false
            return
        }
        else{
            this.allRoom = this.createRoomList(res.list)
        }
        // console.log(this.hasRoom)
        //   console.log("跳出循环")
      }
    }
  },
  mounted(){
      this.socketApi.initWebSocket()
      var object = {
          type: "emptyResponse",
      }
      this.socketApi.sendSock(object, this.getConfigResult)
  }
};
</script>

// css代码
<style scoped>
.leftContainer{
    margin-top:5%;
    float: left;
    width: 60em;
    color: #36292F;
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