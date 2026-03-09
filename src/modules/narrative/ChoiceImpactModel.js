/**
 * 玩家选择影响权重计算模型
 * Choice Impact Model - 量化玩家选择的长期影响
 */

export default class ChoiceImpactModel {
    constructor(config = {}) {
        // 叙事维度权重
        this.dimensions = {
            morality: {           // 道德维度：-100 (邪恶) 到 100 (善良)
                value: 0,
                weight: config.moralityWeight || 1.0,
                decay: config.moralityDecay || 0.01
            },
            chaos: {              // 混乱维度：0 (有序) 到 100 (混乱)
                value: 0,
                weight: config.chaosWeight || 1.0,
                decay: config.chaosDecay || 0.005
            },
            progress: {           // 进步维度：0 (保守) 到 100 (激进)
                value: 0,
                weight: config.progressWeight || 1.0,
                decay: config.progressDecay || 0.002
            },
            empathy: {            // 共情维度：0 (冷漠) 到 100 (共情)
                value: 0,
                weight: config.empathyWeight || 1.0,
                decay: config.empathyDecay || 0.01
            }
        };
        
        // 选择历史记录
        this.choiceHistory = [];
        this.maxHistoryLength = config.maxHistoryLength || 100;
        
        // 权重修正器
        this.modifiers = new Map();
        
        // 倾向标签缓存
        this.cachedTags = null;
        this.tagsDirty = true;
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
                dimData.value += impact[dim] * dimData.weight;
                
                // 限制在合理范围内
                if (dim === 'morality') {
                    dimData.value = Math.max(-100, Math.min(100, dimData.value));
                } else {
                    dimData.value = Math.max(0, Math.min(100, dimData.value));
                }
            }
        });
        
        // 应用自然衰减
        this.applyDecay();
        
        // 记录选择历史
        this.choiceHistory.push({
            choice: choice.id,
            timestamp,
            impact: { ...impact },
            context: choice.context ? { ...choice.context } : null,
            dimensionsAfter: this.getDimensionValues()
        });
        
        // 限制历史记录长度
        if (this.choiceHistory.length > this.maxHistoryLength) {
            this.choiceHistory.shift();
        }
        
        // 标记标签缓存失效
        this.tagsDirty = true;
        
        // 触发事件
        this.onDimensionsChanged();
    }
    
    /**
     * 应用维度衰减
     */
    applyDecay() {
        Object.keys(this.dimensions).forEach(key => {
            const dim = this.dimensions[key];
            const decayAmount = dim.value * dim.decay;
            dim.value -= decayAmount;
            
            // 确保不会衰减到范围外
            if (key === 'morality') {
                dim.value = Math.max(-100, Math.min(100, dim.value));
            } else {
                dim.value = Math.max(0, Math.min(100, dim.value));
            }
        });
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
                normalized: this.normalizeValue(dim.value, key),
                trend: this.calculateTrend(key)
            };
        });
        
        // 计算综合倾向标签（使用缓存）
        if (this.tagsDirty) {
            disposition.tags = this.generateDispositionTags(disposition);
            this.cachedTags = disposition.tags;
            this.tagsDirty = false;
        } else {
            disposition.tags = this.cachedTags;
        }
        
        // 计算主导倾向
        disposition.dominant = this.calculateDominantDisposition(disposition);
        
        return disposition;
    }
    
    /**
     * 归一化维度值到 0-1
     */
    normalizeValue(value, dimension) {
        if (dimension === 'morality') {
            return (value + 100) / 200;  // -100~100 -> 0~1
        } else {
            return value / 100;          // 0~100 -> 0~1
        }
    }
    
    /**
     * 计算某维度的变化趋势
     */
    calculateTrend(dimension) {
        if (this.choiceHistory.length < 2) return 'stable';
        
        const recentChoices = this.choiceHistory.slice(-10);
        const values = recentChoices.map(c => 
            c.dimensionsAfter?.[dimension]?.value || 0
        );
        
        if (values.length < 2) return 'stable';
        
        const midPoint = Math.floor(values.length / 2);
        const firstHalf = values.slice(0, midPoint);
        const secondHalf = values.slice(midPoint);
        
        const avg1 = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
        const avg2 = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
        
        const diff = avg2 - avg1;
        const threshold = dimension === 'morality' ? 5 : 3;
        
        if (diff > threshold) return 'increasing';
        if (diff < -threshold) return 'decreasing';
        return 'stable';
    }
    
    /**
     * 生成倾向标签
     */
    generateDispositionTags(disposition) {
        const tags = [];
        
        // 道德标签
        if (disposition.morality.normalized < 0.3) {
            tags.push('dark', 'villainous', 'ruthless');
        } else if (disposition.morality.normalized > 0.7) {
            tags.push('heroic', 'virtuous', 'compassionate');
        }
        
        // 混乱标签
        if (disposition.chaos.normalized > 0.6) {
            tags.push('chaotic', 'unpredictable', 'rebellious');
        } else if (disposition.chaos.normalized < 0.4) {
            tags.push('orderly', 'methodical', 'disciplined');
        }
        
        // 进步标签
        if (disposition.progress.normalized > 0.7) {
            tags.push('progressive', 'innovative', 'forward-thinking');
        } else if (disposition.progress.normalized < 0.3) {
            tags.push('traditional', 'conservative', 'cautious');
        }
        
        // 共情标签
        if (disposition.empathy.normalized > 0.6) {
            tags.push('empathetic', 'caring', 'altruistic');
        } else if (disposition.empathy.normalized < 0.4) {
            tags.push('detached', 'self-interested', 'pragmatic');
        }
        
        // 组合标签（特殊组合）
        if (disposition.morality.normalized < 0.3 && disposition.chaos.normalized > 0.6) {
            tags.push('destroyer');
        }
        
        if (disposition.morality.normalized > 0.7 && disposition.empathy.normalized > 0.6) {
            tags.push('saint');
        }
        
        if (disposition.progress.normalized > 0.7 && disposition.chaos.normalized < 0.4) {
            tags.push('reformer');
        }
        
        // 去重
        return [...new Set(tags)];
    }
    
    /**
     * 计算主导倾向
     */
    calculateDominantDisposition(disposition) {
        let maxDeviation = 0;
        let dominant = 'neutral';
        
        Object.keys(this.dimensions).forEach(key => {
            const normalized = disposition[key].normalized;
            const deviation = Math.abs(normalized - 0.5);
            
            if (deviation > maxDeviation) {
                maxDeviation = deviation;
                
                if (key === 'morality') {
                    dominant = normalized > 0.5 ? 'heroic' : 'dark';
                } else if (key === 'chaos') {
                    dominant = normalized > 0.5 ? 'chaotic' : 'orderly';
                } else if (key === 'progress') {
                    dominant = normalized > 0.5 ? 'progressive' : 'traditional';
                } else if (key === 'empathy') {
                    dominant = normalized > 0.5 ? 'empathetic' : 'pragmatic';
                }
            }
        });
        
        return dominant;
    }
    
    /**
     * 获取维度值
     */
    getDimensionValues() {
        const values = {};
        Object.keys(this.dimensions).forEach(key => {
            values[key] = this.dimensions[key].value;
        });
        return values;
    }
    
    /**
     * 添加权重修正器
     */
    addModifier(name, fn) {
        this.modifiers.set(name, fn);
    }
    
    /**
     * 移除权重修正器
     */
    removeModifier(name) {
        this.modifiers.delete(name);
    }
    
    /**
     * 应用所有修正器
     */
    applyModifiers(value, context) {
        let result = value;
        this.modifiers.forEach((fn, name) => {
            result = fn(result, context);
        });
        return result;
    }
    
    /**
     * 触发维度变化事件
     */
    onDimensionsChanged() {
        // 可以在此处触发自定义事件
        if (typeof this.onChanged === 'function') {
            this.onChanged(this.calculateNarrativeDisposition());
        }
    }
    
    /**
     * 获取选择历史长度
     */
    getChoiceHistoryLength() {
        return this.choiceHistory.length;
    }
    
    /**
     * 获取最近的选择
     */
    getRecentChoices(count = 5) {
        return this.choiceHistory.slice(-count);
    }
    
    /**
     * 重置所有维度
     */
    reset() {
        Object.keys(this.dimensions).forEach(key => {
            this.dimensions[key].value = key === 'morality' ? 0 : 0;
        });
        this.choiceHistory = [];
        this.cachedTags = null;
        this.tagsDirty = true;
    }
    
    /**
     * 导出状态
     */
    exportState() {
        return {
            dimensions: { ...this.dimensions },
            choiceHistory: [...this.choiceHistory],
            cachedTags: this.cachedTags ? [...this.cachedTags] : null
        };
    }
    
    /**
     * 导入状态
     */
    importState(state) {
        if (state.dimensions) {
            Object.assign(this.dimensions, state.dimensions);
        }
        if (state.choiceHistory) {
            this.choiceHistory = [...state.choiceHistory];
        }
        if (state.cachedTags) {
            this.cachedTags = [...state.cachedTags];
            this.tagsDirty = false;
        }
    }
}
