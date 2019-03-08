<template>
  <div class="catalog">
    <ul>
      <li class="title item-wrapper">
        <span class="name">项目</span>
        <span class="state">状态</span>
        <span class="detail">明细</span>
      </li>
      <li v-for="(item, index) in list" :key="index" class="item-wrapper">
        <span class="name">{{item.name}}</span>
        <span class="state">
          <cube-checkbox v-model="obj[item.checked]" :option="false"></cube-checkbox>
        </span>
        <span
          @click="showDetail(item)"
          class="detail"
          v-html="item.checked !== 'hasClientInformation'&&item.checked !== 'has_client_information'? '查看明细':''"
        >
          &nbsp;
          <i class="fa fa-angle-right" aria-hidden="true"></i>
        </span>
      </li>
    </ul>
    <transition name="fade">
      <div class="detail-wrapper" v-show="detailShow">
        <v-header
          :title="currentItem.name"
          @goback="detailShow = false"
          next="保存"
          @submit="detailChange"
        ></v-header>
        <rsList>
          <ul slot="body">
            <li class="checkbox">
              <div class="text">说明：</div>
              <div class="check">
                <cube-radio-group
                  v-model="obj[currentItem.radio]"
                  :options="options2"
                  :hollow-style="true"
                />
                <div class="multi" v-for="(mutilcheck, index) in currentItem.options" :key="index">
                  <cube-checkbox
                    v-model="obj[mutilcheck.key]"
                    :option="false"
                    class="with-padding-reset"
                  >{{getOption(mutilcheck)}}</cube-checkbox>
                </div>
              </div>
            </li>
            <li v-for="inputItem in currentItem.moreInput" :key="inputItem.model">
              <rs-input
                @input="rsinput"
                :inputText="inputItem.label"
                :model="inputItem.model"
                :value="obj[inputItem.model]"
                :placeholder="inputItem.placeholder"
              ></rs-input>
            </li>
            <li>
              <rs-input
                @input="rsinput"
                inputText="页码"
                :model="currentItem.page"
                :value="obj[currentItem.page]"
              ></rs-input>
            </li>
            <li>
              <rs-input
                @input="rsinput"
                inputText="备注"
                :model="currentItem.area"
                :value="obj[currentItem.area]"
              ></rs-input>
            </li>
          </ul>
        </rsList>
      </div>
    </transition>
  </div>
</template>

<script type='text/ecmascript-6'>
import vHeader from 'components/header/header';
import rsList from 'base/rslist/rslist';
import rsInput from 'base/rsinput/rsinput';
import * as _ from 'lodash';
export default {
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      }
    },
    obj: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      currentItem: {},
      detailShow: false,
      options2: [
        {
          label: '原件',
          value: false
        },
        {
          label: '复印件',
          value: true
        }
      ]
    };
  },
  components: { rsList, rsInput, vHeader },
  methods: {
    showDetail(item) {
      this.currentItem = item;
      this.detailShow = true;
    },
    rsinput(value, model) {
      this.obj[model] = value;
    },
    detailChange() {
      if (this.obj[this.currentItem.radio] === null) {
        this.message = '不能为空';
        return;
      }
      this.detailShow = false;
    },
    getOption(multicheck) {
      if (_.isEmpty(multicheck)) {
        return '';
      }
      return _.get(multicheck, 'value', '');
    }
  }
};
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable';

.catalog {
  padding: 20px;
  border: 1px solid $color-border;
  background: #fff;

  .title {
    background: $color-catalog-header;
  }

  .item-wrapper {
    display: flex;
    width: 100%;
    height: 30px;
    align-items: center;
    border-bottom: 1px solid $color-border;

    span {
      display: inline-block;
      text-align: center;
      box-sizing: border-box;
      font-size: $font-size-small;

      &.name {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      &.detail {
        flex: 0 0 100px;
      }

      &.state {
        flex: 0 0 60px;
      }
    }
  }

  .detail-wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: auto;
    z-index: 9;
    background: $pure-white;

    .checkbox {
      padding: 15px 20px 15px 0;
      margin-left: 20px;
      display: flex;
      background: $color-white;
      font-size: $font-size-medium;

      .text {
        width: 60px;
        display flex;
        align-items center;
        flex-shrink:0;
        flex-grow:0;
      }

      .check {
        flex: 1;
      }
    }

    .multi {
      line-height: 18px;
      margin-top: 5px;
      padding-top: 5px;

      .check-value {
        padding-left: 10px;
      }

      
    }
    .with-padding-reset {
      label {
        padding-top: 0
      }
    }
  }
}
</style>