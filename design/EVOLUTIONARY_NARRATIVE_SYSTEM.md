# 进化式叙事系统设计方案
## Evolutionary Narrative System (ENS)

> 融合《瘟疫公司》病原体进化机制与 P 社游戏多分支叙事结构的综合性剧情设计系统

---

## 一、系统核心原理

### 1.1 设计理念

本系统基于以下核心设计理念：

1. **进化树状叙事**：剧情如病原体进化般分支发展，每个选择都是"基因突变"
2. **动态权重系统**：玩家行为持续影响剧情走向概率，类似 P 社游戏的"影响力"机制
3. **状态追踪网络**：全局追踪所有剧情节点状态，确保叙事连贯性
4. **概率事件池**：基于上下文动态调整事件触发概率

### 1.2 核心概念

```
┌─────────────────────────────────────────────────────────────┐
│                    进化式叙事系统 (ENS)                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  【剧情节点】(Narrative Node)                                │
│    ├─ 唯一标识符 (Node ID)                                   │
│    ├─ 节点类型 (Type): 起始/普通/分支/结局                   │
│    ├─ 剧情文本 (Content)                                     │
│    ├─ 前置条件 (Prerequisites)                               │
│    └─ 后置效应 (Effects)                                     │
│                                                             │
│  【进化路径】(Evolution Path)                                │
│    ├─ 路径 ID                                                │
│    ├─ 起始节点 → 目标节点                                    │
│    ├─ 触发条件 (Conditions)                                  │
│    ├─ 基础概率 (Base Probability)                            │
│    ├─ 权重修正 (Weight Modifiers)                            │
│    └─ 互斥路径 (Mutually Exclusive)                          │
│                                                             │
│  【叙事基因】(Narrative Gene)                                │
│    ├─ 剧情倾向性 (Disposition)                               │
│    ├─ 道德坐标 (Moral Coordinates)                           │
│    ├─ 关系网络 (Relationship Network)                        │
│    └─ 隐藏标记 (Hidden Flags)                                │
│                                                             │
│  【动态事件池】(Dynamic Event Pool)                          │
│    ├─ 事件模板库                                             │
│    ├─ 上下文过滤器                                           │
│    ├─ 概率权重表                                             │
│    └─ 组合规则引擎                                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 二、系统模块构成

### 2.1 剧情节点网络架构 (Node Network Architecture)

```javascript
/**
 * 剧情节点类
 * 灵感来源：瘟疫公司的"症状组合" + P 社的"事件 ID"
 */
class NarrativeNode {
    constructor(config) {
        this.id = config.id;                      // 唯一标识
        this.type = config.type;                  // 节点类型
        this.content = config.content;            // 剧情文本模板
        this.tags = config.tags || [];            // 标签系统
        this.priority = config.priority || 0;     // 优先级
        
        // 前置条件系统
        this.prerequisites = {
            required: config.requiredNodes || [],   // 必须触发过的前置节点
            forbidden: config.forbiddenNodes || [], // 不能触发过的前置节点
            conditions: config.conditions || [],    // 动态条件检查
            minAge: config.minAge || 0,             // 最小年龄
            maxAge: config.maxAge || Infinity,      // 最大年龄
        };
        
        // 后置效应系统
        this.effects = {
            propertyChanges: {},    // 属性变化
            flagSet: {},            // 标记设置
            eventTriggers: [],      // 触发的事件
            pathUnlocks: [],        // 解锁的路径
            pathLocks: []           // 锁定的路径
        };
        
        // 叙事连贯性保障
        this.coherence = {
            contextReferences: [],  // 上下文引用
            callback: null,         // 回调函数
            validation: null        // 连贯性验证
        };
        
        // 状态追踪
        this.state = {
            triggered: false,       // 是否已触发
            triggerCount: 0,        // 触发次数
            lastTriggerTime: null,  // 最后触发时间
            triggerContext: {}      // 触发时的上下文
        };
    }
}
```

### 2.2 多维度选择分支系统 (Multi-dimensional Branch System)

```javascript
/**
 * 分支选择类
 * 融合瘟疫公司的"进化分支"与 P 社的"决策树"
 */
