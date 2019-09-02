 <template>
  <el-row>
    <div>
      <!-- 中央空调系统报价明细表 -->
      <div class="type">
        <div class="navigationBlock"></div>中央空调系统报价明细表
      </div>
      <div class="border"></div>
      <div class="type">
        <div class="navigationBlock"></div>设备部分
      </div>
      <div class="border"></div>
      <div>
        <vxe-table
          class="userformsTable"
          border
          highlight-hover-row
          show-footer
          :footer-method="equipmentSection"
          :data.sync="tableData1"
          ref="xTable1"
          >       
          <vxe-table-column type="index" title="序号" width="60"></vxe-table-column>
          <vxe-table-column field="WZBM" title="物料编码"></vxe-table-column>
          <vxe-table-column field="SBMC" title="设备名称"></vxe-table-column>
          <vxe-table-column field="PINPAI" title="品牌"></vxe-table-column>
          <vxe-table-column field="GGXH" title="规格型号"></vxe-table-column>
          <vxe-table-column field="DW" title="单位"></vxe-table-column>
          <vxe-table-column field="SL" title="数量"></vxe-table-column>
          <vxe-table-column title="报价（含税）">
            <vxe-table-column field="DJ" title="单价(RMB)"></vxe-table-column>
            <vxe-table-column field="JE" title="金额(RMB)"></vxe-table-column>
          </vxe-table-column>
        </vxe-table>
      </div>
      <!-- 中央空调系统报价明细表end -->

      <!-- 安装部分 -->
      <div class="type">
        <div class="navigationBlock"></div>安装部分
      </div>
      <div class="border"></div>
      <div>
        <vxe-table
          class="userformsTable"
          border
          highlight-hover-row
          show-footer
          :footer-method="installationSection"
          :data.sync="tableData2"
          ref="xTable2"
          >
          <vxe-table-column type="index" title="序号" width="60"></vxe-table-column>
          <vxe-table-column field="WZBM" title="物料编码"></vxe-table-column>
          <vxe-table-column field="SBMC" title="设备名称"></vxe-table-column>
          <vxe-table-column field="PINPAI" title="品牌"></vxe-table-column>
          <vxe-table-column field="GGXH" title="规格型号"></vxe-table-column>
          <vxe-table-column field="DW" title="单位"></vxe-table-column>
          <vxe-table-column field="SL" title="数量"></vxe-table-column>
          <vxe-table-column title="报价（含税）">
            <vxe-table-column field="DJ" title="单价(RMB)"></vxe-table-column>
            <vxe-table-column field="JE" title="金额(RMB)"></vxe-table-column>
          </vxe-table-column>
        </vxe-table>
      </div>
      <!-- 安装部分end -->

      <!-- 室内安装材料明细 -->
      <div class="type">
        <div class="navigationBlock"></div>室内安装材料明细
      </div>
      <div class="border"></div>
      <div>
        <vxe-table 
          class="userformsTable"
          border
          highlight-hover-row
          show-footer
          :data.sync="tableData3"
          ref="xTable3"
        >
          <vxe-table-column type="index" title="序号" width="60"></vxe-table-column>
          <vxe-table-column field="WZBM" title="物料编码"></vxe-table-column>
          <vxe-table-column field="SBMC" title="设备名称"></vxe-table-column>
          <vxe-table-column field="PINPAI" title="品牌"></vxe-table-column>
          <vxe-table-column field="GGXH" title="规格型号"></vxe-table-column>
          <vxe-table-column field="DW" title="单位"></vxe-table-column>
          <vxe-table-column field="SL" title="数量"></vxe-table-column>
          <vxe-table-column title="报价（含税）">
            <vxe-table-column field="DJ" title="单价(RMB)"></vxe-table-column>
            <vxe-table-column field="JE" title="金额(RMB)"></vxe-table-column>
          </vxe-table-column>
        </vxe-table>
      </div>
      <!-- 室内安装材料明细end -->
    </div>
    <div class="Preservation">
      <el-button type="primary" @click="quotationExport">导出报价表</el-button>
      <el-button class="cancel" @click="cancel()">返回</el-button>
    </div>
  </el-row>
</template>

