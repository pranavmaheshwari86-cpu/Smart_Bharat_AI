const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(ROOT_DIR, 'graphify-out');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const IGNORE_DIRS = new Set([
  'node_modules',
  '.next',
  'dist',
  'build',
  '.git',
  '.swarm',
  '.impeccable',
  'code-review-graph',
  'graphify-out',
  '.tempmediaStorage',
  'coverage'
]);

const IGNORE_EXTENSIONS = new Set([
  '.png', '.jpg', '.jpeg', '.webp', '.ico', '.svg', '.gif',
  '.mp4', '.pdf', '.zip', '.gz', '.tar', '.log', '.lock'
]);

function normalizePath(p) {
  return p.replace(/\\/g, '/');
}

function getRelativePath(absolutePath) {
  const rel = path.relative(ROOT_DIR, absolutePath);
  return normalizePath(rel);
}

function detectLayer(filePath) {
  if (filePath.startsWith('frontend/')) return 'frontend';
  if (filePath.startsWith('backend/')) return 'backend';
  if (filePath.startsWith('shared/')) return 'shared';
  if (filePath.startsWith('e2e/')) return 'e2e';
  if (filePath.startsWith('data/')) return 'data';
  if (filePath.startsWith('docs/')) return 'docs';
  return 'root';
}

function detectNodeType(filePath) {
  const lower = filePath.toLowerCase();
  if (lower.includes('/components/')) return 'component';
  if (lower.includes('/app/') && (lower.endsWith('page.tsx') || lower.endsWith('page.ts') || lower.endsWith('layout.tsx'))) return 'page';
  if (lower.includes('/routes/') || lower.includes('/router/')) return 'route';
  if (lower.includes('/controllers/') || lower.includes('controller.')) return 'controller';
  if (lower.includes('/services/') || lower.includes('service.')) return 'service';
  if (lower.includes('/repositories/') || lower.includes('repository.')) return 'repository';
  if (lower.includes('/database/') || lower.includes('/models/')) return 'model';
  if (lower.includes('/context/')) return 'context';
  if (lower.includes('/types/') || lower.includes('types.ts')) return 'type';
  if (lower.includes('/validations/') || lower.includes('validation.')) return 'validation';
  if (lower.includes('/lib/') || lower.includes('/utils/')) return 'util';
  if (lower.includes('/config/')) return 'config';
  if (filePath.startsWith('scripts/')) return 'script';
  if (filePath.endsWith('.md')) return 'document';
  if (filePath.endsWith('.css')) return 'style';
  return 'module';
}

function detectLanguage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.ts':
    case '.tsx':
      return 'typescript';
    case '.js':
    case '.jsx':
    case '.mjs':
    case '.cjs':
      return 'javascript';
    case '.json':
      return 'json';
    case '.md':
      return 'markdown';
    case '.css':
      return 'css';
    default:
      return 'plaintext';
  }
}

function calculateComplexity(content) {
  const decisionKeywords = [
    /\bif\b/g, /\belse\b/g, /\bswitch\b/g, /\bcase\b/g,
    /\bfor\b/g, /\bwhile\b/g, /\bcatch\b/g, /\b&&/g, /\b\|\|/g, /\?/g
  ];
  let complexity = 1;
  for (const regex of decisionKeywords) {
    const matches = content.match(regex);
    if (matches) {
      complexity += matches.length;
    }
  }
  return complexity;
}

function extractExports(content) {
  const exports = new Set();
  const exportRegexes = [
    /export\s+default\s+(?:function|class|const|let|var)?\s*([A-Za-z0-9_$]+)?/g,
    /export\s+(?:const|let|var|function|class|type|interface|enum)\s+([A-Za-z0-9_$]+)/g,
    /export\s+\{([^}]+)\}/g
  ];

  let match;
  while ((match = exportRegexes[0].exec(content)) !== null) {
    if (match[1]) exports.add(match[1]);
    else exports.add('default');
  }
  while ((match = exportRegexes[1].exec(content)) !== null) {
    if (match[1]) exports.add(match[1]);
  }
  while ((match = exportRegexes[2].exec(content)) !== null) {
    if (match[1]) {
      match[1].split(',').forEach(e => {
        const cleaned = e.trim().split(/\s+as\s+/)[0].trim();
        if (cleaned) exports.add(cleaned);
      });
    }
  }
  return Array.from(exports);
}

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (IGNORE_DIRS.has(file)) continue;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      getAllFiles(fullPath, fileList);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (!IGNORE_EXTENSIONS.has(ext)) {
        fileList.push(fullPath);
      }
    }
  }
  return fileList;
}

