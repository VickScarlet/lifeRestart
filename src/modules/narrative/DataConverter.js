/**
 * 数据格式转换器
 * 负责在 ENS 数据格式和 Life 模块数据格式之间转换
 */

export class DataConverter {
    /**
     * 将 ENS 节点转换为 Life 事件格式
     */
    static convertNodeToEvent(node) {
        if (!node) return null;
        
        return {
            id: node.id,
            event: Array.isArray(node.content) ? node.content.join('\n') : node.content,
            type: node.type,
            priority: node.priority,
            tags: node.tags || [],
            
            // 条件转换
            include: this.convertPrerequisitesToInclude(node.prerequisites),
            exclude: this.convertPrerequisitesToExclude(node.prerequisites),
            
            // 效果转换
            effect: this.convertEffects(node.effects),
            
            // 分支转换
            branch: node.outgoingBranches ? this.convertBranches(node.outgoingBranches) : null
        };
    }
    
    /**
     * 将 ENS 前置条件转换为 Life include 格式
     */
    static convertPrerequisitesToInclude(prerequisites) {
        if (!prerequisites) return [];
        
        const conditions = [];
        
        // 年龄条件
        if (prerequisites.minAge !== undefined) {
            conditions.push(`age>=${prerequisites.minAge}`);
        }
        if (prerequisites.maxAge !== undefined && prerequisites.maxAge !== Infinity) {
            conditions.push(`age<=${prerequisites.maxAge}`);
        }
        
        // 前置节点条件
        if (prerequisites.required && prerequisites.required.length > 0) {
            prerequisites.required.forEach(nodeId => {
                conditions.push(`EVT:${nodeId}`);
            });
        }
        
        // 标记条件
        if (prerequisites.requiredFlags) {
            Object.entries(prerequisites.requiredFlags).forEach(([flag, value]) => {
                if (value) {
                    conditions.push(`FLG:${flag}`);
                }
            });
        }
        
        return conditions;
    }
    
    /**
     * 将 ENS 前置条件转换为 Life exclude 格式
     */
    static convertPrerequisitesToExclude(prerequisites) {
        if (!prerequisites) return [];
        
        const conditions = [];
        
        // 禁止的前置节点
        if (prerequisites.forbidden && prerequisites.forbidden.length > 0) {
            prerequisites.forbidden.forEach(nodeId => {
                conditions.push(`EVT:${nodeId}`);
            });
        }
        
        // 禁止的标记
        if (prerequisites.forbiddenFlags) {
            Object.entries(prerequisites.forbiddenFlags).forEach(([flag, value]) => {
                if (value) {
                    conditions.push(`FLG:${flag}`);
                }
            });
        }
        
        return conditions;
    }
    
    /**
     * 转换 ENS 效果为 Life 效果格式
     */
    static convertEffects(effects) {
        if (!effects) return {};
        
        const result = {};
        
        // 属性变化
        if (effects.propertyChanges) {
            Object.entries(effects.propertyChanges).forEach(([prop, value]) => {
                result[prop] = value;
            });
        }
        
        // 标记设置
        if (effects.flagSet) {
            Object.entries(effects.flagSet).forEach(([flag, value]) => {
                result[`FLG_${flag}`] = value;
            });
        }
        
        return result;
    }
    
    /**
     * 转换分支为 Life 格式
     */
    static convertBranches(branchIds) {
        if (!branchIds || branchIds.length === 0) return null;
        
        return branchIds.map(branchId => [
            'true',  // 默认条件为真
            branchId
        ]);
    }
    
    /**
     * 将 Life 事件转换为 ENS 节点格式
     */
    static convertEventToNode(event) {
        if (!event) return null;
        
        return {
            id: event.id,
            type: event.type || 'normal',
            content: event.event,
            priority: event.priority || 5,
            tags: event.tags || [],
            
            prerequisites: this.convertIncludeToPrerequisites(event.include),
            effects: this.convertLifeEffects(event.effect)
        };
    }
    
    /**
     * 将 Life include 转换为 ENS 前置条件
     */
    static convertIncludeToPrerequisites(include) {
        if (!include || !Array.isArray(include)) return {};
        
        const prerequisites = {
            required: [],
            minAge: 0,
            maxAge: Infinity,
            requiredFlags: {}
        };
        
        include.forEach(condition => {
            if (typeof condition !== 'string') return;
            
            // 年龄条件
            const ageMatch = condition.match(/age([<>]=?)(\d+)/);
            if (ageMatch) {
                const [, op, value] = ageMatch;
                if (op === '>=' || op === '>') {
                    prerequisites.minAge = parseInt(value);
                } else if (op === '<=' || op === '<') {
                    prerequisites.maxAge = parseInt(value);
                }
            }
            
            // 事件条件
            const evtMatch = condition.match(/EVT:(\w+)/);
            if (evtMatch) {
                prerequisites.required.push(evtMatch[1]);
            }
            
            // 标记条件
            const flgMatch = condition.match(/FLG:(\w+)/);
            if (flgMatch) {
                prerequisites.requiredFlags[flgMatch[1]] = true;
            }
        });
        
        return prerequisites;
    }
    
