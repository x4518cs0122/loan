import axios from 'common/js/axios';
import store from '../store';
import qs from 'qs';
import {
  getUrl
} from '../utils/commonFunction.js';

import normalAxios from 'axios';

//通知api
export function getNotice() {
  const url = '/notice';
  return axios.get(url);
}
//tab选项：待办
export function getTodo() {
  const url = '/todos';
  return axios.get(url);
}
//接单api接口
export function getChecklistID() {
  const url = '/mortgage';
  const id = store.getters.user.id;
  let data = {
    employeeId: id
  };
  return axios.post(url, data);
}

export function postOrder(checkList) {
  const url = `/mortgage/checklist/${checkList.checklistId}`;
  checkList.houses = JSON.stringify(checkList.houses);
  return axios.post(url, checkList);
}

export function postHouseInfo() {
  const url = `/mortgage/checklist/${checklistId}/house`;
  return axios.post();
}

export function getOrderInfo(checklistId) {
  const url = `/mortgage/checklist/${checklistId}`;
  return axios.get(url);
}
//面谈api接口
export function getInterview(page) {
  const employeeId = store.getters.user.id;
  const url = `/mortgage/view/employee/${employeeId}/?state=open&page=${page}`;
  return axios.get(url);
}

export function postAdvice(advice) {
  const url = `/mortgage/view/${advice.viewId}`;
  return axios.post(url, advice);
}

export function suspendOrder(time, taskId) {
  const id = store.getters.userId;
  const url = 'view/suspend';
  let data = {};
  data.time = time;
  data.taskId = taskId;
  data.employeeId = id;
  return axios.post(url, data);
}

//面签api接口
export function getSignList() {
  const id = store.getters.user.id;
  const url = `/mortgage/visa/employee/${id}/?state=open`;
  return axios.get(url);
}

export function postCatalog(catalog) {
  const url = '/mortgage/visa/catalog';
  const data = {
    catalog: JSON.stringify(catalog)
  };
  return axios.post(url, data);
}
export function postForm(form, taskId) {
  let data = {};
  data.form = JSON.stringify(form);
  const url = '/mortgage/visa/form';
  return axios.post(url, data);
}

export function postVisa(data) {
  const url = '/mortgage/visa/confirm';
  return axios.post(url, data);
}

export function getCatalog(catalogId) {
  const url = `/mortgage/visa/${catalogId}`;
  return axios.get(url);
}

//评估下单
export function getEvaluate() {
  const id = store.getters.user.id;
  const url = `/mortgage/order/employee/${id}/?state=open`;
  return axios.get(url);
}

export function getHousesNumber(orderId) {
  const url = `/mortgage/order/house/${orderId}`;
  return axios.get(url);
}

export function postEvaluateOrder(data) {
  const url = '/mortgage/order/confirm';
  return axios.post(url, data);
}

export function postReports(orderId, data) {
  const url = `/mortgage/order/report/${orderId}`;
  return axios.post(url, data);
}
export function getCurrentState(approveId) {
  const url = `/mortgage/approve/${approveId}`;
  return axios.get(url);
}

//审批
export function getApprove() {
  const id = store.getters.user.id;
  const url = `/mortgage/approve/employee/${id}/?state=open`;
  return axios.get(url);
}

export function confirmCatalog(data) {
  const url = '/mortgage/approve/confirmCatalog';
  return axios.post(url, data);
}

export function baoshen(time, id) {
  let data = {
    time: time,
    approveId: id
  };
  const url = `/mortgage/approve/complete/${id}`;
  return axios.post(url, data);
}

export function changeState(id, approve) {
  const url = `/mortgage/approve/${id}`;
  let data = {
    approve: JSON.stringify(approve),
    approceId: id
  };
  return axios.post(url, data);
}

export function skipZhengping(id) {
  const url = `/mortgage/approve/skip/${id}`;
  return axios.post(url, {
    approveId: id
  });
}

/**有bug */
export function getReports(id) {
  const url = `/mortgage/approve/getReport/?loanId=${id}`;
  return axios.get(url);
}

export function formalReport(approveId, time, report) {
  const url = '/mortgage/approve/formalReport';
  let data = {
    approveId,
    time,
    report
  };
  return axios.post(url, data);
}

// 抵押

export function getMortgage() {
  const id = store.getters.user.id;
  const url = `/mortgage/mortgage/employee/${id}/?state=open`;
  return axios.get(url);
}

