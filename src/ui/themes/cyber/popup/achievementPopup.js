export default class CyberAchievementPopup extends ui.view.CyberTheme.CyberAchievementPopupUI {
    constructor() {
        super();
    }

    async popup({achievement}, parent) {
        Laya.Tween.clearAll(this);
        Laya.Tween.clearAll(this.boxBg);
        this.alpha = 0.8;
        this.labName.text = achievement.name;
        this.labName.color = $ui.common.grade[achievement.grade];
        this.x = - this.width;
        this.boxBg.x = this.boxBg.width;
        await Promise.all([
            Laya.promises.Tween.to(this, {x: 0}, 300, Laya.Ease.strongOut),
            Laya.promises.Tween.to(this.boxBg, {x: 0}, 300, Laya.Ease.strongOut, 50),
        ])
        await Laya.promises.Tween.to(this, {alpha: 0}, 3000, Laya.Ease.strongIn);
    }
}
