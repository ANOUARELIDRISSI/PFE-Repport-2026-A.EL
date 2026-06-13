import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'drawio', 'presentation');

const esc = (value) => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const label = (title, body = '') => `&lt;b&gt;${esc(title)}&lt;/b&gt;${body ? `&lt;br&gt;&lt;font color=&quot;#475569&quot;&gt;${esc(body)}&lt;/font&gt;` : ''}`;
const card = (id, title, body, x, y, w, h, color = 'blue', shape = 'rounded=1;arcSize=10;') => {
  const colors = {
    blue: ['#eff6ff', '#2563eb'],
    indigo: ['#eef2ff', '#6366f1'],
    orange: ['#fff7ed', '#ea580c'],
    green: ['#ecfdf5', '#059669'],
    purple: ['#f5f3ff', '#7c3aed'],
    gray: ['#ffffff', '#64748b'],
    cyan: ['#ecfeff', '#0891b2'],
  };
  const [fill, stroke] = colors[color];
  return `<mxCell id="${id}" value="${label(title, body)}" style="${shape}html=1;whiteSpace=wrap;fillColor=${fill};strokeColor=${stroke};strokeWidth=2;fontSize=18;fontColor=#0f172a;fontFamily=Arial;align=center;verticalAlign=middle;spacing=10;" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`;
};
const edge = (id, from, to, color = '#64748b', text = '', extra = '') =>
  `<mxCell id="${id}" value="${esc(text)}" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=${color};strokeWidth=2;endArrow=block;endFill=1;fontSize=16;fontColor=${color};${extra}" edge="1" parent="1" source="${from}" target="${to}"><mxGeometry relative="1" as="geometry"/></mxCell>`;
const title = (name, subtitle) =>
  `<mxCell id="title" value="${label(name, subtitle)}" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontSize=30;fontStyle=1;fontColor=#0f172a;fontFamily=Arial;whiteSpace=wrap;" vertex="1" parent="1"><mxGeometry x="60" y="25" width="1080" height="70" as="geometry"/></mxCell>`;
const panel = (name = '') =>
  `<mxCell id="panel" value="${esc(name)}" style="rounded=1;html=1;whiteSpace=wrap;fillColor=#f8fafc;strokeColor=#cbd5e1;strokeWidth=2;arcSize=8;fontSize=18;fontStyle=1;fontColor=#475569;fontFamily=Arial;align=left;verticalAlign=top;spacingTop=14;spacingLeft=18;" vertex="1" parent="1"><mxGeometry x="70" y="125" width="1060" height="690" as="geometry"/></mxCell>`;

function xml(id, cells) {
  const large = ['autonomous_crawler_pipeline', 'knowledge_graph_construction', 'document_chunking_strategy', 'embedding_vector_indexing'].includes(id);
  const width = large ? 1800 : 1200;
  const height = large ? 1050 : 900;
  const dx = large ? 1918 : 1279;
  const dy = large ? 1258 : 839;
  return `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net" agent="Codex" version="26.0.0" type="device">
  <diagram id="${id}" name="${id}">
    <mxGraphModel dx="${dx}" dy="${dy}" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="${width}" pageHeight="${height}" math="0" shadow="0">
      <root><mxCell id="0"/><mxCell id="1" parent="0"/>
${cells.join('\n')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
`;
}

