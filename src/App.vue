// 该页面存放所有或大部分页面共有的内容
<template>
  <div id="app">
    <Layout>
      <Header style="top:0; height:10ex; width:100%;position:fixed;">header</Header>
      <Content style="margin-top:10ex; background-color:white;" >
        <router-view/>
      </Content>
      <Footer style="bottom:0;height:10ex;width:100%; position:fixed;">footer</Footer>
    </Layout>
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
