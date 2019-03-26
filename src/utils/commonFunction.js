import * as _ from 'lodash'
/**将数字转换成true/false */
export function transformNumberAndBoolean(catalog, numberToBoolean) {
  let result = {}
  if (numberToBoolean) {
    Object.keys(catalog).forEach(key => {
      if (/^([a-zA-Z]*Page)|([a-zA-Z]*Remark)$/.test(key)) {
        result[key] = catalog[key]
        return
      }
      switch (catalog[key]) {
        case 0:
          result[key] = false
          break;
        case 1:
          result[key] = true
          break;
        case '0':
          result[key] = false
          break;
        case '1':
          result[key] = true
          break;
        default:
          result[key] = catalog[key]
          break;
      }
    })
  } else {
    Object.keys(catalog).forEach(key => {
      switch (catalog[key]) {
        case true:
          result[key] = 1
          break;
        case false:
          result[key] = 0
          break;
        default:
          result[key] = catalog[key]
          break;
      }
    })
  }
  return result
}

export function getUrl(url, data) {
  // 拼接url的技巧
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return url
}

function param(data) {
  let url = ''
  for (var k in data) {
    if(data[k]) {
      url += `&${k}=${encodeURIComponent(data[k])}`
    }
  }
  return url ? url.substring(1) : ''
}

/**将房产报告按houseId分类成二维数组 */
export function seprateArr(arr) {
  let result = []
  for (let i = 0; i < arr.length; i++) {
    if (i < arr.length-1 && arr[i].houseId === arr[i + 1].houseId) {
      result.push([
          { ...arr[i] }, 
          { ...arr[i + 1] } 
        ]);
      i++
    }else{
        result.push([{...arr[i]}])
    }
  }
  return result
}

/** 将状态是finish和close的待办事项过滤 */
export function filterUselessTodos(todos) {
  
  if(!_.isArray(todos)) {
    return []
  }
  
  const result = todos.filter(item =>{
    return item.state !== 'finish' && item.state !== 'close'
  })
  return result
} 

/** 根据state得到目前的流程进度 */
export function getState(item, states) {
  const result = {
    ...item,
    currentState: _.get(states, item.state, undefined)
  }
  return result
}
