/**
 * 增强 UI 组件系统
 * 提供现代化的 UI 组件和交互效果
 */

import { animator } from './animations.js';
import { stellarTheme } from './themes/stellar.js';

/**
 * 增强型按钮组件
 */
export class EnhancedButton {
    constructor(button) {
        this.button = button;
        this.isAnimating = false;
        this.setup();
    }

    setup() {
        if (!this.button) return;

        // 应用主题
        stellarTheme.applyButtonTheme(this.button, 'primary');

        // 绑定交互动画
        this.bindInteractions();

        // 添加点击波纹效果
        this.createRippleEffect();
    }

    bindInteractions() {
        const btn = this.button;

        // 鼠标悬停
        btn.on(Laya.Event.MOUSE_OVER, this, () => {
            if (!this.isAnimating) {
                animator.buttonHover(btn, 1.08, 0.2);
            }
        });

        // 鼠标离开
        btn.on(Laya.Event.MOUSE_OUT, this, () => {
            animator.buttonHover(btn, 1, 0.2);
        });

        // 鼠标按下
        btn.on(Laya.Event.MOUSE_DOWN, this, () => {
            animator.buttonClick(btn, 0.92, 0.1);
            this.triggerRipple();
        });

        // 鼠标释放
        btn.on(Laya.Event.MOUSE_UP, this, () => {
            animator.buttonHover(btn, 1.08, 0.1);
        });
    }

    createRippleEffect() {
        this.rippleContainer = new Laya.Sprite();
        this.rippleContainer.mouseEnabled = false;
        this.button.addChild(this.rippleContainer);
    }

    triggerRipple() {
        if (!this.rippleContainer) return;

        const ripple = new Laya.Sprite();
        const size = Math.max(this.button.width, this.button.height) * 2;
        
        ripple.graphics.drawCircle(0, 0, size / 2, "rgba(255, 255, 255, 0.3)");
        ripple.pos(this.button.width / 2, this.button.height / 2);
        ripple.scaleX = ripple.scaleY = 0;
        ripple.alpha = 0.6;
        
        this.rippleContainer.addChild(ripple);

        if (window.gsap) {
            gsap.to(ripple, {
                scaleX: 1.5,
                scaleY: 1.5,
                alpha: 0,
                duration: 0.6,
                ease: "power2.out",
                onComplete: () => {
                    this.rippleContainer.removeChild(ripple);
                }
            });
        }
    }

    setText(text) {
        if (this.button && this.button.text) {
            this.button.text = text;
        }
    }

    setEnabled(enabled) {
        if (!this.button) return;
        
        this.button.mouseEnabled = enabled;
        this.button.alpha = enabled ? 1 : 0.5;
    }
}

/**
 * 增强型卡片组件
 */
export class EnhancedCard {
    constructor(card) {
        this.card = card;
        this.setup();
    }

    setup() {
        if (!this.card) return;

        // 应用主题
        stellarTheme.applyPanelTheme(this.card, 'default');

        // 添加悬停效果
        this.bindHoverEffect();

        // 添加内容容器
        this.contentContainer = new Laya.Box();
        this.card.addChild(this.contentContainer);
    }

    bindHoverEffect() {
        const card = this.card;

        card.on(Laya.Event.MOUSE_OVER, this, () => {
            if (window.gsap) {
                gsap.to(card, {
                    y: card.y - 5,
                    duration: 0.3,
                    ease: "power2.out"
                });
                
                // 增强阴影
                card.shadowBlur = 16;
            }
        });

        card.on(Laya.Event.MOUSE_OUT, this, () => {
            if (window.gsap) {
                gsap.to(card, {
                    y: card.y + 5,
                    duration: 0.3,
                    ease: "power2.out"
                });
                
                card.shadowBlur = 8;
            }
        });
    }

    addContent(content) {
        if (this.contentContainer && content) {
            this.contentContainer.addChild(content);
        }
    }
}

/**
 * 增强型列表组件
 */
export class EnhancedList {
    constructor(list, options = {}) {
        this.list = list;
        this.options = {
            animateItems: true,
            staggerDelay: 0.1,
            hoverEffect: true,
            ...options
        };
        this.items = [];
        this.setup();
    }

    setup() {
        if (!this.list) return;

        // 应用主题
        stellarTheme.applyPanelTheme(this.list, 'dark');

        // 如果已有子项，增强它们
        if (this.list.numChildren > 0) {
            this.enhanceItems();
        }
    }

    enhanceItems() {
        for (let i = 0; i < this.list.numChildren; i++) {
            const item = this.list.getChildAt(i);
            this.items.push(item);
            
            if (this.options.hoverEffect) {
                this.bindItemHover(item);
            }
        }

        // 应用入场动画
        if (this.options.animateItems && window.gsap) {
            animator.staggerAnimate(
                this.items,
                'slideIn',
                0.4,
                this.options.staggerDelay
            );
        }
    }

