webpackJsonp([45],{LaZ9:function(t,e){},Wl8L:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("4YfN"),s=i.n(a),r=i("Fxai"),n=i("P9l9"),u=i("hxP8"),o=i("9rMa"),c=["transferState","receiptState"],h={data:function(){return{list:[],detail:!1}},created:function(){this._getGuohuList()},methods:s()({_getGuohuList:function(){var t=this;Object(n.t)().then(function(e){e.result&&(e.data.forEach(function(t){var e=t.extra,i=c.find(function(t){return!e[t].done});t.currentState=e[i].message}),t.list=e.data)})},goback:function(){this.$router.push({path:"/bussiness"})},itemHandle:function(t){this.list[t].id;var e=this.list[t];switch(this.setCustomer(e),e.currentState){case"待确定回证时间":this.$router.push({path:"/erGuohu/huizheng"});break;case"待确定过户状态":this.$router.push({path:"/erGuohu/confirmState"});break;default:this.goback()}}},Object(o.c)({setCustomer:"SET_CUSTOMER"})),components:{detailList:r.a,vHeader:u.a},watch:{$route:function(t,e){/^\/erGuohu\/.+$/.test(e.path)&&this._getGuohuList()}}},l={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"interview"},[e("v-header",{attrs:{title:"二手房过户列表",back:"主页"},on:{goback:this.goback}}),this._v(" "),e("detail-list",{attrs:{list:this.list},on:{itemHandle:this.itemHandle}}),this._v(" "),e("router-view")],1)},staticRenderFns:[]};var d=i("C7Lr")(h,l,!1,function(t){i("LaZ9")},"data-v-314af3d0",null);e.default=d.exports}});
//# sourceMappingURL=45.294dc390347f5c0d19d4.js.map