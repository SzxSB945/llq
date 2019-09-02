 <template>
  <el-row>
    <div v-if="isShowAll">
    <div class="chart-container">
      <el-row>
        <el-col>
          <el-form autocomplete="off">
            <div class="type">
              <div class="navigationBlock"></div>
              {{getTitle()}}
            </div>
            <div class="border"></div>
            <keep-alive>
              <div v-html="info">{{ info }}</div>
            </keep-alive>
            <template v-if="this.Title == '销售报价'">
              <el-form>
                <div class="type">
                  <div class="navigationBlock"></div>空调配置表
                </div>
                <div class="border"></div>
                <UserForms
                  ref="refName1"
                  v-on:childByValue="childByValue"
                  viewNameMX="空调配置表明细"
                  :filterMX="filterMX"
                  detailed="yes"
                ></UserForms>
              </el-form>
              <el-form>
                <div class="type">
                  <div class="navigationBlock"></div>地暖配置表
                </div>
                <div class="border"></div>
                <UserForms
                  ref="refName2"
                  v-on:childByValue="childByValue"
                  viewNameMX="地暖配置表明细"
                  :filterMX="filterMX"
                  detailed="yes"
                ></UserForms>
              </el-form>
              <el-form>
                <div class="type">
                  <div class="navigationBlock"></div>外机选型
                </div>
                <div class="border"></div>
                <UserForms
                  ref="refName3"
                  v-on:childByValue="childByValue"
                  viewNameMX="外机选型明细"
                  :filterMX="filterMX"
                  detailed="yes"
                ></UserForms>
              </el-form>
              <el-form>
                <div class="type">
                  <div class="navigationBlock"></div>系统组件
                </div>
                <div class="border"></div>
                <UserForms
                  ref="refName4"
                  v-on:childByValue="childByValue"
                  viewNameMX="系统组件明细"
                  :filterMX="filterMX"
                  detailed="yes"
                ></UserForms>
              </el-form>
            </template>
            <div class="Preservation">
              <el-button
                type="primary"
                @click="quotationbaocun"
                v-if="this.Title == '销售报价'&&this.$route.params.id!=0"
              >保存</el-button>
              <el-button
                type="primary"
                @click="quotationAdd"
                v-if="this.Title == '销售报价'&&this.$route.params.id!=0"
              >新增</el-button>
              <el-button
                type="primary"
                @click="quotationReading"
                v-if="this.Title == '销售报价'&&this.$route.params.id!=0"
              >阅览</el-button>
              <el-button type="primary" @click="handleAdd" id="add" style="display: none;">上传按钮</el-button>
              <el-button type="primary" @click="updataSelect" id="updata" style="display: none;">选中</el-button>
              <el-button
                type="primary"
                @click="sectorSelection"
                id="sectorSelection"
                style="display: none;"
              >部门人员选择</el-button>
              <el-button
                type="primary"
                @click="selectionView"
                id="selectionView"
                style="display: none;"
              >选择</el-button>
              <el-button
                type="primary"
                @click="selectionTable"
                id="selectionTable"
                style="display: none;"
              >选择</el-button>
              <div class="block"></div>
            </div>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <!-- 上传 -->
    <el-dialog title="上传" v-model="addFormVisible" :close-on-click-modal="true">
      <el-form ref="addForm">
        <el-upload
          class="upload-demo"
          :action="action"
          :on-change="handleChange"
          :on-success="handleAvatarSuccess"
          :on-remove="handleRemove"
          :file-list="fileList3"
          :on-preview="handlePreview"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip"></div>
        </el-upload>
      </el-form>
    </el-dialog>
    <!-- 上传 end-->

    <!-- 部门选择 -->
    <el-col v-model="selectionofpersonnel">
      <el-form ref="addForm">
        <userselect
          ref="getSelectedUsers"
          @users="getSelectedUsers"
          :name="field"
          :dialogVisible="dialogVisible"
          :orgname="orgname"
          :role="role"
          :scope="scope"
          res="chuanzhi"
        ></userselect>
      </el-form>
    </el-col>
    <!-- 部门选择end -->

    <!-- 选择销售记录 -->
    <el-dialog title="选择" v-model="clickView" :close-on-click-modal="true">
      <el-form ref="addForm">
        <UserForms
          ref="refName123"
          v-on:subreturnValue="subreturnValue"
          :Title="Title"
          viewName="物资信息维护"
          filter
          res="XZ"
        ></UserForms>
      </el-form>
    </el-dialog>
    <!-- 选择销售记录 end-->

    <!-- 零售 -->
    <el-dialog title="选择" v-model="clickTable" :close-on-click-modal="true">
      <el-form ref="addForm">
        <UserForms
          ref="refName123"
          v-on:subreturnValueTable="subreturnValueTable"
          :Title="Title"
          :viewName="viewName"
          filter
          res="XZTable"
        ></UserForms>
      </el-form>
    </el-dialog>
    <!-- 零售 end-->

    <!-- 子父页面传值 -->
    <div class="chart-container" v-if="show">
      <UserForms
        ref="refName"
        v-on:childByValue="childByValue"
        :viewNameMX="viewNameMX"
        :filterMX="filterMX"
        :detailed="detailed"
      ></UserForms>
    </div>
    <!-- 子父页面传值 end-->
    <!-- 流程按钮 -->
    <div v-if="processSubmission">
      <div class="type">
        <div class="navigationBlock"></div>处理记录
      </div>
      <div class="border"></div>

      <!-- 处理记录 -->
      <div>
        <vxe-table
          border
          highlight-hover-row
          show-overflow
          resizable
          class="userformsTable"
          :data.sync="processRecords"
        >
          <vxe-table-column field="Actor" title="关卡"></vxe-table-column>
          <vxe-table-column field="ReceiverName" title="审批人"></vxe-table-column>
          <vxe-table-column field="ProcessByName" title="处理人"></vxe-table-column>
          <vxe-table-column field="Action" title="结果"></vxe-table-column>
          <vxe-table-column field="Content" title="意见"></vxe-table-column>
          <vxe-table-column field="ProcessTime" title="时间"></vxe-table-column>
        </vxe-table>
      </div>
      <!-- 处理记录end -->

      <!-- 意见填写 -->
      <div v-if="YJTX">
        <div class="type">
          <div class="navigationBlock"></div>意见填写
        </div>
        <div class="border"></div>
        <div class="processSubmission">
          <template>
            <el-input
              type="textarea"
              v-model="textarea"
              placeholder="请输入意见"
              show-word-limit
              resize="none"
            >{{textarea}}</el-input>
          </template>
        </div>
      </div>
      <!-- 意见填写 end-->

      <!-- 提交流程定义 -->
      <div class="processSubmission">
        <template v-for="item in transEvent">
          <el-button
            :key="item.transEvent"
            @click="submission(item.eventName,item.eventURL)"
            v-if="item.eventName=='流程属性'"
            type="cancel"
          >{{item.eventName}}</el-button>
          <el-button
            :key="item.transEvent"
            @click="submission(item.eventName,item.eventURL)"
            v-else
            type="primary"
          >{{item.eventName}}</el-button>
        </template>
      </div>
      <!-- 提交流程定义 end-->
    </div>
    <!-- 流程按钮 end-->
    <div class="processSubmissionnew">
      <el-button @click="submitForm()" type="primary" v-if="Addbaocun">保存</el-button>
      <el-button @click="submitForm()" type="primary" v-if="AddbaocunDL">保存并登录</el-button>
      <el-button @click="submitFormBJ()" type="primary" v-if="AddbaocunBJ">保存转报价</el-button>
      <el-button class="cancel" v-if="quxiaobaocun" @click="cancel()">取消</el-button>
    </div>
    </div>
  </el-row>
</template>
<script>
import Axios from "Axios";

import $ from "jquery";

//测试页面测试功能，后续删除
import UserForms from "@/views/UserForms.vue";

import { laydate } from "../mock/laydate.js";

import userselect from "../components/SelectUser";

