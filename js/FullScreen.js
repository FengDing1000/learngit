// 全屏按扭
// box 全屏按扭放置的位置，即父元素
// options 覆盖代码中的默认数据，实现样式自定义
function FullScreen(box, options){
    this.box = box
    // $.extend 实现对象合并，把后面对象覆盖到前的对象上
    this.options = $.extend({
        position: 'absolute',
        left: '10px',
        bottom: '26px',
        fontSize: '16px',
        backgroundColor: '#ffcc01',
        display: 'inline-block',
        padding: '8px',
        borderRadius: '6px'
    }, options)
}

// 将全屏按扭显示在页面上
FullScreen.prototype.show = function() {
    this.$ele = $('<span>', {
        on: {
            click: function(){
                // fullscreen方法来自jquery.fullscreen插件
                // FullScreen.isFullScreen = !FullScreen.isFullScreen 给fullscreen赋相反的值
                // 上面赋值表达式的结果是 FullScreen.isFullScreen
                // this在事件处理函数中，表示激发事件的标签元素
                // FullScreen是全屏按扭的构造函数（类），整个页上只有一个构造函数
                // 即使页面上有多个全屏按扭（实例/对象），FullScreen仍然只有一个
                // $(document).fullScreen(FullScreen.isFullScreen = !FullScreen.isFullScreen)
                // 相当于下面2行代码：
                // FullScreen.isFullScreen = !FullScreen.isFullScreen
                // $(document).fullScreen(FullScreen.isFullScreen)
                
                $(document).fullScreen(FullScreen.isFullScreen = !FullScreen.isFullScreen)
                
                if(FullScreen.isFullScreen){
                    $(this).text('退出全屏')
                }
                else{
                    $(this).text('全屏')
                }
            }
        }
    }).text(FullScreen.isFullScreen ? '退出全屏' : '全屏')
    .css(this.options).prependTo(this.box)
}

// 从页面上移除全屏按扭
FullScreen.prototype.remove = function(){
    this.$ele.remove()
}