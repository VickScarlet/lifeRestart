/**
 * UI 动画系统 - 集成 GSAP 和 Animate.css
 * 提供流畅、精致的动画效果
 */

export class UIAnimator {
    constructor() {
        this.defaultDuration = 0.3;
        this.easeType = "power2.out";
        this.staggerAmount = 0.1;
    }

    /**
     * 淡入动画
     */
    fadeIn(target, duration = 0.3, onComplete = null) {
        if (!target) return;
        
        target.alpha = 0;
        target.visible = true;
        
        gsap.to(target, {
            alpha: 1,
            duration: duration,
            ease: this.easeType,
            onComplete: onComplete
        });
    }

    /**
     * 淡出动画
     */
    fadeOut(target, duration = 0.3, onComplete = null) {
        if (!target) return;
        
        gsap.to(target, {
            alpha: 0,
            duration: duration,
            ease: this.easeType,
            onComplete: () => {
                target.visible = false;
                if (onComplete) onComplete();
            }
        });
    }

    /**
     * 缩放弹入动画
     */
    scaleIn(target, duration = 0.4, onComplete = null) {
        if (!target) return;
        
        target.scaleX = target.scaleY = 0;
        target.visible = true;
        
        gsap.to(target, {
            scaleX: 1,
            scaleY: 1,
            duration: duration,
            ease: "back.out(1.7)",
            onComplete: onComplete
        });
    }

    /**
     * 缩放弹出动画
     */
    scaleOut(target, duration = 0.3, onComplete = null) {
        if (!target) return;
        
        gsap.to(target, {
            scaleX: 0,
            scaleY: 0,
            duration: duration,
            ease: "back.in(1.7)",
            onComplete: () => {
                target.visible = false;
                if (onComplete) onComplete();
            }
        });
    }

    /**
     * 滑入动画（从左侧）
     */
    slideInLeft(target, duration = 0.4, onComplete = null) {
        if (!target) return;
        
        target.x = -target.width;
        target.visible = true;
        
        gsap.to(target, {
            x: 0,
            duration: duration,
            ease: this.easeType,
            onComplete: onComplete
        });
    }

    /**
     * 滑入动画（从右侧）
     */
    slideInRight(target, duration = 0.4, onComplete = null) {
        if (!target) return;
        
        target.x = target.parent ? target.parent.width : Laya.stage.width;
        target.visible = true;
        
        gsap.to(target, {
            x: 0,
            duration: duration,
            ease: this.easeType,
            onComplete: onComplete
        });
    }

    /**
     * 滑入动画（从上方）
     */
    slideInTop(target, duration = 0.4, onComplete = null) {
        if (!target) return;
        
        target.y = -target.height;
        target.visible = true;
        
        gsap.to(target, {
            y: 0,
            duration: duration,
            ease: this.easeType,
            onComplete: onComplete
        });
    }

    /**
     * 滑入动画（从下方）
     */
    slideInBottom(target, duration = 0.4, onComplete = null) {
        if (!target) return;
        
        target.y = target.parent ? target.parent.height : Laya.stage.height;
        target.visible = true;
        
        gsap.to(target, {
            y: 0,
            duration: duration,
            ease: this.easeType,
            onComplete: onComplete
        });
    }

    /**
     * 按钮悬停效果
     */
    buttonHover(target, scale = 1.1, duration = 0.2) {
        if (!target) return;
        
        gsap.to(target, {
            scaleX: scale,
            scaleY: scale,
            duration: duration,
            ease: this.easeType
        });
    }

    /**
     * 按钮点击效果
     */
    buttonClick(target, scale = 0.95, duration = 0.1) {
        if (!target) return;
        
        gsap.to(target, {
            scaleX: scale,
            scaleY: scale,
            duration: duration,
            ease: this.easeType,
            yoyo: true,
            repeat: 1
        });
    }

    /**
     * 列表项 stagger 动画
     */
    staggerAnimate(targets, animation = 'fadeIn', duration = 0.3, stagger = 0.1) {
        if (!targets || targets.length === 0) return;
        
        const animations = {
            fadeIn: { alpha: 1, from: 0 },
            scaleIn: { scaleX: 1, scaleY: 1, fromX: 0, fromY: 0 },
            slideIn: { x: 0, from: -50 }
        };
        
        gsap.fromTo(targets, 
            animations[animation]?.from !== undefined ? 
                { alpha: animations[animation].from } : 
                { alpha: 0 },
            {
                alpha: 1,
                duration: duration,
                stagger: stagger,
                ease: this.easeType
            }
        );
    }

    /**
     * 数字滚动动画
     */
    numberRoll(target, from, to, duration = 1) {
        if (!target) return;
        
        const obj = { value: from };
        
        gsap.to(obj, {
            value: to,
            duration: duration,
            ease: this.easeType,
            onUpdate: () => {
                target.text = Math.round(obj.value).toString();
            }
        });
    }

