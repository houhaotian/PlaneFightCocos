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
        //英雄生命
        life: 5,
        //英雄飞机类型，共4种类型，0~3
        type: 0,
        //英雄等级,最大3级，0~3,英雄武器
        level: 0,
    },

    keyPressEvent(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.node.x -= 15;
                break;
            case cc.macro.KEY.d:
                this.node.x += 15;
                break;
            case cc.macro.KEY.w:
                this.node.y += 15;
                break;
            case cc.macro.KEY.s:
                this.node.y -= 15;
                break;
        }
    },

    keyReleaseEvent(event) {
    },

   
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        //   初始化键盘输入监听
        //  cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.keyPressEvent, this);
        //  cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.keyReleaseEvent, this);

    },

    onDestroy() {
      //  cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.keyPressEvent, this);
      //  cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.keyReleaseEvent, this);
    },

    start () {
    },

    // update (dt) {},
});
