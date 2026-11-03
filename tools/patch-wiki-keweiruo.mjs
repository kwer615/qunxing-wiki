import fs from 'node:fs';

const P = 'src/wiki.tsx';
let s = fs.readFileSync(P, 'utf8');
const once = (needle, label) => {
  const n = s.split(needle).length - 1;
  if (n !== 1) throw new Error(`${label}：命中 ${n} 次，期望 1`);
};

// 1) 引入立绘清单
const anchorImport = "} from 'lucide-react';\n";
once(anchorImport, 'import 锚点');
s = s.replace(anchorImport, anchorImport + "import { CHAR_IMAGES } from './charImages';\n");

// 2) 可惟若：追加到角色数组末尾
const tail = `      { label: '立绘 Ⅱ · 歇业鲜亮发带常服', url: '' }
    ]
  }
];

`;
once(tail, '角色数组结尾');
const keweiruo = `      { label: '立绘 Ⅱ · 歇业鲜亮发带常服', url: '' }
    ]
  },
  {
    id: 'keweiruo',
    name: '可惟若',
    enName: 'Keweiruo',
    faction: '无籍',
    role: '来历不明的高个女人',
    age: '外貌二十上下',
    height: '173 cm',
    tier: '不可测',
    blessings: ['缀穹', '褶', '星阙', '北移的晷影', '月不照人间', '屋内之宇', '路出图外', '折地三千里，一线为垠'],
    quote: '顺路。走到这儿了。这地方风好。',
    coreSummary:
      '哪里都可能遇见，每次都编一个不像真话的理由。她不解释自己从哪来，也没人能查出她是什么。',
    appearance:
      '白发及腰，发丝细而顺，光下泛极淡的暖，平时松挽在身后落几缕在颈侧。异瞳——左眼淡蓝、右眼明黄，两只都不是纯色，靠瞳心更亮；被她正视的人会莫名想交代实话。头顶一根粉色呆毛，会随情绪动：放松时软软垂着，被撩到时立起来，装傻时轻轻抖。肤色是活人的白，颈侧与耳后透一点血色，不是惨白。锁骨下方一道旧痕，形状像一道合上的缝。体温比常人低半度，手掌是暖的。',
    attire:
      '通体雪白的长裙，剪裁极简、没有花纹；收腰，裙摆自膝下散开，走动时像一层薄雪在动。小立领扣到锁骨上方一枚哑银小扣，不开深 V。长袖窄口，露出一截手腕。白丝长筒袜，边缘藏在裙摆里。淡金色高跟鞋，跟高九厘米，鞋身极窄，细跟、鞋面一线淡金、侧面一枚米粒大的扣，走路会响一声很轻的金属声。全身只有白、白、淡金三色。',
    personality:
      '温柔体贴，先看别人缺什么：手破了先按住伤口再说教，冷了先把外套解下来。照顾人的方式很具体，不说空话——「先把这碗喝了」「袖子卷起来我看看」「坐这儿，别站着」。被撩时呆毛先立、耳根接着红，嘴上还想找补两句，最后别开脸低声说「别说这种话」；不恼，也不顺势接下去，只会局促一小会儿然后转开话题。认真时语气不变，只是不再笑，这时候她说什么没人能改。',
    lifestyle:
      '没有固定住处，也不在任何人的名册上；府城巷口、洛汀渡船、东洼盐田、南屏山道、荒原路边都可能。会饿会困，喜欢甜的，睡相不好，醒来呆毛歪着。对这个世界的生活常识有时很生疏，问得很认真。被问起为什么在这里，理由每次都不一样，且都不像真话。',
    combat:
      '八样都能用，全部不付代价：缀穹（补上缺口、硬接住正在塌的东西）、褶（掀开世界的边穿过去，也能把打来的东西掀去别处）、星阙（让一个人的存在从记录与记忆里消失）、北移的晷影（让方位、时辰、因果错位）、月不照人间（翻到另一面，绕过一切防线）、屋内之宇（借一间屋子把人关在里面）、路出图外（在没有路的地方走，也能让别人的路断掉）、折地三千里，一线为垠（把远方折到眼前，折痕能把人夹住）。她从不预警、不解释、不留余地，事情成了也没人看见过程。',
    pollution:
      '【两本空账】旧日的东西浸不进她，她也不把污染带给别人；以位阶、赐福、污染为根据的任何测量落到她身上全部失效——她能通过任何核验，却查不出内容。教团档案上只有一张「待核」的空卷宗，核过她的人后来都记不清自己核过谁。',
    secret:
      '她的身体毁掉会重新长回来，意识与记忆不断，她从不解释也从不演示，被问起就岔开话题。她在的地方，钟会慢半拍，水面倒影会晚半拍——这是她到了的唯一预兆。',
    imgs: [
      { label: '立绘 Ⅰ · 雪白长裙（待补）', url: '' }
    ]
  }
];

`;
s = s.replace(tail, keweiruo);

// 3) 把真实立绘并进每个角色
const bossAnchor = 'const SERLAN_BOSSES = [';
once(bossAnchor, 'SERLAN_BOSSES 锚点');
const merge = `// 立绘：按 id 把抓下来的图并进 imgs；没有图的角色保留占位框，不造假图。
SERLAN_CHARACTERS.forEach((character) => {
  const files = CHAR_IMAGES[character.id];
  if (!files || files.length === 0) return;
  character.imgs = files.map((url, index) => ({
    label: character.imgs[index] ? character.imgs[index].label : \`立绘 \${index + 1}\`,
    url
  }));
});

${bossAnchor}`;
s = s.replace(bossAnchor, merge);

fs.writeFileSync(P, s);
console.log('wiki.tsx 已更新：立绘接线 + 可惟若');