class NarrativeBranch {
    constructor(config) {
        this.id = config.id;
        this.sourceNode = config.sourceNode;    // 起始节点
        this.targetNode = config.targetNode;    // 目标节点
        this.name = config.name;                // 分支名称（玩家可见）
        this.description = config.description;  // 分支描述
        
        // 多维度触发条件
        this.triggers = {
            // 1. 属性维度
            properties: {
                min: config.minProperties || {},  // 最小属性要求
                max: config.maxProperties || {},  // 最大属性要求
            },
            
            // 2. 叙事基因维度
            genes: {
                required: config.requiredGenes || [],    // 需要的基因标记
                forbidden: config.forbiddenGenes || [],  // 禁止的基因标记
                thresholds: config.geneThresholds || {}  // 基因阈值
            },
            
            // 3. 状态维度
            state: {
                flags: config.requiredFlags || {},       // 需要的标记
                completedNodes: config.completed || [],  // 完成的节点
                failedNodes: config.failed || []         // 失败的节点
            },
            
            // 4. 时间维度
            temporal: {
                minAge: config.minAge,
                maxAge: config.maxAge,
                timeSinceNode: {},  // 距离某节点的最短/最长时间
            },
            
            // 5. 关系维度
            relationships: {
                minAffinity: {},    // 最小好感度
                maxAffinity: {},    // 最大好感度
                requiredRelations: [] // 需要的关系状态
            }
        };
        
        // 概率权重系统
        this.probability = {
            base: config.baseProbability || 1.0,     // 基础概率
            weights: config.weights || {},           // 权重修正
            dynamicMods: [],                         // 动态修正器
            cap: config.probabilityCap || 1.0,       // 概率上限
            floor: config.probabilityFloor || 0.0    // 概率下限
        };
        
        // 互斥系统
        this.mutualExclusion = {
            exclusiveBranches: config.exclusiveBranches || [],  // 互斥分支
            exclusivePaths: config.exclusivePaths || [],        // 互斥路径
            oncePerRun: config.oncePerRun || false              // 每局只能选择一次
        };
        
        // 玩家选择反馈
        this.feedback = {
            immediateEffect: config.immediateEffect || {},      // 即时效果
            delayedEffect: config.delayedEffect || [],          // 延迟效果
            narrativeConsequence: config.consequence || '',     // 叙事后果描述
            visualFeedback: config.visualFeedback || {}         // 视觉反馈
        };
    }
    
    /**
     * 计算分支可用性及概率
     */
    calculateAvailability(context) {
        const result = {
            available: true,
            probability: this.probability.base,
            reasons: [],
            warnings: []
        };
        
        // 检查各维度触发条件
        if (!this.checkPropertyRequirements(context)) {
            result.available = false;
            result.reasons.push('属性要求不满足');
        }
        
        if (!this.checkGeneRequirements(context)) {
            result.available = false;
            result.reasons.push('叙事基因不匹配');
        }
        
        if (!this.checkStateRequirements(context)) {
            result.available = false;
            result.reasons.push('状态条件不满足');
        }
        
        // 计算概率权重
        result.probability = this.calculateWeightedProbability(context);
        
        // 应用动态修正
        this.probability.dynamicMods.forEach(mod => {
            result.probability = mod(result.probability, context);
        });
        
        // 限制在上下限之间
        result.probability = Math.max(
            this.probability.floor,
            Math.min(this.probability.cap, result.probability)
        );
        
        return result;
    }
}
```

### 2.3 概率触发机制 (Probabilistic Trigger System)

```javascript
/**
 * 动态概率事件系统
 * 结合瘟疫公司的"症状触发概率"与 P 社的"事件权重"
 */
class ProbabilisticEventSystem {
    constructor() {
        this.eventPool = new Map();           // 事件池
        this.activeModifiers = new Map();     // 激活的修正器
        this.history = [];                    // 触发历史
        this.contextWeights = new Map();      // 上下文权重
    }
    
