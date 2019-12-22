// html代码
<template>
  <div class="informationContainer">
    <Button @click="backToHall">return</Button>
    <div class="formList">
      <List header="self information"></List>
      <Tabs value="name1">
        <TabPane label="basic information" name="name1">
          <Form :model="basicForm" label-position="left" :label-width="150">
            <FormItem label="user name">
              <Input v-model="basicForm.input1" readonly></Input>
            </FormItem>
            <FormItem label="score">
              <Input v-model="basicForm.input2" readonly></Input>
            </FormItem>
            <FormItem label="game number">
              <Input v-model="basicForm.input3" readonly></Input>
            </FormItem>
            <FormItem label="win rate">
              <Input v-model="basicForm.input4" readonly></Input>
            </FormItem>
          </Form>
        </TabPane>
        <TabPane label="details" name="name2">
          <Form :model="detailForm" label-position="left" :label-width="150">
            <FormItem label="win number">
              <Input v-model="detailForm.input1" readonly></Input>
            </FormItem>
            <FormItem label="lose number">
              <Input v-model="detailForm.input2" readonly></Input>
            </FormItem>
            <FormItem label="peasant number">
              <Input v-model="detailForm.input3" readonly></Input>
            </FormItem>
            <FormItem label="lord number">
              <Input v-model="detailForm.input4" readonly></Input>
            </FormItem>
            <FormItem label="peasant win rate">
              <Input v-model="detailForm.input5" readonly></Input>
            </FormItem>
            <FormItem label="lord win rate">
              <Input v-model="detailForm.input6" readonly></Input>
            </FormItem>
            <FormItem label="last game time">
              <Input v-model="detailForm.input7" readonly></Input>
            </FormItem>
            <FormItem label="game record">
              <Button type="primary" @click="getGameInformation">show game record</Button>
            </FormItem>
          </Form>

          <Modal v-model="modal1" title="Game Record" width="80">
            <Table stripe :columns="columns1" :data="data1"></Table>
          </Modal>
        </TabPane>
        <TabPane label="change password" name="name3">
          <Form ref="passwordForm" :model="passwordForm" :rules="rulePasswordForm">
            <FormItem prop="oldPassword">
              <Input
                type="password"
                v-model="passwordForm.oldPassword"
                placeholder="old-password"
                maxlength="20"
                @keyup.enter.native="handleSubmit('passwordForm')"
              >
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input
                type="password"
                v-model="passwordForm.password"
                placeholder="new-password"
                maxlength="20"
                @keyup.enter.native="handleSubmit('passwordForm')"
              >
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <FormItem prop="confirmPassword">
              <Input
                type="password"
                v-model="passwordForm.confirmPassword"
                placeholder="confirm password"
                maxlength="20"
                @keyup.enter.native="handleSubmit('passwordForm')"
              >
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmit('passwordForm')">Submit</Button>
            </FormItem>
          </Form>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

