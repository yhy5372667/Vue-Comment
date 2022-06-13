<template>
  <div class="home">
      <Header/>
      <el-container class="content">
          <Menu/>
        <el-container>
          <el-main>
            <Bread/>
            <div class="cont">
              <router-view></router-view>
            </div>
          </el-main>
          <el-footer> <Footer/> </el-footer>
        </el-container>  
      </el-container>
  </div>
</template>

<script>
import Header from './comment/Header.vue'
import Footer from './comment/Footer.vue'
import Menu from './comment/Menu.vue'
import Bread from './comment/Breadcrumb.vue'
export default {
  data(){
    return{}
  },
  components:{
    Header,
    Footer,
    Menu,
    Bread
  }
}
</script>


<style lang="less" scoped>
  .home{
    width: 100%;
    height: 100%;
    .content{
      position: absolute;
      width: 100%;
      top: 60px;
      bottom: 0;
      .cont{
        margin: 20px 0;
      }
    }
  }
</style>
