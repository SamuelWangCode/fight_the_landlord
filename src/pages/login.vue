// html代码
<template>
<div class="formList">
  <Form ref="formInline" :model="formInline" :rules="ruleInline">
    <FormItem prop="user">
      <Input type="text" v-model="formInline.user" placeholder="Username" maxlength="10" @keyup.enter.native="handleSubmit('formInline')">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="formInline.password" placeholder="Password" maxlength="20" @keyup.enter.native="handleSubmit('formInline')">
        <Icon type="ios-lock-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
    </FormItem>
    <FormItem>
      <Button type="text" to="/register">don't have an account? Create one</Button>
    </FormItem>
  </Form>
</div>
</template>

// javaScript代码
<script>
import Cookie from "../api/cookie"
import axios from "../api/axios"
export default {
  name: "Login",
  data() {
    return {
      formInline: {
        user: "",
        password: ""
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: "Please fill in the user name",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Please fill in the password.",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "The password length cannot be less than 6 bits",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          var data = {
            username:this.formInline.user,
            password:this.formInline.password
          }
          axios.login(data).then(Response=>{
            console.log(Response)
            if(Response.data.status=="success"){
              this.$Message.success("Success");
              Cookie.setCookie("userID",Response.data.id);
              this.$store.commit("change",Response.data.id);
              this.$router.push("/hall")
            }else if(Response.data.status=="fail"&&Response.data.error=="wrong password"){
              this.$Message.error("Your username or password is wrong.");
            }else{
              this.$Message.error("Can't connect to server");
            }
          })
        } else {
          this.$Message.error("Please enter your name and password.");
        }
      });
    },
  },
};
</script>

// css代码
<style scoped>
    .formList{
        margin-top:10%;
        margin-left: auto;
        margin-right: auto;
        width: 30em;
    }
</style>