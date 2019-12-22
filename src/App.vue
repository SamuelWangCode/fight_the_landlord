// 该页面存放所有或大部分页面共有的内容
<template>
  <div id="app">
    <Layout>
      <Header style="top:0; height:8ex; width:100%;position:fixed; background-color:#274163">
        {{title}}
      </Header>
      <Content style="margin-top:8ex; background-color:white;" >
        <router-view/>
      </Content>
      <Footer style="bottom:0;height:0ex;width:100%; position:fixed;padding:0%">
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
