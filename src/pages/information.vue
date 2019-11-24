// html代码
<template>
    <div class="informationContainer">
        <div class="formList">
            <List header="self information">
            </List>
            <Tabs value="name1">
                <TabPane label="basic information" name="name1">
                    <Form :model="basicForm" label-position="left" :label-width="150" disabled>
                        <FormItem label="user name">
                            <Input v-model="basicForm.input1"></Input>
                        </FormItem>
                        <FormItem label="score">
                            <Input v-model="basicForm.input2"></Input>
                        </FormItem>
                        <FormItem label="game number">
                            <Input v-model="basicForm.input3"></Input>
                        </FormItem>
                        <FormItem label="win rate">
                            <Input v-model="basicForm.input4"></Input>
                        </FormItem>
                    </Form>
                </TabPane>
                <TabPane label="details" name="name2">
                    <Form :model="detailForm" label-position="left" :label-width="150" disabled>
                        <FormItem label="win number">
                            <Input v-model="detailForm.input1"></Input>
                        </FormItem>
                        <FormItem label="lose number">
                            <Input v-model="detailForm.input2"></Input>
                        </FormItem>
                        <FormItem label="peasant number">
                            <Input v-model="detailForm.input3"></Input>
                        </FormItem>
                        <FormItem label="lord number">
                            <Input v-model="detailForm.input4"></Input>
                        </FormItem>
                        <FormItem label="peasant win rate">
                            <Input v-model="detailForm.input5"></Input>
                        </FormItem>
                        <FormItem label="lord win rate">
                            <Input v-model="detailForm.input6"></Input>
                        </FormItem>
                        <FormItem label="last game time">
                            <Input v-model="detailForm.input7"></Input>
                        </FormItem>
                    </Form>                  
                    <Button type="primary" @click="modal1 = true">show game record</Button>
                    <Modal
                        v-model="modal1"
                        title="Game Record"
                        width= "80">
                        <Table stripe :columns="columns1" :data="data1"></Table>
                    </Modal>
                </TabPane>
                <TabPane label="change password" name="name3">
                    <Form ref="passwordForm" :model="passwordForm" :rules="rulePasswordForm">
                        <FormItem prop="oldPassword">
                        <Input type="text" v-model="passwordForm.oldPassword" placeholder="old-password">
                            <Icon type="ios-lock-outline" slot="prepend"></Icon>
                        </Input>
                        </FormItem>
                        <FormItem prop="password">
                        <Input type="password" v-model="passwordForm.password" placeholder="new-password">
                            <Icon type="ios-lock-outline" slot="prepend"></Icon>
                        </Input>
                        </FormItem>
                        <FormItem prop="confirmPassword">
                        <Input type="password" v-model="passwordForm.confirmPassword" placeholder="confirm password">
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
// var projectName="WSDemo_war";
// var path="localhost:80/"+projectName;
// var poker_websocket = new WebSocket("ws://" + path + "/ws");
// poker_websocket.onmessage=function (ev) {
//         alert("receive "+ev.data)   
//     }
export default {
    name: 'Information',
    data () {
        const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please enter your password'));
                } else {
                    if (this.passwordForm.confirmPassword !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.passwordForm.validateField('confirmPassword');
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please enter your password again'));
                } else if (value !== this.passwordForm.password) {
                    callback(new Error('The two input passwords do not match!'));
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
                    input1: 'user name',
                    input2: 'score',
                    input3: 'game number',
                    input4: 'win rate'
                },
                detailForm: {
                    input1: '',
                    input2: '',
                    input3: '',
                    input4: '',
                    input5: '',
                    input6: '',
                    input7: '',
                },
                columns1: [
                    {
                        title: 'GameID',
                        key: 'gameID'
                    },
                    {
                        title: 'Players',
                        key: 'players'
                    },
                    {
                        title: 'Win or Lose',
                        key: 'isWin'
                    },
                    {
                        title: 'Identity',
                        key: 'sign'
                    },
                    {
                        title: 'Game Time',
                        key: 'gameTime'
                    },
                    {
                        title: 'Score',
                        key: 'scoreDelta'
                    }
                ],
                data1: [
                    {
                        gameID: '12',
                        players: 'hsq,wjj,yy',
                        isWin: 'win',
                        sign: 'lord',
                        gameTime:'2019-01-01',
                        scoreDelta:'+36'
                    },
                    {
                        gameID: '12',
                        players: 'hsq,wjj,yy',
                        isWin: 'win',
                        sign: 'lord',
                        gameTime:'2019-01-01',
                        scoreDelta:'+36'
                    },
                    {
                        gameID: '12',
                        players: 'hsq,wjj,yy',
                        isWin: 'win',
                        sign: 'lord',
                        gameTime:'2019-01-01',
                        scoreDelta:'+36'
                    },
                    {
                        gameID: '12',
                        players: 'hsq,wjj,yy',
                        isWin: 'win',
                        sign: 'lord',
                        gameTime:'2019-01-01',
                        scoreDelta:'+36'
                    }
                ]
            }
    },
    methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    }
  }
}
</script>

// css代码
<style scoped>
.informationContainer{
    margin-top:5%;
}
.formList{
    width:50%;
    margin-left:auto;
    margin-right: auto;
}
</style>