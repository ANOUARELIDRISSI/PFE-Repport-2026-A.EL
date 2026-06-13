import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { diagrams } from '../pngmediatemplate/react/src/shared/diagrams.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = path.join(root, 'drawio');

function escapeXml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function textValue(value = '') {
  return escapeXml(
    String(value)
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<[^>]+>/g, '')
      .replaceAll('&nbsp;', ' ')
      .replaceAll('&amp;', '&'),
  );
}

function nodeHeight(node) {
  if (typeof node.style?.height === 'number') return node.style.height;
  if (node.type === 'title') return 92;
  if (node.type === 'model') return 255;
  if (node.type === 'card') return 126;
  if (node.type === 'label') return 30;
  const lines = String(node.data?.label ?? '').match(/<br\s*\/?>/gi)?.length ?? 0;
  return node.data?.small ? 68 : Math.max(78, 72 + lines * 20);
}

function nodeWidth(node) {
  if (typeof node.style?.width === 'number') return node.style.width;
  if (node.type === 'label') return Math.max(86, String(node.data?.label ?? '').length * 8 + 24);
  return 260;
}

function nodeLabel(node) {
  if (node.type === 'title') {
    return `&lt;b&gt;${textValue(node.data.title)}&lt;/b&gt;&lt;br&gt;&lt;font color=&quot;#64748b&quot;&gt;${textValue(node.data.subtitle)}&lt;/font&gt;`;
  }
  if (node.type === 'card') {
    return `&lt;b&gt;${textValue(node.data.title)}&lt;/b&gt;&lt;br&gt;&lt;font color=&quot;#475569&quot;&gt;${textValue(node.data.body)}&lt;/font&gt;`;
  }
  if (node.type === 'model') {
    const items = node.data.items.map((item) => `- ${textValue(item)}`).join('&lt;br&gt;');
    return `&lt;b&gt;${textValue(node.data.title)}&lt;/b&gt;&lt;br&gt;&lt;font color=&quot;#64748b&quot;&gt;${textValue(node.data.meta)}&lt;/font&gt;&lt;hr&gt;${items}`;
  }
  return textValue(node.data?.label ?? '');
}

function nodeStyle(node) {
  const base = 'html=1;whiteSpace=wrap;fontFamily=Arial;verticalAlign=middle;';
  if (node.type === 'title') {
    return `${base}text;strokeColor=none;fillColor=none;align=center;fontSize=25;fontStyle=1;fontColor=#0f172a;`;
  }
  if (node.type === 'band') {
    return `${base}rounded=1;arcSize=10;fillColor=#f8fafc;strokeColor=#cbd5e1;strokeWidth=2;align=left;verticalAlign=top;spacingTop=12;spacingLeft=14;fontStyle=1;fontSize=20;fontColor=#475569;`;
  }
  if (node.type === 'label') {
    return `${base}rounded=1;arcSize=50;fillColor=#eef2ff;strokeColor=#a5b4fc;align=center;fontSize=11;fontColor=#4338ca;`;
  }
  if (node.type === 'model') {
    return `${base}rounded=1;arcSize=8;fillColor=#ffffff;strokeColor=#64748b;strokeWidth=2;align=left;spacing=12;fontSize=12;fontColor=#0f172a;`;
  }
  const soft = node.data?.soft;
  const web = node.data?.web || node.data?.webNote;
  const fill = web ? '#fff7ed' : soft ? '#f1f5f9' : '#ffffff';
  const stroke = web ? '#fb923c' : '#64748b';
  return `${base}rounded=1;arcSize=${node.data?.pill ? 50 : 10};fillColor=${fill};strokeColor=${stroke};strokeWidth=2;align=center;spacing=10;fontSize=${node.data?.small ? 11 : 13};fontColor=#0f172a;shadow=0;`;
}

function handlePoint(handle, exit) {
  const prefix = exit ? 'exit' : 'entry';
  const points = {
    top: [0.5, 0],
    right: [1, 0.5],
    bottom: [0.5, 1],
    left: [0, 0.5],
  };
  const [x, y] = points[handle] ?? (exit ? points.right : points.left);
  return `${prefix}X=${x};${prefix}Y=${y};${prefix}Dx=0;${prefix}Dy=0;`;
}

function generate(diagram) {
  const cells = [];
  const bands = diagram.nodes.filter((node) => node.type === 'band');
  const others = diagram.nodes.filter((node) => node.type !== 'band');

  for (const node of [...bands, ...others]) {
    const x = node.position?.x ?? 0;
    const y = node.position?.y ?? 0;
    cells.push(
      `        <mxCell id="${escapeXml(node.id)}" value="${nodeLabel(node)}" style="${nodeStyle(node)}" vertex="1" parent="1">`,
      `          <mxGeometry x="${x}" y="${y}" width="${nodeWidth(node)}" height="${nodeHeight(node)}" as="geometry"/>`,
      '        </mxCell>',
    );
  }

  for (const edge of diagram.edges) {
    const sourceHandle = edge.sourceHandle ?? 'right';
    const targetHandle = edge.targetHandle ?? 'left';
    const style = `edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#64748b;strokeWidth=2;endArrow=block;endFill=1;${handlePoint(sourceHandle, true)}${handlePoint(targetHandle, false)}`;
    cells.push(
      `        <mxCell id="${escapeXml(edge.id)}" value="" style="${style}" edge="1" parent="1" source="${escapeXml(edge.source)}" target="${escapeXml(edge.target)}">`,
      '          <mxGeometry relative="1" as="geometry"/>',
      '        </mxCell>',
    );
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net" agent="Codex" version="26.0.0" type="device">
  <diagram id="${escapeXml(diagram.id)}" name="${escapeXml(diagram.id)}">
    <mxGraphModel dx="${diagram.width}" dy="${diagram.height}" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="${diagram.width}" pageHeight="${diagram.height}" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
${cells.join('\n')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
`;
}

fs.mkdirSync(outputDir, { recursive: true });
for (const diagram of diagrams) {
  fs.writeFileSync(path.join(outputDir, `${diagram.id}.drawio`), generate(diagram), 'utf8');
}

console.log(`Generated ${diagrams.length} Draw.io diagrams in ${outputDir}`);
