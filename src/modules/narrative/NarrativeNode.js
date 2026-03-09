/**
 * 剧情节点类
 * Narrative Node - 剧情的基本组成单元
 */

export default class NarrativeNode {
    constructor(config) {
        // 基础属性
        this.id = config.id;
        this.type = config.type || 'normal';  // normal, branch, ending, special
        this.name = config.name || '';
        this.content = config.content || '';
        this.tags = config.tags || [];
        this.priority = config.priority || 5;  // 1-10，影响触发概率
        
        // 一次性节点
        this.onceOnly = config.onceOnly || false;
        this.requireTagMatch = config.requireTagMatch || false;
        
        // 前置条件系统
        this.prerequisites = {
            required: config.requiredNodes || [],      // 必须触发过的前置节点 ID
            forbidden: config.forbiddenNodes || [],    // 不能触发过的前置节点 ID
            conditions: config.conditions || [],       // 动态条件检查函数数组
            minAge: config.minAge || 0,                // 最小年龄
            maxAge: config.maxAge || Infinity,         // 最大年龄
            requiredFlags: config.requiredFlags || {}, // 需要的全局标记
            forbiddenFlags: config.forbiddenFlags || {}// 禁止的全局标记
        };
        
        // 后置效应系统
        this.effects = {
            propertyChanges: config.propertyChanges || {},  // 属性变化 {CHR: 5, INT: -2}
            flagSet: config.flagSet || {},                  // 标记设置 {flag: true}
            eventTriggers: config.eventTriggers || [],      // 触发的事件 ID 列表
            pathUnlocks: config.pathUnlocks || [],          // 解锁的路径 ID
            pathLocks: config.pathLocks || [],              // 锁定的路径 ID
            geneAdd: config.geneAdd || [],                  // 添加的叙事基因
            geneRemove: config.geneRemove || []             // 移除的叙事基因
        };
        
        // 叙事连贯性保障
        this.coherence = {
            contextReferences: config.contextReferences || [],  // 需要引用的上下文
            callback: config.callback || null,                  // 触发后的回调函数
            validation: config.validation || null               // 连贯性验证函数
        };
        
        // 分支出口（在系统加载时建立）
        this.outgoingBranches = null;
        
        // 状态追踪
        this.state = {
            triggered: false,           // 是否已触发
            triggerCount: 0,            // 触发次数
            lastTriggerTime: null,      // 最后触发时间戳
            triggerContext: null        // 最后一次触发时的上下文
        };
        
        // 验证配置有效性
        this.validate();
    }
    
    /**
     * 验证节点配置
     */
    validate() {
        if (!this.id) {
            throw new Error('NarrativeNode must have an id');
        }
        
        if (this.priority < 1 || this.priority > 10) {
            console.warn(`Node ${this.id}: priority should be between 1 and 10`);
        }
        
        // 验证类型
        const validTypes = ['normal', 'branch', 'ending', 'special', 'default_placeholder'];
        if (!validTypes.includes(this.type)) {
            throw new Error(`Invalid node type: ${this.type}`);
        }
    }
    
    /**
     * 检查节点是否可用
     */
    isAvailable(context, stateTracker) {
        // 检查一次性节点
        if (this.onceOnly && this.state.triggered) {
            return { available: false, reason: 'Already triggered' };
        }
        
        // 检查年龄
        if (context.age) {
            if (context.age < this.prerequisites.minAge) {
                return { available: false, reason: 'Too young' };
            }
            if (context.age > this.prerequisites.maxAge) {
                return { available: false, reason: 'Too old' };
            }
        }
        
        // 检查前置节点
        for (const requiredId of this.prerequisites.required) {
            if (!stateTracker.hasNodeTriggered(requiredId)) {
                return { available: false, reason: `Missing prerequisite: ${requiredId}` };
            }
        }
        
        for (const forbiddenId of this.prerequisites.forbidden) {
            if (stateTracker.hasNodeTriggered(forbiddenId)) {
                return { available: false, reason: `Forbidden prerequisite: ${forbiddenId}` };
            }
        }
        
        // 检查全局标记
        for (const [flag, value] of Object.entries(this.prerequisites.requiredFlags)) {
            if (stateTracker.getGlobalFlag(flag) !== value) {
                return { available: false, reason: `Missing flag: ${flag}` };
            }
        }
        
        for (const [flag, value] of Object.entries(this.prerequisites.forbiddenFlags)) {
            if (stateTracker.getGlobalFlag(flag) === value) {
                return { available: false, reason: `Forbidden flag: ${flag}` };
            }
        }
        
        // 检查动态条件
        for (const condition of this.prerequisites.conditions) {
            if (typeof condition === 'function') {
                if (!condition(stateTracker, context)) {
                    return { available: false, reason: 'Dynamic condition failed' };
                }
            }
        }
        
        return { available: true };
    }
    
    /**
     * 触发节点
     */
    trigger(context) {
        this.state.triggered = true;
        this.state.triggerCount++;
        this.state.lastTriggerTime = Date.now();
        this.state.triggerContext = { ...context };
        
        return {
            id: this.id,
            type: this.type,
            content: this.content,
            effects: this.effects
        };
    }
    
    /**
     * 重置节点状态
     */
    reset() {
        this.state = {
            triggered: false,
            triggerCount: 0,
            lastTriggerTime: null,
            triggerContext: null
        };
    }
    
    /**
     * 获取节点信息
     */
    getInfo() {
        return {
            id: this.id,
            type: this.type,
            name: this.name,
            tags: this.tags,
            priority: this.priority,
            onceOnly: this.onceOnly,
            triggered: this.state.triggered,
            triggerCount: this.state.triggerCount
        };
    }
}
