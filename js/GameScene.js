// 找不同场景
// 找不同游戏数据
function GameScene(game, datas) {
    // 全部的游戏数据
    this.datas = datas
    this.index = 0
    // 当前正在进行的游戏的数据
    this.data = datas[this.index]

    Scene.call(this, game, this.data.src)
    console.log(this)
}

// 构造原型链
GameScene.prototype = Object.create(Scene.prototype)
GameScene.prototype.constructor = GameScene

// 重写load方法，添加全屏按扭、倒计时、数字标签
GameScene.prototype.load = function (prevScene) {
    this.differences = new Differences(this.game, this.data.diffs)
    this.fullScreen = new FullScreen(this.game.box)
    this.secondManager = new SecondManager(this.game.box, this.data.seconds)
    this.label = new Label(this.game.box)

    this.fullScreen.show()
    this.secondManager.show()
    this.label.show()

    Scene.prototype.load.call(this)

    // 根据游戏数据设置数字标签的初始值及回调函数
    // 根据游戏数据设置倒计时的初始值及回调函数
    this.label.set(this.pass.bind(this), this.data.diffs.length)
    this.secondManager.set(this.timeout.bind(this), this.data.seconds)

    // 将上一个场景淡出，动画结束后将上一个场景卸载
    // 同时开始倒计时
    prevScene.$ele.fadeOut(1500, function () {
        console.log('game scene loaded')
        prevScene.unload()
        this.secondManager.start()
    }.bind(this))
}

// 重写点击监听函数
GameScene.prototype.clickListener = function (x, y) {
    console.log('game scene click!')

    if (this.differences.check(x, y)) {
        this.label.decrease()
    }
}

// 处理游戏超时的方法
GameScene.prototype.timeout = function () {
    this.game.audio.playTimeout()
    var scene = new TimeoutScene(this.game, this)
    scene.load(true)
}

// 点击重玩时重置游戏场景
GameScene.prototype.reset = function (start) {
    this.label.set(this.pass.bind(this), this.data.diffs.length)
    this.secondManager.set(this.timeout.bind(this), this.data.seconds)
    this.differences.reset()

    // 从超时场景返回时需要再次将游戏的点击监听函数切换成游戏场景的监听函数
    this.game.clickListener = this.clickListener.bind(this)

    if (start) this.secondManager.start()
}

// 过关时的方法
GameScene.prototype.pass = function (label, preview) {
    if (preview) {
        // 当数字标签上的数字变为0时立即调用
        // 停止倒计时，播放音效
        this.secondManager.stop()

        if (this.index < this.datas.length - 1) {
            this.game.audio.playPass()
        }
        else {
            this.game.audio.playComplete()
        }

        return;
    }

    // 延迟一段时间后再次调用（preview没有传）
    // 判断是否还有游戏数据，如果有就加载下一个游戏数据
    // 没有就通关
    if (++this.index < this.datas.length) {
        this.data = this.datas[this.index]

        var ele = this.$ele
        // 添加下一个“不同”的图片到页面上
        this.$ele = $('<img>').attr('src', this.data.src).prependTo(this.game.box)
        // 将原图片淡出
        ele.fadeOut(1500, function () {
            this.secondManager.start()
            ele.remove()
        }.bind(this))

        this.reset()

        this.differences = new Differences(this.game, this.data.diffs)
    }
    else {
        this.differences.reset()
        this.game.complete()
    }
}