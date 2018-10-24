const fs = require("fs")

let obj = {
    'ju':'hi',
    'hw':'22'
}

fs.writeFile("hello.js", "export default"+JSON.stringify(obj),function(err){
    if(err) console.log('写文件操作失败');
    else console.log('写文件操作成功');
});