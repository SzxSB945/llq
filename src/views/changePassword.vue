 <template>
  <el-form :model="passForm" status-icon ref="passForm" label-width="120px">
    <div class="overallLayout">
      <div class="type">
        <div class="navigationBlock"></div>修改密码
      </div>
      <div class="border"></div>
    </div>

    <el-form-item label="旧密码" prop="oldPass">
      <el-input
        :type="passForm.show.old?'text':'password'"
        v-model="passForm.oldPass"
        placeholder="请输入旧密码"
        class="width"
      ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="newPass">
      <el-input
        :type="passForm.show.new?'text':'password'"
        v-model="passForm.newPass"
        placeholder="请输入新密码"
        class="width"
      ></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input
        :type="passForm.show.check?'text':'password'"
        v-model="passForm.checkPass"
        placeholder="请确认密码"
        class="width"
      ></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="confirm()">确定</el-button>
      <el-button @click="cancel()">取消</el-button>
    </el-form-item>
  </el-form>
</template>

 <script>
import Axios from "Axios";

import $ from "jquery";
export default {
  data() {
    return {
      passForm: {
        oldPass: "",
        newPass: "",
        checkPass: "",
        show: {
          old: false,
          new: false,
          check: false
        }
      },
      user: sessionStorage.getItem("curusercode")
    };
  },
  computed: {
    updata: {
      get: function() {
        //通过get后的数据 就行获取返回数据
        return this.updata;
      },
      // set为  infpdata的返回数据
      set: function(res) {
        if (res.code == "error") {
          this.$alert(res.msg, {
            confirmButtonText: "确定"
          });
        } else {
          this.$alert(res.msg, {
            confirmButtonText: "确定"
          });
        }
      }
    }
  },
  methods: {
    //确定
    confirm() {
      if (this.passForm.newPass != this.passForm.checkPass) {
        this.$alert("新密码不一致", {
          confirmButtonText: "确定"
        });
      } else if (this.passForm.oldPass == "") {
        this.$alert("旧密码不能为空", {
          confirmButtonText: "确定"
        });
      } else {
        this.updataPass();
      }
    },
    //修改密码
    updataPass() {
      // 使用element的提示框
      var _this = this;
      this.$confirm("是否修改密码？", "提示", {
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        //点击确认进入步骤
        .then(() => {
          // debugger;
          // var strs = _this.baseUrl;
          // console.log(strs);
          Axios.post("/HttpUtil/accountManager.ashx",
            {
              user: _this.user,
              action: "changePassword",
              oldPass: _this.passForm.oldPass,
              newPass: _this.passForm.newPass
            },

            {
              headers: { "Content-Type": "application/x-www-form-urlencoded" }
            }
          )
            //定义一个全局变量 infodata  在上方 computed函数中执行
            .then(response => (_this.updata = response.data))
            //失败
            .catch(function(error) {
              alert(error);
            });
        })
        //点击取消进入步骤
        .catch(() => {
          // 选择取消
        });
    },
    //取消
    cancel() {
      this.$router.go(-1);
    }
  }
};
</script>
<style>
/* 整体表单样式 */

.width {
  width: 300px;
}
.overallLayout {
  padding: 20px;
}
</style>
