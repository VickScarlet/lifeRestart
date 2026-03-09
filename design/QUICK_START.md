# ENS 系统集成使用说明
## Quick Start Guide - ENS Integration

---

## 一、快速开始（3 分钟集成）

### 1.1 基础集成（推荐）

```javascript
// 在 src/index.js 中添加以下代码

// 1. 导入 ENS 模块
import { createAdapter } from './modules/narrative/index.js';

// 2. 创建适配器（在现有代码之后）
const ensAdapter = createAdapter(core);  // core 是现有的 Life 实例

// 3. 初始化 ENS
await ensAdapter.initialize();

// 4. 在游戏循环中使用
async function gameLoop() {
    // 运行 ENS 叙事循环
    const narrativeResult = await ensAdapter.runNarrativeLoop();
    
    // 显示剧情
    if (narrativeResult) {
        displayNarrative(narrativeResult);
        
        // 等待玩家选择
        if (narrativeResult.branches.length > 0) {
            const choice = await waitForPlayerChoice(narrativeResult.branches);
            await ensAdapter.handlePlayerChoice(choice.id);
        }
    }
}
```

### 1.2 最小化集成（仅 2 行代码）

```javascript
// 在现有游戏循环中添加
import { createENS } from './modules/narrative/index.js';

const ens = createENS();
await ens.initial(async (name) => {
    const res = await fetch(`data/zh-cn/${name}.json`);
    return await res.json();
});

// 在需要触发剧情时
const result = await ens.gameLoop(context);
```

---

## 二、完整集成示例

### 2.1 修改 src/index.js

```javascript
import App from './app.js';
import Life from './modules/life.js';
import { createAdapter } from './modules/narrative/index.js';  // 新增

// ... 现有代码 ...

const core = new Life();
const game = new App();

// 新增：创建 ENS 适配器
const ensAdapter = createAdapter(core);

// 修改初始化流程
async function init() {
    // 原有初始化
    await core.initial(i18n, common);
    
    // 新增：初始化 ENS
    try {
        await ensAdapter.initialize();
        console.log('ENS initialized successfully');
    } catch (error) {
        console.warn('ENS initialization failed:', error);
    }
    
    // 启动游戏
    game.start(query);
}

init();

// 修改游戏循环
async function gameLoop() {
    // 原有逻辑
    const result = core.next();
    
    // 新增：ENS 叙事
    if (ensAdapter.isENSEnabled()) {
        const narrativeResult = await ensAdapter.runNarrativeLoop();
        if (narrativeResult) {
            // 合并 ENS 剧情
            result.narrative = narrativeResult;
        }
    }
    
    return result;
}
```

### 2.2 创建剧情数据文件

在 `data/zh-cn/` 目录下创建 JSON 文件：

**narrative_nodes.json** (剧情节点):
```json
[
  {
    "id": "start",
    "type": "normal",
    "name": "新生",
    "content": "你来到了这个世界。",
    "tags": ["start"],
    "priority": 10,
    "prerequisites": {
      "minAge": 0,
      "maxAge": 0
    }
  }
]
```

**narrative_branches.json** (分支路径):
```json
[
  {
    "id": "branch_1",
    "sourceNode": "start",
    "targetNode": "childhood",
    "name": "开始成长",
    "baseProbability": 1.0
  }
]
```

---

## 三、API 参考

### 3.1 核心 API

#### EvolutionaryNarrativeSystem

```javascript
// 创建实例
const ens = new EvolutionaryNarrativeSystem(config);

// 初始化
await ens.initial(async (dataSet) => {
    // 加载数据
    const response = await fetch(`data/${dataSet}.json`);
    return await response.json();
});

// 运行叙事循环
const result = await ens.gameLoop(context);

// 处理玩家选择
await ens.handlePlayerChoice(branchId, context);
```

#### ENSAdapter（推荐）

