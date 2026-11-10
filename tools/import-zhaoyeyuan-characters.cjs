const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SOURCE = 'D:/SillyTavern/旧日复苏/角色图片';
const OUT = path.join(__dirname, '..', 'src', 'assets', 'characters', 'zhaoyeyuan');

const files = {
  'zy-person-1': '裴知微.png',
  'zy-person-2': '顾青梧.png',
  'zy-person-3': '商婉宁.png',
  'zy-person-4': '上官闻舟.png',
  'zy-person-5': '谢停云.png',
  'zy-person-6': '尉迟照.png',
  'zy-person-7': '岳沉霜.png',
  'zy-person-8': '慕容砺.png',
  'zy-person-9': '柳知渡川.png',
  'zy-person-10': '石晚潮音.png',
  'zy-person-11': '公孙问路.png',
  'zy-person-12': '秦昭眠雪.png',
  'zy-person-13': '白衡芜.png',
  'zy-person-14': '沈砚秋.png',
  'zy-person-15': '萧令仪.png',
  'zy-person-16': '叶听雪.png',
  'zy-person-17': '陈烬.png',
  'zy-person-18': '殷潮生.png',
  'zy-person-19': '闻素.png',
  'zy-person-20': '沈雾.png',
  'zy-lord-murong': '慕容清.png',
  'zy-lord-lan': '兰墨灵.png',
  'zy-lord-chao': '潮.png',
  'zy-lord-dongfang': '东方暮云.png'
};

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  let total = 0;
  for (const [id, file] of Object.entries(files)) {
    const source = path.join(SOURCE, file);
    if (!fs.existsSync(source)) throw new Error(`Missing image: ${source}`);
    const webp = await sharp(source)
      .resize(640, 960, { fit: 'cover', position: 'top' })
      .webp({ quality: 82, effort: 5 })
      .toBuffer();
    fs.writeFileSync(path.join(OUT, `${id}.webp`), webp);
    total += webp.length;
  }
  console.log(JSON.stringify({ count: Object.keys(files).length, totalWebpBytes: total }, null, 2));
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
