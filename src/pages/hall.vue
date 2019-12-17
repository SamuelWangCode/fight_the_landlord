// html代码
<template>
    <div class="'container">
        <div class="leftContainer">
            <List header="房间列表" border>
                <ListItem v-for="room in allRoom" :key="room.index">
                    <p style="margin-left:auto;margin-right:auto;">roomNumber：{{room.roomNumber}}，Members：{{room.id1}},{{room.id2}},{{room.id3}} <Button type="primary">加入</Button></p>
                </ListItem>
            </List>
        </div>
        <div class="rightContainer">
            <List :split='false' size="large">
                <ListItem><Button style="primer" @click="createRoomHandler">create room</Button></ListItem>
                <ListItem><Button style="primer" @click="enterRoomHandler">join room</Button></ListItem>
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
      allRoom: [
        { roomNumber: "12", id1: "aaa", id2: "aa", id3: "a" },
        { roomNumber: "13", id1: "bbb", id2: "bb", id3: "b" },
        { roomNumber: "14", id1: "ccc", id2: "cc", id3: "c" },
        { roomNumber: "15", id1: "ddd", id2: "dd", id3: "d" }
      ],
      split: false
    };
  },
  methods:{
    createRoomHandler(){
        var object = {
            type: "createRoom",
        }
        this.socketApi.sendSock(object, this.getConfigResult)
    },
    enterRoomHandler(){
        var object = {
            type: "createRoom",
            roomId: 1,
        }
        this.socketApi.sendSock(object, this.getConfigResult)
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
              this.$Notice.success("Create Room Success!")
              this.$router.push("/gameRoom")
          }else if(res.status=="error"){
              console.log("没创成功")
              this.$Notice.error(res.cause)
          }
      }else if(res.type=="enterRoom"){
          console.log("加入房间")
          if(res.status=="success"){
              console.log("加入房间成功")
              this.$Notice.success("Enter Room Success!")
              this.$router.push("/gameRoom")
          }else if(res.status=="error"){
              console.log("没加入成功")
              this.$Notice.error(res.cause)
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