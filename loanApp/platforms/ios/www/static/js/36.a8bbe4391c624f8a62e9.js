webpackJsonp([36],{MK5R:function(e,a){},"u/XJ":function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var r=t("4YfN"),_=t.n(r),o=(t("psq8"),t("hxP8")),i=t("MMGN"),c=t("GLyw"),n=t("ciN5"),s=t("u9a8"),u=t("rulf"),d=t("rNm4"),l=t("XBEQ"),p=t("P9l9"),h=t("9rMa"),m={data:function(){return{commonValidations:u.c,messageTip:u.e,options:[],muluList:[{name:"客户情况登陆明细(共1份)",checked:"has_client_information"},{name:"买卖双方身份证(各2份)",checked:"has_both_id_card",radio:"both_id_card_des",page:"both_id_card_page",area:"both_id_card_remark"},{name:"买卖双方户口(各1份)",checked:"has_both_account",radio:"both_account_des",checkList:[],options:[{key:"both_account_home",value:"首页"},{key:"both_account_household",value:"户主页"},{key:"both_account_myself",value:"本人页"}],page:"both_account_page",area:"both_account_remark"},{name:"婚姻证明(2份)",checked:"has_marriage_proof",radio:"marriage_proof_des",options:[{key:"marriage_certificate",value:"结婚证"},{key:"divorce_certificate",value:"离婚证"},{key:"divorce_agreement",value:"离婚协议"}],checkList:[],page:"marriage_proof_page",area:"marriage_proof_remark"},{name:"抵押物房产两证(1份)",checked:"has_house_certificate",radio:"house_certificate_des",page:"house_certificate_page",area:"house_certificate_remark"},{name:"首付款收据(1份)",checked:"has_pay_receipt",radio:"pay_receipt_des",checkList:[],page:"pay_receipt_page",area:"pay_receipt_remark"},{name:"银行卡复印件(1份)",checked:"has_bank_card",radio:"bank_card_des",page:"bank_card_page",area:"bank_card_remark"},{name:"收入证明(1份)",checked:"has_salary_proof",radio:"salary_proof_des",page:"salary_proof_page",area:"salary_proof_remark"},{name:"银行流水（近6个月）",checked:"has_bank_statement",radio:"bank_statement_des",page:"bank_statement_page",area:"bank_statement_remark"}],obj:{id:null,finish_time:null,borrower_name:"",loan_amount:null,clerk_name:"",clerk_phone:"",has_client_information:"",has_both_id_card:"",both_id_card_des:"",both_id_card_page:"",both_id_card_remark:"",has_both_account:"",both_account_home:"",both_account_household:"",both_account_myself:"",both_account_des:"",both_account_page:"",both_account_remark:"",has_marriage_proof:"",marriage_certificate:"",divorce_certificate:"",divorce_agreement:"",marriage_proof_des:"",marriage_proof_page:"",marriage_proof_remark:"",has_house_certificate:"",house_certificate_des:"",house_certificate_page:"",house_certificate_remark:"",has_pay_receipt:"",pay_receipt_des:"",pay_receipt_page:"",pay_receipt_remark:"",has_bank_card:"",bank_card_des:"",bank_card_page:"",bank_card_remark:"",has_salary_proof:"",salary_proof_des:"",salary_proof_page:"",salary_proof_remark:"",has_bank_statement:"",bank_statement_des:"",bank_statement_page:"",bank_statement_remark:"",input_finish_time:null,catalogOther:[]}}},computed:_()({},Object(h.b)(["customer"])),methods:_()({goback:function(){this.$router.push({path:"/erSign"})},selected:function(e,a){this.obj[a]="finish_time"!==a?parInt(e):new Date(e).getTime()},rsinput:function(e,a){this.obj[a]=e},addMore:function(){this.mortgageCatalogOthers.push({id:null,content:null,description:null,page:null,remark:null,catalog:null})},submit:function(){var e=this,a=Object(l.c)(this.obj,!1);a.id=this.customer.id,Object(p._9)(a).then(function(a){a.result&&e.goback()})}},Object(h.c)({setCustomer:"SET_CUSTOMER"})),components:{vHeader:o.a,catalog:d.a,rsList:i.a,rsSelect:s.a,rsInput:c.a,numberInput:n.a}},b={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"jy-mulu"},[t("v-header",{attrs:{title:"资料目录表",next:"保存"},on:{goback:e.goback,submit:e.submit}}),e._v(" "),t("rs-list",[t("ul",{attrs:{slot:"body"},slot:"body"},[t("li",{staticClass:"placeholder"}),e._v(" "),t("li",[t("rs-select",{attrs:{selectText:"完成时间",model:"finish_time",isDate:!0},on:{selected:e.selected}})],1),e._v(" "),t("li",{staticClass:"placeholder"}),e._v(" "),t("li",[t("rs-input",{attrs:{inputText:"贷款人姓名",model:"borrower_name",required:""},on:{input:e.rsinput}})],1),e._v(" "),t("li",[t("number-input",{attrs:{inputText:"贷款金额",model:"loan_amount",required:""},on:{input:e.rsinput}})],1),e._v(" "),t("li",[t("rs-input",{attrs:{inputText:"接单人姓名",model:"clerk_name",required:""},on:{input:e.rsinput}})],1),e._v(" "),t("li",[t("rs-input",{attrs:{inputText:"接单人电话",model:"clerk_phone",required:"",validation:e.commonValidations.phoneValidation,message:e.messageTip.phoneValidation},on:{input:e.rsinput}})],1),e._v(" "),t("li",[t("catalog",{attrs:{list:e.muluList,obj:e.obj}})],1)])])],1)},staticRenderFns:[]};var k=t("C7Lr")(m,b,!1,function(e){t("MK5R")},"data-v-41bbbaee",null);a.default=k.exports}});
//# sourceMappingURL=36.a8bbe4391c624f8a62e9.js.map