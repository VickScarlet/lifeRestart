/**
 * 进化式叙事系统 - 主控制器
 * Evolutionary Narrative System (ENS)
 * 
 * 融合《瘟疫公司》病原体进化机制与 P 社游戏多分支叙事结构
 */

import NarrativeNode from './NarrativeNode.js';
import NarrativeBranch from './NarrativeBranch.js';
import ProbabilisticEventSystem from './ProbabilisticEventSystem.js';
import ChoiceImpactModel from './ChoiceImpactModel.js';
import NarrativeStateTracker from './NarrativeStateTracker.js';
import CoherenceEngine from './CoherenceEngine.js';

class EvolutionaryNarrativeSystem {
    constructor(config = {}) {
        // 核心组件
        this.nodes = new Map();                    // 所有剧情节点
        this.branches = new Map();                 // 所有分支路径
        this.stateTracker = new NarrativeStateTracker();
        this.impactModel = new ChoiceImpactModel(config.impactModel);
        this.eventSystem = new ProbabilisticEventSystem();
        this.coherenceEngine = new CoherenceEngine(config.coherence);
        
        // 系统状态
        this.currentNode = null;
        this.availableBranches = [];
        this.isInitialized = false;
        
        // 配置
        this.config = {
            maxHistoryLength: config.maxHistoryLength || 100,
            enableDynamicBalance: config.enableDynamicBalance !== false,
            enableCoherenceCheck: config.enableCoherenceCheck !== false,
            debugMode: config.debugMode || false
        };
        
        // 动态平衡器
        if (this.config.enableDynamicBalance) {
            this.balanceAdjuster = new DynamicBalanceAdjuster(this);
        }
        
        // 叙事节奏控制器
        this.pacingController = new PacingController();
    }
    
    /**
     * 初始化系统
     */
    async initial(dataLoader) {
        try {
            // 加载剧情节点数据
            const nodesData = await dataLoader('narrative_nodes');
            await this.loadNodes(nodesData);
            
            // 加载分支路径数据
            const branchesData = await dataLoader('narrative_branches');
            await this.loadBranches(branchesData);
            
            // 加载事件模板
            const eventsData = await dataLoader('narrative_events');
            await this.eventSystem.loadTemplates(eventsData);
            
            // 加载连贯性规则
            if (this.config.enableCoherenceCheck) {
                const rulesData = await dataLoader('coherence_rules');
                this.coherenceEngine.loadRules(rulesData);
            }
            
            this.isInitialized = true;
            
            if (this.config.debugMode) {
                console.log('[ENS] System initialized successfully');
                console.log(`[ENS] Loaded ${this.nodes.size} nodes, ${this.branches.size} branches`);
            }
            
            return true;
        } catch (error) {
            console.error('[ENS] Initialization failed:', error);
            throw error;
        }
    }
    
    /**
     * 加载剧情节点
     */
    async loadNodes(nodesData) {
        if (!nodesData || !Array.isArray(nodesData)) {
            throw new Error('Invalid nodes data');
        }
        
        for (const nodeConfig of nodesData) {
            const node = new NarrativeNode(nodeConfig);
            this.nodes.set(node.id, node);
        }
    }
    
    /**
     * 加载分支路径
     */
    async loadBranches(branchesData) {
        if (!branchesData || !Array.isArray(branchesData)) {
            throw new Error('Invalid branches data');
        }
        
        for (const branchConfig of branchesData) {
            const branch = new NarrativeBranch(branchConfig);
            this.branches.set(branch.id, branch);
            
            // 建立节点到分支的映射
            const sourceNode = this.nodes.get(branch.sourceNode);
            if (sourceNode) {
                if (!sourceNode.outgoingBranches) {
                    sourceNode.outgoingBranches = [];
                }
                sourceNode.outgoingBranches.push(branch.id);
            }
        }
    }
    
