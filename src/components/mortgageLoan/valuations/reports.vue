<template>
    <div class="reports">
        <v-header title="测评报告管理" @goback="goback" @submit="submit" next="提交"></v-header>
        <rs-list>
            <ul slot="body">
                <li><rs-text label="房产编号" :value="customer.id"></rs-text></li>
                <li><rs-select selectText="完成时间" model="time" @selected="selected" :isDate="true"></rs-select></li>
                <li><rs-select selectText="报告类型" :options="options.reportType" model="type" @selected="selected"></rs-select></li>
            </ul>
            <div slot="footer">
              <div v-for="(eachHouseReports, index) in reports" :key="index">        
                <!-- 表单显示 -->
                <div class="report-wrapper" v-for="(item, number) in eachHouseReports" :key="number">
                    <!-- 如果存在id值 则表示该报告已经填写 -->
                    <div class="report-content" v-if="item.houseId">
                        <h2 class="title">房产{{index+1}}报告</h2>
                    </div>
                    <!-- 报告footer操作区 -->
                    <div class="report-footer">
                        <div class="delete" @click="deleteReport(number, eachHouseReports)" v-show="number > 0">
                            <i class="el-icon-delete icon"></i>
                            <span>删除</span>
                        </div>
                        <div class="delete" @click="addReport(item.houseId, eachHouseReports)" v-show="number === 0">
                            <i class="fa fa-plus" aria-hidden="true"></i>
                            <span>新建报告</span>
                        </div> 
                        <div class="edit" @click="editReport(item)">
                            <i class="el-icon-edit-outline icon"></i>
                            <span>编辑</span>
                        </div>  
                    </div>
                </div>
                <!-- <div class="button">
                    <el-button type="danger" class="add-report" @click="addReports">添加报告</el-button>
                </div> -->
              </div>   
            </div>
        </rs-list>
       
        <top-tip ref="topTip">
            <div class="tip-title">
                <i class="fa fa-ban icon"></i>
                <span class="text">{{errorMessage}}</span>
            </div>
            
        </top-tip>
        <unreported :obj="reportObj" ref="unreported"></unreported>
    </div>
</template>

<script>
import vHeader from 'components/header/header';
import unreported from './unreported';
import rsList from 'base/rslist/rslist';
import rsText from 'base/rstext/rstext';
import rsSelect from 'base/rsselect/rsselect';
import {mapGetters} from 'vuex';
import {postReports, getOrderInfo} from 'api/api';
import topTip from 'base/top-tip/top-tip';
export default {
  data() {
    return {
      options: {
        reportType: [{id: '1', value: '预评'}, {id: '2', value: '正评'}],
      },
      reportObj: {},
      obj: {
        time: '',
        type: '',
      },
      reports: [],
      errorMessage: ''
    };
  },
  created() {
    this.reportDemo = {
      id: null,
      orderId: null,
      reportType: null,
      reportObligee: null,
      reportBorrower: null,
      reportRepose: null,
      reportHouseAge: null,
      reportHouseArea: null,
      reportHouseSingle: null,
      reportHouseTotal: null,
      reportLoanAmount: null,
      reportLoanYear: null,
      reportFirst: null,
      houseId: null,
      time: null,
      type: null,
    };
    this.getHousesNumber();
  },
  methods: {
    goback() {
      this.$router.back();
    },
    selected(id, model) {
      if (model === 'time') {
        this.obj[model] = new Date(id).getTime();
        return;
      }
      this.obj[model] = parseInt(id);
    },
    getHousesNumber() {
      const orderId = this.customer.rootId + 1;
      getOrderInfo(orderId).then(res => {
        this.reports = res.data.houses.map(item => {
          let temp = Object.assign(
            {...this.reportDemo},
            {
              reportHouseArea: parseFloat(item.area),
              reportHouseSingle: parseFloat(item.enquiryResult),
              reportHouseTotal: parseFloat(item.totalPrice),
              reportLoanAmount: parseFloat(res.data.loanAmount) || '',
              houseId: parseInt(item.id),
              reportBorrower: res.data.clientName || '',
              orderId: this.customer.id,
            }
          );
          return [temp];
        });
      });
    },
    addReport(houseId, houseArr) {
      if (houseArr.length > 1) {
        this.errorMessage = '每个房产最多添加2份报告';
        this.$refs.topTip.show();
        return;
      }
      let tempObj = Object.assign(
        {...this.reportDemo},
        {
          houseId: houseId,
          orderId: this.customer.id,
        }
      );
      houseArr.push(tempObj);
    },
    editReport(item) {
      this.reportObj = item;
      this.$refs.unreported.show();
    },
    deleteReport(index, houseArr) {
      houseArr.splice(index, 1);
    },
    /**正评 每个房屋只能有一份报告。 */
    checkDataValite() {
      let isError = false;
      if (this.obj.type === 2) {
        isError = this.reports.some(report => {
          return report.length > 1;
        });
        this.errorMessage = '每个房子只能有一份正评';
      }
      return isError;
    },
    submit() {
      if (this.checkDataValite()) {
        this.$refs.topTip.show();
        return;
      }
      this.reports.forEach(report => {
        report.forEach(item => {
          item.reportType = this.obj.type;
          item.type = this.obj.type;
          item.time = this.obj.time;
        });
      });
      let data = {
        time: this.obj.time,
        type: this.obj.type,
        orderId: this.customer.id,
        report: JSON.stringify(this.reports),
      };
      //  console.log(data)
      postReports(this.customer.id, data).then(res => {
        if (res.result) {
          this.$router.push({path: '/evaluate'});
        }
      });
    },
  },
  computed: {
    ...mapGetters(['customer']),
  },
  components: {
    vHeader,
    unreported,
    rsList,
    rsText,
    rsSelect,
    topTip,
  },
};
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.reports {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: $color-background;
    overflow: auto;

    .report-wrapper {
        width: 100%;
        height: 100px;
        background: $color-white;
        margin: 10px 0;

        .report-content {
            box-sizing: border-box;
            width: 100%;
            height: 70px;
            border-bottom: 1px solid $color-border;
            padding: 15px;

            .title {
                font-weight: 700;
            }

            .text {
                width: 100%;
                margin-top: 10px;
                font-size: $font-size-medium;

                .text-right {
                    float: right;
                }
            }
        }

        .report-footer {
            line-height: 30px;
            height: 30px;

            .icon {
                font-size: $font-size-large;
            }

            .edit, .delete {
                float: right;
                font-size: $font-size-medium;
                margin-right: 10px;
                extend-click();
            }
        }
    }

    .tip-title {
        text-align: center;
        padding: 18px 0;
        font-size: 0;

        .icon {
            font-size: $font-size-medium;
            color: $bello-active;
            margin-right: 4px;
        }

        .text {
            font-size: $font-size-medium;
            color: $pure-white;
        }
    }
}
</style>
