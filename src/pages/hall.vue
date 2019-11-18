// html代码
<template>
    <div class="'container">
        <div class="leftContainer">
            <List header="房间列表" border>
                <ListItem v-for="room in allRoom" :key="room.index">
                    <p style="margin-left:auto;margin-right:auto;">房间号：{{room.roomNumber}}，成员：{{room.id1}},{{room.id2}},{{room.id3}} <Button type="primary">加入</Button></p>
                </ListItem>
            </List>
        </div>
        <div class="rightContainer">
            <List split="false" size="large">
                <ListItem><Button style="primer">创建房间</Button></ListItem>
                <ListItem><Button style="primer">加入房间</Button></ListItem>
                <ListItem><Button style="primer">自动匹配</Button></ListItem>
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
      ]
    };
  }
};
</script>

// css代码
<style scoped>
.leftContainer{
    float: left;
    width: 60em;
}
.rightContainer{
    float: right;
    width: 30em;
}
.container{
    width: 100em;
    height: 100ex;
}
</style>