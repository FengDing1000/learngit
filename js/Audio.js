// 统一管理页面上的所有音效
function Audio(){
    // 获取页面上所有的audio放入数组
    // this.audios = Array.from($('audio'))
    // this.audios = Array.prototype.slice.call($('audio'))
    // this.audios = $.makeArray($('audio'))
    this.audios = $('audio').toArray()
    
    // 背景音乐
    this.music = this.audios[0]
    // 点击时的声音
    this.click = this.audios[1]
    // 过关时的声音
    this.pass = this.audios[2]
    // 游戏通关时的声音
    this.complete = this.audios[3]
    // 超时的声音
    this.timeout = this.audios[4]
}

// 停止所有的声音
Audio.prototype.pauseAll = function(){
    this.audios.forEach(function(audio){
        audio.pause()
    })
}

// 播放背景音乐
Audio.prototype.playMusic = function(only){
    console.log('play music')
    if(only) this.pauseAll()
    this.music.load()
    this.music.play()
}

// 播放点击音效
Audio.prototype.playClick = function(){
    // 为了让点击音效更清晰，让背景音乐静音
    this.muteMusic()
    
    this.click.load()
    this.click.play()
    
    setTimeout(function() {
        this.recoverMusic()
    }.bind(this), 500);
}

// 播放过关音效
Audio.prototype.playPass = function(){
    this.muteMusic(true)
    // 在过关音效播放时阻止恢复背景音乐
    // 防止点击鼠标时背景音乐提前恢复
    
    this.pass.load()
    this.pass.play()
    
    // 6秒之后恢复背景音乐
    setTimeout(function() {
        this.recoverMusic(true)
    }.bind(this), 6 * 1000);
}

// 播放通关音效
Audio.prototype.playComplete = function(){
    this.muteMusic(true)
    
    this.complete.load()
    this.complete.play()
    
    setTimeout(function() {
        this.recoverMusic(true)
    }.bind(this), 8 * 1000);
}

// 播放超时音效
Audio.prototype.playTimeout = function(){
    this.muteMusic(true)
    
    this.timeout.load()
    this.timeout.play()
    
    setTimeout(function() {
        this.recoverMusic(true)
    }.bind(this), 4 * 1000);
}

// 让背景音乐静音
Audio.prototype.muteMusic = function(preventRecover){
    this.music.volume = 0
    this.preventRecover = preventRecover
}

// 恢复背景音乐，除非设置了isMuteMusic
// force表示强制恢复
Audio.prototype.recoverMusic = function(force){
    if(force){
        // 强制恢复时将prevent...设置为false
        this.preventRecover = false
    }
    
    // 判断是否阻止恢复，如果阻止则直接返回
    if(this.preventRecover) return
    
    this.music.volume = 1
}