    /**
     * 颜色过渡动画
     */
    colorTransition(target, fromColor, toColor, duration = 0.5) {
        if (!target) return;
        
        const color = { value: this.hexToRgb(fromColor) };
        
        gsap.to(color, {
            value: this.hexToRgb(toColor),
            duration: duration,
            ease: this.easeType,
            onUpdate: () => {
                const rgb = color.value;
                target.filters = [
                    new Laya.ColorFilter(
                        rgb.r / 255, 0, 0, 0, 0,
                        0, rgb.g / 255, 0, 0, 0,
                        0, 0, rgb.b / 255, 0, 0
                    )
                ];
            }
        });
    }

    /**
     * 粒子爆炸效果
     */
    particleExplosion(x, y, count = 20) {
        for (let i = 0; i < count; i++) {
            const particle = new Laya.Sprite();
            particle.graphics.drawCircle(0, 0, 3, "#FFD700");
            particle.pos(x, y);
            Laya.stage.addChild(particle);
            
            const angle = (Math.PI * 2 / count) * i;
            const velocity = 5 + Math.random() * 5;
            
            gsap.to(particle, {
                x: x + Math.cos(angle) * 100,
                y: y + Math.sin(angle) * 100,
                alpha: 0,
                duration: 0.5 + Math.random() * 0.5,
                ease: this.easeType,
                onComplete: () => {
                    Laya.stage.removeChild(particle);
                }
            });
        }
    }

    /**
     * 页面切换动画
     */
    pageTransition(oldPage, newPage, type = 'fade', duration = 0.3) {
        const transitions = {
            fade: () => this.fadeTransition(oldPage, newPage, duration),
            slide: () => this.slideTransition(oldPage, newPage, duration),
            scale: () => this.scaleTransition(oldPage, newPage, duration),
            flip: () => this.flipTransition(oldPage, newPage, duration)
        };
        
        if (transitions[type]) {
            transitions[type]();
        } else {
            this.fadeTransition(oldPage, newPage, duration);
        }
    }

    fadeTransition(oldPage, newPage, duration) {
        this.fadeOut(oldPage, duration, () => {
            newPage.visible = true;
            newPage.alpha = 0;
            this.fadeIn(newPage, duration);
        });
    }

    slideTransition(oldPage, newPage, duration) {
        gsap.to(oldPage, {
            x: -oldPage.width,
            duration: duration,
            ease: this.easeType
        });
        
        newPage.visible = true;
        newPage.x = newPage.width;
        gsap.to(newPage, {
            x: 0,
            duration: duration,
            ease: this.easeType
        });
    }

    scaleTransition(oldPage, newPage, duration) {
        gsap.to(oldPage, {
            scaleX: 0,
            scaleY: 0,
            duration: duration,
            ease: "back.in(1.7)"
        });
        
        newPage.visible = true;
        newPage.scaleX = newPage.scaleY = 0;
        gsap.to(newPage, {
            scaleX: 1,
            scaleY: 1,
            duration: duration,
            ease: "back.out(1.7)"
        });
    }

    flipTransition(oldPage, newPage, duration) {
        gsap.to(oldPage, {
            scaleX: 0,
            duration: duration,
            ease: this.easeType
        });
        
        newPage.visible = true;
        newPage.scaleX = 0;
        gsap.to(newPage, {
            scaleX: 1,
            duration: duration,
            ease: this.easeType,
            delay: duration / 2
        });
    }

    /**
     * 工具函数：十六进制转 RGB
     */
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 255, g: 255, b: 255 };
    }

    /**
     * 震动效果
     */
    shake(target, intensity = 5, duration = 0.3) {
        if (!target) return;
        
        const originalX = target.x;
        const originalY = target.y;
        
        gsap.to(target, {
            x: originalX + intensity,
            y: originalY + intensity,
            duration: 0.05,
            repeat: 5,
            yoyo: true,
            ease: "none",
            onComplete: () => {
                target.x = originalX;
                target.y = originalY;
            }
        });
    }

    /**
     * 心跳效果
     */
    heartbeat(target, scale = 1.2, duration = 0.6) {
        if (!target) return;
        
        gsap.to(target, {
            scaleX: scale,
            scaleY: scale,
            duration: duration / 2,
            yoyo: true,
            repeat: 1,
            ease: "power1.inOut"
        });
    }

    /**
     * 浮动效果
     */
    float(target, distance = 10, duration = 1.5) {
        if (!target) return;
        
        const originalY = target.y;
        
        gsap.to(target, {
            y: originalY - distance,
            duration: duration / 2,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
        });
    }

    /**
     * 旋转进入动画
     */
    rotateIn(target, duration = 0.5) {
        if (!target) return;
        
        target.scaleX = target.scaleY = 0;
        target.rotation = -180;
        target.visible = true;
        
        gsap.to(target, {
            scaleX: 1,
            scaleY: 1,
            rotation: 0,
            duration: duration,
            ease: "back.out(1.7)"
        });
    }

    /**
     * 清除所有动画
     */
    clearAnimations(target) {
        if (!target) return;
        gsap.killTweensOf(target);
    }
}

// 导出单例
export const animator = new UIAnimator();
export default animator;
