webpackJsonp([39],{f8Or:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("4YfN"),i=a.n(s),n=a("P9l9"),r=a("hxP8"),o=a("Fxai"),c=a("9rMa"),h={data:function(){return{list:[]}},created:function(){this._getCharge()},methods:i()({_getCharge:function(){var t=this;Object(n.o)().then(function(e){e.result&&(t.list=e.data)})},goback:function(){this.$router.push({path:"/bussiness"})},itemHandle:function(t){var e=this.list[t];this.setCustomer(e),this.$router.push({path:"/charge/chargeState"})}},Object(c.c)({setCustomer:"SET_CUSTOMER"})),components:{detailList:o.a,vHeader:r.a},watch:{$route:function(t,e){/^\/charge\/.+$/.test(e.path)&&this._getCharge()}}},u={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"getmoney"},[e("v-header",{attrs:{title:"抵押收费列表",back:"主页"},on:{goback:this.goback}}),this._v(" "),e("detail-list",{attrs:{list:this.list,state:"待确定收费状态"},on:{itemHandle:this.itemHandle}}),this._v(" "),e("router-view")],1)},staticRenderFns:[]};var l=a("C7Lr")(h,u,!1,function(t){a("oewf")},"data-v-3b9a18d0",null);e.default=l.exports},oewf:function(t,e){}});
//# sourceMappingURL=39.42c1e78fa55ed55b308a.js.map