// html代码
<template>
  <div class="formList">
    <div style="margin-bottom:50px">
    <img src="/static/assets/GameLogo.png" width="374px" height="140px">
    </div>
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
      <FormItem prop="confirmPassword">
        <Input
          type="password"
          v-model="formInline.confirmPassword"
          placeholder="confirmPassword"
          maxlength="20"
          @keyup.enter.native="handleSubmit('formInline')"
        >
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formInline')">Submit</Button>
      </FormItem>
      <FormItem>
        <Button type="text" to="/login">I had an account. Sign in</Button>
      </FormItem>
    </Form>
  </div>
</template>

// javaScript代码
<script>
import axios from "../api/axios"
import App from "../App"
export default {
  name: "Login",
  data() {
    const validatePass = (rule, value, callback) => {
      console.log("validatePass")
      if (value === "") {
        callback(new Error("Please enter your password"));
      } else {
        if (this.formInline.confirmPassword !== "") {
          // 对第二个密码框单独验证
          this.$refs.formInline.validateField("confirmPassword");
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      console.log("validatePassCheck")
      if (value === "") {
        callback(new Error("Please enter your password again"));
      } else if (value !== this.formInline.password) {
        callback(new Error("The two input passwords do not match!"));
      } else {
        callback();
      }
    };
    return {
      formInline: {
        user: "",
        password: "",
        confirmPassword: ""
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
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          var data = {
            username: this.formInline.user,
            password: this.formInline.password
          };
          console.log(data);
          axios.register(data).then(Response => {
            if (Response.data.status == "success") {
              this.$Message.success("Success!");
              this.$router.push('/login')
            } else if (
              Response.data.status == "fail" &&
              Response.data.error == "repetitive username"
            ) {
              this.$Message.error("Your name has been registered!");
            } else {
              this.$Message.error("Can't connect to server.");
            }
          });
        } else {
          this.$Message.error("Please enter required properties.");
          return;
        }
      });
    }
  }
};
</script>

// css代码
<style scoped>
.formList {
  margin-top: 3%;
  margin-left: auto;
  margin-right: auto;
  width: 30em;
}
</style>