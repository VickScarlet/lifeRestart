/**
 * 现代化 UI 主题系统 - "Stellar" 主题
 * 具有唯美视觉效果的界面主题
 */

class StellarTheme {
    constructor() {
        // 主题配色方案
        this.colors = {
            // 主色调 - 星空渐变
            primary: "#6366F1",
            primaryLight: "#818CF8",
            primaryDark: "#4F46E5",
            
            // 辅助色 - 星云紫
            secondary: "#EC4899",
            secondaryLight: "#F472B6",
            secondaryDark: "#DB2777",
            
            // 背景色 - 深空黑
            background: "#0F172A",
            backgroundLight: "#1E293B",
            backgroundDark: "#020617",
            
            // 前景色 - 星光白
            foreground: "#F8FAFC",
            foregroundLight: "#E2E8F0",
            foregroundDark: "#94A3B8",
            
            // 强调色 - 晨曦金
            accent: "#F59E0B",
            accentLight: "#FBBF24",
            accentDark: "#D97706",
            
            // 成功/警告/错误
            success: "#10B981",
            warning: "#F59E0B",
            error: "#EF4444",
            
            // 渐变配置
            gradients: {
                primary: ["#6366F1", "#EC4899"],
                background: ["#0F172A", "#1E293B", "#0F172A"],
                button: ["#6366F1", "#8B5CF6"],
                card: ["#1E293B", "#0F172A"]
            }
        };

        // 动画配置
        this.animations = {
            duration: {
                fast: 0.2,
                normal: 0.3,
                slow: 0.5
            },
            easing: {
                default: "power2.out",
                bounce: "back.out(1.7)",
                smooth: "sine.inOut"
            },
            effects: {
                hover: { scale: 1.05, duration: 0.2 },
                click: { scale: 0.95, duration: 0.1 },
                focus: { scale: 1.02, duration: 0.15 }
            }
        };

        // 视觉效果配置
        this.effects = {
            // 阴影效果
            shadows: {
                small: "0 2px 4px rgba(0,0,0,0.3)",
                medium: "0 4px 8px rgba(0,0,0,0.4)",
                large: "0 8px 16px rgba(0,0,0,0.5)",
                glow: "0 0 20px rgba(99, 102, 241, 0.5)",
                glowStrong: "0 0 30px rgba(99, 102, 241, 0.7)"
            },
            
            // 圆角配置
            borderRadius: {
                small: 4,
                medium: 8,
                large: 12,
                round: 9999
            },
            
            // 模糊效果
            blur: {
                small: 4,
                medium: 8,
                large: 16
            }
        };
    }

    /**
     * 应用主题到按钮
     */
    applyButtonTheme(button, type = 'primary') {
        if (!button) return;

        const colors = this.getButtonColors(type);
        
        // 设置按钮样式
        button.bgColor = colors.bg;
        button.textColor = colors.text;
        
        // 添加渐变效果
        if (colors.gradient) {
            this.applyGradient(button, colors.gradient);
        }
        
        // 添加阴影
        this.applyShadow(button, 'medium');
        
        // 添加圆角
        this.applyBorderRadius(button, 'medium');
        
        // 绑定交互动画
        this.bindButtonInteraction(button);
    }

    /**
     * 应用主题到面板/卡片
     */
    applyPanelTheme(panel, type = 'default') {
        if (!panel) return;

        const colors = this.getPanelColors(type);
        
        // 设置背景
        panel.bgColor = colors.bg || this.colors.backgroundLight;
        
        // 添加渐变
        if (colors.gradient) {
            this.applyGradient(panel, colors.gradient);
        }
        
        // 添加边框
        this.applyBorder(panel, 1, colors.border || this.colors.primary);
        
        // 添加阴影
        this.applyShadow(panel, 'large');
        
        // 添加圆角
        this.applyBorderRadius(panel, 'large');
        
        // 添加毛玻璃效果
        this.applyGlassmorphism(panel);
    }

    /**
     * 应用主题到文本
     */
    applyTextTheme(text, type = 'default') {
        if (!text) return;

        const colors = this.getTextColors(type);
        
        text.color = colors.text || this.colors.foreground;
        text.font = "方正像素12";
        
        // 添加发光效果
        if (type === 'glow') {
            this.applyTextGlow(text);
        }
    }

