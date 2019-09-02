<!--
 * 登录组件
 * @create liurongtang 2019/07/08
-->
<template>
  <div class="container-home">
    <!-- 4个模块布局 -->
    <div class="content-daiban-new" @click="jumpPro()">
      <div class="content" >
        <div class="left">
          <span class="Tile">项目登录</span>
          <span class="TileExplain">新增项目且报价</span>
        </div>
        <div class="right">
          <img class="imgSrc" src="../assets/4.png" />
        </div>
      </div>
    </div>
    <div class="content-account-new" @click="jumpBj()">
      <div class="content"  >
        <div class="left">
          <span class="Tile">新增报价</span>
          <span class="TileExplain">现有项目进行报价</span>
        </div>
        <div class="right">
          <img class="imgSrc" src="../assets/5.png" />
        </div>
      </div>
    </div>
    <div class="content-gonggao-new" @click="jumpProList()">
      <div class="content" >
        <div class="left">
          <span class="Tile">修改报价</span>
          <span class="TileExplain">现有报价修改,项目状态修改</span>
        </div>
        <div class="right">
          <img class="imgSrc" src="../assets/6.png" />
        </div>
      </div>
    </div>
    <div class="content-customer-new" @click="jumpGg()">
      <div class="content" >
        <div class="left">
          <span class="Tile">公告</span>
          <span class="TileExplain">
            <a style="color:#FFA958">{{tzCount}}</a> / {{tzCount}}
          </span>
        </div>
        <div class="right">
          <img class="imgSrc" src="../assets/7.png" />
        </div>
      </div>
    </div>

    <!-- 右侧 -->
    <div class="personalStatistics-Left">
      <div class="type">
        <div class="navigationBlock"></div>个人统计信息
      </div>
      <div class="border"></div>

      <!-- 个人统计上 -->
      <div class="top">
        <div class="GRTJ">
          <img src="../assets/3.png" />
        </div>
        <span class="number">
          <div class="num">{{xmsCount}}</div>
          <div class="GRTJcontent">项目登录数</div>
        </span>
      </div>
      <!-- 个人统计中 -->
      <div class="Middle">
        <div class="GRTJ">
          <img src="../assets/1.png" />
        </div>
        <span class="number">
          <div class="num">{{bjsCount}}</div>
          <div class="GRTJcontent">报价项目数</div>
        </span>
      </div>
      <!-- 个人统计下 -->
      <div class="bottom">
        <div class="GRTJ">
          <img src="../assets/2.png" />
        </div>
        <span class="number">
          <div class="num">{{qysCount}}</div>
          <div class="GRTJcontent">签约项目数</div>
        </span>
      </div>
    </div>
    <!-- 左侧 -->
    <div class="personalStatistics-right">
      <div class="type">
        <div class="navigationBlock"></div>项目信息
      </div>
      <div class="border"></div>
            <div>
        <vxe-table
          border
          highlight-hover-row
          show-overflow
          resizable
          class="userformsTable"
           :data.sync="xmList"
        >
          <vxe-table-column field="KHMC" title="项目名称"></vxe-table-column>
          <vxe-table-column field="DZ" title="项目地址"></vxe-table-column>
          <vxe-table-column field="KHMC" title="客户名称"></vxe-table-column>
          <vxe-table-column field="LPMC" title="楼盘名称"></vxe-table-column>
          <vxe-table-column field="JZLX" title="建筑类型"></vxe-table-column>
          <vxe-table-column field="XMZT" title="项目状态"></vxe-table-column>
          <vxe-table-column field="SFBJ" title="是否报价"></vxe-table-column>
         <vxe-table-column field="ZDSJ" title="制单日期"></vxe-table-column>
        </vxe-table>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "Axios";
import $ from "jquery";

