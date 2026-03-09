/**
 * 叙事连贯性引擎
 * Coherence Engine - 确保剧情连贯性
 */

export default class CoherenceEngine {
    constructor(config = {}) {
        this.rules = new Map();           // 连贯性规则
        this.validators = new Map();      // 验证器
        this.contradictions = new Set();  // 已知的矛盾组合
        this.config = config;
        
        // 加载默认规则
        this.loadDefaultRules();
    }
    
    /**
     * 加载默认连贯性规则
     */
    loadDefaultRules() {
        // 规则 1: 不能同时触发矛盾的节点
        this.addRule('no_contradiction', (node, context) => {
            const triggeredNodes = context.triggeredNodes || [];
            
            // 检查矛盾组合
            for (const [pair] of this.contradictions) {
                const [node1, node2] = pair.split(':');
                if ((node.id === node1 && triggeredNodes.includes(node2)) ||
                    (node.id === node2 && triggeredNodes.includes(node1))) {
                    return false;
                }
            }
            return true;
        });
        
        // 规则 2: 时间线一致性
        this.addRule('timeline_consistency', (node, context) => {
            const recentHistory = context.recentHistory || [];
            
            // 检查是否有时间倒流等不合理情况
            for (let i = recentHistory.length - 1; i > 0; i--) {
                if (recentHistory[i].timestamp > recentHistory[i-1].timestamp) {
                    // 时间顺序异常
                    return false;
                }
            }
            return true;
        });
        
        // 规则 3: 叙事节奏检查
        this.addRule('pacing_check', (node, context) => {
            const recentHighPriority = context.recentHistory?.filter(
                event => event.priority >= 8
            ).length || 0;
            
            // 避免连续高潮
            if (recentHighPriority >= 3 && node.priority >= 8) {
                return false;
            }
            return true;
        });
    }
    
    /**
     * 加载规则
     */
    loadRules(rulesData) {
        if (!rulesData || !Array.isArray(rulesData)) return;
        
        for (const ruleData of rulesData) {
            this.addRule(ruleData.id, ruleData.validator);
        }
        
        // 加载矛盾组合
        if (rulesData.contradictions) {
            rulesData.contradictions.forEach(pair => {
                this.contradictions.add(pair);
            });
        }
    }
    
    /**
     * 添加规则
     */
    addRule(ruleId, validator) {
        if (typeof validator !== 'function') {
            throw new Error('Validator must be a function');
        }
        this.rules.set(ruleId, validator);
    }
    
    /**
     * 移除规则
     */
    removeRule(ruleId) {
        this.rules.delete(ruleId);
    }
    
    /**
     * 添加矛盾组合
     */
    addContradiction(node1, node2) {
        this.contradictions.add(`${node1}:${node2}`);
        this.contradictions.add(`${node2}:${node1}`);
    }
    
    /**
     * 验证节点的连贯性
     */
    validate(node, stateTracker) {
        const context = stateTracker.getCoherenceContext();
        const violations = [];
        
        // 1. 检查逻辑矛盾
        if (this.hasLogicalContradiction(node, context)) {
            violations.push('逻辑矛盾');
        }
        
        // 2. 检查时间线一致性
        if (this.hasTimelineInconsistency(node, context)) {
            violations.push('时间线不一致');
        }
        
        // 3. 检查角色行为一致性（如果有角色系统）
        if (this.hasCharacterInconsistency(node, context)) {
            violations.push('角色行为不一致');
        }
        
        // 4. 检查叙事节奏
        if (this.hasPacingIssue(node, context)) {
            violations.push('叙事节奏问题');
        }
        
        // 5. 应用自定义规则
        for (const [ruleId, rule] of this.rules) {
            try {
                if (!rule(node, context)) {
                    violations.push(`违反规则：${ruleId}`);
                }
            } catch (error) {
                console.error(`Rule ${ruleId} error:`, error);
                violations.push(`规则出错：${ruleId}`);
            }
        }
        
        // 如果有违反，记录并返回 false
        if (violations.length > 0) {
            console.warn(`节点 ${node.id} 连贯性违反:`, violations);
            return false;
        }
        
        return true;
    }
    
    /**
     * 检查逻辑矛盾
     */
    hasLogicalContradiction(node, context) {
        // 检查节点是否与已触发节点矛盾
        const triggeredNodes = context.triggeredNodes || [];
        
        for (const triggeredId of triggeredNodes) {
            if (this.contradictions.has(`${node.id}:${triggeredId}`)) {
                return true;
            }
        }
        
        return false;
    }
    
    /**
     * 检查时间线不一致
     */
    hasTimelineInconsistency(node, context) {
        // 检查节点的前置条件是否与时间线冲突
        if (node.prerequisites?.required) {
            for (const requiredId of node.prerequisites.required) {
                if (!context.triggeredNodes?.includes(requiredId)) {
                    return true;
                }
            }
        }
        
        return false;
    }
    
    /**
     * 检查角色行为不一致
     */
    hasCharacterInconsistency(node, context) {
        // 如果有角色系统，检查角色行为一致性
        // 这里可以扩展为检查角色性格、关系等
        return false;
    }
    
    /**
     * 检查叙事节奏问题
     */
    hasPacingIssue(node, context) {
        const recentHistory = context.recentHistory || [];
        
        // 检查是否连续触发同类型节点
        const recentSameType = recentHistory.filter(
            event => event.type === node.type
        ).length;
        
        if (recentSameType >= 3) {
            return true;
        }
        
        return false;
    }
    
    /**
     * 修复不连贯的节点
     */
    repairIncoherentNode(node, stateTracker) {
        // 尝试找到替代节点
        const alternatives = this.findAlternativeNodes(node, stateTracker);
        
        for (const alt of alternatives) {
            if (this.validate(alt, stateTracker)) {
                return alt;
            }
        }
        
        return null;
    }
    
    /**
     * 查找替代节点
     */
    findAlternativeNodes(node, stateTracker) {
        // 这里应该从节点池中查找相似的替代节点
        // 简化实现：返回空数组
        return [];
    }
}
