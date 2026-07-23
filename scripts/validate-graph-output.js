const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const GRAPH_OUT_DIR = path.join(ROOT_DIR, 'graphify-out');
const REVIEW_DIR = path.join(ROOT_DIR, 'code-review-graph');

console.log('🚀 Running Graph & Review Output Validator...');

let errorsCount = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ Validation Error: ${message}`);
    errorsCount++;
  }
}

// 1. Check graphify-out files
const requiredGraphifyFiles = [
  'nodes.json', 'edges.json', 'graph.json', 'graph.gexf', 'graph.graphml',
  'graph.dot', 'graph.mermaid', 'graph.cypher', 'frontend-subgraph.json',
  'backend-subgraph.json', 'shared-subgraph.json', 'api-subgraph.json',
  'auth-subgraph.json', 'database-subgraph.json', 'circular-subgraph.json',
  'hotspots-subgraph.json', 'metadata.json'
];

requiredGraphifyFiles.forEach(file => {
  const filePath = path.join(GRAPH_OUT_DIR, file);
  assert(fs.existsSync(filePath), `Missing graphify-out file: ${file}`);
  if (file.endsWith('.json')) {
    try {
      JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (e) {
      assert(false, `Invalid JSON in ${file}: ${e.message}`);
    }
  }
});

// 2. Validate Nodes and Edges integrity
const nodes = JSON.parse(fs.readFileSync(path.join(GRAPH_OUT_DIR, 'nodes.json'), 'utf8'));
const edges = JSON.parse(fs.readFileSync(path.join(GRAPH_OUT_DIR, 'edges.json'), 'utf8'));

const nodeIds = new Set();
nodes.forEach(n => {
  assert(n.id, `Node missing id: ${JSON.stringify(n)}`);
  assert(!nodeIds.has(n.id), `Duplicate node ID: ${n.id}`);
  nodeIds.add(n.id);
});

edges.forEach((e, idx) => {
  assert(nodeIds.has(e.source), `Edge ${idx} source node not found: ${e.source}`);
  assert(nodeIds.has(e.target), `Edge ${idx} target node not found: ${e.target}`);
});

// 3. Syntax checks
const mermaidContent = fs.readFileSync(path.join(GRAPH_OUT_DIR, 'graph.mermaid'), 'utf8');
assert(mermaidContent.startsWith('graph TD'), 'Mermaid syntax invalid header');

const dotContent = fs.readFileSync(path.join(GRAPH_OUT_DIR, 'graph.dot'), 'utf8');
assert(dotContent.startsWith('digraph CodebaseGraph'), 'DOT syntax invalid header');

const gexfContent = fs.readFileSync(path.join(GRAPH_OUT_DIR, 'graph.gexf'), 'utf8');
assert(gexfContent.includes('<gexf') && gexfContent.includes('</gexf>'), 'GEXF syntax invalid');

const graphmlContent = fs.readFileSync(path.join(GRAPH_OUT_DIR, 'graph.graphml'), 'utf8');
assert(graphmlContent.includes('<graphml') && graphmlContent.includes('</graphml>'), 'GraphML syntax invalid');

// 4. Check code-review-graph files
const requiredReviewFiles = [
  'architecture/system-architecture.md', 'architecture/frontend-architecture.md',
  'architecture/backend-architecture.md', 'architecture/shared-architecture.md',
  'dependencies/module-dependency-graph.json', 'dependencies/package-dependency-graph.json',
  'dependencies/import-graph.json', 'routes/frontend-routes.json', 'routes/backend-routes.json',
  'routes/route-map.md', 'api/api-endpoints.json', 'api/api-contracts.md',
  'database/database-models.json', 'database/repository-map.md', 'auth/auth-flow.md',
  'auth/session-flow.md', 'security/security-sensitive-paths.md',
  'security/public-vs-protected-routes.md', 'performance/large-modules.md',
  'performance/bundle-hotspots.md', 'dead-code/unused-files.json',
  'dead-code/unused-exports.json', 'dead-code/unreachable-routes.json',
  'hotspots/change-frequency-hotspots.md', 'hotspots/complexity-hotspots.md',
  'circular/circular-dependencies.json', 'ownership/module-boundaries.md',
  'metrics/codebase-metrics.json', 'reports/executive-summary.md', 'reports/action-items.md'
];

requiredReviewFiles.forEach(file => {
  const filePath = path.join(REVIEW_DIR, file);
  assert(fs.existsSync(filePath), `Missing code-review-graph file: ${file}`);
  if (file.endsWith('.json')) {
    try {
      JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (e) {
      assert(false, `Invalid JSON in code-review-graph file ${file}: ${e.message}`);
    }
  }
});

if (errorsCount === 0) {
  console.log(`✨ All outputs validated successfully! 0 errors found.`);
} else {
  console.error(`💥 Validation Failed with ${errorsCount} errors!`);
  process.exit(1);
}