    /**
     * 应用渐变效果
     */
    applyGradient(target, colors) {
        if (!target || !colors) return;
        
        const graphics = target.graphics;
        if (!graphics) return;
        
        const width = target.width || 200;
        const height = target.height || 50;
        
        graphics.clear();
        graphics.drawRect(0, 0, width, height);
        
        // 创建线性渐变
        const matrix = new Laya.Matrix();
        matrix.rotate(Math.PI / 4); // 45 度渐变
        
        const gradient = new Laya.RadialGradFill();
        gradient.colors = [0, colors[0], 1, colors[1]];
        
        // 注意：LayaAir 的渐变支持有限，这里使用简化方案
        target.bgColor = colors[0];
    }

    /**
     * 应用阴影效果
     */
    applyShadow(target, size = 'medium') {
        if (!target) return;
        
        const shadow = this.effects.shadows[size] || this.effects.shadows.medium;
        
        // LayaAir 阴影实现
        target.shadowColor = "rgba(0, 0, 0, 0.5)";
        target.shadowOffsetX = 4;
        target.shadowOffsetY = 4;
        target.shadowBlur = 8;
    }

    /**
     * 应用圆角
     */
    applyBorderRadius(target, size = 'medium') {
        if (!target) return;
        
        const radius = this.effects.borderRadius[size] || this.effects.borderRadius.medium;
        target.cornerRadius = radius;
    }

    /**
     * 应用边框
     */
    applyBorder(target, width = 1, color = null) {
        if (!target) return;
        
        target.lineColor = color || this.colors.primary;
        target.lineWidth = width;
    }

    /**
     * 应用毛玻璃效果
     */
    applyGlassmorphism(target) {
        if (!target) return;
        
        // 设置半透明背景
        target.alpha = 0.9;
        
        // 添加模糊滤镜（如果支持）
        if (target.filters) {
            target.filters = [
                new Laya.BlurFilter(this.effects.blur.medium)
            ];
        }
    }

    /**
     * 应用文本发光效果
     */
    applyTextGlow(text) {
        if (!text) return;
        
        text.strokeColor = this.colors.primary;
        text.stroke = 2;
        
        if (text.filters) {
            text.filters = [
                new Laya.GlowFilter(this.colors.primary, 1, 0, 0, 10)
            ];
        }
    }

    /**
     * 绑定按钮交互动画
     */
    bindButtonInteraction(button) {
        if (!button) return;

        const anim = this.animations;
        
        // 悬停效果
        button.on(Laya.Event.MOUSE_OVER, this, () => {
            if (window.gsap) {
                gsap.to(button, {
                    scaleX: anim.effects.hover.scale,
                    scaleY: anim.effects.hover.scale,
                    duration: anim.effects.hover.duration,
                    ease: anim.easing.default
                });
            }
        });

        // 离开效果
        button.on(Laya.Event.MOUSE_OUT, this, () => {
            if (window.gsap) {
                gsap.to(button, {
                    scaleX: 1,
                    scaleY: 1,
                    duration: anim.effects.hover.duration,
                    ease: anim.easing.default
                });
            }
        });

        // 点击效果
        button.on(Laya.Event.MOUSE_DOWN, this, () => {
            if (window.gsap) {
                gsap.to(button, {
                    scaleX: anim.effects.click.scale,
                    scaleY: anim.effects.click.scale,
                    duration: anim.effects.click.duration,
                    ease: anim.easing.default
                });
            }
        });

        // 释放效果
        button.on(Laya.Event.MOUSE_UP, this, () => {
            if (window.gsap) {
                gsap.to(button, {
                    scaleX: anim.effects.hover.scale,
                    scaleY: anim.effects.hover.scale,
                    duration: anim.effects.click.duration,
                    ease: anim.easing.default
                });
            }
        });
    }

    /**
     * 获取按钮颜色配置
     */
    getButtonColors(type) {
        const configs = {
            primary: {
                bg: this.colors.primary,
                text: this.colors.foreground,
                gradient: this.colors.gradients.button
            },
            secondary: {
                bg: this.colors.secondary,
                text: this.colors.foreground,
                gradient: [this.colors.secondary, this.colors.secondaryLight]
            },
            success: {
                bg: this.colors.success,
                text: this.colors.foreground
            },
            warning: {
                bg: this.colors.warning,
                text: this.colors.foreground
            },
            error: {
                bg: this.colors.error,
                text: this.colors.foreground
            },
            outline: {
                bg: 'transparent',
                text: this.colors.primary,
                border: this.colors.primary
            }
        };
        
        return configs[type] || configs.primary;
    }

