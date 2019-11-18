// 该页面存放所有或大部分页面共有的内容
<template>
  <div id="app">
    <Header style="height:10ex; margin-bottom:5ex;">header</Header>
    <Content style="height:75ex;">
      <router-view/>
    </Content>
    <Footer style="height:10ex;">footer</Footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
