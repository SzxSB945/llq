<!--
 * 首页组件
 * @create liurongtang 2018/07/08
-->
<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'" @click="jumpHome()">
        <img src="../assets/systemLogo.png" />
      </el-col>
      <el-col :span="10">
        <div class="tools">
          <label style="color:#0372E6;font-weight:800">{{sysName}}</label>
        </div>
      </el-col>
      <el-col :span="5" class="userinfo">
        <img class="backHomeImg" src='../assets/zhuye.png'>
        <a href='#'  @click="toHomePage" class="backHome">返回首页</a>
        <label style="color:#0372E6;">{{dateFormat("yyyy/MM/dd HH:mm")}}</label>&nbsp;&nbsp;&nbsp;&nbsp;
        <label style="color:#A2A2A2">{{sysUserName}}</label>
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner">
            <img src="../assets/loginOutTriangle.png" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
            <el-dropdown-item @click.native="changePass">修改密码</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>
    <el-col :span="24" class="main">
      <aside :class="collapsed?'menu-collapsed':'menu-expanded'" v-if="this.curdepartment == '锐服环境科技'">
        <!--导航菜单-->
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          unique-opened
          router
          v-show="!collapsed"
        >
          <template v-for="(item,index) in routes" v-if="!item.hidden">
            <el-submenu :index="index+''">
              <template slot="title">
                <div :class="item.iconCls"></div>
                <span>{{item.name}}</span>
              </template>
              <el-menu-item
                v-for="child in item.children"
                :index="child.statisUrl"
                :key="child.statisUrl"
                v-if="!child.hidden"
              >
                <img
                  src="../assets/menuitemtriangle.png"
                  class="menu-item-img"
                  style="visibility:hidden;"
                  width="12px"
                  height="12px"
                />
                <span>{{child.name}}</span>
              </el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </aside>
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="breadcrumb-container">
            <strong class="title">{{$route.name}}</strong>
            <el-breadcrumb separator="/" class="breadcrumb-inner">
              <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">{{ item.name }}</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>
  </el-row>
</template>

<script>
import Axios from "Axios";

//页面加载时初始化方法
import $ from "jquery";

//页面加载时初始化方法
export default {
  data() {
    return {
      collapsed: false,
      sysUserName: "",//登录名
      sysUserAvatar: "",
      sysName:"锐服环境信息管理系统",
      form: {
        name: "",
        region: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      curdepartment:"",
      routes:[]
    };
  },
  computed: {
    //首次获取数据时
    infonew: {
      get: function() {
        //通过get后的数据 就行获取返回数据
        return this.infonew;
      },
      set: function(res) {
        //如果返回值为false 则alert出 错误信息
        if (res.success == false) {
          this.$alert("获取数据出错:" + res.message, {
            confirmButtonText: "确定"
          });
          return;
        } else {
          //组装菜单
          for (var i = 0; i < res.data.length; i++) {
            var menuItem = {
              name:res.data[i].moduleTitle,
              iconCls:res.data[i].iconCls,
              children:[]
            };
            if (res.data[i].submenu) {
              for (var s = 0; s < res.data[i].submenu.length; s++) {
                menuItem.children.push({
                  path: res.data[i].submenu[s].path,
                  component: res.data[i].submenu[s].component,
                  name: res.data[i].submenu[s].text,
                  statisUrl: res.data[i].submenu[s].url
                });
              }
            }
            //将菜单PUSH到全局变量中
            this.routes.push(menuItem);
          }
        }
      }
    }
  },
  methods: {
    toHomePage() {
      var url = '';
      var curdepartment = sessionStorage.getItem("curdepartment");
      if(curdepartment == "锐服环境科技"){
        url = '/HomeContent';
      }else{
        url = '/AgentContent';
      }
      this.$router.push({ path: url });
    },
    jumpHome(){
       this.$router.push("/HomeContent");   //调整代理商主页 
    },
    getFormData() {
      if(this.curdepartment == '锐服环境科技'){
          //获取表单
          Axios.post(
            this.baseUrl + "HttpUtil/GetLeftMenuHandler.ashx",
            {
              // 参数 username
              username: sessionStorage.getItem("curusercode"),
              moduleName:'PC端本部'
            },
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
          )
          //将获取到的接口值 赋给info；
          .then(response => (this.infonew = response.data))
          .catch(function(error) {
            alert(error);
          });
          this.$router.push("/HomeContent");
      }
    },
    //提交方法
    onSubmit() {
      console.log("submit!");
    },
    //注销登录方法
    logout: function() {
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {})
        .then(() => {
          sessionStorage.removeItem("user");//session会话中移除用户信息
          _this.$router.push("/login");//跳转登录页面
        })
        .catch(() => {});
    },
    changePass: function(){
      this.$router.push({ path: '/changePassword' });
    },
    //展示菜单方法
    showMenu(i, status) {
      this.$refs.menuCollapsed.getElementsByClassName(
        "submenu-hook-" + i
      )[0].style.display = status ? "block" : "none";
    },
    //获取当前系统时间
    dateFormat(fmt) {
      var nowDate = new Date();
      var o = {
        "M+": nowDate.getMonth() + 1, //月份
        "d+": nowDate.getDate(), //日
        "h+": nowDate.getHours() % 12 == 0 ? 12 : nowDate.getHours() % 12, //小时
        "H+": nowDate.getHours(), //小时
        "m+": nowDate.getMinutes(), //分
        "s+": nowDate.getSeconds(), //秒
        "q+": Math.floor((nowDate.getMonth() + 3) / 3), //季度
        S: nowDate.getMilliseconds() //毫秒
      };
      var week = {
        "0": "/u65e5",
        "1": "/u4e00",
        "2": "/u4e8c",
        "3": "/u4e09",
        "4": "/u56db",
        "5": "/u4e94",
        "6": "/u516d"
      };
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (nowDate.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      }
      if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (RegExp.$1.length > 1
            ? RegExp.$1.length > 2
              ? "/u661f/u671f"
              : "/u5468"
            : "") + week[nowDate.getDay() + ""]
        );
      }
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
        }
      }
      return fmt;
    }
  },
   //页面渲染时调用初始化用户信息方法
  mounted() {
    //modify by liulinqing 20190723获取用户信息更改
    // var userInfo = sessionStorage.getItem("user");//session中获取用户方法
    // var userReg=this.util.userReg(userInfo);//正则表达式去反斜杆双引号  
    // var user = JSON.parse(userReg);
    // this.sysUserName=user.name;
    this.sysUserName = sessionStorage.getItem("curusername");
    
    this.curdepartment = sessionStorage.getItem("curdepartment")
    this.getFormData();
  },

};
</script>