function resolveImportPath(sourceFile, importSpecifier, fileMap) {
  if (importSpecifier.startsWith('.')) {
    const dir = path.dirname(sourceFile);
    const resolvedBase = normalizePath(path.resolve(dir, importSpecifier));
    const relBase = getRelativePath(resolvedBase);

    const candidates = [
      relBase,
      relBase + '.ts',
      relBase + '.tsx',
      relBase + '.js',
      relBase + '.jsx',
      relBase + '/index.ts',
      relBase + '/index.tsx',
      relBase + '/index.js'
    ];
    for (const cand of candidates) {
      if (fileMap.has(cand)) return cand;
    }
  } else if (importSpecifier.startsWith('@smart-bharat/shared')) {
    const sub = importSpecifier.replace('@smart-bharat/shared', '');
    const cand1 = 'shared/src' + sub + '.ts';
    const cand2 = 'shared/src' + sub + '/index.ts';
    const cand3 = 'shared/src/index.ts';
    if (fileMap.has(cand1)) return cand1;
    if (fileMap.has(cand2)) return cand2;
    if (fileMap.has(cand3)) return cand3;
  }
  return null;
}

console.log('🚀 Running Graphify Static Analyzer...');

const absoluteFiles = getAllFiles(ROOT_DIR);
const nodesMap = new Map();
const edgesMap = new Map();
const fileMap = new Set();

const relativeFiles = absoluteFiles.map(f => getRelativePath(f));
relativeFiles.forEach(f => fileMap.add(f));

relativeFiles.forEach(relPath => {
  const fullPath = path.join(ROOT_DIR, relPath);
  let content = '';
  let size = 0;
  try {
    const stat = fs.statSync(fullPath);
    size = stat.size;
    content = fs.readFileSync(fullPath, 'utf8');
  } catch (err) {
    content = '';
  }

  const name = path.basename(relPath, path.extname(relPath));
  const layer = detectLayer(relPath);
  const type = detectNodeType(relPath);
  const language = detectLanguage(relPath);
  const complexity = (language === 'typescript' || language === 'javascript') ? calculateComplexity(content) : 1;
  const exports = (language === 'typescript' || language === 'javascript') ? extractExports(content) : [];

  nodesMap.set(relPath, {
    id: relPath,
    type,
    layer,
    name,
    path: relPath,
    language,
    size,
    complexity,
    exports
  });
});

relativeFiles.forEach(relPath => {
  const node = nodesMap.get(relPath);
  if (!node || (node.language !== 'typescript' && node.language !== 'javascript')) return;

  const fullPath = path.join(ROOT_DIR, relPath);
  const content = fs.readFileSync(fullPath, 'utf8');

  const importRegexes = [
    /import\s+[\s\S]*?\s+from\s+['"]([^'"]+)['"]/g,
    /import\s*['"]([^'"]+)['"]/g,
    /require\(['"]([^'"]+)['"]\)/g,
    /import\(['"]([^'"]+)['"]\)/g
  ];

  const rawImports = new Set();
  importRegexes.forEach(regex => {
    let match;
    while ((match = regex.exec(content)) !== null) {
      if (match[1]) rawImports.add(match[1]);
    }
  });

  rawImports.forEach(imp => {
    const targetFile = resolveImportPath(relPath, imp, fileMap);
    if (targetFile && targetFile !== relPath) {
      const edgeKey = `${relPath}->${targetFile}`;
      if (edgesMap.has(edgeKey)) {
        edgesMap.get(edgeKey).weight += 1;
      } else {
        edgesMap.set(edgeKey, {
          source: relPath,
          target: targetFile,
          type: 'imports',
          weight: 1
        });
      }
    }
  });
});

const nodes = Array.from(nodesMap.values());
const edges = Array.from(edgesMap.values());

// Circular Dependency Detection (DFS)
const adj = new Map();
nodes.forEach(n => adj.set(n.id, []));
edges.forEach(e => {
  if (adj.has(e.source)) {
    adj.get(e.source).push(e.target);
  }
});