//页面初始化时执行方法
export default {
  data() {
    return {
        processRecords:[],
        xmList:[],
        xmsCount:0,
        bjsCount:0,
        qysCount:0,
        tzCount:0
    };
  },
  created: function(){
    //根据决色 显示对应的东西
    $(document).attr("title","锐服精准报价系统");
    //$(".tools label").html("锐服精准报价系统1");
    //通过计时器 设置标题
    var SetIntnv = setInterval(function() {
      if($(".tools label").length != 0){
        clearInterval(SetIntnv);
        $(".tools label").html("锐服精准报价系统");
      }
    }, 1000);

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
          this.xmsCount=res.xmsCount;
          this.bjsCount=res.bjsCount;
          this.qysCount=res.qysCount;
          this.tzCount=res.tzCount;
          //组装菜单
          for (var i = 0; i < res.xmList.length; i++) {
            var objectNotice = {
              id:i,
              KHMC:res.xmList[i].KHMC,
              DZ:res.xmList[i].DZ,
              YHMC:res.xmList[i].YHMC,
              LPMC:res.xmList[i].LPMC,
              JZLX:res.xmList[i].JZLX,
              XMZT:res.xmList[i].XMZT,
              SFBJ:'否',
              ZDSJ:res.xmList[i].ZDSJ,
            };
            //将菜单PUSH到全局变量中
            this.xmList.push(objectNotice);
          }


          
        }
      }
    }
  },
  methods: {
    jumpGg(){
        var url = "/dlsuserforms/公告/0/0";
        this.$router.push({ path: url });
    },
    jumpProList(){
        var url = "/dlsuserforms/零售客户信息/0/0";
        this.$router.push({ path: url });
    },
    jumpBj(){
        var url = "/NewForm/销售报价/0/0";
        this.$router.push({ path: url });
    },
    jumpPro(){
        var url = "/NewForm/零售客户信息/0/0";
        this.$router.push({ path: url });
    },
    getFormData() {
      //获取表单
      Axios.post(
        this.baseUrl + "HttpUtil/GetSaleHomeDataHandler.ashx",
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
    
  },
   //页面渲染时调用初始化用户信息方法
    mounted() {
      this.getFormData();
    }
};
</script>

<style lang="scss">
html,
body {
  height: 100%;
}
body {
  margin: 0;
}
.num {
  font-size: 18px;
  color: #6b6b6b;
  font-weight: bold;
}
.GRTJcontent {
  font-size: 14px;
  color: #b0b0b0;
  padding-top: 5px;
}
.GRTJ {
  float: left;
  width: 40%;
  text-align: right;
  padding-right: 20px;
  padding-top: 80px;
}
.number {
  float: left;
  padding-top: 70px;
  text-align: center;
}
.Tile {
  position: absolute;
  top: 20px;
  color: #615f5f;
  left: 25px;
}
.TileExplain {
  position: absolute;
  top: 50px;
  font-size: 14px;
  color: #b0b0b0;
  left: 25px;
}
.personalStatistics-Left {
  width: 24.2%;
  margin-top: 1%;
  height: 75%;
  min-height: 650px;
  background-color: #fff;
  float: left;
  border-radius: 10px;
}
.personalStatistics-Left .top {
  width: 92%;
  height: 15%;
  min-height: 199px;
  border-bottom: 1px solid #eef5fc;
  margin-left: 4%;
}
.personalStatistics-Left .Middle {
  width: 92%;
  height: 15%;
  min-height: 199px;
  border-bottom: 1px solid #eef5fc;
  margin-left: 4%;
}
.personalStatistics-Left .bottom {
  width: 92%;
  height: 15%;
  min-height: 199px;
  border-bottom: 1px solid #eef5fc;
  margin-left: 4%;
}
.personalStatistics-right {
  width: 74.6%;
  margin-top: 1%;
  height: 75%;
  min-height: 650px;
  background-color: #fff;
  float: left;
  border-radius: 10px;
  margin-left: 1%;
}
.container-home {
  width: 100%;
  height: 100%;
  background-color: #eef5fc;
  padding: 0px;
  font-size: 14px;
  /*外部间距也是如此设置*/
  margin-top: 0px;
  margin-bottom: 0px;
  /*统一设置高度为100%*/
  height: 100%;
  float: left;
}
.content-daiban-new {
  width: 24.2%;
  height: 30%;
  min-height: 100px;
  background-color: #fff;
  float: left;
  border-radius: 10px;
  /*   background-image: url(../assets/4.png); */
  cursor: pointer;
}
.content-daiban-new .left {
  float: left;
  width: 60%;
  height: 100%;
  font-size: 18px;
  text-align: center;
  position: relative;
}
.content-daiban-new .right {
  float: right;
}
.content-daiban-new .imgSrc {
  padding: 50px 10px 0px 0px;
}

.content-account-new {
  width: 24.2%;
  margin-left: 1%;
  height: 30%;
  min-height: 100px;
  background-color: #fff;
  float: left;
  border-radius: 10px;
  cursor: pointer;
}
.content-account-new .left {
  float: left;
  width: 60%;
  height: 100%;
  font-size: 18px;
  text-align: center;
  position: relative;
}
.content-account-new .right {
  float: right;
}
.content-account-new .imgSrc {
  padding: 50px 10px 0px 0px;
}
.content-gonggao-new {
  width: 24.2%;
  margin-left: 1%;
  height: 30%;
  min-height: 100px;
  background-color: #fff;
  float: left;
  margin-top: 0px;
  border-radius: 10px;
  cursor: pointer;
}
.content-gonggao-new .left {
  float: left;
  width: 60%;
  height: 100%;
  font-size: 18px;
  text-align: center;
  position: relative;
}
.content-gonggao-new .right {
  float: right;
}
.content-gonggao-new .imgSrc {
  padding: 50px 10px 0px 0px;
}
.content-customer-new {
  width: 24.2%;
  margin-left: 1%;
  height: 30%;
  min-height: 100px;
  background-color: #fff;
  float: left;
  margin-top: 0px;
  border-radius: 10px;
  cursor: pointer;
}
.content-customer-new .left {
  float: left;
  width: 60%;
  height: 100%;
  font-size: 18px;
  text-align: center;
  position: relative;
}
.content-customer-new .right {
  float: right;
}
.content-customer-new .imgSrc {
  padding: 50px 10px 0px 0px;
}
.content-daili {
  width: auto;
  left: 250px;
  right: 38px;
  top: 450px;
  bottom: 30px;
  height: auto;
  background-color: #fff;
  position: absolute;
  overflow-y: auto;
}
.title {
  width: 100%;
  height: 40px;
  line-height: 40px;
  margin-bottom: 6px;
}
.titleLeft {
  width: 58%;
  height: 100%;
  text-align: left;
  float: left;
  padding-left: 2%;
}
.titleRight {
  width: 38%;
  height: 100%;
  text-align: right;
  float: left;
  padding-right: 2%;
}
.titleLeft2 {
  width: 59%;
  height: 100%;
  text-align: left;
  float: left;
  padding-left: 1%;
}
.titleRight2 {
  width: 39%;
  height: 100%;
  text-align: right;
  float: left;
  padding-right: 1%;
}
.daiban-content {
  width: 100%;
  height: 30px;
  line-height: 30px;
}
.account-content {
  width: 100%;
  height: 150px;
}
.hr1 {
  width: 96%;
  height: 1px;
  border: none;
  border-top: 1px solid #f3f6fc;
}
.hr2 {
  width: 96%;
  height: 1px;
  border: none;
  border-top: 1px dashed #f1f1f1;
}
.accountmain {
  width: 80%;
  margin-left: 10%;
  height: 120px;
  margin-top: 15px;
  border-right: none;
}
.accountleft {
  width: 40%;
  height: 100%;
  float: left;
  text-align: right;
  padding-right: 10%;
  margin-top: 8px;
}
.accountright {
  width: 50%;
  height: 100%;
  float: left;
  margin-top: 8px;
}
.accountright1 {
  width: 100%;
  height: 49%;
  line-height: 30px;
}
.accountright2 {
  width: 100%;
  height: 49%;
  color: blue;
}
.title table {
  text-align: center;
}
.title table tr {
  height: 30px !important;
  font-size: 14px !important;
  line-height: 30px;
}
.title table tr:nth-child(odd) {
  background: #f4f4f4;
}
.title table tr:nth-child(5) {
  background: #f2f6fa;
  color: #fff;
}
</style>