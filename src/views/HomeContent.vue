<!--
 * 登录组件
 * @create liurongtang 2019/07/08
-->
<template>
  
  <div class="container-home">
    <div class="content-daiban">
        <div class="title">
            <div class="titleLeft"><img src="/static/img/1.png"/>&nbsp;&nbsp;待办事项</div>
            <div class="titleRight" @click="jumpMoreDb()" style="cursor:pointer">更多>></div>
            <hr style="width:96%;height:1px;border:none;border-top:1px solid #F3F6FC;"/>
        </div>
        <div class="daiban-content" style="cursor:pointer" v-for="item in noticelist " v-bind:key='item.id' @click="jump(item.id,item.ShortTitle)">
            <div class="titleLeft">·&nbsp;&nbsp;{{item.Subject}}</div>
            <div class="titleRight">{{item.SendTime}}</div>
            <hr style="width:96%;height:1px;border:none;border-top:1px dashed #F1F1F1;"/>
        </div>
    </div>
    <div class="content-account">
        <div class="title">
            <div class="titleLeft"><img src="/static/img/1.png"/>&nbsp;&nbsp;本周新增账号</div>
            <div class="titleRight"></div>
            <hr class="hr1"/>
        </div>
        <div class="account-content">
            <div class="accountmain">
                <div style="width:33%;height:60px;float:left;border:1px solid #F3F6FC;border-left:none;border-top:none;">
                    <div class="accountleft">
                      <img src="/static/img/2.png" style="margin-top:10px;"/>
                    </div>
                    <div class="accountright">
                      <div class="accountright1">代理商</div>
                      <div class="accountright2">{{curWeekCount["dlsCount"]}}</div>
                    </div>
                </div>
                <div style="width:32%;height:60px;float:left;border:1px solid #F3F6FC;border-top:none;">
                    <div class="accountleft">
                      <img src="/static/img/3.png" style="margin-top:10px;"/>
                    </div>
                    <div class="accountright">
                      <div class="accountright1">经销商</div>
                      <div class="accountright2">{{curWeekCount["jxsCount"]}}</div>
                    </div>
                </div>
                <div style="width:33%;height:60px;float:left;border:1px solid #F3F6FC;border-top:none;border-right:none;">
                    <div class="accountleft">
                      <img src="/static/img/4.png" style="margin-top:10px;"/>
                    </div>
                    <div class="accountright">
                      <div class="accountright1">工程商</div>
                      <div class="accountright2">{{curWeekCount["gcsCount"]}}</div>
                    </div>
                </div>
                <div style="width:33%;height:60px;float:left;border:1px solid #F3F6FC;border-left:none;border-bottom:none;">
                    <div class="accountleft">
                      <img src="/static/img/5.png" style="margin-top:10px;"/>
                    </div>
                    <div class="accountright">
                      <div class="accountright1">销售人员</div>
                      <div class="accountright2">{{curWeekCount["xsCount"]}}</div>
                    </div>
                </div>
                <div style="width:32%;height:60px;float:left;border:1px solid #F3F6FC;border-bottom:none;">
                    <div class="accountleft">
                      <img src="/static/img/6.png" style="margin-top:10px;"/>
                    </div>
                    <div class="accountright">
                      <div class="accountright1">维修人员</div>
                      <div class="accountright2">{{curWeekCount["wxCount"]}}</div>
                    </div>
                </div>
                <div style="width:33%;height:60px;float:left;border:1px solid #F3F6FC;border-bottom:none;border-right:none;">
                    <div class="accountleft">
                      <img src="/static/img/7.png" style="margin-top:10px;"/>
                    </div>
                    <div class="accountright">
                      <div class="accountright1">调试人员</div>
                      <div class="accountright2">{{curWeekCount["tsCount"]}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="content-gonggao">
        <div class="title">
            <div class="titleLeft"><img src="/static/img/1.png"/>&nbsp;&nbsp;公告新闻</div>
            <div class="titleRight" @click="jumpMoreGg()" style="cursor:pointer">更多>></div>
            <hr class="hr1"/>
        </div>
        <div class="daiban-content" style="cursor:pointer" v-for="item in gglist " v-bind:key='item.id' @click="jump(item.id,item.ShortTitle)">
            <div class="titleLeft">·&nbsp;&nbsp;{{item.Subject}}</div>
            <div class="titleRight">{{item.SendTime}}</div>
            <hr style="width:96%;height:1px;border:none;border-top:1px dashed #F1F1F1;"/>
        </div>
    </div>
    <div class="content-customer">
        
        <div class="title">
            <div class="titleLeft"><img src="/static/img/1.png"/>&nbsp;&nbsp;代理商零售客户信息</div>
            <div class="titleRight" @click="jumpMoreCust()" style="cursor:pointer">更多>></div>
            <hr class="hr1" style="width:98%;margin-left:1%;"/>
            <template>
              <table border="0" cellspacing="1" cellpadding="0" style="width:98%;margin-left:1%;">
                  <thead>
                      <tr style="background-color:#BED9F4;">
                          <td>公司名称</td>
                          <td>公司类别</td>
                          <td>信息登录数</td>
                          <td>首登率</td>
                          <td>报价项目数</td>
                          <td>项目签约数</td>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="item in proList " v-bind:key='item.id'>
                          <td>{{item.GSMC}}</td>
                          <td>{{item.GSLX}}</td>
                          <td>{{item.XMS}}</td>
                          <td>{{item.SDL}}</td>
                          <td>{{item.BJS}}</td>
                          <td>{{item.QYS}}</td>
                      </tr>
                  </tbody>
              </table>
          </template>
        </div>
    </div>
    <div class="content-daili">
        <div class="title">
            <div class="titleLeft2"><img src="/static/img/1.png"/>&nbsp;&nbsp;代理商信息</div>
            <div class="titleRight2" @click="jumpMoreDls()" style="cursor:pointer">更多>></div>
            <hr class="hr1"/>
            <template>
              <table border="0" cellspacing="1" cellpadding="0" style="width:96%;margin-left:2%;">
                  <thead>
                      <tr style="background-color:#BED9F4;">
                          <td>公司名称</td>
                          <td>公司类别</td>
                          <td>销售人员</td>
                          <td>调试人员</td>
                          <td>维修人员</td>
                          <td>经销商</td>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="item in accountList " v-bind:key='item.id'>
                          <td>{{item.GSMC}}</td>
                          <td>{{item.GSLX}}</td>
                          <td>{{item.XSCOUNT}}</td>
                          <td>{{item.TSCOUNT}}</td>
                          <td>{{item.WXCOUNT}}</td>
                          <td>{{item.JXSCOUNT}}</td>
                      </tr>
                  </tbody>
              </table>
            </template>
        </div>
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
        ],
        checkPass: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ]
      },
      checked: true,
      noticelist:[],
      gglist:[],
      proList:[],
      accountList:[],
      curWeekCount:{}
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
          for (var i = 0; i < res.noticeList.length; i++) {
            var objectNotice = {
              id:res.noticeList[i].DataId,
              SendTime:String(res.noticeList[i].SendTime).substring(0,10),
              Subject:res.noticeList[i].Subject,
              ShortTitle:res.noticeList[i].ShortTitle,
            };
            //将菜单PUSH到全局变量中
            this.noticelist.push(objectNotice);
          }
          for(var i = 0;i<res.ggList.length;i++){
            var objectGg = {
              id:res.ggList[i].DataId,
              SendTime:String(res.ggList[i].SendTime).substring(0,10),
              Subject:res.ggList[i].Subject,
              ShortTitle:res.ggList[i].ShortTitle,
            };
            this.gglist.push(objectGg);
          }

          for(var i = 0;i<res.proList.length;i++){
            var objectGg = {
              id:i,
              GSMC:res.proList[i].GSMC,
              GSLX:res.proList[i].GSLX,
              XMS:res.proList[i].XMS == null ? "-" : res.proList[i].XMS,
              BJS:res.proList[i].BJS == null ? "-" : res.proList[i].BJS,
              QYS:res.proList[i].QYS == null ? "-" : res.proList[i].QYS,
              SDL:res.proList[i].SDL == null ? "-" : res.proList[i].SDL
            };
            this.proList.push(objectGg);
          }

          for(var i = 0;i<res.accountList.length;i++){
            var objectGg = {
              id:i,
              GSMC:res.accountList[i].GSMC,
              GSLX:res.accountList[i].GSLX,
              JXSCOUNT:res.accountList[i].JXSCOUNT == null ? "-" : res.accountList[i].JXSCOUNT,    
              XSCOUNT:res.accountList[i].XSCOUNT == null ? "-" : res.accountList[i].XSCOUNT,
              TSCOUNT:res.accountList[i].TSCOUNT == null ? "-" : res.accountList[i].TSCOUNT,
              WXCOUNT:res.accountList[i].WXCOUNT == null ? "-" : res.accountList[i].WXCOUNT
            };
            this.accountList.push(objectGg);
          }

          if(res.curWeekCount != undefined && res.curWeekCount != null){
            this.curWeekCount["dlsCount"] = res.curWeekCount["dlsCount"];
            this.curWeekCount["jxsCount"] = res.curWeekCount["jxsCount"];
            this.curWeekCount["gcsCount"] = res.curWeekCount["gcsCount"];
            this.curWeekCount["xsCount"] = res.curWeekCount["xsCount"];
            this.curWeekCount["wxCount"] = res.curWeekCount["wxCount"];
            this.curWeekCount["tsCount"] = res.curWeekCount["tsCount"];
          }
        }
      }
    }
  },
  methods: {
    jump(id,shortTitle){
        var url = "/NewForm/" + shortTitle + "/" + id + "/0";
        this.$router.push({ path: url });
        //this.$router.replace(moduleUrl);   //调整代理商主页 
        // this.$router.push({ path:moduleUrl});
        // this.$refs.maindiv.style.display="none";
    },
    jumpMoreDb(){
        var url = "/Notice/收件/待处理/0";
        this.$router.push({ path: url });
    },
    jumpMoreGg(){
        var url = "/userforms/公告/0/0";
        this.$router.push({ path: url });
    },
    jumpMoreCust(){
        var url = "/Reports/代理商零售信息分析";
        this.$router.push({ path: url });
    },
    jumpMoreDls(){
        var url = "/Reports/渠道商人员结构分析";
        this.$router.push({ path: url });
    },
    getFormData() {
      //获取表单
      Axios.post(
        this.baseUrl + "HttpUtil/GetHomeDataHandler.ashx",
        {
          // 参数 username
          username: sessionStorage.getItem("curusercode")
        },
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      )
      //将获取到的接口值 赋给info；
      .then(response => (this.infonew = response.data))
      .catch(function(error) {
        alert(error);
      });
    },
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
              //modify by liulinqing 20190716去除初始化菜单
              //this.initeMenu($.trim(this.userInputFormData.account));//初始化菜单路由       
              //this.$router.push("/");//跳转本部主页
              this.$router.push("/AgentHome");   //调整代理商主页 
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
  },
   //页面渲染时调用初始化用户信息方法
  mounted() {
    this.getFormData();
  }
};

