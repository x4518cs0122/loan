webpackJsonp([52],{a9hw:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("4YfN"),a=s.n(i),n=s("hxP8"),r=s("MMGN"),o=s("P9rx"),c=s("u9a8"),u=s("9rMa"),l=s("P9l9"),d={data:function(){return{obj:{time:null}}},methods:{goback:function(){this.$router.back()},selected:function(t,e){this.obj[e]=new Date(t).getTime()},submit:function(){var t=this;this.obj.time&&Object(l.c)(this.customer.id,this.obj.time).then(function(e){e.result&&t.goback()})}},computed:a()({},Object(u.b)(["customer"])),components:{rsList:r.a,rsText:o.a,rsSelect:c.a,vHeader:n.a}},b={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"fangkuan"},[e("v-header",{attrs:{title:"确定收费状态",next:"提交"},on:{goback:this.goback,submit:this.submit}}),this._v(" "),e("rs-list",[e("ul",{attrs:{slot:"body"},slot:"body"},[e("li",[e("rs-text",{attrs:{label:"贷款编号",value:this.customer.id}})],1),this._v(" "),e("li",[e("rs-select",{attrs:{selectText:"完成收费时间",model:"time",isDate:!0},on:{selected:this.selected}})],1)])])],1)},staticRenderFns:[]};var h=s("C7Lr")(d,b,!1,function(t){s("fWVd")},"data-v-197b5939",null);e.default=h.exports},fWVd:function(t,e){}});
//# sourceMappingURL=52.7fa425e7611ca5ba8975.js.map