```javascript
// 创建适配器
const adapter = new ENSAdapter(lifeModule);

// 初始化
await adapter.initialize();

// 运行叙事循环
const result = await adapter.runNarrativeLoop();

// 处理选择
await adapter.handlePlayerChoice(branchId);

// 获取叙事倾向
const disposition = adapter.getNarrativeDisposition();

// 导出/导入状态
const state = adapter.exportState();
adapter.importState(state);
```

### 3.2 配置选项

```javascript
const config = {
    // 系统配置
    enableDynamicBalance: true,    // 动态平衡
    enableCoherenceCheck: true,    // 连贯性检查
    debugMode: false,              // 调试模式
    maxHistoryLength: 100,         // 最大历史记录
    
    // 影响模型配置
    impactModel: {
        moralityWeight: 1.0,       // 道德权重
        chaosWeight: 1.0,          // 混乱权重
        progressWeight: 1.0,       // 进步权重
        empathyWeight: 1.0,        // 共情权重
        maxHistoryLength: 100
    }
};
```

### 3.3 上下文格式

```javascript
const context = {
    // 基础属性
    age: 20,
    CHR: 10,
    INT: 15,
    STR: 8,
    MNY: 50,
    SPR: 12,
    
    // 游戏状态
    completedNodes: ['node_1'],
    selectedBranches: ['branch_1'],
    activePaths: ['path_1'],
    
    // 标记
    hasJob: true,
    hasPartner: false,
    
    // 叙事倾向（可选）
    disposition: {
        morality: { value: 50, normalized: 0.75 },
        chaos: { value: 30, normalized: 0.3 },
        tags: ['heroic', 'orderly']
    }
};
```

---

## 四、常见使用场景

### 4.1 年度叙事循环

```javascript
// 每年触发一次 ENS 叙事
async function onYearPassed() {
    const context = buildContext();
    const result = await ensAdapter.runNarrativeLoop();
    
    if (result) {
        // 显示年度剧情
        showNarrative(result.content);
        
        // 提供选择
        if (result.branches.length > 0) {
            const choice = await playerChoose(result.branches);
            await ensAdapter.handlePlayerChoice(choice.id);
        }
    }
}
```

### 4.2 关键事件叙事

```javascript
// 在关键事件时触发特殊叙事
async function onCriticalEvent(eventType) {
    const context = buildContext();
    context.eventType = eventType;
    
    const result = await ens.gameLoop(context);
    
    if (result.nodeType === 'branch') {
        // 重要抉择
        await showBranchUI(result.branches);
    }
}
```

### 4.3 结局判定

```javascript
// 根据叙事倾向判定结局
function determineEnding() {
    const disposition = ensAdapter.getNarrativeDisposition();
    
    if (disposition.morality.normalized > 0.8) {
        return 'heroic_ending';
    } else if (disposition.chaos.normalized > 0.7) {
        return 'chaotic_ending';
    } else {
        return 'normal_ending';
    }
}
```

---

## 五、调试技巧

### 5.1 启用调试模式

```javascript
const ens = new EvolutionaryNarrativeSystem({
    debugMode: true  // 输出详细日志
});
```

### 5.2 查看系统状态

```javascript
// 获取统计信息
const stats = ens.getStatistics();
console.log(stats);

// 查看叙事倾向
const disposition = ensAdapter.getNarrativeDisposition();
console.log(disposition);

// 导出状态用于分析
const state = ensAdapter.exportState();
console.log(JSON.stringify(state, null, 2));
```

### 5.3 常见问题排查

**问题 1: 节点不触发**
```javascript
// 检查前置条件
const node = ens.nodes.get('node_id');
const prereqResult = node.isAvailable(context, ens.stateTracker);
console.log(prereqResult);  // 查看具体原因
```

**问题 2: 分支不可用**
```javascript
// 检查分支可用性
const branch = ens.branches.get('branch_id');
const availability = branch.calculateAvailability(context);
console.log(availability);  // 查看原因和概率
```

**问题 3: 概率异常**
```javascript
// 检查权重修正
const weight = branch.calculateWeightedProbability(context);
console.log('Base:', branch.probability.base);
console.log('Final:', weight);
```

---

## 六、性能优化

