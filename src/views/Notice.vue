<!--
 * 列表显示列
 * @create pengxiaolong 2018/07/03
-->
<template class="userformslist">
  <div>
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
            <el-form-item :label="item.titleName" :key="item.titleKey" :prop="item.titleKey">
              <el-input style="height: 34px" v-model="item.val"></el-input>
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
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <div v-show="show" v-if="true">
        <el-form-item v-if="false">
          <el-button @click="newItemClick" type="primary" class="agentAddBtn">
            <i class="el-icon-plus agentCustomerButtonIcon"></i> 新增
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="removeItemClick" class="agentCustomerButton">
            <i class="el-icon-delete"></i>删除
          </el-button>
        </el-form-item>
        </div>
      </el-form>
    </el-col>
    <!--表格-->
    <vxe-table
      :key="tableKey"
      border
      resizable
      show-overflow
      class="userformsTable"
      ref="xTable1"
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
    >
      >
      <vxe-table-column type="selection" width="60"></vxe-table-column>
      <template v-for="item in rowData">
        <vxe-table-column
          v-if="item.canEdit&&item.mode=='input'"
          :key="getf(item.titleKey)"
          :field="getf(item.titleKey)"
          :title="item.titleName"
          :edit-render="{name: 'input'}"
          :width="item.width.substr(0,item.width.length-2)"
        ></vxe-table-column>
        <vxe-table-column
          v-else-if="item.canEdit&&item.mode=='select'"
          :key="getf(item.titleKey)"
          :field="getf(item.titleKey)"
          :title="item.titleName"
          :edit-render="{name: 'default'}"
          :width="item.width.substr(0,item.width.length-2)"
        >
          <template v-slot:edit="{ row }">
            <el-select v-model="row[item.titleKey]">
              <el-option
                v-for="selist in getseleArr(item.selectList)"
                :key="row.id + '_' + selist"
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
        ></vxe-table-column>
      </template>
    </vxe-table>
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
    ></vxe-pager>
  </div>
</template>


<script>
import Vue from "vue";
import VXETable from "vxe-table";
import Axios from "Axios";
import $ from "jquery";
import "vxe-table/lib/index.css";
Vue.use(VXETable);