export default {
  data() {
    return {
      HQXSJValue: "",
      jumpBJB: 0,
      AddbaocunDL: true,
      AddbaocunBJ: true,
      info: null,
      shortTitle: null,
      Title: this.$route.params.name,
      user: sessionStorage.getItem("curusercode"),
      username: sessionStorage.getItem("curusername"),
      curRole: sessionStorage.getItem("curRole"), //当前登录人角色
      ID: "",
      formdata: {},
      SSFL: [],
      viewNameMX: "",
      filterMX: null,
      show: true,
      detailed: null,
      viewData: "",
      agent: sessionStorage.getItem("agent"),
      addFormVisible: false,
      fileList3: [],
      wjUrl: [],
      action: this.action,
      KTPZB: "",
      DNPZB: "",
      WJXXB: "",
      XTZJB: "",
      clickView: false,
      clickTable: false,
      WZXXWZFL: [],
      viewName: "",
      filter: "",
      res: "",
      dialogFormVisible: false,
      parameter: "",
      transEvent: [],
      processSubmission: true,
      processRecords: [],
      textarea: "",
      submissionUrl: "",
      XSBJviewNameMX: "",
      quotationUpdateValue: "",
      newQuotation: "",
      transEventlength: "",
      YJTX: true,
      field: "",
      dialogVisible: false,
      orgname: "",
      role: "",
      scope: "",
      selectionofpersonnel: false,
      Addbaocun: true,
      quxiaobaocun: true,
      engineer: sessionStorage.getItem("engineer"),
      editField: "",
      mustField: "",
      isShowAll:true,
      nr: this.$route.params.nr,
      array: [
        {
          name: "请选择",
          city: [{ name: "请选择", area: ["请选择"] }]
        },
        {
          name: "北京",
          city: [
            {
              name: "北京",
              area: [
                "东城区",
                "西城区",
                "崇文区",
                "宣武区",
                "朝阳区",
                "丰台区",
                "石景山区",
                "海淀区",
                "门头沟区",
                "房山区",
                "通州区",
                "顺义区",
                "昌平区",
                "大兴区",
                "平谷区",
                "怀柔区",
                "密云县",
                "延庆县"
              ]
            }
          ]
        },

        {
          name: "天津",
          city: [
            {
              name: "天津",
              area: [
                "和平区",
                "河东区",
                "河西区",
                "南开区",
                "河北区",
                "红桥区",
                "塘沽区",
                "汉沽区",
                "大港区",
                "东丽区",
                "西青区",
                "津南区",
                "北辰区",
                "武清区",
                "宝坻区",
                "宁河县",
                "静海县",
                "蓟  县"
              ]
            }
          ]
        },

        {
          name: "河北",
          city: [
            {
              name: "石家庄",
              area: [
                "长安区",
                "桥东区",
                "桥西区",
                "新华区",
                "郊  区",
                "井陉矿区",
                "井陉县",
                "正定县",
                "栾城县",
                "行唐县",
                "灵寿县",
                "高邑县",
                "深泽县",
                "赞皇县",
                "无极县",
                "平山县",
                "元氏县",
                "赵  县",
                "辛集市",
                "藁",
                "晋州市",
                "新乐市",
                "鹿泉市"
              ]
            },

            {
              name: "唐山",
              area: [
                "路南区",
                "路北区",
                "古冶区",
                "开平区",
                "新  区",
                "丰润县",
                "滦  县",
                "滦南县",
                "乐亭县",
                "迁西县",
                "玉田县",
                "唐海县",
                "遵化市",
                "丰南市",
                "迁安市"
              ]
            },

            {
              name: "秦皇岛",
              area: [
                "海港区",
                "山海关区",
                "北戴河区",
                "青龙满族自治县",
                "昌黎县",
                "抚宁县",
                "卢龙县"
              ]
            },

            {
              name: "邯郸",
              area: [
                "邯山区",
                "丛台区",
                "复兴区",
                "峰峰矿区",
                "邯郸县",
                "临漳县",
                "成安县",
                "大名县",
                "涉  县",
                "磁  县",
                "肥乡县",
                "永年县",
                "邱  县",
                "鸡泽县",
                "广平县",
                "馆陶县",
                "魏  县",
                "曲周县",
                "武安市"
              ]
            },

            {
              name: "邢台",
              area: [
                "桥东区",
                "桥西区",
                "邢台县",
                "临城县",
                "内丘县",
                "柏乡县",
                "隆尧县",
                "任  县",
                "南和县",
                "宁晋县",
                "巨鹿县",
                "新河县",
                "广宗县",
                "平乡县",
                "威  县",
                "清河县",
                "临西县",
                "南宫市",
                "沙河市"
              ]
            },

            {
              name: "保定",
              area: [
                "新市区",
                "北市区",
                "南市区",
                "满城县",
                "清苑县",
                "涞水县",
                "阜平县",
                "徐水县",
                "定兴县",
                "唐  县",
                "高阳县",
                "容城县",
                "涞源县",
                "望都县",
                "安新县",
                "易  县",
                "曲阳县",
                "蠡  县",
                "顺平县",
                "博野",
                "雄县",
                "涿州市",
                "定州市",
                "安国市",
                "高碑店市"
              ]
            },

            {
              name: "张家口",
              area: [
                "桥东区",
                "桥西区",
                "宣化区",
                "下花园区",
                "宣化县",
                "张北县",
                "康保县",
                "沽源县",
                "尚义县",
                "蔚  县",
                "阳原县",
                "怀安县",
                "万全县",
                "怀来县",
                "涿鹿县",
                "赤城县",
                "崇礼县"
              ]
            },

            {
              name: "承德",
              area: [
                "双桥区",
                "双滦区",
                "鹰手营子矿区",
                "承德县",
                "兴隆县",
                "平泉县",
                "滦平县",
                "隆化县",
                "丰宁满族自治县",
                "宽城满族自治县",
                "围场满族蒙古族自治县"
              ]
            },

            {
              name: "沧州",
              area: [
                "新华区",
                "运河区",
                "沧  县",
                "青  县",
                "东光县",
                "海兴县",
                "盐山县",
                "肃宁县",
                "南皮县",
                "吴桥县",
                "献  县",
                "孟村回族自治县",
                "泊头市",
                "任丘市",
                "黄骅市",
                "河间市"
              ]
            },

            {
              name: "廊坊",
              area: [
                "安次区",
                "固安县",
                "永清县",
                "香河县",
                "大城县",
                "文安县",
                "大厂回族自治县",
                "霸州市",
                "三河市"
              ]
            },

            {
              name: "衡水",
              area: [
                "桃城区",
                "枣强县",
                "武邑县",
                "武强县",
                "饶阳县",
                "安平县",
                "故城县",
                "景  县",
                "阜城县",
                "冀州市",
                "深州市"
              ]
            }
          ]
        },

        {
          name: "山西",
          city: [
            {
              name: "太原",
              area: [
                "小店区",
                "迎泽区",
                "杏花岭区",
                "尖草坪区",
                "万柏林区",
                "晋源区",
                "清徐县",
                "阳曲县",
                "娄烦县",
                "古交市"
              ]
            },

            {
              name: "大同",
              area: [
                "城  区",
                "矿  区",
                "南郊区",
                "新荣区",
                "阳高县",
                "天镇县",
                "广灵县",
                "灵丘县",
                "浑源县",
                "左云县",
                "大同县"
              ]
            },

            {
              name: "阳泉",
              area: ["城  区", "矿  区", "郊  区", "平定县", "盂  县"]
            },

            {
              name: "长治",
              area: [
                "城  区",
                "郊  区",
                "长治县",
                "襄垣县",
                "屯留县",
                "平顺县",
                "黎城县",
                "壶关县",
                "长子县",
                "武乡县",
                "沁  县",
                "沁源县",
                "潞城市"
              ]
            },

            {
              name: "晋城",
              area: ["城  区", "沁水县", "阳城县", "陵川县", "泽州县", "高平市"]
            },

            {
              name: "朔州",
              area: ["朔城区", "平鲁区", "山阴县", "应  县", "右玉县", "怀仁县"]
            },

            {
              name: "忻州",
              area: [
                "忻府区",
                "原平市",
                "定襄县",
                "五台县",
                "代  县",
                "繁峙县",
                "宁武县",
                "静乐县",
                "神池县",
                "五寨县",
                "岢岚县",
                "河曲县",
                "保德县",
                "偏关县"
              ]
            },

            {
              name: "吕梁",
              area: [
                "离石区",
                "孝义市",
                "汾阳市",
                "文水县",
                "交城县",
                "兴  县",
                "临  县",
                "柳林县",
                "石楼县",
                "岚  县",
                "方山县",
                "中阳县",
                "交口县"
              ]
            },

            {
              name: "晋中",
              area: [
                "榆次市",
                "介休市",
                "榆社县",
                "左权县",
                "和顺县",
                "昔阳县",
                "寿阳县",
                "太谷县",
                "祁  县",
                "平遥县",
                "灵石县"
              ]
            },

            {
              name: "临汾",
              area: [
                "临汾市",
                "侯马市",
                "霍州市",
                "曲沃县",
                "翼城县",
                "襄汾县",
                "洪洞县",
                "古  县",
                "安泽县",
                "浮山县",
                "吉  县",
                "乡宁县",
                "蒲  县",
                "大宁县",
                "永和县",
                "隰  县",
                "汾西县"
              ]
            },

            {
              name: "运城",
              area: [
                "运城市",
                "永济市",
                "河津市",
                "芮城县",
                "临猗县",
                "万荣县",
                "新绛县",
                "稷山县",
                "闻喜县",
                "夏  县",
                "绛  县",
                "平陆县",
                "垣曲县"
              ]
            }
          ]
        },

        {
          name: "内蒙古",
          city: [
            {
              name: "呼和浩特",
              area: [
                "新城区",
                "回民区",
                "玉泉区",
                "郊  区",
                "土默特左旗",
                "托克托县",
                "和林格尔县",
                "清水河县",
                "武川县"
              ]
            },

            {
              name: "包头",
              area: [
                "东河区",
                "昆都伦区",
                "青山区",
                "石拐矿区",
                "白云矿区",
                "郊  区",
                "土默特右旗",
                "固阳县",
                "达尔罕茂明安联合旗"
              ]
            },

            { name: "乌海", area: ["海勃湾区", "海南区", "乌达区"] },

            {
              name: "赤峰",
              area: [
                "红山区",
                "元宝山区",
                "松山区",
                "阿鲁科尔沁旗",
                "巴林左旗",
                "巴林右旗",
                "林西县",
                "克什克腾旗",
                "翁牛特旗",
                "喀喇沁旗",
                "宁城县",
                "敖汉旗"
              ]
            },

            {
              name: "呼伦贝尔",
              area: [
                "海拉尔市",
                "满洲里市",
                "扎兰屯市",
                "牙克石市",
                "根河市",
                "额尔古纳市",
                "阿荣旗",
                "莫力达瓦达斡尔族自治旗",
                "鄂伦春自治旗",
                "鄂温克族自治旗",
                "新巴尔虎右旗",
                "新巴尔虎左旗",
                "陈巴尔虎旗"
              ]
            },

            {
              name: "兴安盟",
              area: [
                "乌兰浩特市",
                "阿尔山市",
                "科尔沁右翼前旗",
                "科尔沁右翼中旗",
                "扎赉特旗",
                "突泉县"
              ]
            },

            {
              name: "通辽",
              area: [
                "科尔沁区",
                "霍林郭勒市",
                "科尔沁左翼中旗",
                "科尔沁左翼后旗",
                "开鲁县",
                "库伦旗",
                "奈曼旗",
                "扎鲁特旗"
              ]
            },

            {
              name: "锡林郭勒盟",
              area: [
                "二连浩特市",
                "锡林浩特市",
                "阿巴嘎旗",
                "苏尼特左旗",
                "苏尼特右旗",
                "东乌珠穆沁旗",
                "西乌珠穆沁旗",
                "太仆寺旗",
                "镶黄旗",
                "正镶白旗",
                "正蓝旗",
                "多伦县"
              ]
            },

            {
              name: "乌兰察布盟",
              area: [
                "集宁市",
                "丰镇市",
                "卓资县",
                "化德县",
                "商都县",
                "兴和县",
                "凉城县",
                "察哈尔右翼前旗",
                "察哈尔右翼中旗",
                "察哈尔右翼后旗",
                "四子王旗"
              ]
            },

            {
              name: "伊克昭盟",
              area: [
                "东胜市",
                "达拉特旗",
                "准格尔旗",
                "鄂托克前旗",
                "鄂托克旗",
                "杭锦旗",
                "乌审旗",
                "伊金霍洛旗"
              ]
            },

            {
              name: "巴彦淖尔盟",
              area: [
                "临河市",
                "五原县",
                "磴口县",
                "乌拉特前旗",
                "乌拉特中旗",
                "乌拉特后旗",
                "杭锦后旗"
              ]
            },

            { name: "阿拉善盟", area: ["阿拉善左旗", "阿拉善右旗", "额济纳旗"] }
          ]
        },

        {
          name: "辽宁",
          city: [
            {
              name: "沈阳",
              area: [
                "沈河区",
                "皇姑区",
                "和平区",
                "大东区",
                "铁西区",
                "苏家屯区",
                "东陵区",
                "于洪区",
                "新民市",
                "法库县",
                "辽中县",
                "康平县",
                "新城子区",
                "其他"
              ]
            },

            {
              name: "大连",
              area: [
                "西岗区",
                "中山区",
                "沙河口区",
                "甘井子区",
                "旅顺口区",
                "金州区",
                "瓦房店市",
                "普兰店市",
                "庄河市",
                "长海县",
                "其他"
              ]
            },

            {
              name: "鞍山",
              area: [
                "铁东区",
                "铁西区",
                "立山区",
                "千山区",
                "海城市",
                "台安县",
                "岫岩满族自治县",
                "其他"
              ]
            },

            {
              name: "抚顺",
              area: [
                "顺城区",
                "新抚区",
                "东洲区",
                "望花区",
                "抚顺县",
                "清原满族自治县",
                "新宾满族自治县",
                "其他"
              ]
            },

            {
              name: "本溪",
              area: [
                "平山区",
                "明山区",
                "溪湖区",
                "南芬区",
                "本溪满族自治县",
                "桓仁满族自治县",
                "其他"
              ]
            },

            {
              name: "丹东",
              area: [
                "振兴区",
                "元宝区",
                "振安区",
                "东港市",
                "凤城市",
                "宽甸满族自治县",
                "其他"
              ]
            },

            {
              name: "锦州",
              area: [
                "太和区",
                "古塔区",
                "凌河区",
                "凌海市",
                "黑山县",
                "义县",
                "北宁市",
                "其他"
              ]
            },

            {
              name: "营口",
              area: [
                "站前区",
                "西市区",
                "鲅鱼圈区",
                "老边区",
                "大石桥市",
                "盖州市",
                "其他"
              ]
            },

            {
              name: "阜新",
              area: [
                "海州区",
                "新邱区",
                "太平区",
                "清河门区",
                "细河区",
                "彰武县",
                "阜新蒙古族自治县",
                "其他"
              ]
            },

            {
              name: "辽阳",
              area: [
                "白塔区",
                "文圣区",
                "宏伟区",
                "太子河区",
                "弓长岭区",
                "灯塔市",
                "辽阳县",
                "其他"
              ]
            },

            {
              name: "盘锦",
              area: ["双台子区", "兴隆台区", "盘山县", "大洼县", "其他"]
            },

            {
              name: "铁岭",
              area: [
                "银州区",
                "清河区",
                "调兵山市",
                "开原市",
                "铁岭县",
                "昌图县",
                "西丰县",
                "其他"
              ]
            },

            {
              name: "朝阳",
              area: [
                "双塔区",
                "龙城区",
                "凌源市",
                "北票市",
                "朝阳县",
                "建平县",
                "喀喇沁左翼蒙古族自治县",
                "其他"
              ]
            },

            {
              name: "葫芦岛",
              area: [
                "龙港区",
                "南票区",
                "连山区",
                "兴城市",
                "绥中县",
                "建昌县",
                "其他"
              ]
            },

            { name: "其他", area: ["其他"] }
          ]
        },

        {
          name: "吉林",
          city: [
            {
              name: "长春",
              area: [
                "朝阳区",
                "宽城区",
                "二道区",
                "南关区",
                "绿园区",
                "双阳区",
                "九台市",
                "榆树市",
                "德惠市",
                "农安县",
                "其他"
              ]
            },

            {
              name: "吉林",
              area: [
                "船营区",
                "昌邑区",
                "龙潭区",
                "丰满区",
                "舒兰市",
                "桦甸市",
                "蛟河市",
                "磐石市",
                "永吉县",
                "其他"
              ]
            },

            {
              name: "四平",
              area: [
                "铁西区",
                "铁东区",
                "公主岭市",
                "双辽市",
                "梨树县",
                "伊通满族自治县",
                "其他"
              ]
            },

            {
              name: "辽源",
              area: ["龙山区", "西安区", "东辽县", "东丰县", "其他"]
            },

            {
              name: "通化",
              area: [
                "东昌区",
                "二道江区",
                "梅河口市",
                "集安市",
                "通化县",
                "辉南县",
                "柳河县",
                "其他"
              ]
            },

            {
              name: "白山",
              area: [
                "八道江区",
                "江源区",
                "临江市",
                "靖宇县",
                "抚松县",
                "长白朝鲜族自治县",
                "其他"
              ]
            },

            {
              name: "松原",
              area: [
                "宁江区",
                "乾安县",
                "长岭县",
                "扶余县",
                "前郭尔罗斯蒙古族自治县",
                "其他"
              ]
            },

            {
              name: "白城",
              area: ["洮北区", "大安市", "洮南市", "镇赉县", "通榆县", "其他"]
            },

            {
              name: "延边朝鲜族自治州",
              area: [
                "延吉市",
                "图们市",
                "敦化市",
                "龙井市",
                "珲春市",
                "和龙市",
                "安图县",
                "汪清县",
                "其他"
              ]
            },

            { name: "其他", area: ["其他"] }
          ]
        },

        {
          name: "黑龙江",
          city: [
            {
              name: "哈尔滨",
              area: [
                "松北区",
                "道里区",
                "南岗区",
                "平房区",
                "香坊区",
                "道外区",
                "呼兰区",
                "阿城区",
                "双城市",
                "尚志市",
                "五常市",
                "宾县",
                "方正县",
                "通河县",
                "巴彦县",
                "延寿县",
                "木兰县",
                "依兰县",
                "其他"
              ]
            },

            {
              name: "齐齐哈尔",
              area: [
                "龙沙区",
                "昂昂溪区",
                "铁锋区",
                "建华区",
                "富拉尔基区",
                "碾子山区",
                "梅里斯达斡尔族区",
                "讷河市",
                "富裕县",
                "拜泉县",
                "甘南县",
                "依安县",
                "克山县",
                "泰来县",
                "克东县",
                "龙江县",
                "其他"
              ]
            },

            {
              name: "鹤岗",
              area: [
                "兴山区",
                "工农区",
                "南山区",
                "兴安区",
                "向阳区",
                "东山区",
                "萝北县",
                "绥滨县",
                "其他"
              ]
            },

            {
              name: "双鸭山",
              area: [
                "尖山区",
                "岭东区",
                "四方台区",
                "宝山区",
                "集贤县",
                "宝清县",
                "友谊县",
                "饶河县",
                "其他"
              ]
            },

            {
              name: "鸡西",
              area: [
                "鸡冠区",
                "恒山区",
                "城子河区",
                "滴道区",
                "梨树区",
                "麻山区",
                "密山市",
                "虎林市",
                "鸡东县",
                "其他"
              ]
            },

            {
              name: "大庆",
              area: [
                "萨尔图区",
                "红岗区",
                "龙凤区",
                "让胡路区",
                "大同区",
                "林甸县",
                "肇州县",
                "肇源县",
                "杜尔伯特蒙古族自治县",
                "其他"
              ]
            },

            {
              name: "伊春",
              area: [
                "伊春区",
                "带岭区",
                "南岔区",
                "金山屯区",
                "西林区",
                "美溪区",
                "乌马河区",
                "翠峦区",
                "友好区",
                "上甘岭区",
                "五营区",
                "红星区",
                "新青区",
                "汤旺河区",
                "乌伊岭区",
                "铁力市",
                "嘉荫县",
                "其他"
              ]
            },

            {
              name: "牡丹江",
              area: [
                "爱民区",
                "东安区",
                "阳明区",
                "西安区",
                "绥芬河市",
                "宁安市",
                "海林市",
                "穆棱市",
                "林口县",
                "东宁县",
                "其他"
              ]
            },

            {
              name: "佳木斯",
              area: [
                "向阳区",
                "前进区",
                "东风区",
                "郊区",
                "同江市",
                "富锦市",
                "桦川县",
                "抚远县",
                "桦南县",
                "汤原县",
                "其他"
              ]
            },

            {
              name: "七台河",
              area: ["桃山区", "新兴区", "茄子河区", "勃利县", "其他"]
            },

            {
              name: "黑河",
              area: [
                "爱辉区",
                "北安市",
                "五大连池市",
                "逊克县",
                "嫩江县",
                "孙吴县",
                "其他"
              ]
            },

            {
              name: "绥化",
              area: [
                "北林区",
                "安达市",
                "肇东市",
                "海伦市",
                "绥棱县",
                "兰西县",
                "明水县",
                "青冈县",
                "庆安县",
                "望奎县",
                "其他"
              ]
            },

            {
              name: "大兴安岭地区",
              area: ["呼玛县", "塔河县", "漠河县", "大兴安岭辖区", "其他"]
            },

            { name: "其他", area: ["其他"] }
          ]
        },

        {
          name: "上海",
          city: [
            {
              name: "上海",
              area: [
                "黄浦区",
                "卢湾区",
                "徐汇区",
                "长宁区",
                "静安区",
                "普陀区",
                "闸北区",
                "虹口区",
                "杨浦区",
                "宝山区",
                "闵行区",
                "嘉定区",
                "松江区",
                "金山区",
                "青浦区",
                "南汇区",
                "奉贤区",
                "浦东新区",
                "崇明县",
                "其他"
              ]
            }
          ]
        },

        {
          name: "江苏",
          city: [
            {
              name: "南京",
              area: [
                "玄武区",
                "白下区",
                "秦淮区",
                "建邺区",
                "鼓楼区",
                "下关区",
                "栖霞区",
                "雨花台区",
                "浦口区",
                "江宁区",
                "六合区",
                "溧水县",
                "高淳县",
                "其他"
              ]
            },

            {
              name: "苏州",
              area: [
                "金阊区",
                "平江区",
                "沧浪区",
                "虎丘区",
                "吴中区",
                "相城区",
                "常熟市",
                "张家港市",
                "昆山市",
                "吴江市",
                "太仓市",
                "其他"
              ]
            },

            {
              name: "无锡",
              area: [
                "崇安区",
                "南长区",
                "北塘区",
                "滨湖区",
                "锡山区",
                "惠山区",
                "江阴市",
                "宜兴市",
                "其他"
              ]
            },

            {
              name: "常州",
              area: [
                "钟楼区",
                "天宁区",
                "戚墅堰区",
                "新北区",
                "武进区",
                "金坛市",
                "溧阳市",
                "其他"
              ]
            },

            {
              name: "镇江",
              area: [
                "京口区",
                "润州区",
                "丹徒区",
                "丹阳市",
                "扬中市",
                "句容市",
                "其他"
              ]
            },

            {
              name: "南通",
              area: [
                "崇川区",
                "港闸区",
                "通州市",
                "如皋市",
                "海门市",
                "启东市",
                "海安县",
                "如东县",
                "其他"
              ]
            },

            {
              name: "泰州",
              area: [
                "海陵区",
                "高港区",
                "姜堰市",
                "泰兴市",
                "靖江市",
                "兴化市",
                "其他"
              ]
            },

            {
              name: "扬州",
              area: [
                "广陵区",
                "维扬区",
                "邗江区",
                "江都市",
                "仪征市",
                "高邮市",
                "宝应县",
                "其他"
              ]
            },

            {
              name: "盐城",
              area: [
                "亭湖区",
                "盐都区",
                "大丰市",
                "东台市",
                "建湖县",
                "射阳县",
                "阜宁县",
                "滨海县",
                "响水县",
                "其他"
              ]
            },

            {
              name: "连云港",
              area: [
                "新浦区",
                "海州区",
                "连云区",
                "东海县",
                "灌云县",
                "赣榆县",
                "灌南县",
                "其他"
              ]
            },

            {
              name: "徐州",
              area: [
                "云龙区",
                "鼓楼区",
                "九里区",
                "泉山区",
                "贾汪区",
                "邳州市",
                "新沂市",
                "铜山县",
                "睢宁县",
                "沛县",
                "丰县",
                "其他"
              ]
            },

            {
              name: "淮安",
              area: [
                "清河区",
                "清浦区",
                "楚州区",
                "淮阴区",
                "涟水县",
                "洪泽县",
                "金湖县",
                "盱眙县",
                "其他"
              ]
            },

            {
              name: "宿迁",
              area: ["宿城区", "宿豫区", "沭阳县", "泗阳县", "泗洪县", "其他"]
            },

            { name: "其他", area: ["其他"] }
          ]
        },

        {
          name: "浙江",
          city: [
            {
              name: "杭州",
              area: [
                "拱墅区",
                "西湖区",
                "上城区",
                "下城区",
                "江干区",
                "滨江区",
                "余杭区",
                "萧山区",
                "建德市",
                "富阳市",
                "临安市",
                "桐庐县",
                "淳安县",
                "其他"
              ]
            },

            {
              name: "宁波",
              area: [
                "海曙区",
                "江东区",
                "江北区",
                "镇海区",
                "北仑区",
                "鄞州区",
                "余姚市",
                "慈溪市",
                "奉化市",
                "宁海县",
                "象山县",
                "其他"
              ]
            },

            {
              name: "温州",
              area: [
                "鹿城区",
                "龙湾区",
                "瓯海区",
                "瑞安市",
                "乐清市",
                "永嘉县",
                "洞头县",
                "平阳县",
                "苍南县",
                "文成县",
                "泰顺县",
                "其他"
              ]
            },

            {
              name: "嘉兴",
              area: [
                "秀城区",
                "秀洲区",
                "海宁市",
                "平湖市",
                "桐乡市",
                "嘉善县",
                "海盐县",
                "其他"
              ]
            },

            {
              name: "湖州",
              area: ["吴兴区", "南浔区", "长兴县", "德清县", "安吉县", "其他"]
            },

            {
              name: "绍兴",
              area: [
                "越城区",
                "诸暨市",
                "上虞市",
                "嵊州市",
                "绍兴县",
                "新昌县",
                "其他"
              ]
            },

            {
              name: "金华",
              area: [
                "婺城区",
                "金东区",
                "兰溪市",
                "义乌市",
                "东阳市",
                "永康市",
                "武义县",
                "浦江县",
                "磐安县",
                "其他"
              ]
            },

            {
              name: "衢州",
              area: [
                "柯城区",
                "衢江区",
                "江山市",
                "龙游县",
                "常山县",
                "开化县",
                "其他"
              ]
            },

            {
              name: "舟山",
              area: ["定海区", "普陀区", "岱山县", "嵊泗县", "其他"]
            },

            {
              name: "台州",
              area: [
                "椒江区",
                "黄岩区",
                "路桥区",
                "临海市",
                "温岭市",
                "玉环县",
                "天台县",
                "仙居县",
                "三门县",
                "其他"
              ]
            },

            {
              name: "丽水",
              area: [
                "莲都区",
                "龙泉市",
                "缙云县",
                "青田县",
                "云和县",
                "遂昌县",
                "松阳县",
                "庆元县",
                "景宁畲族自治县",
                "其他"
              ]
            },

            { name: "其他", area: ["其他"] }
          ]
        },

        {
          name: "安徽",
          city: [
            {
              name: "合肥",
              area: [
                "庐阳区",
                "瑶海区",
                "蜀山区",
                "包河区",
                "长丰县",
                "肥东县",
                "肥西县",
                "其他"
              ]
            },

            {
              name: "芜湖",
              area: [
                "镜湖区",
                "弋江区",
                "鸠江区",
                "三山区",
                "芜湖县",
                "南陵县",
                "繁昌县",
                "其他"
              ]
            },

            {
              name: "蚌埠",
              area: [
                "蚌山区",
                "龙子湖区",
                "禹会区",
                "淮上区",
                "怀远县",
                "固镇县",
                "五河县",
                "其他"
              ]
            },

            {
              name: "淮南",
              area: [
                "田家庵区",
                "大通区",
                "谢家集区",
                "八公山区",
                "潘集区",
                "凤台县",
                "其他"
              ]
            },

            {
              name: "马鞍山",
              area: ["雨山区", "花山区", "金家庄区", "当涂县", "其他"]
            },

            {
              name: "淮北",
              area: ["相山区", "杜集区", "烈山区", "濉溪县", "其他"]
            },

            {
              name: "铜陵",
              area: ["铜官山区", "狮子山区", "郊区", "铜陵县", "其他"]
            },

            {
              name: "安庆",
              area: [
                "迎江区",
                "大观区",
                "宜秀区",
                "桐城市",
                "宿松县",
                "枞阳县",
                "太湖县",
                "怀宁县",
                "岳西县",
                "望江县",
                "潜山县",
                "其他"
              ]
            },

            {
              name: "黄山",
              area: [
                "屯溪区",
                "黄山区",
                "徽州区",
                "休宁县",
                "歙县",
                "祁门县",
                "黟县",
                "其他"
              ]
            },

            {
              name: "滁州",
              area: [
                "琅琊区",
                "南谯区",
                "天长市",
                "明光市",
                "全椒县",
                "来安县",
                "定远县",
                "凤阳县",
                "其他"
              ]
            },

            {
              name: "阜阳",
              area: [
                "颍州区",
                "颍东区",
                "颍泉区",
                "界首市",
                "临泉县",
                "颍上县",
                "阜南县",
                "太和县",
                "其他"
              ]
            },

            {
              name: "宿州",
              area: ["埇桥区", "萧县", "泗县", "砀山县", "灵璧县", "其他"]
            },

            {
              name: "巢湖",
              area: ["居巢区", "含山县", "无为县", "庐江县", "和县", "其他"]
            },

            {
              name: "六安",
              area: [
                "金安区",
                "裕安区",
                "寿县",
                "霍山县",
                "霍邱县",
                "舒城县",
                "金寨县",
                "其他"
              ]
            },

            {
              name: "亳州",
              area: ["谯城区", "利辛县", "涡阳县", "蒙城县", "其他"]
            },

            {
              name: "池州",
              area: ["贵池区", "东至县", "石台县", "青阳县", "其他"]
            },

            {
              name: "宣城",
              area: [
                "宣州区",
                "宁国市",
                "广德县",
                "郎溪县",
                "泾县",
                "旌德县",
                "绩溪县",
                "其他"
              ]
            },

            { name: "其他", area: ["其他"] }
          ]
        },

        {
          name: "福建",
          city: [
            {
              name: "福州",
              area: [
                "鼓楼区",
                "台江区",
                "仓山区",
                "马尾区",
                "晋安区",
                "福清市",
                "长乐市",
                "闽侯县",
                "闽清县",
                "永泰县",
                "连江县",
                "罗源县",
                "平潭县",
                "其他"
              ]
            },

            {
              name: "厦门",
              area: [
                "思明区",
                "海沧区",
                "湖里区",
                "集美区",
                "同安区",
                "翔安区",
                "其他"
              ]
            },

            {
              name: "莆田",
              area: ["城厢区", "涵江区", "荔城区", "秀屿区", "仙游县", "其他"]
            },

            {
              name: "三明",
              area: [
                "梅列区",
                "三元区",
                "永安市",
                "明溪县",
                "将乐县",
                "大田县",
                "宁化县",
                "建宁县",
                "沙县",
                "尤溪县",
                "清流县",
                "泰宁县",
                "其他"
              ]
            },

            {
              name: "泉州",
              area: [
                "鲤城区",
                "丰泽区",
                "洛江区",
                "泉港区",
                "石狮市",
                "晋江市",
                "南安市",
                "惠安县",
                "永春县",
                "安溪县",
                "德化县",
                "金门县",
                "其他"
              ]
            },

            {
              name: "漳州",
              area: [
                "芗城区",
                "龙文区",
                "龙海市",
                "平和县",
                "南靖县",
                "诏安县",
                "漳浦县",
                "华安县",
                "东山县",
                "长泰县",
                "云霄县",
                "其他"
              ]
            },

            {
              name: "南平",
              area: [
                "延平区",
                "建瓯市",
                "邵武市",
                "武夷山市",
                "建阳市",
                "松溪县",
                "光泽县",
                "顺昌县",
                "浦城县",
                "政和县",
                "其他"
              ]
            },

            {
              name: "龙岩",
              area: [
                "新罗区",
                "漳平市",
                "长汀县",
                "武平县",
                "上杭县",
                "永定县",
                "连城县",
                "其他"
              ]
            },

            {
              name: "宁德",
              area: [
                "蕉城区",
                "福安市",
                "福鼎市",
                "寿宁县",
                "霞浦县",
                "柘荣县",
                "屏南县",
                "古田县",
                "周宁县",
                "其他"
              ]
            },

            { name: "其他", area: ["其他"] }
          ]
        },

        {
          name: "江西",
          city: [
            {
              name: "南昌",
              area: [
                "东湖区",
                "西湖区",
                "青云谱区",
                "湾里区",
                "青山湖区",
                "新建县",
                "南昌县",
                "进贤县",
                "安义县",
                "其他"
              ]
            },

            {
              name: "景德镇",
              area: ["珠山区", "昌江区", "乐平市", "浮梁县", "其他"]
            },

            {
              name: "萍乡",
              area: ["安源区", "湘东区", "莲花县", "上栗县", "芦溪县", "其他"]
            },

            {
              name: "九江",
              area: [
                "浔阳区",
                "庐山区",
                "瑞昌市",
                "九江县",
                "星子县",
                "武宁县",
                "彭泽县",
                "永修县",
                "修水县",
                "湖口县",
                "德安县",
                "都昌县",
                "其他"
              ]
            },

            { name: "新余", area: ["渝水区", "分宜县", "其他"] },

            { name: "鹰潭", area: ["月湖区", "贵溪市", "余江县", "其他"] },

            {
              name: "赣州",
              area: [
                "章贡区",
                "瑞金市",
                "南康市",
                "石城县",
                "安远县",
                "赣县",
                "宁都县",
                "寻乌县",
                "兴国县",
                "定南县",
                "上犹县",
                "于都县",
                "龙南县",
                "崇义县",
                "信丰县",
                "全南县",
                "大余县",
                "会昌县",
                "其他"
              ]
            },

            {
              name: "吉安",
              area: [
                "吉州区",
                "青原区",
                "井冈山市",
                "吉安县",
                "永丰县",
                "永新县",
                "新干县",
                "泰和县",
                "峡江县",
                "遂川县",
                "安福县",
                "吉水县",
                "万安县",
                "其他"
              ]
            },

            {
              name: "宜春",
              area: [
                "袁州区",
                "丰城市",
                "樟树市",
                "高安市",
                "铜鼓县",
                "靖安县",
                "宜丰县",
                "奉新县",
                "万载县",
                "上高县",
                "其他"
              ]
            },

            {
              name: "抚州",
              area: [
                "临川区",
                "南丰县",
                "乐安县",
                "金溪县",
                "南城县",
                "东乡县",
                "资溪县",
                "宜黄县",
                "广昌县",
                "黎川县",
                "崇仁县",
                "其他"
              ]
            },

            {
              name: "上饶",
              area: [
                "信州区",
                "德兴市",
                "上饶县",
                "广丰县",
                "鄱阳县",
                "婺源县",
                "铅山县",
                "余干县",
                "横峰县",
                "弋阳县",
                "玉山县",
                "万年县",
                "其他"
              ]
            },

            { name: "其他", area: ["其他"] }
          ]
        },

        {
          name: "山东",
          city: [
            {
              name: "济南",
              area: [
                "市中区",
                "历下区",
                "天桥区",
                "槐荫区",
                "历城区",
                "长清区",
                "章丘市",
                "平阴县",
                "济阳县",
                "商河县",
                "其他"
              ]
            },

            {
              name: "青岛",
              area: [
                "市南区",
                "市北区",
                "城阳区",
                "四方区",
                "李沧区",
                "黄岛区",
                "崂山区",
                "胶南市",
                "胶州市",
                "平度市",
                "莱西市",
                "即墨市",
                "其他"
              ]
            },

            {
              name: "淄博",
              area: [
                "张店区",
                "临淄区",
                "淄川区",
                "博山区",
                "周村区",
                "桓台县",
                "高青县",
                "沂源县",
                "其他"
              ]
            },

            {
              name: "枣庄",
              area: [
                "市中区",
                "山亭区",
                "峄城区",
                "台儿庄区",
                "薛城区",
                "滕州市",
                "其他"
              ]
            },

            {
              name: "东营",
              area: ["东营区", "河口区", "垦利县", "广饶县", "利津县", "其他"]
            },

            {
              name: "烟台",
              area: [
                "芝罘区",
                "福山区",
                "牟平区",
                "莱山区",
                "龙口市",
                "莱阳市",
                "莱州市",
                "招远市",
                "蓬莱市",
                "栖霞市",
                "海阳市",
                "长岛县",
                "其他"
              ]
            },

            {
              name: "潍坊",
              area: [
                "潍城区",
                "寒亭区",
                "坊子区",
                "奎文区",
                "青州市",
                "诸城市",
                "寿光市",
                "安丘市",
                "高密市",
                "昌邑市",
                "昌乐县",
                "临朐县",
                "其他"
              ]
            },

            {
              name: "济宁",
              area: [
                "市中区",
                "任城区",
                "曲阜市",
                "兖州市",
                "邹城市",
                "鱼台县",
                "金乡县",
                "嘉祥县",
                "微山县",
                "汶上县",
                "泗水县",
                "梁山县",
                "其他"
              ]
            },

            {
              name: "泰安",
              area: [
                "泰山区",
                "岱岳区",
                "新泰市",
                "肥城市",
                "宁阳县",
                "东平县",
                "其他"
              ]
            },

            {
              name: "威海",
              area: ["环翠区", "乳山市", "文登市", "荣成市", "其他"]
            },

            {
              name: "日照",
              area: ["东港区", "岚山区", "五莲县", "莒县", "其他"]
            },

            { name: "莱芜", area: ["莱城区", "钢城区", "其他"] },

            {
              name: "临沂",
              area: [
                "兰山区",
                "罗庄区",
                "河东区",
                "沂南县",
                "郯城县",
                "沂水县",
                "苍山县",
                "费县",
                "平邑县",
                "莒南县",
                "蒙阴县",
                "临沭县",
                "其他"
              ]
            },

            {
              name: "德州",
              area: [
                "德城区",
                "乐陵市",
                "禹城市",
                "陵县",
                "宁津县",
                "齐河县",
                "武城县",
                "庆云县",
                "平原县",
                "夏津县",
                "临邑县",
                "其他"
              ]
            },

            {
              name: "聊城",
              area: [
                "东昌府区",
                "临清市",
                "高唐县",
                "阳谷县",
                "茌平县",
                "莘县",
                "东阿县",
                "冠县",
                "其他"
              ]
            },

            {
              name: "滨州",
              area: [
                "滨城区",
                "邹平县",
                "沾化县",
                "惠民县",
                "博兴县",
                "阳信县",
                "无棣县",
                "其他"
              ]
            },

            {
              name: "菏泽",
              area: [
                "牡丹区",
                "鄄城县",
                "单县",
                "郓城县",
                "曹县",
                "定陶县",
                "巨野县",
                "东明县",
                "成武县",
                "其他"
              ]
            },

            { name: "其他", area: ["其他"] }
          ]
        },

        {
          name: "河南",
          city: [
            {
              name: "郑州",
              area: [
                "中原区",
                "金水区",
                "二七区",
                "管城回族区",
                "上街区",
                "惠济区",
                "巩义市",
                "新郑市",
                "新密市",
                "登封市",
                "荥阳市",
                "中牟县",
                "其他"
              ]
            },

            {
              name: "开封",
              area: [
                "鼓楼区",
                "龙亭区",
                "顺河回族区",
                "禹王台区",
                "金明区",
                "开封县",
                "尉氏县",
                "兰考县",
                "杞县",
                "通许县",
                "其他"
              ]
            },

            {
              name: "洛阳",
              area: [
                "西工区",
                "老城区",
                "涧西区",
                "瀍河回族区",
                "洛龙区",
                "吉利区",
                "偃师市",
                "孟津县",
                "汝阳县",
                "伊川县",
                "洛宁县",
                "嵩县",
                "宜阳县",
                "新安县",
                "栾川县",
                "其他"
              ]
            },

            {
              name: "平顶山",
              area: [
                "新华区",
                "卫东区",
                "湛河区",
                "石龙区",
                "汝州市",
                "舞钢市",
                "宝丰县",
                "叶县",
                "郏县",
                "鲁山县",
                "其他"
              ]
            },

            {
              name: "安阳",
              area: [
                "北关区",
                "文峰区",
                "殷都区",
                "龙安区",
                "林州市",
                "安阳县",
                "滑县",
                "内黄县",
                "汤阴县",
                "其他"
              ]
            },

            {
              name: "鹤壁",
              area: ["淇滨区", "山城区", "鹤山区", "浚县", "淇县", "其他"]
            },

            {
              name: "新乡",
              area: [
                "卫滨区",
                "红旗区",
                "凤泉区",
                "牧野区",
                "卫辉市",
                "辉县市",
                "新乡县",
                "获嘉县",
                "原阳县",
                "长垣县",
                "封丘县",
                "延津县",
                "其他"
              ]
            },

            {
              name: "焦作",
              area: [
                "解放区",
                "中站区",
                "马村区",
                "山阳区",
                "沁阳市",
                "孟州市",
                "修武县",
                "温县",
                "武陟县",
                "博爱县",
                "其他"
              ]
            },

            {
              name: "濮阳",
              area: [
                "华龙区",
                "濮阳县",
                "南乐县",
                "台前县",
                "清丰县",
                "范县",
                "其他"
              ]
            },

            {
              name: "许昌",
              area: [
                "魏都区",
                "禹州市",
                "长葛市",
                "许昌县",
                "鄢陵县",
                "襄城县",
                "其他"
              ]
            },

            {
              name: "漯河",
              area: ["源汇区", "郾城区", "召陵区", "临颍县", "舞阳县", "其他"]
            },

            {
              name: "三门峡",
              area: [
                "湖滨区",
                "义马市",
                "灵宝市",
                "渑池县",
                "卢氏县",
                "陕县",
                "其他"
              ]
            },

            {
              name: "南阳",
              area: [
                "卧龙区",
                "宛城区",
                "邓州市",
                "桐柏县",
                "方城县",
                "淅川县",
                "镇平县",
                "唐河县",
                "南召县",
                "内乡县",
                "新野县",
                "社旗县",
                "西峡县",
                "其他"
              ]
            },

            {
              name: "商丘",
              area: [
                "梁园区",
                "睢阳区",
                "永城市",
                "宁陵县",
                "虞城县",
                "民权县",
                "夏邑县",
                "柘城县",
                "睢县",
                "其他"
              ]
            },

            {
              name: "信阳",
              area: [
                "浉河区",
                "平桥区",
                "潢川县",
                "淮滨县",
                "息县",
                "新县",
                "商城县",
                "固始县",
                "罗山县",
                "光山县",
                "其他"
              ]
            },

            {
              name: "周口",
              area: [
                "川汇区",
                "项城市",
                "商水县",
                "淮阳县",
                "太康县",
                "鹿邑县",
                "西华县",
                "扶沟县",
                "沈丘县",
                "郸城县",
                "其他"
              ]
            },

            {
              name: "驻马店",
              area: [
                "驿城区",
                "确山县",
                "新蔡县",
                "上蔡县",
                "西平县",
                "泌阳县",
                "平舆县",
                "汝南县",
                "遂平县",
                "正阳县",
                "其他"
              ]
            },

            { name: "焦作", area: ["济源市", "其他"] },

            { name: "其他", area: ["其他"] }
          ]
        },

        {
          name: "湖北",
          city: [
            {
              name: "武汉",
              area: [
                "江岸区",
                "武昌区",
                "江汉区",
                "硚口区",
                "汉阳区",
                "青山区",
                "洪山区",
                "东西湖区",
                "汉南区",
                "蔡甸区",
                "江夏区",
                "黄陂区",
                "新洲区",
                "其他"
              ]
            },

            {
              name: "黄石",
              area: [
                "黄石港区",
                "西塞山区",
                "下陆区",
                "铁山区",
                "大冶市",
                "阳新县",
                "其他"
              ]
            },

            {
              name: "十堰",
              area: [
                "张湾区",
                "茅箭区",
                "丹江口市",
                "郧县",
                "竹山县",
                "房县",
                "郧西县",
                "竹溪县",
                "其他"
              ]
            },

            {
              name: "荆州",
              area: [
                "沙市区",
                "荆州区",
                "洪湖市",
                "石首市",
                "松滋市",
                "监利县",
                "公安县",
                "江陵县",
                "其他"
              ]
            },

            {
              name: "宜昌",
              area: [
                "西陵区",
                "伍家岗区",
                "点军区",
                "猇亭区",
                "夷陵区",
                "宜都市",
                "当阳市",
                "枝江市",
                "秭归县",
                "远安县",
                "兴山县",
                "五峰土家族自治县",
                "长阳土家族自治县",
                "其他"
              ]
            },

            {
              name: "襄樊",
              area: [
                "襄城区",
                "樊城区",
                "襄阳区",
                "老河口市",
                "枣阳市",
                "宜城市",
                "南漳县",
                "谷城县",
                "保康县",
                "其他"
              ]
            },

            { name: "鄂州", area: ["鄂城区", "华容区", "梁子湖区", "其他"] },

            {
              name: "荆门",
              area: ["东宝区", "掇刀区", "钟祥市", "京山县", "沙洋县", "其他"]
            },

            {
              name: "孝感",
              area: [
                "孝南区",
                "应城市",
                "安陆市",
                "汉川市",
                "云梦县",
                "大悟县",
                "孝昌县",
                "其他"
              ]
            },

            {
              name: "黄冈",
              area: [
                "黄州区",
                "麻城市",
                "武穴市",
                "红安县",
                "罗田县",
                "浠水县",
                "蕲春县",
                "黄梅县",
                "英山县",
                "团风县",
                "其他"
              ]
            },

            {
              name: "咸宁",
              area: [
                "咸安区",
                "赤壁市",
                "嘉鱼县",
                "通山县",
                "崇阳县",
                "通城县",
                "其他"
              ]
            },

            { name: "随州", area: ["曾都区", "广水市", "其他"] },

            {
              name: "恩施土家族苗族自治州",
              area: [
                "恩施市",
                "利川市",
                "建始县",
                "来凤县",
                "巴东县",
                "鹤峰县",
                "宣恩县",
                "咸丰县",
                "其他"
              ]
            },

            { name: "仙桃", area: ["仙桃"] },

            { name: "天门", area: ["天门"] },

            { name: "潜江", area: ["潜江"] },

            { name: "神农架林区", area: ["神农架林区"] },

            { name: "其他", area: ["其他"] }
          ]
        },

        {
          name: "湖南",
          city: [
            {
              name: "长沙",
              area: [
                "岳麓区",
                "芙蓉区",
                "天心区",
                "开福区",
                "雨花区",
                "浏阳市",
                "长沙县",
                "望城县",
                "宁乡县",
                "其他"
              ]
            },

            {
              name: "株洲",
              area: [
                "天元区",
                "荷塘区",
                "芦淞区",
                "石峰区",
                "醴陵市",
                "株洲县",
                "炎陵县",
                "茶陵县",
                "攸县",
                "其他"
              ]
            },

            {
              name: "湘潭",
              area: ["岳塘区", "雨湖区", "湘乡市", "韶山市", "湘潭县", "其他"]
            },

            {
              name: "衡阳",
              area: [
                "雁峰区",
                "珠晖区",
                "石鼓区",
                "蒸湘区",
                "南岳区",
                "耒阳市",
                "常宁市",
                "衡阳县",
                "衡东县",
                "衡山县",
                "衡南县",
                "祁东县",
                "其他"
              ]
            },

            {
              name: "邵阳",
              area: [
                "双清区",
                "大祥区",
                "北塔区",
                "武冈市",
                "邵东县",
                "洞口县",
                "新邵县",
                "绥宁县",
                "新宁县",
                "邵阳县",
                "隆回县",
                "城步苗族自治县",
                "其他"
              ]
            },

            {
              name: "岳阳",
              area: [
                "岳阳楼区",
                "云溪区",
                "君山区",
                "临湘市",
                "汨罗市",
                "岳阳县",
                "湘阴县",
                "平江县",
                "华容县",
                "其他"
              ]
            },

            {
              name: "常德",
              area: [
                "武陵区",
                "鼎城区",
                "津市市",
                "澧县",
                "临澧县",
                "桃源县",
                "汉寿县",
                "安乡县",
                "石门县",
                "其他"
              ]
            },

            {
              name: "张家界",
              area: ["永定区", "武陵源区", "慈利县", "桑植县", "其他"]
            },

            {
              name: "益阳",
              area: [
                "赫山区",
                "资阳区",
                "沅江市",
                "桃江县",
                "南县",
                "安化县",
                "其他"
              ]
            },

            {
              name: "郴州",
              area: [
                "北湖区",
                "苏仙区",
                "资兴市",
                "宜章县",
                "汝城县",
                "安仁县",
                "嘉禾县",
                "临武县",
                "桂东县",
                "永兴县",
                "桂阳县",
                "其他"
              ]
            },

            {
              name: "永州",
              area: [
                "冷水滩区",
                "零陵区",
                "祁阳县",
                "蓝山县",
                "宁远县",
                "新田县",
                "东安县",
                "江永县",
                "道县",
                "双牌县",
                "江华瑶族自治县",
                "其他"
              ]
            },

            {
              name: "怀化",
              area: [
                "鹤城区",
                "洪江市",
                "会同县",
                "沅陵县",
                "辰溪县",
                "溆浦县",
                "中方县",
                "新晃侗族自治县",
                "芷江侗族自治县",
                "通道侗族自治县",
                "靖州苗族侗族自治县",
                "麻阳苗族自治县",
                "其他"
              ]
            },

            {
              name: "娄底",
              area: ["娄星区", "冷水江市", "涟源市", "新化县", "双峰县", "其他"]
            },

            {
              name: "湘西土家族苗族自治州",
              area: [
                "吉首市",
                "古丈县",
                "龙山县",
                "永顺县",
                "凤凰县",
                "泸溪县",
                "保靖县",
                "花垣县",
                "其他"
              ]
            },

            { name: "其他", area: ["其他"] }
          ]
        },

        {
          name: "广东",
          city: [
            {
              name: "广州",
              area: [
                "越秀区",
                "荔湾区",
                "海珠区",
                "天河区",
                "白云区",
                "黄埔区",
                "番禺区",
                "花都区",
                "南沙区",
                "萝岗区",
                "增城市",
                "从化市",
                "其他"
              ]
            },

            {
              name: "深圳",
              area: [
                "福田区",
                "罗湖区",
                "南山区",
                "宝安区",
                "龙岗区",
                "盐田区",
                "其他"
              ]
            },

            {
              name: "东莞",
              area: ["莞城", "常平", "塘厦", "塘厦", "塘厦", "其他"]
            },

            { name: "中山", area: ["中山"] },

            { name: "潮州", area: ["湘桥区", "潮安县", "饶平县", "其他"] },

            {
              name: "揭阳",
              area: ["榕城区", "揭东县", "揭西县", "惠来县", "普宁市", "其他"]
            },

            {
              name: "云浮",
              area: ["云城区", "新兴县", "郁南县", "云安县", "罗定市", "其他"]
            },

            { name: "珠海", area: ["香洲区", "斗门区", "金湾区", "其他"] },

            {
              name: "汕头",
              area: [
                "金平区",
                "濠江区",
                "龙湖区",
                "潮阳区",
                "潮南区",
                "澄海区",
                "南澳县",
                "其他"
              ]
            },

            {
              name: "韶关",
              area: [
                "浈江区",
                "武江区",
                "曲江区",
                "乐昌市",
                "南雄市",
                "始兴县",
                "仁化县",
                "翁源县",
                "新丰县",
                "乳源瑶族自治县",
                "其他"
              ]
            },

            {
              name: "佛山",
              area: ["禅城区", "南海区", "顺德区", "三水区", "高明区", "其他"]
            },

            {
              name: "江门",
              area: [
                "蓬江区",
                "江海区",
                "新会区",
                "恩平市",
                "台山市",
                "开平市",
                "鹤山市",
                "其他"
              ]
            },

            {
              name: "湛江",
              area: [
                "赤坎区",
                "霞山区",
                "坡头区",
                "麻章区",
                "吴川市",
                "廉江市",
                "雷州市",
                "遂溪县",
                "徐闻县",
                "其他"
              ]
            },

            {
              name: "茂名",
              area: [
                "茂南区",
                "茂港区",
                "化州市",
                "信宜市",
                "高州市",
                "电白县",
                "其他"
              ]
            },

            {
              name: "肇庆",
              area: [
                "端州区",
                "鼎湖区",
                "高要市",
                "四会市",
                "广宁县",
                "怀集县",
                "封开县",
                "德庆县",
                "其他"
              ]
            },

            {
              name: "惠州",
              area: ["惠城区", "惠阳区", "博罗县", "惠东县", "龙门县", "其他"]
            },

            {
              name: "梅州",
              area: [
                "梅江区",
                "兴宁市",
                "梅县",
                "大埔县",
                "丰顺县",
                "五华县",
                "平远县",
                "蕉岭县",
                "其他"
              ]
            },

            {
              name: "汕尾",
              area: ["城区", "陆丰市", "海丰县", "陆河县", "其他"]
            },

            {
              name: "河源",
              area: [
                "源城区",
                "紫金县",
                "龙川县",
                "连平县",
                "和平县",
                "东源县",
                "其他"
              ]
            },

            {
              name: "阳江",
              area: ["江城区", "阳春市", "阳西县", "阳东县", "其他"]
            },

            {
              name: "清远",
              area: [
                "清城区",
                "英德市",
                "连州市",
                "佛冈县",
                "阳山县",
                "清新县",
                "连山壮族瑶族自治县",
                "连南瑶族自治县",
                "其他"
              ]
            }
          ]
        },

        {
          name: "广西",
          city: [
            {
              name: "南宁",
              area: [
                "青秀区",
                "兴宁区",
                "西乡塘区",
                "良庆区",
                "江南区",
                "邕宁区",
                "武鸣县",
                "隆安县",
                "马山县",
                "上林县",
                "宾阳县",
                "横县",
                "其他"
              ]
            },

            {
              name: "柳州",
              area: [
                "城中区",
                "鱼峰区",
                "柳北区",
                "柳南区",
                "柳江县",
                "柳城县",
                "鹿寨县",
                "融安县",
                "融水苗族自治县",
                "三江侗族自治县",
                "其他"
              ]
            },

            {
              name: "桂林",
              area: [
                "象山区",
                "秀峰区",
                "叠彩区",
                "七星区",
                "雁山区",
                "阳朔县",
                "临桂县",
                "灵川县",
                "全州县",
                "平乐县",
                "兴安县",
                "灌阳县",
                "荔浦县",
                "资源县",
                "永福县",
                "龙胜各族自治县",
                "恭城瑶族自治县",
                "其他"
              ]
            },

            {
              name: "梧州",
              area: [
                "万秀区",
                "蝶山区",
                "长洲区",
                "岑溪市",
                "苍梧县",
                "藤县",
                "蒙山县",
                "其他"
              ]
            },

            {
              name: "北海",
              area: ["海城区", "银海区", "铁山港区", "合浦县", "其他"]
            },

            {
              name: "防城港",
              area: ["港口区", "防城区", "东兴市", "上思县", "其他"]
            },

            {
              name: "钦州",
              area: ["钦南区", "钦北区", "灵山县", "浦北县", "其他"]
            },

            {
              name: "贵港",
              area: ["港北区", "港南区", "覃塘区", "桂平市", "平南县", "其他"]
            },

            {
              name: "玉林",
              area: [
                "玉州区",
                "北流市",
                "容县",
                "陆川县",
                "博白县",
                "兴业县",
                "其他"
              ]
            },

            {
              name: "百色",
              area: [
                "右江区",
                "凌云县",
                "平果县",
                "西林县",
                "乐业县",
                "德保县",
                "田林县",
                "田阳县",
                "靖西县",
                "田东县",
                "那坡县",
                "隆林各族自治县",
                "其他"
              ]
            },

            {
              name: "贺州",
              area: ["八步区", "钟山县", "昭平县", "富川瑶族自治县", "其他"]
            },

            {
              name: "河池",
              area: [
                "金城江区",
                "宜州市",
                "天峨县",
                "凤山县",
                "南丹县",
                "东兰县",
                "都安瑶族自治县",
                "罗城仫佬族自治县",
                "巴马瑶族自治县",
                "环江毛南族自治县",
                "大化瑶族自治县",
                "其他"
              ]
            },

            {
              name: "来宾",
              area: [
                "兴宾区",
                "合山市",
                "象州县",
                "武宣县",
                "忻城县",
                "金秀瑶族自治县",
                "其他"
              ]
            },

            {
              name: "崇左",
              area: [
                "江州区",
                "凭祥市",
                "宁明县",
                "扶绥县",
                "龙州县",
                "大新县",
                "天等县",
                "其他"
              ]
            },

            { name: "其他", area: ["其他"] }
          ]
        },

        {
          name: "海南",
          city: [
            {
              name: "海口",
              area: ["龙华区", "秀英区", "琼山区", "美兰区", "其他"]
            },

            { name: "三亚", area: ["三亚市", "其他"] },

            { name: "五指山", area: ["五指山"] },

            { name: "琼海", area: ["琼海"] },

            { name: "儋州", area: ["儋州"] },

            { name: "文昌", area: ["文昌"] },

            { name: "万宁", area: ["万宁"] },

            { name: "东方", area: ["东方"] },

            { name: "澄迈县", area: ["澄迈县"] },

            { name: "定安县", area: ["定安县"] },

            { name: "屯昌县", area: ["屯昌县"] },

            { name: "临高县", area: ["临高县"] },

            { name: "白沙黎族自治县", area: ["白沙黎族自治县"] },

            { name: "昌江黎族自治县", area: ["昌江黎族自治县"] },

            { name: "乐东黎族自治县", area: ["乐东黎族自治县"] },

            { name: "陵水黎族自治县", area: ["陵水黎族自治县"] },

            { name: "保亭黎族苗族自治县", area: ["保亭黎族苗族自治县"] },

            { name: "琼中黎族苗族自治县", area: ["琼中黎族苗族自治县"] },

            { name: "其他", area: ["其他"] }
          ]
        },

        {
          name: "重庆",
          city: [
            {
              name: "重庆",
              area: [
                "渝中区",
                "大渡口区",
                "江北区",
                "南岸区",
                "北碚区",
                "渝北区",
                "巴南区",
                "长寿区",
                "双桥区",
                "沙坪坝区",
                "万盛区",
                "万州区",
                "涪陵区",
                "黔江区",
                "永川区",
                "合川区",
                "江津区",
                "九龙坡区",
                "南川区",
                "綦江县",
                "潼南县",
                "荣昌县",
                "璧山县",
                "大足县",
                "铜梁县",
                "梁平县",
                "开县",
                "忠县",
                "城口县",
                "垫江县",
                "武隆县",
                "丰都县",
                "奉节县",
                "云阳县",
                "巫溪县",
                "巫山县",
                "石柱土家族自治县",
                "秀山土家族苗族自治县",
                "酉阳土家族苗族自治县",
                "彭水苗族土家族自治县",
                "其他"
              ]
            }
          ]
        },

        {
          name: "四川",
          city: [
            {
              name: "成都",
              area: [
                "青羊区",
                "锦江区",
                "金牛区",
                "武侯区",
                "成华区",
                "龙泉驿区",
                "青白江区",
                "新都区",
                "温江区",
                "都江堰市",
                "彭州市",
                "邛崃市",
                "崇州市",
                "金堂县",
                "郫县",
                "新津县",
                "双流县",
                "蒲江县",
                "大邑县",
                "其他"
              ]
            },

            {
              name: "自贡",
              area: [
                "大安区",
                "自流井区",
                "贡井区",
                "沿滩区",
                "荣县",
                "富顺县",
                "其他"
              ]
            },

            {
              name: "攀枝花",
              area: ["仁和区", "米易县", "盐边县", "东区", "西区", "其他"]
            },

            {
              name: "泸州",
              area: [
                "江阳区",
                "纳溪区",
                "龙马潭区",
                "泸县",
                "合江县",
                "叙永县",
                "古蔺县",
                "其他"
              ]
            },

            {
              name: "德阳",
              area: [
                "旌阳区",
                "广汉市",
                "什邡市",
                "绵竹市",
                "罗江县",
                "中江县",
                "其他"
              ]
            },

            {
              name: "绵阳",
              area: [
                "涪城区",
                "游仙区",
                "江油市",
                "盐亭县",
                "三台县",
                "平武县",
                "安县",
                "梓潼县",
                "北川羌族自治县",
                "其他"
              ]
            },

            {
              name: "广元",
              area: [
                "元坝区",
                "朝天区",
                "青川县",
                "旺苍县",
                "剑阁县",
                "苍溪县",
                "市中区",
                "其他"
              ]
            },

            {
              name: "遂宁",
              area: ["船山区", "安居区", "射洪县", "蓬溪县", "大英县", "其他"]
            },

            {
              name: "内江",
              area: ["市中区", "东兴区", "资中县", "隆昌县", "威远县", "其他"]
            },

            {
              name: "乐山",
              area: [
                "市中区",
                "五通桥区",
                "沙湾区",
                "金口河区",
                "峨眉山市",
                "夹江县",
                "井研县",
                "犍为县",
                "沐川县",
                "马边彝族自治县",
                "峨边彝族自治县",
                "其他"
              ]
            },

            {
              name: "南充",
              area: [
                "顺庆区",
                "高坪区",
                "嘉陵区",
                "阆中市",
                "营山县",
                "蓬安县",
                "仪陇县",
                "南部县",
                "西充县",
                "其他"
              ]
            },

            {
              name: "眉山",
              area: [
                "东坡区",
                "仁寿县",
                "彭山县",
                "洪雅县",
                "丹棱县",
                "青神县",
                "其他"
              ]
            },

            {
              name: "宜宾",
              area: [
                "翠屏区",
                "宜宾县",
                "兴文县",
                "南溪县",
                "珙县",
                "长宁县",
                "高县",
                "江安县",
                "筠连县",
                "屏山县",
                "其他"
              ]
            },

            {
              name: "广安",
              area: ["广安区", "华蓥市", "岳池县", "邻水县", "武胜县", "其他"]
            },

            {
              name: "达州",
              area: [
                "通川区",
                "万源市",
                "达县",
                "渠县",
                "宣汉县",
                "开江县",
                "大竹县",
                "其他"
              ]
            },

            {
              name: "雅安",
              area: [
                "雨城区",
                "芦山县",
                "石棉县",
                "名山县",
                "天全县",
                "荥经县",
                "宝兴县",
                "汉源县",
                "其他"
              ]
            },

            {
              name: "巴中",
              area: ["巴州区", "南江县", "平昌县", "通江县", "其他"]
            },

            {
              name: "资阳",
              area: ["雁江区", "简阳市", "安岳县", "乐至县", "其他"]
            },

            {
              name: "阿坝藏族羌族自治州",
              area: [
                "马尔康县",
                "九寨沟县",
                "红原县",
                "汶川县",
                "阿坝县",
                "理县",
                "若尔盖县",
                "小金县",
                "黑水县",
                "金川县",
                "松潘县",
                "壤塘县",
                "茂县",
                "其他"
              ]
            },

            {
              name: "甘孜藏族自治州",
              area: [
                "康定县",
                "丹巴县",
                "炉霍县",
                "九龙县",
                "甘孜县",
                "雅江县",
                "新龙县",
                "道孚县",
                "白玉县",
                "理塘县",
                "德格县",
                "乡城县",
                "石渠县",
                "稻城县",
                "色达县",
                "巴塘县",
                "泸定县",
                "得荣县",
                "其他"
              ]
            },

            {
              name: "凉山彝族自治州",
              area: [
                "西昌市",
                "美姑县",
                "昭觉县",
                "金阳县",
                "甘洛县",
                "布拖县",
                "雷波县",
                "普格县",
                "宁南县",
                "喜德县",
                "会东县",
                "越西县",
                "会理县",
                "盐源县",
                "德昌县",
                "冕宁县",
                "木里藏族自治县",
                "其他"
              ]
            },

            { name: "其他", area: ["其他"] }
          ]
        },

        {
          name: "贵州",
          city: [
            {
              name: "贵阳",
              area: [
                "南明区",
                "云岩区",
                "花溪区",
                "乌当区",
                "白云区",
                "小河区",
                "清镇市",
                "开阳县",
                "修文县",
                "息烽县",
                "其他"
              ]
            },

            {
              name: "六盘水",
              area: ["钟山区", "水城县", "盘县", "六枝特区", "其他"]
            },

            {
              name: "遵义",
              area: [
                "红花岗区",
                "汇川区",
                "赤水市",
                "仁怀市",
                "遵义县",
                "绥阳县",
                "桐梓县",
                "习水县",
                "凤冈县",
                "正安县",
                "余庆县",
                "湄潭县",
                "道真仡佬族苗族自治县",
                "务川仡佬族苗族自治县",
                "其他"
              ]
            },

            {
              name: "安顺",
              area: [
                "西秀区",
                "普定县",
                "平坝县",
                "镇宁布依族苗族自治县",
                "紫云苗族布依族自治县",
                "关岭布依族苗族自治县",
                "其他"
              ]
            },

            {
              name: "铜仁地区",
              area: [
                "铜仁市",
                "德江县",
                "江口县",
                "思南县",
                "石阡县",
                "玉屏侗族自治县",
                "松桃苗族自治县",
                "印江土家族苗族自治县",
                "沿河土家族自治县",
                "万山特区",
                "其他"
              ]
            },

            {
              name: "毕节地区",
              area: [
                "毕节市",
                "黔西县",
                "大方县",
                "织金县",
                "金沙县",
                "赫章县",
                "纳雍县",
                "威宁彝族回族苗族自治县",
                "其他"
              ]
            },

            {
              name: "黔西南布依族苗族自治州",
              area: [
                "兴义市",
                "望谟县",
                "兴仁县",
                "普安县",
                "册亨县",
                "晴隆县",
                "贞丰县",
                "安龙县",
                "其他"
              ]
            },

            {
              name: "黔东南苗族侗族自治州",
              area: [
                "凯里市",
                "施秉县",
                "从江县",
                "锦屏县",
                "镇远县",
                "麻江县",
                "台江县",
                "天柱县",
                "黄平县",
                "榕江县",
                "剑河县",
                "三穗县",
                "雷山县",
                "黎平县",
                "岑巩县",
                "丹寨县",
                "其他"
              ]
            },

            {
              name: "黔南布依族苗族自治州",
              area: [
                "都匀市",
                "福泉市",
                "贵定县",
                "惠水县",
                "罗甸县",
                "瓮安县",
                "荔波县",
                "龙里县",
                "平塘县",
                "长顺县",
                "独山县",
                "三都水族自治县",
                "其他"
              ]
            },

            { name: "其他", area: ["其他"] }
          ]
        },

        {
          name: "云南",
          city: [
            {
              name: "昆明",
              area: [
                "盘龙区",
                "五华区",
                "官渡区",
                "西山区",
                "东川区",
                "安宁市",
                "呈贡县",
                "晋宁县",
                "富民县",
                "宜良县",
                "嵩明县",
                "石林彝族自治县",
                "禄劝彝族苗族自治县",
                "寻甸回族彝族自治县",
                "其他"
              ]
            },

            {
              name: "曲靖",
              area: [
                "麒麟区",
                "宣威市",
                "马龙县",
                "沾益县",
                "富源县",
                "罗平县",
                "师宗县",
                "陆良县",
                "会泽县",
                "其他"
              ]
            },

            {
              name: "玉溪",
              area: [
                "红塔区",
                "江川县",
                "澄江县",
                "通海县",
                "华宁县",
                "易门县",
                "峨山彝族自治县",
                "新平彝族傣族自治县",
                "元江哈尼族彝族傣族自治县",
                "其他"
              ]
            },

            {
              name: "保山",
              area: ["隆阳区", "施甸县", "腾冲县", "龙陵县", "昌宁县", "其他"]
            },

            {
              name: "昭通",
              area: [
                "昭阳区",
                "鲁甸县",
                "巧家县",
                "盐津县",
                "大关县",
                "永善县",
                "绥江县",
                "镇雄县",
                "彝良县",
                "威信县",
                "水富县",
                "其他"
              ]
            },

            {
              name: "丽江",
              area: [
                "古城区",
                "永胜县",
                "华坪县",
                "玉龙纳西族自治县",
                "宁蒗彝族自治县",
                "其他"
              ]
            },

            {
              name: "普洱",
              area: [
                "思茅区",
                "普洱哈尼族彝族自治县",
                "墨江哈尼族自治县",
                "景东彝族自治县",
                "景谷傣族彝族自治县",
                "镇沅彝族哈尼族拉祜族自治县",
                "江城哈尼族彝族自治县",
                "孟连傣族拉祜族佤族自治县",
                "澜沧拉祜族自治县",
                "西盟佤族自治县",
                "其他"
              ]
            },

            {
              name: "临沧",
              area: [
                "临翔区",
                "凤庆县",
                "云县",
                "永德县",
                "镇康县",
                "双江拉祜族佤族布朗族傣族自治县",
                "耿马傣族佤族自治县",
                "沧源佤族自治县",
                "其他"
              ]
            },

            {
              name: "德宏傣族景颇族自治州",
              area: ["潞西市", "瑞丽市", "梁河县", "盈江县", "陇川县", "其他"]
            },

            {
              name: "怒江傈僳族自治州",
              area: [
                "泸水县",
                "福贡县",
                "贡山独龙族怒族自治县",
                "兰坪白族普米族自治县",
                "其他"
              ]
            },

            {
              name: "迪庆藏族自治州",
              area: ["香格里拉县", "德钦县", "维西傈僳族自治县", "其他"]
            },

            {
              name: "大理白族自治州",
              area: [
                "大理市",
                "祥云县",
                "宾川县",
                "弥渡县",
                "永平县",
                "云龙县",
                "洱源县",
                "剑川县",
                "鹤庆县",
                "漾濞彝族自治县",
                "南涧彝族自治县",
                "巍山彝族回族自治县",
                "其他"
              ]
            },

            {
              name: "楚雄彝族自治州",
              area: [
                "楚雄市",
                "双柏县",
                "牟定县",
                "南华县",
                "姚安县",
                "大姚县",
                "永仁县",
                "元谋县",
                "武定县",
                "禄丰县",
                "其他"
              ]
            },

            {
              name: "红河哈尼族彝族自治州",
              area: [
                "蒙自县",
                "个旧市",
                "开远市",
                "绿春县",
                "建水县",
                "石屏县",
                "弥勒县",
                "泸西县",
                "元阳县",
                "红河县",
                "金平苗族瑶族傣族自治县",
                "河口瑶族自治县",
                "屏边苗族自治县",
                "其他"
              ]
            },

            {
              name: "文山壮族苗族自治州",
              area: [
                "文山县",
                "砚山县",
                "西畴县",
                "麻栗坡县",
                "马关县",
                "丘北县",
                "广南县",
                "富宁县",
                "其他"
              ]
            },

            {
              name: "西双版纳傣族自治州",
              area: ["景洪市", "勐海县", "勐腊县", "其他"]
            },

            { name: "其他", area: ["其他"] }
          ]
        },

        {
          name: "西藏",
          city: [
            {
              name: "拉萨",
              area: [
                "城关区",
                "林周县",
                "当雄县",
                "尼木县",
                "曲水县",
                "堆龙德庆县",
                "达孜县",
                "墨竹工卡县",
                "其他"
              ]
            },

            {
              name: "那曲地区",
              area: [
                "那曲县",
                "嘉黎县",
                "比如县",
                "聂荣县",
                "安多县",
                "申扎县",
                "索县",
                "班戈县",
                "巴青县",
                "尼玛县",
                "其他"
              ]
            },

            {
              name: "昌都地区",
              area: [
                "昌都县",
                "江达县",
                "贡觉县",
                "类乌齐县",
                "丁青县",
                "察雅县",
                "八宿县",
                "左贡县",
                "芒康县",
                "洛隆县",
                "边坝县",
                "其他"
              ]
            },

            {
              name: "林芝地区",
              area: [
                "林芝县",
                "工布江达县",
                "米林县",
                "墨脱县",
                "波密县",
                "察隅县",
                "朗县",
                "其他"
              ]
            },

            {
              name: "山南地区",
              area: [
                "乃东县",
                "扎囊县",
                "贡嘎县",
                "桑日县",
                "琼结县",
                "曲松县",
                "措美县",
                "洛扎县",
                "加查县",
                "隆子县",
                "错那县",
                "浪卡子县",
                "其他"
              ]
            },

            {
              name: "日喀则地区",
              area: [
                "日喀则市",
                "南木林县",
                "江孜县",
                "定日县",
                "萨迦县",
                "拉孜县",
                "昂仁县",
                "谢通门县",
                "白朗县",
                "仁布县",
                "康马县",
                "定结县",
                "仲巴县",
                "亚东县",
                "吉隆县",
                "聂拉木县",
                "萨嘎县",
                "岗巴县",
                "其他"
              ]
            },

            {
              name: "阿里地区",
              area: [
                "噶尔县",
                "普兰县",
                "札达县",
                "日土县",
                "革吉县",
                "改则县",
                "措勤县",
                "其他"
              ]
            },

            { name: "其他", area: ["其他"] }
          ]
        },

        {
          name: "陕西",
          city: [
            {
              name: "西安",
              area: [
                "莲湖区",
                "新城区",
                "碑林区",
                "雁塔区",
                "灞桥区",
                "未央区",
                "阎良区",
                "临潼区",
                "长安区",
                "高陵县",
                "蓝田县",
                "户县",
                "周至县",
                "其他"
              ]
            },

            {
              name: "铜川",
              area: ["耀州区", "王益区", "印台区", "宜君县", "其他"]
            },

            {
              name: "宝鸡",
              area: [
                "渭滨区",
                "金台区",
                "陈仓区",
                "岐山县",
                "凤翔县",
                "陇县",
                "太白县",
                "麟游县",
                "扶风县",
                "千阳县",
                "眉县",
                "凤县",
                "其他"
              ]
            },

            {
              name: "咸阳",
              area: [
                "秦都区",
                "渭城区",
                "杨陵区",
                "兴平市",
                "礼泉县",
                "泾阳县",
                "永寿县",
                "三原县",
                "彬县",
                "旬邑县",
                "长武县",
                "乾县",
                "武功县",
                "淳化县",
                "其他"
              ]
            },

            {
              name: "渭南",
              area: [
                "临渭区",
                "韩城市",
                "华阴市",
                "蒲城县",
                "潼关县",
                "白水县",
                "澄城县",
                "华县",
                "合阳县",
                "富平县",
                "大荔县",
                "其他"
              ]
            },

            {
              name: "延安",
              area: [
                "宝塔区",
                "安塞县",
                "洛川县",
                "子长县",
                "黄陵县",
                "延川县",
                "富县",
                "延长县",
                "甘泉县",
                "宜川县",
                "志丹县",
                "黄龙县",
                "吴起县",
                "其他"
              ]
            },

            {
              name: "汉中",
              area: [
                "汉台区",
                "留坝县",
                "镇巴县",
                "城固县",
                "南郑县",
                "洋县",
                "宁强县",
                "佛坪县",
                "勉县",
                "西乡县",
                "略阳县",
                "其他"
              ]
            },

            {
              name: "榆林",
              area: [
                "榆阳区",
                "清涧县",
                "绥德县",
                "神木县",
                "佳县",
                "府谷县",
                "子洲县",
                "靖边县",
                "横山县",
                "米脂县",
                "吴堡县",
                "定边县",
                "其他"
              ]
            },

            {
              name: "安康",
              area: [
                "汉滨区",
                "紫阳县",
                "岚皋县",
                "旬阳县",
                "镇坪县",
                "平利县",
                "石泉县",
                "宁陕县",
                "白河县",
                "汉阴县",
                "其他"
              ]
            },

            {
              name: "商洛",
              area: [
                "商州区",
                "镇安县",
                "山阳县",
                "洛南县",
                "商南县",
                "丹凤县",
                "柞水县",
                "其他"
              ]
            },

            { name: "其他", area: ["其他"] }
          ]
        },

        {
          name: "甘肃",
          city: [
            {
              name: "兰州",
              area: [
                "城关区",
                "七里河区",
                "西固区",
                "安宁区",
                "红古区",
                "永登县",
                "皋兰县",
                "榆中县",
                "其他"
              ]
            },

            { name: "嘉峪关", area: ["嘉峪关市", "其他"] },

            { name: "金昌", area: ["金川区", "永昌县", "其他"] },

            {
              name: "白银",
              area: ["白银区", "平川区", "靖远县", "会宁县", "景泰县", "其他"]
            },

            {
              name: "天水",
              area: [
                "清水县",
                "秦安县",
                "甘谷县",
                "武山县",
                "张家川回族自治县",
                "北道区",
                "秦城区",
                "其他"
              ]
            },

            {
              name: "武威",
              area: ["凉州区", "民勤县", "古浪县", "天祝藏族自治县", "其他"]
            },

            {
              name: "酒泉",
              area: [
                "肃州区",
                "玉门市",
                "敦煌市",
                "金塔县",
                "肃北蒙古族自治县",
                "阿克塞哈萨克族自治县",
                "安西县",
                "其他"
              ]
            },

            {
              name: "张掖",
              area: [
                "甘州区",
                "民乐县",
                "临泽县",
                "高台县",
                "山丹县",
                "肃南裕固族自治县",
                "其他"
              ]
            },

            {
              name: "庆阳",
              area: [
                "西峰区",
                "庆城县",
                "环县",
                "华池县",
                "合水县",
                "正宁县",
                "宁县",
                "镇原县",
                "其他"
              ]
            },

            {
              name: "平凉",
              area: [
                "崆峒区",
                "泾川县",
                "灵台县",
                "崇信县",
                "华亭县",
                "庄浪县",
                "静宁县",
                "其他"
              ]
            },

            {
              name: "定西",
              area: [
                "安定区",
                "通渭县",
                "临洮县",
                "漳县",
                "岷县",
                "渭源县",
                "陇西县",
                "其他"
              ]
            },

            {
              name: "陇南",
              area: [
                "武都区",
                "成县",
                "宕昌县",
                "康县",
                "文县",
                "西和县",
                "礼县",
                "两当县",
                "徽县",
                "其他"
              ]
            },

            {
              name: "临夏回族自治州",
              area: [
                "临夏市",
                "临夏县",
                "康乐县",
                "永靖县",
                "广河县",
                "和政县",
                "东乡族自治县",
                "积石山保安族东乡族撒拉族自治县",
                "其他"
              ]
            },

            {
              name: "甘南藏族自治州",
              area: [
                "合作市",
                "临潭县",
                "卓尼县",
                "舟曲县",
                "迭部县",
                "玛曲县",
                "碌曲县",
                "夏河县",
                "其他"
              ]
            },

            { name: "其他", area: ["其他"] }
          ]
        },

        {
          name: "青海",
          city: [
            {
              name: "西宁",
              area: [
                "城中区",
                "城东区",
                "城西区",
                "城北区",
                "湟源县",
                "湟中县",
                "大通回族土族自治县",
                "其他"
              ]
            },

            {
              name: "海东地区",
              area: [
                "平安县",
                "乐都县",
                "民和回族土族自治县",
                "互助土族自治县",
                "化隆回族自治县",
                "循化撒拉族自治县",
                "其他"
              ]
            },

            {
              name: "海北藏族自治州",
              area: ["海晏县", "祁连县", "刚察县", "门源回族自治县", "其他"]
            },

            {
              name: "海南藏族自治州",
              area: ["共和县", "同德县", "贵德县", "兴海县", "贵南县", "其他"]
            },

            {
              name: "黄南藏族自治州",
              area: ["同仁县", "尖扎县", "泽库县", "河南蒙古族自治县", "其他"]
            },

            {
              name: "果洛藏族自治州",
              area: [
                "玛沁县",
                "班玛县",
                "甘德县",
                "达日县",
                "久治县",
                "玛多县",
                "其他"
              ]
            },

            {
              name: "玉树藏族自治州",
              area: [
                "玉树县",
                "杂多县",
                "称多县",
                "治多县",
                "囊谦县",
                "曲麻莱县",
                "其他"
              ]
            },

            {
              name: "海西蒙古族藏族自治州",
              area: [
                "德令哈市",
                "格尔木市",
                "乌兰县",
                "都兰县",
                "天峻县",
                "其他"
              ]
            },

            { name: "其他", area: ["其他"] }
          ]
        },

        {
          name: "宁夏",
          city: [
            {
              name: "银川",
              area: [
                "兴庆区",
                "西夏区",
                "金凤区",
                "灵武市",
                "永宁县",
                "贺兰县",
                "其他"
              ]
            },

            { name: "石嘴山", area: ["大武口区", "惠农区", "平罗县", "其他"] },

            {
              name: "吴忠",
              area: ["利通区", "青铜峡市", "盐池县", "同心县", "其他"]
            },

            {
              name: "固原",
              area: ["原州区", "西吉县", "隆德县", "泾源县", "彭阳县", "其他"]
            },

            { name: "中卫", area: ["沙坡头区", "中宁县", "海原县", "其他"] },

            { name: "其他", area: ["其他"] }
          ]
        },

        {
          name: "新疆",
          city: [
            {
              name: "乌鲁木齐",
              area: [
                "天山区",
                "沙依巴克区",
                "新市区",
                "水磨沟区",
                "头屯河区",
                "达坂城区",
                "东山区",
                "乌鲁木齐县",
                "其他"
              ]
            },

            {
              name: "克拉玛依",
              area: ["克拉玛依区", "独山子区", "白碱滩区", "乌尔禾区", "其他"]
            },

            {
              name: "吐鲁番地区",
              area: ["吐鲁番市", "托克逊县", "鄯善县", "其他"]
            },

            {
              name: "哈密地区",
              area: ["哈密市", "伊吾县", "巴里坤哈萨克自治县", "其他"]
            },

            {
              name: "和田地区",
              area: [
                "和田市",
                "和田县",
                "洛浦县",
                "民丰县",
                "皮山县",
                "策勒县",
                "于田县",
                "墨玉县",
                "其他"
              ]
            },

            {
              name: "阿克苏地区",
              area: [
                "阿克苏市",
                "温宿县",
                "沙雅县",
                "拜城县",
                "阿瓦提县",
                "库车县",
                "柯坪县",
                "新和县",
                "乌什县",
                "其他"
              ]
            },

            {
              name: "喀什地区",
              area: [
                "喀什市",
                "巴楚县",
                "泽普县",
                "伽师县",
                "叶城县",
                "岳普湖县",
                "疏勒县",
                "麦盖提县",
                "英吉沙县",
                "莎车县",
                "疏附县",
                "塔什库尔干塔吉克自治县",
                "其他"
              ]
            },

            {
              name: "克孜勒苏柯尔克孜自治州",
              area: ["阿图什市", "阿合奇县", "乌恰县", "阿克陶县", "其他"]
            },

            {
              name: "巴音郭楞蒙古自治州",
              area: [
                "库尔勒市",
                "和静县",
                "尉犁县",
                "和硕县",
                "且末县",
                "博湖县",
                "轮台县",
                "若羌县",
                "焉耆回族自治县",
                "其他"
              ]
            },

            {
              name: "昌吉回族自治州",
              area: [
                "昌吉市",
                "阜康市",
                "奇台县",
                "玛纳斯县",
                "吉木萨尔县",
                "呼图壁县",
                "木垒哈萨克自治县",
                "米泉市",
                "其他"
              ]
            },

            {
              name: "博尔塔拉蒙古自治州",
              area: ["博乐市", "精河县", "温泉县", "其他"]
            },

            { name: "石河子", area: ["石河子"] },

            { name: "阿拉尔", area: ["阿拉尔"] },

            { name: "图木舒克", area: ["图木舒克"] },

            { name: "五家渠", area: ["五家渠"] },

            {
              name: "伊犁哈萨克自治州",
              area: [
                "伊宁市",
                "奎屯市",
                "伊宁县",
                "特克斯县",
                "尼勒克县",
                "昭苏县",
                "新源县",
                "霍城县",
                "巩留县",
                "察布查尔锡伯自治县",
                "塔城地区",
                "阿勒泰地区",
                "其他"
              ]
            },

            { name: "其他", area: ["其他"] }
          ]
        },

        {
          name: "台湾",
          city: [
            {
              name: "台湾",
              area: [
                "台北市",
                "高雄市",
                "台北县",
                "桃园县",
                "新竹县",
                "苗栗县",
                "台中县",
                "彰化县",
                "南投县",
                "云林县",
                "嘉义县",
                "台南县",
                "高雄县",
                "屏东县",
                "宜兰县",
                "花莲县",
                "台东县",
                "澎湖县",
                "基隆市",
                "新竹市",
                "台中市",
                "嘉义市",
                "台南市",
                "其他"
              ]
            },

            { name: "其他", area: ["其他"] }
          ]
        },

        {
          name: "澳门",
          city: [
            {
              name: "澳门",
              area: [
                "花地玛堂区",
                "圣安多尼堂区",
                "大堂区",
                "望德堂区",
                "风顺堂区",
                "嘉模堂区",
                "圣方济各堂区",
                "路凼",
                "其他"
              ]
            }
          ]
        },

        {
          name: "香港",
          city: [
            {
              name: "香港",
              area: [
                "中西区",
                "湾仔区",
                "东区",
                "南区",
                "深水埗区",
                "油尖旺区",
                "九龙城区",
                "黄大仙区",
                "观塘区",
                "北区",
                "大埔区",
                "沙田区",
                "西贡区",
                "元朗区",
                "屯门区",
                "荃湾区",
                "葵青区",
                "离岛区",
                "其他"
              ]
            }
          ]
        },
        { name: "钓鱼岛", city: [{ name: "钓鱼岛", area: ["钓鱼岛"] }] }
      ],
      SHEN: "",
      SHI: "",
      QU: ""
    };
  },
  created: function() {
    //明细进入时
    this.detailed = "yes";
    if (this.nr != "0" && this.Title != "代销商管理") {
      this.quotationJump();
    } else {
      this.acquisitionOfClassification();
    }
  },
  //页面开始进入时加载此函数
  mounted() {
    //这个函数的作用是，页面手册登录后加载表单信息
    $(".breadcrumb-container").addClass("hide");
    this.getTemplateContentHandler();
  },
  //值改变时加载此函数
  watch: {
    //监听表单参数，当表单切换菜单改变数值时执行
    $route(to, from) {
      this.nr = this.$route.params.nr;
      if (this.nr != "0") {
        this.Title = to.params.name;
        this.ID = to.params.id;
        this.quotationJump();
        this.getTemplateContentHandler();
      } else {
        //改变数值后，重新给this.name 路由传过来的参数重新赋值加载
        this.Title = to.params.name;
        this.ID = to.params.id;
        this.getTemplateContentHandler();
      }
    },
    //值改变时
    info: function() {
      var _this = this;
      //这个方法的作用是 加载完this.info后执行
      _this.$nextTick(function() {
        //这个方法是为了验证表单中一些控件，比如input中的是否必填，是否是只读等。
        this.verification();
      });
    }
  },
  computed: {
    //首次获取数据时
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
          if (this.jumpBJB == 1) {
            this.$alert("数据保存成功,跳转至报价", {
              confirmButtonText: "确定"
            }).then(() => {
              var url = "/NewForm/销售报价/0/" + res.dataID;
              this.$router.push({ path: url });
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
      }
    },

    //首次获取数据时
    WZBHData: {
      get: function() {
        //通过get后的数据 就行获取返回数据
        return this.WZBHData;
      },
      set: function(res) {
        //如果返回值为false 则alert出 错误信息
        if (res.success == false) {
          this.$alert("未维护调试费信息，请联系管理员:", {
            confirmButtonText: "确定"
          });
          return;
        } else {
          if (this.Title == "调试信息" || this.Title == "维修信息") {
            var TSRQ;
            if (this.Title == "维修信息") {
              TSRQ = $("input[name=TSRQ]").val();
            } else {
              TSRQ = $("input[name=TSRQ]").val();
            }
            var ZBYS = parseInt(this.HQXSJValue.ZBQ);
            var date = new Date(Date.parse(TSRQ.replace(/-/g, "/"))); //转换成Data();
            var givenMonth = date.getMonth();
            var newMonth = givenMonth + ZBYS;
            date.setMonth(newMonth);
            var curdate = this.rfdateFormt("Y-m-d",date);
            this.$refs.refName.addviewdata(this.HQXSJValue, res.TSF, curdate);
          } else {
            this.$refs.refName.addviewdata(this.HQXSJValue, res.XSJ, 0);
          }
        }
      }
    },

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
        }
        //最后info的值在这里赋值显示
        if (this.Title == "物资分类信息") {
          this.processSubmission = false;
        } else {
          this.processSubmission = !this.processSubmission;
        }
        this.info = res.templateContent;

      }
    },

    infoFormData: {
      //加载表单数据（带值）
      get: function() {
        //通过get后的数据 就行获取返回数据
        return this.infoFormData;
      },
      set: function(res) {
        //如果返回值为false 则alert出 错误信息
        if (res.success == false) {
          this.$alert("获取数据出错:" + res.message, {
            confirmButtonText: "确定"
          });
          return;
        }
        //最后info的值在这里赋值显示
        this.transEventlength = res.transEvent.length;
        if (res.transEvent.length == 0) {
          if (this.Title == "物资分类信息") {
            this.processSubmission = false;
          } else {
            this.processSubmission = !this.processSubmission;
          }
        } else if (this.ID != "0") {
          if (this.transEventlength == 1) {
            this.YJTX = !this.YJTX;
          }
          this.transEvent = res.transEvent;
          this.processRecords = res.processRecords;
        }

        this.editField = res.editField;
        this.mustField = res.mustField;
        this.info = res.templateContent;
        this.formdata = res.formData;
        this.getValue();
      }
    },

    quotationJumpDAta: {
      //加载表单数据（带值）
      get: function() {
        //通过get后的数据 就行获取返回数据
        return this.quotationJumpDAta;
      },
      set: function(res) {
        //如果返回值为false 则alert出 错误信息
        if (res.success == false) {
          this.$alert("获取数据出错:" + res.message, {
            confirmButtonText: "确定"
          });
          return;
        }
        this.formdata = res.formData;
        this.verification();
        this.isShowAll = true;
        /* this.getValue(); */
      }
    },

    SSFLdata: {
      //加载表单数据（带值）
      get: function() {
        //通过get后的数据 就行获取返回数据
        return this.SSFLdata;
      },
      set: function(res) {
        //如果返回值为false 则alert出 错误信息
        if (res.success == false) {
          this.$alert("获取数据出错:" + res.message, {
            confirmButtonText: "确定"
          });
          return;
        }
        for (var i = 0; i < res.data.length; i++) {
          var SSFLArray = { SSFL: res.data[i].WZFLMC };
          this.SSFL.push(SSFLArray);
          this.WZXXWZFL.push(SSFLArray);
          if (res.data[i].subClass) {
            for (var z = 0; z < res.data[i].subClass.length; z++) {
              var subClassArray = { SSFL: res.data[i].subClass[z].WZFLMC };
              this.WZXXWZFL.push(subClassArray);
            }
          }
        }
        var WZXXWZFL = this.WZXXWZFL;
        if (this.Title == "物资信息维护" && this.ID == "0") {
          $("input,select,textarea").each(function() {
            if ($(this).attr("data-lang") == "WZXXWZFL") {
              $("select[name=" + this.name + "]").empty();
              for (var i = 0; i < WZXXWZFL.length; i++) {
                $("select[name=" + this.name + "]").append(
                  "<option value='" +
                    WZXXWZFL[i].SSFL +
                    "'>" +
                    WZXXWZFL[i].SSFL +
                    "</option>"
                );
              }
            }
          });
        }
        if (this.Title == "物资分类信息" && this.ID == "0") {
          $("select").each(function() {
            if ($(this).attr("data-lang") == "SSFL") {
              $("select[name=" + this.name + "]").empty();
              $("select[name=" + this.name + "]").append(
                "<option value=''></option>"
              );
              for (var i = 0; i < SSFL.length; i++) {
                $("select[name=" + this.name + "]").append(
                  "<option value='" +
                    SSFL[i].SSFL +
                    "'>" +
                    SSFL[i].SSFL +
                    "</option>"
                );
              }
            }
          });
        }
      }
    },

    viewNameData: {
      //表单中是否存在明细表
      get: function() {
        //通过get后的数据 就行获取返回数据
        return this.viewNameData;
      },
      set: function(res) {
        //如果返回值为false 则alert出 错误信息
        if (res.success == false) {
          this.$alert("获取数据出错:" + res.message, {
            confirmButtonText: "确定"
          });
          return;
        } else {
          this.viewNameMX = res.viewName; //明细视图名称
          this.filterMX = "_PARENT_ID=" + this.$route.params.id; //明细ID
          if (this.viewNameMX == "空调配置表明细") {
            this.$refs.refName1.quoteValueTransfer(
              this.viewNameMX,
              this.filterMX,
              this.detailed
            );
          } else if (this.viewNameMX == "地暖配置表明细") {
            this.$refs.refName2.quoteValueTransfer(
              this.viewNameMX,
              this.filterMX,
              this.detailed
            );
          } else if (this.viewNameMX == "外机选型明细") {
            this.$refs.refName3.quoteValueTransfer(
              this.viewNameMX,
              this.filterMX,
              this.detailed
            );
          } else if (this.viewNameMX == "系统组件明细") {
            this.$refs.refName4.quoteValueTransfer(
              this.viewNameMX,
              this.filterMX,
              this.detailed
            );
          } else {
            this.$refs.refName.detailedReference(
              this.viewNameMX,
              this.filterMX,
              this.detailed
            ); //明细传值
          }
        }
      }
    },

    submissionData: {
      //提交流程
      get: function() {
        //通过get后的数据 就行获取返回数据
        return this.submissionData;
      },
      set: function(res) {
        //如果返回值为false 则alert出 错误信息
        if (res.success == false) {
          this.$alert("获取数据出错:" + res.message, {
            confirmButtonText: "确定"
          });
          return;
        } else {
          var viewName = this.viewNameMX; //明细视图名
          var viewArr = {};
          var viewData = [];
          for (var i = 0; i < res.dataList.length; i++) {
            res.dataList[i]["viewNameMxName"] = viewName;
            viewArr = res.dataList[i];
            viewData.push(viewArr);
          }
          this.getviewNameData(viewData);
        }
      }
    },

    DataResponse: {
      //表单中是否存在明细表
      get: function() {
        //通过get后的数据 就行获取返回数据
        return this.DataResponse;
      },
      set: function(res) {
        //如果返回值为false 则alert出 错误信息
        if (res.success == false) {
          this.$alert("获取数据出错:" + res.message, {
            confirmButtonText: "确定"
          });
          return;
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

    //报价表保存时
    quotationUpdateData1: {
      //表单中是否存在明细表
      get: function() {
        //通过get后的数据 就行获取返回数据
        return this.quotationUpdateData1;
      },
      set: function(res) {
        //如果返回值为false 则alert出 错误信息
        if (res.success == false) {
          this.$alert("获取数据出错:" + res.message, {
            confirmButtonText: "确定"
          });
          return;
        } else {
          var viewName = this.viewNameMX; //明细视图名
          var viewArr = {};
          var viewData = [];
          for (var i = 0; i < res.dataList.length; i++) {
            res.dataList[i]["viewNameMxName"] = viewName;
            viewArr = res.dataList[i];
            viewData.push(viewArr);
          }
          if (this.KTPZB == "") {
            this.KTPZB = viewData;
          }
          this.quotationUpdate2();
        }
      }
    },

    quotationUpdateData2: {
      //表单中是否存在明细表
      get: function() {
        //通过get后的数据 就行获取返回数据
        return this.quotationUpdateData2;
      },
      set: function(res) {
        //如果返回值为false 则alert出 错误信息
        if (res.success == false) {
          this.$alert("获取数据出错:" + res.message, {
            confirmButtonText: "确定"
          });
          return;
        } else {
          var viewName = this.viewNameMX; //明细视图名
          var viewArr = {};
          var viewData = [];
          for (var i = 0; i < res.dataList.length; i++) {
            res.dataList[i]["viewNameMxName"] = viewName;
            viewArr = res.dataList[i];
            viewData.push(viewArr);
          }
          if (this.DNPZB == "") {
            this.DNPZB = viewData;
          }
          this.quotationUpdate3();
        }
      }
    },

    quotationUpdateData3: {
      //表单中是否存在明细表
      get: function() {
        //通过get后的数据 就行获取返回数据
        return this.quotationUpdateData3;
      },
      set: function(res) {
        //如果返回值为false 则alert出 错误信息
        if (res.success == false) {
          this.$alert("获取数据出错:" + res.message, {
            confirmButtonText: "确定"
          });
          return;
        } else {
          var viewName = this.viewNameMX; //明细视图名
          var viewArr = {};
          var viewData = [];
          for (var i = 0; i < res.dataList.length; i++) {
            res.dataList[i]["viewNameMxName"] = viewName;
            viewArr = res.dataList[i];
            viewData.push(viewArr);
          }
          if (this.WJXXB == "") {
            this.WJXXB = viewData;
          }
          this.quotationUpdate4();
        }
      }
    },

    quotationUpdateData4: {
      //表单中是否存在明细表
      get: function() {
        //通过get后的数据 就行获取返回数据
        return this.quotationUpdateData4;
      },
      set: function(res) {
        //如果返回值为false 则alert出 错误信息
        if (res.success == false) {
          this.$alert("获取数据出错:" + res.message, {
            confirmButtonText: "确定"
          });
          return;
        } else {
          var viewName = this.viewNameMX; //明细视图名
          var viewArr = {};
          var viewData = [];
          for (var i = 0; i < res.dataList.length; i++) {
            res.dataList[i]["viewNameMxName"] = viewName;
            viewArr = res.dataList[i];
            viewData.push(viewArr);
          }
          if (this.XTZJB == "") {
            this.XTZJB = viewData;
          }
          this.quotationUpdateSet();
        }
      }
    }
  },
  methods: {
    //部门人员选择时
    getSelectedUsers(res) {
      var selectedItem = "";
      var selectedItemData;

      var englishNameItem = "";
      var englishNameData;
      for (var i = 0; i < res.selectedItem.length; i++) {
        selectedItem += res.selectedItem[i].label + ",";
        englishNameItem += res.selectedItem[i].key + ",";
      }
      selectedItemData = selectedItem.substr(0, selectedItem.length - 1);
      englishNameData = englishNameItem.substr(0, englishNameItem.length - 1);
      $("input[name=" + res.name + "]").val(selectedItemData);
      $("input[name=englishName]").val(englishNameData);
    },
    //报价最终保存
    quotationUpdateSet() {
      //空调数据
      for (var i = 0; i < this.KTPZB.length; i++) {
        if (this.KTPZB[i].ID != "0") {
          this.KTPZB[i].ID = "0";
        }
      }
      var KTPZB = this.KTPZB;

      //地暖配置表数据
      for (var i = 0; i < this.DNPZB.length; i++) {
        if (this.DNPZB[i].ID != "0") {
          this.DNPZB[i].ID = "0";
        }
      }
      var DNPZB = this.DNPZB;

      //外机选型数据
      for (var i = 0; i < this.WJXXB.length; i++) {
        if (this.WJXXB[i].ID != "0") {
          this.WJXXB[i].ID = "0";
        }
      }
      var WJXXB = this.WJXXB;

      //系统组件
      for (var i = 0; i < this.XTZJB.length; i++) {
        if (this.XTZJB[i].ID != "0") {
          this.XTZJB[i].ID = "0";
        }
      }
      var XTZJB = this.XTZJB;

      //保存时获取数据 组装成json传入接口，保存数据。
      var newQuotation = this.newQuotation;
      if (newQuotation == 0) {
        var data = { ID: 0 };
      } else {
        var data = { ID: this.$route.params.id };
      }
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
          //上传时候保存的数据
          if ($(this).attr("data-lang") == "upload") {
            for (var i = 0; i < wjUrl.length; i++) {
              wjUrlData += wjUrl[i].url + ",";
              wjName += wjUrl[i].name + ",";
            }
            this.value = wjUrlData.substr(0, wjUrlData.length - 1);
          }
          data[this.name] = this.value;
        }
      });

      //如果 contentHasSave是trun则进入下一步
      if (contentHasSave) {
        // 使用element的提示框
        this.$confirm("是否保存表单内容？", "提示", {
          showCancelButton: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          //点击确认进入步骤
          .then(() => {
            setData = {
              //username
              username: this.user,
              //shortTitle
              shortTitle: this.shortTitle,
              //data数据在上方组装
              data,
              KTPZB: KTPZB,
              DNPZB: DNPZB,
              WJXXB: WJXXB,
              XTZJB: XTZJB
            };
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
    //获取系统组件明细
    quotationJump() {
      debugger
      Axios.post(
        this.baseUrl + "HttpUtil/GetFormDataHandler.ashx", //获取表单数据参数
        {
          // 参数 username
          username: this.user,

          // 参数 shortTitle
          shortTitle: "零售客户信息",
          // 参数 dataID
          dataID: this.nr
        },
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      )
        //将获取到的接口值 赋给info；
        .then(response => (this.quotationJumpDAta = response.data))
        .catch(function(error) {
          alert(error);
          console.log(error);
        });
    },
    quotationUpdate4() {
      this.viewNameMX = "系统组件明细";
      Axios.post(
        this.baseUrl + "HttpUtil/GetDetailViewDataHandler.ashx", //获取明细数据
        {
          // 参数 username
          username: this.user,
          detailViewName: "系统组件明细",
          parentID: this.$route.params.id
        },
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      )
        //将获取到的接口值 赋给info；
        .then(response => (this.quotationUpdateData4 = response.data))
        .catch(function(error) {
          alert(error);
        });
    },

    //外机选型明细
    quotationUpdate3() {
      this.viewNameMX = "外机选型明细";
      Axios.post(
        this.baseUrl + "HttpUtil/GetDetailViewDataHandler.ashx", //获取明细数据
        {
          // 参数 username
          username: this.user,
          detailViewName: "外机选型明细",
          parentID: this.$route.params.id
        },
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      )
        //将获取到的接口值 赋给info；
        .then(response => (this.quotationUpdateData3 = response.data))
        .catch(function(error) {
          alert(error);
        });
    },
    //地暖配置表明细
    quotationUpdate2() {
      this.viewNameMX = "地暖配置表明细";
      Axios.post(
        this.baseUrl + "HttpUtil/GetDetailViewDataHandler.ashx", //获取明细数据
        {
          // 参数 username
          username: this.user,
          detailViewName: "地暖配置表明细",
          parentID: this.$route.params.id
        },
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      )
        //将获取到的接口值 赋给info；
        .then(response => (this.quotationUpdateData2 = response.data))
        .catch(function(error) {
          alert(error);
        });
    },
    /* 空调配置表明细 */
    quotationUpdate() {
      this.viewNameMX = "空调配置表明细";
      Axios.post(
        this.baseUrl + "HttpUtil/GetDetailViewDataHandler.ashx", //获取明细数据
        {
          // 参数 username
          username: this.user,
          detailViewName: "空调配置表明细",
          parentID: this.$route.params.id
        },
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      )
        //将获取到的接口值 赋给info；
        .then(response => (this.quotationUpdateData1 = response.data))
        .catch(function(error) {
          alert(error);
        });
    },

    quotationbaocun() {
      this.newQuotation = 1;
      this.quotationUpdate();
    },
    /* 报价新增 */
    quotationAdd() {
      this.newQuotation = 0;
      this.quotationUpdate();
    },

    /* 报价阅览 */
    quotationReading() {
      var url = "/ConditionQuotation/" + this.$route.params.id;
      this.$router.push({ path: url });
    },

    //流程提交
    submission(eventName, url) {
      var textarea = this.textarea;
      this.submissionUrl = url;
      if (eventName == "流程属性") {
        //点击流程属性的时候
        window.open(this.baseUrl + url);
      } else {
        //如果有流程的情况 判断数据是否填写
        //判断必填项是否填写
        var ismustField = false;
        var ismustFieldStr = "";

        if (
          this.transEventlength > 1 &&
          this.mustField != "" &&
          this.mustField !== undefined &&
          this.mustField != null
        ) {
          var mustField = this.mustField.split(";");
          if (mustField != "" && mustField != null && mustField != undefined) {
            for (var i = 0; i < mustField.length; i++) {
              var edit = mustField[i].substr(1);
              edit = edit.substring(0, edit.length - 1);
              var mustVal = $("[name=" + edit + "]").val();
              if (mustVal == "" || mustVal == undefined) {
                ismustFieldStr +=
                  $("[name=" + edit + "]")
                    .parent()
                    .prev()
                    .html() + ",";
                ismustField = true;
              }
            }
          }
        }

        if (ismustField) {
          ismustFieldStr = ismustFieldStr.substring(
            0,
            ismustFieldStr.length - 1
          );
          this.$alert("请输入流程必填项:(" + ismustFieldStr + ")", {
            confirmButtonText: "确定"
          });
        } else {
          Axios.post(
            this.baseUrl + "HttpUtil/GetDetailViewDataHandler.ashx", //获取明细数据
            {
              // 参数 username
              username: this.user,
              detailViewName: this.viewNameMX,
              parentID: this.$route.params.id
            },
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
          )
            //将获取到的接口值 赋给info；
            .then(response => (this.submissionData = response.data))
            .catch(function(error) {
              alert(error);
            });
        }
      }
    },

    getviewNameData(viewData) {
      //流程提交时原封不动的明细数据
      for (var i = 0; i < viewData.length; i++) {
        if (viewData[i].ID != "0") {
          viewData[i].ID = "0";
        }
      }
      var viewDataNew = viewData;

      //上传文件
      var wjUrl = this.wjUrl;

      //上传文件的URL组装字符串
      var wjUrlData = "";
      //上传文件的name
      var wjName = "";

      //新增的明细数据
      for (var i = 0; i < this.viewData.length; i++) {
        if (this.viewData[i].ID != "0") {
          this.viewData[i].ID = "0";
        }
      }
      var detailedvieWdata = this.viewData;

      var viewName = this.viewNameMX; //明细视图名
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
          //上传时候保存的数据
          if ($(this).attr("data-lang") == "upload") {
            for (var i = 0; i < wjUrl.length; i++) {
              wjUrlData += wjUrl[i].url + ",";
              wjName += wjUrl[i].name + ",";
            }
            this.value = wjUrlData.substr(0, wjUrlData.length - 1);
          }
          //给file赋值上传文件的名称
          if (this.name == "file") {
            var wjnameNew = wjName.substr(0, wjName.length - 1);
            data[this.name] = wjnameNew;
          } else if (this.name == "RGWJSC") {
            data[this.name] = "上传";
          } else if (this.name == "WJSC") {
            data[this.name] = "上传";
          } else {
            data[this.name] = this.value;
          }
        }
      });
      //如果 contentHasSave是trun则进入下一步
      if (contentHasSave) {
        // 使用element的提示框
        this.$confirm("是否保存表单内容？", "提示", {
          showCancelButton: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          //点击确认进入步骤
          .then(() => {
            //其他保存时
            if (detailedvieWdata.length == 0) {
              setData = {
                //username
                username: this.user,
                //shortTitle
                shortTitle: this.shortTitle,
                //data数据在上方组装
                data,
                detailData: viewData,
                detailedViewName: viewName
              };
            } else {
              setData = {
                //username
                username: this.user,
                //shortTitle
                shortTitle: this.shortTitle,
                //data数据在上方组装
                data,
                detailData: detailedvieWdata,
                detailedViewName: viewName
              };
            }
            Axios.post(
              this.baseUrl + this.submissionUrl + this.textarea,
              setData,
              {
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
              }
            )
              //将获取到的接口值 赋给info；
              .then(response => (this.DataResponse = response.data))
              .catch(function(error) {
                alert(error);
                console.log(error);
              });
          })
          //点击取消进入步骤
          .catch(() => {
            // 选择取消
          });
      }
    },
    //选择销售信息记录选择
    selectionView: function() {
      this.clickView = true;
      this.dialogVisible = false;
      this.$forceUpdate();
    },
    selectionTable: function() {
      this.clickTable = true;
      this.dialogVisible = false;
      this.$forceUpdate();
    },

    //上传按钮点击时显示上传弹框
    handleAdd: function() {
      this.addFormVisible = true;
      this.dialogVisible = false;
      this.$forceUpdate();
    },
    sectorSelection: function() {
      this.selectionofpersonnel = true;
      this.dialogVisible = true;
      if (this.role == "代理商调试") {
        var orgnam = $("select[id=DLS]").val();
        if (orgnam == null) {
          orgnam = "all";
        }
        this.orgname = orgnam;
      }
      if (this.role == "代理商维修") {
        var orgnam = $("select[id=DLS]").val();
        if (orgnam == null) {
          orgnam = "all";
        }
        this.orgname = orgnam;
      }
      this.$refs.getSelectedUsers.getADD(
        this.orgname,
        this.role,
        this.scope,
        true
      );
    },

    //上传到服务器
    handleChange(file, fileList) {
      this.fileList3 = fileList.slice(-10);
      $("#sum").html(this.fileList3.length + "个");
    },
    //上传回调数据
    handleAvatarSuccess(res, file) {
      //上传成功时
      if (res.success) {
        for (var i = 0; i < res.fileUrls.length; i++) {
          var fileUrlsData = res.fileUrls[i];
          var fileUrlSplit = fileUrlsData.split("/");
          this.wjUrl.push({
            name: fileUrlSplit[2],
            url: this.baseUrl + fileUrlSplit[1] + "/" + fileUrlSplit[2]
          });
        }
      } else {
        this.$alert("获取数据出错:" + res.message, {
          confirmButtonText: "确定"
        });
      }
    },

    //点击列表弹出
    handlePreview(file) {
      window.open(file.url);
    },

    //删除
    handleRemove(file, fileList3) {
      $("#sum").html(fileList3.length + "个");
      for (var i = 0; i < this.wjUrl.length; i++) {
        if (this.wjUrl[i].name == file.name) {
          this.wjUrl.splice(i, 1);
        }
      }
    },
    childByValue(childValue, MX) {
      // childValue就是子组件传过来的值
      var childValuenew = childValue;
      if (MX == "空调配置表明细") {
        for (var i = 0; i < childValuenew.length; i++) {
          if (childValuenew[i].ID != "0") {
            childValuenew[i]["viewNameMxName"] = MX;
          }
        }
        this.KTPZB = childValuenew;
      } else if (MX == "地暖配置表明细") {
        for (var i = 0; i < childValuenew.length; i++) {
          if (childValuenew[i].ID != "0") {
            childValuenew[i]["viewNameMxName"] = MX;
          }
        }
        this.DNPZB = childValuenew;
      } else if (MX == "外机选型明细") {
        for (var i = 0; i < childValuenew.length; i++) {
          if (childValuenew[i].ID != "0") {
            childValuenew[i]["viewNameMxName"] = MX;
          }
        }
        this.WJXXB = childValuenew;
        this.$refs.refName3.zonliang3(this.KTPZB, this.DNPZB); //明细传值
      } else if (MX == "系统组件明细") {
        for (var i = 0; i < childValuenew.length; i++) {
          if (childValuenew[i].ID != "0") {
            childValuenew[i]["viewNameMxName"] = MX;
          }
        }
        this.XTZJB = childValuenew;
      } else {
        for (var i = 0; i < childValuenew.length; i++) {
          if (childValuenew[i].ID != "0") {
            childValuenew[i]["viewNameMxName"] = MX;
          }
        }
        this.viewData = childValuenew;
      }
    },
    //视图选择
    subreturnValue(subreturnValue) {
      if (subreturnValue == "cancel") {
        this.clickView = false;
      } else {
        var value = subreturnValue;
        this.clickView = false;
        if (this.Title != "物资价格维护") {
          if (this.Title == "销售报价") {
            this.$refs.refName1.ktMX(value); //明细传值
            this.$refs.refName3.WJXX(value); //明细传值
            this.$refs.refName4.XTZJ(value); //明细传值
          } else {
            if (
              this.Title == "提货订单" ||
              this.Title == "提货计划" ||
              this.Title == "调试信息" ||
              this.Title == "维修信息"
            ) {
              this.HQXSJValue = value;
              this.HQXSJ(subreturnValue);
            } else {
              this.$refs.refName.addviewdata(value, 0, 0); //明细传值
            }
          }
        }
        $("input").each(function() {
          if ($(this).attr("data-lang") == "WZBM") {
            this.value = value.WZBH;
          }
          if ($(this).attr("data-lang") == "WZMC") {
            this.value = value.WZMC;
          }
        });
      }
    },

    //提货订单获取销售价
    HQXSJ(value) {
      var WZBH = value.WZBH;
      Axios.post(
        this.baseUrl + "HttpUtil/GetWzSaleMessageHandler.ashx", //获取表单数据参数
        {
          // 参数 username
          username: this.user,
          WZBH: WZBH
        },
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      )
        //将获取到的接口值 赋给info；
        .then(response => (this.WZBHData = response.data))
        .catch(function(error) {
          alert(error);
          console.log(error);
        });
    },
    //表单选择返回
    subreturnValueTable(subreturnValueTable, viewName) {
      var value = subreturnValueTable;
      if (subreturnValueTable == "cancel") {
        this.clickTable = false;
      } else {
        if (viewName == "调试信息") {
          this.clickTable = false;
          $("input").each(function() {
            if ($(this).attr("data-lang") == "WXKHXM") {
              this.value = value.KHNAME;
            }
            if ($(this).attr("name") == "XXDZ") {
              this.value = value.DETAILADDRESS;
            }
            if ($(this).attr("name") == "DQ") {
              this.value = value.DQ;
            }
            if ($(this).attr("name") == "DH1") {
              this.value = value.PHONE1;
            }
            if ($(this).attr("name") == "DH2") {
              this.value = value.PHONE2;
            }
            if ($(this).attr("name") == "TSRQ") {
              this.value = value.TSRQ;
            }
          });
        } else {
          this.clickTable = false;
          $("input").each(function() {
            if ($(this).attr("data-lang") == "KHXM") {
              this.value = value.KHMC;
            }
            if ($(this).attr("data-lang") == "KHDZ") {
              this.value = value.DZ;
            }
          });
        }
      }
    },

    //收首次登陆获取列表数据（无初值）
    getTemplateContentHandler() {
      this.shortTitle = this.Title;

      this.ID = this.$route.params.id;

      if (this.ID != "0") {
        //获取表单
        Axios.post(
          this.baseUrl + "HttpUtil/GetFormDataHandler.ashx", //获取表单数据参数
          {
            // 参数 username
            username: this.user,

            // 参数 shortTitle
            shortTitle: this.shortTitle,
            // 参数 dataID
            dataID: this.ID
          },
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
          //将获取到的接口值 赋给info；
          .then(response => (this.infoFormData = response.data))
          .catch(function(error) {
            alert(error);
            console.log(error);
          });
      } else {
        //获取表单
        Axios.post(
          this.baseUrl + "HttpUtil/GetTemplateContentHandler.ashx",
          {
            // 参数 username
            username: this.user,
            // 参数 shortTitle
            shortTitle: this.shortTitle
          },
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
          //将获取到的接口值 赋给info；
          .then(response => (this.infonew = response.data))
          .catch(function(error) {
            alert(error);
            console.log(error);
          });
      }
    },

    updataSelect() {
      
      if (this.SHEN != "") {
        var SHEN = $("select[id=SHEN]").val();
        $("input[name=" + this.SHEN + "]").val(SHEN);
      }
      if (this.SHI != "") {
        var SHI = $("select[id=SHI]").val();
        $("input[name=" + this.SHI + "]").val(SHI);
      }
      if (this.QU != "") {
        var QU = $("select[id=QU]").val();
        $("input[name=" + this.QU + "]").val(QU);
      }
    },
    //改变时间
    changetime(Timedata) {
      $("input[name=THBT]").val(this.agent + Timedata + "提货计划");
    },
    //验证所有表单中控件信息的方法
    verification() {
      var _this = this;
      var DetailedExistence = false;

      //中文名用户名
      var name = this.username;

      //ExtDate 只显示日期
      var ExtDate = this.getNowFormatDate("ExtDate");

      //ExtDateTime 显示日期时间
      var ExtDateTime = this.getNowFormatDate("ExtDateTime");

      var ExtDateMonth = this.getNowFormatDate("ExtDateMonth");

      var gridVaule;

      //物资信息维护物资分类
      var WZXXWZFL = this.WZXXWZFL;

      var parameter = this.parameter;

      //获取所有一级菜单
      var SSFL = this.SSFL;

      //获取ID值 ID=0为新增时
      var ID = this.ID;

      //是否存在流程
      var transEventlength = this.transEventlength;

      //上传数量
      var fileList3 = this.fileList3.length;

      this.wjUrl = this.fileList3;

      //代理商
      var agent = this.agent;

      var viewSelection = "";

      //有明细时
      if (transEventlength > 0) {
        this.Addbaocun = false;
        this.quxiaobaocun = false;
      }
      //等于销售报价时  进入一条数据时
      if (this.Title == "销售报价" && ID != "0") {
        this.Addbaocun = false;
        this.quxiaobaocun = false;
      }

      //等于物资分类信息时  进入一条数据时
      if (ID != "0" && this.Title == "物资分类信息") {
        this.Addbaocun = false;
        this.quxiaobaocun = false;
      }

      //等于公告时  进入一条数据时
      if (ID != "0" && this.Title == "公告") {
        this.Addbaocun = false;
        this.quxiaobaocun = false;
      }

      //等于零售客户信息时  新增一条数据时
      if (this.Title == "零售客户信息" && ID == "0") {
        this.Addbaocun = false;
        this.AddbaocunDL = true;
        this.AddbaocunBJ = true;
      }
      //等于零售客户信息时  进入一条数据时
      if (this.Title == "零售客户信息" && ID != "0") {
        this.Addbaocun = false;
        this.AddbaocunDL = false;
        this.AddbaocunBJ = false;
        this.quxiaobaocun = false;
      }

      //如果不等于零售客户信息时
      if (this.Title != "零售客户信息") {
        this.AddbaocunDL = false;
        this.AddbaocunBJ = false;
      }
      //如果不等于零售客户信息时
      if (this.Title == "销售报价" && this.nr != 0) {
        this.Addbaocun = true;
        this.quxiaobaocun = true;
      }
      if (this.nr != "0" && this.Title != "代销商管理") {
        $("input[name=KHMC]").val(this.formdata[0].KHMC);
        $("input[name=KHDZ]").val(this.formdata[0].DZ);
      }
      if(this.Title == '代销商管理'){
        if(this.nr == '经销商'){
          $("[name=GSLX]").val('经销商');
          $("[name=DLSU]").show();
          $("[name=DLS]").show();
          _this.getDlSList2();
        }
      }

      //字体颜色
      $("span").each(function() {
        if ($(this).attr("data-color") == "color") {
          $(this).addClass("data-color");
        }
      });
      //验证是否为必填  为yes时，文本框等标记为*
      $("input,select,textarea").each(function() {
        if ($(this).attr("dbmust") == "yes") {
          /*$(this).addClass("dbmusticon"); */
          //物资信息维护物资分类
        } else if ($(this).attr("data-lang") == "WZXXWZFL") {
          $("select[name=" + this.name + "]").empty();
          for (var i = 0; i < WZXXWZFL.length; i++) {
            $("select[name=" + this.name + "]").append(
              "<option value='" +
                WZXXWZFL[i].SSFL +
                "'>" +
                WZXXWZFL[i].SSFL +
                "</option>"
            );
          }
        }
      });
      //ID不为空时设置只读
      if (ID == "0" && transEventlength != 0) {
        //登记表单的时候  判断初始关可编辑字段 yes可编辑no不可编辑
        $("input,select,textarea").each(function() {
          var startEdit = $(this).attr("_starteditable");
          if (startEdit !== undefined) {
            //console.log(this.name + ":" + $(this).attr("_starteditable"));
            if (startEdit == "yes") {
              $(this).removeAttr("readonly");
              $(this).removeAttr("disabled");
            } else if (startEdit == "no") {
              if (this.type == "select-one" || this.type == "radio") {
                $(this).attr("disabled", "disabled");
              } else {
                $(this).attr("readonly", "readonly");
              }
            }
          }
        });
      } //不是新增的时候
      if (ID != "0") {
        if (this.Title == "物资分类信息") {
          $("input,select,textarea").attr("ReadOnly", true);
          $("input,select,textarea").css("background-color", "#FAFAFA");
        }
        //有流程的 就禁用
        if (transEventlength != 0) {
          $("input,select").attr("ReadOnly", true);
          $("textarea").attr("ReadOnly", false);
          $("textarea").css("background-color", "#FFFFFF");
        }
      }

      //代理商数据绑定

      $("select").each(function() {
        if ($(this).attr("data-lang") == "ZHGLJS") {
          //获取角色列表
          _this.getRole(this);
        } else if ($(this).attr("data-lang") == "ZHGLZZ") {
          //所属组织
          //_this.onZhglChange();
          //所属组织 如果是别的则不能选择
          var role = sessionStorage.getItem("curRole");
          if (
            role == "代理商总管理" ||
            role == "代理商销售管理" ||
            role == "代理商服务管理" ||
            role == "代理商施工管理" ||
            role == "经销商管理"
          ) {
          } else {
            _this.onZhglChange();
          }
        } else if ($(this).attr("data-lang") == "DXSGLGSLX") {
          //所属组织
          _this.onDxsglGslx();
        } else if ($(this).attr("data-lang") == "SSFL") {
          if (ID == 0) {
            $("select[name=" + this.name + "]").empty();
            $("select[name=" + this.name + "]").append(
              "<option value=''></option>"
            );
            for (var i = 0; i < SSFL.length; i++) {
              $("select[name=" + this.name + "]").append(
                "<option value='" +
                  SSFL[i].SSFL +
                  "'>" +
                  SSFL[i].SSFL +
                  "</option>"
              );
            }
          }
        } else if ($(this).attr("data-lang") == "DLS") {
          _this.getDlSList("代理商");
        }
      });

      //文本框为configfield常用工具集
      $("input").each(function() {
        //设置填表人姓名时
        if ($(this).attr("_controltype") == "configfield") {
          if (this.value == "EmployeeName") {
            $(this).attr("type", "text");
            this.value = name;
          }
        } else if ($(this).attr("data-lang") == "DLS") {
          this.value = agent;
        } else if ($(this).attr("data-lang") == "SHEN") {
          $(this).hide();
          $(this).after('<select id="SHEN""></select>');
          for (var i = 0; i < _this.array.length; i++) {
            $("#SHEN").append(
              "<option value='" +
                _this.array[i].name +
                "'>" +
                _this.array[i].name +
                "</option>"
            );
          }
          _this.SHEN = this.name;
          $("#SHEN").change(function() {
            _this.onShenShiQuSelect('1');
          });
        } else if ($(this).attr("data-lang") == "SHI") {
          $(this).hide();
          $(this).after('<select id="SHI"></select>');

          _this.SHI = this.name;
          
          $("#SHI").change(function() {
             _this.onShenShiQuSelect('2');
          });
        } else if ($(this).attr("data-lang") == "QU") {
          $(this).hide();
          $(this).after('<select id="QU"></select>');
          _this.QU = this.name;
          $("#QU").change(function() {
             _this.onShenShiQuSelect('3');
          });
        }
        //文本框属性只日期
        else if ($(this).attr("_controltype") == "ExtDate") {
          this.value = ExtDate;
          $(this).attr("id", this.name); //给文本框赋ID

          laydate({
            //文本框弹出日期
            elem: "#" + this.name,
            format: "YYYY-MM-DD", // 分隔符可以任意定义
            istime: true,
            choose: function(dates) {
              // 选择日期完毕的回调
              console.log(dates);
            }
          });

          //日期无初值
        } else if ($(this).attr("_controltype") == "ExtDateNull") {
          this.value = "";
          $(this).attr("id", this.name); //给文本框赋ID

          laydate({
            //文本框弹出日期
            elem: "#" + this.name,
            format: "YYYY-MM-DD hh:mm:ss", // 分隔符可以任意定义
            istime: true,
            choose: function(dates) {
              // 选择日期完毕的回调
              console.log(dates);
            }
          });
        }
        //日期只显示年月份
        else if ($(this).attr("_controltype") == "ExtDateMonth") {
          this.value = "";
          $(this).attr("id", this.name); //给文本框赋ID

          laydate({
            //文本框弹出日期
            elem: "#" + this.name,
            format: "YYYY-MM-DD", // 分隔符可以任意定义
            istime: true,
            choose: function(dates) {
              var datesMonth = dates.split("-");
              $(this.elem).val(datesMonth[0] + "-" + datesMonth[1]);
              _this.timeDefinition = datesMonth[0] + "-" + datesMonth[1];
              _this.changetime(_this.timeDefinition);
            }
          });
        }
        //文本框显示日期时间
        else if ($(this).attr("_controltype") == "ExtDateTime") {
          this.value = ExtDateTime;
          $(this).attr("id", this.name); //给文本框赋ID

          laydate({
            //文本框弹出日期
            elem: "#" + this.name,
            format: "YYYY-MM-DD hh:mm:ss", // 分隔符可以任意定义
            istime: true,
            choose: function(dates) {
              // 选择日期完毕的回调
              console.log(dates);
            }
          });
        } else if ($(this).attr("_controltype") == "ExtDateReadonly") {
          this.value = ExtDate;
        }
        //是否存在明细
        else if ($(this).attr("_controltype") == "grid") {
          gridVaule = this.value;
          DetailedExistence = true;

          //上传按钮时的点击事件
        } else if ($(this).attr("_para") == "RGWJSC") {
          $(this).hide();
          if (fileList3 == 0) {
            $(this).after(
              '<button type="button" id="upload" class="el-button el-button--primary"><span>附件信息</span></button><span id="sum"></span>'
            );
            $("#upload").click(function() {
              $("#add").click();
            });
          } else {
            $(this).after(
              '<button type="button" id="upload" class="el-button el-button--primary"><span>附件信息</span></button><span id="sum"></span>'
            );
            $("#upload").click(function() {
              $("#add").click();
            });
          }

          $("#sum").html(fileList3 + "个");

          // 所属公司
        } else if ($(this).attr("data-lang") == "SSGS") {
          this.value = agent;
          // 提货标题
        } else if ($(this).attr("data-lang") == "THBT") {
          var time = ExtDate.split("-");
          var Timedata = time[0] + "-" + time[1];
          this.value = agent + Timedata + "提货计划";

          //物资价格维护点击物资编码选择数据
        } else if ($(this).attr("data-lang") == "GCS") {
          this.value = _this.engineer;
        } else if ($(this).attr("data-lang") == "XYSID") {
          this.value = _this.user;
        } else if (
          $(this).attr("data-lang") == "WZBM" ||
          $(this).attr("data-lang") == "WZMC"
        ) {
          parameter = this.name;
          $(this).after(
            '<button type="button" class="el-button el-button--primary choiceView"><span>选择</span></button>'
          );
          $(".choiceView").click(function() {
            $("#selectionView").click();
          });
        } else if ($(this).attr("data-lang") == "KHXM") {
          parameter = this.name;
          viewSelection = "零售客户信息";
          $(this).after(
            '<button type="button" class="el-button el-button--primary choiceTAble"><span>选择</span></button>'
          );
          $(".choiceTAble").click(function() {
            $("#selectionTable").click();
          });
        } else if ($(this).attr("data-lang") == "WXKHXM") {
          parameter = this.name;
          viewSelection = "调试信息";
          $(this).after(
            '<button type="button" class="el-button el-button--primary choiceTAble"><span>选择</span></button>'
          );
          $(".choiceTAble").click(function() {
            $("#selectionTable").click();
          });
        } else if ($(this).attr("data-lang") == "selectionPersonnel") {
          if (_this.curRole == "代理商调试") {
            this.value = _this.username;
          } else {
            _this.scope = $(this).attr("data-scope");
            _this.role = $(this).attr("data-role");
            if ($(this).attr("data-orgname") == "当前代理商") {
              if (_this.ID > 0) {
                _this.orgname = _this.formdata[0].DLS;
              } else {
                _this.orgname = "all";
              }
            } else {
              _this.orgname = $(this).attr("data-orgname");
            }
            _this.field = this.name;
            $(this).after(
              '<button type="button" class="el-button el-button--primary selectionPersonnel"><span>选择</span></button>'
            );
            $(".selectionPersonnel").click(function() {
              $("#sectorSelection").click();
            });
          }
        } else if ($(this).attr("data-lang") == "englishName") {
          if (_this.curRole == "代理商调试") {
            this.value = _this.user;
          }
        }
      });
      if (viewSelection != "") {
        this.viewName = viewSelection;
      }

      //如果没有点击选择
      if (parameter != "") {
        this.parameter = parameter;
      }
      if (DetailedExistence) {
        //是否存在明细
        //获取明细ID传入方法
        this.Getdetails(gridVaule);
      } else {
        if (this.Title == "销售报价") {
          this.show = false;
          this.processSubmission = false;
        } else {
          this.show = !this.show;
        }
      }
      //获取数据（带值显示）
      if (this.ID != "0") {
        this.getValue();
      }

      if (this.Title == "销售报价") {
        //销售报价
        var XSBJArry = [281, 282, 283, 284];
        for (var i = 0; i < XSBJArry.length; i++) {
          this.Getdetails(XSBJArry[i]);
        }
      }

      /*
      if (this.Title == "帐号管理") {
        if (_this.ID > 0) {
          var zz = _this.formdata[0].SSZZ;
          if (zz == "锐服环境科技") {
            $("[name=JXSSPAN]").hide();
            $("[name=JXS]").hide();
            $("[name=DLSSPAN]").hide();
            $("[name=DLS]").hide();
          } else {
            _this.getDlSList(zz);
            if (zz == "代理商") {
              $("[name=DLSSPAN]").show();
              $("[name=DLS]").show();
              $("[name=JXSSPAN]").hide();
              $("[name=JXS]").hide();
            } else {
              $("[name=DLSSPAN]").show();
              $("[name=DLS]").show();
              $("[name=JXSSPAN]").show();
              $("[name=JXS]").show();
              if (zz == "经销商" && _this.ID > 0) {
                _this.getJXSList(_this.formdata[0].DLS);
              }
            }
          }
        } else {
          var uuid = _this.getUUID();
          $("[name=DLZH]").val(uuid);
        }
      }
      */
      if (this.Title == "帐号管理") {
        var role = sessionStorage.getItem("curRole");
        var ssdls = sessionStorage.getItem("agent"); //当前登录人所属代理商
        var ssjxs = sessionStorage.getItem("dealer"); //当前登录人所属经销商
        //role = "分销商管理";
        //ssdls = "上海永乐";
        //ssjxs = "所属经销商";
        if (
          role == "代理商总管理" ||
          role == "代理商销售管理" ||
          role == "代理商服务管理" ||
          role == "代理商施工管理" ||
          role == "经销商管理"
        ) {
          $("[name=SSZZ]").empty(); //清空选择框
        }
        if (role == "代理商总管理") {
          //代理商是自己  经销商是自己下面的
          $("[name=SSZZ]").html(
            '<option disabled selected hidden>请选择</option><option value="代理商">代理商</option><option value="经销商">经销商</option>'
          );
          function onSSzzdataLoad(val) {
            $("[name=DLSSPAN]").show();
            $("[name=DLS]").show();
            $("[name=DLS]").empty();
            if (_this.ID > 0) {
              $("[name=DLS]").html(
                '<option selected value="' +
                  _this.formdata[0].DLS +
                  '">' +
                  _this.formdata[0].DLS +
                  "</option>"
              );
            } else {
              $("[name=DLS]").html(
                '<option selected value="' + ssdls + '">' + ssdls + "</option>"
              );
            }
            if (val == "经销商") {
              $("[name=JXSSPAN]").show();
              $("[name=JXS]").show();
              $("[name=JXS]").empty();
              var dlss1 = "";
              if (_this.ID > 0) {
                dlss1 = _this.formdata[0].DLS;
              } else {
                dlss1 = ssdls;
              }
              _this.getJXSList(dlss1);
            }
          }
          if (_this.ID > 0) {
            $("[name=SSZZ]").val(_this.formdata[0].SSZZ);
            onSSzzdataLoad(_this.formdata[0].SSZZ);
          } else {
            $("[name=SSZZ]").on("change", function() {
              var val = $("[name=SSZZ]").val();
              onSSzzdataLoad(val);
            });
          }
        } else if (
          role == "代理商销售管理" ||
          role == "代理商服务管理" ||
          role == "代理商施工管理"
        ) {
          //不能修改 代理商是自己
          $("[name=DLSSPAN]").show();
          $("[name=DLS]").show();
          $("[name=DLS]").empty();
          $("[name=SSZZ]").html(
            '<option selected value="代理商">代理商</option>'
          );
          if (_this.ID > 0) {
            $("[name=DLS]").html(
              '<option selected value="' +
                _this.formdata[0].DLS +
                '">' +
                _this.formdata[0].DLS +
                "</option>"
            );
          } else {
            $("[name=DLS]").html(
              '<option selected value="' + ssdls + '">' + ssdls + "</option>"
            );
          }
        } else if (role == "经销商管理") {
          //不能修改 代理商经销商是自己
          $("[name=DLSSPAN]").show();
          $("[name=DLS]").show();
          $("[name=DLS]").empty();
          $("[name=JXSSPAN]").show();
          $("[name=JXS]").show();
          $("[name=JXS]").empty();
          $("[name=SSZZ]").html(
            '<option selected value="经销商">经销商</option>'
          );
          if (_this.ID > 0) {
            $("[name=DLS]").html(
              '<option selected value="' +
                _this.formdata[0].DLS +
                '">' +
                _this.formdata[0].DLS +
                "</option>"
            );
            $("[name=JXS]").html(
              '<option selected value="' +
                _this.formdata[0].JXS +
                '">' +
                _this.formdata[0].JXS +
                "</option>"
            );
          } else {
            $("[name=DLS]").html(
              '<option selected value="' + ssdls + '">' + ssdls + "</option>"
            );
            $("[name=JXS]").html(
              '<option selected value="' + ssjxs + '">' + ssjxs + "</option>"
            );
          }
        } else if (_this.ID > 0) {
          var zz = _this.formdata[0].SSZZ;
          if (zz != "代理商" && zz != "经销商") {
            $("[name=JXSSPAN]").hide();
            $("[name=JXS]").hide();
            $("[name=DLSSPAN]").hide();
            $("[name=DLS]").hide();
          } else {
            _this.getDlSList(zz);
            if (zz == "代理商") {
              $("[name=DLSSPAN]").show();
              $("[name=DLS]").show();
              $("[name=JXSSPAN]").hide();
              $("[name=JXS]").hide();
            } else {
              $("[name=DLSSPAN]").show();
              $("[name=DLS]").show();
              $("[name=JXSSPAN]").show();
              $("[name=JXS]").show();
              if (zz == "经销商" && _this.ID > 0) {
                _this.getJXSList(_this.formdata[0].DLS);
              }
            }
          }
        } // end else if(_this.ID > 0) {
      } //end if (this.Title == "帐号管理")

      if (this.transEventlength > 1) {
        //控制流程 可编辑的字段 ReadOnly
        console.log(this.editField);
        if (
          this.editField != "" &&
          this.editField != null &&
          this.editField != undefined
        ) {
          var editfieldArr = this.editField.split(";");
          for (var i = 0; i < editfieldArr.length; i++) {
            var edit = editfieldArr[i].substr(1);
            edit = edit.substring(0, edit.length - 1);
            $("[name=" + edit + "]").removeAttr("readonly");
          }
        }
      }
    },
    getValue() {
      //获取数据将数据绑定在文本框中
      //无明细表时数据绑定
      var formdata = this.formdata;
      var SSFL = this.SSFL; //获取所有一级菜单列表
      var WZXXWZFL = this.WZXXWZFL;
      $("input,textarea,select").each(function() {
        if ($(this).attr("data-lang") == "SSFL") {
          $("select[name=" + this.name + "]").empty();
          for (var i = 0; i < SSFL.length; i++) {
            $("select[name=" + this.name + "]").append(
              "<option value='" +
                SSFL[i].SSFL +
                "'>" +
                SSFL[i].SSFL +
                "</option>"
            );
          }
        } else if ($(this).attr("data-lang") == "WZXXWZFL") {
          $("select[name=" + this.name + "]").empty();
          for (var i = 0; i < WZXXWZFL.length; i++) {
            $("select[name=" + this.name + "]").append(
              "<option value='" +
                WZXXWZFL[i].SSFL +
                "'>" +
                WZXXWZFL[i].SSFL +
                "</option>"
            );
          }
        }
        if ($(this).attr("_controltype") == "grid") {
          formdata[0][this.name] = this.value;
        } else {
          this.value = formdata[0][this.name];
        }
        if ($(this).attr("value") == "_FORMNO") {
          this.value = formdata[0]._FORMNO;
        }
      });
      //2019/08/22 by pengxiaolong 小龙处理
      
      if (this.Title == "零售客户信息") {
        if(this.ID > 0){
          $("select").each(function() {
            if ($(this).attr("id") == "SHEN") {
              this.value = formdata[0].SHEN;
            } 
          });
          this.onLoadSSQ();
        }
      }
      if (
        this.Title == "维修信息" ||
        this.Title == "调试信息" ||
        this.Title == "提货计划" ||
        this.Title == "提货订单"
      ) {
        // 获取上传名称
        var file = formdata[0].file;
        if (file != "") {
          // 获取上传名称对象
          var fileSplit = file.split(",");
          // 获取上传URL地址
          var url = formdata[0].WJ;
          // 获取上传URL对象
          var urlSplit = url.split(",");
          // 定义一个新对象
          var uploadArray = {};
          // 判断全局变量上传数组是否为空
          if (Object.keys(this.fileList3).length === 0) {
            //循环对象且赋值给新数组
            for (var i = 0; i < fileSplit.length; i++) {
              uploadArray = {
                name: fileSplit[i],
                url: urlSplit[i]
              };
              //再push进全局数组
              this.fileList3.push(uploadArray);
            }
          }
        }
      }
    },
    acquisitionOfClassification() {
      Axios.post(
        this.baseUrl + "HttpUtil/GetWZFLMenuHandler.ashx",
        {
          // 参数 username
          username: this.user
        },
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      )
        //将获取到的接口值 赋给info；
        .then(response => (this.SSFLdata = response.data))
        .catch(function(error) {
          alert(error);
          console.log(error);
        });
    },
    //获取当前格式日期
    getNowFormatDate(controltype) {
      // controltype为传过来的值  如ExtDate，ExtDateTime等

      var now = new Date();
      var year = now.getFullYear(); //年
      var month = now.getMonth() + 1; //月
      var day = now.getDate(); //日

      var hh = now.getHours(); //时
      var mm = now.getMinutes(); //分

      //年月日
      var clock = year + "-";
      if (month < 10) {
        clock += "0";
        clock += month + "-";
      }

      if (day < 10) {
        clock += "0";
      }
      clock += day;

      //加上时分秒
      if (controltype == "ExtDateTime") {
        clock += " ";
        if (hh < 10) {
          clock += "0";
        }
        clock += hh + ":";
        if (mm < 10) {
          clock += "0";
        }
        clock += mm;
        clock += ":00";
      }
      return clock;
    },
    //获取明细ID且调用接口
    Getdetails(gridVaule) {
      //获取表单
      Axios.post(
        this.baseUrl + "HttpUtil/GetMxViewHandler.ashx", //获取表单数据参数
        {
          // 参数 username
          username: this.user,

          // 参数 viewId
          viewId: gridVaule,

          //参数 shortTitle
          shortTitle: this.shortTitle
        },
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }
      )
        //将获取到的接口值 赋给info；
        .then(response => (this.viewNameData = response.data))
        .catch(function(error) {
          alert(error);
          console.log(error);
        });
    },
    submitFormBJ() {
      this.jumpBJB = 1;
      this.submitForm();
    },
    //点击保存
    submitForm() {
      var _this = this;

      var Title = this.Title;
      //保存时获取数据 组装成json传入接口，保存数据。
      var data = { ID: this.$route.params.id };
      var setData = {};
      var contentHasSave = true;

      var DLZH = ""; //帐号管理》登录帐号字段
      var DLDH = "";

      if (Title == "销售报价") {
        //空调配置表数据
        var KTPZB = this.KTPZB;

        //地暖配置表数据
        var DNPZB = this.DNPZB;

        //外机选型数据
        var WJXXB = this.WJXXB;

        //系统组件
        var XTZJB = this.XTZJB;
      } else {
        //上传文件
        var wjUrl = this.wjUrl;

        //上传文件的URL组装字符串
        var wjUrlData = "";
        //上传文件的name
        var wjName = "";

        var detailedvieWdata = this.viewData; //明细视图数据

        var viewName = this.viewNameMX; //明细视图名

        var DZ = "";
      }

      $("input,select,textarea").each(function() {
        //console.log(this.name + ":" + $(this).val() + ":" + $(this).attr("dbmust") + ":" + $(this).val() == "" || $(this).val() == null);
        //保存时验证是否为必填
        if (
          $(this).attr("dbmust") == "yes" &&
          ($(this).val() == "" || $(this).val() == null)
        ) {
          var bttxt  = $(this).parents("td").prev().children().children();
          if(bttxt.find("u").length != 0){
            bttxt = bttxt.find("u");
          }
          alert("标_必填：" + bttxt.html());
          contentHasSave = false;
          return false;
        } else {
          //没有必填则组装data数据
          if (this.name == "") {
            return;
          }
          if (this.type == "radio") {
            data[this.name] = $(
              "input[name='" + this.name + "']:checked"
            ).val();
          } else {
            if (Title == "零售客户信息") {
              if ($(this).attr("name") == "SHEN") {
                DZ += this.value+"省";
              }
              if ($(this).attr("name") == "SHI") {
                DZ += this.value+"市";
              }
              if ($(this).attr("name") == "QU") {
                DZ += this.value;
              }
              if ($(this).attr("name") == "LU") {
                DZ += this.value + "路";
              }
              if ($(this).attr("name") == "NON") {
                DZ += this.value + "弄";
              }
              if ($(this).attr("name") == "HAO") {
                DZ += this.value + "号";
              }
              if ($(this).attr("name") == "SHIN") {
                DZ += this.value + "室";
              }
              if ($(this).attr("data-lang") == "DZ") {
                this.value = DZ;
              }
              DLZH = DZ;
            }

            //上传时候保存的数据
            if ($(this).attr("data-lang") == "upload") {
              for (var i = 0; i < wjUrl.length; i++) {
                wjUrlData += wjUrl[i].url + ",";
                wjName += wjUrl[i].name + ",";
              }
              this.value = wjUrlData.substr(0, wjUrlData.length - 1);
            }
            //给file赋值上传文件的名称
            if (this.name == "file") {
              var wjnameNew = wjName.substr(0, wjName.length - 1);
              data[this.name] = wjnameNew;
            } else {
              data[this.name] = this.value;
            }
            if (this.name == "DLZH") {
              DLZH = this.value;
            }
            if (this.name == "DH1") {
              DLDH = this.value;
            }
            if (this.name == "WZBH") {
              DLZH = this.value;
            }

            if ("BH" == this.name) {
              DLZH = this.value;
            }
            if ("LXDH" == this.name) {
              DLDH = this.value;
            }
            //明细表为空时，不能保存
            if (Title != "销售报价") {
              if (viewName != "") {
                if (detailedvieWdata.length == 0) {
                  alert("明细表不能为空!");
                  contentHasSave = false;
                  return false;
                }
              }
            } else if (
              KTPZB == "" &&
              DNPZB == "" &&
              WJXXB == "" &&
              XTZJB == ""
            ) {
              alert("明细表不能为空!");
              contentHasSave = false;
              return false;
            }
          }
        }
      });
      //如果 contentHasSave是trun则进入下一步
      if (contentHasSave) {
        // 使用element的提示框
        this.$confirm("是否保存表单内容？", "提示", {
          showCancelButton: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          //点击确认进入步骤
          .then(() => {
            //销售报价新增保存时
            if (Title == "销售报价") {
              setData = {
                //username
                username: this.user,
                //shortTitle
                shortTitle: this.shortTitle,
                //data数据在上方组装
                data,
                KTPZB: KTPZB,
                DNPZB: DNPZB,
                WJXXB: WJXXB,
                XTZJB: XTZJB
              };
            } else {
              //其他保存时
              setData = {
                //username
                username: this.user,
                //shortTitle
                shortTitle: this.shortTitle,
                //data数据在上方组装
                data,
                detailData: detailedvieWdata,
                detailedViewName: viewName
              };
            }

            if (
              Title == "帐号管理" ||
              "物资信息维护" == Title ||
              "零售客户信息" == Title ||
              "工程商管理" == Title
            ) {
              Axios.post(
                this.baseUrl + "HttpUtil/accountManager.ashx", //获取明细数据
                {
                  // 参数 username
                  action: "checkDlzh",
                  dlzh: DLZH,
                  dldh: DLDH,
                  title: Title,
                  dataID: _this.ID,
                  username: this.user
                },
                {
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  }
                }
              )
                //将获取到的接口值 赋给info；
                .then(function(res) {
                  if (res.data.code != "success") {
                    _this.$alert("获取数据出错:" + res.msg, {
                      confirmButtonText: "确定"
                    });
                    return;
                  }
                  if (res.data.data > 0) {
                    var alertstr = "";
                    if (Title == "物资信息维护") {
                      alertstr = "物资编号出现重复值，请重新输入";
                    } else if (Title == "帐号管理") {
                      alertstr = "登录账号或电话号已存在，请重新输入";
                    } else if (Title == "零售客户信息") {
                      alertstr = "地址已存在,请重新输入";
                    } else if (Title == "工程商管理") {
                      alertstr = "登录帐号或联系方式已存在,请重新输入";
                    }

                    _this.$alert(alertstr, {
                      confirmButtonText: "确定"
                    });
                    return;
                  }
                  //将数据组装成{username:”zhangsan”,shortTitle:”物资信息”,data:{name:”电脑”,danwei:”台”}}类型就行post提交
                  Axios.post(
                    _this.baseUrl + "HttpUtil/AddFormDataHandler.ashx",
                    setData,
                    {
                      headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                      }
                    }
                  )
                    //定义一个全局变量 infodata  在上方 computed函数中执行
                    .then(response => (_this.infodata = response.data))
                    //失败
                    .catch(function(error) {
                      alert(error);
                    });
                })
                .catch(function(error) {
                  alert(error);
                });
            } else {
              //将数据组装成{username:”zhangsan”,shortTitle:”物资信息”,data:{name:”电脑”,danwei:”台”}}类型就行post提交
              Axios.post(
                this.baseUrl + "HttpUtil/AddFormDataHandler.ashx",
                setData,
                {
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  }
                }
              )
                //定义一个全局变量 infodata  在上方 computed函数中执行
                .then(response => (this.infodata = response.data))
                //失败
                .catch(function(error) {
                  alert(error);
                });
            }
          })
          //点击取消进入步骤
          .catch(() => {
            // 选择取消
          });
      }
    },
    //取消时
    cancel() {
      this.$router.go(-1);
    },
    getRole(e) {
      var js = "";

      if (this.ID > 0 && this.Title == "帐号管理") {
        js = this.formdata[0].JS;
      }
      Axios.post(
        this.baseUrl + "HttpUtil/accountManager.ashx", //获取明细数据
        {
          // 参数 username
          action: "GetRoleList"
        },
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      )
        //将获取到的接口值 赋给info；
        .then(function(res) {
          var data = res.data;
          if (data.code == "success") {
            var optionStr = "<option disabled selected hidden>请选择</option>";
            for (var i = 0; i < data.data.length; i++) {
              if (js == data.data[i].Name) {
                optionStr +=
                  '<option selected value="' +
                  data.data[i].Name +
                  '">' +
                  data.data[i].Name +
                  "</option>";
              } else {
                optionStr +=
                  '<option value="' +
                  data.data[i].Name +
                  '">' +
                  data.data[i].Name +
                  "</option>";
              }
            }
            $(e).html(optionStr);
          }
        })
        .catch(function(error) {
          alert(error);
        });
    },
    onZhglChange() {
      var _this = this;
      $("#ZHGLZZ").on("change", function() {
        var val = $("#ZHGLZZ").val();
        if (val == "代理商" || val == "经销商") {
          $("[name=DLSSPAN]").show();
          $("[name=DLS]").show();
          _this.getDlSList(val);
        } else {
          $("[name=DLSSPAN]").hide();
          $("[name=DLS]").hide();
          $("[name=DLS]").val("");
          $("[name=JXSSPAN]").hide();
          $("[name=JXS]").hide();
          $("[name=JXS]").val("");
        }
      });
    },
    getDlSList(val) {
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
          var dls = "";
          if (_this.ID > 0) dls = _this.formdata[0].DLS;
          var data = res.data;
          var optionStr;
          if (data.code == "success") {
            if (_this.agent != "") {
              optionStr =
                "<option disabled selected hidden>" + _this.agent + "</option>";
            } else {
              optionStr = "<option disabled selected hidden>请选择</option>";
            }
            for (var i = 0; i < data.data.length; i++) {
              if (_this.ID > 0 && dls == data.data[i].GSMC) {
                optionStr +=
                  '<option selected value="' +
                  data.data[i].GSMC +
                  '">' +
                  data.data[i].GSMC +
                  "</option>";
              } else {
                optionStr +=
                  '<option value="' +
                  data.data[i].GSMC +
                  '">' +
                  data.data[i].GSMC +
                  "</option>";
              }
            }

            $("[name=DLS]").html(optionStr);
            if (val == "经销商") {
              //代理商要选择经销商
              $("[name=DLS]").on("change", function() {
                var dlsval = $("[name=DLS]").val();
                _this.getJXSList(dlsval);
              });
            }
          }
        })
        .catch(function(error) {
          alert(error);
        });
    },
    getJXSList(val) {
      var _this = this;
      Axios.post(
        this.baseUrl + "HttpUtil/accountManager.ashx", //获取明细数据
        {
          // 参数 username
          action: "GetDlsJxs",
          type: "2",
          dls: val
        },
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      )
        //将获取到的接口值 赋给info；
        .then(function(res) {
          $("[name=JXSSPAN]").show();
          $("[name=JXS]").show();
          var data = res.data;
          var jxs = "";
          if (_this.ID > 0) jxs = _this.formdata[0].JXS;

          if (data.code == "success") {
            var optionStr = "<option disabled selected hidden>请选择</option>";
            for (var i = 0; i < data.data.length; i++) {
              if (_this.ID > 0 && jxs == data.data[i].GSMC) {
                optionStr +=
                  '<option selected value="' +
                  data.data[i].GSMC +
                  '">' +
                  data.data[i].GSMC +
                  "</option>";
              } else {
                optionStr +=
                  '<option value="' +
                  data.data[i].GSMC +
                  '">' +
                  data.data[i].GSMC +
                  "</option>";
              }
            }
            $("[name=JXS]").html(optionStr);
          }
        })
        .catch(function(error) {
          alert(error);
        });
    },
    onDxsglGslx() {
      var _this = this;
      $("#GsleSele").on("change", function() {
        var val = $("#GsleSele").val();
        if (val == "经销商") {
          $("[name=DLSU]").show();
          $("[name=DLS]").show();
          _this.getDlSList2();
        } else {
          $("[name=DLSU]").hide();
          $("[name=DLS]").hide();
        }
      });
    },
    getDlSList2() {
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
          var data = res.data;
          if (data.code == "success") {
            var optionStr = "<option disabled selected hidden>请选择</option>";
            for (var i = 0; i < data.data.length; i++) {
              optionStr +=
                '<option value="' +
                data.data[i].GSMC +
                '">' +
                data.data[i].GSMC +
                "</option>";
            }
            $("[name=DLS]").html(optionStr);
          }
        })
        .catch(function(error) {
          alert(error);
        });
    },
    getUUID() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
        c
      ) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    },
    rfdateFormt(format, timestamp) { var that = this; var jsdate, f; var txt_words = ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; var formatChr = /\\?(.?)/gi; var formatChrCb = function (t, s) { return f[t] ? f[t]() : s }; var _pad = function (n, c) { n = String(n); while (n.length < c) { n = "0" + n } return n }; f = { d: function () { return _pad(f.j(), 2) }, D: function () { return f.l().slice(0, 3) }, j: function () { return jsdate.getDate() }, l: function () { return txt_words[f.w()] + "day" }, N: function () { return f.w() || 7 }, S: function () { var j = f.j(); var i = j % 10; if (i <= 3 && parseInt((j % 100) / 10, 10) == 1) { i = 0 } return ["st", "nd", "rd"][i - 1] || "th" }, w: function () { return jsdate.getDay() }, z: function () { var a = new Date(f.Y(), f.n() - 1, f.j()); var b = new Date(f.Y(), 0, 1); return Math.round((a - b) / 86400000) }, W: function () { var a = new Date(f.Y(), f.n() - 1, f.j() - f.N() + 3); var b = new Date(a.getFullYear(), 0, 4); return _pad(1 + Math.round((a - b) / 86400000 / 7), 2) }, F: function () { return txt_words[6 + f.n()] }, m: function () { return _pad(f.n(), 2) }, M: function () { return f.F().slice(0, 3) }, n: function () { return jsdate.getMonth() + 1 }, t: function () { return (new Date(f.Y(), f.n(), 0)).getDate() }, L: function () { var j = f.Y(); return j % 4 === 0 & j % 100 !== 0 | j % 400 === 0 }, o: function () { var n = f.n(); var W = f.W(); var Y = f.Y(); return Y + (n === 12 && W < 9 ? 1 : n === 1 && W > 9 ? -1 : 0) }, Y: function () { return jsdate.getFullYear() }, y: function () { return f.Y().toString().slice(-2) }, a: function () { return jsdate.getHours() > 11 ? "pm" : "am" }, A: function () { return f.a().toUpperCase() }, B: function () { var H = jsdate.getUTCHours() * 3600; var i = jsdate.getUTCMinutes() * 60; var s = jsdate.getUTCSeconds(); return _pad(Math.floor((H + i + s + 3600) / 86.4) % 1000, 3) }, g: function () { return f.G() % 12 || 12 }, G: function () { return jsdate.getHours() }, h: function () { return _pad(f.g(), 2) }, H: function () { return _pad(f.G(), 2) }, i: function () { return _pad(jsdate.getMinutes(), 2) }, s: function () { return _pad(jsdate.getSeconds(), 2) }, u: function () { return _pad(jsdate.getMilliseconds() * 1000, 6) }, e: function () { throw "Not supported (see source code of date() for timezone on how to add support)" }, I: function () { var a = new Date(f.Y(), 0); var c = Date.UTC(f.Y(), 0); var b = new Date(f.Y(), 6); var d = Date.UTC(f.Y(), 6); return ((a - c) !== (b - d)) ? 1 : 0 }, O: function () { var tzo = jsdate.getTimezoneOffset(); var a = Math.abs(tzo); return (tzo > 0 ? "-" : "+") + _pad(Math.floor(a / 60) * 100 + a % 60, 4) }, P: function () { var O = f.O(); return (O.substr(0, 3) + ":" + O.substr(3, 2)) }, T: function () { return "UTC" }, Z: function () { return -jsdate.getTimezoneOffset() * 60 }, c: function () { return "Y-m-d\\TH:i:sP".replace(formatChr, formatChrCb) }, r: function () { return "D, d M Y H:i:s O".replace(formatChr, formatChrCb) }, U: function () { return jsdate / 1000 | 0 } }; this.date = function (format, timestamp) { that = this; jsdate = (timestamp === undefined ? new Date() : (timestamp instanceof Date) ? new Date(timestamp) : new Date(timestamp * 1000)); return format.replace(formatChr, formatChrCb) }; return this.date(format, timestamp) }
    ,getTitle(){
      var title = '';
      if(this.Title == "代销商管理"){
        if(this.nr == '代理商'){
          title = '代理商管理';
        }
        else if(this.nr == '经销商'){
          title = '经销商管理';
        }
      }else{
        title = this.Title;
      }
      return title;
    },
    onLoadSSQ(){
      debugger
      var shen = this.formdata[0].SHEN;
      var shi = this.formdata[0].SHI;
      var qu = this.formdata[0].QU;
      var shiArr = '';
      var quArr = '';

      //获取市
      for (var i = 0; i < this.array.length; i++) {
        if(this.array[i].name == shen){
          shiArr = this.array[i].city;
          break;
        }
      }

      var shistr = '';
      for(var i = 0;i < shiArr.length;i++){
        shistr += '<option value="'+ shiArr[i].name +'">'+ shiArr[i].name +'</option>';
        if(shi == shiArr[i].name){
          quArr = shiArr[i].area;
        }
      }
      $("#SHI").html(shistr);
      $("#SHI").val(shi);
      var qustr = '';
      for(var i = 0;i < quArr.length;i++){
         qustr += '<option value="'+ quArr[i] +'">'+ quArr[i] +'</option>';
      }
      $("#QU").html(qustr);
      $("#QU").val(qu);
      /*var SHEN = $("select[id=SHEN]").val();
        $("input[name=" + this.SHEN + "]").val(SHEN); */
    },
    onShenShiQuSelect(type){
      //加载省市区
      var shen = $("#SHEN").val();
      var shi = $("#SHI").val();
      var shiArr = '';
      var quArr = '';
      for (var i = 0; i < this.array.length; i++) {
          if(this.array[i].name == shen){
            shiArr = this.array[i].city;
            break;
          }
      }
      if(type == '1'){
        $("#SHI").html('');
        $("#QU").html('');
        var shistr = '<option disabled selected hidden>请选择</option>';
        for(var i = 0;i < shiArr.length;i++){
          shistr += '<option value="'+ shiArr[i].name +'">'+ shiArr[i].name +'</option>';
        }
        $("#SHI").html(shistr);
        $("input[name=SHEN]").val($("#SHEN").val());
      }
      else if(type == '2'){
        $("#QU").html('');
        
        //获取区
        for(var i = 0;i < shiArr.length;i++){
          if(shi == shiArr[i].name){
            quArr = shiArr[i].area;
            break;
          }
        }
        var qustr = '<option disabled selected hidden>请选择</option>';
        for(var i = 0;i < quArr.length; i++){
          qustr += '<option value="'+ quArr[i] +'">'+ quArr[i] +'</option>';
        }
        $("#QU").html(qustr);
        $("input[name=SHI]").val($("#SHI").val());
      }
      else if(type == '3'){
        $("input[name=QU]").val($("#QU").val());

      } 
    }
  },
  //将别名demo 变成 组件 Demo
  components: {
    UserForms: UserForms,
    userselect: userselect
  }
};
</script>

