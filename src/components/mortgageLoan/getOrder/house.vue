<template>
  <ul class="page-add-house">
    <li v-for="(house, index) in houses" :key="index" class="item">
      <div class="header">
        <span class="title">房产{{index+1}}总价:{{total(house)}}</span>
        <i
          class="fa fa-trash deleteHouseInfo"
          aria-hidden="true"
          @click="deleteHouseInfo(index)"
          v-show="index > 0"
        ></i>
      </div>
      <div class="input-wrapper">
        <div class="input-item">
          <span class="text">面积：</span>
          <cube-input v-model="house.area" class="house-input" placeholder="请输入房产面积"></cube-input>
        </div>
        <div class="input-item">
          <span class="text-4">询价结果：</span>
          <cube-input v-model="house.enquiryResult" class="house-input" placeholder="请输入询价结果"></cube-input>
        </div>
      </div>
    </li>
    <li class="add-more" @click="addMore">
      <i class="fa fa-plus-square-o" aria-hidden="true"></i>添加房产信息
    </li>
  </ul>
</template>
<script>
import * as _ from 'lodash';
export default {
  props: {
    houses: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      area: '',
      enquiryResult: ''
    };
  },
  created() {
    this.template = { area: '', enquiryResult: '' };
  },
  methods: {
    total(house) {
      const areaError = _.isNaN(parseFloat(house.area));
      const enquiryResultError = _.isNaN(parseFloat(house.enquiryResult));
      if (areaError || enquiryResultError) {
        house.totalPrice = '';
        return '';
      }
      house.totalPrice = parseFloat(house.area) * parseFloat(house.enquiryResult);
      return house.totalPrice;
    },
    addMore() {
      this.houses.push(this.template);
    },
    deleteHouseInfo(index) {
      this.$createDialog({
        type: 'confirm',
        icon: 'cubeic-important',
        title: '确定删除该房产信息吗？',
        content: `面积:${this.houses[index].area}平米,询价结果:${this.houses[index].enquiryResult}元/平米`,
        confirmBtn: {
          text: '删除',
          active: true,
          disabled: false,
          href: 'javascript:;'
        },
        cancelBtn: {
          text: '取消',
          active: false,
          disabled: false,
          href: 'javascript:;'
        },
        onConfirm: () => {
          this.deleteConfirm(index);
        }
      }).show();
    },
    deleteConfirm(index) {
      this.houses.splice(index, 1);
    }
  }
};
</script>
<style lang="stylus" scope>
.page-add-house {
  .item {
    margin-top: 20px;
    border-bottom: 1px solid #ccc;

    .header {
      display: flex;

      .title {
        color: #000;
        font-size: 14px;
        font-weight: 500;
        flex-shrink: 1;
        flex-grow: 1;
      }

      .deleteHouseInfo {
        width: 20px;
        color: #ff0200;
      }
    }

    .input-wrapper {
      display: flex;
      margin: 10px 0;

      .input-item {
        flex-shrink: 1;
        flex-grow: 1;
        font-size: 12px;
        display: flex;
        margin-right: 10px;

        .text {
          min-width: 40px;
        }

        .text-4 {
          min-width: 60px;
        }

        .cube-input {
          flex-shrink: 1;
          flex-grow: 1;

          input {
            padding: 0;
            border: 1px solid #cccccc;
            border-radius: 5px;

            &::-webkit-input-placeholder {
              /* placeholder颜色 */
              color: #aab2bd;
              /* placeholder字体大小 */
              font-size: 12px;
            }
          }
        }
      }
    }
  }

  .add-more {
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
}
</style>
