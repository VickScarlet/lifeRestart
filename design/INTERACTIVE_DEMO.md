# ENS 系统集成交互演示
## Interactive Demo - ENS Integration

---

## 🎮 演示场景：使用 ENS 增强游戏叙事

本演示展示如何在实际游戏中使用进化式叙事系统。

---

## 场景一：基础集成演示

### 步骤 1: 导入模块

```javascript
// 在 src/index.js 中添加
import { createAdapter, createENS } from './modules/narrative/index.js';
```

### 步骤 2: 创建适配器

```javascript
// 在现有代码基础上添加
const core = new Life();
const game = new App();

// 新增：创建 ENS 适配器
const ensAdapter = createAdapter(core);

// 初始化 ENS
await ensAdapter.initialize();
console.log('✅ ENS 系统已初始化');
```

### 步骤 3: 修改游戏循环

```javascript
// 在 game.js 或 app.js 中修改游戏循环
async function gameLoop() {
    // 原有逻辑
    const result = core.next();
    
    // 新增：ENS 叙事
    if (ensAdapter.isENSEnabled()) {
        const narrative = await ensAdapter.runNarrativeLoop();
        
        if (narrative) {
            console.log('📖 触发剧情:', narrative.content);
            
            // 显示分支选择
            if (narrative.branches.length > 0) {
                console.log('🔀 可选分支:');
                narrative.branches.forEach((branch, index) => {
                    console.log(`  ${index + 1}. ${branch.name} (概率：${(branch.probability * 100).toFixed(1)}%)`);
                });
                
                // 等待玩家选择
                const choice = await waitForPlayerChoice(narrative.branches);
                await ensAdapter.handlePlayerChoice(choice.id);
            }
        }
    }
    
    return result;
}
```

---

## 场景二：创建自定义剧情

### 创建剧情节点

```javascript
// 创建自定义剧情节点
const nodes = [
    {
        id: 'demo_start',
        type: 'normal',
        name: '演示开始',
        content: '你遇到了一个重要的抉择时刻。',
        tags: ['demo', 'decision'],
        priority: 10,
        prerequisites: {
            minAge: 18,
            maxAge: 30
        }
    },
    {
        id: 'demo_success',
        type: 'normal',
        name: '成功之路',
        content: '你选择了挑战，并且成功了！',
        tags: ['demo', 'success'],
        priority: 8,
        prerequisites: {
            requiredNodes: ['demo_start']
        },
        effects: {
            propertyChanges: { MNY: 20, INT: 5 },
            flagSet: { success: true }
        }
    },
    {
        id: 'demo_failure',
        type: 'normal',
        name: '失败经历',
        content: '挑战失败了，但你获得了宝贵的经验。',
        tags: ['demo', 'failure'],
        priority: 8,
        prerequisites: {
            requiredNodes: ['demo_start']
        },
        effects: {
            propertyChanges: { SPR: 5, MNY: -10 },
            flagSet: { failed: true }
        }
    }
];

// 加载节点
await ens.loadNodes(nodes);
```

### 创建分支路径

```javascript
// 创建分支
const branches = [
    {
        id: 'demo_accept',
        sourceNode: 'demo_start',
        targetNode: 'demo_success',
        name: '接受挑战',
        description: '勇敢面对挑战',
        minProperties: { INT: 10, STR: 8 },
        baseProbability: 0.6,
        impact: {
            morality: 5,
            chaos: 10,
            progress: 15
        },
        feedback: {
            immediateEffect: { MNY: -5, SPR: -3 },
            narrativeConsequence: '你踏上了充满挑战的道路'
        }
    },
    {
        id: 'demo_decline',
        sourceNode: 'demo_start',
        targetNode: 'demo_failure',
        name: '放弃挑战',
        description: '选择安稳的道路',
        baseProbability: 0.4,
        impact: {
            morality: 0,
            chaos: -5,
            progress: -5
        },
        feedback: {
            immediateEffect: { SPR: 3 },
            narrativeConsequence: '你选择了安稳的生活'
        }
    }
];

// 加载分支
await ens.loadBranches(branches);
```

---

## 场景三：实时监控叙事状态

### 显示叙事倾向

