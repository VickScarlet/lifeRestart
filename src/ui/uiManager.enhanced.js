/**
 * UI 管理器 - 增强版
 * 集成动画系统和现代化主题
 */

import { animator } from './animations.js';
import { stellarTheme } from './themes/stellar.js';
import { 
    EnhancedButton, 
    EnhancedCard, 
    EnhancedList,
    EnhancedProgressBar,
    EnhancedDialog,
    Tooltip 
} from './enhanced-components.js';

export class UIManager {
    constructor() {
        this.currentView = null;
        this.views = {};
        this.dialogs = {};
        this.tooltip = new Tooltip();
        this.enhancedComponents = new Map();
    }

    /**
     * 初始化 UI 系统
     */
    init() {
        console.log('🎨 Enhanced UI System Initialized');
        
        // 创建全局粒子背景
        this.createGlobalBackground();
        
        // 设置全局样式
        this.setupGlobalStyles();
    }

    /**
     * 创建全局背景
     */
    createGlobalBackground() {
        this.bgContainer = new Laya.Sprite();
        this.bgContainer.zOrder = -1000;
        Laya.stage.addChild(this.bgContainer);
        
        // 应用星空背景
        stellarTheme.createParticleBackground(this.bgContainer, 50);
        stellarTheme.createStarfield(this.bgContainer);
    }

    /**
     * 设置全局样式
     */
    setupGlobalStyles() {
        // 设置舞台背景
        Laya.stage.bgColor = stellarTheme.colors.background;
        
        // 添加全局渐变
        this.applyGlobalGradient();
    }

