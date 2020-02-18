var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = cc.Layer.create();
        this.addChild(layer);
    }
});