const circularPaths = [];
const visited = new Set();
const recStack = new Set();
const currentPath = [];

function dfsCycle(nodeId) {
  visited.add(nodeId);
  recStack.add(nodeId);
  currentPath.push(nodeId);

  const neighbors = adj.get(nodeId) || [];
  for (const neighbor of neighbors) {
    if (!visited.has(neighbor)) {
      dfsCycle(neighbor);
    } else if (recStack.has(neighbor)) {
      const cycleStartIndex = currentPath.indexOf(neighbor);
      if (cycleStartIndex !== -1) {
        const cycle = currentPath.slice(cycleStartIndex).concat(neighbor);
        circularPaths.push(cycle);
      }
    }
  }

  currentPath.pop();
  recStack.delete(nodeId);
}

nodes.forEach(n => {
  if (!visited.has(n.id)) {
    dfsCycle(n.id);
  }
});

// Build Subgraphs
const frontendNodes = nodes.filter(n => n.layer === 'frontend');
const backendNodes = nodes.filter(n => n.layer === 'backend');
const sharedNodes = nodes.filter(n => n.layer === 'shared');

const apiNodes = nodes.filter(n => n.path.includes('/api/') || n.type === 'controller' || n.type === 'route');
const authNodes = nodes.filter(n => n.path.toLowerCase().includes('auth') || n.path.toLowerCase().includes('login') || n.path.toLowerCase().includes('signup') || n.path.toLowerCase().includes('session'));
const databaseNodes = nodes.filter(n => n.layer === 'backend' && (n.path.includes('/database/') || n.type === 'repository' || n.type === 'model'));

const hotspotsNodes = [...nodes].sort((a, b) => (b.complexity * b.size) - (a.complexity * a.size)).slice(0, 15);

function filterSubgraphEdges(subNodes) {
  const set = new Set(subNodes.map(n => n.id));
  return edges.filter(e => set.has(e.source) && set.has(e.target));
}

// Generate Exports
const graphData = { nodes, edges };

fs.writeFileSync(path.join(OUTPUT_DIR, 'nodes.json'), JSON.stringify(nodes, null, 2));
fs.writeFileSync(path.join(OUTPUT_DIR, 'edges.json'), JSON.stringify(edges, null, 2));
fs.writeFileSync(path.join(OUTPUT_DIR, 'graph.json'), JSON.stringify(graphData, null, 2));

fs.writeFileSync(path.join(OUTPUT_DIR, 'frontend-subgraph.json'), JSON.stringify({ nodes: frontendNodes, edges: filterSubgraphEdges(frontendNodes) }, null, 2));
fs.writeFileSync(path.join(OUTPUT_DIR, 'backend-subgraph.json'), JSON.stringify({ nodes: backendNodes, edges: filterSubgraphEdges(backendNodes) }, null, 2));
fs.writeFileSync(path.join(OUTPUT_DIR, 'shared-subgraph.json'), JSON.stringify({ nodes: sharedNodes, edges: filterSubgraphEdges(sharedNodes) }, null, 2));
fs.writeFileSync(path.join(OUTPUT_DIR, 'api-subgraph.json'), JSON.stringify({ nodes: apiNodes, edges: filterSubgraphEdges(apiNodes) }, null, 2));
fs.writeFileSync(path.join(OUTPUT_DIR, 'auth-subgraph.json'), JSON.stringify({ nodes: authNodes, edges: filterSubgraphEdges(authNodes) }, null, 2));
fs.writeFileSync(path.join(OUTPUT_DIR, 'database-subgraph.json'), JSON.stringify({ nodes: databaseNodes, edges: filterSubgraphEdges(databaseNodes) }, null, 2));

const circularNodes = nodes.filter(n => circularPaths.some(p => p.includes(n.id)));
fs.writeFileSync(path.join(OUTPUT_DIR, 'circular-subgraph.json'), JSON.stringify({ nodes: circularNodes, edges: filterSubgraphEdges(circularNodes), cycles: circularPaths }, null, 2));
fs.writeFileSync(path.join(OUTPUT_DIR, 'hotspots-subgraph.json'), JSON.stringify({ nodes: hotspotsNodes, edges: filterSubgraphEdges(hotspotsNodes) }, null, 2));