    /**
     * 应用全局渐变
     */
    applyGlobalGradient() {
        const gradient = new Laya.Sprite();
        gradient.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height);
        gradient.alpha = 0.1;
        Laya.stage.addChildAt(gradient, 0);
    }

    /**
     * 注册视图
     */
    registerView(name, viewClass) {
        this.views[name] = viewClass;
    }

    /**
     * 切换视图（带动画）
     */
    switchView(viewName, animation = 'fade') {
        const ViewClass = this.views[viewName];
        if (!ViewClass) {
            console.error(`View ${viewName} not found`);
            return;
        }

        const newView = new ViewClass();
        
        if (this.currentView) {
            // 旧视图退出动画
            animator.fadeOut(this.currentView, 0.3, () => {
                Laya.stage.removeChild(this.currentView);
                
                // 新视图入场动画
                newView.alpha = 0;
                Laya.stage.addChild(newView);
                animator.fadeIn(newView, 0.3);
            });
        } else {
            // 首次显示
            newView.alpha = 0;
            Laya.stage.addChild(newView);
            animator.fadeIn(newView, 0.3);
        }

        this.currentView = newView;
    }

    /**
     * 显示对话框（增强版）
     */
    showDialog(dialogName, animation = 'scale') {
        const DialogClass = this.views[dialogName];
        if (!DialogClass) return;

        const dialog = new DialogClass();
        
        const enhancedDialog = new EnhancedDialog(dialog);
        this.dialogs[dialogName] = enhancedDialog;
        enhancedDialog.show(animation);
    }

    /**
     * 隐藏对话框
     */
    hideDialog(dialogName, animation = 'scale') {
        const dialog = this.dialogs[dialogName];
        if (dialog) {
            dialog.hide(animation);
        }
    }

    /**
     * 增强按钮
     */
    enhanceButton(button) {
        if (!button) return null;
        
        const enhanced = new EnhancedButton(button);
        this.enhancedComponents.set(button, enhanced);
        return enhanced;
    }

    /**
     * 增强卡片
     */
    enhanceCard(card) {
        if (!card) return null;
        
        const enhanced = new EnhancedCard(card);
        this.enhancedComponents.set(card, enhanced);
        return enhanced;
    }

    /**
     * 增强列表
     */
    enhanceList(list, options = {}) {
        if (!list) return null;
        
        const enhanced = new EnhancedList(list, options);
        this.enhancedComponents.set(list, enhanced);
        return enhanced;
    }

    /**
     * 增强进度条
     */
    enhanceProgressBar(progressBar, options = {}) {
        if (!progressBar) return null;
        
        const enhanced = new EnhancedProgressBar(progressBar, options);
        this.enhancedComponents.set(progressBar, enhanced);
        return enhanced;
    }

    /**
     * 绑定工具提示
     */
    bindTooltip(target, text) {
        this.tooltip.bind(target, text);
    }

    /**
     * 播放页面切换动画
     */
    playPageTransition(from, to, type = 'fade') {
        animator.pageTransition(from, to, type, 0.4);
    }

    /**
     * 创建加载动画
     */
    createLoadingAnimation(container) {
        const loader = new Laya.Sprite();
        
        // 创建加载圈
        const circle = new Laya.Sprite();
        circle.graphics.drawLine(0, 0, 50, 0, stellarTheme.colors.primary, 3);
        circle.pos(container.width / 2, container.height / 2);
        loader.addChild(circle);

        container.addChild(loader);

        // 旋转动画
        if (window.gsap) {
            gsap.to(circle, {
                rotation: 360,
                duration: 1,
                repeat: -1,
                ease: "none"
            });
        }

        return loader;
    }

    /**
     * 创建成功动画
     */
    showSuccessAnimation(target, onComplete = null) {
        if (!target) return;

        // 缩放弹跳
        gsap.to(target, {
            scaleX: 1.2,
            scaleY: 1.2,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            ease: "power2.out"
        });

        // 颜色变绿
        if (target.graphics) {
            target.graphics.clear();
            target.graphics.drawCircle(0, 0, 50, stellarTheme.colors.success);
        }

        // 粒子效果
        animator.particleExplosion(
            target.x + target.width / 2,
            target.y + target.height / 2,
            20
        );

        if (onComplete) {
            setTimeout(onComplete, 500);
        }
    }

    /**
     * 创建数字增长动画
     */
    animateNumberGrowth(target, from, to, duration = 1) {
        if (!target) return;

        animator.numberRoll(target, from, to, duration);

        // 颜色变化
        if (window.gsap) {
            gsap.to(target, {
                color: stellarTheme.colors.success,
                duration: duration / 2,
                yoyo: true,
                repeat: 1
            });
        }
    }

    /**
     * 清屏动画
     */
    clearScreen(animation = 'fade') {
        if (this.currentView) {
            if (animation === 'fade') {
                animator.fadeOut(this.currentView, 0.5, () => {
                    Laya.stage.removeChild(this.currentView);
                    this.currentView = null;
                });
            } else if (animation === 'scale') {
                animator.scaleOut(this.currentView, 0.5, () => {
                    Laya.stage.removeChild(this.currentView);
                    this.currentView = null;
                });
            }
        }
    }

    /**
     * 显示通知消息
     */
    showNotification(message, type = 'info', duration = 3000) {
        const notification = new Laya.Box();
        notification.bgColor = stellarTheme.colors.backgroundDark;
        notification.borderColor = this.getNotificationColor(type);
        notification.borderWidth = 2;
        notification.cornerRadius = 8;
        notification.size(300, 60);
        notification.pos(Laya.stage.width / 2 - 150, 100);
        notification.alpha = 0;
        
        const label = new Laya.Text();
        label.text = message;
        label.color = stellarTheme.colors.foreground;
        label.fontSize = 14;
        label.alignment = "center";
        label.pos(0, 20);
        label.width = 300;
        notification.addChild(label);

        Laya.stage.addChild(notification);

        // 入场动画
        animator.slideInTop(notification, 0.4);

        // 自动消失
        setTimeout(() => {
            animator.fadeOut(notification, 0.3, () => {
                Laya.stage.removeChild(notification);
            });
        }, duration);
    }

    getNotificationColor(type) {
        const colors = {
            info: stellarTheme.colors.primary,
            success: stellarTheme.colors.success,
            warning: stellarTheme.colors.warning,
            error: stellarTheme.colors.error
        };
        return colors[type] || colors.info;
    }

    /**
     * 应用主题到现有 UI
     */
    applyTheme(ui) {
        if (!ui) return;
        
        stellarTheme.applyThemeToUI(ui);
        
        // 自动增强所有按钮
        const buttons = this.findAllButtons(ui);
        buttons.forEach(btn => this.enhanceButton(btn));
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
     * 递归查找子元素
     */
    findChildrenByType(container, type, result) {
        if (!container || !container.numChildren) return;
        
        for (let i = 0; i < container.numChildren; i++) {
            const child = container.getChildAt(i);
            if (child.constructor && child.constructor.name === type) {
                result.push(child);
            }
            this.findChildrenByType(child, type, result);
        }
    }

    /**
     * 性能优化：批量更新
     */
    batchUpdate(updates) {
        Laya.timer.frameOnce(1, this, () => {
            updates.forEach(update => update());
        });
    }

    /**
     * 销毁资源
     */
    destroy() {
        if (this.bgContainer) {
            Laya.stage.removeChild(this.bgContainer);
            this.bgContainer.destroy();
        }
        
        this.enhancedComponents.clear();
        this.views = {};
        this.dialogs = {};
    }
}

// 导出单例
export const uiManager = new UIManager();
export default uiManager;
