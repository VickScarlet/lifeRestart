# 进化式叙事系统使用指南
## Evolutionary Narrative System - Implementation Guide

---

## 一、快速开始

### 1.1 集成到现有项目

```javascript
// 1. 在 src/index.js 中导入系统
import EvolutionaryNarrativeSystem from './modules/narrative/EvolutionaryNarrativeSystem.js';

// 2. 创建系统实例
const narrativeSystem = new EvolutionaryNarrativeSystem({
    enableDynamicBalance: true,
    enableCoherenceCheck: true,
    debugMode: false
});

// 3. 初始化系统
await narrativeSystem.initial(
    async (dataSet) => {
        // 加载数据文件
        const response = await fetch(`data/${language}/${dataSet}.json`);
        return await response.json();
    }
);

// 4. 在游戏循环中使用
async function gameLoop(gameContext) {
    // 准备上下文
    const context = {
        age: player.age,
        CHR: player.charm,
        INT: player.intelligence,
        STR: player.strength,
        MNY: player.money,
        SPR: player.spirit,
        completedNodes: player.completedNodes,
        selectedBranches: player.selectedBranches,
        // ... 其他上下文
    };
    
    // 运行叙事系统
    const result = await narrativeSystem.gameLoop(context);
    
    // 显示剧情
    displayNarrative(result);
    
    // 等待玩家选择
    if (result.branches.length > 0) {
        const choice = await waitForPlayerChoice(result.branches);
        await narrativeSystem.handlePlayerChoice(choice, context);
    }
}
```

### 1.2 配置系统参数

```javascript
const config = {
    // 影响模型配置
    impactModel: {
        moralityWeight: 1.2,      // 道德维度权重
        moralityDecay: 0.01,      // 道德衰减率
        chaosWeight: 1.0,
        chaosDecay: 0.005,
        progressWeight: 1.0,
        progressDecay: 0.002,
        empathyWeight: 1.0,
        empathyDecay: 0.01,
        maxHistoryLength: 100
    },
    
    // 连贯性引擎配置
    coherence: {
        enableTimelineCheck: true,
        enablePacingCheck: true,
        enableCharacterCheck: false
    },
    
    // 系统配置
    maxHistoryLength: 100,
    enableDynamicBalance: true,
    enableCoherenceCheck: true,
    debugMode: false
};
```

---

## 二、创建剧情内容

### 2.1 创建剧情节点

```json
{
  "id": "unique_node_id",
  "type": "normal",
  "name": "节点名称",
  "content": "剧情文本内容",
  "tags": ["标签 1", "标签 2"],
  "priority": 7,
  "onceOnly": false,
  "prerequisites": {
    "requiredNodes": ["前置节点 ID"],
    "forbiddenNodes": ["禁止的节点 ID"],
    "minAge": 18,
    "maxAge": 30,
    "requiredFlags": {
      "flag_name": true
    },
    "conditions": [
      "(state) => state.getGlobalFlag('MNY', 0) >= 50"
    ]
  },
  "effects": {
    "propertyChanges": {
      "CHR": 5,
      "INT": -2
    },
    "flagSet": {
      "new_flag": true
    },
    "pathUnlocks": ["path_id"],
    "geneAdd": ["gene_name"]
  }
}
```

### 2.2 创建分支路径

```json
{
  "id": "branch_id",
  "sourceNode": "起始节点 ID",
  "targetNode": "目标节点 ID",
  "name": "分支名称（玩家可见）",
  "description": "分支描述",
  "minProperties": {
    "CHR": 5,
    "INT": 8
  },
  "maxProperties": {
    "MNY": 100
  },
  "requiredGenes": ["ambitious", "risk_taker"],
  "baseProbability": 0.6,
  "impact": {
    "morality": -5,
    "chaos": 20,
    "progress": 15,
    "empathy": 0
  },
  "feedback": {
    "immediateEffect": {
      "MNY": -30,
      "SPR": -5
    },
    "narrativeConsequence": "叙事后果描述"
  },
  "exclusiveBranches": ["互斥分支 ID"]
}
```

---

## 三、高级功能

### 3.1 自定义连贯性规则

```javascript
// 添加自定义规则
narrativeSystem.coherenceEngine.addRule(
    'custom_rule_id',
    (node, context) => {
        // 自定义验证逻辑
        if (node.id === 'bad_node' && context.triggeredNodes.includes('good_node')) {
            return false;
        }
        return true;
    }
);

// 添加矛盾组合
narrativeSystem.coherenceEngine.addContradiction('node_a', 'node_b');
```

### 3.2 动态概率调整

```javascript
// 调整特定事件概率
narrativeSystem.eventSystem.adjustProbability(
    'event_id',
    1.5,      // 修正系数
    300000    // 持续时间（毫秒）
);

// 调整全局权重
narrativeSystem.eventSystem.adjustGlobalWeight(
    'positive_events',
    1.2
);
```

### 3.3 监听系统事件

```javascript
// 添加监听器
narrativeSystem.stateTracker.addListener('nodeTriggered', (data) => {
    console.log('Node triggered:', data.node.id);
});

narrativeSystem.stateTracker.addListener('branchSelected', (data) => {
    console.log('Branch selected:', data.branch.id);
});

// 移除监听器
narrativeSystem.stateTracker.removeListener('nodeTriggered', callback);
```