    /**
     * 系统主循环（每回合/每年调用）
     * @param {Object} context - 当前游戏上下文
     */
    async gameLoop(context) {
        if (!this.isInitialized) {
            throw new Error('System not initialized');
        }
        
        try {
            // 1. 更新状态追踪器
            this.stateTracker.updateTemporalContext(context);
            
            // 2. 计算叙事倾向
            const disposition = this.impactModel.calculateNarrativeDisposition();
            context.disposition = disposition;
            
            // 3. 获取可用节点池
            const nodePool = this.getAvailableNodePool(context);
            
            if (nodePool.length === 0) {
                // 如果没有可用节点，尝试触发默认节点
                return this.triggerDefaultNode(context);
            }
            
            // 4. 计算节点概率权重
            const weightedNodes = this.calculateNodeWeights(nodePool, context);
            
            // 5. 选择下一个节点（使用加权随机）
            let selectedNode = this.eventSystem.weightedRandomSelect(
                weightedNodes,
                context
            );
            
            // 6. 验证连贯性
            if (this.config.enableCoherenceCheck) {
                if (!this.coherenceEngine.validate(selectedNode, this.stateTracker)) {
                    // 尝试修复
                    const alternative = this.coherenceEngine.repairIncoherentNode(
                        selectedNode,
                        this.stateTracker
                    );
                    if (alternative) {
                        selectedNode = alternative;
                    } else {
                        // 如果无法修复，重新选择
                        return this.gameLoop(context);
                    }
                }
            }
            
            // 7. 触发节点
            await this.triggerNode(selectedNode, context);
            
            // 8. 生成玩家选择分支
            this.availableBranches = this.generateBranches(selectedNode, context);
            
            // 9. 更新叙事节奏
            this.pacingController.recordEvent(selectedNode.priority);
            
            // 10. 返回结果
            const result = {
                node: {
                    id: selectedNode.id,
                    type: selectedNode.type,
                    content: this.renderNodeContent(selectedNode, context),
                    tags: selectedNode.tags
                },
                branches: this.availableBranches.map(b => ({
                    id: b.id,
                    name: b.name,
                    description: b.description,
                    probability: b.calculateAvailability(context).probability,
                    available: b.calculateAvailability(context).available
                })),
                context: this.stateTracker.getCoherenceContext(),
                disposition: disposition
            };
            
            if (this.config.debugMode) {
                console.log('[ENS] Game loop result:', result);
            }
            
            return result;
            
        } catch (error) {
            console.error('[ENS] Game loop error:', error);
            throw error;
        }
    }
    
    /**
     * 处理玩家选择
     */
    async handlePlayerChoice(branchId, context) {
        const branch = this.branches.get(branchId);
        if (!branch) {
            throw new Error(`Invalid branch: ${branchId}`);
        }
        
        // 检查分支可用性
        const availability = branch.calculateAvailability(context);
        if (!availability.available) {
            throw new Error(`Branch not available: ${branchId}. Reasons: ${availability.reasons.join(', ')}`);
        }
        
        try {
            // 1. 应用分支的即时效果
            if (branch.feedback.immediateEffect) {
                this.applyEffects(branch.feedback.immediateEffect, context);
            }
            
            // 2. 记录玩家选择影响
            this.impactModel.recordChoice({
                id: branchId,
                impact: branch.impact || {},
                context: { ...context }
            });
            
            // 3. 更新状态追踪
            this.stateTracker.trackBranchSelection(branch, context);
            
            // 4. 跳转到目标节点
            this.currentNode = branch.targetNode;
            
            // 5. 触发目标节点
            const targetNode = this.nodes.get(branch.targetNode);
            if (!targetNode) {
                throw new Error(`Target node not found: ${branch.targetNode}`);
            }
            
            await this.triggerNode(targetNode, context);
            
            // 6. 应用延迟效果
            if (branch.feedback.delayedEffect) {
                branch.feedback.delayedEffect.forEach(effect => {
                    this.scheduleEffect(effect, context);
                });
            }
            
            return {
                success: true,
                targetNode: targetNode.id,
                effects: branch.feedback
            };
            
        } catch (error) {
            console.error('[ENS] Player choice error:', error);
            throw error;
        }
    }
    
