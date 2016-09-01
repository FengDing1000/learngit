// 整体游戏控制
function Game(box) {//初始化 将图片添加到main中 播放音乐 添加监听
    this.box = box
    // 创建音效对象，播放背景音乐
    this.audio = new Audio()
    this.audio.playMusic(true)

    // 监听点击事件
    this.listen()
    // 加载开始场景
    this.loadStartScene()
    console.log(this);
}


Game.prototype.listen = function () {//获取点击的在盒子上的坐标（距盒子左上角的距离 offsetX offsetY）并当成参数传递
    $(this.box).click(function (ev) {
        var x = ev.offsetX
        var y = ev.offsetY

        console.log('click x: %d, y: %d', x, y)

        this.audio.playClick()

        if (typeof this.clickListener == 'function') {//判断点击的发生后是不是一个函数 就是说是不是点击的有效元素
            this.clickListener(x, y)
        }
    }.bind(this))//将点击事件绑定在当前的场景上
}

Game.prototype.loadStartScene = function () {//
    var scene = new StartScene(this)//开始时的场景 有个默认参数src = 'images/0.jpg'  用new StartScene(this)初始化一个对象 将开始场景传入进去
    scene.load()
}

//加载下一张图片
Game.prototype.loadGameScene = function (prevScene) {
    console.log('load next scene...')

    var scene = new GameScene(this, Game.GameSceneDatas)//游戏进行中的 传入场景数据
    scene.load(prevScene)
}

// 加载游戏完成的场景
Game.prototype.complete = function () {
    var scene = new CompleteScene(this)
    scene.load(true)
}