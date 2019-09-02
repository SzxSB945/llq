<!--
 * 列表显示列
 * @create pengxiaolong 2018/07/03
-->
<template class="userformslist">
  <div>
    <el-row :style="searchIsTop">
      <el-col :span="24">
        <div class="FormTopTitleDiv">
          <div class="FormTopTitleFKDiv"></div>
          <span class="FormTopTitleSpan1"></span>
        </div>
      </el-col>
    </el-row>
    <!--搜索栏-->
    <el-row class="toolBarRpw">
      <el-col :span="24" class="toolbar UserFormsToolbar">
        <el-col :span="24">
          <div class="screenDiv">
            <div class="navigationBlock"></div>
            <span class="screenSpan1">筛选条件</span>
          </div>
        </el-col>

        <el-form
          class="searcgElform"
          :inline="true"
          style="margin-top:50px"
          v-if="screenField.length>0"
        >
           <template v-for="item in screenField">
            <el-form-item
              v-if="item.formtype=='date' || item.formtype=='datetime'"
              :label="item.titleName"
              :key="item.titleKey"
              :prop="item.titleKey"
            >
              <input :id="item.titleKey" @click="onDateFormClick(item.titleKey)" style="height: 34px" v-model="item.values" />
            </el-form-item>
            <el-form-item
              v-if="item.formtype=='input'"
              :label="item.titleName"
              :key="item.titleKey"
              :prop="item.titleKey"
            >
              <input :id="item.titleKey" style="height: 34px" v-model="item.values" />
            </el-form-item>
            <el-checkbox :key="item.titleKey" v-if="item.formtype=='selected'" style="padding: 8px 20px;"  v-model="item.values">{{item.titleName}}</el-checkbox>
            
            <el-form-item
              v-if="item.formtype=='select'"
              :label="item.titleName"
              :key="item.titleKey"
              :prop="item.titleKey"
            >
              <template>
                <select v-model="item.values">
                  <option
                    v-for="selist in getseleArr(item.selectList)"
                    :key="selist"
                    :label="selist"
                    :value="selist"
                  ></option>
                </select>
              </template>
            </el-form-item>

          </template>



          <el-form-item>
            <el-button @click="onSearchClick" type="primary" class="agentAddBtn">
              <i class="el-icon-search agentCustomerButtonIcon"></i> 筛选
            </el-button>
            <el-button @click="ExportFileClick" type="primary" class="agentAddBtn">
              <i class="el-icon-upload agentCustomerButtonIcon"></i>导出
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-row :style="searchIsTop">
      <el-col :span="24">
        <div class="FormTopTitleDiv">
          <div class="FormTopTitleFKDiv"></div>
          <span class="FormTopTitleSpan1"></span>
        </div>
      </el-col>
    </el-row>

    <!--工具条
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
          <el-form-item>
            <el-form-item>
              <el-button @click="ExportFileClick" type="primary" class="agentAddBtn">
                <i class="el-icon-upload agentCustomerButtonIcon"></i>导出
              </el-button>
            </el-form-item>
          </el-form-item>
      </el-form>
    </el-col>-->

    <!--表格-->
    <vxe-table
      :key="tableKey"
      border
      resizable
      show-overflow
      highlight-hover-row
      :footer-method="footerMethod"
      show-footer
      class="userformsTable"
      :height="tableHeight"
      :auto-resize="true"
      :data="tableData"
      :edit-config="editConfig"
      :stripe="isstripe"
      :loading="listLoading"
      :header-cell-class-name="headerCellClassName"
      :cell-class-name="cellClassName"
      ref="xTable1"
    >
      <template v-for="item in rowData">
        <vxe-table-column
          v-if="item.canEdit&&item.mode=='input'"
          :key="item.titleKey"
          :field="getf(item.titleKey)"
          :title="item.titleName"
          :edit-render="{name: 'input'}"
          :width="item.width.substr(0,item.width.length-2)"
          sortable
        ></vxe-table-column>
        <vxe-table-column
          v-else-if="item.canEdit&&item.mode=='input'"
          :key="item.titleKey"
          :field="getf(item.titleKey)"
          :title="item.titleName"
          :edit-render="{name: 'input'}"
          :width="item.width.substr(0,item.width.length-2)"
          sortable
        ></vxe-table-column>
        <vxe-table-column
          v-else-if="item.canEdit&&item.mode=='select'"
          :key="item.titleKey"
          :field="getf(item.titleKey)"
          :title="item.titleName"
          :edit-render="{name: 'default'}"
          :width="item.width.substr(0,item.width.length-2)"
          sortable
        >
          <template v-slot:edit="{ row }">
            <el-select v-model="row[item.titleKey]">
              <el-option
                v-for="selist in getseleArr(item.selectList)"
                :key="row.ID + '_' + selist"
                :label="selist"
                :value="selist"
                :width="item.width"
              ></el-option>
            </el-select>
          </template>
        </vxe-table-column>

        <vxe-table-column
          v-else
          :key="item.titleKey"
          :field="getf(item.titleKey)"
          :title="item.titleName"
          :width="item.width.substr(0,item.width.length-2)"
          sortable
        ></vxe-table-column>
      </template>
    </vxe-table>
  </div>
