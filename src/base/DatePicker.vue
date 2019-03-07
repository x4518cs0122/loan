<template>
  <cube-button @click="showDatePicker(modelKey)" class="date-picker-btn">{{ currentShowTime || initTxt }}></cube-button>
</template>
<script>
export default {
  props: {
    modelKey: {
      type: String,
      default: ''
    },
    model: {},
    initTxt:{
      type:String,
      default:''
    }
  },
  data() {
    return {
      currentShowTime: ''
    };
  },
  methods: {
    showDatePicker(type) {
      if (!this.datePicker) {
        this.datePicker = this.$createDatePicker({
          title: '请选择时间',
          min: new Date(2008, 7, 8),
          max: new Date(2020, 9, 20),
          value: new Date(),
          onSelect: this.dateSelectHandler
        });
      }

      this.datePicker.show();
    },
    dateSelectHandler(date, selectedVal, selectedText) {
      this.currentShowTime = selectedText.join('-');

      this.model[this.modelKey] = new Date(date).getTime();
    }
  }
};
</script>