```javascript
// 实时显示玩家的叙事倾向
function showDisposition() {
    const disposition = ensAdapter.getNarrativeDisposition();
    
    console.log('📊 当前叙事倾向:');
    console.log(`  道德：${disposition.morality.value.toFixed(1)} (${disposition.morality.trend})`);
    console.log(`  混乱：${disposition.chaos.value.toFixed(1)} (${disposition.chaos.trend})`);
    console.log(`  进步：${disposition.progress.value.toFixed(1)} (${disposition.progress.trend})`);
    console.log(`  共情：${disposition.empathy.value.toFixed(1)} (${disposition.empathy.trend})`);
    console.log(`  标签：${disposition.tags.join(', ')}`);
    console.log(`  主导倾向：${disposition.dominant}`);
}

// 每次选择后显示
ensAdapter.handlePlayerChoice(branchId).then(() => {
    showDisposition();
});
```

### 查看系统统计

```javascript
// 查看系统运行统计
function showStatistics() {
    const stats = ens.getStatistics();
    
    console.log('📈 系统统计:');
    console.log(`  总节点数：${stats.totalNodes}`);
    console.log(`  总分支数：${stats.totalBranches}`);
    console.log(`  已触发节点：${stats.triggeredNodes}`);
    console.log(`  选择历史：${stats.choiceHistory}`);
}
```

---

## 场景四：状态保存与加载

### 保存游戏状态（包含 ENS）

```javascript
// 保存完整状态
function saveGame() {
    const gameState = {
        // 原有游戏状态
        life: core.exportState(),
        
        // ENS 状态
        ens: ensAdapter.exportState(),
        
        // 保存时间
        timestamp: Date.now()
    };
    
    localStorage.setItem('saveData', JSON.stringify(gameState));
    console.log('✅ 游戏已保存');
}
```

### 加载游戏状态（包含 ENS）

```javascript
// 加载完整状态
function loadGame() {
    const saveData = localStorage.getItem('saveData');
    if (!saveData) {
        console.error('❌ 没有存档数据');
        return false;
    }
    
    const gameState = JSON.parse(saveData);
    
    // 加载原有游戏状态
    core.importState(gameState.life);
    
    // 加载 ENS 状态
    ensAdapter.importState(gameState.ens);
    
    console.log('✅ 游戏已加载');
    return true;
}
```

---

## 场景五：动态调整剧情概率

### 根据玩家表现调整

```javascript
// 动态平衡系统
function adjustDifficulty() {
    const stats = ens.getStatistics();
    const winRate = calculateWinRate();  // 计算胜率
    
    if (winRate < 0.3) {
        // 玩家表现不佳，增加有利事件概率
        ens.eventSystem.adjustProbability('positive_events', 1.5, 300000);
        console.log('📈 已增加有利事件概率');
    } else if (winRate > 0.7) {
        // 玩家表现太好，增加挑战
        ens.eventSystem.adjustProbability('challenge_events', 1.3, 300000);
        console.log('📈 已增加挑战事件概率');
    }
}
```

### 根据叙事倾向调整

```javascript
// 根据玩家倾向调整事件
function adjustByDisposition() {
    const disposition = ensAdapter.getNarrativeDisposition();
    
    if (disposition.tags.includes('heroic')) {
        // 英雄倾向，增加英雄相关事件
        ens.eventSystem.adjustProbability('heroic_events', 2.0);
    }
    
    if (disposition.tags.includes('dark')) {
        // 黑暗倾向，增加黑暗相关事件
        ens.eventSystem.adjustProbability('dark_events', 2.0);
    }
}
```

---

## 场景六：UI 集成示例

### 创建叙事 UI 组件

```javascript
// 叙事显示组件
class NarrativeUI {
    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'narrative-container';
        document.body.appendChild(this.container);
    }
    
    showNarrative(content) {
        this.container.innerHTML = `
            <div class="narrative-content">
                <p>${content}</p>
            </div>
        `;
        this.container.style.display = 'block';
    }
    
    showBranches(branches) {
        const branchesHTML = branches.map((branch, index) => `
            <button class="branch-btn" data-index="${index}">
                <strong>${branch.name}</strong>
                <p>${branch.description}</p>
                ${branch.available ? '' : '<span class="disabled">不可用</span>'}
            </button>
        `).join('');
        
        this.container.innerHTML += `
            <div class="branches-container">
                ${branchesHTML}
            </div>
        `;
        
        // 绑定事件
        this.container.querySelectorAll('.branch-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                this.onBranchSelect(index);
            });
        });
    }
    
    onBranchSelect(index) {
        // 处理选择
        console.log('玩家选择了分支:', index);
    }
}

// 使用示例
const narrativeUI = new NarrativeUI();

// 在游戏循环中
const result = await ens.gameLoop(context);
narrativeUI.showNarrative(result.content);
if (result.branches.length > 0) {
    narrativeUI.showBranches(result.branches);
}
```

---

## 场景七：调试控制台

### 创建调试面板