### 6.1 数据预加载

```javascript
// 预加载所有剧情数据
const [nodes, branches, events] = await Promise.all([
    fetch('data/narrative_nodes.json').then(r => r.json()),
    fetch('data/narrative_branches.json').then(r => r.json()),
    fetch('data/narrative_events.json').then(r => r.json())
]);

// 一次性加载
await ens.loadNodes(nodes);
await ens.loadBranches(branches);
await ens.eventSystem.loadTemplates(events);
```

### 6.2 状态管理优化

```javascript
// 定期清理历史记录
if (ens.stateTracker.timeline.length > 100) {
    ens.stateTracker.timeline = ens.stateTracker.timeline.slice(-50);
}

// 重置不再需要的状态
function onGameReset() {
    ensAdapter.reset();
}
```

---

## 七、最佳实践

### 7.1 剧情节点设计

```javascript
// ✅ 好的做法
{
    id: 'career_startup',
    type: 'branch',
    content: '你有机会创业...',
    priority: 8,  // 重要事件
    prerequisites: {
        minAge: 25,
        requiredNodes: ['work_experience'],
        conditions: [
            (state) => state.getGlobalFlag('MNY', 0) >= 50
        ]
    }
}

// ❌ 避免这样做
{
    id: 'random_event',
    type: 'normal',
    content: '随机事件...',
    priority: 1,  // 优先级过低
    prerequisites: {}  // 无条件
}
```

### 7.2 分支路径设计

```javascript
// ✅ 多维度条件
{
    id: 'difficult_choice',
    minProperties: { INT: 10, MNY: 50 },
    requiredGenes: ['ambitious'],
    baseProbability: 0.6,
    impact: {
        morality: -5,
        chaos: 20,
        progress: 15
    }
}

// ❌ 避免单一条件
{
    id: 'simple_choice',
    minProperties: { INT: 5 },  // 仅一个条件
    baseProbability: 1.0  // 总是触发
}
```

---

## 八、示例代码

### 8.1 完整游戏循环示例

```javascript
import { createAdapter } from './modules/narrative/index.js';

class Game {
    constructor() {
        this.core = new Life();
        this.ensAdapter = createAdapter(this.core);
    }
    
    async init() {
        await this.core.initial(i18n, common);
        await this.ensAdapter.initialize();
    }
    
    async start() {
        // 游戏开始
        this.core.start(allocation);
        
        // 游戏主循环
        while (!this.core.isEnd()) {
            await this.gameLoop();
        }
        
        // 游戏结束
        await this.showEnding();
    }
    
    async gameLoop() {
        // 原有逻辑
        const result = this.core.next();
        
        // ENS 叙事
        const narrative = await this.ensAdapter.runNarrativeLoop();
        
        // 合并结果
        const mergedResult = {
            ...result,
            narrative: narrative
        };
        
        // 显示
        this.display(mergedResult);
        
        // 处理选择
        if (narrative?.branches?.length > 0) {
            const choice = await this.waitForChoice(narrative.branches);
            await this.ensAdapter.handlePlayerChoice(choice.id);
        }
    }
    
    async showEnding() {
        // 根据叙事倾向显示不同结局
        const disposition = this.ensAdapter.getNarrativeDisposition();
        const ending = this.determineEnding(disposition);
        this.showEndingUI(ending);
    }
}
```

---

## 九、资源链接

- [系统架构文档](./EVOLUTIONARY_NARRATIVE_SYSTEM.md) - 详细设计说明
- [实现指南](./ENS_IMPLEMENTATION_GUIDE.md) - 深入实现细节
- [系统总结](./SYSTEM_SUMMARY.md) - 核心功能概览
- [部署报告](./DEPLOYMENT_REPORT.md) - 部署验证信息

---

## 十、技术支持

如遇到问题，请检查：
1. 浏览器控制台错误信息
2. 启用 debugMode 查看详细日志
3. 参考文档中的常见问题部分
4. 检查数据文件格式是否正确

---

**文档版本**: 1.0.0  
**最后更新**: 2026-03-09
