<template>
    <transition name="fade">
        <div class="order">
            <v-header title="抵押接单" @goback="goback" next="提交" @submit="submit"></v-header>
            <rs-list>
                <ul slot="body">
                    <li class="placeholder"> </li>
                    <li><rs-select selectText="完成时间" model="datetime" @selected="selected" :isDate="true"></rs-select></li>
                    <li class="placeholder"></li>
                    <li><rs-input @input="rsinput" inputText="客户姓名" model="clientName" required></rs-input></li>
                    <li><rs-input @input="rsinput" inputText="联系方式" model="clientPhone" required :validation="commonValidations.phoneValidation" type="number" message="手机号格式不正确"></rs-input></li>
                    <li><rs-select selectText="证件类型" model="clientIdType" :options="options.cardType" @selected="selected"></rs-select></li>
                    <li><rs-input @input="rsinput" 
                        inputText="证件号码" 
                        model="clientIdNumber"
                        :validation="commonValidations.idCardValidation"
                        message="身份证格式不正确"
                        required
                        ></rs-input>
                    </li>
                    <li><rs-select selectText="工作类型" model="clientWorkType" @selected="selected" valueType="6"></rs-select></li>                
                    <li><rs-input @input="rsinput" inputText="工作单位" model="clientWorkUnit" required></rs-input></li>
                    <li><rs-select selectText="借款品种" model="loanVariety" @selected="selected" valueType="7"></rs-select></li>                  
                    <li class="no-border"><rs-input @input="rsinput" inputText="贷款金额" model="loanAmount" required :validation="commonValidations.numberValidation" message="请输入数字"></rs-input></li>
                    <li class="no-border"><rs-input @input="rsinput" inputText="贷款期限" model="loanPeriod" required :validation="commonValidations.numberValidation" message="请输入数字"></rs-input></li>
                    <li class="placeholder"></li>
                    <li v-for="house in obj.houses" :key="house.id">
                        <rs-select selectText="房产信息"  @clicked="houseClick(house)" ></rs-select>
                    </li>
                    <li class="addHouses" @click="showEstate">
                        <p><i class="fa fa-plus-square-o" aria-hidden="true"></i>添加房产信息</p>
                    </li>
                    <rs-select selectText="单子来源" :options="options.orderFrom" @selected="selected" model="checklistSource" valueType="5"></rs-select>
                    <li><rs-input @input="rsinput" inputText="中介名称" model="agentName"></rs-input></li>
                    <li><rs-input @input="rsinput" inputText="备注事项" model="remark"></rs-input></li>
                </ul>
            </rs-list>
            <estate ref="estate" @submit="addEstate" :house="house" ></estate>
        </div>
    </transition>
</template>
<script>
import vHeader from 'components/header/header';
import rsList from 'base/rslist/rslist';
import rsInput from 'base/rsinput/rsinput';
import rsSelect from 'base/rsselect/rsselect';
import estate from 'base/estate/estate';
import {commonValidations} from '@/utils/Const.js'
import {postOrder, getChecklistID} from 'api/api';
export default {
  data() {
    return {
      options: {
        cardType: [{id: 1, value: '身份证'}]
      },
      commonValidations:commonValidations,
      house: {},
      obj: {
        checklistId: null,
        datetime: '',
        clientName: '',
        clientPhone: '',
        clientIdType: '',
        clientIdNumber: '',
        clientWorkType: 0,
        clientWorkUnit: '',
        loanVariety: 0,
        loanAmount: '',
        loanPeriod: '',
        checklistSource: 0,
        agentName: '',
        remark: '',
        houses: [],
      },
    };
  },
  methods: {
    selected(id, model) {
      if (model === 'datetime') {
        this.obj[model] = new Date(id).getTime();
        return;
      }
      this.obj[model] = parseInt(id);
    },
    goback() {
      this.$router.back();
    },
    rsinput(value, model) {
      this.obj[model] = value;
    },
    houseClick(house) {
      this.house = house;
      this.$refs.estate.show();
    },
    showEstate() {
      this.house = {};
      this.$refs.estate.show();
    },
    addEstate(estateInfo) {
      this.obj.houses.push(estateInfo);
    },
    submit() {
      // if(!this.isValidate()){
      //     return
      // }
      getChecklistID().then(res => {
        this.obj.checklistId = res.data.id;
        this.obj.clientIdType = '身份证';
        postOrder(this.obj).then(res => {
          this.$router.push({name: 'bussiness'});
        });
      });
    },
  },
  components: {
    vHeader,
    rsList,
    rsInput,
    rsSelect,
    estate,
  },
};
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable';

.order {
    &.fade-enter-active, &.fade-leave-active {
        transition: all 0.3s;
    }

    &.fade-enter, &.fade-leave-to {
        transform: translate3d(100%, 0, 0);
    }

    .addHouses {
        text-align: center;
        height: 30px;
        line-height: 30px;
    }
}
</style>