    /**
     * 加权随机选择（改进版）
     */
    weightedRandomSelect(candidates, context) {
        if (candidates.length === 0) return null;
        if (candidates.length === 1) return candidates[0];
        
        // 计算每个候选的权重
        const weights = candidates.map(candidate => {
            let weight = candidate.probability.base;
            
            // 应用上下文权重
            const contextKey = this.getContextKey(candidate, context);
            if (this.contextWeights.has(contextKey)) {
                weight *= this.contextWeights.get(contextKey);
            }
            
            // 应用历史修正（避免重复）
            if (this.hasRecentlyTriggered(candidate.id)) {
                weight *= this.getRecencyPenalty(candidate.id);
            }
            
            // 应用动态修正器
            candidate.probability.dynamicMods.forEach(mod => {
                weight = mod(weight, context);
            });
            
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
            // 设置持续时间，到期恢复
            setTimeout(() => {
                this.contextWeights.set(eventId, 1.0);
            }, duration);
        }
    }
}
```

### 2.4 玩家选择影响权重计算模型 (Player Choice Impact Model)

```javascript
/**
 * 玩家选择权重计算模型
 * 类似 P 社的"影响力系统" + 瘟疫公司的"严重性评分"
 */
class ChoiceImpactModel {
    constructor() {
        // 叙事维度权重
        this.dimensions = {
            morality: {           // 道德维度
                value: 0,         // -100 (邪恶) 到 100 (善良)
                weight: 1.0,
                decay: 0.01       // 自然衰减率
            },
            chaos: {             // 混乱维度
                value: 0,         // 0 (有序) 到 100 (混乱)
                weight: 1.0,
                decay: 0.005
            },
            progress: {          // 进步维度
                value: 0,         // 0 (保守) 到 100 (激进)
                weight: 1.0,
                decay: 0.002
            },
            empathy: {           // 共情维度
                value: 0,         // 0 (冷漠) 到 100 (共情)
                weight: 1.0,
                decay: 0.01
            }
        };
        
        // 选择历史记录
        this.choiceHistory = [];
        
        // 权重修正器
        this.modifiers = new Map();
    }
    
    /**
     * 记录玩家选择并更新维度权重
     */
    recordChoice(choice) {
        const impact = choice.impact || {};
        const timestamp = Date.now();
        
        // 更新各维度值
        Object.keys(impact).forEach(dim => {
            if (this.dimensions[dim]) {
                const dimData = this.dimensions[dim];
                dimData.value += impact[dim];
                // 限制在合理范围内
                dimData.value = Math.max(-100, Math.min(100, dimData.value));
            }
        });
        
        // 记录选择历史
        this.choiceHistory.push({
            choice: choice.id,
            timestamp,
            impact,
            context: choice.context
        });
        
        // 触发权重更新事件
        this.onDimensionsChanged();
    }
    
    /**
     * 计算当前叙事倾向
     */
    calculateNarrativeDisposition() {
        const disposition = {};
        
        Object.keys(this.dimensions).forEach(key => {
            const dim = this.dimensions[key];
            disposition[key] = {
                value: dim.value,
                normalized: (dim.value + 100) / 200,  // 归一化到 0-1
                trend: this.calculateTrend(key)        // 计算趋势
            };
        });
        
        // 计算综合倾向标签
        disposition.tags = this.generateDispositionTags(disposition);
        
        return disposition;
    }
    
    /**
     * 计算某维度的变化趋势
     */
    calculateTrend(dimension) {
        const recentChoices = this.choiceHistory.slice(-10);
        if (recentChoices.length < 2) return 'stable';
        
        const values = recentChoices.map(c => 
            (c.impact[dimension] || 0)
        );
        
        const avg1 = values.slice(0, 5).reduce((a, b) => a + b, 0) / 5;
        const avg2 = values.slice(5).reduce((a, b) => a + b, 0) / 5;
        
        const diff = avg2 - avg1;
        if (diff > 0.5) return 'increasing';
        if (diff < -0.5) return 'decreasing';
        return 'stable';
    }
    
    /**
     * 生成倾向标签（用于剧情分支匹配）
     */
    generateDispositionTags(disposition) {
        const tags = [];
        
        if (disposition.morality.normalized < 0.3) tags.push('dark');
        if (disposition.morality.normalized > 0.7) tags.push('heroic');
        
        if (disposition.chaos.normalized > 0.6) tags.push('chaotic');
        if (disposition.chaos.normalized < 0.4) tags.push('orderly');
        
        if (disposition.progress.normalized > 0.7) tags.push('progressive');
        
        if (disposition.empathy.normalized > 0.6) tags.push('compassionate');
        
        return tags;
    }
}
```

### 2.5 剧情状态追踪系统 (Narrative State Tracking System)

```javascript
/**
 * 全局剧情状态追踪系统
 * 确保叙事连贯性的核心
 */
class NarrativeStateTracker {
    constructor() {
        // 节点触发状态
        this.nodeStates = new Map();
        
        // 路径激活状态
        this.pathStates = new Map();
        
        // 叙事基因库
        this.narrativeGenes = new Set();
        
        // 全局标记
        this.globalFlags = new Map();
        
        // 时间线记录
        this.timeline = [];
        
        // 上下文栈
        this.contextStack = [];
        
        // 监听器
        this.listeners = new Map();
    }
    