const diagrams = {
  component_architecture: [
    title('System Architecture', 'Five layers with clear responsibilities'),
    panel('Layered Architecture'),
    card('ui', 'User Interface', 'Chat, graph and administration', 390, 180, 420, 85, 'blue'),
    card('api', 'API Layer', 'Authentication and request routing', 390, 310, 420, 85, 'indigo'),
    card('reason', 'Reasoning Engine', 'Retrieval, planning and synthesis', 390, 440, 420, 85, 'purple'),
    card('data', 'Data Services', 'Documents, vectors and graph', 390, 570, 420, 85, 'green'),
    card('observe', 'Observability', 'Metrics, traces and health', 390, 700, 420, 85, 'orange'),
    edge('e1', 'ui', 'api', '#2563eb'), edge('e2', 'api', 'reason', '#6366f1'),
    edge('e3', 'reason', 'data', '#7c3aed'), edge('e4', 'data', 'observe', '#059669'),
  ],
  system_component_overview: [
    title('System Components', 'Main technologies used by the platform'),
    panel('Technology Overview'),
    card('front', 'React Frontend', 'User interaction', 120, 210, 260, 100, 'blue'),
    card('back', 'FastAPI Backend', 'Application services', 470, 210, 260, 100, 'indigo'),
    card('ai', 'AI Services', 'Extraction and generation', 820, 210, 260, 100, 'purple'),
    card('mongo', 'MongoDB', 'Documents and metadata', 120, 570, 260, 105, 'green', 'shape=cylinder3;boundedLbl=1;backgroundOutline=1;size=15;'),
    card('zvec', 'ZVec', 'Vector embeddings', 470, 570, 260, 105, 'cyan', 'shape=cylinder3;boundedLbl=1;backgroundOutline=1;size=15;'),
    card('neo', 'Neo4j', 'Entities and relations', 820, 570, 260, 105, 'orange', 'shape=cylinder3;boundedLbl=1;backgroundOutline=1;size=15;'),
    edge('e1', 'front', 'back', '#2563eb'), edge('e2', 'back', 'ai', '#6366f1'),
    edge('e3', 'back', 'mongo', '#059669'), edge('e4', 'back', 'zvec', '#0891b2'), edge('e5', 'back', 'neo', '#ea580c'),
  ],
  data_flow_diagram: [
    title('Data Flow', 'Offline ingestion and online question answering'),
    panel('Two Complementary Paths'),
    card('sources', 'Sources', 'Web, RSS and PDF', 110, 220, 230, 90, 'gray'),
    card('process', 'Processing', 'Clean and extract', 485, 220, 230, 90, 'blue'),
    card('stores', 'Knowledge Stores', 'Text, vectors and graph', 860, 220, 230, 90, 'green'),
    card('question', 'User Question', '', 110, 600, 230, 90, 'orange'),
    card('retrieve', 'Hybrid Retrieval', 'Chunks + graph facts', 485, 600, 230, 90, 'purple'),
    card('answer', 'Cited Answer', '', 860, 600, 230, 90, 'indigo'),
    edge('e1', 'sources', 'process', '#2563eb', 'ingest'), edge('e2', 'process', 'stores', '#059669', 'index'),
    edge('e3', 'question', 'retrieve', '#ea580c', 'query'), edge('e4', 'stores', 'retrieve', '#7c3aed', 'evidence', 'exitX=0.5;exitY=1;entryX=0.5;entryY=0;'),
    edge('e5', 'retrieve', 'answer', '#6366f1', 'synthesize'),
  ],
  autonomous_crawler_pipeline: [
    card('registry', 'Source Registry + Scheduler', 'Priority, frequency and crawl state', 70, 80, 330, 115, 'gray'),
    card('frontier', 'URL Frontier', 'Priority queue of pending URLs', 480, 80, 330, 115, 'gray'),
    card('policy', 'Fetch Policy', 'Robots rules, rate limits and retries', 890, 80, 330, 115, 'gray'),
    card('router', 'Content Router', 'Select acquisition mode by source type and response', 1300, 80, 410, 115, 'gray'),

    card('light', 'Lightweight Mode', 'Fast extraction for accessible content', 100, 300, 650, 80, 'gray'),
    card('rss', 'RSS + HTML', 'Requests and feed parsing', 130, 430, 250, 120, 'gray'),
    card('pdf', 'PDF Parser', 'Download and extract text', 465, 430, 250, 120, 'gray'),
    card('trafilatura', 'Trafilatura', 'Remove menus, ads and boilerplate', 245, 625, 360, 120, 'gray'),

    card('browser', 'Browser-Assisted Mode', 'Fallback for dynamic or protected pages', 980, 300, 720, 80, 'gray'),
    card('chromium', 'Chromium Rendering', 'Load JavaScript and dynamic content', 1020, 430, 280, 120, 'gray'),
    card('behavior', 'Human Browser Behavior', 'Wait, scroll, click and navigate', 1370, 430, 280, 120, 'gray'),
    card('dom', 'Rendered DOM Extraction', 'Collect visible text when available', 1020, 625, 280, 120, 'gray'),
    card('screenshot', 'Screenshot Fallback', 'Capture evidence when text is unavailable', 1370, 625, 280, 120, 'gray'),

    card('document', 'Unified Document', 'Clean text, URL, source, date and crawl metadata', 620, 790, 420, 105, 'gray'),
    card('quality', 'Quality Gates', 'Completeness, language, metadata, relevance and duplicates', 1100, 790, 420, 105, 'gray'),
    card('review', 'Retry / Manual Review', 'Backoff, dead-letter queue and inspection', 1290, 930, 360, 85, 'gray'),
    card('mongo', 'MongoDB', 'Accepted source documents stored first', 570, 930, 360, 85, 'gray', 'shape=cylinder3;boundedLbl=1;backgroundOutline=1;size=15;'),
    card('downstream', 'Knowledge Processing', 'Chunking, embeddings, entities and graph', 80, 930, 390, 85, 'gray'),

    '<mxCell id="mode-light" value="LIGHTWEIGHT ACQUISITION" style="html=1;whiteSpace=wrap;fontFamily=Arial;verticalAlign=middle;rounded=1;arcSize=50;fillColor=#eef2ff;strokeColor=#a5b4fc;align=center;fontSize=20;fontColor=#4338ca;" vertex="1" parent="1"><mxGeometry x="290" y="265" width="270" height="32" as="geometry"/></mxCell>',
    '<mxCell id="mode-browser" value="BROWSER-ASSISTED ACQUISITION" style="html=1;whiteSpace=wrap;fontFamily=Arial;verticalAlign=middle;rounded=1;arcSize=50;fillColor=#eef2ff;strokeColor=#a5b4fc;align=center;fontSize=20;fontColor=#4338ca;" vertex="1" parent="1"><mxGeometry x="1200" y="265" width="320" height="32" as="geometry"/></mxCell>',

    edge('e1', 'registry', 'frontier'), edge('e2', 'frontier', 'policy'), edge('e3', 'policy', 'router'),
    edge('e4', 'router', 'rss', '#64748b', 'accessible', 'exitX=0.2;exitY=1;entryX=0.5;entryY=0;'),
    edge('e5', 'router', 'chromium', '#64748b', 'dynamic / blocked', 'exitX=0.8;exitY=1;entryX=0.5;entryY=0;'),
    edge('e6', 'rss', 'trafilatura'), edge('e7', 'pdf', 'trafilatura'),
    edge('e8', 'chromium', 'dom'), edge('e9', 'behavior', 'dom'),
    edge('e10', 'dom', 'screenshot', '#64748b', 'if extraction fails'),
    edge('e11', 'trafilatura', 'document'), edge('e12', 'dom', 'document'),
    edge('e13', 'screenshot', 'document'), edge('e14', 'document', 'quality'),
    edge('e15', 'quality', 'mongo', '#64748b', 'accepted'),
    edge('e16', 'quality', 'review', '#64748b', 'failed'),
    edge('e17', 'mongo', 'downstream', '#64748b', 'process'),
    edge('e18', 'review', 'frontier', '#64748b', 'retry', 'exitX=1;exitY=0.5;entryX=0.5;entryY=1;'),
  ],
  knowledge_graph_construction: [
    card('mongo', 'MongoDB Documents', 'Normalized text and source metadata', 70, 390, 280, 150, 'gray', 'shape=cylinder3;boundedLbl=1;backgroundOutline=1;size=15;'),
    card('dspy', 'DSPy Module', 'Optimized prompt and output schema', 430, 390, 280, 150, 'gray'),
    card('mistral', 'Mistral', 'Joint entity-relation extraction in JSON mode', 790, 390, 280, 150, 'gray'),
    card('json', 'Structured JSON', 'Entities, types and typed relations', 1150, 390, 280, 150, 'gray'),
    card('resolution', 'Entity Resolution', 'Normalize aliases and assign stable IDs', 1150, 650, 280, 150, 'gray'),
    card('validation', 'Validation', 'Schema, quality and confidence checks', 790, 650, 280, 150, 'gray'),
    card('cypher', 'Cypher MERGE', 'Create or update nodes and edges', 430, 650, 280, 150, 'gray'),
    card('neo4j', 'Neo4j Knowledge Graph', 'Canonical entities and typed relationships', 70, 650, 280, 150, 'gray', 'shape=cylinder3;boundedLbl=1;backgroundOutline=1;size=15;'),
    '<mxCell id="l1" value="EXTRACTION" style="html=1;whiteSpace=wrap;fontFamily=Arial;verticalAlign=middle;rounded=1;arcSize=50;fillColor=#eef2ff;strokeColor=#a5b4fc;align=center;fontSize=20;fontColor=#4338ca;" vertex="1" parent="1"><mxGeometry x="650" y="310" width="200" height="32" as="geometry"/></mxCell>',
    '<mxCell id="l2" value="GRAPH PUBLICATION" style="html=1;whiteSpace=wrap;fontFamily=Arial;verticalAlign=middle;rounded=1;arcSize=50;fillColor=#eef2ff;strokeColor=#a5b4fc;align=center;fontSize=20;fontColor=#4338ca;" vertex="1" parent="1"><mxGeometry x="650" y="850" width="250" height="32" as="geometry"/></mxCell>',
    edge('e1', 'mongo', 'dspy'), edge('e2', 'dspy', 'mistral'), edge('e3', 'mistral', 'json'),
    edge('e4', 'json', 'resolution', '#64748b', '', 'exitX=0.5;exitY=1;entryX=0.5;entryY=0;'),
    edge('e5', 'resolution', 'validation'), edge('e6', 'validation', 'cypher'), edge('e7', 'cypher', 'neo4j'),
  ],
  document_chunking_strategy: [
    card('document', 'MongoDB Document', 'Clean content, section structure and metadata', 70, 390, 300, 160, 'gray', 'shape=cylinder3;boundedLbl=1;backgroundOutline=1;size=15;'),
    card('paragraphs', 'Paragraph Detection', 'Preserve natural semantic boundaries', 450, 390, 300, 160, 'gray'),
    card('split', 'Context-Aware Split', 'Create compact coherent passages', 830, 390, 300, 160, 'gray'),
    card('overlap', 'Controlled Overlap', 'Retain context across adjacent chunks', 1210, 390, 300, 160, 'gray'),
    card('metadata', 'Metadata Enrichment', 'Document ID, order, heading, source and entity IDs', 830, 680, 300, 160, 'gray'),
    card('chunks', 'Document Chunks', 'Retrieval units stored with provenance', 450, 680, 300, 160, 'gray'),
    card('expansion', 'Adjacent Context', 'Recover neighboring chunks when needed', 70, 680, 300, 160, 'gray'),
    '<mxCell id="l1" value="STRUCTURE-AWARE CHUNKING" style="html=1;whiteSpace=wrap;fontFamily=Arial;verticalAlign=middle;rounded=1;arcSize=50;fillColor=#eef2ff;strokeColor=#a5b4fc;align=center;fontSize=20;fontColor=#4338ca;" vertex="1" parent="1"><mxGeometry x="650" y="300" width="300" height="32" as="geometry"/></mxCell>',
    edge('e1', 'document', 'paragraphs'), edge('e2', 'paragraphs', 'split'), edge('e3', 'split', 'overlap'),
    edge('e4', 'overlap', 'metadata', '#64748b', '', 'exitX=0.5;exitY=1;entryX=0.5;entryY=0;'),
    edge('e5', 'metadata', 'chunks'), edge('e6', 'chunks', 'expansion'),
  ],
  embedding_vector_indexing: [
    card('chunks', 'Document Chunks', 'Text with document and entity metadata', 70, 390, 300, 160, 'gray'),
    card('model', 'Embedding Model', 'Encode semantic meaning into dense vectors', 450, 390, 300, 160, 'gray'),
    card('vectors', '384-D Vectors', 'Lightweight all-MiniLM-L6-v2 baseline', 830, 390, 300, 160, 'gray'),
    card('metadata', 'Vector Records', 'Chunk ID, document ID and entity IDs', 1210, 390, 300, 160, 'gray'),
    card('zvec', 'ZVec Index', 'Local approximate similarity search', 1210, 680, 300, 160, 'gray', 'shape=cylinder3;boundedLbl=1;backgroundOutline=1;size=15;'),
    card('query', 'Query Embedding', 'Use the same vector representation', 450, 680, 300, 160, 'gray'),
    card('results', 'Ranked Chunks', 'Cosine similarity + metadata filtering', 830, 680, 300, 160, 'gray'),
    '<mxCell id="l1" value="OFFLINE INDEXING" style="html=1;whiteSpace=wrap;fontFamily=Arial;verticalAlign=middle;rounded=1;arcSize=50;fillColor=#eef2ff;strokeColor=#a5b4fc;align=center;fontSize=20;fontColor=#4338ca;" vertex="1" parent="1"><mxGeometry x="650" y="300" width="220" height="32" as="geometry"/></mxCell>',
    '<mxCell id="l2" value="ONLINE RETRIEVAL" style="html=1;whiteSpace=wrap;fontFamily=Arial;verticalAlign=middle;rounded=1;arcSize=50;fillColor=#eef2ff;strokeColor=#a5b4fc;align=center;fontSize=20;fontColor=#4338ca;" vertex="1" parent="1"><mxGeometry x="650" y="900" width="230" height="32" as="geometry"/></mxCell>',
    edge('e1', 'chunks', 'model'), edge('e2', 'model', 'vectors'), edge('e3', 'vectors', 'metadata'),
    edge('e4', 'metadata', 'zvec', '#64748b', 'index', 'exitX=0.5;exitY=1;entryX=0.5;entryY=0;'),
    edge('e5', 'query', 'results'), edge('e6', 'zvec', 'results', '#64748b', 'cosine search'),
  ],
  state_document_lifecycle: [
    title('Document Lifecycle', 'Processing checkpoints from acquisition to retrieval'),
    panel('Document States'),
    card('a', 'Acquired', 'Raw content', 105, 345, 175, 100, 'gray'),
    card('b', 'Normalized', 'Clean document', 305, 345, 175, 100, 'blue'),
    card('c', 'Validated', 'Quality accepted', 505, 345, 175, 100, 'orange'),
    card('d', 'Enriched', 'Entities and relations', 705, 345, 175, 100, 'purple'),
    card('e', 'Indexed', 'Ready for retrieval', 905, 345, 175, 100, 'green'),
    edge('e1', 'a', 'b'), edge('e2', 'b', 'c', '#2563eb'), edge('e3', 'c', 'd', '#ea580c'), edge('e4', 'd', 'e', '#7c3aed'),
  ],
  reasoning_modes: [
    title('Reasoning Modes', 'Different depths for different question complexity'),
    panel('Selectable Query Strategies'),
    card('rag', 'RAG', 'Retrieve once and answer', 115, 280, 280, 260, 'blue'),
    card('cot', 'Chain of Thought', 'Plan steps and combine evidence', 460, 280, 280, 260, 'purple'),
    card('ref', 'Reflexive', 'Review evidence and search again', 805, 280, 280, 260, 'orange'),
    card('simple', 'Direct questions', '', 155, 625, 200, 65, 'gray'),
    card('multi', 'Multi-step questions', '', 500, 625, 200, 65, 'gray'),
    card('complex', 'Complex questions', '', 845, 625, 200, 65, 'gray'),
    edge('e1', 'rag', 'simple', '#2563eb'), edge('e2', 'cot', 'multi', '#7c3aed'), edge('e3', 'ref', 'complex', '#ea580c'),
  ],
  sequence_reasoning: [
    title('Query Reasoning Sequence', 'From the user question to a grounded response'),
    panel('Runtime Query Path'),
    card('q', 'Question', '', 100, 345, 145, 90, 'gray'),
    card('plan', 'Plan', 'Choose strategy', 270, 345, 145, 90, 'blue'),
    card('vector', 'Vector Search', 'Retrieve chunks', 440, 250, 175, 90, 'indigo'),
    card('graph', 'Graph Search', 'Traverse relations', 440, 465, 175, 90, 'orange'),
    card('fusion', 'Fuse Evidence', 'Rank and combine', 665, 345, 175, 90, 'green'),
    card('llm', 'Generate', 'Grounded synthesis', 890, 345, 175, 90, 'purple'),
    edge('e1', 'q', 'plan'), edge('e2', 'plan', 'vector', '#6366f1'), edge('e3', 'plan', 'graph', '#ea580c'),
    edge('e4', 'vector', 'fusion', '#6366f1'), edge('e5', 'graph', 'fusion', '#ea580c'), edge('e6', 'fusion', 'llm', '#7c3aed'),
  ],
};

fs.mkdirSync(output, { recursive: true });
for (const [id, cells] of Object.entries(diagrams)) {
  fs.writeFileSync(path.join(output, `${id}.drawio`), xml(id, cells), 'utf8');
}
console.log(`Generated ${Object.keys(diagrams).length} slide-friendly Draw.io diagrams.`);
