/**
 * 剧情状态追踪系统
 * Narrative State Tracker - 全局追踪剧情状态
 */

export default class NarrativeStateTracker {
    constructor() {
        // 节点触发状态
        this.nodeStates = new Map();
        
        // 路径激活状态
        this.pathStates = new Map();
        
        // 分支选择状态
        this.branchStates = new Map();
        
        // 叙事基因库
        this.narrativeGenes = new Set();
        
        // 全局标记
        this.globalFlags = new Map();
        
        // 时间线记录
        this.timeline = [];
        this.maxTimelineLength = 200;
        
        // 上下文栈
        this.contextStack = [];
        
        // 监听器
        this.listeners = new Map();
        
        // 时间上下文
        this.temporalContext = {
            currentAge: 0,
            currentTurn: 0,
            startTime: Date.now()
        };
    }
    
    /**
     * 记录节点触发
     */
    trackNodeTrigger(node, context) {
        const state = {
            nodeId: node.id,
            triggeredAt: Date.now(),
            context: this.sanitizeContext(context),
            triggerCount: (this.nodeStates.get(node.id)?.triggerCount || 0) + 1,
            age: context.age || this.temporalContext.currentAge,
            turn: context.turn || this.temporalContext.currentTurn
        };
        
        this.nodeStates.set(node.id, state);
        this.addToTimeline({
            type: 'node_trigger',
            timestamp: state.triggeredAt,
            nodeId: node.id,
            context: state.context
        });
        
        // 通知监听器
        this.notifyListeners('nodeTriggered', { node, state });
        
        // 应用节点效应到追踪器
        if (node.effects) {
            this.applyNodeEffects(node.effects);
        }
    }
    
    /**
     * 记录分支选择
     */
    trackBranchSelection(branch, context) {
        const state = {
            branchId: branch.id,
            selectedAt: Date.now(),
            sourceNode: branch.sourceNode,
            targetNode: branch.targetNode,
            context: this.sanitizeContext(context)
        };
        
        this.branchStates.set(branch.id, state);
        this.addToTimeline({
            type: 'branch_select',
            timestamp: state.selectedAt,
            branchId: branch.id,
            sourceNode: branch.sourceNode,
            targetNode: branch.targetNode
        });
        
        // 标记分支为已选择
        if (branch.markAsSelected) {
            branch.markAsSelected();
        }
        
        // 通知监听器
        this.notifyListeners('branchSelected', { branch, state });
    }
    
    /**
     * 激活路径
     */
    activatePath(pathId) {
        this.pathStates.set(pathId, {
            active: true,
            activatedAt: Date.now()
        });
        
        this.addToTimeline({
            type: 'path_activate',
            pathId,
            timestamp: Date.now()
        });
        
        this.notifyListeners('pathActivated', { pathId });
    }
    
    /**
     * 停用路径
     */
    deactivatePath(pathId) {
        if (this.pathStates.has(pathId)) {
            const state = this.pathStates.get(pathId);
            state.active = false;
            state.deactivatedAt = Date.now();
            
            this.addToTimeline({
                type: 'path_deactivate',
                pathId,
                timestamp: Date.now()
            });
            
            this.notifyListeners('pathDeactivated', { pathId });
        }
    }
    
    /**
     * 检查节点是否已触发
     */
    hasNodeTriggered(nodeId) {
        return this.nodeStates.has(nodeId);
    }
    
    /**
     * 获取节点触发状态
     */
    getNodeState(nodeId) {
        return this.nodeStates.get(nodeId) || null;
    }
    
    /**
     * 获取路径激活状态
     */
    isPathActive(pathId) {
        const state = this.pathStates.get(pathId);
        return state ? state.active : false;
    }
    
    /**
     * 设置全局标记
     */
    setGlobalFlag(flag, value) {
        const oldValue = this.globalFlags.get(flag);
        this.globalFlags.set(flag, value);
        
        if (oldValue !== value) {
            this.addToTimeline({
                type: 'flag_set',
                flag,
                value,
                timestamp: Date.now()
            });
            
            this.notifyListeners('flagChanged', { flag, value, oldValue });
        }
    }
    
    /**
     * 获取全局标记
     */
    getGlobalFlag(flag, defaultValue = null) {
        return this.globalFlags.has(flag) ? this.globalFlags.get(flag) : defaultValue;
    }
    
    /**
     * 添加叙事基因
     */
    addGene(gene) {
        this.narrativeGenes.add(gene);
        this.notifyListeners('geneAdded', { gene });
    }
    
    /**
     * 移除叙事基因
     */
    removeGene(gene) {
        this.narrativeGenes.delete(gene);
        this.notifyListeners('geneRemoved', { gene });
    }
    
    /**
     * 检查是否有某叙事基因
     */
    hasGene(gene) {
        return this.narrativeGenes.has(gene);
    }
    
    /**
     * 更新时间上下文
     */
    updateTemporalContext(context) {
        if (context.age !== undefined) {
            this.temporalContext.currentAge = context.age;
        }
        if (context.turn !== undefined) {
            this.temporalContext.currentTurn = context.turn;
        }
    }
    
    /**
     * 获取叙事连贯性上下文
     */
    getCoherenceContext() {
        return {
            triggeredNodes: Array.from(this.nodeStates.keys()),
            activePaths: Array.from(this.pathStates.entries())
                .filter(([_, state]) => state.active)
                .map(([id, _]) => id),
            selectedBranches: Array.from(this.branchStates.keys()),
            genes: Array.from(this.narrativeGenes),
            flags: Object.fromEntries(this.globalFlags),
            recentHistory: this.timeline.slice(-20),
            temporalContext: { ...this.temporalContext }
        };
    }
    
