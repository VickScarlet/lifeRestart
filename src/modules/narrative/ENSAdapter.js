/**
 * ENS 到 Life 模块的适配器
 * 负责将进化式叙事系统与现有 Life 模块对接
 */

import EvolutionaryNarrativeSystem from './narrative/EvolutionaryNarrativeSystem.js';

export default class ENSAdapter {
    constructor(lifeModule) {
        this.life = lifeModule;
        this.ens = null;
        this.isInitialized = false;
        this.currentContext = {};
    }
    
    /**
     * 初始化 ENS 系统
     */
    async initialize() {
        try {
            // 创建 ENS 实例
            this.ens = new EvolutionaryNarrativeSystem({
                enableDynamicBalance: true,
                enableCoherenceCheck: true,
                debugMode: false,
                impactModel: {
                    moralityWeight: 1.0,
                    chaosWeight: 1.0,
                    progressWeight: 1.0,
                    empathyWeight: 1.0,
                    maxHistoryLength: 100
                }
            });
            
            // 加载数据
            await this.ens.initial(async (dataSet) => {
                const response = await fetch(`data/zh-cn/${dataSet}.json`);
                if (!response.ok) {
                    console.warn(`Data file not found: ${dataSet}`);
                    return [];
                }
                return await response.json();
            });
            
            this.isInitialized = true;
            console.log('[ENS Adapter] Initialized successfully');
            
            return true;
        } catch (error) {
            console.error('[ENS Adapter] Initialization failed:', error);
            throw error;
        }
    }
    
    /**
     * 构建游戏上下文
     */
    buildContext() {
        const player = this.life.getPlayer();
        
        return {
            // 基础属性
            age: player.age || 0,
            turn: player.age || 0,
            CHR: player.charm || 0,
            INT: player.intelligence || 0,
            STR: player.strength || 0,
            MNY: player.money || 0,
            SPR: player.spirit || 0,
            
            // 游戏状态
            completedNodes: player.completedNodes || [],
            selectedBranches: player.selectedBranches || [],
            activePaths: player.activePaths || [],
            
            // 标记系统
            hasJob: player.hasJob || false,
            hasPartner: player.hasPartner || false,
            isRetired: player.isRetired || false,
            
            // 天赋与特质
            talents: player.talents || [],
            traits: player.traits || [],
            
            // 人际关系
            relationships: player.relationships || {},
            
            // 成就与统计
            achievements: player.achievements || [],
            statistics: player.statistics || {}
        };
    }
    
    /**
     * 运行叙事系统主循环
     */
    async runNarrativeLoop() {
        if (!this.isInitialized) {
            await this.initialize();
        }
        
        const context = this.buildContext();
        this.currentContext = context;
        
        try {
            const result = await this.ens.gameLoop(context);
            return this.transformResult(result);
        } catch (error) {
            console.error('[ENS Adapter] Game loop error:', error);
            throw error;
        }
    }
    
    /**
     * 转换 ENS 结果为 Life 模块格式
     */
    transformResult(ensResult) {
        if (!ensResult) return null;
        
        return {
            // 剧情内容
            content: ensResult.node.content,
            nodeId: ensResult.node.id,
            nodeType: ensResult.node.type,
            tags: ensResult.node.tags || [],
            
            // 可选分支
            branches: ensResult.branches.map(branch => ({
                id: branch.id,
                name: branch.name,
                description: branch.description,
                available: branch.available,
                probability: branch.probability
            })),
            
            // 上下文信息
            context: {
                disposition: ensResult.disposition,
                triggeredNodes: ensResult.context.triggeredNodes,
                activePaths: ensResult.context.activePaths
            },
            
            // 元数据
            timestamp: Date.now(),
            priority: ensResult.node.priority
        };
    }
    
    /**
     * 处理玩家选择
     */
    async handlePlayerChoice(branchId) {
        if (!this.isInitialized) {
            throw new Error('ENS not initialized');
        }
        
        const context = this.buildContext();
        
        try {
            const result = await this.ens.handlePlayerChoice(branchId, context);
            
            // 同步状态到 Life 模块
            await this.syncToLife(result);
            
            return {
                success: true,
                targetNode: result.targetNode,
                effects: result.effects
            };
        } catch (error) {
            console.error('[ENS Adapter] Player choice error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    /**
     * 同步 ENS 状态到 Life 模块
     */
    async syncToLife(ensResult) {
        if (!ensResult || !ensResult.success) return;
        
        const player = this.life.getPlayer();
        
        // 应用效果
        if (ensResult.effects?.immediateEffect) {
            const effects = ensResult.effects.immediateEffect;
            
            if (effects.CHR) player.charm += effects.CHR;
            if (effects.INT) player.intelligence += effects.INT;
            if (effects.STR) player.strength += effects.STR;
            if (effects.MNY) player.money += effects.MNY;
            if (effects.SPR) player.spirit += effects.SPR;
        }
        
        // 更新节点历史
        if (!player.completedNodes) {
            player.completedNodes = [];
        }
        if (!player.completedNodes.includes(ensResult.targetNode)) {
            player.completedNodes.push(ensResult.targetNode);
        }
        
        // 保存玩家状态
        this.life.setPlayer(player);
    }
    
    /**
     * 获取叙事倾向
     */
    getNarrativeDisposition() {
        if (!this.isInitialized) {
            return null;
        }
        
        return this.ens.impactModel.calculateNarrativeDisposition();
    }
    
    /**
     * 获取系统统计信息
     */
    getStatistics() {
        if (!this.isInitialized) {
            return null;
        }
        
        return this.ens.getStatistics();
    }
    
    /**
     * 导出系统状态
     */
    exportState() {
        if (!this.isInitialized) {
            return null;
        }
        
        return {
            ens: this.ens.stateTracker.exportState(),
            impact: this.ens.impactModel.exportState(),
            context: this.currentContext
        };
    }
    
    /**
     * 导入系统状态
     */
    importState(state) {
        if (!this.isInitialized || !state) {
            return false;
        }
        
        try {
            if (state.ens) {
                this.ens.stateTracker.importState(state.ens);
            }
            if (state.impact) {
                this.ens.impactModel.importState(state.impact);
            }
            return true;
        } catch (error) {
            console.error('[ENS Adapter] State import failed:', error);
            return false;
        }
    }
    
    /**
     * 重置系统
     */
    reset() {
        if (this.ens) {
            this.ens.stateTracker.reset();
            this.ens.impactModel.reset();
            this.ens.eventSystem.reset();
        }
        this.currentContext = {};
    }
}