    /**
     * 获取面板颜色配置
     */
    getPanelColors(type) {
        const configs = {
            default: {
                bg: this.colors.backgroundLight,
                gradient: this.colors.gradients.card,
                border: this.colors.primary
            },
            dark: {
                bg: this.colors.backgroundDark,
                gradient: this.colors.gradients.background,
                border: this.colors.primaryDark
            },
            light: {
                bg: this.colors.foregroundLight,
                border: this.colors.primaryLight
            }
        };
        
        return configs[type] || configs.default;
    }

    /**
     * 获取文本颜色配置
     */
    getTextColors(type) {
        const configs = {
            default: {
                text: this.colors.foreground
            },
            primary: {
                text: this.colors.primary
            },
            secondary: {
                text: this.colors.secondary
            },
            accent: {
                text: this.colors.accent
            },
            glow: {
                text: this.colors.foreground,
                glow: this.colors.primary
            }
        };
        
        return configs[type] || configs.default;
    }

    /**
     * 创建粒子背景效果
     */
    createParticleBackground(container, count = 50) {
        if (!container) return;
        
        const particles = [];
        
        for (let i = 0; i < count; i++) {
            const particle = new Laya.Sprite();
            particle.graphics.drawCircle(0, 0, Math.random() * 2 + 1, this.colors.foreground);
            particle.pos(
                Math.random() * Laya.stage.width,
                Math.random() * Laya.stage.height
            );
            particle.alpha = Math.random() * 0.5 + 0.3;
            
            container.addChild(particle);
            particles.push(particle);
            
            // 添加浮动动画
            if (window.gsap) {
                gsap.to(particle, {
                    y: particle.y - 20 - Math.random() * 30,
                    alpha: 0.1,
                    duration: 2 + Math.random() * 3,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
            }
        }
        
        return particles;
    }

    /**
     * 应用主题到整个界面
     */
    applyThemeToUI(ui) {
        if (!ui) return;
        
        // 应用背景渐变
        this.applyBackgroundGradient(ui);
        
        // 查找所有按钮并应用主题
        const buttons = this.findAllButtons(ui);
        buttons.forEach(btn => this.applyButtonTheme(btn, 'primary'));
        
        // 查找所有面板并应用主题
        const panels = this.findAllPanels(ui);
        panels.forEach(panel => this.applyPanelTheme(panel, 'default'));
    }

    /**
     * 应用背景渐变
     */
    applyBackgroundGradient(ui) {
        if (!ui || !ui.graphics) return;
        
        ui.bgColor = this.colors.background;
        
        // 创建星空背景效果
        this.createStarfield(ui);
    }

    /**
     * 创建星空背景
     */
    createStarfield(container) {
        const starCount = 100;
        
        for (let i = 0; i < starCount; i++) {
            const star = new Laya.Sprite();
            const size = Math.random() * 1.5;
            star.graphics.drawCircle(0, 0, size, "#FFFFFF");
            star.pos(
                Math.random() * Laya.stage.width,
                Math.random() * Laya.stage.height
            );
            star.alpha = Math.random() * 0.8 + 0.2;
            
            container.addChild(star);
            
            // 闪烁效果
            if (window.gsap) {
                gsap.to(star, {
                    alpha: 0.2,
                    duration: 1 + Math.random() * 2,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
            }
        }
    }

    /**
     * 查找所有按钮
     */
    findAllButtons(container) {
        const buttons = [];
        this.findChildrenByType(container, 'Button', buttons);
        return buttons;
    }

    /**
     * 查找所有面板
     */
    findAllPanels(container) {
        const panels = [];
        this.findChildrenByType(container, 'Box', panels);
        this.findChildrenByType(container, 'Panel', panels);
        return panels;
    }

    /**
     * 递归查找子元素
     */
    findChildrenByType(container, type, result) {
        if (!container || !container.numChildren) return;
        
        for (let i = 0; i < container.numChildren; i++) {
            const child = container.getChildAt(i);
            if (child instanceof Laya[type] || 
                (child.constructor && child.constructor.name === type)) {
                result.push(child);
            }
            this.findChildrenByType(child, type, result);
        }
    }
}

// 导出单例
const stellarTheme = new StellarTheme();
export { stellarTheme, StellarTheme };
export default stellarTheme;