<style scoped lang="scss">
@import "~scss_vars";

.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  .header {
    height: 60px;
    line-height: 60px;
    background: rgb(255, 255, 255);
    color: #fff;
    border-bottom: 1px solid rgb(189, 212, 233);
    .userinfo {
      font-size: 16px;
      font-weight: 400;
      font-style: normal;
      text-decoration: none;
      text-align: right;
      height: 60px;
      padding-right: 35px;
      color: black;
      float: right;
      .userinfo-inner {
        cursor: pointer;
        color: #fff;
        img {
          width: 13px;
          height: 13px;
          float: right;
          margin-right: 8px;
          margin-left: 15px;
        }
      }
    }
    .logo {
      height: 60px;
      font-size: 22px;
      padding-left: 20px;
      padding-right: 20px;
      border-color: rgba(238, 241, 146, 0.3);
      border-right-width: 1px;
      border-right-style: solid;
      img {
        /*
        width: 100%;
        height: 60%;*/
        width: 140px;
        height: 25px;
        margin: 16px 10px 10px 10px;
      }
      .txt {
        color: #fff;
      }
    }
    .logo-width {
      width: 230px;
    }
    .logo-collapse-width {
      width: 60px;
    }
    .tools {
      padding: 0px 20px;
      width: 300px;
      height: 60px;
      color: black;
      font-family: 微软雅黑;
      font-size: 18px;
      line-height: 60px;
      cursor: pointer;
    }
  }
  .main {
    display: flex;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;
    aside {
      flex: 0 0 230px;
      width: 230px;
      .el-menu {
        height: 100%;
        background-image: url(../assets/leftMenuBg.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;
        overflow: auto;
      }
      .collapsed {
        width: 60px;
        .item {
          position: relative;
        }
        .submenu {
          position: absolute;
          top: 0px;
          left: 60px;
          z-index: 99999;
          height: auto;
          display: none;
        }
      }
    }
    .menu-collapsed {
      flex: 0 0 60px;
      width: 60px;
      overflow:auto;
    }
    .menu-expanded {
      flex: 0 0 230px;
      width: 230px;
      overflow:auto;
    }
    .content-container {
      flex: 1;
      overflow-y: scroll;
      padding: 20px;
      .breadcrumb-container {
        .title {
          width: 200px;
          float: left;
          color: #475669;
        }
        .breadcrumb-inner {
          float: right;
        }
      }
      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
}
.workMenuIcon{
 width:22px;
 height:22px;
 background-size:cover;
 background-image: url("../assets/workMenuIcon.png");
 display:inline-block;
}
.accountMenuIcon{
 width:22px;
 height:22px;
 background-size:cover;
 background-image: url("../assets/accountMenuIcon.png");
 display:inline-block;
}
.recieveMenuIcon{
 width:22px;
 height:22px;
 background-size:cover;
 background-image: url("../assets/recieveMenuIcon.png");
 display:inline-block;
}
.loginMenuIcon{
 width:22px;
 height:22px;
 background-size:cover;
 background-image: url("../assets/loginMenuIcon.png");
 display:inline-block;
}
.serviceMenuIcon{
 width:22px;
 height:22px;
 background-size:cover;
 background-image: url("../assets/serviceMenuIcon.png");
 display:inline-block;
}
.gcsMenuIcon{
 width:22px;
 height:22px;
 background-size:cover;
 background-image: url("../assets/gcsMenuIcon.png");
 display:inline-block;
}
.chartsMenuIcon{
  width:22px;
  height:22px;
  background-size:cover;
  background-image: url("../assets/chartsMenuIcon.png");
  display:inline-block;
}
.backHome{
  color: black;
  font-weight: bold;
  text-decoration: none;
  font-size: 16px;
  padding-right: 20px;
}
.backHomeImg{
  width: 20px;  
  position: relative;
  top: 2px;
}

</style>