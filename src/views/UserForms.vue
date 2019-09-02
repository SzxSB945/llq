<!--
 * 列表显示列
 * @create pengxiaolong 2018/07/03
-->
<template class="userformslist">
  <div>
    <div class="type" v-show="typeShow">
      <div class="navigationBlock"></div>
      {{getViewName()}}
    </div>
    <div class="border" v-show="typeShow"></div>
    <el-row :style="searchIsTop" v-if="screenField.length>0">
      <el-col :span="24">
        <div class="FormTopTitleDiv">
          <div class="FormTopTitleFKDiv"></div>
          <span class="FormTopTitleSpan1">{{viewname}}</span>
        </div>
      </el-col>
    </el-row>
    <!--搜索栏-->
    <el-row class="toolBarRpw" v-if="screenField.length>0">
      <el-col :span="24" class="toolbar UserFormsToolbar">
        <el-col :span="24">
          <div class="screenDiv">
            <div class="navigationBlock"></div>
            <span class="screenSpan1">筛选条件</span>
          </div>
        </el-col>

        <el-form :inline="true" style="margin-top:50px">
          <template v-for="item in screenField">
            <el-form-item
              v-if="item.mode=='input'"
              :label="item.titleName"
              :key="item.titleKey"
              :prop="item.titleKey"
            >
              <el-input style="height: 34px" v-model="item.val"></el-input>
            </el-form-item>
             <el-form-item
              v-if="item.mode=='inputDate'"
              :label="item.titleName"
              :key="item.titleKey"
              :prop="item.titleKey"
            >
            <input :id="item.titleKey"  @click="onDateFormClick(item.titleKey)" style="height: 34px" v-model="item.val" />
            </el-form-item>
            <el-form-item
              v-if="item.mode=='select'"
              :label="item.titleName"
              :key="item.titleKey"
              :prop="item.titleKey"
            >
              <template>
                <select v-model="item.val">
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
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-row :style="searchIsTop" v-if="screenField.length>0">
      <el-col :span="24">
        <div class="FormTopTitleDiv">
          <div class="FormTopTitleFKDiv"></div>
          <span class="FormTopTitleSpan1">{{viewname}}</span>
        </div>
      </el-col>
    </el-row>
    <!--工具条-->
    <el-col :span="24" class="toolbar toolbarForm" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <div v-show="show">
          <el-form-item>
            <el-form-item>
              <el-button
                v-if="ButtonConfg.addbtn&&this.viewname!='物资信息维护'"
                @click="newItemClick"
                type="primary"
                class="agentAddBtn"
              >
                <i class="el-icon-plus agentCustomerButtonIcon"></i> 新增
              </el-button>
              <el-button
                @click="newItemClicknew"
                type="primary"
                class="agentAddBtn"
                v-if="this.viewname=='物资信息维护'"
              >
                <i class="el-icon-plus agentCustomerButtonIcon"></i> 新增
              </el-button>
              <el-button
                v-if="ButtonConfg.editbtn"
                @click="editItemClick"
                type="primary"
                class="agentAddBtn"
              >
                <i class="el-icon-edit agentCustomerButtonIcon"></i>编辑
              </el-button>
              <el-button
                v-if="isShowInitPassBtn"
                @click="initPassword"
                type="primary"
                class="agentAddBtn"
              >
                <i class="el-icon-star-on agentCustomerButtonIcon"></i>初始化密码
              </el-button>
              <el-button @click="ExportFileClick" type="primary" class="agentAddBtn">
                <i class="el-icon-upload agentCustomerButtonIcon"></i>导出Excel
              </el-button>
              <el-button
                v-if="this.viewname=='物资价格维护'"
                @click="ImportExcel()"
                type="primary"
                class="agentAddBtn"
              >
                <i class="el-icon-upload agentCustomerButtonIcon"></i>导入Excel
              </el-button>
              <el-button
                v-if="this.viewname=='零售客户信息'"
                @click="jumpOffer()"
                type="primary"
                class="agentAddBtn"
              >
                <i class="agentCustomerButtonIcon"></i>报价
              </el-button>
            </el-form-item>
          </el-form-item>
          <el-form-item>
            <el-button
              v-if="ButtonConfg.delbtn"
              @click="removeItemClick"
              class="agentCustomerButton"
            >
              <i class="el-icon-delete"></i>删除
            </el-button>
          </el-form-item>
          <div style="float: right">
            <el-form-item>
              <el-input style placeholder="搜索" v-model="tableFieldSearch"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="ontableSearchClick" type="primary" class="agentAddBtn">
                <i class="el-icon-search agentCustomerButtonIcon"></i> 搜索
              </el-button>
            </el-form-item>
          </div>
        </div>
        <div v-show="showMX">
          <el-form-item>
            <el-button @click="add" type="primary" class="agentAddBtn">
              <i class="el-icon-plus agentCustomerButtonIcon"></i> 新增
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="delect" class="agentCustomerButton">
              <i class="el-icon-delete"></i>删除
            </el-button>
          </el-form-item>
        </div>
        <div v-show="choice">
          <el-form-item>
            <el-button @click="submission" type="primary" class="agentAddBtn">
              <i class="el-icon-plus agentCustomerButtonIcon"></i> 提交
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="cancel" class="agentCustomerButton">
              <i class="el-icon-delete"></i>取消
            </el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-col>
    <el-dialog title="导入EXCEL" v-model="addFormVisible" :close-on-click-modal="true">
      <el-form ref="addForm">
        <el-upload
          class="upload-demo"
          :action="actionWZJG"
          :on-change="handleChange"
          :on-success="handleAvatarSuccess"
          :file-list="fileList3"
        >
          <el-button size="small" type="primary">点击导入excel</el-button>
        </el-upload>
      </el-form>
    </el-dialog>
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
      :auto-resize="true"
      :data="tableData"
      :edit-config="editConfig"
      :stripe="isstripe"
      :loading="listLoading"
      :header-cell-class-name="headerCellClassName"
      :cell-class-name="cellClassName"
      :height="tableHeight2"
      @edit-actived="editActivedEvent"
      @edit-closed="editClosedEvent"
      @cell-click="onCellClick"
      @select-all="selectAllEvent"
      @select-change="selectChangeEvent"
      @cell-dblclick="doubleClickTableRow"
      ref="xTable1"
      @radio-change="radioChangeEvent"
    >
      <vxe-table-column :type="singleAndDouble" width="50"></vxe-table-column>
      <template v-for="item in rowData">
        <vxe-table-column
          v-if="item.canEdit&&item.mode=='input'&&!item.choice"
          :key="getf(item.titleKey)"
          :field="getf(item.titleKey)"
          :title="item.titleName"
          :edit-render="{name: 'input'}"
          :width="item.width.substr(0,item.width.length-2)"
          sortable
        ></vxe-table-column>
        <vxe-table-column
          v-else-if="item.canEdit&&item.mode=='input'&&item.choice"
          :key="getf(item.titleKey)"
          :field="getf(item.titleKey)"
          :title="item.titleName"
          :edit-render="{name: 'input',choiceIsIt:item.choice}"
          :width="item.width.substr(0,item.width.length-2)"
          sortable
        ></vxe-table-column>
        <vxe-table-column
          v-else-if="item.canEdit&&item.mode=='inputsel'&&!item.choice"
          :key="getf(item.titleKey)"
          :field="getf(item.titleKey)"
          :title="item.titleName"
          :edit-render="{name: 'default'}"
          :width="item.width.substr(0,item.width.length-2)"
          sortable
        >
          <template v-slot:edit="{ row }">
            <el-select v-model="row[item.titleKey]" filterable allow-create placeholder="请输入/请选择">
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
          v-else-if="item.canEdit&&item.mode=='select'&&!item.choice"
          :key="getf(item.titleKey)"
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
    <!-- 分页 -->
    <vxe-pager
      class="formVxePager"
      :loading="false"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"
      :background="true"
      :pager-count="5"
      :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'Total','FullJump', 'Sizes']"
      @page-change="handlePageChange"
      @size-change="handleSizeChange"
      v-if="this.viewNameMX!='空调配置表明细'&&this.viewNameMX!='地暖配置表明细'&&this.viewNameMX!='外机选型明细'&&this.viewNameMX!='系统组件明细'"
      v-show="play"
    ></vxe-pager>
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
      total: 0,
      currentPage: 1,
      pageSize: 10,
      isstripe: true,
      viewname: this.$route.params.viewname,
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
      searchStr:
        this.$route.params.searchStr == "0" ? "" : this.$route.params.searchStr,
      /*是否显示筛选栏*/
      isShowSearch: this.$route.params.isShowSearch,
      /*是否显示了筛选*/
      isShowScreen: false,
      listLoading: false,
      /*表格编辑配置*/
      editConfig: {
        key: "idsa",
        trigger: "click",
        mode: "cell",
        showIcon: false,
        autoClear: false
      },
      /*是否触发编辑*/
      isTrigEdit: 0,
      /*表单名称*/
      formsName: null,
      /*选择的项ID数组*/
      selectItemArr: {},
      show: true,
      showMX: true,
      typeShow: true,
      choice: true,
      singleAndDouble: "selection",
      selectRow: null,
      choiceIsIt: true,
      numberId: "",
      play: true,
      addFormVisible: false,
      fileList3: [],
      actionWZJG: this.actionWZJG,
      /**按钮隐藏配置*/
      ButtonConfg: {
        addbtn: false,
        editbtn: false,
        delbtn: false
      },
      isExport: false, //是否导出
      LFH: 0,
      RFH: 0,
      tableFieldSearch: "",
      tableheightVal: "300",
      newitemclickNRname: "",
      options: [
        {
          value: "选项0",
          label: "保密设置"
        },
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        },
        {
          value: "/home",
          label: "首页"
        }
      ],
      searchValue: ""
    };
  },
  //传值过来的参数
  props: {
    viewNameMX: String,
    filterMX: String,
    detailed: String,
    res: String,
    viewName: String,
    filter: String,
    Title: String
  },
  created: function() {
    //点击选择进入
    if (this.res == "XZ") {
      this.viewname = this.viewName;
      this.searchStr = this.filter;
      this.choice = !this.choice;
      this.show = !this.show;
      this.singleAndDouble = "radio";
      this.play = !this.play;
    }
    if (this.detailed == "DC") {
      this.viewname = this.viewName;
      this.searchStr = this.filter;
    }
    if (this.res == "XZTable") {
      if (this.Title == "调试信息") {
        this.searchStr = "XMZT=签约";
      } else {
        this.searchStr = this.filter;
      }
      this.viewname = this.viewName;
      this.choice = !this.choice;
      this.show = !this.show;
      this.singleAndDouble = "radio";
      this.play = !this.play;
    }

    if (
      this.viewNameMX == "空调配置表明细" ||
      this.viewNameMX == "地暖配置表明细" ||
      this.viewNameMX == "外机选型明细" ||
      this.viewNameMX == "系统组件明细"
    ) {
      this.typeShow = !this.typeShow;
    }
    if (this.detailed != "yes") {
      this.showMX = !this.showMX;
      this.choice = !this.choice;
      this.fetchData();
    } else {
      this.show = !this.show;
      this.choice = !this.choice;
      this.play = !this.play;
    }
  },
  watch: {
    //监听表单参数，当表单切换菜单改变数值时执行
    $route(to, from) {
      this.tableHeight2 = window.innerHeight - this.$refs.xTable1.$el.offsetTop - 260;
      clearInterval(this.SetInterval);
      this.rowWidthArr = [];
      if (from.name != "物资分类维护") {
        this.tableFieldSearch = "";
        this.tableKey = 0;
        this.viewname = this.$route.params.viewname;
        /*筛选条件字符串*/
        this.searchStr =
          this.$route.params.searchStr == "0"
            ? ""
            : this.$route.params.searchStr;
        /*是否显示筛选栏*/
        this.isShowSearch = this.$route.params.isShowSearch;
        this.isShowScreen = false;
        //清空筛选字段
        this.screenField = [];
        //加载数据
        if (from.name == "物资信息维护") {
          this.viewname = "物资信息维护";
          this.searchStr = to.params.searchStr;
        }
        this.fetchData();
      }
    },
    tableData: function() {
      //渲染完成后检测表头和表体是否对齐
      var _this = this;
      clearInterval(_this.SetInterval);
      //表格渲染完成后执行
      _this.$nextTick(function() {   
        /*高度自适应了 不需要设置了
        _this.SetInterval = setInterval(function() {
          if (_this.checkHeadWidth === undefined) return;
          _this.checkHeadWidth();
        }, 1000);
        */
        
        //设置头部 点击事件
        var searchHead = setInterval(function(){
          if($(".headerCellClassName").length != 0){
            clearInterval(searchHead);
            $(".headerCellClassName").on("click",_this.onTableHeadClick);
          }
        },200);
        
        

        if (this.isExport) {
          _this.isExport = false;
          var opts = Object.assign({
            filename: this.viewname + ".csv"
          });
          _this.$refs.xTable1.exportCsv(opts);
          var start = (_this.currentPage - 1) * _this.pageSize;
          //切割分组结束
          var ene = _this.currentPage * _this.pageSize;
          _this.tableData = _this.infodata.dataList.slice(start, ene);
        }
      });
    }
  },
  mounted:function(){
    this.tableHeight2 = window.innerHeight - this.$refs.xTable1.$el.offsetTop - 260;
    //window.innerHeight:浏览器的可用高度
    //this.$refs.table.$el.offsetTop：表格距离浏览器的高度
    //后面的140：根据需求空出的高度，自行调整
  },
  computed: {
    isShowInitPassBtn: function() {
      if (this.viewname == "工程商信息" || this.viewname == "帐号信息")
        return true;
      return false;
    },
    /*如果存在搜索字段 则修改搜索栏样式*/
    searchIsTop: function() {
      if (this.screenField.length <= 0) {
        return {
          "padding-bottom": "15px",
          "background-color": "#EEF5FC"
        };
      }
    },
    tableheight: {
      get: function() {
        return this.tableheightVal;
      },
      set: function(newValue) {
        his.tableheightVal = newValue;
      }
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
        // 组件创建完后获取数据，
        //初始化数据
        //this.searchStr = "";
        this.currentPage = 1;
        this.ButtonConfg.addbtn = newValue.addbtn;
        this.ButtonConfg.editbtn = newValue.delbtn;
        this.ButtonConfg.delbtn = newValue.editbtn;

        //按钮配置

        //当从接口拿到数据后
        this.infodataVal = newValue;
        this.rowData = newValue.titleList;
        var _this = this;
        
        this.rowData.push({
          canEdit: false,
          mode: "input",
          titleKey: "",
          titleName: "",
          width: ""
        });
      
        //在最后最加空列
        
        /*
        for (var i = 0; i < _this.rowData.length; i++) {
          _this.rowWidthArr[i] = parseInt(
          _this.rowData[i].width.substr(0, _this.rowData[i].width.length - 2)
          );
        }*/
        //_this.changeRowWidth();
        //window.onresize = function() {
        //  _this.changeRowWidth();
        //};

        // 切割分组开始
        var start = (this.currentPage - 1) * this.pageSize;
        // 切割分组结束
        var ene = this.currentPage * this.pageSize;
        this.tableData = newValue.dataList.slice(start, ene);
        this.total = newValue.dataList.length;
        this.isShowSelectAll = true;
        this.tableKey++;
        this.formsName = newValue.shortTitle;

        // 监听事件 去除编辑框的 编辑
        $(".content-container").on("click", this.onContentContainerClick);

        if (!this.isShowScreen && this.isShowSearch == 0) {
          this.setScreenField(newValue.titleList);
        }

        //如果没有数据
      }
    }
  },
  destroyed:function(){
    //退出页面 关闭计时器
    clearInterval(this.SetInterval);
  },
  methods: {
    onDateFormClick(name){
      //当筛选条件的input点击的时候
      var _this = this;
      laydate({
        elem: "#" + name,
        format: "YYYY-MM-DD", // 分隔符可以任意定义
        istime: true,
        choose: function(dates) {
          var dates2 = dates.split("-")[0] + '-' + dates.split("-")[1]; 
          for (var i = 0; i < _this.screenField.length; i++) {
            if(name == _this.screenField[i].titleKey){
              if('dateMonth' == _this.screenField[i].formtype){
                _this.screenField[i].val = dates2;
                $("#" + name).val(dates2);
                break;
              }else{
                _this.screenField[i].val = dates;
                $("#" + name).val(dates);
                break;
              }
            }
          }
        }//end choose
      });

    },

    //报价跳转
    jumpOffer() {
      var seleId = "";
      var index = 0;
      var _selectItemArr = this.selectItemArr;
      var count = 0; //编辑只能选择一个
      Object.keys(_selectItemArr).forEach(function(key) {
        seleId = _selectItemArr[key];
        count++;
      });
      if (count > 1) {
        this.$alert("只能选择一行进行编辑!", {
          confirmButtonText: "确定"
        });
        return;
      }
      if (seleId == "") {
        return;
      }
      var url = "/NewForm/销售报价/0/" + seleId;
      this.$router.push({ path: url });
    },
    changeRowWidth() {
      //动态改变列宽 修复最后一列名 显示不完整
      var tableWidth = parseInt($(".userformsTable").width());
      var allRowWidth = 0;
      var _this = this;
       
      for (var i = 0; i < _this.rowWidthArr.length; i++) {
        allRowWidth += parseInt(_this.rowWidthArr[i]);
      }

      if (allRowWidth < tableWidth) {
        //this.rowData[this.rowData.length - 1].width = "";
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
    getViewName() {
      var name = this.viewname;
      if (name == "代销商信息") {
        //区分代理商和经销商
        var searchstr = this.searchStr;
        searchstr = searchstr.substring(5);
        if (searchstr == "经销商") {
          name = "经销商维护";
        } else if (searchstr == "代理商") {
          name = "代理商维护";
        }
      }
      
      this.newitemclickNRname = name;
      return name;
    },
    //列表中选择获取值
    addviewdata(res,XSJ,RQ) {
      debugger
      var numberId = this.numberId;
      for (var i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].numberId == numberId) {
          if (
            this.viewname == "提货计划明细视图" ||
            this.viewname == "提货订单明细视图"
          ) {
            this.tableData[i].WZBM = res.WZBH;
            this.tableData[i].WZMC = res.WZMC;
            this.tableData[i].GGXH = res.GGXH;
            this.tableData[i].PP = res.PB;
            this.tableData[i].DJ = XSJ;
          } else if (this.viewname == "维修设备清单明细") {
            this.tableData[i].WZBM = res.WZBH;
            this.tableData[i].WZBH = res.WZBH;
            this.tableData[i].WZMC = res.WZMC;
            this.tableData[i].SBLX = res.SBLX;
            this.tableData[i].SBJX = res.SBXH;
            this.tableData[i].JX = res.JX;
            this.tableData[i].JH = res.JH;
            this.tableData[i].ZBJZRQ = RQ;
          } else if (this.viewname == "调试设备清单明细") {
            this.tableData[i].WZBM = res.WZBH;
            this.tableData[i].WZBH = res.WZBH;
            this.tableData[i].WZMC = res.WZMC;
            this.tableData[i].SBLX = res.SBLX;
            this.tableData[i].JX = res.JX;
            this.tableData[i].JH = res.JH;
            this.tableData[i].ZBJSRQ = RQ;
            this.tableData[i].TSF = XSJ;
          }
        }
      }
    },
    ktMX(res) {
      var numberId = this.numberId;
      for (var i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].numberId == numberId) {
          this.tableData[i].NJXH = res.WZBH;
          this.tableData[i].NJLL = res.ZNL;
        }
      }
    },
    WJXX(res) {
      var numberId = this.numberId;
      for (var i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].numberId == numberId) {
          this.tableData[i].WJXH = res.WZBH;
        }
      }
    },
    XTZJ(res) {
      var numberId = this.numberId;
      for (var i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].numberId == numberId) {
          this.tableData[i].SBMC = res.WZMC;
          this.tableData[i].XH = res.GGXH;
        }
      }
    },
    zonliang3(LFH, RFH) {
      var WJZLL = "";
      var WJZRL = "";
      var ZLTKL;
      var DNTKL;
      for (var i = 0; i < LFH.length; i++) {
        if (this.tableData[i].WJZLL == "") {
          this.tableData[i].WJZLL = 0;
        } else {
          WJZLL = parseInt(this.tableData[i].WJZLL);
        }
        ZLTKL = WJZLL / LFH[i].LFH;
        var ZLTKLtoFixed = ZLTKL.toFixed(2);
        this.tableData[i].ZLTKL = ZLTKLtoFixed + "%";
      }
      for (var i = 0; i < RFH.length; i++) {
        if (this.tableData[i].WJZRL == "") {
          this.tableData[i].WJZRL = 0;
        } else {
          WJZRL = parseInt(this.tableData[i].WJZRL);
        }
        DNTKL = WJZRL / RFH[i].RFH;
        var DNTKLtoFixed = DNTKL.toFixed(2);
        this.tableData[i].DNTKL = DNTKLtoFixed + "%";
      }
    },

    //表单中选择提交传值
    submission() {
      if (this.res == "XZTable") {
        this.$emit("subreturnValueTable", this.selectRow, this.viewname);
      } else {
        this.$emit("subreturnValue", this.selectRow);
      }
    },
    //点击取消时
    cancel() {
      if (this.res == "XZTable") {
        this.$emit("subreturnValueTable", "cancel");
      } else {
        this.$emit("subreturnValue", "cancel");
      }
    },
    //radio单选事件
    radioChangeEvent({ row }) {
      this.selectRow = row;
      console.log("单选事件");
    },
    // 双击点击表单触发该事件
    doubleClickTableRow(rep) {
      if (
        this.res != "XZ" &&
        this.detailed != "yes" &&
        this.detailed != "1" &&
        this.res != "XZTable"
      ) {
        var url = "/NewForm/" + this.formsName + "/" + rep.row.ID + "/0";
        this.$router.push({ path: url });
      }
    },
    footerMethod({ columns, data }) {
      if (this.viewNameMX == "提货计划明细视图") {
        var DJ = "";
        var SL = "";
        var numberId = this.numberId;
        for (var i = 0; i < data.length; i++) {
          if (data[i].DJ == "") {
            DJ = 0;
          } else {
            DJ = parseInt(data[i].DJ);
          }
          if (data[i].SL == "") {
            SL = 0;
          } else {
            SL = parseInt(data[i].SL);
          }

          data[i].ZJ = DJ * SL;
        }
        return [
          columns.map((column, columnIndex) => {
            if (columnIndex === 0) {
              return "总计";
            }
            if (["SL", "ZJ"].includes(column.property)) {
              return XEUtils.sum(data, column.property);
            }
            return "-";
          })
        ];
      } else if (this.viewNameMX == "提货订单明细视图") {
        var DJ = "";
        var SL = "";
        var ZJ = "";
        var ZKL;
        var ZKJE;
        var numberId = this.numberId;
        for (var i = 0; i < data.length; i++) {
          if (data[i].DJ == "") {
            DJ = 0;
          } else {
            DJ = parseInt(data[i].DJ);
          }
          if (data[i].SL == "") {
            SL = 0;
          } else {
            SL = parseInt(data[i].SL);
          }
          ZKL = data[i].ZKL;
          //总价
          ZJ = DJ * SL; //总价=数量*单价
          data[i].ZJ = ZJ; //总价输出
          if (ZJ > 0) {
            //折扣价
            data[i].ZKJ = ZJ * ZKL; //折扣价=总价*折扣率
            //折扣金额
            ZKJE = ZJ - ZJ * ZKL; //总价-折扣价
            var ZKJEZJ = ZKJE.toFixed(1); //保留1位小数
            data[i].ZKJE = ZKJEZJ; //输出折扣金额
          }
        }
        return [
          columns.map((column, columnIndex) => {
            if (columnIndex === 0) {
              return "总计";
            }
            if (["SL", "ZJ", "ZKJE"].includes(column.property)) {
              return XEUtils.sum(data, column.property);
            }
            return "-";
          })
        ];
      } else if (this.viewNameMX == "空调配置表明细") {
        var DWLFH = "";
        var MJ = "";
        var XZXS = "";
        var LFH = "";
        var NJLL = "";
        var NJSL = "";
        for (var i = 0; i < data.length; i++) {
          if (data[i].DWLFH == "") {
            DWLFH = 0;
          } else {
            DWLFH = parseInt(data[i].DWLFH);
          }
          if (data[i].MJ == "") {
            MJ = 0;
          } else {
            MJ = parseInt(data[i].MJ);
          }
          if (data[i].XZXS == "") {
            XZXS = 0;
          } else {
            XZXS = parseInt(data[i].XZXS);
          }
          if (data[i].NJLL == "") {
            NJLL = 0;
          } else {
            NJLL = parseInt(data[i].NJLL);
          }
          if (data[i].NJSL == "") {
            NJSL = 0;
          } else {
            NJSL = parseInt(data[i].NJSL);
          }
          data[i].LFH = DWLFH * MJ * XZXS;
          data[i].NJLL = NJSL * NJLL;
        }
        return [
          columns.map((column, columnIndex) => {
            if (columnIndex === 0) {
              return "合计";
            }
            if (["MJ", "LFH", "NJSL", "NJLL"].includes(column.property)) {
              return XEUtils.sum(data, column.property);
            }
            return "-";
          })
        ];
      } else if (this.viewNameMX == "地暖配置表明细") {
        var DWRFH = "";
        var MJ = "";
        var XZXS = "";
        for (var i = 0; i < data.length; i++) {
          if (data[i].DWRFH == "") {
            DWRFH = 0;
          } else {
            DWRFH = parseInt(data[i].DWRFH);
          }
          if (data[i].MJ == "") {
            MJ = 0;
          } else {
            MJ = parseInt(data[i].MJ);
          }
          if (data[i].XZXS == "") {
            XZXS = 0;
          } else {
            XZXS = parseInt(data[i].XZXS);
          }
          data[i].RFH = DWRFH * MJ * XZXS;
        }
        return [
          columns.map((column, columnIndex) => {
            if (columnIndex === 0) {
              return "合计";
            }
            if (["MJ", "RFH"].includes(column.property)) {
              return XEUtils.sum(data, column.property);
            }
            return "-";
          })
        ];
      }
    },
    //明细新增
    add() {
      var rowData = this.rowData;
      var row = {};
      if (this.viewNameMX == "空调配置表明细") {
        for (var i = 0; i < rowData.length; i++) {
          if (rowData[i].titleName == "单位冷负荷") {
            row[rowData[i].titleKey] = "200";
          } else {
            if (rowData[i].titleName == "修正系数") {
              row[rowData[i].titleKey] = "1";
            } else {
              row[rowData[i].titleKey] = "";
            }
          }
        }
      } else if (this.viewNameMX == "地暖配置表明细") {
        for (var i = 0; i < rowData.length; i++) {
          if (rowData[i].titleName == "单位热负荷") {
            row[rowData[i].titleKey] = "120";
          } else {
            if (rowData[i].titleName == "修正系数") {
              row[rowData[i].titleKey] = "1";
            } else {
              row[rowData[i].titleKey] = "";
            }
          }
        }
      } else if (this.viewNameMX == "提货订单明细视图") {
        for (var i = 0; i < rowData.length; i++) {
          if (rowData[i].titleName == "折扣率") {
            row[rowData[i].titleKey] = "1";
          } else {
            row[rowData[i].titleKey] = "";
          }
        }
      } else {
        for (var i = 0; i < rowData.length; i++) {
          row[rowData[i].titleKey] = "";
        }
      }
      row.numberId = this.tableData.length;
      row.id = 0;
      row.viewNameMxName = this.viewNameMX;
      this.tableData.push(row);
    },
    //明细删除
    delect() {
      this.$confirm("是否删除明细内容？", "提示", {
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        //点击确认进入步骤
        .then(() => {
          var _this = this;
          var _selectItemArr = this.selectItemArr;
          Object.keys(_selectItemArr).forEach(function(key) {
            delete _this.tableData[_selectItemArr[key]];
          });
          this.tableKey++;
        })
        //点击取消进入步骤
        .catch(() => {});
    },
    //明细传值获取
    detailedReference(viewnameMX, searchStrMX) {
      this.viewname = viewnameMX;
      this.searchStr = searchStrMX;
      this.isShowSearch = 0;
      this.fetchData();
    },
    quoteValueTransfer(viewnameMX, searchStrMX) {
      this.viewname = viewnameMX;
      this.searchStr = searchStrMX;
      this.isShowSearch = 0;
      this.fetchData();
    },
    exportExcel(viewname, searchStr) {
      this.viewname = viewname;
      this.searchStr = searchStr;
      this.isShowSearch = 0;
      this.fetchData();
      this.ExportFileClick();
    },
    exportExcelnew(viewname) {
      this.viewname = viewname;
      this.ExportFileClick();
    },
    fetchData() {
      //获取数据
      this.listLoading = true;
      if (
        this.viewNameMX == "空调配置表明细" ||
        this.viewNameMX == "地暖配置表明细" ||
        this.viewNameMX == "外机选型明细" ||
        this.viewNameMX == "系统组件明细"
      ) {
        this.show = false;
        this.showMX = true;
        var dataAxios = {
          username: this.userinfo,
          viewName: this.viewNameMX,
          filter: this.searchStr
        };
      } else {
        var dataAxios = {
          username: this.userinfo,
          viewName: this.viewname,
          filter: this.searchStr,
          tableFieldSearch: this.tableFieldSearch
        };
      }
      Axios.post(this.baseUrl + "HttpUtil/GetViewDataHandler.ashx", dataAxios, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      })
        .then(response => (this.infodata = response.data))
        .catch(error => this.onerror(error));
    },
    /*表头class*/
    headerCellClassName({ column, columnIndex }) {
      return "headerCellClassName";
    },
    /*单元格class名*/
    cellClassName({ row, rowIndex, column, columnIndex }) {
      if (
        column.property === "DWLFH" ||
        column.property === "LFH" ||
        column.property === "NJLL" ||
        column.property === "DWRFH" ||
        column.property === "RFH" ||
        column.property === "ZLTKL" ||
        column.property === "DNTKL"
      ) {
        return "col-red";
      } else {
        return "columStyle";
      }
    },
    //获取字段名
    getf(v) {
      return v;
    },
    getSelectLabel(value, list, valueProp = "value", labelField = "label") {
      var item = list.find(item => item[valueProp] === value);
      return item ? item[labelField] : null;
    },
    onCellClick(e) {},
    dropdownClick(e) {
      /*
      if (this.isTrigEdit >= 0) {
        this.isTrigEdit--;
        return;
      }
      debugger
      this.editConfig.autoClear = true;
      */
    },
    onContentContainerClick(e) {
      /*var _this = this;
      //判断 点击的是不是控件 是就不动
      var eparent = $(e.target).parents("div.userformsTable");
      if(eparent !== undefined && eparent.length != 0){
        var ecls = $(e.target).attr("class");
        if(ecls !== undefined){
          //如果点击的是input 判断是不是select是就是添加option点击事件
          if(ecls.indexOf("el-input") != -1){
            var searchDownwntime = null;
            searchDownwntime = setInterval(function(){
              var len = $(".el-scrollbar").find(".el-select-dropdown__item");
              if(len.length != 0){
                clearInterval(searchDownwntime);
                for(var i = 0;i < len.length;i++){
                  len.eq(i).off("click");
                  len.eq(i).on("click", _this.dropdownClick);
                }
              }
            },100);
          }
        }
        return;
      }*/
      if (this.isTrigEdit >= 0) {
        this.isTrigEdit--;
        return;
      }
      this.editConfig.autoClear = true;
    },
    //编辑表单内容时触发
    editActivedEvent(e) {
      this.viewname;
      var type = e.column.editRender.name;
      var choiceIsIt = e.column.editRender.choiceIsIt;
      if (type == "input") {
        this.isTrigEdit = -1;
      } else if (type == "default") {
        this.isTrigEdit = 1;
      }
      if (choiceIsIt) {
        this.numberId = e.row.numberId;
        $(e.cell)
          .children("div")
          .addClass("cellInput");
        $(e.cell).append(
          '<button  id="choiceView" type="primary" class="el-button el-button--primary clickXZ"><i class="el-icon-plus agentCustomerButtonIcon"></i> 选择</button>'
        );
        $(".clickXZ").click(function() {
          $("#selectionView").click();
        });
      }

      this.tableEditVal = e.row[e.column.property];
      this.editConfig.autoClear = false;
    },
    //当编辑完成的时候出发
    editClosedEvent(e, i) {
      $(e.cell)
        .children("div")
        .removeClass("cellInput");
      $(".clickXZ").remove();
      //判断值是否改变
      if (this.tableEditVal == e.row[e.column.property]) {
        return;
      }
      this.tableEditVal = "";
      //调用更新字段值的接口
      var id = null;
      if (e.row.id !== undefined) {
        id = e.row.id;
      } else if (e.row.ID !== undefined) {
        id = e.row.ID;
      }
      this.tableData;
      this.UpdateForms(id, e.row[e.column.property], e.column.property);
      this.$emit("childByValue", this.tableData, this.viewNameMX);
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
      return id + "_" + item;
    },
    //防止表格头和body 不对齐
    checkHeadWidth() {
      var bodyWidth = $(".vxe-table--body").css("width");
      var headWidth = $(".vxe-table--header").css("width");
      if (bodyWidth === headWidth) {
        return;
      }
      var bodyWidth = bodyWidth.substr(0, bodyWidth.length - 2);
      bodyWidth = parseFloat(bodyWidth) + parseFloat(1);
      $(".vxe-table--header").css("width", bodyWidth + "px");
    },
    UpdateForms(id, val, field) {
      Axios.post(this.baseUrl + `HttpUtil/UpdateFieldHandler.ashx`, {
        username: this.userinfo,
        viewName: this.viewname,
        dataID: id,
        dataField: field,
        dataValue: val
      })
        .then()
        .catch(error => this.onerror(error));
    },
    onerror(error) {
      this.$alert("网络请求错误:" + error, {
        confirmButtonText: "确定"
      });
    },
    //设置筛选字段
    setScreenField(data) {
      this.isShowScreen = true;
      var fdata = data;
      var vname = this.viewname;
      var screen = [];
      //for(var i = 0 ;i < fdata.length;i++){
      //  console.log(fdata[i].titleKey + ":" + fdata[i].titleName);
      //}
      if (vname == "发文单视图") {
        screen = ["danwei", "name", "fenlei"];
      } else if (vname == "物资分类信息") {
        screen = ["WZFLMC", "ZT"];
      } else if (vname == "零售客户信息") {
        screen = ["XMZT", "JZLX", "YHDH", "DZ", "YHMC"];
      } else if (vname == "帐号信息") {
        screen = ["XM", "SSZZ", "ZT", "DH1","JS"];
      } else if (vname == "代销商信息") {
        screen = ["GSMC", "DLS", "ZT", "QY"];
      } else if (vname == "提货订单") {
        screen = ["DLS", "DDZT"];
      } else if (vname == "提货计划") {
        screen = ["SHDZ", "JHYF"];
      } else if (vname == "工程商信息") {
        screen = ["GCS", "XMLX"];
      } else if (vname == "项目登录") {
        screen = ["GCS", "XMLX", "XMMC"];
      } else if (vname == "销售报价") {
        screen = ["KHMC"];
      } else if (vname == "调试信息") {
        screen = ["KHMC", "FWLB", "DLS"];
      } else if (vname == "维修信息") {
        screen = ["KHXM", "FWLB"];
      } else if (vname == "物资价格维护") {
        screen = ["WZBM", "WZMC"];
      }

      /*
      for (var i = 0; i < fdata.length; i++) {
        for (var j = 0; j < screen.length; j++) {
          var temp = fdata[i];
            temp.val = "";
            scf.push(temp);
            //fdata.splice(i, 1);
        }
      }*/

      var scf = [];
      for (var j = 0; j < screen.length; j++) {
        for (var i = 0; i < fdata.length; i++) {
          if (fdata[i].titleKey == screen[j]) {
            var temp = fdata[i];
            temp.val = "";
            scf.push(temp);
          }
        }
      }
      this.screenField = scf;
      //主动设置类型
      if('提货计划' == vname){
        this.screenField[1].mode = 'inputDate'; //日期控件类型
        this.screenField[1].formtype = 'dateMonth';
      }
      else if('帐号信息' == vname){
        this.screenField[3].titleName = '电话';
        var role = sessionStorage.getItem("curRole");
        if (role == "代理商总管理" || role == "代理商销售管理" ||
          role == "代理商服务管理" || role == "经销商管理") 
        {
          if (role == "代理商总管理") {
            //显示代理商和经销商
            this.screenField[1].selectList = '代理商;经销商';
          } else if (role == "代理商销售管理" || role == "代理商服务管理" || role == '代理商施工管理') {
            this.screenField[1].selectList = '代理商';
          } else if (role == "经销商管理") {
            this.screenField[1].selectList = '经销商';
          }
        }
      }   


    },
    //当点击搜索按钮
    ontableSearchClick() {
      this.fetchData();
    },
    onSearchClick() {
      this.searchStr = "";
      for (var i = 0; i < this.screenField.length; i++) {
        this.searchStr +=
          this.screenField[i].titleKey + "=" + this.screenField[i].val + "&";
      }
      this.searchStr = this.searchStr.substr(0, this.searchStr.length - 1);
      this.fetchData();
    },
    /*页面改变*/
    handlePageChange(e) {
      this.currentPage = e.currentPage;
      this.sliceTableData();
    },
    handleSizeChange(e) {
      this.pageSize = e;
      this.sliceTableData();
    },
    /*分页*/
    sliceTableData() {
      //切割分组开始
      var start = (this.currentPage - 1) * this.pageSize;
      //切割分组结束
      var ene = this.currentPage * this.pageSize;
      this.tableData = this.infodata.dataList.slice(start, ene);
    },
    /*新增*/
    newItemClick() {
      if(this.newitemclickNRname == '经销商维护' || this.newitemclickNRname == '代理商维护'){
        var nr = '';
        if(this.newitemclickNRname == '经销商维护'){
          nr = '经销商';
        }
        if(this.newitemclickNRname == '代理商维护'){
          nr = '代理商';
        }
        var url = "/NewForm/" + this.formsName + "/0/" + nr;
        this.$router.push({ path: url });
      }
      else if (this.formsName == "销售报价") {
        var url = "/NewForm/" + "销售报价" + "/0/0";
        this.$router.push({ path: url });
      } else {
        var url = "/NewForm/" + this.formsName + "/0/0";
        this.$router.push({ path: url });
      }
    },
    newItemClicknew() {
      var url = "/materialInformation/NewForm/物资信息维护/0/0";
      this.$router.push({ path: url });
    },
    /*删除*/
    removeItemClick() {
      //如果没有选择 点击删除旧什么也不做
      var seleArr = "";
      var index = 0;
      var _selectItemArr = this.selectItemArr;
      Object.keys(_selectItemArr).forEach(function(key) {
        seleArr += _selectItemArr[key] + ",";
      });
      if (seleArr.length <= 0) {
        return;
      }
      var _this = this;
      seleArr = seleArr.substr(0, seleArr.length - 1);
      //提示用户是否删除
      this.$confirm("此操作将删除以下选中项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        Axios.post(_this.baseUrl + `HttpUtil/DeleteFormDataHandler.ashx`, {
          username: _this.userinfo,
          viewName: _this.viewname,
          dataID: seleArr
        })
          .then(response => {
            this.$alert(response.data.message, {
              confirmButtonText: "确定"
            });
            this.fetchData();
          })
          .catch(error => this.onerror(error));
      });
    },
    ExportFileClick() {
      this.isExport = true;
      this.tableData = this.infodata.dataList;
    },
    ImportExcel() {
      this.fileList3 = [];
      this.addFormVisible = true;
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
        }).then(() => {
          this.addFormVisible = false;
        });
      } else {
        this.$alert(res.message, {
          confirmButtonText: "确定"
        }).then(() => {
          this.addFormVisible = false;
        });
      }
    },
    initPassword() {
      //如果没有选择 点击 什么也不做
      var seleArr = "";
      var index = 0;
      var _selectItemArr = this.selectItemArr;
      Object.keys(_selectItemArr).forEach(function(key) {
        seleArr += _selectItemArr[key] + ",";
      });
      if (seleArr.length <= 0) {
        return;
      }
      var _this = this;
      seleArr = seleArr.substr(0, seleArr.length - 1);

      //提示用户是否初始化
      this.$confirm("是否初始化密码?", "提示", {
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        //点击确认进入步骤
        .then(() => {
          Axios.post(_this.baseUrl + `HttpUtil/InitPasswordHandler.ashx`, {
            username: _this.userinfo,
            dataID: seleArr,
            type: _this.viewname
          })
            .then(response => {
              this.$alert(response.data.message, {
                confirmButtonText: "确定"
              });
              this.fetchData();
            })
            .catch(error => this.onerror(error));
        })
        //点击取消进入步骤
        .catch(() => {});
    },
    editItemClick() {
      //如果没有选择 什么也不做
      var seleId = "";
      var index = 0;
      var _selectItemArr = this.selectItemArr;
      var count = 0; //编辑只能选择一个
      Object.keys(_selectItemArr).forEach(function(key) {
        seleId = _selectItemArr[key];
        count++;
      });
      if (count > 1) {
        this.$alert("只能选择一行进行编辑!", {
          confirmButtonText: "确定"
        });
        return;
      }
      if (seleId == "") {
        return;
      }
      //var _this = this;
      if (this.viewname == "物资信息维护") {
       var url = "/materialInformation/NewForm/" + this.formsName + "/" + seleId + "/0";
      this.$router.push({ path: url });
      } else {
        var url = "/NewForm/" + this.formsName + "/" + seleId + "/0";
        this.$router.push({ path: url });
      }
    },
    /*全选事件*/
    selectAllEvent({ checked }) {
      if (this.detailed == "yes") {
        //如果是明细进入
        this.selectItemArr = {};
        if (checked) {
          for (var i = 0; i < this.tableData.length; i++) {
            var id = this.tableData[i].numberId;
            this.selectItemArr[id] = id;
          }
        }
      } else {
        this.selectItemArr = {};
        if (checked) {
          for (var i = 0; i < this.tableData.length; i++) {
            var id = 0;
            if (this.tableData[i].id !== undefined) {
              id = this.tableData[i].id;
            } else if (this.tableData[i].ID !== undefined) {
              id = this.tableData[i].ID;
            }
            this.selectItemArr[id] = id;
          }
        }
      }
    },
    /*单选事件*/
    selectChangeEvent({ checked, row }) {
      this.dxrow = row;
      if (this.detailed == "yes") {
        //如果是明细进入
        var id = row.numberId;
        if (checked) {
          //勾选
          this.selectItemArr[id] = id;
        } else {
          //取消勾选
          delete this.selectItemArr[id];
        }
      } else {
        var id = 0;
        if (row.id !== undefined) {
          id = row.id;
        } else if (row.ID !== undefined) {
          id = row.ID;
        }
        if (checked) {
          //勾选
          this.selectItemArr[id] = id;
        } else {
          //取消勾选
          delete this.selectItemArr[id];
        }
      }
    },
    onTableHeadClick(e){
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
  border: 1px solid #bfcbd9;
  padding: 0px 10px;
  width: 200px;
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

.vxe-checkbox.is--indeterminate > input + .checkbox--icon:before {
  left: 0px;
}
.vxe-pager .vxe-pager--num-btn {
  font-weight: 100 !important;
}

.vxe-table .vxe-sort-wrapper{
  height: 17px;
  margin-top: -9px !important;
}

/*排序图标默认颜色*/
.vxe-table .vxe-sort-wrapper .vxe-sort--asc-btn,
.vxe-table .vxe-sort-wrapper .vxe-sort--desc-btn {
  color: #a0a0a0;
}

/*排序图标激活颜色*/
.vxe-table .vxe-sort-wrapper .vxe-sort--asc-btn.sort--active,
.vxe-table .vxe-sort-wrapper .vxe-sort--desc-btn.sort--active {
  color: black;
}

/*暂无数据 不显示*/
.vxe-table--empty-text {
  display: none !important;
}

/*表头部样式*/
.userformsTable .vxe-body--column.col-red {
  background-color: #fafafa;
  text-align: center;
  color: #000;
}
.vxe-table .vxe-sort-wrapper {
  margin-top: -4px !important;
}

.vxe-header--row{
  height: 34px !important;
  padding: 0px;
  margin: 0px;
}

.vxe-body--row{
  height: 34px !important;
  padding: 0px;
  margin: 0px;
}
</style>