```javascript
// 调试控制台
class ENSDebugConsole {
    constructor(ensAdapter) {
        this.ensAdapter = ensAdapter;
        this.createPanel();
    }
    
    createPanel() {
        const panel = document.createElement('div');
        panel.id = 'ens-debug-panel';
        panel.innerHTML = `
            <div class="debug-header">
                <h3>ENS 调试控制台</h3>
                <button onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
            <div class="debug-content">
                <button onclick="ENSDebug.showDisposition()">显示倾向</button>
                <button onclick="ENSDebug.showStatistics()">显示统计</button>
                <button onclick="ENSDebug.exportState()">导出状态</button>
                <button onclick="ENSDebug.reset()">重置系统</button>
            </div>
        `;
        document.body.appendChild(panel);
    }
}

// 调试命令
globalThis.ENSDebug = {
    showDisposition: () => {
        const disp = ensAdapter.getNarrativeDisposition();
        console.table(disp);
    },
    
    showStatistics: () => {
        const stats = ens.getStatistics();
        console.table(stats);
    },
    
    exportState: () => {
        const state = ensAdapter.exportState();
        console.log(JSON.stringify(state, null, 2));
    },
    
    reset: () => {
        ensAdapter.reset();
        console.log('✅ 系统已重置');
    }
};

// 启用调试控制台
new ENSDebugConsole(ensAdapter);
```

---

## 场景八：完整游戏流程演示

```javascript
// 完整的游戏流程示例
class DemoGame {
    constructor() {
        this.core = new Life();
        this.ensAdapter = createAdapter(this.core);
        this.player = null;
    }
    
    async init() {
        console.log('🎮 游戏初始化...');
        
        // 初始化核心
        await this.core.initial(i18n, common);
        
        // 初始化 ENS
        await this.ensAdapter.initialize();
        
        console.log('✅ 初始化完成');
    }
    
    async start() {
        console.log('🚀 游戏开始...');
        
        // 玩家分配属性
        const allocation = await this.allocateProperties();
        this.core.start(allocation);
        
        // 游戏主循环
        while (!this.core.isEnd()) {
            await this.gameLoop();
        }
        
        // 游戏结束
        await this.showEnding();
    }
    
    async gameLoop() {
        const age = this.core.getProperty().getAge();
        console.log(`\n--- ${age}岁 ---`);
        
        // 原有逻辑
        const result = this.core.next();
        this.displayResult(result);
        
        // ENS 叙事
        const narrative = await this.ensAdapter.runNarrativeLoop();
        if (narrative) {
            console.log(`📖 ${narrative.content}`);
            
            // 处理分支选择
            if (narrative.branches.length > 0) {
                const choice = await this.showBranches(narrative.branches);
                if (choice) {
                    await this.ensAdapter.handlePlayerChoice(choice.id);
                }
            }
        }
        
        // 显示状态
        this.showStatus();
    }
    
    async showEnding() {
        console.log('\n🏁 游戏结束');
        
        // 根据叙事倾向显示不同结局
        const disposition = this.ensAdapter.getNarrativeDisposition();
        const ending = this.determineEnding(disposition);
        
        console.log(`结局：${ending.name}`);
        console.log(`描述：${ending.description}`);
    }
    
    determineEnding(disposition) {
        if (disposition.morality.normalized > 0.8) {
            return {
                name: '英雄结局',
                description: '你成为了人们心中的英雄'
            };
        } else if (disposition.chaos.normalized > 0.7) {
            return {
                name: '混乱结局',
                description: '世界因你而陷入混乱'
            };
        } else {
            return {
                name: '平凡结局',
                description: '你度过了平凡的一生'
            };
        }
    }
}

// 运行演示
const game = new DemoGame();
await game.init();
await game.start();
```

---

## 🎯 演示总结

通过以上 8 个场景，我们展示了：

1. ✅ **基础集成** - 2 行代码快速集成
2. ✅ **自定义剧情** - 创建节点和分支
3. ✅ **状态监控** - 实时查看叙事倾向
4. ✅ **存档系统** - 保存和加载状态
5. ✅ **动态调整** - 根据表现调整概率
6. ✅ **UI 集成** - 创建叙事界面
7. ✅ **调试工具** - 开发调试控制台
8. ✅ **完整流程** - 从头到尾的游戏演示

---

## 📝 下一步

1. 复制示例代码到你的项目
2. 根据需求修改配置
3. 创建自定义剧情数据
4. 测试并调整
5. 部署到生产环境

---

**演示版本**: 1.0.0  
**最后更新**: 2026-03-09
