<!--
 * 登录组件
 * @create liurongtang 2018/07/08
-->
<template>
  
  <div class="container-login">
    <div>
          <img src="../assets/loginBg.jpg" class="bgmImg"/>
    </div>
    <div class="container">
      <el-form
        :model="userInputFormData"
        :rules="userInputRules"
        ref="userInputFormData"
        label-position="left"
        label-width="0px"
        class="demo-ruleForm login-container"
      >
        <el-form-item style="width:100%;text-align:center;">
          <!-- <img src="../assets/loginTittle.png" style="width:98%" /> -->
          <a class="loginTiittle"></a>
        </el-form-item>

        <el-form-item prop="account" class="account-login">
          <i class="icon-user-input"></i>
          <el-input
            type="text"
            v-model="userInputFormData.account"
            auto-complete="off"
            class="login-user-input"
            id="loginUserInput"
            placeholder="请输入账号"
            @input="checkInput"
          ></el-input>
          <i class="icon-clean-account" @click="cleanAccountInput"></i>
        </el-form-item>
        <el-form-item prop="checkPass" class="password-login">
          <i class="icon-password-input"></i>
          <el-input
            type="password"
            v-model="userInputFormData.checkPass"
            auto-complete="off"
            class="login-password-input"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button
            type="primary"
            style="width:100%;height:55px;font-size:25px;margin-top:95px;"
            @click.native.prevent="handleSubmit"
            
          >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { requestLogin } from "../api/api";
import Axios from "Axios";
import echarts from '../views/charts/echarts.vue'
import NewForm from '../views/NewForm.vue'
import Home from '../views/Home.vue'
import materialInformation from '../views/materialInformation.vue'
import materialMaintenance from '../views/materialMaintenance.vue'
import UserForms from '../views/UserForms.vue'
import AgentManager from '../views/AgentManager.vue'
import $ from "jquery";

