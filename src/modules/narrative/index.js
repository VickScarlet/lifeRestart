/**
 * 进化式叙事系统 - 主模块导出
 * Evolutionary Narrative System - Main Module Export
 * 
 * 提供统一的导入接口，简化集成流程
 */

// 核心系统
export { default as EvolutionaryNarrativeSystem } from './EvolutionaryNarrativeSystem.js';
export { default as NarrativeNode } from './NarrativeNode.js';
export { default as NarrativeBranch } from './NarrativeBranch.js';

// 子系统
export { default as ProbabilisticEventSystem } from './ProbabilisticEventSystem.js';
export { default as ChoiceImpactModel } from './ChoiceImpactModel.js';
export { default as NarrativeStateTracker } from './NarrativeStateTracker.js';
export { default as CoherenceEngine } from './CoherenceEngine.js';

// 适配器与转换器
export { default as ENSAdapter } from './ENSAdapter.js';
export { DataConverter, DataLoader, ConfigManager } from './DataConverter.js';

/**
 * 快速创建 ENS 实例的工厂函数
 */
export function createENS(config = {}) {
    const defaultConfig = {
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
    };
    
    const mergedConfig = { ...defaultConfig, ...config };
    return new EvolutionaryNarrativeSystem(mergedConfig);
}

/**
 * 创建适配器的工厂函数
 */
export function createAdapter(lifeModule, config = {}) {
    return new ENSAdapter(lifeModule, config);
}

/**
 * 默认导出
 */
export default {
    EvolutionaryNarrativeSystem,
    NarrativeNode,
    NarrativeBranch,
    ProbabilisticEventSystem,
    ChoiceImpactModel,
    NarrativeStateTracker,
    CoherenceEngine,
    ENSAdapter,
    DataConverter,
    DataLoader,
    ConfigManager,
    createENS,
    createAdapter
};