export function changeMortgageState(mortgageId, time) {
  const url = `/mortgage/mortgage/${mortgageId}`;
  let data = {
    mortgageId,
    time,
    isNeedGuarantee: 2
  };
  return axios.post(url, data);
}

export function passMortgage(mortgageId) {
  const url = `/mortgage/mortgage/${mortgageId}/pass`;
  let data = {
    mortgageId
  };
  return axios.post(url, data);
}
/**放款api */

export function getMoney() {
  const employeeId = store.getters.user.id;
  const url = `/mortgage/loan/employee/${employeeId}/?state=open`;
  return axios.get(url);
}

export function changeMoneyState(loanId, time) {
  const url = `/mortgage/loan/${loanId}`;
  let data = {
    loanId,
    time
  };
  return axios.post(url, data);
}

/** 收费api */

export function getCharge() {
  const id = store.getters.user.id;
  const url = `/mortgage/charge/employee/${id}/?state=open`;
  return axios.get(url);
}

export function changeChargeState(chargeId, obj) {
  const url = `/mortgage/charge/${chargeId}`;
  let data = {
    chargeId,
    ...obj
  };
  return axios.post(url, data);
}

export function getGuohu() {
  const url = '/getGuohu';
  return axios.get(url);
}

/** 二手房接口 */

/**启动新的二手房流程 */
export function startHouse() {
  const employeeId = store.getters.user.id;
  const url = `/house`;
  return axios.post(url, {
    employeeId
  });
}

/**二手房接单接口 */
export function postSecondOrder(id, data) {
  const url = `/house/checklist/${id}`;
  return axios.post(url, {
    employeeId: id,
    checklist: JSON.stringify(data)
  });
}

export function getSecondOrderInfo(visaId) {
  const url = `/house/visa/${visaId}`
  return axios.get(url)
}

export function updateSecondOrderInfo(checklistId, data) {
  const url = `/house/checklist/update/${checklistId}`
  return axios.post(url, {
    checklistId,
    checklist: JSON.stringify(data)
  })
}

/**二手房面签接口 */
export function getSecondSignList() {
  const employeeId = store.getters.user.id;
  const url = `/house/visa/employee/${employeeId}/?state=open`;
  return axios.get(url);
}

export function postSHCatalog(data) {
  const url = `/house/visa/catalog`;
  return axios.post(url, {
    catalog: JSON.stringify(data)
  });
}

export function postSHVisa(visaId, time, address) {
  const url = `/house/visa/confirm`;
  return axios.post(url, {
    visaId,
    time,
    address
  });
}

/**二手房评估下单 */
export function getSecondHandValuation() {
  const employeeId = store.getters.user.id;
  const url = `/house/order/employee/${employeeId}/?state=open`;
  return axios.get(url);
}

export function confirmEvaluate(orderId, time, company) {
  const url = `/house/order/confirm`;
  return axios.post(url, {
    orderId,
    time,
    company
  });
}

export function postReport(id, data) {
  const url = `/house/order/report/${id}`;
  return axios.post(url, data);
}

/**整件输机 */

export function getSJList() {
  const employeeId = store.getters.user.id;
  const url = `/house/input/employee/${employeeId}/?state=open`;
  return axios.get(url);
}

export function postCheck(orderId, houseTime, creditTime) {
  const url = '/house/input/check';
  return axios.post(url, {
    orderId,
    houseTime,
    creditTime
  });
}

export function getSHUJICatalog(orderId) {
  const url = `/house/input/${orderId}`;
  return axios.get(url);
}

export function postShujiCatalog(inputId, catalog) {
  const url = '/house/input/catalog';
  return axios.post(url, {
    inputId,
    catalog
  });
}

export function postInputState(orderId, time) {
  const url = `/house/input/input`;
  return axios.post(url, {
    orderId,
    time: parseInt(time)
  });
}

/**二手房审批api */
export function getApproveList() {
  const employeeId = store.getters.user.id;
  const url = `/house/approve/employee/${employeeId}/?state=open`;
  return axios.get(url);
}

export function postApproveBaoshen(approveId, time) {
  const url = `/house/approve/complete/${approveId}`;
  return axios.post(url, {
    approveId,
    time: parseInt(time)
  });
}

export function postApproveState(approveId, approve) {
  const url = `/house/approve/${approveId}`;
  return axios.post(url, {
    approveId,
    approve: JSON.stringify(approve)
  });
}

export function postFile(data) {
  const url = '/file/extra'
  return axios.post(url, data, {
    /** 序列化会影响文件的传递 */
    transformRequest:(data) =>{
      return data
    }
  })
}