    /**
     * 获取可用节点池
     */
    getAvailableNodePool(context) {
        const availableNodes = [];
        
        for (const [nodeId, node] of this.nodes) {
            // 检查节点是否已触发（如果是一次性节点）
            if (node.onceOnly && node.state.triggered) {
                continue;
            }
            
            // 检查前置条件
            const prereqResult = this.stateTracker.checkNodePrerequisites(node);
            if (!prereqResult.passed) {
                continue;
            }
            
            // 检查年龄范围
            if (context.age) {
                if (context.age < node.prerequisites.minAge || 
                    context.age > node.prerequisites.maxAge) {
                    continue;
                }
            }
            
            // 检查标签匹配
            if (node.tags.length > 0) {
                const hasMatchingTag = node.tags.some(tag => 
                    context.availableTags?.includes(tag)
                );
                if (!hasMatchingTag && node.requireTagMatch) {
                    continue;
                }
            }
            
            // 检查互斥
            if (this.isNodeExclusive(node, context)) {
                continue;
            }
            
            availableNodes.push(node);
        }
        
        return availableNodes;
    }
    
    /**
     * 计算节点权重
     */
    calculateNodeWeights(nodes, context) {
        return nodes.map(node => {
            let weight = node.priority;
            
            // 应用叙事倾向加成
            const disposition = context.disposition;
            if (disposition.tags) {
                disposition.tags.forEach(tag => {
                    if (node.tags.includes(tag)) {
                        weight *= 1.5;
                    }
                });
            }
            
            // 应用历史权重修正
            const contextKey = `node_${node.id}`;
            const historyWeight = this.eventSystem.getContextWeight(contextKey);
            weight *= historyWeight;
            
            // 应用节奏控制
            const pacingMod = this.pacingController.calculateWeightModifier(node.priority);
            weight *= pacingMod;
            
            return {
                id: node.id,
                probability: {
                    base: weight,
                    dynamicMods: []
                },
                data: node
            };
        });
    }
    
    /**
     * 生成玩家可选择的分支
     */
    generateBranches(node, context) {
        const branches = [];
        
        if (!node.outgoingBranches) {
            return branches;
        }
        
        for (const branchId of node.outgoingBranches) {
            const branch = this.branches.get(branchId);
            if (!branch) continue;
            
            const availability = branch.calculateAvailability(context);
            
            if (availability.available) {
                branches.push(branch);
            }
        }
        
        // 按概率排序
        branches.sort((a, b) => {
            const probA = a.calculateAvailability(context).probability;
            const probB = b.calculateAvailability(context).probability;
            return probB - probA;
        });
        
        return branches;
    }
    
    /**
     * 触发节点
     */
    async triggerNode(node, context) {
        // 更新节点状态
        this.stateTracker.trackNodeTrigger(node, context);
        
        // 应用节点效果
        if (node.effects) {
            this.applyEffects(node.effects, context);
        }
        
        // 触发回调
        if (node.coherence.callback) {
            await node.coherence.callback(this.stateTracker, context);
        }
        
        return node;
    }
    
    /**
     * 应用效果
     */
    applyEffects(effects, context) {
        if (!effects) return;
        
        // 属性变化
        if (effects.propertyChanges) {
            Object.entries(effects.propertyChanges).forEach(([prop, value]) => {
                if (context[prop] !== undefined) {
                    context[prop] += value;
                }
            });
        }
        
        // 设置标记
        if (effects.flagSet) {
            Object.entries(effects.flagSet).forEach(([flag, value]) => {
                this.stateTracker.setGlobalFlag(flag, value);
            });
        }
        
        // 解锁/锁定路径
        if (effects.pathUnlocks) {
            effects.pathUnlocks.forEach(pathId => {
                this.stateTracker.activatePath(pathId);
            });
        }
        
        if (effects.pathLocks) {
            effects.pathLocks.forEach(pathId => {
                this.stateTracker.deactivatePath(pathId);
            });
        }
    }
    
