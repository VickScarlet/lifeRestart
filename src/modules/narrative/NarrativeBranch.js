/**
 * 叙事分支类
 * Narrative Branch - 连接剧情节点的路径
 */

export default class NarrativeBranch {
    constructor(config) {
        // 基础属性
        this.id = config.id;
        this.sourceNode = config.sourceNode;    // 起始节点 ID
        this.targetNode = config.targetNode;    // 目标节点 ID
        this.name = config.name || '选择';       // 玩家可见的分支名称
        this.description = config.description || ''; // 分支描述
        
        // 多维度触发条件
        this.triggers = {
            // 1. 属性维度
            properties: {
                min: config.minProperties || {},   // 最小属性要求 {CHR: 5, INT: 8}
                max: config.maxProperties || {},   // 最大属性要求
            },
            
            // 2. 叙事基因维度
            genes: {
                required: config.requiredGenes || [],     // 需要的基因标记
                forbidden: config.forbiddenGenes || [],   // 禁止的基因标记
                thresholds: config.geneThresholds || {}   // 基因阈值 {morality: 50}
            },
            
            // 3. 状态维度
            state: {
                flags: config.requiredFlags || {},        // 需要的标记
                completedNodes: config.completed || [],   // 完成的节点
                failedNodes: config.failed || [],         // 失败的节点
                activePaths: config.activePaths || []     // 激活的路径
            },
            
            // 4. 时间维度
            temporal: {
                minAge: config.minAge || 0,
                maxAge: config.maxAge || Infinity,
                minTurn: config.minTurn || 0,
                maxTurn: config.maxTurn || Infinity,
            },
            
            // 5. 关系维度
            relationships: {
                minAffinity: config.minAffinity || {},    // 最小好感度
                maxAffinity: config.maxAffinity || {},    // 最大好感度
            }
        };
        
        // 概率权重系统
        this.probability = {
            base: config.baseProbability || 1.0,      // 基础概率
            weights: config.weights || {},            // 权重修正函数
            dynamicMods: [],                          // 动态修正器数组
            cap: config.probabilityCap || 1.0,        // 概率上限
            floor: config.probabilityFloor || 0.0,    // 概率下限
            contextWeights: config.contextWeights || {} // 上下文权重
        };
        
        // 互斥系统
        this.mutualExclusion = {
            exclusiveBranches: config.exclusiveBranches || [],  // 互斥分支 ID
            exclusivePaths: config.exclusivePaths || [],        // 互斥路径 ID
            oncePerRun: config.oncePerRun || false              // 每局只能选择一次
        };
        
        // 玩家选择反馈
        this.feedback = {
            immediateEffect: config.immediateEffect || {},      // 即时效果
            delayedEffect: config.delayedEffect || [],          // 延迟效果数组
            narrativeConsequence: config.consequence || '',     // 叙事后果描述
            visualFeedback: config.visualFeedback || {}         // 视觉反馈配置
        };
        
        // 选择影响（用于更新叙事维度）
        this.impact = config.impact || {
            morality: 0,    // -100 到 100
            chaos: 0,       // 0 到 100
            progress: 0,    // 0 到 100
            empathy: 0      // 0 到 100
        };
        
        // 已选择标记（用于 oncePerRun）
        this.hasBeenSelected = false;
        
        // 验证配置
        this.validate();
    }
    
    /**
     * 验证分支配置
     */
    validate() {
        if (!this.id || !this.sourceNode || !this.targetNode) {
            throw new Error('NarrativeBranch must have id, sourceNode, and targetNode');
        }
    }
    
    /**
     * 计算分支可用性
     */
    calculateAvailability(context) {
        const result = {
            available: true,
            probability: this.probability.base,
            reasons: [],
            warnings: []
        };
        
        // 检查是否已选择过（oncePerRun）
        if (this.mutualExclusion.oncePerRun && this.hasBeenSelected) {
            result.available = false;
            result.reasons.push('Already selected this run');
            return result;
        }
        
        // 1. 检查属性维度
        if (!this.checkPropertyRequirements(context)) {
            result.available = false;
            result.reasons.push('属性要求不满足');
        }
        
        // 2. 检查叙事基因维度
        if (!this.checkGeneRequirements(context)) {
            result.available = false;
            result.reasons.push('叙事基因不匹配');
        }
        
        // 3. 检查状态维度
        if (!this.checkStateRequirements(context)) {
            result.available = false;
            result.reasons.push('状态条件不满足');
        }
        
        // 4. 检查时间维度
        if (!this.checkTemporalRequirements(context)) {
            result.available = false;
            result.reasons.push('时间条件不满足');
        }
        
        // 5. 检查互斥
        if (!this.checkMutualExclusion(context)) {
            result.available = false;
            result.reasons.push('与已选分支互斥');
        }
        
        // 如果可用，计算概率权重
        if (result.available) {
            result.probability = this.calculateWeightedProbability(context);
            
            // 应用动态修正
            this.probability.dynamicMods.forEach(mod => {
                if (typeof mod === 'function') {
                    result.probability = mod(result.probability, context);
                }
            });
            
            // 限制在上下限之间
            result.probability = Math.max(
                this.probability.floor,
                Math.min(this.probability.cap, result.probability)
            );
        }
        
        return result;
    }
    
