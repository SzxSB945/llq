<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <el-col :span="24">
        <div class="toolsnew">
          <div class="zhengbu" @click="add()">
            <img src="../assets/XZ.png" class="tubiao" />
            <div class="Effect">新增</div>
          </div>
          <div class="zhengbu" @click="edit()">
            <img src="../assets/BJ.png" class="tubiao" />
            <div class="Effect">编辑</div>
          </div>
          <div class="zhengbu" @click="preservation()">
            <img src="../assets/BC.png" class="tubiao" />
            <div class="Effect">保存</div>
          </div>
          <div class="zhengbu" @click="giveUp()">
            <img src="../assets/FQ.png" class="tubiao" />
            <div class="Effect">放弃</div>
          </div>
          <div class="zhengbu" @click="delect()">
            <img src="../assets/SC.png" class="tubiao" />
            <div class="Effect">删除</div>
          </div>
          <div class="zhengbu" @click="exportExcel()">
            <img src="../assets/DC.png" class="tubiao" />
            <div class="Effect">导出</div>
          </div>
<!--           <div class="zhengbu" @click="importExcel()">
            <img src="../assets/PLDR.png" class="tubiao" />
            <div class="Effect">批量导入</div>
          </div> -->
        </div>
      </el-col>
    </el-col>
    <el-col :span="24" class="main">
      <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
        <!--导航菜单-->
        <el-menu class="el-menu-vertical-demo" unique-opened router v-show="!collapsed">
          <template v-for="(item,index) in routes" v-if="!item.hidden">
            <el-submenu :index="index+''">
              <template slot="title">
                <div @click="menuJump(item)" class="menuJumpClass">
                  <img src="../assets/folderClosure.png" style="width: 15px;height: 15px;" />
                  <span style="color:#333333;font-size: 14px">{{item.name}}</span>
                </div>
              </template>
              <el-menu-item
                v-for="(child,index) in item.children"
                :index="child.statisUrl"
                :key="index"
                v-if="!child.hidden"
              >
                <span style="color:#666666">{{child.name}}</span>
              </el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </aside>
      <div class="encase">
        <el-col class="content-wrapper waibu">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-col>
      </div>
      <div style="display: none;">
        <UserForms ref="refName" :viewName="viewName" detailed="DC"></UserForms>
      </div>

      <el-dialog title="上传" v-model="addFormVisible" :close-on-click-modal="true">
        <el-form ref="addForm">
          <el-upload
            class="upload-demo"
            action="http://192.168.1.183:8097/HttpUtil/ImportExcel.ashx"
          :on-change="handleChange"
          :on-success="handleAvatarSuccess"
          :file-list="fileList3"
          >
            <el-button size="small" type="primary">点击导入excel</el-button>

          </el-upload>
        </el-form>
      </el-dialog>
    </el-col>
  </el-row>
</template>

<script>
import Axios from "Axios";

//页面加载时初始化方法
import $ from "jquery";

import UserForms from "@/views/UserForms.vue";

