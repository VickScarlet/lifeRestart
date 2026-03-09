/**
 * 概率触发机制
 * Probabilistic Event System - 动态概率事件系统
 */

export default class ProbabilisticEventSystem {
    constructor() {
        this.eventPool = new Map();           // 事件池
        this.templates = new Map();           // 事件模板
        this.activeModifiers = new Map();     // 激活的修正器
        this.history = [];                    // 触发历史
        this.contextWeights = new Map();      // 上下文权重
        this.globalWeights = new Map();       // 全局权重
        this.maxHistoryLength = 50;
    }
    
    /**
     * 加载事件模板
     */
    async loadTemplates(eventsData) {
        if (!eventsData || !Array.isArray(eventsData)) return;
        
        for (const eventData of eventsData) {
            this.templates.set(eventData.id, eventData);
        }
    }
    
    /**
     * 加权随机选择
     */
    weightedRandomSelect(candidates, context) {
        if (candidates.length === 0) return null;
        if (candidates.length === 1) return candidates[0];
        
        // 计算每个候选的权重
        const weights = candidates.map(candidate => {
            let weight = candidate.probability?.base || 1.0;
            
            // 应用上下文权重
            const contextKey = this.getContextKey(candidate, context);
            if (this.contextWeights.has(contextKey)) {
                weight *= this.contextWeights.get(contextKey);
            }
            
            // 应用全局权重
            if (candidate.id && this.globalWeights.has(candidate.id)) {
                weight *= this.globalWeights.get(candidate.id);
            }
            
            // 应用历史修正（避免重复）
            if (this.hasRecentlyTriggered(candidate.id)) {
                weight *= this.getRecencyPenalty(candidate.id);
            }
            
            // 应用动态修正器
            if (candidate.probability?.dynamicMods) {
                candidate.probability.dynamicMods.forEach(mod => {
                    if (typeof mod === 'function') {
                        weight = mod(weight, context);
                    }
                });
            }
            
            return Math.max(0, weight);
        });
        
        // 轮盘赌选择
        const totalWeight = weights.reduce((sum, w) => sum + w, 0);
        let random = Math.random() * totalWeight;
        
        for (let i = 0; i < candidates.length; i++) {
            random -= weights[i];
            if (random <= 0) {
                return candidates[i];
            }
        }
        
        return candidates[candidates.length - 1];
    }
    
    /**
     * 动态调整事件概率
     */
    adjustProbability(eventId, modifier, duration = null) {
        const current = this.contextWeights.get(eventId) || 1.0;
        this.contextWeights.set(eventId, current * modifier);
        
        if (duration !== null) {
            setTimeout(() => {
                this.adjustProbability(eventId, 1 / modifier, 0);
            }, duration);
        }
    }
    
    /**
     * 调整全局权重
     */
    adjustGlobalWeight(category, modifier) {
        const current = this.globalWeights.get(category) || 1.0;
        this.globalWeights.set(category, current * modifier);
    }
    
    /**
     * 获取上下文权重
     */
    getContextWeight(contextKey) {
        return this.contextWeights.get(contextKey) || 1.0;
    }
    
    /**
     * 检查是否最近触发过
     */
    hasRecentlyTriggered(eventId, window = 5) {
        if (!eventId) return false;
        
        const recentEvents = this.history.slice(-window);
        return recentEvents.some(event => event.id === eventId);
    }
    
    /**
     * 获取重复触发惩罚
     */
    getRecencyPenalty(eventId) {
        const triggers = this.history.filter(event => event.id === eventId);
        if (triggers.length === 0) return 1.0;
        
        const lastTrigger = triggers[triggers.length - 1];
        const timeSinceLast = Date.now() - lastTrigger.timestamp;
        
        // 5 分钟内触发过，降低概率
        if (timeSinceLast < 300000) {
            return 0.5;
        }
        
        return 1.0;
    }
    
    /**
     * 记录事件触发
     */
    recordEvent(event) {
        this.history.push({
            id: event.id,
            timestamp: Date.now(),
            context: event.context
        });
        
        // 限制历史记录长度
        if (this.history.length > this.maxHistoryLength) {
            this.history.shift();
        }
    }
    
    /**
     * 生成上下文键
     */
    getContextKey(candidate, context) {
        if (candidate.id) return `event_${candidate.id}`;
        return `event_${Date.now()}`;
    }
    
    /**
     * 清除所有权重修正
     */
    clearWeights() {
        this.contextWeights.clear();
        this.globalWeights.clear();
    }
    
    /**
     * 重置系统
     */
    reset() {
        this.history = [];
        this.clearWeights();
    }
}
