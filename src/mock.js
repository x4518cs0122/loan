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
            var sign_state = ['待填写资料目录表', '待确定签约状态']
            return this.pick(sign_state)
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
        },
        M_state: function() {
            var M_state = ["待确定抵押时间", "待确定抵押状态"]
            return this.pick(M_state)
        },
        GM_state: function() {
            var GM_state = ["待提交担保函与收费明细", "待确定放款状态"]
            return this.pick(GM_state)
        },
        GUOHU_state: function() {
            var GUOHU_state = ["客户过户", "权证部过户"]
            return this.pick(GUOHU_state)
        },
        GUOHU_subState: function() {
            var GUOHU_subState = ["待确定回证时间", "待约定过户时间", "待确定过户状态"]
            return this.pick(GUOHU_subState)
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
        state: '待填写面谈建议',
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
    //抵押列表数据
Mock.mock('/api/getMortgage', {
        "data|10-15": [{
            'id': /\d{7,8}/,
            'name|1': '@cname',
            'phone': '13567845212',
            state: '@M_state',
        }]
    })
    //放款列表数据
Mock.mock('/api/getMoney', {
    "data|10-15": [{
        'id': /\d{7,8}/,
        'name|1': '@cname',
        'phone': /\d{11}/,
        state: '@GM_state',
    }]
})

Mock.mock('/api/getGuohu', {
    "data|10-15": [{
        'id': /\d{7,8}/,
        'name|1': '@cname',
        'phone': /\d{11}/,
        state: '@GUOHU_state',
        substate: '@GUOHU_subState'
    }]
})

Mock.mock('/api/login', {
    'token': /\d{7,8}/,
})