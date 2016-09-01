// 超时场景
function TimeoutScene(game, gameScene, src){
    this.gameScene = gameScene
    src = src || 'images/timeout.jpg'
    
    Scene.call(this, game, src)
}

// 构造原型链
TimeoutScene.prototype = Object.create(Scene.prototype)
TimeoutScene.prototype.constructor = TimeoutScene

// 重写load方法
TimeoutScene.prototype.load = function(append){
    Scene.prototype.load.call(this, append)
    // 实现下滑动画效果
    this.$ele.hide().delay(300).slideDown(1000)
}

// 重写点击事件监听函数，点击重玩时恢复游戏场景
// 并且播放上滑动画，动画完成后卸载自己
TimeoutScene.prototype.clickListener = function(x, y){
    if(x > 351 && x < 548 && y > 480 && y < 551){
        this.gameScene.reset(true)
        this.$ele.slideUp(1000, function(){
            this.unload()
        }.bind(this))
    }
}