    /**
     * 检查属性要求
     */
    checkPropertyRequirements(context) {
        const props = this.triggers.properties;
        
        // 检查最小值
        for (const [prop, min] of Object.entries(props.min)) {
            if (context[prop] === undefined || context[prop] < min) {
                return false;
            }
        }
        
        // 检查最大值
        for (const [prop, max] of Object.entries(props.max)) {
            if (context[prop] === undefined || context[prop] > max) {
                return false;
            }
        }
        
        return true;
    }
    
    /**
     * 检查基因要求
     */
    checkGeneRequirements(context) {
        const genes = this.triggers.genes;
        const disposition = context.disposition;
        
        // 检查需要的基因
        for (const gene of genes.required) {
            if (!disposition.tags?.includes(gene)) {
                return false;
            }
        }
        
        // 检查禁止的基因
        for (const gene of genes.forbidden) {
            if (disposition.tags?.includes(gene)) {
                return false;
            }
        }
        
        // 检查基因阈值
        for (const [dimension, threshold] of Object.entries(genes.thresholds)) {
            const value = disposition[dimension]?.value || 0;
            if (value < threshold) {
                return false;
            }
        }
        
        return true;
    }
    
    /**
     * 检查状态要求
     */
    checkStateRequirements(context) {
        const state = this.triggers.state;
        
        // 检查标记
        for (const [flag, value] of Object.entries(state.flags)) {
            if (context[flag] !== value) {
                return false;
            }
        }
        
        // 检查完成的节点
        for (const nodeId of state.completedNodes) {
            if (!context.completedNodes?.includes(nodeId)) {
                return false;
            }
        }
        
        // 检查失败的节点
        for (const nodeId of state.failedNodes) {
            if (!context.failedNodes?.includes(nodeId)) {
                return false;
            }
        }
        
        return true;
    }
    
    /**
     * 检查时间要求
     */
    checkTemporalRequirements(context) {
        const temporal = this.triggers.temporal;
        
        if (context.age) {
            if (context.age < temporal.minAge || context.age > temporal.maxAge) {
                return false;
            }
        }
        
        if (context.turn !== undefined) {
            if (context.turn < temporal.minTurn || context.turn > temporal.maxTurn) {
                return false;
            }
        }
        
        return true;
    }
    
    /**
     * 检查互斥
     */
    checkMutualExclusion(context) {
        // 检查互斥分支
        for (const exclusiveId of this.mutualExclusion.exclusiveBranches) {
            if (context.selectedBranches?.includes(exclusiveId)) {
                return false;
            }
        }
        
        // 检查互斥路径
        for (const exclusivePath of this.mutualExclusion.exclusivePaths) {
            if (context.activePaths?.includes(exclusivePath)) {
                return false;
            }
        }
        
        return true;
    }
    
    /**
     * 计算加权概率
     */
    calculateWeightedProbability(context) {
        let probability = this.probability.base;
        
        // 应用属性权重
        for (const [prop, weightFn] of Object.entries(this.probability.weights)) {
            if (context[prop] !== undefined) {
                if (typeof weightFn === 'function') {
                    probability *= weightFn(context[prop]);
                } else if (typeof weightFn === 'number') {
                    probability *= weightFn;
                }
            }
        }
        
        // 应用上下文权重
        const contextKey = `branch_${this.id}`;
        if (context.contextWeights?.[contextKey]) {
            probability *= context.contextWeights[contextKey];
        }
        
        return probability;
    }
    
    /**
     * 标记为已选择
     */
    markAsSelected() {
        this.hasBeenSelected = true;
    }
    
    /**
     * 重置选择状态
     */
    reset() {
        this.hasBeenSelected = false;
    }
    
    /**
     * 获取分支信息
     */
    getInfo() {
        return {
            id: this.id,
            sourceNode: this.sourceNode,
            targetNode: this.targetNode,
            name: this.name,
            description: this.description,
            impact: this.impact,
            hasBeenSelected: this.hasBeenSelected
        };
    }
}