//页面初始化时执行方法
export default {
  created() {
    var _self = this
    document.onkeydown = function(e) {
      var key = window.event.keyCode;
      if (key === 13) {
        _self.handleSubmit()
      }
    }

  },
  mounted: function(){
    if(this.tname == '1'){
      $(".loginTiittle").append('锐服环境信息管理系统');
    }
    else if(this.tname == '2'){
      $(".loginTiittle").append('锐服精准报价系统');
    }
    else if(this.tname == '3'){
      $(".loginTiittle").append('锐服施工管理系统');
    }
    else if(this.tname == '4'){
      $(".loginTiittle").append('锐服维修管理系统');
    }

  },
  data() {
    return {
      logining: false,
      userInputFormData: { //从输入框同步用户信息的绑定json
      account: "",
      checkPass: ""
      },
      userInputRules: { //保存验证规则的json
        account: [
          { required: true, message: "请输入账号", trigger: "blur" }
        ]
      },
      checked: true,
      tname: this.$route.params.tname,
    };
  },
  methods: {
    //表单提交方法
    handleSubmit(ev) {
      var _this = this;
      this.$refs.userInputFormData.validate(valid => {//用户输入信息验证
        if (valid) {
          this.logining = true;
          var loginParams = {
            username: this.userInputFormData.account,
            password: this.userInputFormData.checkPass
          };
          Axios.post(this.baseUrl +"HttpUtil/LoginValidateHandler.ashx", //ajax发送登录接口请求 
            loginParams,
            {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'} //允许跨域访问
            }
          )
          //获取到的接口值 res并处理；
          .then( res => {
            console.log("登录返回数据：");
            console.log(res.data);
            console.log(res.data.success);
            //验证返回数据显示登录是否成功
            if(res&&res.data&&res.data.success){
              var user='{"name":"'+$.trim(this.userInputFormData.account)+'"}';//封装用户信息json字符串
              sessionStorage.setItem("user", JSON.stringify(user));//session会话保存登录信息
              sessionStorage.setItem("curusercode",res.data.curusercode);
              sessionStorage.setItem("curusername",res.data.curusername);
              sessionStorage.setItem("curdepartment",res.data.curdepartment);
              sessionStorage.setItem("curRole",res.data.curRole);
              sessionStorage.setItem("agent",res.data.agent);
              sessionStorage.setItem("dealer",res.data.dealer);
              sessionStorage.setItem("engineer",res.data.engineer);
              //modify by liulinqing 20190716去除初始化菜单
              //this.initeMenu($.trim(this.userInputFormData.account));//初始化菜单路由
              //设置title
              
              if(res.data.curdepartment == "锐服环境科技"){
                  this.$router.push("/");//跳转本部主页
                  $(document).attr("title","锐服环境信息管理系统");
              }else{
                  this.$router.push("/AgentHome");   //跳转代理商主页
              }
              //this.$router.push("/HomeContent"); //调整至本部主页
            }else{
              this.$message({//弹出错误信息窗口
                  message: res.data.message,//从接口中获取错误的提示数据
                  type: "error"
              });
              console.log("返回数据异常！");
            }
          }) 
          .catch(function(error) {
            console.log(error);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //从接口获取菜单数据方法
    initeMenu(userAccount) {
        var initPath="";
        Axios.post(this.baseUrl +"HttpUtil/GetLeftMenuHandler.ashx", //ajax发送登录接口请求 
          {username:userAccount},
          {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'} //允许跨域访问
          }
        )
        //获取到的接口值 res并处理；
        .then( res => {
          //验证返回数据显示登录是否成功
          if(res&&res.data&&$.trim(res.data.success)==true){
            var dataJson= res.data;//
            var errorJson={
              path: '*',
              hidden: true,
              redirect: { path: '/404' }
            };
            for(var i=0;i<dataJson.data.length;i++){//遍历数据外部数组
            var addRoutesJson={//初始化数组
              path:'/',
              children:[] 
            };
              addRoutesJson.component=Home;//设置home组件
              addRoutesJson.name=dataJson.data[i].moduleTitle;//设置主菜单文本
              addRoutesJson.iconCls=dataJson.data[i].iconCls;//设置主菜单
              for(var j=0;j<dataJson.data[i].submenu.length;j++){//遍历数据内部部数组
                 var addRoutesInnerJson={};//初始化内部json数组
                 if(dataJson.data[i].submenu[j].component=="materialMaintenance"){
                    addRoutesInnerJson.path="/materialMaintenance";//设置子菜单路径传参魔板
                    addRoutesInnerJson.component=materialMaintenance;//设置newform组件
                    addRoutesInnerJson.name=dataJson.data[i].submenu[j].text;//设置子菜单文本
                    addRoutesInnerJson.statisUrl=dataJson.data[i].submenu[j].url;//设置子菜单访问路径
                    if(i==0&&j==0){
                      initPath=dataJson.data[i].submenu[j].url;
                    }
                 }
                 addRoutesJson.children.push(addRoutesInnerJson);// 往children数组添加子菜单json             
              }
              const addRoutes=[addRoutesJson];//路由json封装数组
              this.$router.addRoutes(addRoutes);//路由添加数组
              this.$router.options.routes.push(addRoutesJson);//路由routes添加json
            }
            const errorRoutes=[errorJson];//路由404页面json封装数组
            this.$router.addRoutes(errorRoutes);//路由添加404页面数组
            this.$router.options.routes.push(errorJson);//路由routes添加404页面json
            this.$router.push({ path: initPath });//页面组件切换
          }else{
             console.log("返回数据异常！");
          }
        }) 
        .catch(function(error) {
          console.log(error);
        });        
      
    },
    //设置清空用户名输入按钮状态
    checkInput(val) {
      if (val && "" != $.trim(val)) {
        $(".icon-clean-account").css("visibility", "visible");
      }
      if ("" == $.trim(val)) {
        $(".icon-clean-account").css("visibility", "hidden");
      }
    },
    //清空按钮清空用户名输入的方法
    cleanAccountInput() {
      this.userInputFormData.account = "";
      $(".icon-clean-account").css("visibility", "hidden");
    }
  }
};

</script>

<style lang="scss">
.container-login .container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  height: 100%;
  //background-image: url(../assets/loginBg.jpg);
  background-repeat: no-repeat;
  background-size: cover;
}
.login-container {
  margin-left: 70%;
  margin-top: 16%;
  width: 20%;
  padding: 35px 35px 15px 35px;
  background: transparent;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
}

.icon-user-input {
  position: absolute;
  left: 4%;
  top: 70%;
  background-image: url(../assets/userIcon.png);
  background-size:24px 30px;
  background-repeat: no-repeat;
  background-position: 0px 3px;
  width: 24px;
  height: 35px;
  z-index: 777;
}
.icon-clean-account {
  float: right;
  position: absolute;
  right: 4%;
  top: 80%;
  background-image: url(../assets/loginCleanIcon.png);
  background-size:25px 25px;
  background-repeat: no-repeat;
  background-position: 5px 3px;
  width: 31px;
  height: 30px;
  z-index: 888;
  visibility: hidden;
}
.icon-password-input {
  position: absolute;
  left: 4%;
  top: 160%;
  background-image: url(../assets/passWordIcon.png);
  background-size:24px 30px;
  background-repeat: no-repeat;
  background-position: 0px 3px;
  width: 24px;
  height: 35px;
  z-index: 999;
}

.login-user-input .el-input__inner {
  padding-left: 50px;
  position: absolute;
  font-size: 18px;
  border: 0px;
  z-index: 333;
  height:50px;
  width: 100%;
  margin-top: -5px;
  background: url(../assets/loginInputBg.png);
  background-repeat: no-repeat;
  background-size: cover;
}

.login-password-input .el-input__inner {
  padding-left: 51px;
  position: absolute;
  font-size: 18px;
  border: 0px;
  height:50px;
  z-index: 333;
  margin-top: 28px;
  width: 100%;
  background: url(../assets/loginInputBg.png);
  background-repeat: no-repeat;
  background-size: cover;
}

.account-login .el-form-item__error {
  display:none;
  font-size: 15px;
  top: 65px;
}

.password-login .el-form-item__error {
  font-size: 15px;
  display:none;
  top: 98px;
}

.bgmImg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
}
.loginTiittle{
    font-weight: 600;
    font-size: 25px;
    font-family: Helvetica;
    color: #303030;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -khtml-user-select: none;
    user-select: none;

}
</style>