/**二手房过户api */
export function getGuohuList() {
  const employeeId = store.getters.user.id;
  const url = `/house/transfer/employee/${employeeId}/?state=open`;
  return axios.get(url);
}

export function postGuohuInfo(transferId, time) {
  const url = `/house/transfer/${transferId}`;
  return axios.post(url, {
    transferId,
    time: parseInt(time)
  });
}

export function postGuohuState(transferId, time) {
  const url = `/house/transfer/receipt/${transferId}`;
  return axios.post(url, {
    transferId,
    time: parseInt(time)
  });
}

/**二手房抵押列表 */
export function getMortgageList() {
  const employeeId = store.getters.user.id;
  const url = `/house/mortgage/employee/${employeeId}/?state=open`;
  return axios.get(url);
}

export function postMortgageInfo(mortgageId, time) {
  const url = `/house/mortgage/${mortgageId}`;
  return axios.post(url, {
    mortgageId,
    time: parseInt(time)
  });
}

export function postMortgageTake(mortgageId, time) {
  const url = `/house/mortgage/take/${mortgageId}`;
  return axios.post(url, {
    mortgageId,
    time: parseInt(time)
  });
}

export function postMortgageReturn(mortgageId, time) {
  const url = `/house/mortgage/return/${mortgageId}`;
  return axios.post(url, {
    mortgageId,
    time: parseInt(time)
  });
}

/**二手房担保列表 */
export function getGuaranteeList() {
  const employeeId = store.getters.user.id;
  const url = `/house/guarantee/employee/${employeeId}/?state=open`;
  return axios.get(url);
}

export function postGuaranteeProcess(guaranteeId, data) {
  const url = `/house/guarantee/${guaranteeId}`;
  return axios.post(url, {
    ...data
  });
}

export function postSkipZhengping(guaranteeId) {
  const url = `/house/guarantee/skip/${guaranteeId}`;
  return axios.post(url, {
    guaranteeId
  });
}

export function postZhengping(guaranteeId, data) {
  const url = `/house/guarantee/report/${guaranteeId}`;
  return axios.post(url, data);
}

/**二手房放款 */
export function getMoneyList() {
  const employeeId = store.getters.user.id;
  const url = `/house/loan/employee/${employeeId}/?state=open`;
  return axios.get(url);
}

export function postMoneyState(loanId, data) {
  const url = `/house/loan/${loanId}`;
  return axios.post(url, {
    ...data
  });
}

/**二手房收费api */
export function chargeList() {
  const employeeId = store.getters.user.id;
  const url = `/house/charge/employee/${employeeId}/?state=open`;
  return axios.get(url);
}

export function postChargeDetail(chargeId, data) {
  const url = `house/charge/state/${chargeId}`;
  return axios.post(url, data);
}

export function allFinish(chargeId) {
  const url = `/house/charge/${chargeId}`;
  return axios.post(url, {
    chargeId
  });
}

/**其他api */
export function login(data) {
  const url = `/user/login?account=${data.name}&password=${data.password}`;
  return axios.get(url);
}

export function logout() {
  const url = '/user/logout';
  return axios.get(url);
}
/**获取下拉框内的值 */
export function getOptions(type) {
  const url = `/tableValue/value/${type}`;
  return axios.get(url);
}
/**根据id值获取数据表单的，下拉框选择值 */
export function getOptionById(id) {
  const url = `/tableValue/${id}`;
  return axios.get(url);
}

/**获取抵押贷款子流程进度情况 */

export function getProcess(rootId) {
  const url = `/mortgage/${rootId}`;
  return axios.get(url);
}

/**获取二手房抵押贷款子流程进度情况 */

export function getSHProcess(rootId) {
  const url = `/house/${rootId}`;
  return axios.get(url);
}

/**废单接口 */
export function killProcess(rootId) {
  const url = `/common/task/${rootId}/kill`;
  return axios.post(url, {
    rootId
  });
}

/**查询接口 */
export function queryState(data) {
  const url = getUrl('/common/list', data);
  return axios.get(url);
}

/**待办接口 */
export function mortgageUndo() {
  const employeeId = store.getters.user.id;
  const url = `/mortgage/employee/${employeeId}`;
  return axios.get(url);
}

export function houseUndo() {
  const employeeId = store.getters.user.id;
  const url = `/house/employee/${employeeId}`;
  return axios.get(url);
}

/**公告接口 */
export function getAnnouncement() {
  const url = '/announcement';
  return axios.get(url);
}