export default {
  data() {
    return {
      userinfo:  JSON.parse(JSON.parse(sessionStorage.getItem("user"))),
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
      tableKey: "0",
      //记录表格编辑前的内容
      tableEditVal: null,
      /*可进行筛选的字段*/
      screenField: [],
      /*筛选条件字符串*/
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
      selectItemArr: {}
    };
  },
  props: {
    viewNameMX: String,
    filterMX: String,
    detailed:String
  },
  created: function() {
    if(this.detailed != 'yes'){
       this.fetchData();
    }
  },
  watch: {
    //监听表单参数，当表单切换菜单改变数值时执行
    $route(to, from) {
      this.tableHeight2 = window.innerHeight - this.$refs.xTable1.$el.offsetTop - 240;
      this.rowWidthArr = [];
      clearInterval(this.SetInterval);
      this.tableKey = "0";
      this.viewname = this.$route.params.viewname;
      /*筛选条件字符串*/
      this.searchStr =
        this.$route.params.searchStr == "0" ? "" : this.$route.params.searchStr;
      /*是否显示筛选栏*/
      this.isShowSearch = true;
      this.isShowScreen = false;
      this.screenField = [];
      this.fetchData();
    },
    tableData: function() {
      //渲染完成后检测表头和表体是否对齐
      var _this = this;
      /*
      clearInterval(_this.SetInterval);
      _this.$nextTick(function() {
        _this.SetInterval = setInterval(function() {
          if (_this.checkHeadWidth === undefined) return;
          _this.checkHeadWidth();
          //clearInterval(_this.SetInterval);
        }, 1000);
      });
      */
    }
  },
  mounted:function(){
    this.tableHeight2 = window.innerHeight - this.$refs.xTable1.$el.offsetTop - 240;
  },
  computed: {
    searchIsTop: function() {
      if (this.screenField.length <= 0) {
        return {
          "padding-bottom": "15px",
          "background-color": "#EEF5FC"
        };
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
        this.searchStr = "";
        this.currentPage = 1;

        //当从接口拿到数据后
        this.infodataVal = newValue;
        this.rowData = newValue.titleList;

        //最后一列 宽度自适应
        //this.rowData[this.rowData.length - 1].width = "";
        
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

        //切割分组开始
        var start = (this.currentPage - 1) * this.pageSize;
        //切割分组结束
        var ene = this.currentPage * this.pageSize;
        this.tableData = newValue.dataList.slice(start, ene);
        this.total = newValue.dataList.length;
        this.isShowSelectAll = true;
        this.tableKey = "1";
        this.formsName = newValue.shortTitle;

        var _this = this;
        //this.setScreenField(newValue.titleList);
        if (!this.isShowScreen && true) {
          this.setScreenField(newValue.titleList);
        }
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
    // 双击点击表单触发该事件
    doubleClickTableRow(rep){
      console.log(rep.row);
      var url = "/NewForm/" + rep.row.ShortTitle + "/" + rep.row.DataId+"/0";
        this.$router.push({ path: url });
    },
    detailedReference(viewnameMX,searchStrMX){
      this.viewname = viewnameMX;
      this.searchStr = searchStrMX;
      this.isShowSearch = 1;
      this.fetchData();
    },

    fetchData() {
      //获取数据
      this.listLoading = true;
      Axios.post(this.baseUrl + `HttpUtil/GetNoticeHandler.ashx`, {
        username: sessionStorage.getItem("curusercode"),
        noticeType: this.$route.params.noticeType,
        noticeStatus:this.$route.params.noticeStatus,
        filter: this.searchStr
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
    onCellClick(e) {
      if (this.isTrigEdit >= 0) {
        this.isTrigEdit--;
        return;
      }
      this.editConfig.autoClear = true;
    },
    editActivedEvent(e) {
      this.isTrigEdit = 1;
      this.tableEditVal = e.row[e.column.property];
      this.editConfig.autoClear = false;
    },
    //当编辑完成的时候出发
    editClosedEvent(e, i) {
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
      this.UpdateForms(id, e.row[e.column.property], e.column.property);
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
    /*获取key对应的model*/
    getModel(item, row) {},
    getKey(item, row) {
      return row.id + "_" + item;
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
        username: this.userinfo.name,
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
      var screen = ["ShortTitle", "ProcessStatus"];

      for (var i = 0; i < fdata.length; i++) {
        for (var j = 0; j < screen.length; j++) {
          if (fdata[i].titleKey == screen[j]) {
            var temp = fdata[i];
            temp.val = "";
            this.screenField.push(temp);
          }
        }
      }
    },
    //当点击搜索按钮
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
      var url = "/NewForm/" + this.formsName + "/0/0";
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
      seleArr = seleArr.substr(0, seleArr.length - 1);
      //提示用户是否删除
      var uname =  this.userinfo.name;
      var vname = this.viewname;

      this.$confirm("此操作将删除以下选中项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        Axios.post(this.baseUrl + `HttpUtil/DeleteFormDataHandler.ashx`, {
          username: uname,
          viewName: vname,
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
    /*全选事件*/
    selectAllEvent({ checked }) {
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
    },
    /*单选事件*/
    selectChangeEvent({ checked, row }) {
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
.userformslist,
.el-input__inner {
  /*height: 100%;
  width: 100% ;
  border-radius: 0px;*/
}

.vxe-input--wrapper .vxe-input {
  border-radius: 0px !important;
}

.userformslist,
.vxe-input {
  /*
  border-radius: 0px;
  height: 100% !important;
  width: 100% !important;
  */
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
  display:none;
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

.userformsTable .vxe-body--column{
  padding: 0px;
}

.userformsTable .vxe-body--column.columStyle {
  text-align: center;
  height: 34px;
}

.userformsTable .vxe-body--column.columStyle input {
  border-radius: 0px;
  height: 100% !important;
  width: 100% !important;
}

/*分页样式*/
.formVxePager {
  margin-left: 15px;
  text-align: left !important;
}

.vxe-table .vxe-header--column {
  line-height: 0px !important;
}
</style>