// javaScript代码
<script>
import Cookie from "../api/cookie"
import axios from "../api/axios"
export default {
  name: "Information",
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter your password"));
      } else {
        if (this.passwordForm.confirmPassword !== "") {
          // 对第二个密码框单独验证
          this.$refs.passwordForm.validateField("confirmPassword");
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter your password again"));
      } else if (value !== this.passwordForm.password) {
        callback(new Error("The two input passwords do not match!"));
      } else {
        callback();
      }
    };
    return {
      passwordForm: {
        oldPassword: "",
        password: "",
        confirmPassword: ""
      },
      rulePasswordForm: {
        oldPassword: [
          {
            required: true,
            message: "Please fill in your old password",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            validator: validatePass,
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "The password length cannot be less than 6 bits",
            trigger: "blur"
          }
        ],
        confirmPassword: [
          {
            required: true,
            validator: validatePassCheck,
            trigger: "blur"
          }
        ]
      },
      modal1: false,
      basicForm: {
        input1: "user name",
        input2: "score",
        input3: "game number",
        input4: "win rate"
      },
      detailForm: {
        input1: "win number",
        input2: "lose number",
        input3: "peasant number",
        input4: "lord number",
        input5: "peasant win rate",
        input6: "lord win rate",
        input7: "last game time"
      },
      columns1: [
        {
          title: "GameID",
          key: "gameID"
        },
        {
          title: "Players",
          key: "players"
        },
        {
          title: "Win or Lose",
          key: "isWin"
        },
        {
          title: "Identity",
          key: "sign"
        },
        {
          title: "Game Time",
          key: "gameTime"
        },
        {
          title: "Score",
          key: "scoreDelta"
        }
      ],
      data1: [
        // {
        //   gameID: "12",
        //   players: "hsq,wjj,yy",
        //   isWin: "win",
        //   sign: "lord",
        //   gameTime: "2019-01-01",
        //   scoreDelta: "+36"
        // },
        // {
        //   gameID: "12",
        //   players: "hsq,wjj,yy",
        //   isWin: "win",
        //   sign: "lord",
        //   gameTime: "2019-01-01",
        //   scoreDelta: "+36"
        // },
        // {
        //   gameID: "12",
        //   players: "hsq,wjj,yy",
        //   isWin: "win",
        //   sign: "lord",
        //   gameTime: "2019-01-01",
        //   scoreDelta: "+36"
        // },
        // {
        //   gameID: "12",
        //   players: "hsq,wjj,yy",
        //   isWin: "win",
        //   sign: "lord",
        //   gameTime: "2019-01-01",
        //   scoreDelta: "+36"
        // }
      ]
    };
  },
  computed: {
    userID: function() {
      var userID = this.$store.state.userID;
      if (userID == -1) {
        userID = Cookie.getCookie("userID");
        if (userID != -1) {


          this.$store.commit("change", userID);
        }
      }
      return userID
    }
  },
  mounted() {
    var data = {
      id: this.userID
    };
    console.log(data);
    var allGameNumber = 0;
    axios.getUserBasicInfo(data).then(Response => {
      console.log(Response);
      this.basicForm.input1 = Response.data.USER_NAME;
      this.basicForm.input2 = Response.data.USER_SCORE;
      allGameNumber = Response.data.USER_WINNUM + Response.data.USER_LOSENUM;
      this.basicForm.input3 = allGameNumber;
      this.basicForm.input4 = Response.data.USER_WINNUM / allGameNumber;
      this.detailForm.input1 = Response.data.USER_WINNUM;
      this.detailForm.input2 = Response.data.USER_LOSENUM;
    });
    axios.getUserDetailInfo(data).then(Response => {
      console.log(Response);

      this.detailForm.input3 =
        Response.data.USER_PEASANT_WINNUM + Response.data.USER_PEASANT_LOSENUM;
      this.detailForm.input4 =
        Response.data.USER_LORD_WINNUM + Response.data.USER_LORD_LOSENUM;
      this.detailForm.input5 =
        Response.data.USER_PEASANT_WINNUM /
        (Response.data.USER_PEASANT_WINNUM +
          Response.data.USER_PEASANT_LOSENUM);
      this.detailForm.input6 =
        Response.data.USER_LORD_WINNUM /
        (Response.data.USER_LORD_WINNUM + Response.data.USER_LORD_LOSENUM);
      this.detailForm.input7 = Response.data.USER_LAST_GAME_TIME;
    });
  },
  methods: {
    getGameInformation(){
      this.modal1 = true
      var data = {
        userId : this.$store.state.userID
      }
      axios.getGameInfo(data).then(Response=>{
        console.log(Response);
        //   gameID: "12",
        //   players: "hsq,wjj,yy",
        //   isWin: "win",
        //   sign: "lord",
        //   gameTime: "2019-01-01",
        //   scoreDelta: "+36"
        var records = Response.data.gameRecord.gameRecords?Response.data.gameRecord.gameRecords:[]
        var dataArray = []
        for(let a of records){
          var ob = {
            gameID: a.GameId,
            players: a.players,
            isWin: a.win,
            sign: a.identity,
            gameTime: a.gameTime,
            scoreDelta: a.score
          }
          dataArray.push(ob)
        }
        this.data1 = dataArray
        // var object = {
        //   gameID: ,
        //   players: ,
        //   isWin: ,
        //   sign: ,
        //   gameTime: ,
        //   scoreDelta: 
        // }
      })
    },
    backToHall(){
      this.socketApi.shutDownWebsocket();
      this.$router.push("/hall")
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          var userID = this.$store.state.userID;
          if (userID == -1) {
            userID = Cookie.getCookie(userName);
          }
          let data = {
            userID: userID,
            oldPWD: this.passwordForm.oldPassword,
            newPWD: this.passwordForm.password
          };
          console.log(data);
          this.changePWD(data).then(Response => {
            if (
              Response.data.status == "fail" &&
              Response.data.error == "wrong password"
            ) {
              this.$Message.error("Your old password is wrong.");
            } else if ((Response.data.status = "success")) {
              this.$Message.success("Success!");
            } else {
              this.$Message.error("Cannot connect to server.");
            }
          });
        } else {
          this.$Message.error("Please enter your old and new password");
        }
      });
    }
  }
};
</script>

// css代码
<style scoped>
.informationContainer {
  margin-top: 2%;
}
.formList {
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}
</style>