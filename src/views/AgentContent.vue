<!--
 * 登录组件
 * @create liurongtang 2019/07/08
-->
<template>
        <div class="maindiv">
                <div class="modulediv" v-for="item in list " v-bind:key='item.id' @click="jump(item.moduleUrl)">
                    <div class="moduletop" ><img v-bind:src="item.imgSrc"  class="moduleImg" alt=""/></div>
                    <div class="modulebuttom">{{item.moduleName}}</div>
                </div>
        </div>
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
      sysUserCode:sessionStorage.getItem("curusercode"),
      sysUserAvatar: "",
      sysName:"锐服环境业务信息系统",
      form: {
        name: "",
        region: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      routes:[],
      list:[],
      show:true
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
              id:i+1,
              moduleName:res.data[i].moduleTitle,
              imgSrc:res.data[i].iconCls,
              moduleUrl:res.data[i].path,
            };
            //将菜单PUSH到全局变量中
            this.list.push(menuItem);
          }
        }
      }
    }
  },
  methods: {
    jump(moduleUrl){
      this.show=false;
        //console.log(moduleUrl);
        //this.$router.replace(moduleUrl);   //调整代理商主页 
        this.$router.push({ path:moduleUrl});
        //this.$refs.maindiv.style.display="none";
    },
    getFormData() {
      //获取表单
      Axios.post(
        this.baseUrl + "HttpUtil/GetLeftMenuHandler.ashx",
        {
          // 参数 username
          username: this.sysUserCode,
          moduleName:'PC端代理'
        },
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      )
      //将获取到的接口值 赋给info；
      .then(response => (this.infonew = response.data))
      .catch(function(error) {
        alert(error);
      });
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
    this.sysUserName = sessionStorage.getItem("curusername");

    this.getFormData();
  }
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
        width: 100%;
        height: 60%;
        margin: 10px 10px 10px 10px;
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
    }
    .menu-expanded {
      flex: 0 0 230px;
      width: 230px;
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
        background-color: #eef5fc !important;
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
.chartsMenuIcon{
  width:22px;
  height:22px;
  background-size:cover;
  background-image: url("../assets/chartsMenuIcon.png");
  display:inline-block;
}
.modulediv{
    border:1px solid #D3E5F7;
    width:252px;
    height:150px;
    margin-top:5%;
    margin-left:15%;
    float:left;
    text-align: center;
    background-color: #FFF;
    cursor:pointer;
}
.modulediv:hover{
    background-color: #C4C4C4;

}
.maindiv{
    width:94%;
    height:100%;
    margin-left: 3%;
    margin-right:3%;
    background-color: #eef5fc;
}
.modulebuttom{
    width:100%;
    height:60px;
    line-height:60px;
    color:#3154B1;
    font-size: 14px;
}
.moduletop{
    width:100%;
    height:60px;
    line-height:100px;
    margin-top:30px;
    
}
.moduleImg{
    width:55px;
    height:55px;
    

}
.maincontent{
    display:flex;
    position: absolute;
    top:60px;
    bottom:0px;
    background-color: #eef5fc;
}
</style>