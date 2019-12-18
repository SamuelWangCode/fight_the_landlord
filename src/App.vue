// 该页面存放所有或大部分页面共有的内容
<template>
  <div id="app">
    <Layout>
      <Header style="top:0; height:10ex; width:100%;position:fixed; background-color:#274163">
        {{title}}
      </Header>
      <Content style="margin-top:10ex; background-color:white;" >
        <router-view/>
      </Content>
      <Footer style="bottom:0;height:18ex;width:100%; position:fixed;padding:0%">
        <img src="./assets/BottomLogo.png" width="360" height="144" />
      </Footer>
    </Layout>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {      
      title:'Happy Chinese Poker'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #8ABCD1;
}
</style>