    bindItemHover(item) {
        item.on(Laya.Event.MOUSE_OVER, this, () => {
            if (window.gsap) {
                gsap.to(item, {
                    x: item.x + 10,
                    duration: 0.2,
                    ease: "power2.out"
                });
            }
        });

        item.on(Laya.Event.MOUSE_OUT, this, () => {
            if (window.gsap) {
                gsap.to(item, {
                    x: item.x - 10,
                    duration: 0.2,
                    ease: "power2.out"
                });
            }
        });
    }

    addItem(item) {
        if (!this.list || !item) return;

        this.list.addChild(item);
        this.items.push(item);

        // 添加入场动画
        if (this.options.animateItems && window.gsap) {
            item.alpha = 0;
            animator.fadeIn(item, 0.3);
        }
    }

    removeItem(item) {
        if (!this.list || !item) return;

        if (window.gsap) {
            animator.fadeOut(item, 0.3, () => {
                this.list.removeChild(item);
                const index = this.items.indexOf(item);
                if (index > -1) {
                    this.items.splice(index, 1);
                }
            });
        } else {
            this.list.removeChild(item);
        }
    }

    clear() {
        this.items.forEach(item => {
            if (window.gsap) {
                animator.fadeOut(item, 0.2);
            }
        });
        
        setTimeout(() => {
            while (this.list.numChildren > 0) {
                this.list.removeChildAt(0);
            }
            this.items = [];
        }, 200);
    }
}

/**
 * 进度条组件
 */
export class EnhancedProgressBar {
    constructor(progressBar, options = {}) {
        this.progressBar = progressBar;
        this.options = {
            animated: true,
            showLabel: true,
            color: stellarTheme.colors.primary,
            ...options
        };
        this.currentProgress = 0;
        this.setup();
    }

    setup() {
        if (!this.progressBar) return;

        // 创建进度条背景
        this.bgBar = new Laya.Sprite();
        this.bgBar.graphics.drawRect(0, 0, this.progressBar.width, this.progressBar.height, 
            stellarTheme.colors.backgroundLight);
        this.bgBar.cornerRadius = this.progressBar.height / 2;
        this.progressBar.addChild(this.bgBar);

        // 创建进度条
        this.fillBar = new Laya.Sprite();
        this.fillBar.graphics.drawRect(0, 0, 0, this.progressBar.height, 
            this.options.color);
        this.fillBar.cornerRadius = this.progressBar.height / 2;
        this.progressBar.addChild(this.fillBar);

        // 创建文本标签
        if (this.options.showLabel) {
            this.label = new Laya.Text();
            this.label.text = "0%";
            this.label.color = stellarTheme.colors.foreground;
            this.label.fontSize = 12;
            this.label.bold = true;
            this.label.pos(this.progressBar.width / 2, this.progressBar.height / 2 - 6);
            this.label.alignment = "center";
            this.progressBar.addChild(this.label);
        }

        // 添加发光效果
        this.addGlowEffect();
    }

    addGlowEffect() {
        if (window.gsap) {
            gsap.to(this.fillBar, {
                shadowBlur: 20,
                shadowColor: this.options.color,
                duration: 1,
                repeat: -1,
                yoyo: true
            });
        }
    }

    setProgress(progress, duration = 1) {
        if (!this.fillBar) return;

        progress = Math.max(0, Math.min(100, progress));
        
        const targetWidth = (progress / 100) * this.progressBar.width;

        if (this.options.animated && window.gsap) {
            gsap.to(this.fillBar, {
                width: targetWidth,
                duration: duration,
                ease: "power2.out"
            });

            // 数字滚动
            if (this.label) {
                animator.numberRoll(this.label, this.currentProgress, progress, duration);
            }
        } else {
            this.fillBar.width = targetWidth;
            if (this.label) {
                this.label.text = `${Math.round(progress)}%`;
            }
        }

        this.currentProgress = progress;

        // 颜色变化
        if (progress === 100) {
            this.fillBar.graphics.clear();
            this.fillBar.graphics.drawRect(0, 0, targetWidth, this.fillBar.height, 
                stellarTheme.colors.success);
        }
    }

    reset() {
        this.setProgress(0, 0.5);
    }
}

/**
 * 弹窗组件
 */
export class EnhancedDialog {
    constructor(dialog) {
        this.dialog = dialog;
        this.isVisible = false;
        this.setup();
    }

    setup() {
        if (!this.dialog) return;

        // 应用主题
        stellarTheme.applyPanelTheme(this.dialog, 'dark');

        // 添加背景遮罩
        this.createOverlay();

        // 添加入场动画
        this.dialog.visible = false;
        this.dialog.alpha = 0;
    }