    /**
     * 将 Life 效果转换为 ENS 效果
     */
    static convertLifeEffects(effect) {
        if (!effect) return {};
        
        const effects = {
            propertyChanges: {},
            flagSet: {}
        };
        
        Object.entries(effect).forEach(([key, value]) => {
            // 属性变化
            if (['CHR', 'INT', 'STR', 'MNY', 'SPR'].includes(key)) {
                effects.propertyChanges[key] = value;
            }
            // 标记设置
            else if (key.startsWith('FLG_')) {
                const flagName = key.substring(4);
                effects.flagSet[flagName] = value;
            }
        });
        
        return effects;
    }
}

/**
 * JSON 数据加载器
 */
export class DataLoader {
    constructor(basePath = 'data/zh-cn') {
        this.basePath = basePath;
        this.cache = new Map();
    }
    
    /**
     * 加载 JSON 数据
     */
    async load(fileName) {
        const cacheKey = `${this.basePath}/${fileName}`;
        
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }
        
        try {
            const response = await fetch(`${this.basePath}/${fileName}.json`);
            if (!response.ok) {
                throw new Error(`Failed to load ${fileName}: ${response.status}`);
            }
            
            const data = await response.json();
            this.cache.set(cacheKey, data);
            
            return data;
        } catch (error) {
            console.error(`[DataLoader] Error loading ${fileName}:`, error);
            return null;
        }
    }
    
    /**
     * 预加载多个文件
     */
    async preload(fileNames) {
        const promises = fileNames.map(name => this.load(name));
        return await Promise.all(promises);
    }
    
    /**
     * 清空缓存
     */
    clearCache() {
        this.cache.clear();
    }
}

/**
 * 配置管理器
 */
export class ConfigManager {
    constructor() {
        this.config = {
            // ENS 配置
            ens: {
                enableDynamicBalance: true,
                enableCoherenceCheck: true,
                debugMode: false,
                maxHistoryLength: 100
            },
            
            // 叙事维度权重
            dimensions: {
                morality: { weight: 1.0, decay: 0.01 },
                chaos: { weight: 1.0, decay: 0.005 },
                progress: { weight: 1.0, decay: 0.002 },
                empathy: { weight: 1.0, decay: 0.01 }
            },
            
            // 概率配置
            probability: {
                defaultBase: 1.0,
                minProbability: 0.01,
                maxProbability: 1.0,
                recencyPenalty: 0.5,
                recencyWindow: 300000  // 5 分钟
            },
            
            // 连贯性配置
            coherence: {
                enableTimelineCheck: true,
                enablePacingCheck: true,
                enableCharacterCheck: false,
                maxConsecutiveHighPriority: 3
            }
        };
    }
    
    /**
     * 获取配置
     */
    get(path, defaultValue = null) {
        const keys = path.split('.');
        let value = this.config;
        
        for (const key of keys) {
            if (value && typeof value === 'object' && key in value) {
                value = value[key];
            } else {
                return defaultValue;
            }
        }
        
        return value;
    }
    
    /**
     * 设置配置
     */
    set(path, value) {
        const keys = path.split('.');
        let obj = this.config;
        
        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            if (!(key in obj)) {
                obj[key] = {};
            }
            obj = obj[key];
        }
        
        obj[keys[keys.length - 1]] = value;
    }
    
    /**
     * 加载配置文件
     */
    async loadFromFile(filePath) {
        try {
            const response = await fetch(filePath);
            const config = await response.json();
            this.mergeConfig(config);
            return true;
        } catch (error) {
            console.error('[ConfigManager] Failed to load config:', error);
            return false;
        }
    }
    
    /**
     * 合并配置
     */
    mergeConfig(newConfig) {
        this.deepMerge(this.config, newConfig);
    }
    
    /**
     * 深度合并对象
     */
    deepMerge(target, source) {
        for (const key in source) {
            if (source.hasOwnProperty(key)) {
                if (typeof source[key] === 'object' && source[key] !== null) {
                    if (!target[key]) {
                        target[key] = {};
                    }
                    this.deepMerge(target[key], source[key]);
                } else {
                    target[key] = source[key];
                }
            }
        }
    }
    
    /**
     * 导出配置
     */
    exportConfig() {
        return JSON.parse(JSON.stringify(this.config));
    }
}
