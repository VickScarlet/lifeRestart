/**
 * ENS 系统功能测试
 * Evolutionary Narrative System - Functional Tests
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import EvolutionaryNarrativeSystem from '../modules/narrative/EvolutionaryNarrativeSystem.js';
import NarrativeNode from '../modules/narrative/NarrativeNode.js';
import NarrativeBranch from '../modules/narrative/NarrativeBranch.js';
import ChoiceImpactModel from '../modules/narrative/ChoiceImpactModel.js';
import NarrativeStateTracker from '../modules/narrative/NarrativeStateTracker.js';
import CoherenceEngine from '../modules/narrative/CoherenceEngine.js';

describe('EvolutionaryNarrativeSystem', () => {
    let ens;
    
    beforeEach(() => {
        ens = new EvolutionaryNarrativeSystem({
            enableDynamicBalance: false,
            enableCoherenceCheck: false,
            debugMode: false
        });
    });
    
    describe('Initialization', () => {
        it('should create ENS instance with default config', () => {
            expect(ens).toBeDefined();
            expect(ens.isInitialized).toBe(false);
        });
        
        it('should create ENS instance with custom config', () => {
            const customEns = new EvolutionaryNarrativeSystem({
                debugMode: true,
                maxHistoryLength: 50
            });
            expect(customEns.config.debugMode).toBe(true);
            expect(customEns.config.maxHistoryLength).toBe(50);
        });
    });
    
    describe('NarrativeNode', () => {
        it('should create node with basic config', () => {
            const node = new NarrativeNode({
                id: 'test_node',
                type: 'normal',
                content: 'Test content',
                priority: 5
            });
            
            expect(node.id).toBe('test_node');
            expect(node.type).toBe('normal');
            expect(node.content).toBe('Test content');
            expect(node.priority).toBe(5);
        });
        
        it('should create node with prerequisites', () => {
            const node = new NarrativeNode({
                id: 'test_node_2',
                type: 'normal',
                content: 'Test',
                requiredNodes: ['node_1'],
                minAge: 10,
                maxAge: 20
            });
            
            expect(node.prerequisites.required).toContain('node_1');
            expect(node.prerequisites.minAge).toBe(10);
            expect(node.prerequisites.maxAge).toBe(20);
        });
        
        it('should throw error for invalid node', () => {
            expect(() => new NarrativeNode({})).toThrow('must have an id');
        });
    });
    
    describe('NarrativeBranch', () => {
        it('should create branch with basic config', () => {
            const branch = new NarrativeBranch({
                id: 'test_branch',
                sourceNode: 'node_1',
                targetNode: 'node_2',
                name: 'Test Branch',
                baseProbability: 0.8
            });
            
            expect(branch.id).toBe('test_branch');
            expect(branch.sourceNode).toBe('node_1');
            expect(branch.targetNode).toBe('node_2');
            expect(branch.probability.base).toBe(0.8);
        });
        
        it('should calculate availability correctly', () => {
            const branch = new NarrativeBranch({
                id: 'test_branch_2',
                sourceNode: 'node_1',
                targetNode: 'node_2',
                minProperties: { INT: 10 }
            });
            
            const context = { INT: 15 };
            const result = branch.calculateAvailability(context);
            
            expect(result.available).toBe(true);
        });
        
        it('should check property requirements', () => {
            const branch = new NarrativeBranch({
                id: 'test_branch_3',
                sourceNode: 'node_1',
                targetNode: 'node_2',
                minProperties: { INT: 10, MNY: 50 }
            });
            
            const lowContext = { INT: 15, MNY: 30 };
            const highContext = { INT: 15, MNY: 60 };
            
            expect(branch.calculateAvailability(lowContext).available).toBe(false);
            expect(branch.calculateAvailability(highContext).available).toBe(true);
        });
    });
    
    describe('ChoiceImpactModel', () => {
        let impactModel;
        
        beforeEach(() => {
            impactModel = new ChoiceImpactModel();
        });
        
        it('should record choice and update dimensions', () => {
            impactModel.recordChoice({
                id: 'choice_1',
                impact: { morality: 10, chaos: 5 }
            });
            
            const disposition = impactModel.calculateNarrativeDisposition();
            
            expect(disposition.morality.value).toBeGreaterThan(0);
            expect(disposition.chaos.value).toBeGreaterThan(0);
        });
        
        it('should calculate normalized values', () => {
            impactModel.recordChoice({
                id: 'choice_2',
                impact: { morality: 50 }
            });
            
            const disposition = impactModel.calculateNarrativeDisposition();
            expect(disposition.morality.normalized).toBeGreaterThan(0.5);
        });
        
        it('should generate disposition tags', () => {
            // Record multiple heroic choices
            for (let i = 0; i < 10; i++) {
                impactModel.recordChoice({
                    id: `choice_${i}`,
                    impact: { morality: 10 }
                });
            }
            
            const disposition = impactModel.calculateNarrativeDisposition();
            expect(disposition.tags).toContain('heroic');
        });
        
        it('should apply decay over time', () => {
            impactModel.recordChoice({
                id: 'choice_decay',
                impact: { chaos: 50 }
            });
            
            const before = impactModel.dimensions.chaos.value;
            impactModel.applyDecay();
            const after = impactModel.dimensions.chaos.value;
            
            expect(after).toBeLessThan(before);
        });
    });
    
    describe('NarrativeStateTracker', () => {
        let tracker;
        
        beforeEach(() => {
            tracker = new NarrativeStateTracker();
        });
        
        it('should track node trigger', () => {
            const node = new NarrativeNode({
                id: 'tracked_node',
                type: 'normal',
                content: 'Test'
            });
            
            tracker.trackNodeTrigger(node, { age: 10 });
            
            expect(tracker.hasNodeTriggered('tracked_node')).toBe(true);
            expect(tracker.getTriggeredNodesCount()).toBe(1);
        });
        
        it('should set and get global flags', () => {
            tracker.setGlobalFlag('test_flag', true);
            expect(tracker.getGlobalFlag('test_flag')).toBe(true);
            expect(tracker.getGlobalFlag('nonexistent', 'default')).toBe('default');
        });
        
        it('should activate and deactivate paths', () => {
            tracker.activatePath('path_1');
            expect(tracker.isPathActive('path_1')).toBe(true);
            
            tracker.deactivatePath('path_1');
            expect(tracker.isPathActive('path_1')).toBe(false);
        });
        
        it('should check node prerequisites', () => {
            const node = new NarrativeNode({
                id: 'prereq_node',
                type: 'normal',
                content: 'Test',
                requiredNodes: ['required_node']
            });
            
            expect(tracker.checkNodePrerequisites(node).passed).toBe(false);
            
            tracker.trackNodeTrigger(new NarrativeNode({ id: 'required_node', type: 'normal', content: '' }), {});
            
            expect(tracker.checkNodePrerequisites(node).passed).toBe(true);
        });
        
        it('should export and import state', () => {
            tracker.setGlobalFlag('export_test', true);
            tracker.activatePath('export_path');
            
            const state = tracker.exportState();
            const newTracker = new NarrativeStateTracker();
            newTracker.importState(state);
            
            expect(newTracker.getGlobalFlag('export_test')).toBe(true);
            expect(newTracker.isPathActive('export_path')).toBe(true);
        });
    });
    
    describe('CoherenceEngine', () => {
        let engine;
        
        beforeEach(() => {
            engine = new CoherenceEngine();
        });
        
        it('should create engine with default rules', () => {
            expect(engine).toBeDefined();
            expect(engine.rules.size).toBeGreaterThan(0);
        });
        
        it('should add custom rule', () => {
            engine.addRule('custom_test', (node, context) => {
                return node.id !== 'forbidden_node';
            });
            
            expect(engine.rules.has('custom_test')).toBe(true);
        });
        
        it('should validate node', () => {
            const node = new NarrativeNode({
                id: 'valid_node',
                type: 'normal',
                content: 'Test'
            });
            
            const tracker = new NarrativeStateTracker();
            const result = engine.validate(node, tracker);
            
            expect(result).toBe(true);
        });
        
        it('should detect contradictions', () => {
            engine.addContradiction('node_a', 'node_b');
            
            const tracker = new NarrativeStateTracker();
            tracker.trackNodeTrigger(new NarrativeNode({ id: 'node_a', type: 'normal', content: '' }), {});
            
            const nodeB = new NarrativeNode({ id: 'node_b', type: 'normal', content: '' });
            const result = engine.validate(nodeB, tracker);
            
            expect(result).toBe(false);
        });
    });
    
    describe('Integration Tests', () => {
        it('should run complete narrative loop', async () => {
            // Create test nodes
            const node1 = new NarrativeNode({
                id: 'start',
                type: 'normal',
                content: 'Start',
                priority: 10
            });
            
            const node2 = new NarrativeNode({
                id: 'middle',
                type: 'normal',
                content: 'Middle',
                requiredNodes: ['start'],
                priority: 8
            });
            
            const node3 = new NarrativeNode({
                id: 'end',
                type: 'ending',
                content: 'End',
                requiredNodes: ['middle'],
                priority: 10
            });
            
            // Create branch
            const branch = new NarrativeBranch({
                id: 'start_to_middle',
                sourceNode: 'start',
                targetNode: 'middle',
                name: 'Continue',
                baseProbability: 1.0
            });
            
            // Manually add to ENS
            ens.nodes.set('start', node1);
            ens.nodes.set('middle', node2);
            ens.nodes.set('end', node3);
            ens.branches.set('start_to_middle', branch);
            node1.outgoingBranches = ['start_to_middle'];
            
            ens.isInitialized = true;
            
            // Run game loop
            const context = { age: 0 };
            const result = await ens.gameLoop(context);
            
            expect(result).toBeDefined();
            expect(result.node).toBeDefined();
        });
    });
});

describe('Performance Tests', () => {
    it('should handle large node pool efficiently', async () => {
        const ens = new EvolutionaryNarrativeSystem({ debugMode: false });
        
        // Create 1000 nodes
        for (let i = 0; i < 1000; i++) {
            const node = new NarrativeNode({
                id: `node_${i}`,
                type: 'normal',
                content: `Node ${i}`,
                priority: Math.floor(Math.random() * 10) + 1
            });
            ens.nodes.set(`node_${i}`, node);
        }
        
        ens.isInitialized = true;
        
        const startTime = Date.now();
        await ens.gameLoop({ age: 20 });
        const endTime = Date.now();
        
        // Should complete within 100ms
        expect(endTime - startTime).toBeLessThan(100);
    });
    
    it('should handle complex branch conditions', () => {
        const branch = new NarrativeBranch({
            id: 'complex_branch',
            sourceNode: 'node_1',
            targetNode: 'node_2',
            minProperties: { INT: 10, CHR: 10, MNY: 50 },
            requiredGenes: ['gene_1', 'gene_2'],
            requiredFlags: { flag_1: true, flag_2: false }
        });
        
        const context = {
            INT: 15,
            CHR: 12,
            MNY: 60,
            disposition: {
                tags: ['gene_1', 'gene_2']
            }
        };
        
        const startTime = Date.now();
        branch.calculateAvailability(context);
        const endTime = Date.now();
        
        // Should complete within 10ms
        expect(endTime - startTime).toBeLessThan(10);
    });
});
