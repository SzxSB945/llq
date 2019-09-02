<!--
 * 项目自带的app组件
 * @create liurongtang 2018/07/08
-->
<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {}
};
</script>

<style lang="scss">
body {
  margin: 0px;
  padding: 0px;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
}

#app {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
}

.el-submenu [class^="fa"] {
  vertical-align: baseline;
  margin-right: 10px;
}

.el-menu-item [class^="fa"] {
  vertical-align: baseline;
  margin-right: 10px;
}

.toolbar {
  background: #f2f2f2;
  padding: 10px;
  margin: 10px 0px;
  .el-form-item {
    margin-bottom: 10px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.el-submenu__icon-arrow {
  display: none !important;
}

.el-submenu__title:hover {
  background-color: transparent !important;
}

.el-menu-item:hover {
  background-color: transparent !important;
}

.el-menu-item {
  color: white !important;
  padding-left: 85px !important;
}

.el-submenu__title {
  color: white !important;
  font-size: 17px !important;
  padding-left: 55px !important;
}

.el-menu {
  background-color: transparent !important;
}

.is-opened .el-submenu__title {
  background-color: rgba(0, 0, 0, 0.3) !important;

  color: white !important;
}
.el-menu-item.is-active img {
  visibility: visible !important;
}

</style>