</template>

<script>
import Vue from "vue";
import VXETable from "vxe-table";
import Axios from "Axios";
import $ from "jquery";
import "vxe-table/lib/index.css";
import XEUtils from "xe-utils";
import { laydate } from "../mock/laydate.js";

Vue.use(VXETable);

export default {
  data() {
    return {
      userinfo: sessionStorage.getItem("curusercode"),
      isstripe: true,
      reponame: this.$route.params.reponame,
      tableData: [],
      rowData: [],
      rowWidthArr: [],
      infodataVal: null,
      //公用定时器
      SetInterval: null,
      //是否渲染选择 表格组件
      tableKey: 0,
      //记录表格编辑前的内容
      tableEditVal: null,
      /*可进行筛选的字段*/
      screenField: [],
      /*筛选条件字符串 如果为0 则为空值*/
      searchStr: "",
      listLoading: false,
      /*表格编辑配置*/
      editCount: 0,
      editConfig: this.getEditConfig(),
      /*是否触发编辑*/
      isTrigEdit: 0,
      numberId: ""
    };
  },
  //传值过来的参数
  props: {},
  created: function() {
    //点击选择进入
    this.fetchData();
  },
  watch: {
    //监听表单参数，当表单切换菜单改变数值时执行
    $route(to, from) {
      this.tableHeight = window.innerHeight - this.$refs.xTable1.$el.offsetTop - 160;
      this.rowWidthArr = [];
      clearInterval(this.SetInterval);
      this.reponame = this.$route.params.reponame;
      this.searchStr ='';
      this.screenField = [];
      this.fetchData();
    },
    tableData: function() {
      //渲染完成后检测表头和表体是否对齐
      var _this = this;
      /*
      clearInterval(_this.SetInterval);
      //表格渲染完成后执行
      _this.$nextTick(function() {
        _this.SetInterval = setInterval(function() {
          if (_this.checkHeadWidth === undefined) return;
          _this.checkHeadWidth();
        }, 100);
      });
      */
     //设置头部 点击事件
      var searchHead = setInterval(function(){
        if($(".headerCellClassName").length != 0){
          clearInterval(searchHead);
          $(".headerCellClassName").on("click",_this.onTableHeadClick);
        }
      },200);

    }
  },
  mounted:function(){
    this.tableHeight = window.innerHeight - this.$refs.xTable1.$el.offsetTop - 160;
    //window.innerHeight:浏览器的可用高度
    //this.$refs.table.$el.offsetTop：表格距离浏览器的高度
    //后面的140：根据需求空出的高度，自行调整
  },
  computed: {
    /*如果存在搜索字段 则修改搜索栏样式*/
    searchIsTop: function() {
      return {
        "padding-bottom": "15px",
        "background-color": "#EEF5FC"
      };
    },
    infodata: {
      get: function() {
        return this.infodataVal;
      },
      set: function(newValue) {
        this.listLoading = false;
        if (!newValue.success) {
          this.$alert("获取数据出错:" + newValue.message, {
            confirmButtonText: "确定"
          });
          return;
        }
        if(this.screenField.length <= 0){
          this.setScreenField();
        }
        

        //初始化数据
        //this.searchStr = "";

        //当从接口拿到数据后
        this.infodataVal = newValue;
        this.rowData = newValue.titleList;

        // 修复最后一列名 显示不完整
        //var tableWidth = parseInt($(".userformsTable").width());
        //var allRowWidth = 0;
        var _this = this;

        for (var i = 0; i < _this.rowData.length; i++) {
          _this.rowWidthArr[i] = parseInt(
          _this.rowData[i].width.substr(0, _this.rowData[i].width.length - 2)
          );
        }
        _this.changeRowWidth();
        window.onresize = function() {
          _this.changeRowWidth();
        };
       

        //加载数据
        this.tableData = newValue.dataList;
        this.tableKey++;
        // 监听事件 去除编辑框的 编辑
        //$(".content-container").on("click", this.onContentContainerClick);
      }
    }
  },
  destroyed:function(){
    //退出页面 关闭计时器
    clearInterval(this.SetInterval);
  },
  methods: {
    changeRowWidth() {
      //动态改变列宽 修复最后一列名 显示不完整
      var tableWidth = parseInt($(".userformsTable").width());
      var allRowWidth = 0;
      var _this = this;
       
      for (var i = 0; i < _this.rowWidthArr.length; i++) {
        allRowWidth += parseInt(_this.rowWidthArr[i]);
      }
      if (allRowWidth < tableWidth) {
        //所有列自动配置
        for (var i = 0; i < _this.rowData.length; i++) {
          this.rowData[i].width = "";
        }
      }else{
        for (var i = 0; i < _this.rowData.length; i++) {
          this.rowData[i].width = _this.rowWidthArr[i] + "px";
        }
      }
    },
    ExportFileClick() {
      var opts = Object.assign({
        filename: this.reponame + ".csv"
      });
      this.$refs.xTable1.exportCsv(opts);
    },
    getEditConfig() {
      var data = {
        key: "idsa",
        trigger: "click",
        mode: "cell",
        showIcon: false,
        autoClear: false
      };
    },
    fetchData() {
      this.listLoading = true;
      var dataAxios = {
        username: this.userinfo,
        reponame: this.reponame,
        filter: this.searchStr
      };
      Axios.post(this.baseUrl + `HttpUtil/GetReportHandler.ashx`, dataAxios)
        .then(response => (this.infodata = response.data))
        .catch(error => this.onerror(error));
    },
    /*表头class*/
    headerCellClassName({ column, columnIndex }) {
      return "headerCellClassName";
    },
    /*单元格class名*/
    cellClassName({ row, rowIndex, column, columnIndex }) {
      return "columStyle";
    },
    //获取字段名
    getf(v) {
      return v;
    },
    getSelectLabel(value, list, valueProp = "value", labelField = "label") {
      var item = list.find(item => item[valueProp] === value);
      return item ? item[labelField] : null;
    },
    /*获取选择框的选项*/
    getseleArr(selectList) {
      var retArr = [];
      var SpArr = selectList.split(";");
      for (var i = 0; i < SpArr.length; i++) {
        retArr.push(SpArr[i]);
      }
      return retArr;
    },
    getKey(item, row) {
      var id = 0;
      if (row.id !== undefined) {
        id = row.id;
      } else if (row.ID !== undefined) {
        id = row.ID;
      }
      console.log(id + "_" + item);
      return id + "_" + item;
    },
    //防止表格头和body 不对齐
    checkHeadWidth() {
      //报表分析 无需如此
      //debugger
      /*var bodyWidth = $(".vxe-table--body-wrapper").css("width");
      var headWidth = $(".vxe-table--header").css("width");
      if (bodyWidth === headWidth) {
        return;
      }
      */
      //var bodyWidth = bodyWidth.substr(0, bodyWidth.length - 2);
      //bodyWidth = parseFloat(bodyWidth) + parseFloat(1);
      //$(".vxe-table--header").css("width", bodyWidth + "px");

    },
    footerMethod({ columns, data }) {
      return [
          columns.map((column, columnIndex) => {
            if (columnIndex === 0) {
              return "总计";
            }
            if (["JXSCOUNT", "XSCOUNT", "WXCOUNT","TSCOUNT","XMS","QYS"].includes(column.property)) {
              return XEUtils.sum(data, column.property);
            }
            return "-";
          })
        ];
    },
    onerror(error) {
      this.$alert("网络请求错误:" + error, {
        confirmButtonText: "确定"
      });
    },
    //设置搜索关键字
    setScreenField() {
      //获取当前时间 当前日期 半年后的日期
      var cdate = new Date();
      var edate = new Date();
      var givenMonth = cdate.getMonth();
      var newMonth = givenMonth - 6;
      edate.setMonth(newMonth);
      
      var curYear = this.rfdateFormt("Y",cdate);
      var curstartDate = this.rfdateFormt("Y-m-d",edate);
      var curendDate = this.rfdateFormt("Y-m-d",cdate);

      this.screenField = [];
      var search = [];
      
      if (this.reponame == "渠道商人员结构分析") {
        search.push({
          titleKey: "ND",
          titleName: "年度：",
          values: curYear,
          formtype: "date"
        });
        search.push({
          titleKey: "DLS",
          titleName: "代理商：",
          values: "",
          formtype: "select",
          selectList: '',
        });
        search.push({
          titleKey: "SELECTDLS",
          titleName: "代理商",
          values: "",
          formtype: "selected"
        });
        search.push({
          titleKey: "SELECTFXS",
          titleName: "经销商",
          values: "",
          formtype: "selected"
        });

        
      }else if (this.reponame == '代理商零售信息分析') {
        search.push({
          titleKey: "KSRQ",
          titleName: "开始日期：",
          values: curstartDate,
          formtype: "datetime"
        });
         search.push({
          titleKey: "JSRQ",
          titleName: "结束日期：",
          values:curendDate,
          formtype: "datetime"
        });
        search.push({
          titleKey: "DLS",
          titleName: "代理商：",
          values: "",
          formtype: "select",
          selectList: '',
        });
        search.push({
          titleKey: "SELECTDLS",
          titleName: "代理商",
          values: "",
          formtype: "selected"
        });
        search.push({
          titleKey: "SELECTFXS",
          titleName: "经销商",
          values: "",
          formtype: "selected"
        });
      } else if('代理商年度任务分析' == this.reponame){
        search.push({
          titleKey: "ND",
          titleName: "年度：",
          values: curYear,
          formtype: "date"
        });
        search.push({
          titleKey: "DLS",
          titleName: "代理商：",
          formtype: "select",
          selectList: '',
          values: "",
        });
      }
      else if('订单分析' == this.reponame || '调试分析' == this.reponame || '维修分析' == this.reponame){
        search.push({
          titleKey: "KSRQ",
          titleName: "开始日期：",
          values: curstartDate,
          formtype: "datetime"
        });
         search.push({
          titleKey: "JSRQ",
          titleName: "结束日期：",
          values: curendDate,
          formtype: "datetime"
        });
        search.push({
          titleKey: "CPMC",
          titleName: "产品名称：",
          values: "",
          formtype: "input"
        });
        search.push({
          titleKey: "CPXH",
          titleName: "产品型号：",
          values: "",
          formtype: "input"
        });
        search.push({
          titleKey: "DLSNAME",
          titleName: "代理商名称：",
          values: "",
          formtype: "select",
          selectList: '',
        });
      }
      
      this.screenField = search;
      this.getDlSList();
    },
    //当点击搜索按钮
    onSearchClick() {
      this.searchStr = "";
      for (var i = 0; i < this.screenField.length; i++) {
        if('selected' == this.screenField[i].formtype){
          var val = '';
          if(this.screenField[i].values){
            val = '1';
          }else{
            val = '0';
          }
          this.searchStr +=
          this.screenField[i].titleKey + "=" + val + "&";
        }else{
          this.searchStr +=
          this.screenField[i].titleKey + "=" + this.screenField[i].values + "&";
        }
      }
      this.searchStr = this.searchStr.substr(0, this.searchStr.length - 1);
      //eDITalert(this.searchStr);

      this.fetchData();
    },
    /*当日期控件触发*/
    onDateFormClick(name) {
      var _this = this;
      laydate({
        elem: "#" + name,
        format: "YYYY-MM-DD", // 分隔符可以任意定义
        istime: true,
        choose: function(dates) {
          var dates2 = dates.split("-")[0];
          for (var i = 0; i < _this.screenField.length; i++) {
            if(name == _this.screenField[i].titleKey){
              if('date' == _this.screenField[i].formtype){
                _this.screenField[i].values = dates2;
                break;
              }else{
                _this.screenField[i].values = dates;
                break;
              }
            }
          }
        }//end choose
      });
    }//end OnDaeFormClick
    ,
    getDlSList(val) {
      //设置 筛选代理商列表
      var _this = this;
      Axios.post(
        this.baseUrl + "HttpUtil/accountManager.ashx", //获取明细数据
        {
          // 参数 username
          action: "GetDlsJxs",
          type: "1"
        },
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      )
        //将获取到的接口值 赋给info；
        .then(function(res) {
          var gsmclist = res.data.data;
          var gslist = '';
          for(var i = 0;i < gsmclist.length;i++){
            gslist += gsmclist[i].GSMC + ";";
          }
          if (_this.reponame == "渠道商人员结构分析" || _this.reponame == '代理商年度任务分析') {
            _this.screenField[1].selectList = gslist;
          }
          if (_this.reponame == "代理商零售信息分析"){
            _this.screenField[2].selectList = gslist;
          }
          if(_this.reponame == "订单分析"
          || _this.reponame == "调试分析" || _this.reponame == "维修分析") {
            _this.screenField[4].selectList = gslist;
          }

        })
        .catch(function(error) {
          alert(error);
        });
    },
     rfdateFormt(format, timestamp) { var that = this; var jsdate, f; var txt_words = ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; var formatChr = /\\?(.?)/gi; var formatChrCb = function (t, s) { return f[t] ? f[t]() : s }; var _pad = function (n, c) { n = String(n); while (n.length < c) { n = "0" + n } return n }; f = { d: function () { return _pad(f.j(), 2) }, D: function () { return f.l().slice(0, 3) }, j: function () { return jsdate.getDate() }, l: function () { return txt_words[f.w()] + "day" }, N: function () { return f.w() || 7 }, S: function () { var j = f.j(); var i = j % 10; if (i <= 3 && parseInt((j % 100) / 10, 10) == 1) { i = 0 } return ["st", "nd", "rd"][i - 1] || "th" }, w: function () { return jsdate.getDay() }, z: function () { var a = new Date(f.Y(), f.n() - 1, f.j()); var b = new Date(f.Y(), 0, 1); return Math.round((a - b) / 86400000) }, W: function () { var a = new Date(f.Y(), f.n() - 1, f.j() - f.N() + 3); var b = new Date(a.getFullYear(), 0, 4); return _pad(1 + Math.round((a - b) / 86400000 / 7), 2) }, F: function () { return txt_words[6 + f.n()] }, m: function () { return _pad(f.n(), 2) }, M: function () { return f.F().slice(0, 3) }, n: function () { return jsdate.getMonth() + 1 }, t: function () { return (new Date(f.Y(), f.n(), 0)).getDate() }, L: function () { var j = f.Y(); return j % 4 === 0 & j % 100 !== 0 | j % 400 === 0 }, o: function () { var n = f.n(); var W = f.W(); var Y = f.Y(); return Y + (n === 12 && W < 9 ? 1 : n === 1 && W > 9 ? -1 : 0) }, Y: function () { return jsdate.getFullYear() }, y: function () { return f.Y().toString().slice(-2) }, a: function () { return jsdate.getHours() > 11 ? "pm" : "am" }, A: function () { return f.a().toUpperCase() }, B: function () { var H = jsdate.getUTCHours() * 3600; var i = jsdate.getUTCMinutes() * 60; var s = jsdate.getUTCSeconds(); return _pad(Math.floor((H + i + s + 3600) / 86.4) % 1000, 3) }, g: function () { return f.G() % 12 || 12 }, G: function () { return jsdate.getHours() }, h: function () { return _pad(f.g(), 2) }, H: function () { return _pad(f.G(), 2) }, i: function () { return _pad(jsdate.getMinutes(), 2) }, s: function () { return _pad(jsdate.getSeconds(), 2) }, u: function () { return _pad(jsdate.getMilliseconds() * 1000, 6) }, e: function () { throw "Not supported (see source code of date() for timezone on how to add support)" }, I: function () { var a = new Date(f.Y(), 0); var c = Date.UTC(f.Y(), 0); var b = new Date(f.Y(), 6); var d = Date.UTC(f.Y(), 6); return ((a - c) !== (b - d)) ? 1 : 0 }, O: function () { var tzo = jsdate.getTimezoneOffset(); var a = Math.abs(tzo); return (tzo > 0 ? "-" : "+") + _pad(Math.floor(a / 60) * 100 + a % 60, 4) }, P: function () { var O = f.O(); return (O.substr(0, 3) + ":" + O.substr(3, 2)) }, T: function () { return "UTC" }, Z: function () { return -jsdate.getTimezoneOffset() * 60 }, c: function () { return "Y-m-d\\TH:i:sP".replace(formatChr, formatChrCb) }, r: function () { return "D, d M Y H:i:s O".replace(formatChr, formatChrCb) }, U: function () { return jsdate / 1000 | 0 } }; this.date = function (format, timestamp) { that = this; jsdate = (timestamp === undefined ? new Date() : (timestamp instanceof Date) ? new Date(timestamp) : new Date(timestamp * 1000)); return format.replace(formatChr, formatChrCb) }; return this.date(format, timestamp) }
    ,onTableHeadClick(e){
      //当表格表头点击的时候 进行排序
      var warp = $(e.target).find("span.vxe-sort-wrapper");
      if(warp.length != 0){
        var topc = warp.find("i.vxe-icon--caret-top");
        var bottomc = warp.find("i.vxe-icon--caret-bottom");
        if(topc.attr("class").indexOf("sort--active") != -1){
          bottomc.click();
        }
        else if(bottomc.attr("class").indexOf("sort--active") != -1){
          topc.click();
        }else{
          topc.click();
        }
      }
    }
    
  }
};
</script>

