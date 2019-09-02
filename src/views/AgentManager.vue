<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item>
          <el-button type="primary" class="agentAddBtn">
            <i class="el-icon-plus agentCustomerButtonIcon"></i> 新增
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="agentCustomerButton">
            <i class="el-icon-more"></i> 批量导入
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="agentCustomerButton">
            <i class="el-icon-delete"></i>批量删除
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <template>
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        :stripe="isstripe"
        style="width: 100%;"
        @selection-change="handleSelectionChange"
        class="rfTableView"
        v-loading="listLoading"
      >
        <el-table-column v-if="isShowSelectAll" type="selection" width="60"></el-table-column>
        <el-table-column
          sortable
          :show-overflow-tooltip="isShowTip"
          prop="GSMC"
          label="公司名称"
          key="GSMC"
        ></el-table-column>
        <el-table-column
          sortable
          :show-overflow-tooltip="isShowTip"
          prop="GSFL"
          label="公司分类"
          key="GSFL"
        ></el-table-column>
        <el-table-column
          sortable
          :show-overflow-tooltip="isShowTip"
          prop="DLS"
          label="代理商"
          key="DLS"
        ></el-table-column>
        <el-table-column sortable :show-overflow-tooltip="isShowTip" prop="DZ" label="地址" key="DZ"></el-table-column>
        <el-table-column
          sortable
          :show-overflow-tooltip="isShowTip"
          prop="LXR"
          label="联系人"
          key="LXR"
        ></el-table-column>
        <el-table-column sortable :show-overflow-tooltip="isShowTip" prop="ZT" label="状态" key="ZT"></el-table-column>
        <el-table-column sortable :show-overflow-tooltip="isShowTip" prop="QY" label="区域" key="QY"></el-table-column>

        <el-table-column
          fixed="right"
          :show-overflow-tooltip="isShowTip"
          prop="CZ"
          label="操作"
          key="CZ"
        >
          <template v-slot="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"><i class="el-icon-edit"></i></el-button>
            <el-button type="text" size="small"><i class="el-icon-delete"></i></el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-pagination
      style="margin-top: 30px;"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 50,100]"
      :page-size="pageSize"
      layout="prev, pager, next, total, sizes, jumper"
      :total="total"
    ></el-pagination>
  </section>
</template>
<script>
import Axios from "Axios";

export default {
  data() {
    return {
      username: "admin",
      total: 0,
      currentPage: 1,
      pageSize: 10,
      isstripe: true, 
      isShowTip: true,
      multipleSelection: [],
      tableData: [],
      rowData: [],
      infodataVal: null,
      //是否显示全选
      isShowSelectAll: false,
      listLoading: false,
    };
  },
  created: function() {
    // 组件创建完后获取数据，
    this.fetchData();
  },
  computed: {
    infodata: {
      get: function() {
        return this.infodataVal;
      },
      set: function(newValue) {
        if (!newValue.success) {
          this.$alert("获取数据出错:" + newValue.message, {
            confirmButtonText: "确定"
          });
          return;
        }
        //当从接口拿到数据后
        this.infodataVal = newValue;
        this.rowData = newValue.titleList;
        //切割分组开始
        var start = (this.currentPage - 1) * this.pageSize;
        //切割分组结束
        var ene = this.currentPage * this.pageSize;
        this.tableData = newValue.dataList.slice(start, ene);
        this.total = newValue.dataList.length;
        this.isShowSelectAll = true;
      }
    }
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(function(row) {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      //单选一个项
      this.multipleSelection = val;
    },
    callbackFunction(result) {
      alert(result + "aaa");
    },
    fetchData() {
      //获取数据
      Axios.post(this.baseUrl + `HttpUtil/GetViewDataHandler.ashx`, {
        username: this.username,
        viewName: this.viewname
      })
        .then(response => (this.infodata = response.data))
        .catch(function(error) {
          //请求失败返回的数据
          alert(error);
        });
    },
    handleSizeChange(val) {
      //当页大小 改变触发
      this.pageSize = val;
      this.sliceData();
    },
    handleCurrentChange(val) {
      //点击页数上一页或下一页触发
      this.currentPage = val;
      this.sliceData();
    },
    sliceData() {
      //切割分组开始
      var start = (this.currentPage - 1) * this.pageSize;
      //切割分组结束
      var ene = this.currentPage * this.pageSize;
      this.tableData = this.infodataVal.dataList.slice(start, ene);
    },
    /*///////////////////////////*/
    //当点击编辑的时候
    handleClick(data) {
      debugger;
    }
  }
};
</script>


<style>
.el-table tr {
  text-align: center;
}

.el-table tbody tr td:first-child {
  text-align: center;
}
.el-col table {
  border: 0px !important;
}

/*设置标题颜色*/
.rfTableView.el-table th {
  text-align: center;
  background-color: #bed9f4;
}
/*设置标题颜色 字体*/
.rfTableView.el-table th > div {
  text-align: center;
  background-color: #bed9f4;
}
/*斑马条纹颜色*/
.el-table--striped .el-table__body tr.el-table__row--striped td {
  background: #f2f6fa;
}

/*鼠标激活颜色
.rfTableView.el-table tr:hover {
  background-color: #dee0f3;
}*/
/*鼠标激活颜色
.rfTableView.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #dee0f3;
}
*/
/*支持带操作列的*/
.rfTableView .el-table__body tr.hover-row.el-table__row--striped > td,
.rfTableView .el-table__body tr.hover-row > td {
  background-color: #dee0f3;
}

/*当前行的颜色(鼠标点击选中行)*/
.rfTableView tr.current-row > td {
  background-color: #dee0f3;
}
.el-table--striped .el-table__body tr.el-table__row--striped.current-row td {
  background-color: #dee0f3;
}
/*工具栏颜色*/
.toolbar {
  background-color: #ffffff;
}
/*此页面自定义按钮图标*/
.agentCustomerButtonIcon {
  font-size: 10px;
}
/*此页面自定义按钮*/
.agentCustomerButton {
  border-color: #0372e6;
  color: #0372e6;
}
/*此页面新增按钮*/
.agentAddBtn {
  border-color: #0372e6;
  background-color: #0372e6;
}
.noBorderBtn {
  background-color: rgba(255, 255, 255, 0);
  border: none;
}
</style>