const Mock = require('mockjs')
const Random = Mock.Random

Random.extend({
        icon: function() {
            var icon = ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515401194472&di=50cd49edb3078f1479af5ba4abab58a9&imgtype=0&src=http%3A%2F%2Fimage.edai.com%2Fupload%2Fnews%2F2015_summer%2F1433234551_63364.png',
                'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=461928742,2036437140&fm=27&gp=0.jpg"'
            ]
            return this.pick(icon)
        },
        sign_state: function() {
            var sign_state = ['待约定签约时间', '待确定签约状态']
            return this.pick(sign_state)
        },
        interview_state: function() {
            var interview_state = ['个人贷款申请表待填', '面谈建议待填', '表格未填写']
            return this.pick(interview_state)
        },
        P_state: function() {
            var P_state = ["待下单", "待出报告"]
            return this.pick(P_state)
        },
        A_state: function() {
            var A_state = ["已出正评", "未出正评", "待出正评"]
            return this.pick(A_state)
        },
        SA_state: function() {
            var SA_state = ["待收齐资料", "待支行审批", "待分行审批"]
            return this.pick(SA_state)
        }
    })
    //使用mockjs模拟数据
Mock.mock('/api/notice', {
        "data|10-15": [{
            icon: '@ICON',
            'date': '@date("yyyy-MM-dd")',
            'title': '@cword(3,5)',
            'text': '@cparagraph(1, 3)'
        }]
    })
    //面谈数据生成
Mock.mock('/api/interview', {
    "data|10-15": [{
        state: '@INTERVIEW_STATE',
        'id': /\d{7,8}/,
        'name|1': '@cname',
        'phone': '12345678910'
    }]
})

Mock.mock('/api/signList', {
    "data|10-15": [{
        'id': /\d{7,8}/,
        state: '@SIGN_STATE',
        'name|1': '@cname',
        'phone': '12345678910'
    }]

})

Mock.mock('/api/signDetail', {
    "data": {
        'name|1': '@cname',
        'phone': '13567845212',
        'type': '抵押消费'
    }

})
//评估列表数据
Mock.mock('/api/getEvaluate', {
        "data|10-15": [{
            'id': /\d{7,8}/,
            'name|1': '@cname',
            'phone': '13567845212',
            state: '@P_STATE'
        }]
    })
    //审批列表数据
Mock.mock('/api/getApprove', {
    "data|10-15": [{
        'id': /\d{7,8}/,
        'name|1': '@cname',
        'phone': '13567845212',
        state: '@A_STATE',
        substate: '@SA_STATE'
    }]
})