    createOverlay() {
        this.overlay = new Laya.Sprite();
        this.overlay.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "rgba(0, 0, 0, 0.7)");
        this.overlay.mouseEnabled = true;
        this.overlay.visible = false;
        Laya.stage.addChild(this.overlay);

        // 点击遮罩关闭
        this.overlay.on(Laya.Event.MOUSE_UP, this, () => {
            this.hide();
        });
    }

    show(animation = 'scale') {
        if (this.isVisible) return;

        this.overlay.visible = true;
        this.dialog.visible = true;

        // 应用入场动画
        if (window.gsap) {
            const animations = {
                scale: () => {
                    this.dialog.scaleX = this.dialog.scaleY = 0;
                    this.dialog.alpha = 0;
                    
                    gsap.to(this.dialog, {
                        scaleX: 1,
                        scaleY: 1,
                        alpha: 1,
                        duration: 0.4,
                        ease: "back.out(1.7)"
                    });
                },
                fade: () => {
                    animator.fadeIn(this.dialog, 0.3);
                },
                slide: () => {
                    this.dialog.y = -this.dialog.height;
                    gsap.to(this.dialog, {
                        y: 0,
                        duration: 0.4,
                        ease: "power2.out"
                    });
                }
            };

            if (animations[animation]) {
                animations[animation]();
            } else {
                animations.scale();
            }
        }

        this.isVisible = true;
    }

    hide(animation = 'scale') {
        if (!this.isVisible) return;

        if (window.gsap) {
            const animations = {
                scale: () => {
                    gsap.to(this.dialog, {
                        scaleX: 0,
                        scaleY: 0,
                        alpha: 0,
                        duration: 0.3,
                        ease: "back.in(1.7)",
                        onComplete: () => {
                            this.onHideComplete();
                        }
                    });
                },
                fade: () => {
                    animator.fadeOut(this.dialog, 0.3, () => {
                        this.onHideComplete();
                    });
                }
            };

            if (animations[animation]) {
                animations[animation]();
            } else {
                animations.scale();
            }
        } else {
            this.onHideComplete();
        }
    }

    onHideComplete() {
        this.dialog.visible = false;
        this.overlay.visible = false;
        this.isVisible = false;
    }

    setContent(content) {
        if (this.dialog && content) {
            // 清空现有内容
            while (this.dialog.numChildren > 0) {
                this.dialog.removeChildAt(0);
            }
            
            // 添加新内容
            this.dialog.addChild(content);
        }
    }
}

/**
 * 工具提示组件
 */
export class Tooltip {
    constructor() {
        this.tooltip = null;
        this.setup();
    }

    setup() {
        this.tooltip = new Laya.Box();
        this.tooltip.bgColor = stellarTheme.colors.backgroundDark;
        this.tooltip.borderColor = stellarTheme.colors.primary;
        this.tooltip.borderWidth = 1;
        this.tooltip.cornerRadius = 4;
        this.tooltip.alpha = 0;
        this.tooltip.visible = false;
        this.tooltip.zOrder = 9999;
        
        Laya.stage.addChild(this.tooltip);

        this.label = new Laya.Text();
        this.label.color = stellarTheme.colors.foreground;
        this.label.fontSize = 12;
        this.label.padding = "4,8,4,8";
        this.tooltip.addChild(this.label);
    }

    show(target, text, offsetX = 10, offsetY = 10) {
        if (!this.tooltip || !target) return;

        this.label.text = text;
        this.tooltip.visible = true;
        this.tooltip.size(this.label.width + 16, this.label.height + 8);

        // 定位到目标旁边
        const point = target.localToGlobal(new Laya.Point(0, 0));
        this.tooltip.pos(point.x + offsetX, point.y + offsetY);

        // 显示动画
        if (window.gsap) {
            gsap.to(this.tooltip, {
                alpha: 1,
                duration: 0.2,
                ease: "power2.out"
            });
        }
    }

    hide() {
        if (!this.tooltip) return;

        if (window.gsap) {
            gsap.to(this.tooltip, {
                alpha: 0,
                duration: 0.2,
                ease: "power2.out",
                onComplete: () => {
                    this.tooltip.visible = false;
                }
            });
        } else {
            this.tooltip.visible = false;
        }
    }

    bind(target, text) {
        if (!target) return;

        target.on(Laya.Event.MOUSE_OVER, this, () => {
            this.show(target, text);
        });

        target.on(Laya.Event.MOUSE_OUT, this, () => {
            this.hide();
        });
    }
}

export default {
    EnhancedButton,
    EnhancedCard,
    EnhancedList,
    EnhancedProgressBar,
    EnhancedDialog,
    Tooltip
};