    /**
     * 记录节点触发
     */
    trackNodeTrigger(node, context) {
        const state = {
            nodeId: node.id,
            triggeredAt: Date.now(),
            context: { ...context },
            triggerCount: (this.nodeStates.get(node.id)?.triggerCount || 0) + 1
        };
        
        this.nodeStates.set(node.id, state);
        this.timeline.push({
            type: 'node_trigger',
            timestamp: state.triggeredAt,
            nodeId: node.id,
            context
        });
        
        // 通知监听器
        this.notifyListeners('nodeTriggered', { node, state });
        
        // 应用节点效应
        this.applyNodeEffects(node.effects);
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
                    reason: `缺少前置节点: ${requiredId}`
                };
            }
        }
        
        // 检查禁止的前置节点
        for (const forbiddenId of prereq.forbidden) {
            if (this.nodeStates.has(forbiddenId)) {
                return {
                    passed: false,
                    reason: `存在禁止节点: ${forbiddenId}`
                };
            }
        }
        
        // 检查动态条件
        for (const condition of prereq.conditions) {
            if (!condition(this)) {
                return {
                    passed: false,
                    reason: '动态条件不满足'
                };
            }
        }
        
        return { passed: true };
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
            genes: Array.from(this.narrativeGenes),
            flags: Object.fromEntries(this.globalFlags),
            recentHistory: this.timeline.slice(-20),
            disposition: this.calculateDisposition()
        };
    }
}
```

---

## 三、运行逻辑与实现方法

### 3.1 核心运行循环

```javascript
/**
 * 进化式叙事系统主控制器
 */
class EvolutionaryNarrativeSystem {
    constructor(config) {
        this.nodes = new Map();           // 所有剧情节点
        this.branches = new Map();        // 所有分支路径
        this.stateTracker = new NarrativeStateTracker();
        this.impactModel = new ChoiceImpactModel();
        this.eventSystem = new ProbabilisticEventSystem();
        this.coherenceEngine = new CoherenceEngine();
        
        this.currentNode = null;
        this.availableBranches = [];
    }
    
    /**
     * 系统主循环（每回合/每年调用）
     */
    async gameLoop(context) {
        // 1. 更新状态
        await this.updateState(context);
        
        // 2. 获取可用节点池
        const nodePool = this.getAvailableNodePool(context);
        
        // 3. 计算节点概率权重
        const weightedNodes = this.calculateNodeWeights(nodePool, context);
        
        // 4. 选择下一个节点
        const selectedNode = this.eventSystem.weightedRandomSelect(
            weightedNodes,
            context
        );
        
        // 5. 验证连贯性
        if (!this.coherenceEngine.validate(selectedNode, this.stateTracker)) {
            // 如果不连贯，选择备选节点
            return this.gameLoop(context);
        }
        
        // 6. 触发节点
        await this.triggerNode(selectedNode, context);
        
        // 7. 生成玩家选择分支
        this.availableBranches = this.generateBranches(selectedNode, context);
        
        // 8. 返回结果
        return {
            node: selectedNode,
            branches: this.availableBranches,
            context: this.stateTracker.getCoherenceContext()
        };
    }
    
    /**
     * 处理玩家选择
     */
    async handlePlayerChoice(branchId, context) {
        const branch = this.branches.get(branchId);
        if (!branch) throw new Error('Invalid branch');
        
        // 1. 应用分支效果
        await this.applyBranchEffects(branch);
        
        // 2. 记录玩家选择影响
        this.impactModel.recordChoice({
            id: branchId,
            impact: branch.impact,
            context
        });
        
        // 3. 更新状态追踪
        this.stateTracker.trackBranchSelection(branch, context);
        
        // 4. 跳转到目标节点
        this.currentNode = branch.targetNode;
        
        // 5. 触发目标节点
        return this.triggerNode(this.currentNode, context);
    }
}
```

### 3.2 叙事连贯性保障机制

```javascript
/**
 * 叙事连贯性引擎
 * 确保剧情发展合理、不矛盾
 */
