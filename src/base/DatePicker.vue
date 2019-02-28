<template>
  <cube-button @click="showDatePicker(modelKey)">{{ model.applicationTimeTxt }}></cube-button>
</template>
<script>
export default {
  props: {
    modelKey: {
      type: String,
      default: ''
    },
    model: {}
  },
  data() {
    return {
      currentType: ''
    };
  },
  methods: {
    showDatePicker(type) {
      this.currentType = type;
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
      const type = `${this.currentType}Txt`;
      this.model[type] = selectedText.join('-');

      this.model[this.currentType] = new Date(date).getTime();
    }
  }
};
</script>
