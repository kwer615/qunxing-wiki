// 从卡工程的 bubble/avatars.json 抓角色立绘，压成 webp 放进 src/assets/characters。
// 只做一次性抓取，产物已入库；原图在 postimg.cc，站上不引用外链。
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'D:/harness/qunxing-mvu-text/v0.1/bubble/avatars.json';
const OUT = path.resolve('src/assets/characters');

// 世界书里的中文名 → 本站角色的 id
const IDS = {
  伊瑟琳: 'yserin',
  薇蕾娜: 'verena',
  塞芙琳: 'sephrin',
  莱昂: 'leon',
  埃德温: 'edwin',
  诺薇娅: 'novia',
  奥蕾娜: 'aurena',
  米蕾娅: 'mireya',
  瑟缇娅: 'setia',
  维罗莎: 'verosa',
  薇奥拉: 'viola',
  米芙拉: 'mifla',
  蕾希娅: 'lecia'
};

const manifest = JSON.parse(fs.readFileSync(SRC, 'utf8'));
fs.mkdirSync(OUT, { recursive: true });

const result = {};
for (const [cn, value] of Object.entries(manifest)) {
  const id = IDS[cn];
  if (!id) {
    console.log('跳过（本站没有这个角色）', cn);
    continue;
  }
  const urls = Array.isArray(value) ? value : [value];
  const files = [];
  for (let i = 0; i < urls.length; i++) {
    const res = await fetch(urls[i], { headers: { 'user-agent': 'Mozilla/5.0' } });
    if (!res.ok) {
      console.log('下载失败', cn, i, res.status);
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    const name = urls.length > 1 ? `${id}-${i + 1}.webp` : `${id}.webp`;
    const info = await sharp(buf)
      .resize({ width: 640, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(path.join(OUT, name));
    files.push({ name, w: info.width, h: info.height, kb: Math.round(info.size / 1024) });
    console.log(cn.padEnd(4), name.padEnd(16), info.width + 'x' + info.height, Math.round(info.size / 1024) + 'KB');
  }
  result[id] = files;
}

fs.writeFileSync(path.join(OUT, '_manifest.json'), JSON.stringify(result, null, 2));
const total = Object.values(result).flat().reduce((a, f) => a + f.kb, 0);
console.log('\n共', Object.values(result).flat().length, '张，合计', total, 'KB');
