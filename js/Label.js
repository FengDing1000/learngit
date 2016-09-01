// 表示“还有X次不同”中的数字
function Label(box, total, options){
    this.box = box
    // 总共有几处不同，即初始值
    this.total = total || 5
    // 还剩几处不同，即当前值
    this.value = this.total
    
    this.options = {
        position: 'absolute',
        left: '556px',
        bottom: '23px',
        fontSize: '32px',
        display: 'inline-block',
        color: 'white'
    }
}

// 把数字显示到页面上
Label.prototype.show = function(){
    this.$ele = $('<span>').text(this.value).css(this.options).prependTo(this.box)
}

// 重新设置初始值和值变成0时的回调函数
Label.prototype.set = function(complete, total){
    this.complete = complete
    
    this.total = total || 5
    this.value = this.total
    this.$ele.text(this.value)
}

// 将数值减1直到0，如果值变为0则调用回调函数
Label.prototype.decrease = function(){
    if(this.value > 0){
        this.value--
        this.$ele.text(this.value)
    }
    // typeof x == 'function' 用来判断x是否为函数
    if(this.value == 0 && $.isFunction(this.complete)){
        // 调用2次是为了改善动画带来的延迟
        // 第1次是动画开始前调用
        this.complete(this, true)
        
        // 第2次是动画完成后调用
        setTimeout(function() {
            this.complete(this)
        }.bind(this), 1500);
    }
}