<style >
/*全局 隐藏页面上的 导航栏*/
.breadcrumb-container {
  display: none;
}

/*userformslist*/
.userformsTable > table > td > input {
  height: 100% !important;
  width: 100% !important;
}

.vxe-input--wrapper .vxe-input {
  border-radius: 0px !important;
}

.vxe-table.t--border .vxe-header--column:last-child {
  border-right: none !important;
}

.content-container {
  background-color: #eef5fc;
}
.userformsTable {
  /*box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);*/
  margin: 15px 15px 30px 15px;
}

/*顶部标题样式*/
.FormTopTitleDiv {
  background-color: white;
  padding: 8px 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  white-space: nowrap;
  text-align: left;
  font-size: 12px;
  font-weight: 700;
  font-style: normal;
  text-decoration: none;
  font-family: 微软雅黑;
  color: rgb(3, 114, 230);
}
.FormTopTitleSpan1 {
  white-space: nowrap;
  text-align: left;
  font-size: 12px;
  font-weight: 700;
  font-style: normal;
  text-decoration: none;
  font-family: 微软雅黑;
  color: rgb(3, 114, 230);
  padding-left: 18px;

  /*border-left: 2px solid #0372e6;*/
}
.FormTopTitleFKDiv {
  width: 12px;
  height: 12px;
  background-color: rgb(3, 114, 230);
  position: absolute;
  top: 50%;
  margin-top: -6px;
}

