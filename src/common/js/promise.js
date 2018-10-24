function Promise1(func){
    this._status = 'pending'
    this.resolveCallbacks = []
    this.rejectCallbacks = []
    let funcResolve = this.resolve.bind(this)
    func(funcResolve, this.reject)
    
}

Promise1.prototype.then = function(onResolve, onReject) { 
    let prom = new Promise1(() =>{})
    this.resolveCallbacks.push(onResolve)
    this.rejectCallbacks.push(onReject)
    return prom
}

Promise1.prototype.resolve = function(data) {
    console.log(this)
    if(this._status != 'pending'){
        return 
    }
    this._status = 'fullfilled'
    setTimeout(() =>{
        for(let i = 0; i < this.resolveCallbacks.length; i++){
            this.resolveCallbacks[i]()
        }
    })
}

var a = new Promise1((resolve, reject) =>{
    setTimeout(() =>{
        console.log('2222')
        resolve()
    },1000)
})
// var a = new Promise1()
// a.resolve
a.then(() =>{
    setTimeout(() =>{
        console.log('1')
    })
})