---

## 四、最佳实践

### 4.1 剧情节点设计

1. **节点粒度**：每个节点应该代表一个有意义的剧情片段
2. **标签系统**：使用标签对节点进行分类，便于过滤和匹配
3. **优先级设置**：
   - 1-3：日常事件
   - 4-6：普通事件
   - 7-8：重要事件
   - 9-10：关键剧情/高潮事件

### 4.2 分支路径设计

1. **多维度触发**：结合属性、基因、状态等多个维度
2. **概率平衡**：避免某个分支概率过高或过低
3. **互斥设计**：使用互斥系统增加选择的代价
4. **反馈清晰**：给玩家明确的即时和延迟反馈

### 4.3 叙事基因设计

```javascript
// 推荐的叙事基因标签
const NARRATIVE_GENES = {
    // 童年相关
    happy_childhood: '快乐的童年',
    hard_childhood: '艰难的童年',
    
    // 性格相关
    ambitious: '有野心',
    cautious: '谨慎',
    risk_taker: '冒险者',
    
    // 经历相关
    midlife_crisis: '中年危机',
    successful_career: '事业成功',
    
    // 关系相关
    family_oriented: '重视家庭',
    loner: '独来独往'
};
```

### 4.4 连贯性保障

1. **前置条件**：合理设置节点的前置条件
2. **矛盾定义**：明确定义互斥的剧情节点
3. **节奏控制**：避免连续高潮或长时间平淡
4. **状态追踪**：充分利用状态追踪系统

---

## 五、调试技巧

### 5.1 启用调试模式

```javascript
const system = new EvolutionaryNarrativeSystem({
    debugMode: true  // 启用详细日志
});
```

### 5.2 查看系统状态

```javascript
// 获取统计信息
const stats = system.getStatistics();
console.log(stats);

// 导出状态
const state = system.stateTracker.exportState();
console.log(state);

// 查看叙事倾向
const disposition = system.impactModel.calculateNarrativeDisposition();
console.log(disposition);
```

### 5.3 常见问题排查

1. **节点不触发**：
   - 检查前置条件是否满足
   - 检查年龄范围
   - 检查标签匹配
   - 查看连贯性验证是否通过

2. **分支不可用**：
   - 检查属性要求
   - 检查叙事基因
   - 检查互斥分支
   - 查看概率计算

3. **概率异常**：
   - 检查权重修正器
   - 查看历史惩罚
   - 验证上下文权重

---

## 六、性能优化

### 6.1 数据加载优化

```javascript
// 预加载数据
const [nodesData, branchesData, eventsData] = await Promise.all([
    fetch('data/narrative_nodes.json').then(r => r.json()),
    fetch('data/narrative_branches.json').then(r => r.json()),
    fetch('data/narrative_events.json').then(r => r.json())
]);
```

### 6.2 状态管理优化

```javascript
// 定期清理历史记录
if (system.stateTracker.timeline.length > 100) {
    system.stateTracker.timeline = system.stateTracker.timeline.slice(-50);
}

// 重置不再需要的状态
system.stateTracker.reset();
```

---

## 七、扩展开发

### 7.1 添加新的叙事维度

```javascript
// 扩展 ChoiceImpactModel
class CustomImpactModel extends ChoiceImpactModel {
    constructor(config) {
        super(config);
        
        // 添加新维度
        this.dimensions.reputation = {
            value: 0,
            weight: 1.0,
            decay: 0.005
        };
    }
}
```

### 7.2 自定义验证规则

```javascript
// 创建自定义连贯性引擎
class CustomCoherenceEngine extends CoherenceEngine {
    hasCustomInconsistency(node, context) {
        // 自定义验证逻辑
        return false;
    }
    
    validate(node, stateTracker) {
        const result = super.validate(node, stateTracker);
        
        // 添加额外验证
        if (this.hasCustomInconsistency(node, stateTracker.getCoherenceContext())) {
            return false;
        }
        
        return result;
    }
}
```

---

## 八、示例项目结构

```
project/
├── src/
│   ├── modules/
│   │   ├── narrative/
│   │   │   ├── EvolutionaryNarrativeSystem.js
│   │   │   ├── NarrativeNode.js
│   │   │   ├── NarrativeBranch.js
│   │   │   ├── ProbabilisticEventSystem.js
│   │   │   ├── ChoiceImpactModel.js
│   │   │   ├── NarrativeStateTracker.js
│   │   │   └── CoherenceEngine.js
│   │   └── life.js
│   └── index.js
├── data/
│   └── zh-cn/
│       ├── narrative_nodes.json
│       ├── narrative_branches.json
│       ├── narrative_events.json
│       └── coherence_rules.json
└── design/
    └── EVOLUTIONARY_NARRATIVE_SYSTEM.md
```

---

## 九、总结

进化式叙事系统提供了：

1. **灵活的节点网络**：支持复杂的剧情结构
2. **多维度分支系统**：丰富的选择机制
3. **动态概率调整**：智能的事件触发
4. **状态追踪**：完整的剧情历史
5. **连贯性保障**：合理的叙事发展
6. **可扩展架构**：易于定制和扩展

通过合理使用这些功能，可以创造出深度、连贯且高度个性化的剧情体验。