.FormTopTitleSpan2 {
  white-space: nowrap;
  text-align: left;
  font-size: 12px;
  font-weight: 700;
  font-style: normal;
  text-decoration: none;
  font-family: 微软雅黑;
  color: rgb(3, 114, 230);
}

/*筛选条件样式*/
.screenDiv {
  white-space: nowrap;
  text-align: left;
  font-size: 12px;
  font-weight: 700;
  font-style: normal;
  text-decoration: none;
  font-family: 微软雅黑;
  color: rgb(3, 114, 230);
  padding: 10px 0px;
  border-bottom: 1px solid #f3f6fc;
}

.screenSpan1 {
  white-space: nowrap;
  text-align: left;
  font-size: 14px;
  font-weight: 400;
  font-style: normal;
  text-decoration: none;
  font-family: 微软雅黑;
  color: black;
}

/*工具栏*/
.UserFormsToolbar {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  margin-top: 15px;
  background-color: white;
}

.UserFormsToolbar input {
  border-radius: 0px;
  background-color: #f7f8fa;
}

.toolBarRpw {
  background-color: #eef5fc;
}

/*表头部样式*/
.userformsTable .vxe-header--column.headerCellClassName {
  background-color: #bed9f4;
  text-align: center;
  color: #000;
  padding: 0px;
}

