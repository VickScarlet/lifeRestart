export default class MessagePopup extends ui.view.MessagePopupUI {
    constructor() {
        super();
        this.left = this.right = 0;
        this.boxBg.defaultColor = "#000000";
        this.boxBg.hoverColor = "#000000";
        this.boxBg.radius = 20;
    }

    async popup({message}, parent) {
        this.message.text = message;
        this.message.commitMeasure();
        this.height = this.message.height + this.boxBg.radius * 2 + this.message.fontSize;
        Laya.Tween.clearAll(this);
        this.alpha = 0;
        this.y = - 2 * this.height;
        await Laya.promises.Tween.to(this, { y: 0, alpha: 1 }, 300, Laya.Ease.backOut);
        await Laya.promises.Tween.to(this, { alpha: 0}, 300, Laya.Ease.strongIn, 3000);
    }
}