<script>
import XEUtils from "xe-utils";
export default {
  data() {
    return {
      tableData1: [
        {
            WZBM: 'SKT400003',
            SBMC: '空气源一体机（6P）',
            PINPAI: '艾默生',
            GGXH: 'XMCH-V06A-PXS-Y01',
            DW: '台',
            SL: '1',
            DJ: '20900 ',
            JE: '20900 ',
        },
        {
            WZBM: 'SKT400004',
            SBMC: '6P水力模块',
            PINPAI: '艾默生',
            GGXH: 'XMCW-V06A-PXS-N01',
            DW: '台',
            SL: '1',
            DJ: '9700',
            JE: '9700 ',
        },
        {
            WZBM: 'SKT400009',
            SBMC: '超薄静音型室内机',
            PINPAI: '艾默生',
            GGXH: 'RFPD25ALN',
            DW: '台',
            SL: '2',
            DJ: '2385',
            JE: '4770',
        },
        {
            WZBM: 'SKT400011',
            SBMC: '超薄静音型室内机',
            PINPAI: '艾默生',
            GGXH: 'RFPD35ALN',
            DW: '台',
            SL: '1',
            DJ: '2540',
            JE: '2540',
        },
        {
            WZBM: 'SKT400012',
            SBMC: '超薄静音型室内机',
            PINPAI: '艾默生',
            GGXH: 'RFPD40ALN',
            DW: '台',
            SL: '1',
            DJ: '2615 ',
            JE: '2615 ',
        },
        {
            WZBM: 'SKT400014',
            SBMC: '超薄静音型室内机',
            PINPAI: '艾默生',
            GGXH: 'RFPD50ALN',
            DW: '台',
            SL: '1',
            DJ: '2770 ',
            JE: '2770 ',
        },
        {
            WZBM: 'SKT400005',
            SBMC: '地暖空调二合一温控器',
            PINPAI: '艾默生',
            GGXH: 'RT61（白）',
            DW: '个',
            SL: '5',
            DJ: '430',
            JE: '2150',
        },
        {
            WZBM: 'SKT400008',
            SBMC: '温控器通讯线',
            PINPAI: '艾默生',
            GGXH: '10m',
            DW: '根',
            SL: '5',
            DJ: '70',
            JE: '350',
        },
    ],
    tableData2:[
        {
            WZBM: 'AKT088',
            SBMC: '空调内机安装材料人工',
            PINPAI: '艾默生',
            GGXH: '无漏水工艺/公寓（不含打洞）',
            DW: '台',
            SL: '5',
            DJ: '4100 ',
            JE: '20500 ',
        },
        {
            WZBM: 'AKT083',
            SBMC: '主机安装材料人工费',
            PINPAI: '艾默生',
            GGXH: '6P',
            DW: '台',
            SL: '1',
            DJ: '2000',
            JE: '2000 ',
        }     
    ],
    tableData3:[
        {
            WZBM: 'F2601001',
            SBMC: 'PEXB铝塑管对接双交联',
            PINPAI: 'EFIELD',
            GGXH: '25*2.5（100米/卷）',
            DW: '米',
            SL: '30',
            DJ: '',
            JE: '',
        },
        {
            WZBM: 'F2601003',
            SBMC: 'PEXB铝塑管搭接单交联',
            PINPAI: 'EFIELD',
            GGXH: '40*4.0（直管3米/根）',
            DW: '米',
            SL: '30',
            DJ: '',
            JE: '',
        },
        {
            WZBM: 'F2601035',
            SBMC: '异径三通',
            PINPAI: 'EFIELD',
            GGXH: '40*25*40',
            DW: '个',
            SL: '10',
            DJ: '',
            JE: '',
        },
        {
            WZBM: 'F2601005',
            SBMC: '异径直通',
            PINPAI: 'EFIELD',
            GGXH: '40*25',
            DW: '个',
            SL: '5',
            DJ: '',
            JE: '',
        },
        {
            WZBM: 'F2601041',
            SBMC: '等径弯头',
            PINPAI: 'EFIELD',
            GGXH: '40*40',
            DW: '个',
            SL: '10',
            DJ: '',
            JE: '',
        },
        {
            WZBM: 'F2601047',
            SBMC: '直角弯头',
            PINPAI: 'EFIELD',
            GGXH: '25',
            DW: '个',
            SL: '10',
            DJ: '',
            JE: '',
        },
        {
            WZBM: 'F2601037',
            SBMC: '内牙活接',
            PINPAI: 'EFIELD',
            GGXH: 'SH25*3/4F',
            DW: '个',
            SL: '10',
            DJ: '',
            JE: '',
        },
        {
            WZBM: 'F0402007',
            SBMC: '保温管',
            PINPAI: '世霸龙',
            GGXH: '25*19',
            DW: '米',
            SL: '30',
            DJ: '',
            JE: '',
        },
        {
            WZBM: 'F0402028',
            SBMC: '保温管',
            PINPAI: '世霸龙',
            GGXH: '43*19',
            DW: '米',
            SL: '30',
            DJ: '',
            JE: '',
        },
        {
            WZBM: 'F0304004',
            SBMC: 'PVC-U给水管 1.6MPa',
            PINPAI: '中财',
            GGXH: 'dn25*2.0',
            DW: '米',
            SL: '25',
            DJ: '',
            JE: '',
        },
        {
            WZBM: 'F0304005',
            SBMC: 'PVC-U给水管 1.6MPa',
            PINPAI: '中财',
            GGXH: 'dn32*2.4',
            DW: '米',
            SL: '15',
            DJ: '',
            JE: '',
        },
        {
            WZBM: 'F0403029',
            SBMC: '橡塑保温管B1级(难燃)',
            PINPAI: '赢胜',
            GGXH: '25*9',
            DW: '米',
            SL: '25',
            DJ: '',
            JE: '',
        },
        {
            WZBM: 'F0403030',
            SBMC: '橡塑保温管B1级(难燃)',
            PINPAI: '赢胜',
            GGXH: '32*9',
            DW: '米',
            SL: '15',
            DJ: '',
            JE: '',
        },
        {
            WZBM: 'F0801057',
            SBMC: 'ABS双层百叶出风口',
            PINPAI: '',
            GGXH: '订制',
            DW: '个',
            SL: '5',
            DJ: '',
            JE: '',
        },
        {
            WZBM: 'F0801058',
            SBMC: 'ABS双层百叶出风口',
            PINPAI: '',
            GGXH: '订制',
            DW: '个',
            SL: '5',
            DJ: '',
            JE: '',
        },
        {
            WZBM: 'F0999024',
            SBMC: '铝塑复合板',
            PINPAI: '汉塑',
            GGXH: '1200×3000m×20mm B1级(难燃)',
            DW: '平方米',
            SL: '7.5',
            DJ: '',
            JE: '',
        },
        {
            WZBM: 'F0701001',
            SBMC: '多芯软线',
            PINPAI: '光宇',
            GGXH: 'RVVP 2*0.75mm2',
            DW: '米',
            SL: '40',
            DJ: '',
            JE: '',
        },
        {
            WZBM: 'F0304001',
            SBMC: 'PVC-U穿线管(中型)',
            PINPAI: '中财',
            GGXH: 'dn16×1.0',
            DW: '米',
            SL: '40',
            DJ: '',
            JE: '',
        },
        {
            WZBM: 'AKT050',
            SBMC: '支架、关卡',
            PINPAI: '定制',
            GGXH: '',
            DW: '套',
            SL: '5',
            DJ: '',
            JE: '',
        }                                                                                                                             
    ]    
    };
  },
  created() {},
  methods: {
    /* 报价导出 */
    quotationExport() {
      this.$refs.xTable1.exportCsv();
      this.$refs.xTable2.exportCsv();
      this.$refs.xTable3.exportCsv();
    },
    //取消时
    cancel() {
      this.$router.go(-1);
    },
    equipmentSection({ columns, data }) {
      return [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return "合计";
          }
          if (["JE"].includes(column.property)) {
            return XEUtils.sum(data, column.property);
          }
          return "-";
        })
      ];
    },

    installationSection({ columns, data }){
      return [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return "合计";
          }
          if (["JE"].includes(column.property)) {
            return XEUtils.sum(data, column.property);
          }
          return "-";
        }),
         columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return "总价";
          }
          if (["JE"].includes(column.property)) {
            return XEUtils.sum(data, column.property);
          }
          return "-";
        })
      ];
    }
  }
};
</script>