/*斑马条纹*/
.userformslist,
.vxe-table.t--stripe .vxe-body--row:nth-child(2n) {
  background-color: #f2f6fa !important;
}

.userformsTable .vxe-body--column.columStyle {
  text-align: center;
  height: 34px;
  padding: 0px;
}

.userformsTable .vxe-body--column.columStyle input {
  border-radius: 0px;
  height: 100% !important;
}

/*分页样式*/
.formVxePager {
  margin-left: 15px;
  text-align: left !important;
}

.vxe-table .vxe-header--column {
  line-height: 0px !important;
}
.vxe-cell {
  text-align: center;
}
.alternativeView {
  background-image: url(../assets/dbmust.gif);
}
.clickXZ {
  line-height: 17px;
}
.cellInput {
  width: 110px !important;
  float: left;
}

.searcgElform input {
  border-radius: 0px;
  background-color: #f7f8fa;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: none;

  border: 1px solid #bfcbd9;
  box-sizing: border-box;
  color: #1f2d3d;
  font-size: inherit;
  height: 36px;
  line-height: 1;
  outline: 0;
  padding: 3px 10px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.vxe-table .vxe-sort-wrapper{
  height: 17px;
  margin-top: -9px !important;
}

/*排序图标默认颜色*/
.vxe-table .vxe-sort-wrapper .vxe-sort--asc-btn, .vxe-table .vxe-sort-wrapper .vxe-sort--desc-btn{
  color: #A0A0A0;
}

/*排序图标激活颜色*/
.vxe-table .vxe-sort-wrapper .vxe-sort--asc-btn.sort--active, .vxe-table .vxe-sort-wrapper .vxe-sort--desc-btn.sort--active{
  color: black;
}

</style>



