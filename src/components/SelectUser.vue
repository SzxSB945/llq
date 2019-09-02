<template>
  <el-container>
<!--     <el-button class='selectBtn' type='primary' @click="showDialog">选择</el-button> -->
    <el-dialog title="选择用户" :visible.sync="dialogVisible" width="30%">
        <el-tree ref='tree' :data="data" :props="defaultProps" @node-click="handleNodeClick" show-checkbox></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="ok">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>
<style>
  .selectBtn{
    margin-left: 5px;
  }
  .el-dialog__title{
    font-size: 15px;
    line-height: 25px;
  }
  .el-dialog__header{
    text-align: left;
  }
  .el-dialog__body{
    padding: 20px;
  }
  .el-tree{
   padding: 10px 20px 20px 20px;
  }
  .el-tree-node__content{
        text-align: left;

  }
</style>
<script>
import Axios from "Axios";
export default {
  data() {
    return {
      users: "",
      user: sessionStorage.getItem("curusercode"),
      data: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
    };
  },
  props:['mode','name',"dialogVisible","orgname","role","scope","res"],
  mounted(){   
    //获取人员信息树形结构
  },
  computed: {
    getData: {
      get: function() {
        //通过get后的数据 就行获取返回数据
        return this.getData;
      },
      // set为  infpdata的返回数据
      set: function(res) {
        // 如果返回值为false 则alert出 错误信息
        if (res.success == false) {
          this.$alert("获取数据出错:" + res.message, {
            confirmButtonText: "确定"
          });
        } else {
          this.data=res.dataList;
        }
      }
    },

   },
  methods:{
    getADD(orgname,role,scope,istrue){
      debugger
      if(istrue){
        this.dialogVisible=istrue;   
      }
      this.getDataArr(orgname,role,scope);
    },
    getDataArr(orgname,role,scope){
      Axios.post(
        this.baseUrl + "HttpUtil/GetUserHandler.ashx",
        {
          // 参数 username
          username: this.user,
          type:"person",
          scope:scope,
          role:role,
          orgname:orgname
        },
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      )
        //将获取到的接口值 赋给info；
        .then(response => (this.getData = response.data))
        .catch(function(error) {
          alert(error);
          console.log(error);
        });
    },
    showDialog(){
      this.dialogVisible=true
    },
    ok(){
      var selectedNodes=this.$refs.tree.getCheckedNodes(true);
      this.$emit('users',{name:this.name,selectedItem:selectedNodes});
      this.dialogVisible=false;
      this.setSelectedUsers(selectedNodes);
    },
    handleClose(){},
    handleNodeClick(){},
    setSelectedUsers(val){
        var arr=[];
        val.forEach(user => {
            arr.push(user.label)
        });
        this.users = arr.toString();
    }
  }
};
</script>