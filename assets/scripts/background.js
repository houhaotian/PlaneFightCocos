// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
    },
    
    backgroundMoveAction: function () {
        var move1 = cc.moveBy(3, 0, -this.node.parent.height);
        var move2 = cc.moveBy(0, 0, this.node.parent.height);
        var se = cc.sequence(move1, move2);
        return cc.repeatForever(se);
    },

    // LIFE-CYCLE CALLBACKS:
     onLoad() { 
         this.originalY = this.node.y;
     }, 
   
    start () {
        this.node.runAction(this.backgroundMoveAction());
    },

    update(dt) {
       
    },
});
