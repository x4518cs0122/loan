const Mock = require('mockjs')
const Random = Mock.Random

Random.extend({
        state: function(date) {
            var state = ['待约定签约时间', '待确定签约状态']
            return this.pick(state)
        }
    })
    //使用mockjs模拟数据
Mock.mock('/api/sign', {
    "data|10-15": [{
        state: '@STATE',
        'name|1': '@cname',
        'phone': '12345678910'
    }]

})

Mock.mock('/api/signDetail', {
    "data": {
        'id': '@increment(1000000)',
        'name|1': '@cname',
        'phone': '13567845212',
        'type': '抵押消费'
    }

})