    /**
     * 渲染节点内容（支持变量替换）
     */
    renderNodeContent(node, context) {
        if (typeof node.content === 'string') {
            return this.interpolate(node.content, context);
        }
        
        if (Array.isArray(node.content)) {
            return node.content.map(text => this.interpolate(text, context));
        }
        
        return node.content;
    }
    
    /**
     * 字符串插值（变量替换）
     */
    interpolate(text, context) {
        return text.replace(/\{(\w+)\}/g, (match, key) => {
            if (context[key] !== undefined) {
                return context[key];
            }
            return match;
        });
    }
    
    /**
     * 检查节点互斥
     */
    isNodeExclusive(node, context) {
        // 实现互斥检查逻辑
        return false;
    }
    
    /**
     * 触发默认节点
     */
    triggerDefaultNode(context) {
        // 当没有可用节点时，触发默认节点
        const defaultNode = this.nodes.get('default_placeholder');
        if (defaultNode) {
            return this.triggerNode(defaultNode, context);
        }
        
        return null;
    }
    
    /**
     * 计划延迟效果
     */
    scheduleEffect(effect, context) {
        if (effect.delay) {
            setTimeout(() => {
                this.applyEffects(effect, context);
            }, effect.delay);
        }
    }
    
    /**
     * 获取系统统计信息
     */
    getStatistics() {
        return {
            totalNodes: this.nodes.size,
            totalBranches: this.branches.size,
            triggeredNodes: this.stateTracker.getTriggeredNodesCount(),
            choiceHistory: this.impactModel.getChoiceHistoryLength(),
            currentDisposition: this.impactModel.calculateNarrativeDisposition()
        };
    }
}

/**
 * 动态平衡调整器
 */
class DynamicBalanceAdjuster {
    constructor(system) {
        this.system = system;
        this.metrics = {
            choicesMade: 0,
            positiveOutcomes: 0,
            negativeOutcomes: 0,
            averageProgress: 0
        };
    }
    
    recordOutcome(isPositive, progress) {
        this.metrics.choicesMade++;
        if (isPositive) {
            this.metrics.positiveOutcomes++;
        } else {
            this.metrics.negativeOutcomes++;
        }
        this.metrics.averageProgress = 
            (this.metrics.averageProgress + progress) / 2;
    }
    
    adjust() {
        const successRate = this.metrics.positiveOutcomes / 
                           Math.max(1, this.metrics.choicesMade);
        
        // 如果成功率太低，增加正面事件概率
        if (successRate < 0.3) {
            this.system.eventSystem.adjustGlobalWeight('positive', 1.2);
        }
        
        // 如果成功率太高，增加挑战性
        if (successRate > 0.7) {
            this.system.eventSystem.adjustGlobalWeight('challenging', 1.3);
        }
    }
}

/**
 * 叙事节奏控制器
 */
class PacingController {
    constructor() {
        this.tensionLevel = 0;
        this.eventHistory = [];
        this.targetTension = 50;
    }
    
    recordEvent(priority) {
        this.eventHistory.push({
            priority,
            timestamp: Date.now()
        });
        
        // 保持历史记录长度
        if (this.eventHistory.length > 20) {
            this.eventHistory.shift();
        }
        
        // 更新紧张度
        this.updateTension(priority);
    }
    
    updateTension(newPriority) {
        // 高优先级事件增加紧张度
        this.tensionLevel = Math.min(100, this.tensionLevel + newPriority * 5);
        
        // 自然衰减
        this.tensionLevel = Math.max(0, this.tensionLevel - 2);
    }
    
    calculateWeightModifier(priority) {
        // 如果紧张度太高，降低高优先级事件的权重
        if (this.tensionLevel > 70 && priority > 8) {
            return 0.5;
        }
        
        // 如果紧张度太低，提高中等优先级事件的权重
        if (this.tensionLevel < 30 && priority >= 4 && priority <= 7) {
            return 1.5;
        }
        
        return 1.0;
    }
}

export default EvolutionaryNarrativeSystem;