    /**
     * 检查节点前置条件
     */
    checkNodePrerequisites(node) {
        const prereq = node.prerequisites;
        
        // 检查必须的前置节点
        for (const requiredId of prereq.required) {
            if (!this.nodeStates.has(requiredId)) {
                return {
                    passed: false,
                    reason: `缺少前置节点：${requiredId}`
                };
            }
        }
        
        // 检查禁止的前置节点
        for (const forbiddenId of prereq.forbidden) {
            if (this.nodeStates.has(forbiddenId)) {
                return {
                    passed: false,
                    reason: `存在禁止节点：${forbiddenId}`
                };
            }
        }
        
        // 检查全局标记
        for (const [flag, value] of Object.entries(prereq.requiredFlags || {})) {
            if (this.getGlobalFlag(flag) !== value) {
                return {
                    passed: false,
                    reason: `缺少标记：${flag}`
                };
            }
        }
        
        for (const [flag, value] of Object.entries(prereq.forbiddenFlags || {})) {
            if (this.getGlobalFlag(flag) === value) {
                return {
                    passed: false,
                    reason: `存在禁止标记：${flag}`
                };
            }
        }
        
        // 检查动态条件
        for (const condition of prereq.conditions) {
            if (typeof condition === 'function') {
                try {
                    if (!condition(this)) {
                        return {
                            passed: false,
                            reason: '动态条件不满足'
                        };
                    }
                } catch (error) {
                    console.error('Condition check error:', error);
                    return {
                        passed: false,
                        reason: '条件检查出错'
                    };
                }
            }
        }
        
        return { passed: true };
    }
    
    /**
     * 应用节点效应
     */
    applyNodeEffects(effects) {
        if (!effects) return;
        
        // 设置标记
        if (effects.flagSet) {
            Object.entries(effects.flagSet).forEach(([flag, value]) => {
                this.setGlobalFlag(flag, value);
            });
        }
        
        // 解锁路径
        if (effects.pathUnlocks) {
            effects.pathUnlocks.forEach(pathId => {
                this.activatePath(pathId);
            });
        }
        
        // 锁定路径
        if (effects.pathLocks) {
            effects.pathLocks.forEach(pathId => {
                this.deactivatePath(pathId);
            });
        }
        
        // 添加基因
        if (effects.geneAdd) {
            effects.geneAdd.forEach(gene => {
                this.addGene(gene);
            });
        }
        
        // 移除基因
        if (effects.geneRemove) {
            effects.geneRemove.forEach(gene => {
                this.removeGene(gene);
            });
        }
    }
    
    /**
     * 添加到时间线
     */
    addToTimeline(event) {
        this.timeline.push(event);
        
        // 限制时间线长度
        if (this.timeline.length > this.maxTimelineLength) {
            this.timeline = this.timeline.slice(-this.maxTimelineLength);
        }
    }
    
    /**
     * 清理上下文（移除不可序列化的数据）
     */
    sanitizeContext(context) {
        if (!context) return null;
        
        const sanitized = {};
        for (const [key, value] of Object.entries(context)) {
            if (typeof value !== 'function' && typeof value !== 'symbol') {
                sanitized[key] = value;
            }
        }
        return sanitized;
    }
    
    /**
     * 添加监听器
     */
    addListener(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        this.listeners.get(event).add(callback);
    }
    
    /**
     * 移除监听器
     */
    removeListener(event, callback) {
        if (this.listeners.has(event)) {
            this.listeners.get(event).delete(callback);
        }
    }
    
    /**
     * 通知监听器
     */
    notifyListeners(event, data) {
        if (this.listeners.has(event)) {
            this.listeners.get(event).forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`Listener error for ${event}:`, error);
                }
            });
        }
    }
    
    /**
     * 获取已触发节点数量
     */
    getTriggeredNodesCount() {
        return this.nodeStates.size;
    }
    
    /**
     * 获取活跃路径数量
     */
    getActivePathsCount() {
        return Array.from(this.pathStates.values())
            .filter(state => state.active).length;
    }
    
    /**
     * 导出状态
     */
    exportState() {
        return {
            nodeStates: Object.fromEntries(this.nodeStates),
            pathStates: Object.fromEntries(this.pathStates),
            branchStates: Object.fromEntries(this.branchStates),
            narrativeGenes: Array.from(this.narrativeGenes),
            globalFlags: Object.fromEntries(this.globalFlags),
            timeline: [...this.timeline],
            temporalContext: { ...this.temporalContext }
        };
    }
    
    /**
     * 导入状态
     */
    importState(state) {
        if (state.nodeStates) {
            this.nodeStates = new Map(Object.entries(state.nodeStates));
        }
        if (state.pathStates) {
            this.pathStates = new Map(Object.entries(state.pathStates));
        }
        if (state.branchStates) {
            this.branchStates = new Map(Object.entries(state.branchStates));
        }
        if (state.narrativeGenes) {
            this.narrativeGenes = new Set(state.narrativeGenes);
        }
        if (state.globalFlags) {
            this.globalFlags = new Map(Object.entries(state.globalFlags));
        }
        if (state.timeline) {
            this.timeline = [...state.timeline];
        }
        if (state.temporalContext) {
            this.temporalContext = { ...state.temporalContext };
        }
    }
    
    /**
     * 重置所有状态
     */
    reset() {
        this.nodeStates.clear();
        this.pathStates.clear();
        this.branchStates.clear();
        this.narrativeGenes.clear();
        this.globalFlags.clear();
        this.timeline = [];
        this.temporalContext = {
            currentAge: 0,
            currentTurn: 0,
            startTime: Date.now()
        };
    }
}
