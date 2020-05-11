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
        Camera:{
            default: null,
            type: cc.Camera,
        },
        Hero: {
            default: null,
            type: cc.Node,
        },
        //英雄子弹对象池
        HeroBulletPool: {
            default: null,
            type: cc.NodePool,
        },
        //武器
        Weapon: {
            default: null,
            type: cc.Prefab,
        },
    },

    createHeroBulletPool: function () {
        //bullet对象池
        this.HeroBulletPool = new cc.NodePool();
        let initCount = 10;
        for (let i = 0; i < initCount; ++i) {
            let bullet = cc.instantiate(this.Weapon); // 创建节点
            this.HeroBulletPool.put(bullet); // 通过 put 接口放入对象池
        }
        this.bulletVector = new Array();
    },

    createHeroBullet: function () {
        let bullet = null;
        if (this.HeroBulletPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            bullet = this.HeroBulletPool.get();
        } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            bullet = cc.instantiate(this.Weapon);
        }
        bullet.parent = this.node; // 将生成的子弹加入节点树
        bullet.setPosition(this.Hero.getPosition());
        // bullet.getComponent('bullet').init(); //接下来就可以调用 bullet 身上的脚本进行初始化
        this.bulletVector.push(bullet);
    },

    recycleHeroBullet: function (bullet) {
        this.HeroBulletPool.put(bullet); // 和初始化时的方法一样，将节点放进对象池，这个方法会同时调用节点的 removeFromParent
        this.bulletVector.pop(bullet);
    },

    emitHeroBullet: function () {
        this.createHeroBullet();
        //难写。。。
        this.bulletVector.forEach(recycleHeroBullet);
    },

    setHeroMoveMethod: function () {
        //初始化鼠标事件
        this.node.on(cc.Node.EventType.MOUSE_DOWN, function (event) {
            this.Hero.setPosition(this.node.convertToNodeSpaceAR(event.getLocation()));
            this.Hero.isMouseDown = true;
        }, this);
        this.node.on(cc.Node.EventType.MOUSE_MOVE, function (event) {
            if (this.Hero.isMouseDown) {
                this.Hero.setPosition(this.Hero.getPosition().add(event.getDelta()));
            }
        }, this);
        this.node.on(cc.Node.EventType.MOUSE_UP, function (event) { this.Hero.isMouseDown = false; }, this);
        this.node.on(cc.Node.EventType.MOUSE_LEAVE, function (event) { this.Hero.isMouseDown = false; }, this);
    },
   
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.setHeroMoveMethod();
        this.createHeroBulletPool();
    },

    start() {
        this.schedule(this.emitHeroBullet, 1);
    },

    update(dt) {
      
    },
});
