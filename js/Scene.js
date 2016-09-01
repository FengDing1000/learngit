// 表示游戏场景
// game表示游戏对象
// img表示场景使用的图片
function Scene(game, img){
    this.game = game
    this.img = img
}

// 加载游戏场景
// append控制加载的位置，以便实现丰富的动画效果
// 如淡入淡出、上下滑动
Scene.prototype.load = function(append){
    this.$ele = $('<img>').attr('src', this.img)
    if(append){
        this.$ele.appendTo(this.game.box)
    }
    else{
        this.$ele.prependTo(this.game.box)
    }
    
    // 让当前场景接收游戏中的点击事件
    // 让事件监听函数中的this指向当前场景，而不是标签元素
    this.game.clickListener = this.clickListener.bind(this)
}

// 表示点击事件监听函数，由子类负责实现
Scene.prototype.clickListener = function(){}

// 卸载当前场景
Scene.prototype.unload = function(){
    this.$ele.remove()
}