// Metadata
const metadata = {
  generatedAt: new Date().toISOString(),
  totalFilesAnalyzed: nodes.length,
  totalEdges: edges.length,
  layers: {
    frontend: frontendNodes.length,
    backend: backendNodes.length,
    shared: sharedNodes.length,
    other: nodes.length - (frontendNodes.length + backendNodes.length + sharedNodes.length)
  },
  circularDependenciesCount: circularPaths.length
};
fs.writeFileSync(path.join(OUTPUT_DIR, 'metadata.json'), JSON.stringify(metadata, null, 2));

// 1. Mermaid Export
function escapeMermaidId(id) {
  return id.replace(/[^a-zA-Z0-9_]/g, '_');
}

let mermaidText = 'graph TD\n';
nodes.forEach(n => {
  const mId = escapeMermaidId(n.id);
  const label = `${n.name} (${n.type})`;
  mermaidText += `  ${mId}["${label}"]\n`;
});
edges.forEach(e => {
  const src = escapeMermaidId(e.source);
  const tgt = escapeMermaidId(e.target);
  mermaidText += `  ${src} --> ${tgt}\n`;
});
fs.writeFileSync(path.join(OUTPUT_DIR, 'graph.mermaid'), mermaidText);

// 2. DOT Export
let dotText = 'digraph CodebaseGraph {\n  node [shape=box, fontname="Helvetica"];\n';
nodes.forEach(n => {
  const label = `${n.id}\\ntype: ${n.type}\\nlayer: ${n.layer}`;
  dotText += `  "${n.id}" [label="${label}"];\n`;
});
edges.forEach(e => {
  dotText += `  "${e.source}" -> "${e.target}" [weight=${e.weight}];\n`;
});
dotText += '}\n';
fs.writeFileSync(path.join(OUTPUT_DIR, 'graph.dot'), dotText);

// 3. GEXF Export
let gexfText = `<?xml version="1.0" encoding="UTF-8"?>
<gexf xmlns="http://www.gexf.net/1.2draft" version="1.2">
  <graph mode="static" defaultedgetype="directed">
    <nodes>
${nodes.map(n => `      <node id="${n.id}" label="${n.name}" />`).join('\n')}
    </nodes>
    <edges>
${edges.map((e, idx) => `      <edge id="e${idx}" source="${e.source}" target="${e.target}" weight="${e.weight}" />`).join('\n')}
    </edges>
  </graph>
</gexf>`;
fs.writeFileSync(path.join(OUTPUT_DIR, 'graph.gexf'), gexfText);

// 4. GraphML Export
let graphmlText = `<?xml version="1.0" encoding="UTF-8"?>
<graphml xmlns="http://graphml.graphdrawing.org/xmlns">
  <graph id="SmartBharatAI" edgedefault="directed">
${nodes.map(n => `    <node id="${n.id}" />`).join('\n')}
${edges.map((e, idx) => `    <edge id="e${idx}" source="${e.source}" target="${e.target}" />`).join('\n')}
  </graph>
</graphml>`;
fs.writeFileSync(path.join(OUTPUT_DIR, 'graph.graphml'), graphmlText);

// 5. Cypher Export
let cypherText = `// Neo4j Cypher Import Statements for Smart Bharat AI\n`;
nodes.forEach(n => {
  const safeId = n.id.replace(/'/g, "\\'");
  cypherText += `CREATE (:Module {id: '${safeId}', name: '${n.name}', layer: '${n.layer}', type: '${n.type}', size: ${n.size}, complexity: ${n.complexity}});\n`;
});
edges.forEach(e => {
  const safeSrc = e.source.replace(/'/g, "\\'");
  const safeTgt = e.target.replace(/'/g, "\\'");
  cypherText += `MATCH (s:Module {id: '${safeSrc}'}), (t:Module {id: '${safeTgt}'}) CREATE (s)-[:IMPORTS {weight: ${e.weight}}]->(t);\n`;
});
fs.writeFileSync(path.join(OUTPUT_DIR, 'graph.cypher'), cypherText);

console.log(`✅ Graphify Completed! Generated ${nodes.length} nodes and ${edges.length} edges in graphify-out/`);
