/**
 * ENS 系统集成补丁
 * 将进化式叙事系统集成到 Life 模块
 */

import ENSAdapter from './narrative/ENSAdapter.js';

// 扩展 Life 类以支持 ENS
export function integrateENS(LifeClass) {
    // 保存原始方法
    const originalInitial = LifeClass.prototype.initial;
    const originalNext = LifeClass.prototype.next;
    const originalStart = LifeClass.prototype.start;
    
    // 添加 ENS 相关属性
    LifeClass.prototype.#ensAdapter = null;
    LifeClass.prototype.#ensEnabled = false;
    
    /**
     * 初始化 ENS 系统
     */
    LifeClass.prototype.initializeENS = async function() {
        if (this.#ensEnabled) {
            return true;
        }
        
        try {
            this.#ensAdapter = new ENSAdapter(this);
            await this.#ensAdapter.initialize();
            this.#ensEnabled = true;
            console.log('[Life] ENS system initialized');
            return true;
        } catch (error) {
            console.error('[Life] ENS initialization failed:', error);
            this.#ensEnabled = false;
            return false;
        }
    };
    
    /**
     * 启用/禁用 ENS
     */
    LifeClass.prototype.setENSEnabled = function(enabled) {
        this.#ensEnabled = enabled;
        if (enabled && !this.#ensAdapter) {
            this.initializeENS();
        }
    };
    
    /**
     * 检查 ENS 是否启用
     */
    LifeClass.prototype.isENSEnabled = function() {
        return this.#ensEnabled && this.#ensAdapter !== null;
    };
    
    /**
     * 获取 ENS 适配器
     */
    LifeClass.prototype.getENSAdapter = function() {
        return this.#ensAdapter;
    };
    
    /**
     * 重写 initial 方法以初始化 ENS
     */
    LifeClass.prototype.initial = async function(i18nLoad, commonLoad) {
        // 调用原始 initial 方法
        await originalInitial.call(this, i18nLoad, commonLoad);
        
        // 初始化 ENS（可选）
        // await this.initializeENS();
        
        return true;
    };
    
    /**
     * 重写 next 方法以支持 ENS 叙事循环
     */
    LifeClass.prototype.nextWithENS = async function() {
        // 如果 ENS 启用，使用 ENS 系统
        if (this.#ensEnabled && this.#ensAdapter) {
            try {
                const narrativeResult = await this.#ensAdapter.runNarrativeLoop();
                
                if (narrativeResult) {
                    // 调用原始 next 方法
                    const originalResult = originalNext.call(this);
                    
                    // 合并 ENS 结果
                    return {
                        ...originalResult,
                        narrative: narrativeResult
                    };
                }
            } catch (error) {
                console.error('[Life] ENS next error:', error);
                // 回退到原始方法
            }
        }
        
        // 默认使用原始方法
        return originalNext.call(this);
    };
    
    /**
     * 处理 ENS 玩家选择
     */
    LifeClass.prototype.handleENSChoice = async function(branchId) {
        if (!this.#ensEnabled || !this.#ensAdapter) {
            return { success: false, error: 'ENS not enabled' };
        }
        
        return await this.#ensAdapter.handlePlayerChoice(branchId);
    };
    
    /**
     * 获取叙事倾向
     */
    LifeClass.prototype.getNarrativeDisposition = function() {
        if (!this.#ensAdapter) {
            return null;
        }
        
        return this.#ensAdapter.getNarrativeDisposition();
    };
    
    /**
     * 导出 ENS 状态
     */
    LifeClass.prototype.exportENSState = function() {
        if (!this.#ensAdapter) {
            return null;
        }
        
        return this.#ensAdapter.exportState();
    };
    
    /**
     * 导入 ENS 状态
     */
    LifeClass.prototype.importENSState = function(state) {
        if (!this.#ensAdapter) {
            return false;
        }
        
        return this.#ensAdapter.importState(state);
    };
    
    /**
     * 重置 ENS
     */
    LifeClass.prototype.resetENS = function() {
        if (this.#ensAdapter) {
            this.#ensAdapter.reset();
        }
    };
    
    return LifeClass;
}

/**
 * 创建集成 ENS 的 Life 实例
 */
export function createLifeWithENS() {
    // 动态导入 Life 类
    return import('./life.js').then(({ default: LifeClass }) => {
        const EnhancedLife = integrateENS(LifeClass);
        return new EnhancedLife();
    });
}

export default integrateENS;
