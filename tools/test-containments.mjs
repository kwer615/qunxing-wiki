import assert from 'node:assert/strict';
import fs from 'node:fs';

const dataUrl = new URL('../src/containments.ts', import.meta.url);
assert.ok(fs.existsSync(dataUrl), '缺少瑟兰收容物数据');
const { CONTAINMENT_PREFIX, SERLAN_CONTAINMENTS } = await import(dataUrl.href);
assert.equal(CONTAINMENT_PREFIX.code, 'TSQ');
assert.equal(CONTAINMENT_PREFIX.en, 'The Sidereal Quietus');
assert.equal(SERLAN_CONTAINMENTS.length, 9);
const names = [
  ['苍白霜降之圣母', 'Our Lady of the Pale Frost'],
  ['失声唱诗班', 'Silent Choir'],
  ['献给盲眼苍穹的赞美诗', 'A Chorale for the Blind Firmament'],
  ['溺水神明的几何学', 'Geometry of a Drowning God'],
  ['以红移书写的墓志铭', 'Epitaph Written in Redshift'],
  ['泣血方碑', 'The Weeping Monolith'],
  ['沉没之空', 'Sunken Sky'],
  ['失乐园的玻璃潮汐', 'The Glass Tides of Perdition'],
  ['对未历黄昏的乡愁', 'Nostalgia for an Unlived Dusk']
];
SERLAN_CONTAINMENTS.forEach((item, i) => {
  assert.equal(item.id, `TSQ-${411 + i}`.replace('TSQ-', 'TSQ-0'));
  assert.equal(item.name, names[i][0]);
  assert.equal(item.enName, names[i][1]);
  for (const key of ['kind', 'location', 'custodian', 'assistance']) assert.ok(item[key], `${item.id}: ${key}`);
  assert.equal(item.mechanisms.length, 2, `${item.id}: 完整异常机制`);
  assert.ok(item.localNotes.length >= 2, `${item.id}: 瑟兰落点与看守记录`);
  item.mechanisms.forEach(section => assert.ok(section.title && section.body));
});
const data = JSON.stringify(SERLAN_CONTAINMENTS);
assert.doesNotMatch(data, /照夜原|克苏鲁|克塔尼德|温压弹|深空探测/);
const page = fs.readFileSync(new URL('../src/wiki.tsx', import.meta.url), 'utf8');
assert.match(page, /id: 'serlan-containments', label: '收容物'/);
assert.match(page, /activeTab === 'serlan-containments'/);
assert.match(page, /selectedEntity.type === 'containment'/);
assert.match(page, /label: `收容物｜/);
assert.match(page, /aria-label={`查阅 \$\{item.id\} \$\{item.name\}`}/);
console.log('PASS 9 exact bilingual titles, mechanisms and Serlan locations');
console.log('PASS v1.5-only content and existing sidebar/search/detail wiring');
