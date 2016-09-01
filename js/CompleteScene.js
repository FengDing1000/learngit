// 通关场景
function CompleteScene(game, src){
    src = src || 'images/complete.jpg'
    Scene.call(this, game, src)
}

// 构造原型链，实现继承
CompleteScene.prototype = Object.create(Scene.prototype)
CompleteScene.prototype.constructor = CompleteScene

// 重写load方法，添加下滑效果
CompleteScene.prototype.load = function(append){
    Scene.prototype.load.call(this, append)
    this.$ele.hide().delay(300).slideDown(1000, function(){
        // 删除通关场景后面的所有标签元素
        // 即之前的游戏场景留下的内容
        this.$ele.prevAll().remove()
    }.bind(this))
}

// 重写点击事件监听函数，点击重新开始时加载开始场景，
// 让游戏通关图片上滑并卸载通关场景
CompleteScene.prototype.clickListener = function(x, y){
    if(x > 351 && x < 548 && y > 480 && y < 551){
        this.game.loadStartScene()
        this.$ele.slideUp(1000, function(){
            this.unload()
        }.bind(this))
    }
}