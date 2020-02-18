
var Helloworld = cc.Layer.extend({
    init:function () {
        this._super();
        this.setTouchEnabled(true);
        return true;
    },
    
    onTouchesBegan:function (touches, event) {
        
    },
    onTouchesMoved:function (touches, event) {
        
    },
    onTouchesEnded:function (touches, event) {
        
    },
    onTouchesCancelled:function (touches, event) {
        
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new Helloworld();
        layer.init();
        this.addChild(layer);
    }
});