export default {
  data() {
    return {
      collapsed: false,
      routes: [],
      user: sessionStorage.getItem("curusercode"),
      username: "",
      viewName: "物资分类信息",
      addFormVisible: false,
      fileList3: []
    };
  },
  mounted() {
    this.getFormData();
    $(".content-container").addClass("spacing");
    $(".menu-expanded").addClass("navigationBackground");
  },
  computed: {
    //首次获取数据时
    infonew: {
      get: function() {
        //通过get后的数据 就行获取返回数据
        return this.infonew;
      },
      set: function(res) {
        this.routes = [];
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
              ID: res.data[i].ID,
              name: res.data[i].WZFLBH + " " + res.data[i].WZFLMC,
              baseUrl:
                "/materialMaintenance/NewForm/" +
                res.shortTitle +
                "/" +
                res.data[i].ID+"/0",
              children: []
            };
            if (res.data[i].subClass) {
              for (var s = 0; s < res.data[i].subClass.length; s++) {
                menuItem.children.push({
                  name:
                    res.data[i].subClass[s].WZFLBH +
                    " " +
                    res.data[i].subClass[s].WZFLMC,
                  statisUrl:
                    "/materialMaintenance/NewForm/" +
                    res.shortTitle +
                    "/" +
                    res.data[i].subClass[s].ID+"/0"
                });
              }
            }
            //将菜单PUSH到全局变量中
            this.routes.push(menuItem);
          }
        }
      }
    },

    infodata: {
      get: function() {
        //通过get后的数据 就行获取返回数据
        return this.infodata;
      },
      // set为  infpdata的返回数据
      set: function(res) {
        // 如果返回值为false 则alert出 错误信息
        if (res.success == false) {
          this.$alert("获取数据出错:" + res.message, {
            confirmButtonText: "确定"
          });
        } else {
          // 否则 成功
          this.$alert("数据保存成功", {
            confirmButtonText: "确定"
          }).then(() => {
            // 跳转到上一个页面
            this.cancel();
          });
        }
      }
    },

    delectData: {
      get: function() {
        //通过get后的数据 就行获取返回数据
        return this.delectData;
      },
      // set为  infpdata的返回数据
      set: function(res) {
        // 如果返回值为false 则alert出 错误信息
        if (res.success == false) {
          this.$alert("获取数据出错:" + res.message, {
            confirmButtonText: "确定"
          });
        } else {
          // 否则 成功
          this.$alert("删除成功保存成功", {
            confirmButtonText: "确定"
          }).then(() => {
            // 跳转到上一个页面
            this.getFormData();
            //this.cancel();
          });
        }
      }
    }
  },
  methods: {
    //新增
    add() {
      var url = "/NewForm/物资分类信息/0/0";
      this.$router.push({ path: url });
    },
    //编辑
    edit() {
      var id = this.$route.params.id;
      if (this.$route.params.name == "物资分类信息" && id != "0") {
        $("input,select,textarea").attr("ReadOnly", false);
        $("input,select,textarea").css("background-color", "#FFFFFF");
      }
    },
    //保存
    preservation() {
      //保存时获取数据 组装成json传入接口，保存数据。
      var data = { ID: this.$route.params.id };
      var setData = {};
      var contentHasSave = true;
      $("input,select,textarea").each(function() {
        //保存时验证是否为必填
        if ($(this).attr("dbmust") == "yes" && $(this).val() == "") {
          alert("标_必填");
          contentHasSave = false;
          return false;
        } else {
          //没有必填则组装data数据
          if (this.name == "") {
            return;
          }
          data[this.name] = this.value;
        }
      });
      //如果 contentHasSave是trun则进入下一步
      if (contentHasSave) {
        // 使用element的提示框
        this.$confirm("是否保存表单内容？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          //点击确认进入步骤
          .then(() => {
            //其他保存时
            setData = {
              //username
              username: this.user,
              //shortTitle
              shortTitle: "物资分类信息",
              //data数据在上方组装
              data
            };
            //将数据组装成{username:”zhangsan”,shortTitle:”物资信息”,data:{name:”电脑”,danwei:”台”}}类型就行post提交
            Axios.post(
              this.baseUrl + "HttpUtil/AddFormDataHandler.ashx",
              setData,
              {
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
              }
            )
              //定义一个全局变量 infodata  在上方 computed函数中执行
              .then(response => (this.infodata = response.data))
              //失败
              .catch(function(error) {
                alert(error);
              });
          })
          //点击取消进入步骤
          .catch(() => {
            // 选择取消
          });
      }
    },
    //放弃
    giveUp() {
      var url = "/materialMaintenance";
      this.$router.push({ path: url });
    },

    //删除
    delect() {
      // 使用element的提示框
      var ID = this.$route.params.id;
      var setData = {};
      if (ID == 0 || ID == undefined) {
        this.$alert("请选择需要删除的数据", {
          confirmButtonText: "确定"
        });
      } else {
        this.$confirm("是否删除表单内容？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          //点击确认进入步骤
          .then(() => {
            //其他保存时
            setData = {
              //username
              username: this.user,
              //shortTitle
              viewName: "物资分类信息",
              //data数据在上方组装
              dataID: this.$route.params.id
            };
            //将数据组装成{username:”zhangsan”,shortTitle:”物资信息”,data:{name:”电脑”,danwei:”台”}}类型就行post提交
            Axios.post(
              this.baseUrl + "HttpUtil/DeleteFormDataHandler.ashx",
              setData,
              {
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
              }
            )
              //定义一个全局变量 infodata  在上方 computed函数中执行
              .then(response => (this.delectData = response.data))
              //失败
              .catch(function(error) {
                alert(error);
              });
          })
          //点击取消进入步骤
          .catch(() => {
            // 选择取消
          });
      }
    },
    /* 导出 */
    exportExcel() {
      var determine = false;
      var Empty = this.$route.params.name;
      if (Empty == undefined) {
        this.$alert("请选择有效数据", {
          confirmButtonText: "确定"
        });
        return;
      } else {
        determine = true;
      }
      // 使用element的提示框
      if (determine) {
        this.$confirm("是否导出EXCEL？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            //其他保存时
            this.$refs.refName.exportExcelnew(this.$route.params.name); //明细传值
          }) //点击取消进入步骤
          .catch(() => {
            // 选择取消
          });
      }
    },
     //上传时赋值
    handleChange(file, fileList) {
      this.fileList3 = fileList.slice(-1);
    },
    //上传成功后返回
    handleAvatarSuccess(res, file) {
      //上传成功时
      if (res.success) {
       this.$alert(res.success, {
          confirmButtonText: "确定"
        });
  this.addFormVisible = false;
      } else {
        this.$alert(res.message, {
          confirmButtonText: "确定"
        });    
      }
            this.addFormVisible = false;
    },
    //导入excel
    importExcel() {
      this.fileList3=[];
      this.addFormVisible = true;
    },
    //取消时
    cancel() {
      this.$router.go(-1);
    },
    getFormData() {
      //获取表单
      Axios.post(
        this.baseUrl + "HttpUtil/GetWZFLMenuHandler.ashx",
        {
          // 参数 username
          username: this.user
        },
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      )
        //将获取到的接口值 赋给info；
        .then(response => (this.infonew = response.data))
        .catch(function(error) {
          alert(error);
          console.log(error);
        });
    },
    //菜单跳转
    menuJump(res) {
      this.$router.push({ path: res.baseUrl });
    }
  },
  destroyed() {
    $(".content-container").removeClass("spacing");
    $(".menu-expanded").removeClass("navigationBackground");
  },
  components: {
    UserForms: UserForms
  }
};
</script>

