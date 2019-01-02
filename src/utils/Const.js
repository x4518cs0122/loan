/**
 * @file 常量配置
 * @author 乐天一
 */

export const USER_KEY = 'userId'

export const Permission = {
    "EMPLOYEE" : "employee"
}

export const ListState = {
    "OPEN": "open",
    "FINISH": "finish"
}

export const commonValidations = {
    idCardValidation: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
    phoneValidation: /^1\d{10}$/,
    numberValidation: /^[0-9]*$/
}

/**国际化方案待定 */
export const messageTip = {
    phoneMessage: '手机号格式不正确',
    numberMessage: '请输入数字'
}


export const loanStates = {
    checklist: '正在接单',
    view:'正在面谈',
    visa:'正在面签',
    order:'正在评估下单',
    input:'正在整件输机',
    approve:'正在审批',
    transfer:'正在过户',
    mortgage:'正在抵押',
    mortgageA:'正在抵押',
    guarantee:'正在担保',
    loan:'正在放款',
    charge:'正在收费',
    close:'已废单',
    finish:'已完成'
}