<style>
/* 整体表单样式 */

.textBoxLength {
  width: 20px;
}
.Preservation {
  text-align: center;
  padding-top: 20px;
  padding-bottom: 20px;
}
.el-col table td {
  border: none;
  font-size: 14px;
}
.el-col table tr {
  border: none;
  height: 50px;
}
.el-col table {
  border: none;
}
table input {
  overflow: auto;
  height: 25px;
  width: 200px;
  border: 1px solid #dfdfdf;
  background-color: #fafafa;
}
select {
  overflow: auto;
  width: 200px !important;
  height: 30px !important;
  border: 1px solid #dfdfdf;
  background-color: #fafafa;
}
p {
  margin: 0;
}
select option {
  appearance: none;
}
.save {
  background-color: #0372e6;
  color: #ffffff !important;
}
.cancel {
  background-color: none;
}
.dbmusticon {
  background-image: url(../assets/dbmust.gif);
  background-repeat: no-repeat;
  font-size: 14px;
  margin-left: 0px;
  margin-top: 0px;
  margin-right: 0px;
  margin-bottom: 0px;
  padding-left: 0px;
  background-position: right;
}
.hide {
  display: none;
}
table input[type="radio"] {
  height: auto !important;
  width: auto !important;
}
table input[size="10"] {
  width: 134px;
}
/* .el-dialog--small{
      width: 30%;
} */
.processSubmission {
  padding: 20px;
}
.vxe-header--row th {
  background-color: #bed9f4;
  text-align: center;
  color: #000;
}
.vxe-pager-size--select {
  z-index: 20000 !important;
}
.data-color {
  color: #0372e6;
}
.processSubmissionnew {
  padding: 20px;
  text-align: center;
}
</style>