<style  lang="scss">
/* 整体表单样式 */
.spacing {
  padding: 0 !important;
}
.navigationBackground {
  background-color: #d3e5f7;
}

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
  }
}
.workMenuIcon {
  width: 22px;
  height: 22px;
  background-size: cover;
  background-image: url("../assets/workMenuIcon.png");
  display: inline-block;
}
.accountMenuIcon {
  width: 22px;
  height: 22px;
  background-size: cover;
  background-image: url("../assets/accountMenuIcon.png");
  display: inline-block;
}
.recieveMenuIcon {
  width: 22px;
  height: 22px;
  background-size: cover;
  background-image: url("../assets/recieveMenuIcon.png");
  display: inline-block;
}
.loginMenuIcon {
  width: 22px;
  height: 22px;
  background-size: cover;
  background-image: url("../assets/loginMenuIcon.png");
  display: inline-block;
}
.serviceMenuIcon {
  width: 22px;
  height: 22px;
  background-size: cover;
  background-image: url("../assets/serviceMenuIcon.png");
  display: inline-block;
}
.chartsMenuIcon {
  width: 22px;
  height: 22px;
  background-size: cover;
  background-image: url("../assets/chartsMenuIcon.png");
  display: inline-block;
}

.toolsnew {
  padding: 0px 20px;
  height: 60px;
  color: black;
  font-family: 微软雅黑;
  font-size: 14px;
  line-height: 60px;
  cursor: pointer;
  background-color: #d3e5f7;
}
.zhengbu {
  width: 60px;
  text-align: center;
  height: 59px;
  line-height: 20px;
  float: left;
  color: #666666;
}
.tubiao {
  width: 10px;
  height: 10px;
  padding-top: 16px;
}

.Effect {
  line-height: 14px;
}
.type {
  padding: 20px 20px 10px 20px;
  font-size: 14px;
}
.border {
  border: 1px solid #f3f7fd;
  margin: 0px 20px 0px 20px;
}
.navigationBlock {
  float: left;
  padding: 5px;
  margin: 5px;
  background-color: #0372e6;
}
.waibu {
  height: 100%;
  width: 80%;
  background-color: #ffffff;
  margin: 20px;
}
.encase {
  width: 100%;
  background-color: #eef5fc;
}

.menuJumpClass{
  overflow: hidden;
  text-overflow: ellipsis;
  color: rgb(51, 51, 51);
}
</style>