</script>

<style lang="scss">
    html,body{
        height: 100%;
    }
    body{
        margin: 0;
    }
    .container-home{
        width:100%;
        height:100%;
        background-color:#eef5fc;
        padding: 0px;
        font-size:14px;
         /*外部间距也是如此设置*/
        margin-top: 0px;
        margin-bottom: 0px;
        /*统一设置高度为100%*/
        height: 100%;
        float:left;
    }
    .content-daiban{
        width:49.5%;
        height:30%;
        min-height:200px;
        background-color:#fff;
        float:left;
    }
    .content-account{
        width:49.5%;
        margin-left:1%;
        height:30%;
        min-height:200px;
        background-color:#fff;
        float:left;
    }
    .content-gonggao{
        width:49.5%;
        height:30%;
        margin-top:10px;
        min-height:200px;
        background-color:#fff;
        float:left;
    }
    .content-customer{
        width:49.5%;
        margin-left:1%;
        margin-top:10px;
        height:30%;
        min-height:200px;
        background-color:#fff;
        float:left;
    }
    .content-daili{
        width:auto;
        left:250px;
        right:38px;
        top:450px;
        bottom:30px;
        height:auto;
        background-color:#fff;
        position: absolute;
        overflow-y:auto;
    }
    .title{
        width:100%;
        height:40px;
        line-height:40px;
        margin-bottom: 6px;
    }
    .titleLeft{
        width:58%;
        height:100%;
        text-align: left;
        float:left;
        padding-left:2%;
    }
    .titleRight{
        width:38%;
        height:100%;
        text-align: right;
        float:left;
        padding-right: 2%;
    }
    .titleLeft2{
        width:59%;
        height:100%;
        text-align: left;
        float:left;
        padding-left:1%;
    }
    .titleRight2{
        width:39%;
        height:100%;
        text-align: right;
        float:left;
        padding-right: 1%;
    }
    .daiban-content{
        width:100%;
        height:30px;
        line-height:30px;
    }
    .account-content{
        width:100%;
        height:150px;
    }
    .hr1 {
        width:96%;
        height:1px;
        border:none;
        border-top:1px solid #F3F6FC;
    }
    .hr2{
        width:96%;
        height:1px;
        border:none;
        border-top:1px dashed #F1F1F1;
    }
    .accountmain{
        width:80%;
        margin-left:10%;
        height:120px;
        margin-top:15px;border-right:none;
    }
    .accountleft{
        width:40%;
        height:100%;
        float:left;
        text-align:right;
        padding-right:10%;
        margin-top:8px;
    }
    .accountright{
        width:50%;
        height:100%;
        float:left;
        margin-top:8px;
    }
    .accountright1{
        width:100%;
        height:49%;
        line-height:30px;
    }
    .accountright2{
        width:100%;
        height:49%;
        color:blue;
    }
    .title table{
       text-align: center;
    } 
    .title table tr{
       height: 30px !important;
       font-size:14px !important;
       line-height:30px;
    } 
    .title table tr:nth-child(odd){background:#F4F4F4;}
    .title table tr:nth-child(5){background:#F2F6FA;color:#FFF;}
</style>