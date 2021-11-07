class ScaleButton extends Laya.Button {
    constructor() {
        super();
        this.on(Laya.Event.MOUSE_DOWN, this, this.onMouse, [Laya.Event.MOUSE_DOWN]);
        this.on(Laya.Event.MOUSE_OUT, this, this.onMouse, [Laya.Event.MOUSE_OUT]);
        this.on(Laya.Event.MOUSE_UP, this, this.onMouse, [Laya.Event.MOUSE_UP]);
    }

    onMouse(type) {
        switch (type) {
            case Laya.Event.MOUSE_DOWN:
                Laya.Tween.to(this, { scaleX: 0.9, scaleY: 0.9 }, 100);
                break;
            case Laya.Event.MOUSE_OUT:
            case Laya.Event.MOUSE_UP:
                Laya.Tween.to(this, { scaleX: 1, scaleY: 1 }, 100);
                break;
            default:
                break;
        }
    }
}