class CoherenceEngine {
    constructor() {
        this.rules = new Map();           // 连贯性规则
        this.validators = new Map();      // 验证器
        this.contradictions = new Set();  // 已知的矛盾组合
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
        
        // 3. 检查角色行为一致性
        if (this.hasCharacterInconsistency(node, context)) {
            violations.push('角色行为不一致');
        }
        
        // 4. 检查叙事节奏
        if (this.hasPacingIssue(node, context)) {
            violations.push('叙事节奏问题');
        }
        
        // 5. 应用自定义规则
        for (const [ruleId, rule] of this.rules) {
            if (!rule(node, context)) {
                violations.push(`违反规则：${ruleId}`);
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
     * 修复不连贯的节点（尝试找到替代方案）
     */
    repairIncoherentNode(node, stateTracker) {
        const alternatives = this.findAlternativeNodes(node, stateTracker);
        
        for (const alt of alternatives) {
            if (this.validate(alt, stateTracker)) {
                return alt;
            }
        }
        
        return null;
    }
}
```

---

## 四、系统应用示例

### 4.1 核心剧情脉络图设计

```
【人生重开：进化版】剧情脉络图

起始节点 (START)
    │
    ├─→ 童年事件链 (Childhood)
    │     ├─ 普通童年 → 学生时代 → 青年抉择
    │     ├─ 天才童年 → 跳级 → 少年成名
    │     └─ 不幸童年 → 心理创伤 → 救赎/堕落分支
    │
    ├─→ 青春期事件链 (Adolescence)
    │     ├─ 学业路线 → 高考 → 大学/落榜
    │     ├─ 恋爱路线 → 初恋 → 结婚/分手
    │     └─ 叛逆路线 → 辍学 → 创业/堕落
    │
    ├─→ 成年事件链 (Adulthood)
    │     ├─ 事业线
    │     │   ├─ 普通职员 → 中层管理 → CEO/失业
    │     │   ├─ 创业者 → 公司发展 → 上市/破产
    │     │   └─ 自由职业 → 名声积累 → 成功/失败
    │     │
    │     ├─ 家庭线
    │     │   ├─ 单身 → 相亲 → 婚姻
    │     │   ├─ 恋爱 → 结婚 → 生子
    │     │   └─ 丁克 → 中年危机 → 后悔/释然
    │     │
    │     └─ 个人成长线
    │         ├─ 技能提升 → 专家/半途而废
    │         ├─ 健康管理 → 长寿/疾病
    │         └─ 精神追求 → 悟道/迷茫
    │
    └─→ 特殊事件链 (Special)
          ├─ 超自然路线（需要特定天赋）
          ├─ 历史名人路线（需要特定条件）
          └─ 隐藏结局路线（多周目解锁）

【进化路径示例】
普通上班族
    ├─ [勤奋工作] → 升职加薪 → 中层管理
    │   └─ [继续努力] → 高层管理 → CEO
    │   └─ [遭遇瓶颈] → 中年危机 → 转行/失业
    │
    ├─ [发展副业] → 收入增加 → 创业
    │   └─ [成功] → 财务自由
    │   └─ [失败] → 负债累累
    │
    └─ [躺平] → 维持现状 → 被裁员
        ├─ [振作] → 重新求职
        └─ [消沉] → 啃老/流浪

【多结局系统】
- 普通结局 (80%): 平凡一生
- 成功结局 (15%): 事业有成
- 完美结局 (4%): 人生赢家
- 特殊结局 (1%): 传奇人生
- 隐藏结局 (<0.1%): 解锁秘密
```

---

## 五、实现文件结构

```
src/modules/narrative/
├── EvolutionaryNarrativeSystem.js   // 主系统控制器
├── NarrativeNode.js                 // 剧情节点类
├── NarrativeBranch.js               // 分支路径类
├── ProbabilisticEventSystem.js      // 概率事件系统
├── ChoiceImpactModel.js             // 选择影响模型
├── NarrativeStateTracker.js         // 状态追踪器
├── CoherenceEngine.js               // 连贯性引擎
├── NarrativeGenePool.js             // 叙事基因库
└── EventTemplates.js                // 事件模板库

data/zh-cn/narrative/
├── nodes.json                       // 剧情节点数据
├── branches.json                    // 分支路径数据
├── events.json                      // 事件模板数据
├── endings.json                     // 结局配置
└── coherence_rules.json             // 连贯性规则

public/data/zh-cn/
├── narrative_nodes.json             // 编译后的节点数据
├── narrative_branches.json          // 编译后的分支数据
└── narrative_events.json            // 编译后的事件数据
```

---

## 六、使用示例

### 6.1 创建剧情节点

```javascript
const node = new NarrativeNode({
    id: 'career_startup_001',
    type: 'branch',
    name: '创业抉择',
    content: [
        '你积累了一些经验和人脉，现在有机会创办自己的公司。',
        '但是创业风险巨大，你需要慎重考虑。'
    ],
    tags: ['career', 'decision', 'adulthood'],
    priority: 10,
    
    prerequisites: {
        required: ['work_experience_003'],
        minAge: 25,
        conditions: [
            (state) => state.getProperty('MNY') >= 50000
        ]
    },
    
    effects: {
        flagSet: { 'startup_opportunity': true },
        pathUnlocks: ['startup_path']
    }
});
```

### 6.2 创建分支路径

```javascript
const branch = new NarrativeBranch({
    id: 'startup_decision_accept',
    sourceNode: 'career_startup_001',
    targetNode: 'startup_journey_001',
    name: '接受挑战，开始创业',
    description: '辞去工作，全身心投入创业',
    
    triggers: {
        properties: {
            min: { MNY: 50000, INT: 8 }
        },
        genes: {
            required: ['ambitious', 'risk_taker']
        }
    },
    
    probability: {
        base: 0.6,
        weights: {
            MNY: (value) => value / 100000,
            SPR: (value) => value > 5 ? 1.2 : 0.8
        }
    },
    
    impact: {
        morality: -5,      // 创业可能变得唯利是图
        chaos: 20,         // 生活变得不稳定
        progress: 15       // 快速成长
    },
    
    feedback: {
        immediateEffect: { MNY: -30000, SPR: -5 },
        narrativeConsequence: '你踏上了充满不确定性的创业之路'
    }
});
```

### 6.3 配置概率事件

```javascript
const eventConfig = {
    id: 'random_business_event',
    type: 'dynamic',
    templates: [
        {
            id: 'investor_interest',
            weight: 0.3,
            condition: (context) => context.business_stage === 'early',
            content: '一位投资人对你的项目表示兴趣'
        },
        {
            id: 'employee_resignation',
            weight: 0.2,
            condition: (context) => context.team_size > 5,
            content: '一名核心员工提出离职'
        },
        {
            id: 'product_breakthrough',
            weight: 0.1,
            condition: (context) => context.rd_investment > 100000,
            content: '研发团队取得重大突破'
        }
    ],
    dynamicMods: [
        (weight, context) => {
            // 根据玩家倾向调整概率
            if (context.disposition.tags.includes('lucky')) {
                return weight * 1.5;
            }
            return weight;
        }
    ]
};
```

---

## 七、动态平衡调整方案

### 7.1 实时难度调节

```javascript
class DynamicBalanceAdjuster {
    constructor(system) {
        this.system = system;
        this.playerMetrics = {
            winRate: 0,
            averageScore: 0,
            choicePatterns: [],
            frustrationIndicators: []
        };
    }
    
    adjustBasedOnPerformance() {
        // 如果玩家胜率过低，提高有利事件概率
        if (this.playerMetrics.winRate < 0.3) {
            this.system.eventSystem.adjustProbability(
                'positive_events',
                1.2,
                300000  // 持续 5 分钟
            );
        }
        
        // 如果玩家胜率过高，增加挑战性
        if (this.playerMetrics.winRate > 0.8) {
            this.system.eventSystem.adjustProbability(
                'challenge_events',
                1.3,
                300000
            );
        }
    }
}
```

### 7.2 叙事节奏控制

```javascript
class PacingController {
    constructor() {
        this.tensionLevel = 0;      // 紧张度 0-100
        this.lastEventIntensity = 0;
        this.pacingHistory = [];
    }
    
    calculateNextEventIntensity() {
        // 避免连续高强度事件
        if (this.tensionLevel > 70) {
            return Math.random() * 0.3;  // 低强度
        }
        
        // 避免长时间平淡
        if (this.tensionLevel < 30 && this.pacingHistory.length > 5) {
            return Math.random() * 0.5 + 0.5;  // 中高强度
        }
        
        // 正常波动
        return Math.random() * 0.6 + 0.2;
    }
}
```

---

## 八、总结

本系统通过以下创新点实现了剧情设计的进化：

1. **节点网络架构**：将线性剧情转变为网状结构，支持多路径探索
2. **多维度分支**：从单一选择扩展为属性、基因、状态、时间、关系五维触发
3. **动态概率系统**：根据上下文和玩家历史行为实时调整事件概率
4. **权重计算模型**：量化玩家选择的长期影响，形成独特的"叙事基因"
5. **状态追踪系统**：全局监控剧情状态，确保逻辑自洽
6. **连贯性保障**：通过规则引擎防止剧情矛盾
7. **动态平衡**：根据玩家表现自动调整难度和节奏

这套系统可以应用于任何文本驱动的叙事游戏，提供深度、连贯且高度个性化的剧情体验。
