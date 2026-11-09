import React, { useState, useMemo, useEffect } from 'react';
import {
  Globe,
  Eye,
  Compass,
  MapPin,
  Users,
  Skull,
  Feather,
  ScrollText,
  Landmark,
  Train,
  Search,
  ChevronRight,
  ChevronDown,
  X,
  Menu,
  Flame,
  Waves,
  Clock,
  Volume2,
  Footprints,
  Archive,
  Layers,
  Image as ImageIcon,
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import { CHAR_IMAGES } from './charImages';
import { CONTAINMENT_PREFIX, SERLAN_CONTAINMENTS } from './containments';

// ============================================================================
// 1. STATIC ARCHIVE DATA (寰宇通则 / 旧日支配者·恩格萨 / 瑟兰行省)
// ============================================================================

const POW_TIERS = [
  {
    rank: 'TIER 0',
    name: '普通人',
    scale: '凡俗之躯 · 未显赐福',
    desc: '尚未因污染累积显出超自然力量之人。在常识圈内按改写后的规矩生活，面对异兆及以上存在时无正面抗衡之力，但可凭现场判断、工程器械与查证推进人间事务。'
  },
  {
    rank: 'TIER 1',
    name: '异兆',
    scale: '个人或小范围超自然威胁',
    desc: '污染积累突破临界，沉睡存在的象征在体内显化为初步赐福。可对单一个体或狭小室内、巷口形成超自然压制。'
  },
  {
    rank: 'TIER 2',
    name: '离常',
    scale: '改变局部冲突或建筑院落',
    desc: '可稳定干预整座院落、工地现场或成队敌人的交锋。'
  },
  {
    rank: 'TIER 3',
    name: '灾临',
    scale: '决定街区、据点或局部战场',
    desc: '一人即可封锁或清除整片街区与坚固据点，左右局部战场存亡。'
  },
  {
    rank: 'TIER 4',
    name: '覆城',
    scale: '持续干预全城存亡',
    desc: '权能可覆盖整座城市的攻防体系，分割全城道路、困锁巨物或同时压制城内多处抵抗。'
  },
  {
    rank: 'TIER 5',
    name: '陆沉',
    scale: '影响多城、交通干线与地域灾变',
    desc: '可跨越多座城市与漫长交通线持续介入战局，或引发连锁山体滑坡、水道改道等地域级灾变。'
  },
  {
    rank: 'TIER 6',
    name: '天倾',
    scale: '正面介入广阔地域的重大灾变',
    desc: '人世间已知战力的绝对顶端。可正面截停或发动广域天灾，令整座城市与周边荒原的战局定格或崩解。'
  },
  {
    rank: 'BEYOND I',
    name: '旧日眷属',
    scale: '越过人世顶端 · 存在本身异化',
    desc: '世界内无人知晓此称谓。意味污染已深入存在本身，不再只是主动施术；生命与意识归零不再以常理判定死亡，但仍属“个体”，行动有方向与对象，在满足特定条件下仍可被击败或终结。'
  },
  {
    rank: 'BEYOND II',
    name: '旧日支配者',
    scale: '沉睡的污染源头 · 绝对不可杀死',
    desc: '世界内无人知晓此名与层次。祂自身即为笼罩一方大地的污染之源，遵循不可知、不可直视、不可名状、不可杀死、不回应、不逆转、不收回七条铁律，如同永恒停驻的反常天气。'
  },
  {
    rank: 'BEYOND I',
    name: '旧神眷属',
    scale: '越过人世顶端 · 存在本身异化',
    desc: '与旧日眷属同层。世界内绝大多数人不知道这个名称；力量来自旧神一侧，发动没有代价，但更容易被旧日一侧察觉与追杀。'
  },
  {
    rank: 'BEYOND II',
    name: '旧神',
    scale: '沉睡的旧神一侧源头 · 绝对不可杀死',
    desc: '与旧日支配者同层。世界内绝大多数人不知道这个名称；力量来自旧神一侧，发动没有代价，但更容易被旧日一侧察觉与追杀。旧神同样在沉睡，不回应祈祷，不主动出面。'
  }
];

const ENGSA_BLESSINGS = [
  {
    id: 'ember',
    name: '余烬',
    en: 'EMBER · ASHES UNEXTINGUISHED',
    originSymbol: '源自象征簇 01：没烧完的炭（火的结束没有结束）',
    subtitle: '让烧尽之物继续燃烧',
    icon: Flame,
    holders: ['瑟缇娅'],
    ability:
      '受赐者可将“燃烧”留在早已烧尽的灰烬与废墟上，主动放出并驱使。灰烬不发光，靠近之人却会皮肉逐层焦黑，烧成灰后灰里仍传出其燃烧时的惨叫；燃烧经过甚至不留火场，房屋完好而屋内人已烧没，或令落下的雨滴内部正在燃烧。',
    scale:
      '污染加深后，早已熄灭的一整片城市废墟火场可重新化为力量，后来踏入废墟的庞大污染造物仍会在无火之灰中焚毁。',
    cost:
      '【燃烧亦留在自身】起初施展后体内散出洗不净的焦味；随后一次灼痛永久保留，无可见烧伤却日夜剧痛，昏睡亦不中断；更深时呼气带灰，隔着胸膛能听见肺腑烧裂之声，逐渐失去让自己熄灭的可能。'
  },
  {
    id: 'depth',
    name: '沉渊',
    en: 'ABYSS · DRY LAKEBED',
    originSymbol: '源自象征簇 02：干掉的湖床（水的离开没有离开）',
    subtitle: '把干地变成无水湖底',
    icon: Waves,
    holders: ['薇蕾娜', '维罗莎'],
    ability:
      '受赐者能让干燥地面直接成为湖底。不见水涌、地面不湿，目标却开始下沉，屋檐布幔向上漂浮，声音渐远，仰头可见太阳隔着极深的水晃动。可使目标沉没，亦可将其从湖底拖出——拖出之物通身干燥，嘴里却不断吐出黑臭淤泥。',
    scale:
      '污染加深后，整段城墙、山体乃至巨型污染造物都可沉入这片看不见水面的深湖，地表空旷如常，深处却可见巨物挣动。',
    cost:
      '【自身亦留在湖底】起初发动后短暂窒息；后来那口气永远吸不进来——虽能走路说话，却永远停在即将淹死的一瞬，每句话都顶着溺水般的挣扎；更深时身体不断下沉，旁人看他仍在原地，他却要仰头才看得见别人的脚底。'
  },
  {
    id: 'moment',
    name: '留刻',
    en: 'MOMENT · FROZEN PENDULUM',
    originSymbol: '源自象征簇 03：停在某一点的钟（时间的走没有走完）',
    subtitle: '让眼前的时刻停留',
    icon: Clock,
    holders: ['伊瑟琳', '米蕾娅', '蕾希娅'],
    ability:
      '受赐者能将一个正在发生的过程留在原处：雨滴悬空，塌桥定格，伤势恶化暂缓。无论外界过去多久，里面都没有下一刻，靠近时却偶能听见其中传出漫长的呼吸声。这不是倒转时间，而是令眼前之事迟迟不完成。',
    scale:
      '污染加深后，连正在降临的广域灾变都能被留在尚未落下的一刻；人们可在其下生活多年，抬头时那场灾难仍悬在头顶咫尺之处。',
    cost:
      '【旧经历不肯退场】起初停住时刻后某种感觉留在身上（雨入眼、刃触肤）；后来走出火场却仍同时身处火场，正在交谈也同时承受另一刻的坍塌与旧伤。能留下的灾变越大，越难拥有一个单独的“现在”。'
  },
  {
    id: 'echo',
    name: '余响',
    en: 'ECHO · LINGERING VOICE',
    originSymbol: '源自象征簇 05：屋子里的余音（话的说完没有说完）',
    subtitle: '离开之后，声音仍可使用',
    icon: Volume2,
    holders: ['伊瑟琳', '塞芙琳', '诺薇娅', '维罗莎'],
    ability:
      '受赐者能把声音留在曾开口的场所，离开很久后仍借它回答、呼唤或尖叫。尖叫时墙壁朝声源凹陷如巨口吸气；留声可震碎骨骼、撕开掩体，或令整片区域听不见其他声响——呼救者张嘴，耳中却只有受赐者的话语。',
    scale:
      '污染加深后，过去所有说过话的地方可同时轰鸣；人站在城外，整座城市却开始从内部发声撕裂战场。',
    cost:
      '【旧话语留在体内】起初刚说的话在身体各处回响；后来求救、哭喊、梦话与训诫在体内同时并存，从不变轻。睡着后身体仍在说，堵住嘴声音便从胸腔、伤口或耳孔传出；能让全城听见自己，面前之人却越来越难听清他此刻想说哪一句。'
  },
  {
    id: 'trace',
    name: '留迹',
    en: 'TRACE · UNWASHED FOOTPRINTS',
    originSymbol: '源自象征簇 04：冲不掉的脚印（人的经过没有过去）',
    subtitle: '旧脚印仍是自己的所在',
    icon: Footprints,
    holders: ['莱昂', '瑟缇娅', '薇奥拉'],
    ability:
      '受赐者曾留下的有效脚印，可继续作为他站立的位置。人明明在眼前，巷尾旧脚印却猛然下陷响起脚步；可从旧足迹处直接伸手抓握、挥刃突袭或显现真身，两处皆为实体而非幻影。',
    scale:
      '污染加深后，走过的整片街区与地域皆可同时响起脚步，四面八方皆有其手伸出，跨越数城切入战场。',
    cost:
      '【走过之处无法离开】起初鞋里泥倒不净，入暖屋仍踩着城外风雪；后来旧脚印处发生的事会直接落回本体——旧处生火则双足焦黑，旧路钉桩则双腿被钉穿，道路翻修、洪水倾塌皆同时发生在他身上。可遍布一城，却无一处能安然站立。'
  },
  {
    id: 'remnant',
    name: '遗存',
    en: 'REMNANT · FORGOTTEN IN THE BOTTOM DRAWER',
    originSymbol: '源自象征簇 06：沉在柜底忘了的东西（东西的消失没有消失）',
    subtitle: '失去之后，实物仍能出现',
    icon: Archive,
    holders: ['伊瑟琳', '薇蕾娜', '埃德温', '薇奥拉', '米芙拉'],
    ability:
      '受赐者接触过的事物，在损毁或遗失后仍能以真实器物取出使用。探入空柜可抽出早已烧毁的刀，刀刃带冷灰却能真实斩铁；拆掉的门可先在墙上长出门闩，倒塌的楼可先悬空展开二楼地板。',
    scale:
      '污染加深后，已毁的城门、关隘、倾覆的船只乃至整片废墟建筑群皆可在战场重现，压碎巨物、封锁道路（重现屋舍内偶有不受控的旧住客）。',
    cost:
      '【自身摆脱不了遗留物】起初扔掉的旧物重回衣袋，剪下的指甲混进饭碗，拔掉的牙夜里顶住牙床；后来伤口取出的碎片仍在肉里，坏死组织与新肉挤在同一处；更深时翻开衣服看见的是一截柜角、一段门框，躯体逐渐变成旧物不肯离开的容器。'
  }
];

const SERLAN_CUSTOMS = [
  {
    num: '壹',
    title: '没烧完的炭',
    symbol: '对应象征：火的结束没有结束',
    rule: '府城人家从不掏净灶膛，总留一块没烧透的炭；灶灰不出门，掏出的炭埋回灶脚，不扔、不送、不倒进沟里。',
    surface: '掏净灶膛的那户人家，第二天柴干火好也点不着灶；三天后火重新点起，街坊便说“过去了”。',
    deep: '重新点起的蓝色火苗烧得旺，伸手却不烫，水烧不开、饭煮不熟，寒冬烧整夜屋子也冰冷。屋里人从手脚到胸口一寸寸冷下去，说话渐慢，临死那天家人仍在往他身上加被子。从这户引出的火到邻居家也一样，故一户掏净，整条巷子无人敢借火。'
  },
  {
    num: '贰',
    title: '干掉的湖床',
    symbol: '对应象征：水的离开没有离开',
    rule: '府城人称那片泥裂如水纹的干地为“旧湖”。不在上面盖房、打井、埋人；路过必绕行，绕不开便低头快走绝不停留。',
    surface: '旧湖打出的井水浑浊，喝下后并非做噩梦，而是清清楚楚梦见别人家的往事，醒来仍历历在目。',
    deep: '梦会慢慢走进白天，饮水者将别人的经历彻底当成自己的。曾有终身未娶的打井人清楚记得自己有五个孩子，记得老三淹死时自己站在岸上——而那家人早在三十年前死绝。他不觉疯癫，只觉“终于想起来了”，每天去陌生坟头哭别人的孩子，哭了一辈子。'
  },
  {
    num: '叁',
    title: '停在某一点的钟',
    symbol: '对应象征：时间的走没有走完',
    rule: '府城钟楼、衙门、铺子的钟全都停在同一个时刻。当地绝不修钟、不换钟，报时只说“到点了”“该吃饭了”，从不报数字。',
    surface: '把钟修得重新走动后，第二天全家人呼吸平稳却怎么摇都叫不醒，直到日头偏西才逐个自己醒来。',
    deep: '醒来之后，这家人“第二天”便永不结束。每天吃同一顿饭、说同一句话、坐同一个姿势，不老不长，不饿不饱。如今那户门上钉死木板，邻居路过只平淡道一句“他家钟修了”便继续吃饭。'
  },
  {
    num: '肆',
    title: '冲不掉的脚印',
    symbol: '对应象征：人的经过没有过去',
    rule: '门槛内外的泥脚印一层压一层从不清扫。规矩是进门不回头，出门也绝不回头看自己的脚印。',
    surface: '回头的人会发现，自己的脚印全都朝着屋里——不是人走反了，是印子本身的方向反了。看过一次，此后每次进门都会低头看。',
    deep: '这个人从此只能往屋里走。他能出门远行，甚至骑马狂奔，却终会发现自己又站在自家门前，鞋沾新泥、脚印朝里，马浑身是汗而自己不记得骑过。走得越远，回来反而越快，直到房子消失——而府城从不拆房。'
  },
  {
    num: '伍',
    title: '屋子里的余音',
    symbol: '对应象征：话的说完没有说完',
    rule: '府城人说话留半句，后半截咽回去或摆手说“你懂”。若不小心把话说满，必须立刻拍一下桌子或咳一声把话“收住”。',
    surface: '完整说出而未收住的话，会在屋里用以前住户的声音再响一遍，响过便消失。',
    deep: '响完之后，这话便开始算数。说“这井打不出水”井便永涸，说“你明天会死”人便活不过次日，重复几遍算几遍。城东有条巷子因早年旧话逐条应验，如今全巷不敢开口，买卖打手势，孩子哭就死死捂嘴，巷中人平均活不过四十岁。'
  },
  {
    num: '陆',
    title: '沉在柜底忘了的东西',
    symbol: '对应象征：东西的消失没有消失',
    rule: '家中柜子最底下一格永远锁闭，东西放进去便不再取出，不打开、不清点、不追问。',
    surface: '打开的人会先看见以为早已丢失或毁坏的旧物：断而复接的簪子、烧掉的旧信、死去多年之人的烟袋，甚至比丢失时更新。',
    deep: '再往下翻，出现的便是“尚未发生之事用过的遗物”：尺寸正合自己的叠好的新寿衣、扶手已被自己手印磨亮的新木拐杖、碗底刻着自己还没起好的名字的碗。它们不会消失，一直留在柜底等着。'
  },
  {
    num: '柒',
    title: '送走、销名与弃置法条',
    symbol: '府城处理违规者的法定程序与遗忘机制',
    rule: '府城没有垃圾场，只有“送场”；没有拆迁，只有“弃置”。触犯禁忌陷入深层后果者不被处死，而是由家属当日赴籍司办妥“销名”，随后将人“送走”。',
    surface: '立法者与胥吏皆以为自己在办理日常卫生、治安与道路养护，法条中无一字提及神明或异常。',
    deep: '人被送走、销名手续结清后，全城便不再有人提起此人——不是避讳，而是真的彻底想不起来，问起只会说“他家早搬走了”。见过深层恐怖的人皆被送走遗忘，留下的人只见过表面小事，规矩由此世代延续。'
  }
];

const SERLAN_CHARACTERS = [
  {
    id: 'yserin',
    name: '伊瑟琳',
    enName: 'Yserin',
    faction: '不逝者',
    role: '不逝者现任教首 ／ 圣女',
    age: '26岁',
    height: '169 cm（不含鞋跟）',
    tier: '天倾',
    blessings: ['留刻', '余响', '遗存'],
    quote: '她在乎你疼不疼，却不一定承认你有权拒绝。',
    coreSummary: '想先让瑟兰恢复正常再去过自己的人生，却逐渐失去判断正常的能力，也越来越无法离开。',
    appearance:
      '银发，天蓝色眼眸，容貌成熟柔和，具温柔从容的成年女性气质（绝非幼态或百岁老怪）。严重污染与真实美貌并存。',
    attire:
      '象牙白宽方领教首长裙（沿边哑银刺绣，露锁骨不露肩），腰间叠穿深雾蓝色缎面开襟外裙；外象牙白内深雾蓝短披肩配哑银扣与错落银链；领前佩椭圆形浅蓝宝石窄银框胸针；足踏深雾蓝色踝上高跟鞋（鞋口高于脚踝、侧面细银扣，非短靴）。',
    personality:
      '表层温和耐心，真心记挂他人不便；深层冷漠偏执，一旦认定某事必须完成，具体个人的意愿与性命皆会被排到后面。下达残酷决定时语气依旧温和。',
    lifestyle:
      '幼年受严苛圣女培养，饮食长期受控，私下会偷偷尝试从未吃过的街边小吃；向往不带身份去陌生城市住几天。',
    combat:
      '人世间战力顶端。可精确截停坍塌或将整座城市与广域灾变留在未落下一刻（留刻）；借全城旧声从内部撕裂巨型造物（余响）；展开大片已毁城防与建筑群分割战场（遗存）。',
    pollution:
      '【双重摇摆与三系反噬】在“察觉全城异常而焦虑核查”与“接受污染常识觉得合理”间摇摆，会认出自己的字迹却批注当日精神不佳否定判断。旧伤与坍塌感时常重现、耳畔回荡旧求救声、衣袖与身体偶有旧物残片重叠显现。',
    secret:
      '【幕后底牌】察觉高庭早已亡佚及瑟兰全境污染日常化，主动占据高庭空位发出恢复北线的回文（仅薇蕾娜知情协助）。本人正在向「旧日眷属」转化，但她自己尚不知情。',
    imgs: [
      { label: '立绘 Ⅰ · 象牙白教首盛装', url: '' },
      { label: '立绘 Ⅱ · 水边白纱', url: '' },
      { label: '立绘 Ⅲ · 海滩午后', url: '' }
    ]
  },
  {
    id: 'verena',
    name: '薇蕾娜',
    enName: 'Verena',
    faction: '不逝者',
    role: '不逝者首席执事（总部核心）',
    age: '31岁',
    height: '173 cm',
    tier: '覆城',
    blessings: ['遗存', '沉渊'],
    quote: '她努力让命令变成实际帮助，却可能在手续结束时，失去继续关心某个人的能力。',
    coreSummary: '统筹全组织日常运转、财物与分支监督的实干核心，忠诚于伊瑟琳却敢当面反对具体安排。',
    appearance: '深栗色长发（工作时盘起），灰绿色眼眸，眉眼清晰，神情专注，不事客套。',
    attire: '炭灰色收腰长外套、米白衬衣、深色长裙配低跟系带鞋，袖口常留墨迹。',
    personality:
      '说话直接略显刻薄，讨厌空泛保证，开口先问东西何时到、谁负责；关心人时不讲安慰话，而是直接补齐药物、轰熬夜者去睡觉。',
    lifestyle: '忙起来忘吃饭，偏爱热而完整的正餐，厌恶拿甜点凑合；休息时亲手修补旧衣，盼望能安心按时下班。',
    combat:
      '覆城级战力。以「遗存」在城内多处重现熟悉过的旧城门、仓栈与防线逼敌改道，再以「沉渊」令干燥街道化作无水湖底吞没敌军与巨物。',
    pollution:
      '【手续结束，牵挂亦终】受府城销名遗忘影响，一人一旦办结“送走”销名手续，她对此人的牵挂便迅速消退，前一日还在追查，次日便平静劝家属处理遗物。同时长年承受溺水般的窒息感与旧碎片驻留伤处。',
    secret: '极少数知晓并协助伊瑟琳发出“高庭回文”的核心知情人，但完全不知道伊瑟琳正在向眷属转化。',
    imgs: [
      { label: '立绘 Ⅰ · 首席执事常服', url: '' },
      { label: '立绘 Ⅱ · 沉渊遗存城防态', url: '' }
    ]
  },
  {
    id: 'sephrin',
    name: '塞芙琳',
    enName: 'Sephrin',
    faction: '不逝者',
    role: '北线地方分支主祭',
    age: '43岁',
    height: '167 cm',
    tier: '灾临',
    blessings: ['余响'],
    quote: '她想保护熟悉的地方，也想让这里越来越离不开自己，最终只听自己的。',
    coreSummary: '扎根北线多年的地方主祭，既有护佑本地人的真心，也有截留物资经营私人领地的二心。',
    appearance: '黑褐色头发挽成低髻，琥珀褐色眼睛，眼角带细纹，端正沉稳。',
    attire: '深酒红长裙、黑褐短外套配旧银胸针，干净体面。',
    personality:
      '处事稳重有耐心，极善经营长久人情。常以长辈口气插手他人安排，把总部拨下的救济做成别人欠她的人情。',
    lifestyle: '喜浓茶与偏硬的烤面包，亲手照看院中香草。',
    combat:
      '灾临级据点防御者。在长年经营的院落门廊预留声音，敌袭时旧声四起震裂骨骼、令院墙内凹，或遮断整片街区的呼救声。',
    pollution:
      '【不知何时叫停苦难】将严重污染后果当成可维持的安稳日子（如维护困在同一天的家庭却阻止外人救出）。胸腔在交谈或睡梦中常同时响起多年前的训诫旧声。',
    secret: '非总部核心，不知高庭回文与伊瑟琳转化。在第九节将指向薇蕾娜的原始调拨文书交予玩家以留后路。',
    imgs: [
      { label: '立绘 Ⅰ · 深院主祭常服', url: '' },
      { label: '立绘 Ⅱ · 旧声回廊展开态', url: '' }
    ]
  },
  {
    id: 'leon',
    name: '莱昂',
    enName: 'Leon',
    faction: '不逝者',
    role: '不逝者总部直属执事',
    age: '28岁',
    height: '182 cm',
    tier: '灾临',
    blessings: ['留迹'],
    quote: '他能带别人找到回家的路，却越来越难感觉哪里是自己的家。',
    coreSummary: '常年奔走北线与荒野的护送执事，爽朗重诺，渴望道路真正通车。',
    appearance: '深棕短发、棕色眼睛，肤色微深，身形结实俊朗，脸上无疤痕。',
    attire: '灰褐旅行外套、暗绿内衫、耐磨长裤与系带靴。',
    personality: '随和健谈，遇险果决不推卸责任；缺点是好胜，有时为证明判断硬接风险。',
    lifestyle: '喜热闹饭桌与各地吃法，给熟人带礼物各有归属，盼来一场不带护送任务的旅行。',
    combat:
      '灾临级突袭者。在走过的街区与山道借旧脚印多点同时现身或伸手夹击，夺回路口、接应车队。',
    pollution:
      '【记得故乡，却失归属】清楚记得故乡亲人，熟悉感却错位落在从未见过的陌生门户上，回真故乡反像替人认路，因愧疚而频频拖延回乡。双足常受旧路冰雪、火烧与钉刺牵连反伤。',
    secret: '不知高庭与转化机密。第八节断崖遭白喉犬群袭击后，向玩家交底旧山道路线与早期物资来自塞芙琳。',
    imgs: [
      { label: '立绘 Ⅰ · 荒野行装', url: '' },
      { label: '立绘 Ⅱ · 留迹多点突袭态', url: '' }
    ]
  },
  {
    id: 'edwin',
    name: '埃德温',
    enName: 'Edwin',
    faction: '留府三司',
    role: '留府 · 籍司司长',
    age: '27岁',
    height: '181 cm',
    tier: '离常',
    blessings: ['遗存'],
    quote: '他希望每个人都在记录里有个位置，却越来越难接受有人活在记录之外。',
    coreSummary: '温和耐心的年轻籍司司长，精于户籍名册核对，却受困于“让见闻迁就档案”的认知偏差。',
    appearance: '深棕色微卷短发，灰蓝色眼睛，眉骨清晰，面容俊朗随和。',
    attire: '深蓝灰色双排哑银扣长外套，内穿米白衬衣与烟褐色马甲，系暗红色窄领巾。',
    personality: '爱听迁居与家庭旧事，待人温和有礼；但偏信凭据完整之人，遇记录残缺者内心易先入为主。',
    lifestyle: '爱听说书与翻旧书摊游记，喜炖肉与烤根茎，盼沿修通的铁路去亲眼看看名册里的地方。',
    combat: '离常级。可令自己实际接触过、后来损毁或遗失的纸本文书以实物重现，但无法凭空生成档案。',
    pollution:
      '【削足适履的记录偏执】记录越完整，越难相信记录之外的亲眼所见——若名册写某人独居，即便亲眼见过其与家人同行，事后也会自动把同行者解释为邻居。',
    secret: '不知销名遗忘的深层机制，亦不知档案库正下方干涸湖床沉睡着恩格萨。',
    imgs: [
      { label: '立绘 Ⅰ · 籍司司长正装', url: '' },
      { label: '立绘 Ⅱ · 旧册遗存核验态', url: '' }
    ]
  },
  {
    id: 'novia',
    name: '诺薇娅',
    enName: 'Novia',
    faction: '留府三司',
    role: '留府 · 籍司正式核验员',
    age: '21岁',
    height: '163 cm',
    tier: '异兆',
    blessings: ['余响'],
    quote: '她原本就不愿与人亲近，如今却开始无法决定，谁会让自己感到亲近。',
    coreSummary: '冷淡寡言却严守核验底线的少女核验员，正与“熟人陌生、生人熟稔”的错位感对抗。',
    appearance: '及腰赤棕色长直发（工作时窄银发扣束低马尾），浅绿色眼眸眼尾微扬，藏有一颗小虎牙。',
    attire: '孔雀蓝铜扣短外套、浅米衬衣、深褐高腰长裤与短靴，斜挎插着铅笔的核验小皮包。',
    personality: '话少冷淡，问完即走；但绝不签未经核实的糊涂结果，哪怕讨厌当事人也会如实提交有利证据。',
    lifestyle: '避开拥挤集市，爱吃酸甜果脯，私下喜欢收集颜色漂亮的便宜耳饰与花纹裙子。',
    combat: '异兆级。可令自己在现场说过的一小段话重新响起，用于荒野遇袭时制造声源误导异兽。',
    pollution:
      '【熟悉感与经历错位】记忆完好，但面对朝夕相处的家人却觉得像初见般陌生，遇到素未谋面的陌生人反而生出多年故交般的安心感，为此不得不靠反复核查旧档自保。',
    secret: '主线第二节与星旅六的核心人物，依靠居住细节、邻里作息与时间差交叉印证对抗认知污染。',
    imgs: [
      { label: '立绘 Ⅰ · 走访核验裤装', url: '' },
      { label: '立绘 Ⅱ · 休沐花裙与耳饰', url: '' }
    ]
  },
  {
    id: 'aurena',
    name: '奥蕾娜',
    enName: 'Aurena',
    faction: '留府三司',
    role: '留府 · 通司司长',
    age: '22岁',
    height: '168 cm',
    tier: '普通人',
    blessings: [],
    quote: '她很想成为一个能让人放心依靠的人，却总忍不住先答应，再拼命追上自己的承诺。',
    coreSummary: '没有赐福却凭出色调度手腕接掌通司的年轻司长，急于借北线复通证明自己。',
    appearance: '半束蜂蜜棕色微卷长发，深蓝色眼睛，面容明丽，笑起来带一点俏皮，情绪易写在脸上。',
    attire: '墨绿短外套（挑剔精致纽扣）、奶白衬衣、深色及膝裙与短靴，随身带小记事簿与旧怀表。',
    personality: '外向敏锐，善谈条件；缺点是怕事情停在手里，常把“我会争取”说成“我能办到”。',
    lifestyle: '爱逛衣料店挑纽扣，喜果味酸饮，偷留奶油糕点下班吃；渴望有一场完全由朋友安排行程的旅行。',
    combat: '普通人，无超自然赐福，依靠全司调度、工程规划与政治会签解决危机。',
    pollution:
      '【通知已发＝对方已知】明知没有收到回执，脑中却自然按“沿线车站早已收到改道通知并做好准备”来排布后续调度，在第六节险些酿成窄谷火药车队追尾大祸。',
    secret: '第六节断司堂后因玩家私下提醒补发调令保全面子，首次向玩家吐露【第一层底牌：高庭2月19日回文】。',
    imgs: [
      { label: '立绘 Ⅰ · 通司司长日常装', url: '' },
      { label: '立绘 Ⅱ · 三司会签礼服', url: '' }
    ]
  },
  {
    id: 'mireya',
    name: '米蕾娅',
    enName: 'Mireya',
    faction: '留府三司',
    role: '通司 · 北线路务署长',
    age: '20岁',
    height: '165 cm',
    tier: '离常',
    blessings: ['留刻'],
    quote: '她希望自己的本事足以保护现场的人，也正在学会承认——有些责任不能靠自己再撑一次来解决。',
    coreSummary: '好胜麻利的年轻总工程师，全程主持北线180公里抢修的现场核心。',
    appearance: '黑色齐肩发扎短束，榛色眼睛明亮，笑露虎牙，工地上手脚麻利。',
    attire: '靛蓝短外套、浅灰衬衣、耐磨长裤与系带靴；休息日私下喜欢穿浅黄色裙子（被撞见会害羞瞪人）。',
    personality: '见新奇机械就想拆，重现场实勘而厌恶玄虚搪塞；总觉得“我还能再顶一下”不肯退后。',
    lifestyle: '爱改机械玩具，做饭重辣却记得谁不吃辣，喜欢去安全水域游泳。',
    combat:
      '离常级。在施工与战斗现场精准留刻开裂的支撑、落石或敌刃，配合工程结构改变战局（第四节与玩家合力斩杀路基异兽）。',
    pollution:
      '【已拆旧棚仍在安排里】图纸上亲手划掉的已拆维修棚、早废的便道，排活时仍会顺嘴把队伍往那儿派（第五节险将撤离点定在空地上）。肩背常年压着早已放下的重物感与旧扭伤剧痛。',
    secret: '贯穿第四、五、七节北线工程的核心搭档，认准可复核的现场证据。',
    imgs: [
      { label: '立绘 Ⅰ · 路务署工地装', url: '' },
      { label: '立绘 Ⅱ · 休沐浅黄长裙', url: '' }
    ]
  },
  {
    id: 'setia',
    name: '瑟缇娅',
    enName: 'Setia',
    faction: '留府三司',
    role: '留府 · 断司司长',
    age: '22岁',
    height: '145 cm（成年）',
    tier: '陆沉',
    blessings: ['余烬', '留迹'],
    quote: '她不肯把危险推给别人，也因此越来越难承认，有些地方已经不是她记得的样子。',
    coreSummary: '身形娇小却威严冷厉的断司最高统帅，瑟兰应对地域级灾变的定海神针。',
    appearance: '灰紫色长发束成两条及腰低长辫，暗红色眼眸，容貌幼态却目光极稳，极反感被当成孩童摸头。',
    attire: '合身裁制的黑色短上衣配暗酒红立领内衬、及腰哑银扣链短斗篷、前短后长高腰褶裙与黑色系带长靴。',
    personality: '严厉冷淡，汇报须严格分清“亲见、转述与猜测”；嘴硬心软，会直接改排班表轰熬夜下属去睡。',
    lifestyle: '喜酸樱桃馅饼与浓热茶，闲时拼小木模型，坐高背椅会自己添脚凳。',
    combat:
      '陆沉级。借「留迹」跨越数城切入曾走过的分散战场，并以「余烬」引燃熄灭的旧火场焚毁大型污染造物与成片敌阵。',
    pollution:
      '【把新变故当旧案尾巴】难以接受已办结的现场再出新变故——路障重塌仍当已清完，撤空处有人折返仍按无人发令（星旅二核心冲突）。体内常年承受不灭的旧灼痛与旧战场塌陷反伤。',
    secret: '第六节断司堂主裁者，因玩家分栏作证清晰而建立信任。',
    imgs: [
      { label: '立绘 Ⅰ · 断司司长斗篷装', url: '' },
      { label: '立绘 Ⅱ · 池畔泳装', url: '' }
    ]
  },
  {
    id: 'verosa',
    name: '维罗莎',
    enName: 'Verosa',
    faction: '留府三司',
    role: '断司 · 巡回判官',
    age: '29岁',
    height: '174 cm',
    tier: '覆城',
    blessings: ['沉渊', '余响'],
    quote: '她能温柔地听完一个人的遭遇，也能带着同样的笑容，作出不给对方退路的决定。',
    coreSummary: '常带温和笑意却出手狠辣果决的巡回判官，以雷霆手段铲除地方恶霸。',
    appearance: '乌黑长发挽高髻、后垂一束长发过肩，浅金褐色眼眸舒展，唇角常带笑意。',
    attire: '深梅紫色黑绒领长外套、珍珠灰高领长裙、黑色薄手套与修长扣带靴，佩小珍珠耳坠。',
    personality:
      '表面和蔼耐心，实则对痛苦缺乏怜悯；审讯与杀人时皆保持微笑与轻柔语调，毫不迟疑，但本意为除暴安良而非虐杀取乐。',
    lifestyle: '喜淡甜奶油点心，认真挑旅店早餐，随身带针线修补衣物，爱静静听当地小调。',
    combat: '覆城级。微笑温声间令街道化作无水湖底吞没敌群（沉渊），并借城内多处旧声同时击碎据点掩体（余响）。',
    pollution:
      '【熟稔语气与危险脱节】若重伤或异变者仍以日常平和语气回答，她会误判为寻常不适；反之听见某句曾在灾变现场听过的客套话，却会骤然判定极度危险。长年处于溺水窒息感中。',
    secret: '星旅三《平静水面的倒影》核心人物，玩家助其精准揪出伪善匪首而未误伤无辜住户。',
    imgs: [
      { label: '立绘 Ⅰ · 断司巡回判官', url: '' }
    ]
  },
  {
    id: 'viola',
    name: '薇奥拉',
    enName: 'Viola',
    faction: '民间人士',
    role: '府城万事通 ／ 消息掮客',
    age: '34岁',
    height: '171 cm',
    tier: '陆沉',
    blessings: ['留迹', '遗存'],
    quote: '人不在家，跟往后再也见不着，是两码事。',
    coreSummary: '深藏陆沉实力的市井消息掮客，走遍聚落认识无数人，也因此无法接受永别。',
    appearance: '深紫褐色长发松编长辫，灰金色眼睛，笑容亲切而目光专注。',
    attire: '米白衬衣、深孔雀绿马甲、烟灰长裤，披棕色长旅行外套，耳戴一枚小金环。',
    personality:
      '爱听零碎闲话，买卖明码标价（亲见、转述、猜测拆开卖），严守线人性命底线；嘴碎、会顺杆爬蹭饭搭车、不肯被长久名分拴死。',
    lifestyle: '回府城总钻同一家小饭馆刮净盘子，爱凑局打牌，记哪家老树开花。',
    combat:
      '隐藏的陆沉级强者。凭多年行商积累的广泛旧足迹（留迹）与旧工事器物（遗存），可在多处远方现场同时介入护路除怪。',
    pollution:
      '【无法将分别当成永别】明知故人死讯甚至亲手备办棺木，排下一趟出城日程时仍会顺手买一包那人常喝的茶叶揣上，铺子后堆满永远送不出去的包裹。',
    secret: '星旅四《寄往空山的第十二封信》核心人物，首次破例让讲规矩的玩家搭车前往名册已空的南屏支谷。',
    imgs: [
      { label: '立绘 Ⅰ · 临街小铺掮客装', url: '' },
      { label: '立绘 Ⅱ · 荒野旧迹行商态', url: '' }
    ]
  },
  {
    id: 'mifla',
    name: '米芙拉',
    enName: 'Mifla',
    faction: '民间人士',
    role: '洛汀 · 绒灯旅店老板娘',
    age: '21岁',
    height: '158 cm',
    tier: '异兆',
    blessings: ['遗存'],
    quote: '他回来找的时候，总得有东西还给他呀。',
    coreSummary: '软糯温和却算账利落的绒灯旅店老板娘，整条洛汀旧车站街坊共同护着的团宠。',
    appearance:
      '及腰蜜桃粉色蓬松微卷长发（脑后以奶油黄缎带半扎蝴蝶结，备餐时拢成侧编辫），浅紫色垂尾眼眸，笑有浅酒窝，声音带软绵鼻音。',
    attire: '奶白细褶方领衬衣、莓红色系带短马甲、雾粉色过膝裙，外罩奶油黄围裙，穿白袜与棕色圆头扣带鞋。',
    personality:
      '体贴细心，不会吵架（被人拍桌会吓一跳需旁人解围），但守死店规绝不泄露住客行踪；耳根软常因排不开房急红眼圈，生气时闷头不说话却仍备齐伤药温水。',
    lifestyle: '喜草莓果酱、温奶茶与胖鸟图案杯子；盼坐火车去府城吃一顿别人做的饭。',
    combat: '异兆级非战斗人员。仅能让接触过的旧杯碟、钥匙、针线等小日用品暂时重现。',
    pollution:
      '【替不归客守旧箱】受洛汀地方认知影响，储物室多年无人认领的行李仍定期擦灰妥善保管，真心觉得客人只是还没回来；围裙口袋偶会自行冒出早已遗失的旧物。',
    secret: '主线第三节与星旅六核心人物，收留身无分文的玩家以帮工抵宿。',
    imgs: [
      { label: '立绘 Ⅰ · 绒灯旅店围裙装', url: '' },
      { label: '立绘 Ⅱ · 门边夜灯迎客态', url: '' }
    ]
  },
  {
    id: 'lecia',
    name: '蕾希娅',
    enName: 'Lecia',
    faction: '民间人士',
    role: '府城 · 白铃诊所医师',
    age: '23岁',
    height: '166 cm',
    tier: '离常',
    blessings: ['留刻'],
    quote: '口子合上了，怎么能说那道伤就不在那儿了？',
    coreSummary: '从容爱开玩笑却略带狡黠的民间女医师，善接他人难处却总把自己的疲惫藏在玩笑后。',
    appearance:
      '及腰鸢尾紫色大波浪长发（发梢渐淡为浅藤紫，平时银环束偏高侧马尾，诊疗时盘高卷髻），深玫红色眼眸明快专注。',
    attire: '雾白立领衬衣、墨绿收腰长裙、浅灰短外套，接诊时外罩可清洗的白色长罩衣。',
    personality:
      '善用轻松玩笑化解病患紧绷，收费与药效摊在明面；唯独聊到自己累不累时三言两语便绕开，想约熟人出门也总绕弯子连问对方忙不忙。',
    lifestyle: '喜酸甜莓果饮子、攒鲜亮发带、打花牌猜谜，唯独养花总因多浇水养成半死不活。',
    combat: '离常级医疗辅助。以「留刻」暂时截停伤势恶化以争取手术或转运时间，但无法代替真正医术。',
    pollution:
      '【难认治疗已经结束】亲手签字结诊、亲眼看着长好的伤口，隔几天又排进复查单甚至险些对完好皮肉动刀，须靠助手锁起结诊册核对阻拦；同时自身常残留病患伤口刺痛与寒意。',
    secret: '星旅一《白釉铃下的冷火》核心人物，玩家连夜赴城外为其取回急需药材并用结诊册劝阻其复查执念。',
    imgs: [
      { label: '立绘 Ⅰ · 白铃诊所罩衣态', url: '' },
      { label: '立绘 Ⅱ · 歇业鲜亮发带常服', url: '' }
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
      '白发及腰，发丝细而顺，光下泛极淡的暖，平时松挽在身后落几缕在颈侧。异瞳——左眼灰白色、右眼亮金色，两只都不是纯色，靠瞳心更亮；被她正视的人会莫名想交代实话。头顶一根粉色呆毛，会随情绪动：放松时软软垂着，被撩到时立起来，装傻时轻轻抖。肤色是活人的白，颈侧与耳后透一点血色，不是惨白。锁骨下方一道旧痕，形状像一道合上的缝。体温比常人低半度，手掌是暖的。',
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
      { label: '立绘 Ⅰ · 雪白长裙', url: '' },
      { label: '立绘 Ⅱ · 紫藤旗袍', url: '' }
    ]
  }
];

// 立绘：按 id 把抓下来的图并进 imgs；没有图的角色保留占位框，不造假图。
SERLAN_CHARACTERS.forEach((character) => {
  const files = CHAR_IMAGES[character.id];
  if (!files || files.length === 0) return;
  character.imgs = files.map((url, index) => ({
    label: character.imgs[index] ? character.imgs[index].label : `立绘 ${index + 1}`,
    url
  }));
});

const SERLAN_BOSSES = [
  {
    id: 'white-throat',
    name: '白喉',
    enName: 'WHITE THROAT · ALPHA HOUND',
    title: '挂皮犬群首 · 弃置牧场霸主',
    tier: '离常',
    habitat: '府城外围通往西部旧乡野的弃置牧场带、北线旧山道荒坡',
    appearance:
      '体型硕大的变异挂皮犬首领。灰白的并非全身，而是垂在胸前松垮厚重的喉皮；皮下结构比普通挂皮犬紧密得多，转向与扑击极快，可正面撞碎牲口栏与薄木门。',
    mechanism:
      '【兽声连切与犬群协同】发声时，低沉犬吠能瞬间无缝切换成另一种被吞食动物的凄厉呼唤，连续变声以掩护整支犬群从背风盲区包抄。',
    storyLink: '主线第八节《断崖前交汇的足音》中，率随食源迁徙的犬群袭击旧山道塌桥车队，与执事莱昂激战。',
    counter: '遇明显无法抗衡的高阶强者会主动退避；将其击杀或重创驱离后，附属犬群便会溃散。',
    imgs: [
      { label: '形态 Ⅰ · 垂落灰白喉皮伏姿', url: '' },
      { label: '形态 Ⅱ · 皮下展肢扑杀态', url: '' }
    ]
  },
  {
    id: 'sunken-sac',
    name: '沉囊',
    enName: 'SUNKEN SAC · MIRE BROODLORD',
    title: '泥肺巢主 · 废闸渠潜伏者',
    tier: '灾临',
    habitat: '东洼废闸渠及相连积水低地',
    appearance:
      '水面上仅露出几个旧皮袋似的灰白囊体；若伸长杆向下探，会触到水底淤泥中一整层缓慢让开的庞大连通软组织。',
    mechanism:
      '【水体挤压与胸闷安眠】可同时维持多个缠附面，庞大躯体剧烈收缩时直接挤动整条闸渠的水体，掀翻船只、拖垮薄弱堤岸；近距离接触者会把窒息胸闷误认作“终于能安心歇息”而放弃挣扎。',
    storyLink: '盘踞东洼废闸水路，导致周边聚落被迫放弃部分渡运与生产区域绕行生活。',
    counter: '无法遥控未迁入的独立水井；可通过排水工程、隔断水路缩减其接触范围，不可贸然下水围攻。',
    imgs: [
      { label: '形态 Ⅰ · 废闸水面浮囊伪装', url: '' },
      { label: '形态 Ⅱ · 渠底连通本体舒张', url: '' }
    ]
  },
  {
    id: 'old-frame',
    name: '老架',
    enName: 'THE OLD FRAME · STATION PARASITE',
    title: '伏梁霸主 · 废弃站场共生体',
    tier: '覆城',
    habitat: '北线废弃支线站场及相接建筑群（与主线第十节站场非同一处）',
    appearance:
      '盘踞整座废弃站场的覆城级巨型伏梁。检修棚、连廊与旧仓之间的承重梁柱皆属于它的同一具躯体，部分硬肢沿地下检修沟蔓延，外皮覆满木屑与铁锈，看似后补的木架会在长期观察中缓慢移位。',
    mechanism:
      '【连片结构控制与假性断裂音】可同时操控多栋建筑内的肢体推倒设施、切断通路；一旦迁入密集街区，足以持续造成全城结构崩塌。周围常响起位置错误的细碎断裂声以误导检修判断。',
    storyLink: '北线支线禁区霸主，活跃聚落与其之间特意留出废弃空地、断绝道路接修以增加其迁移成本。',
    counter: '拆毁几根支柱无法越级杀死本体；即便高阶强者将其诛杀，原靠其躯体撑住的建筑群也会随之坍塌。',
    imgs: [
      { label: '形态 Ⅰ · 检修棚承重梁伪装态', url: '' },
      { label: '形态 Ⅱ · 全站场多肢齐动崩塌态', url: '' }
    ]
  },
  {
    id: 'full-house',
    name: '满屋',
    enName: 'FULL HOUSE · THE ENDLESS INN',
    title: '候门者霸主 · 山城滞留之主',
    tier: '覆城',
    habitat: '南屏废弃山间聚居地（始于连院客舍，蔓延至相邻街巷）',
    appearance:
      '躯体沿门廊、夹墙及相接房舍延展的覆城级候门者霸主。人在不同屋舍门内看到的裹旧衣、正面层层向内折叠皮褶的轮廓，实为同一个存在。',
    mechanism:
      '【全镇级滞留认知改写】对踏入其覆盖街区的低阶旅人与住客持续施加滞留影响——受困者记得亲友、也真心打算回家，却永远把启程推迟到“做完眼前这件小事之后”，在无补给的空屋中耗尽生机。',
    storyLink: '南屏山间著名禁区，常有外围亲友为寻失联旅人主动入内而一同滞留。',
    counter: '无无限走廊幻境，街道均可查清；但强行带离受困者时会遭门廊与墙体伸出的皮褶肢体封堵拖拽。',
    imgs: [
      { label: '形态 Ⅰ · 连院客舍门内折皮坐姿', url: '' },
      { label: '形态 Ⅱ · 穿墙延展封锁街巷态', url: '' }
    ]
  },
  {
    id: 'ridge-bearer',
    name: '负岭者',
    enName: 'RIDGE BEARER · WALKING SLOPE',
    title: '罕见山岳巨物 · 改道移山者',
    tier: '陆沉',
    habitat: '南屏深部与瑟兰边缘山地',
    appearance:
      '远看宛如一段寻常林坡，背上覆盖经年累月的厚重泥土与碎石，真实的林木植被生长其上；粗大支肢深藏于沟谷之中。',
    mechanism:
      '【地域级地形改写与向来如此】长久停伏，但每一次起身迁移都会撑裂坡脚、引发连锁滑坡与河道改道，阻断多座城市的交通与补给；附近受影响者却会把移动前后的山貌都看成“向来如此”。',
    storyLink: '南屏旧路改线与早年聚落迁徙的真正元凶，旧地图与实测数据的矛盾皆因它而起。',
    counter: '低阶队伍仅能提前查明动向组织撤离，不可力敌；停伏期间周边村镇可正常生活。',
    imgs: [
      { label: '形态 Ⅰ · 覆土林坡沉眠态', url: '' },
      { label: '形态 Ⅱ · 沟谷支肢撑起移山态', url: '' }
    ]
  },
  {
    id: 'sky-draper',
    name: '垂天者',
    enName: 'SKY DRAPER · HORIZON SCOURGE',
    title: '旧疆界外活体天灾 · 垂肢蔽日者',
    tier: '天倾',
    habitat: '瑟兰旧疆界之外的广阔荒野（极少逼近有人聚居区）',
    appearance:
      '晴朗高空中偶尔可见的不随云层移动的庞大暗色实体轮廓，下方垂落稀疏的极长肢体——部分尚未触地，部分已拖过远方山脊。',
    mechanism:
      '【广域垂肢撕裂与视距欺骗】多处垂肢可同时介入广阔地域，沿途摧毁城防设施、犁开地表；受其认知影响，观察者常将已逼近眼前的躯体误判为“遥远天际的云影”而严重低估距离。',
    storyLink: '人世间最高位阶（天倾）的活体灾难，唯有同为天倾的伊瑟琳全力出手方可正面抗衡。',
    counter: '需靠不同地点的独立三角测量纠正距离误判；虽强至天倾，但仍属可遭遇的生物个体而非旧日支配者本体。',
    imgs: [
      { label: '形态 Ⅰ · 晴空远山垂肢轮廓', url: '' },
      { label: '形态 Ⅱ · 多肢触地广域灾变态', url: '' }
    ]
  }
];

const SERLAN_BEASTS = [
  {
    id: 'skin-hound',
    name: '挂皮犬',
    tier: '异兆（少数变异个体达离常）',
    habitat: '府城外缘弃置屠宰场、荒村、牧场外围',
    desc: '形似瘦大野犬，皮却松垮搭在肩背，转向时皮下躯体比外皮轮廓迟动一拍；伏地不动时极像杂物上搭着的一张旧兽皮。',
    danger: '喜食腐肉与落单牲畜。能贴着地面重复吞食过的牛羊叫声诱敌靠近，但不懂人言亦不强迫开门。',
    imgs: [{ label: '图鉴 · 挂皮犬伏地拟态', url: '' }]
  },
  {
    id: 'beam-lurker',
    name: '伏梁',
    tier: '离常（大型成熟个体达灾临）',
    habitat: '北线废弃车站、仓棚、失修桥涵屋架',
    desc: '狭长躯体腹面生满硬肢，紧贴屋梁柱石，表皮黏满木屑与铁锈。无接头的“新梁”或不落基础的柱脚皆是其破绽。',
    danger: '猎物经过下方时收拢支撑肢猛然压下（主线第十节玩家单挑离常巅峰个体）；清除前须注意屋顶是否正靠其躯体承重。',
    imgs: [{ label: '图鉴 · 伏梁贴合木架态', url: '' }]
  },
  {
    id: 'mud-lung',
    name: '泥肺',
    tier: '异兆 ～ 离常（连通大个体可达灾临）',
    habitat: '东洼淤渠、浅滩、废弃排水口',
    desc: '夹在水草污泥间的浸水灰白囊肉，收缩时由细孔吐泡，无风浅水中芦苇会随其呼吸一同起伏。',
    danger: '离水后行动受限；贴近接触时会令人将溺水胸闷误认为“终于可以歇息”而停止挣脱。',
    imgs: [{ label: '图鉴 · 泥肺浅滩吐泡态', url: '' }]
  },
  {
    id: 'back-walker',
    name: '背行客',
    tier: '灾临（生来即高危，数量稀少）',
    habitat: '南屏旧山路及往昔歇脚处',
    desc: '远看似低头背巨大行囊的旅人；侧身才见背上是一团向后蜷曲折叠的躯体，手足折在一起，脸朝向来路。',
    danger: '靠近者会误以为彼此已同行许久；接近队伍末尾负重慢行者后，折叠背肢骤然展开撑住两侧岩壁、拖翻货车。',
    imgs: [{ label: '图鉴 · 背行客山道回首态', url: '' }]
  },
  {
    id: 'ear-belly',
    name: '穗腹',
    tier: '异兆（少数离常）',
    habitat: '西部旧乡野田埂、荒置粮仓',
    desc: '形似矮壮牲畜，腹部低垂，皮下露出干硬的中空穗状器官（不可食用），走过草地留低矮拖痕与细碎摩擦声。',
    danger: '伏于粮堆旁时会令受影响者严重高估可收获的粮食数量（但秤砣称重可揭穿差额）；受围堵时腹部喷出刺激性干粉。',
    imgs: [{ label: '图鉴 · 穗腹荒田潜伏态', url: '' }]
  },
  {
    id: 'door-waiter',
    name: '候门者',
    tier: '离常（连片占据可达灾临）',
    habitat: '废村边缘、久无人居的旧宅院入口',
    desc: '常年坐在门内，外形似裹旧衣之人，正面却是层层向内折叠的皮褶；门前常摆破碗木片似在待客。',
    danger: '长期依附入口不远游；在近处避雨停留者会渐渐分不清“暂时歇脚”与“原本就住在此处”，搁置启程直至饿毙。',
    imgs: [{ label: '图鉴 · 候门者旧宅摆碗态', url: '' }]
  }
];

const MAIN_STORY_SECTIONS = [
  {
    sec: '第一节',
    title: '止于将倾',
    time: '天启历101年3月12日 清晨—中旬',
    km: 0,
    progress: '北线中断，仅局部通车',
    core: '伊瑟琳、埃德温',
    rank: '普通人',
    summary:
      '春汛掏空近路木石桥墩，第一辆载货板车压塌中段。不逝者教首伊瑟琳巡查至此，以「留刻」从容定住坍塌与坠落之人。异乡人突兀现身桥心，经伊瑟琳随手救治与交付常识后，前往府城籍司办理身份落籍（埃德温在册），临别获赠旧城南第三条巷子尽头无牌灰门的地址。'
  },
  {
    sec: '第二节',
    title: '行过北境的余音',
    time: '天启历101年4月—6月',
    km: 5,
    progress: '三司会签在走，前期勘线',
    core: '诺薇娅',
    rank: '普通人',
    summary:
      '偶遇正调查人口流动记录争议的籍司核验员诺薇娅。因人手不足随其走访勘验，在她受「熟悉感与实际经历错位」污染干扰时，以居住细节、邻里作息与时间差交叉核对事实；荒野遇异兆游荡怪时配合其「余响」脱离险境。'
  },
  {
    sec: '第三节',
    title: '借宿在绒灯亮起时',
    time: '天启历101年7月—9月',
    km: 10,
    progress: '洛汀物资积压，北线招工',
    core: '米芙拉',
    rank: '普通人',
    summary:
      '北上抵达商旅集散城洛汀，替独自取货遭外地人压价占道的「绒灯旅店」老板娘米芙拉解围并护送物资回店。以帮工（理货箱、扫大堂、核账）抵扣食宿，在往来车夫与住客闲谈间收集北线风声，偶见她围裙里自行重现的旧钥匙（遗存）。'
  },
  {
    sec: '第四节',
    title: '枕木、锈铁与满溢的杯',
    time: '天启历101年10月—11月',
    km: 15,
    progress: '外围施工点清障 15 公里',
    core: '米蕾娅',
    rank: '觉醒 → 异兆',
    summary:
      '入冬前在北线外围工地抬枕木清障。挖开旧路基时翻出成熟「离常」级异兽，在绝对劣势下拖延救人遭重创，此前积累的污染于生死一线贯通觉醒赐福（晋升异兆），配合从后方赶来的北线路务署长米蕾娅以「留刻」稳住塌方、合力斩杀异兽。'
  },
  {
    sec: '第五节',
    title: '春水漫过旧图纸',
    time: '天启历102年3月上旬',
    km: 45,
    progress: '熬过首冬，修至 45 公里',
    core: '米蕾娅',
    rank: '异兆',
    summary:
      '调入路务署直属工程队。开春化冻，米蕾娅受污染影响将早已拆空的旧维修棚当成撤离点；通过观察水痕、泥色与草根朝向，提前识破冻土层下渗水滑塌隐患并拦在坡脚，以可复核的现场依据促使米蕾娅改写施工顺序，救下数十名工友。'
  },
  {
    sec: '第六节',
    title: '被拨快的停摆之钟',
    time: '天启历102年7月中旬',
    km: 80,
    progress: '盛夏抢工期，修至 80 公里',
    core: '奥蕾娜、瑟缇娅',
    rank: '异兆',
    summary:
      '长距电报串线加上通司司长奥蕾娜「通知已发＝对方已知」的偏差，致火药车队与钢件车队险在窄谷追尾。截停重车、带回串线记录后，于断司堂上将「亲见」与「转述」分栏作证获瑟缇娅认可；庭后私下提醒奥蕾娜补发调令，换取【第一层真相：101年2月19日高庭回文点名恢复北线】。'
  },
  {
    sec: '第七节',
    title: '在盲区里燃尽的灯',
    time: '天启历102年11月上旬',
    km: 110,
    progress: '修至 110 公里，入次年冬歇',
    core: '米蕾娅',
    rank: '异兆',
    summary:
      '110公里处旧中途站被全员排班表无端遗漏，守夜工油尽粮绝。接手整顿空站，立下「每趟车挂双份木牌、当面认人画押领粮结款」的土规矩使站点重活；翻检旧仓收存簿时查出【第二层真相：100年底至101年初回文到达前，不逝者已按大修规格超前封存木材、铁件与伤药】。'
  },
  {
    sec: '第八节',
    title: '断崖前交汇的足音',
    time: '天启历103年3月下旬',
    km: 135,
    progress: '第三年开春，修至 135 公里',
    core: '莱昂',
    rank: '异兆',
    summary:
      '莱昂押轨料走通司会签图明令禁行的旧山道，旧桥不堪重负坍塌，遭离常级群首「白喉」率挂皮犬群伏击。莱昂以「留迹」击溃犬群反伤，下沟救出坠崖车夫与物资；当夜替其摊开两套相悖命令的矛盾，莱昂交底路线与早期物资皆来自北线主祭塞芙琳。'
  },
  {
    sec: '第九节',
    title: '深院里的温室与霜',
    time: '天启历103年6月中旬',
    km: 150,
    progress: '修至 150 公里，进入深山段',
    core: '塞芙琳',
    rank: '异兆',
    summary:
      '进入北线深山段分支，看穿主祭塞芙琳选择性汇报、截留物资庇护依附家庭以经营独立小地盘的盘算。不当众揭穿，而是帮她把亏空补成能过审的收支说明留足体面；塞芙琳作为交换与后路，交出【第三层真相：指向总部首席执事薇蕾娜的原始调拨文书】。'
  },
  {
    sec: '第十节',
    title: '于腐朽处生出新骨',
    time: '天启历103年8月下旬',
    km: 165,
    progress: '修至 165 公里，打通最后险段',
    core: '旅人本人',
    rank: '晋升 → 离常',
    summary:
      '165公里废弃站场险段（非老架所在的废弃支线），一头离常巅峰的成熟「伏梁」困住工友。独自冲入站房死斗、替工友撑住主梁时遭重创，污染沸腾贯通扛过存在撕裂重塑，正式晋升「离常」；看破其力量靠整座屋架传导，连斩吃力旧梁柱令屋架塌落将其压覆斩杀。'
  },
  {
    sec: '第十一节',
    title: '替被抹去的人落款',
    time: '天启历103年11月中旬',
    km: 175,
    progress: '最后 15 公里铺轨与过冬整备',
    core: '薇蕾娜',
    rank: '离常',
    summary:
      '摊出超前备料、调拨文书与路线单全套证据，首席执事薇蕾娜独自揽责。因受「销名即断牵挂」污染影响，她对一户刚办完当日销名的家庭瞬间失去波澜；替她跑通籍司与城外车队办妥遗留托付、护住其底线后，她亲口吐露【第四层真相前半：高庭早亡，年报是死信，回文系伊瑟琳占位所发】。'
  },
  {
    sec: '第十二节',
    title: '困在昨日的守夜人',
    time: '天启历104年1月下旬',
    km: 180,
    progress: '全线轨道合龙，三司联合试车',
    core: '伊瑟琳',
    rank: '离常',
    summary:
      '全线合龙试车之际，独自走入府城旧城南第三条巷子，推开那扇不挂牌的灰门当面问穿冒名之事。伊瑟琳坦承【第四层全部真相】：高庭已成废墟，全境正把致命污染当日常，她占住空位三司才动起来；她既有停下就会造成更大损失的冷酷偏执，也藏着去陌生城市住几天的微小私心。'
  },
  {
    sec: '第十三节',
    title: '当汽笛惊醒荒原',
    time: '天启历104年3月',
    km: 180,
    progress: '历时整三年，180公里正式复通',
    core: '全员收束',
    rank: '离常（本章封顶）',
    summary:
      '天启历104年3月，北线180公里铁路正式复通，原本步行9天的路程缩短为单程9—11小时。乘首发列车往返府城与洛汀，与三年间结识的十二位故人及伊瑟琳一一重逢话别。去留皆由自己决定：登车远赴陌生城市、留在北线继续做事，或转身离开。'
  }
];

const STAR_JOURNEYS_BRIEF = [
  { id: 'SJ-01', title: '《白釉铃下的冷火》', location: '府城 · 白铃诊所（蕾希娅）' },
  { id: 'SJ-02', title: '《未曾熄灭的旧灰》', location: '府城 · 断司及北线险情处（瑟缇娅｜第六节断司堂后）' },
  { id: 'SJ-03', title: '《平静水面的倒影》', location: '北线 · 沿线受裹挟聚落（维罗莎）' },
  { id: 'SJ-04', title: '《寄往空山的第十二封信》', location: '府城临街小铺 → 南屏支谷（薇奥拉）' },
  { id: 'SJ-05', title: '《纸背透出的呼吸》', location: '府城 · 籍司衙门与旧街巷（埃德温）' },
  { id: 'SJ-06', title: '《替远行人温着的夜》 / 《人潮散尽后的辨认》', location: '洛汀 · 绒灯旅店（米芙拉） / 府城至北线往返（诺薇娅）' }
];

const LOCAL_QUESTS_BRIEF = [
  { id: 'LQ-01', title: '《未曾抵达的人》', location: '北线 · 旧驿转运棚夹墙（缝补工艾妲 · 缺角旧邮袋）' },
  { id: 'LQ-02', title: '《人间尚有余温》', location: '府城 · 住宅街与小市集旁小食铺（梅婶 · 收灶回碗）' },
  { id: 'LQ-03', title: '《故乡不在原处》', location: '东洼 · 通往旧渡口的支路聚落（芮宁与罗珀 · 搬家清单）' }
];

// ============================================================================
// 2. REUSABLE AESTHETIC COMPONENTS (TORN PARCHMENT, MULTI-IMAGE FRAME)
// ============================================================================

function OrnamentalDivider({ label = '✦' }) {
  return (
    <div className="my-10 flex items-center gap-4 select-none opacity-75">
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#B8965A]/40 to-[#B8965A]/70" />
      <span className="font-cinzel text-xs tracking-[0.35em] text-[#B8965A]">{label}</span>
      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#B8965A]/40 to-[#B8965A]/70" />
    </div>
  );
}

function RelicImageArchitecture({
  imgs = [],
  code = 'ARCHIVE-01',
  tier = '',
  aspectClass = 'aspect-[3/4]',
  interactive = true
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const safeImgs = imgs.length > 0 ? imgs : [{ label: '立绘 Ⅰ · 默认拓片', url: '' }];
  const current = safeImgs[activeIdx] || safeImgs[0];

  useEffect(() => {
    setActiveIdx(0);
  }, [imgs]);

  return (
    <div className="flex flex-col select-none">
      <div
        className={`relative w-full ${aspectClass} bg-[#110F0D] overflow-hidden group transition-all duration-500`}
        style={{
          clipPath:
            'polygon(0% 10px, 10px 0%, calc(100% - 14px) 0%, 100% 14px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 14px 100%, 0% calc(100% - 14px))',
          boxShadow: 'inset 0 0 45px rgba(0,0,0,0.92), 0 0 1px rgba(184,150,90,0.45)'
        }}
      >
        <div
          className="absolute inset-[6px] pointer-events-none border border-[#B8965A]/25 z-20 transition-colors duration-500 group-hover:border-[#B8965A]/55"
          style={{
            clipPath:
              'polygon(0% 7px, 7px 0%, calc(100% - 10px) 0%, 100% 10px, 100% calc(100% - 7px), calc(100% - 7px) 100%, 10px 100%, 0% calc(100% - 10px))'
          }}
        />

        <span className="absolute top-2.5 left-2.5 text-[10px] text-[#B8965A]/50 z-20 font-cinzel">⌜</span>
        <span className="absolute top-2.5 right-2.5 text-[10px] text-[#B8965A]/50 z-20 font-cinzel">⌝</span>
        <span className="absolute bottom-2.5 left-2.5 text-[10px] text-[#B8965A]/50 z-20 font-cinzel">⌞</span>
        <span className="absolute bottom-2.5 right-2.5 text-[10px] text-[#B8965A]/50 z-20 font-cinzel">⌟</span>

        <div className="absolute top-3.5 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
          <span className="font-cinzel text-[10px] tracking-[0.2em] text-[#8E8474]/80 uppercase">
            {code}
          </span>
          {tier && (
            <span className="px-2 py-0.5 text-[11px] tracking-widest bg-[#8C3B32]/25 border-b border-[#8C3B32]/70 text-[#E2B49A] font-serif">
              {tier}
            </span>
          )}
        </div>

        {current.url ? (
          <img
            src={current.url}
            alt={current.label}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center relative">
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 50% 42%, rgba(184,150,90,0.16) 0%, rgba(91,126,150,0.06) 45%, transparent 72%)'
              }}
            />
            <div className="w-24 h-24 rounded-full border border-dashed border-[#B8965A]/20 flex items-center justify-center mb-4 relative group-hover:border-[#B8965A]/45 transition-colors">
              <div className="w-16 h-16 rotate-45 border border-[#8E8474]/20 flex items-center justify-center">
                <ImageIcon className="w-5 h-5 -rotate-45 text-[#B8965A]/50 group-hover:text-[#B8965A] transition-colors" />
              </div>
            </div>

            <p className="font-cinzel text-[11px] tracking-[0.25em] text-[#B8965A]/80 uppercase mb-1">
              VISUAL SLOT · {activeIdx + 1}/{safeImgs.length}
            </p>
            <p className="font-serif text-sm text-[#D8D0C1]/90 tracking-wider mb-2">
              {current.label}
            </p>
            <p className="font-fell italic text-[11px] text-[#8E8474]/60 max-w-[190px] leading-relaxed">
              [ 填入 imgs[{activeIdx}].url 即可挂载对应立绘或形态拓片 ]
            </p>
          </div>
        )}

        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#080706] via-[#080706]/85 to-transparent pt-8 pb-3 px-4 z-20 flex items-end justify-between">
          <span className="text-[11px] font-serif text-[#B8965A] tracking-wider truncate">
            {current.label}
          </span>
          {safeImgs.length > 1 && (
            <span className="font-cinzel text-[10px] text-[#8E8474] ml-2 shrink-0">
              {activeIdx + 1} / {safeImgs.length}
            </span>
          )}
        </div>
      </div>

      {interactive && safeImgs.length > 1 && (
        <div
          className="mt-2.5 flex items-center gap-1.5 flex-wrap"
          onClick={(e) => e.stopPropagation()}
        >
          {safeImgs.map((imgItem, idx) => {
            const isAct = idx === activeIdx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`px-2.5 py-1 text-xs font-serif tracking-wider transition-all ${
                  isAct
                    ? 'bg-[#B8965A]/20 text-[#E5C88F] border-b-2 border-[#B8965A]'
                    : 'bg-[#161310]/80 text-[#8E8474] hover:text-[#D8D0C1] border-b border-transparent'
                }`}
              >
                {imgItem.label.split('·')[0] || `图 ${idx + 1}`}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 3. MAIN APPLICATION
// ============================================================================

export default function App() {
  // 默认打开「恩格萨」以便直接看到恩格萨及其专属六大赐福的美化效果
  const [activeTab, setActiveTab] = useState('world-law');

  // 旧日支配者手风琴折叠状态（总栏与各个旧日子项均可折叠）
  const [eldritchMenuOpen, setEldritchMenuOpen] = useState(true);
  const [oldGodMenuOpen, setOldGodMenuOpen] = useState(true);
  const [regionMenuOpen, setRegionMenuOpen] = useState(true);
  const [openOldOnes, setOpenOldOnes] = useState({
    engsa: true,
    nextOldOne: false
  });

  // 地区卷宗手风琴折叠状态
  const [openRegions, setOpenRegions] = useState({
    serlan: true,
    region2: false
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [charFactionFilter, setCharFactionFilter] = useState('全部');
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [revealTruthLayers, setRevealTruthLayers] = useState(false);

  const toggleOldOne = (key) => {
    setOpenOldOnes((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleRegion = (key) => {
    setOpenRegions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const navigateTo = (tabId, anchorId = null) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    if (anchorId) {
      setTimeout(() => {
        const el = document.getElementById(anchorId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const filteredCharacters = useMemo(() => {
    return SERLAN_CHARACTERS.filter((c) => {
      const matchFaction = charFactionFilter === '全部' || c.faction === charFactionFilter;
      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchFaction;
      return (
        matchFaction &&
        (c.name.toLowerCase().includes(q) ||
          c.role.toLowerCase().includes(q) ||
          c.tier.toLowerCase().includes(q) ||
          c.blessings.some((b) => b.toLowerCase().includes(q)) ||
          c.coreSummary.toLowerCase().includes(q))
      );
    });
  }, [charFactionFilter, searchQuery]);

  const quickSearchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    const results = [];
    SERLAN_CHARACTERS.forEach((c) => {
      if (c.name.includes(q) || c.role.includes(q) || c.blessings.some((b) => b.includes(q))) {
        results.push({
          label: `人物｜${c.name}（${c.role}）`,
          action: () => {
            setActiveTab('serlan-chars');
            setSelectedEntity({ type: 'char', data: c });
            setSearchQuery('');
          }
        });
      }
    });
    SERLAN_BOSSES.forEach((b) => {
      if (b.name.includes(q) || b.title.includes(q) || b.tier.includes(q)) {
        results.push({
          label: `灾变领主｜${b.name}（${b.tier}）`,
          action: () => {
            setActiveTab('serlan-boss');
            setSelectedEntity({ type: 'boss', data: b });
            setSearchQuery('');
          }
        });
      }
    });
    SERLAN_CONTAINMENTS.forEach((item) => {
      if ([item.id, item.name, item.enName, item.kind, item.location].join(' ').toLowerCase().includes(q)) {
        results.push({
          label: `收容物｜${item.id} ${item.name}`,
          action: () => {
            setActiveTab('serlan-containments');
            setSelectedEntity({ type: 'containment', data: item });
            setSearchQuery('');
          }
        });
      }
    });
    ENGSA_BLESSINGS.forEach((bl) => {
      if (bl.name.includes(q) || bl.subtitle.includes(q)) {
        results.push({
          label: `恩格萨赐福｜${bl.name}（${bl.subtitle}）`,
          action: () => {
            setEldritchMenuOpen(true);
            setOpenOldOnes((p) => ({ ...p, engsa: true }));
            navigateTo('eldritch-engsa', 'engsa-blessings-anchor');
            setSearchQuery('');
          }
        });
      }
    });
    if ('恩格萨旧日支配者湖床'.includes(q)) {
      results.push({
        label: '旧日支配者｜恩格萨（湖床沉睡者 & 六大赐福）',
        action: () => {
          setEldritchMenuOpen(true);
          setOpenOldOnes((p) => ({ ...p, engsa: true }));
          navigateTo('eldritch-engsa');
          setSearchQuery('');
        }
      });
    }
    return results.slice(0, 6);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-[#0B0A09] text-[#D8D0C1] font-serif relative selection:bg-[#8C3B32]/60 selection:text-[#F5EFE6]">
      <style>{`

        .font-serif {
          font-family: 'Noto Serif SC', 'Songti SC', 'SimSun', serif;
        }
        .font-cinzel {
          font-family: 'Cinzel Decorative', 'Noto Serif SC', serif;
        }
        .font-fell {
          font-family: 'IM Fell English', 'Noto Serif SC', serif;
        }

        .torn-sheet {
          background: linear-gradient(165deg, rgba(24, 21, 18, 0.92) 0%, rgba(15, 13, 11, 0.96) 100%);
          clip-path: polygon(
            0% 8px, 8px 0%, 35% 2px, 68% 0%, calc(100% - 12px) 2px, 100% 12px,
            99.6% 45%, 100% calc(100% - 9px), calc(100% - 9px) 100%,
            62% 99.4%, 24% 100%, 10px 99.5%, 0% calc(100% - 10px), 0.3% 52%
          );
          box-shadow: inset 0 0 60px rgba(0, 0, 0, 0.85);
        }

        .torn-strip {
          background: linear-gradient(90deg, rgba(184, 150, 90, 0.08) 0%, rgba(24, 20, 17, 0.85) 18%, rgba(15, 13, 11, 0.4) 100%);
          clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 0 100%, 4px 50%);
        }

        ::-webkit-scrollbar {
          width: 5px;
          height: 5px;
        }
        ::-webkit-scrollbar-track {
          background: #0B0A09;
        }
        ::-webkit-scrollbar-thumb {
          background: #3A3228;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #B8965A;
        }
      `}</style>

      {/* 背景残卷暗角与纹理 */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(circle at 60% 25%, rgba(184, 150, 90, 0.05) 0%, rgba(91, 126, 150, 0.03) 35%, rgba(6, 5, 5, 0.95) 85%)'
        }}
      />
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, #D8D0C1 0px, transparent 1px, transparent 3px)'
        }}
      />

      {/* 顶部极简残卷书眉 */}
      <header className="sticky top-0 z-30 bg-[#0B0A09]/90 backdrop-blur-md border-b border-[#B8965A]/20">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "关闭菜单" : "打开菜单"}
              className="lg:hidden p-2 text-[#B8965A] hover:text-[#F5EFE6]"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div
              onClick={() => navigateTo('eldritch-engsa')}
              className="cursor-pointer flex items-baseline gap-3 group"
            >
              <span className="text-[#B8965A] text-sm">✦</span>
              <h1 className="text-lg sm:text-xl font-bold tracking-[0.22em] text-[#E6DEC8] group-hover:text-[#B8965A] transition-colors">
                群星沉默之地
              </h1>
              <span className="hidden md:inline-block font-fell italic text-xs text-[#8E8474] tracking-widest">
                Where The Stars Fall Silent · Codex
              </span>
            </div>
          </div>

          <div className="relative w-56 sm:w-72">
            <div className="flex items-center border-b border-[#B8965A]/35 focus-within:border-[#B8965A] pb-1 transition-colors">
              <Search className="w-3.5 h-3.5 text-[#B8965A]/70 mr-2.5 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="检索人物、领主、收容物、恩格萨赐福..."
                className="w-full bg-transparent text-xs text-[#D8D0C1] placeholder-[#8E8474]/60 focus:outline-none tracking-wider"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-[#8E8474] hover:text-[#D8D0C1]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {quickSearchResults.length > 0 && (
              <div className="absolute right-0 mt-2 w-80 bg-[#14110E] border border-[#B8965A]/40 shadow-2xl py-2 z-50">
                {quickSearchResults.map((item, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={item.action}
                    className="w-full text-left px-4 py-2 text-xs text-[#D8D0C1] hover:bg-[#B8965A]/15 hover:text-[#E5C88F] transition-colors flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#B8965A]" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 主体双栏 */}
      <div className="max-w-[1600px] mx-auto flex relative z-10">
        {/* ===================================================================
            左侧古籍手风琴导航树
        =================================================================== */}
        <aside
          className={`fixed lg:sticky top-16 left-0 z-40 w-72 h-[calc(100vh-4rem)] overflow-y-auto bg-[#0E0C0A]/95 lg:bg-transparent border-r border-[#B8965A]/15 px-5 py-7 transition-transform duration-300 ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          {/* Ⅰ · 寰宇通则 */}
          <div className="mb-7">
            <div className="flex items-center gap-2 text-[11px] font-cinzel tracking-[0.25em] text-[#B8965A] uppercase mb-2.5">
              <Globe className="w-3.5 h-3.5" />
              <span>Ⅰ · 寰宇通则</span>
            </div>
            <div className="space-y-1 pl-2 border-l border-[#B8965A]/20">
              <button
                type="button"
                onClick={() => navigateTo('world-law')}
                className={`w-full text-left py-2 px-3 text-xs tracking-wider transition-all flex items-center justify-between ${
                  activeTab === 'world-law'
                    ? 'text-[#E5C88F] bg-gradient-to-r from-[#B8965A]/20 to-transparent border-l-2 border-[#B8965A] -ml-[1px] font-semibold'
                    : 'text-[#8E8474] hover:text-[#D8D0C1]'
                }`}
              >
                <span>灾变、常识圈与教团成因</span>
              </button>
              <button
                type="button"
                onClick={() => navigateTo('power-rank')}
                className={`w-full text-left py-2 px-3 text-xs tracking-wider transition-all flex items-center justify-between ${
                  activeTab === 'power-rank'
                    ? 'text-[#E5C88F] bg-gradient-to-r from-[#B8965A]/20 to-transparent border-l-2 border-[#B8965A] -ml-[1px] font-semibold'
                    : 'text-[#8E8474] hover:text-[#D8D0C1]'
                }`}
              >
                <span>位阶序列与晋升铁律</span>
              </button>
            </div>
          </div>

          {/* Ⅱ · 旧日支配者（可折叠大栏目，支持多个旧日手风琴展开） */}
          <div className="mb-7">
            <button
              type="button"
              onClick={() => setEldritchMenuOpen(!eldritchMenuOpen)}
              className="w-full flex items-center justify-between text-[11px] font-cinzel tracking-[0.25em] text-[#C86D5B] uppercase mb-2.5 py-1 hover:text-[#E2B49A] transition-colors"
            >
              <span className="flex items-center gap-2">
                <Eye className="w-3.5 h-3.5" />
                <span>Ⅱ · 旧日支配者</span>
              </span>
              {eldritchMenuOpen ? (
                <ChevronDown className="w-3.5 h-3.5 text-[#C86D5B]" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-[#8E8474]" />
              )}
            </button>

            {eldritchMenuOpen && (
              <div className="space-y-1.5 pl-2 border-l border-[#8C3B32]/40">
                {/* 通用铁律 */}
                <button
                  type="button"
                  onClick={() => navigateTo('eldritch-general')}
                  className={`w-full text-left py-2 px-3 text-xs tracking-wider transition-all flex items-center justify-between ${
                    activeTab === 'eldritch-general'
                      ? 'text-[#E2B49A] bg-gradient-to-r from-[#8C3B32]/30 to-transparent border-l-2 border-[#C86D5B] -ml-[1px] font-semibold'
                      : 'text-[#8E8474] hover:text-[#D8D0C1]'
                  }`}
                >
                  <span>通用铁律与层次分野</span>
                </button>

                {/* 可折叠子项 01：恩格萨（内含湖床本体、六大象征簇、六大专属赐福） */}
                <div className="pt-1">
                  <div className="flex items-center justify-between border-b border-[#8C3B32]/25">
                    <button
                      type="button"
                      onClick={() => {
                        setOpenOldOnes((p) => ({ ...p, engsa: true }));
                        navigateTo('eldritch-engsa');
                      }}
                      className={`flex-1 text-left py-2 px-3 text-xs tracking-wider transition-all flex items-center gap-2 ${
                        activeTab === 'eldritch-engsa'
                          ? 'text-[#E2B49A] font-semibold'
                          : 'text-[#D8D0C1]/85 hover:text-[#E2B49A]'
                      }`}
                    >
                      <span className="font-cinzel text-[10px] text-[#C86D5B]">01</span>
                      <span>恩格萨 · 湖床沉睡者</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleOldOne('engsa')}
                      className="p-1.5 text-[#8E8474] hover:text-[#E2B49A]"
                    >
                      {openOldOnes.engsa ? (
                        <ChevronDown className="w-3.5 h-3.5 text-[#C86D5B]" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {openOldOnes.engsa && (
                    <div className="mt-1 ml-3 pl-2.5 border-l border-[#8C3B32]/30 space-y-1">
                      <button
                        type="button"
                        onClick={() => navigateTo('eldritch-engsa', 'engsa-entity-anchor')}
                        className="w-full text-left py-1.5 px-2 text-[11px] text-[#8E8474] hover:text-[#E2B49A] transition-colors flex items-center gap-2"
                      >
                        <span>◈ 本体、漏记与象征</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => navigateTo('eldritch-engsa', 'engsa-blessings-anchor')}
                        className="w-full text-left py-1.5 px-2 text-[11px] text-[#E5C88F] hover:text-[#F2ECE1] transition-colors flex items-center gap-2"
                      >
                        <Sparkles className="w-3 h-3 text-[#B8965A] shrink-0" />
                        <span>恩格萨之赐福</span>
                      </button>
                    </div>
                  )}
                </div>


                <div className="pt-1">
                  <div className="flex items-center justify-between border-b border-[#8C3B32]/25">
                    <button type="button" onClick={() => { setOpenOldOnes((p) => ({ ...p, cthulhu: true })); navigateTo('eldritch-cthulhu'); }} className={`flex-1 text-left py-2 px-3 text-xs tracking-wider transition-all flex items-center gap-2 ${activeTab === 'eldritch-cthulhu' ? 'text-[#E2B49A] font-semibold' : 'text-[#D8D0C1]/85 hover:text-[#E2B49A]'}`}><span className="font-cinzel text-[10px] text-[#C86D5B]">02</span><span>克苏鲁 · 沉海沉睡者</span></button>
                    <button type="button" onClick={() => toggleOldOne('cthulhu')} className="p-1.5 text-[#8E8474] hover:text-[#E2B49A]">{openOldOnes.cthulhu ? <ChevronDown className="w-3.5 h-3.5 text-[#C86D5B]" /> : <ChevronRight className="w-3.5 h-3.5" />}</button>
                  </div>
                  {openOldOnes.cthulhu && (<div className="mt-1 ml-3 pl-2.5 border-l border-[#8C3B32]/30 space-y-1">
                    <button type="button" onClick={() => navigateTo('eldritch-cthulhu', 'cthulhu-entity-anchor')} className="w-full text-left py-1.5 px-2 text-[11px] text-[#8E8474] hover:text-[#E2B49A]">◈ 本体、沉睡与象征</button>
                    <button type="button" onClick={() => navigateTo('eldritch-cthulhu', 'cthulhu-blessings-anchor')} className="w-full text-left py-1.5 px-2 text-[11px] text-[#E5C88F] hover:text-[#F2ECE1]">✦ 克苏鲁之赐福</button>
                  </div>)}
                </div>              </div>
            )}
          </div>

          {/* Ⅲ · 旧神（可折叠大栏目） */}
          <div className="mb-7">
            <button type="button" onClick={() => setOldGodMenuOpen(!oldGodMenuOpen)} className="w-full flex items-center justify-between text-[11px] font-cinzel tracking-[0.25em] text-[#B8965A] uppercase mb-2.5 py-1 hover:text-[#E5C88F] transition-colors"><span className="flex items-center gap-2"><Sparkles className="w-3.5 h-3.5" /><span>Ⅲ · 旧神</span></span>{oldGodMenuOpen ? <ChevronDown className="w-3.5 h-3.5 text-[#B8965A]" /> : <ChevronRight className="w-3.5 h-3.5 text-[#8E8474]" />}</button>
            {oldGodMenuOpen && (<div className="space-y-1.5 pl-2 border-l border-[#B8965A]/35"><div className="pt-1"><div className="flex items-center justify-between border-b border-[#B8965A]/25"><button type="button" onClick={() => { setOpenOldOnes((p) => ({ ...p, cthanid: true })); navigateTo('old-god-cthanid'); }} className={`flex-1 text-left py-2 px-3 text-xs tracking-wider transition-all flex items-center gap-2 ${activeTab === 'old-god-cthanid' ? 'text-[#E5C88F] font-semibold' : 'text-[#D8D0C1]/85 hover:text-[#E5C88F]'}`}><span className="font-cinzel text-[10px] text-[#B8965A]">01</span><span>克塔尼德 · 极夜沉睡者</span></button><button type="button" onClick={() => toggleOldOne('cthanid')} className="p-1.5 text-[#8E8474] hover:text-[#E5C88F]">{openOldOnes.cthanid ? <ChevronDown className="w-3.5 h-3.5 text-[#B8965A]" /> : <ChevronRight className="w-3.5 h-3.5" />}</button></div>{openOldOnes.cthanid && (<div className="mt-1 ml-3 pl-2.5 border-l border-[#B8965A]/30 space-y-1"><button type="button" onClick={() => navigateTo('old-god-cthanid', 'cthanid-entity-anchor')} className="w-full text-left py-1.5 px-2 text-[11px] text-[#8E8474] hover:text-[#E5C88F]">◈ 本体、极夜与象征</button><button type="button" onClick={() => navigateTo('old-god-cthanid', 'cthanid-blessings-anchor')} className="w-full text-left py-1.5 px-2 text-[11px] text-[#E5C88F] hover:text-[#F2ECE1]">✦ 旧神之赐福</button></div>)}</div></div>)}
          </div>

          {/* Ⅳ · 地区卷宗（可折叠手风琴） */}
          <div>
            <div className="flex items-center gap-2 text-[11px] font-cinzel tracking-[0.25em] text-[#B8965A] uppercase mb-2.5">
              <Compass className="w-3.5 h-3.5" />
              <span>Ⅳ · 地区卷宗</span>
            </div>

            <div className="mb-3">
              <button
                type="button"
                onClick={() => toggleRegion('serlan')}
                className="w-full flex items-center justify-between py-2 px-2 text-xs font-semibold tracking-widest text-[#E6DEC8] hover:text-[#B8965A] border-b border-[#B8965A]/20 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#B8965A]" />
                  <span>瑟兰行省 · SERLAN</span>
                </span>
                {openRegions.serlan ? (
                  <ChevronDown className="w-3.5 h-3.5 text-[#B8965A]" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-[#8E8474]" />
                )}
              </button>

              {openRegions.serlan && (
                <div className="mt-1.5 space-y-1 pl-3 border-l border-[#B8965A]/25">
                  {[
                    { id: 'serlan-chars', label: '人物', icon: Users },
                    { id: 'serlan-boss', label: '灾变领主 · BOSS', icon: Skull, highlight: true },
                    { id: 'serlan-beasts', label: '荒野异兽', icon: Feather },
                    { id: 'serlan-containments', label: '收容物', icon: Archive },
                    { id: 'serlan-geo', label: '地理、四圈与克朗', icon: Compass },
                    { id: 'serlan-customs', label: '府城六规与销名', icon: ScrollText },
                    { id: 'serlan-orgs', label: '留府、三司与不逝者', icon: Landmark },
                    { id: 'serlan-quests', label: '旅途纪事（主线/支线）', icon: Train }
                  ].map((sub) => {
                    const IconComp = sub.icon;
                    const isAct = activeTab === sub.id;
                    return (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => navigateTo(sub.id)}
                        className={`w-full text-left py-2 px-3 text-xs tracking-wider transition-all flex items-center gap-2.5 ${
                          isAct
                            ? 'text-[#E5C88F] bg-gradient-to-r from-[#B8965A]/20 to-transparent border-l-2 border-[#B8965A] -ml-[1px] font-semibold'
                            : sub.highlight
                            ? 'text-[#C86D5B] hover:text-[#E2B49A]'
                            : 'text-[#8E8474] hover:text-[#D8D0C1]'
                        }`}
                      >
                        <IconComp className="w-3.5 h-3.5 shrink-0 opacity-80" />
                        <span>{sub.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

          </div>
        
            <div className="mb-3"><button type="button" onClick={() => toggleRegion('zhaoyeyuan')} className="w-full flex items-center justify-between py-2 px-2 text-xs font-semibold tracking-widest text-[#E6DEC8] hover:text-[#B8965A] border-b border-[#B8965A]/20 transition-colors"><span className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-[#B8965A]" /><span>照夜原 · ZHAOYEYUAN</span></span>{openRegions.zhaoyeyuan ? <ChevronDown className="w-3.5 h-3.5 text-[#B8965A]" /> : <ChevronRight className="w-3.5 h-3.5 text-[#8E8474]" />}</button>{openRegions.zhaoyeyuan && (<div className="mt-1.5 space-y-1 pl-3 border-l border-[#B8965A]/25">{[{ id: 'zhaoyeyuan-overview', label: '地域总览', icon: Compass },{ id: 'zhaoyeyuan-cities', label: '四城', icon: MapPin },{ id: 'zhaoyeyuan-chars', label: '人物', icon: Users },{ id: 'zhaoyeyuan-beasts', label: '地区怪物', icon: Skull },
                    { id: 'zhaoyeyuan-eight-beasts', label: '八兽与秘境', icon: Feather },{ id: 'zhaoyeyuan-organizations', label: '玉衡会与四机构', icon: Landmark },{ id: 'zhaoyeyuan-customs', label: '习俗与常识圈', icon: ScrollText },{ id: 'zhaoyeyuan-containments-full', label: '照夜原收容物', icon: Archive },{ id: 'zhaoyeyuan-quests', label: '第二章剧情', icon: Train }].map((sub) => { const IconComp = sub.icon; const isAct = activeTab === sub.id; return (<button key={sub.id} type="button" onClick={() => navigateTo(sub.id)} className={`w-full text-left py-1.5 px-2 text-[11px] flex items-center gap-2 transition-colors ${isAct ? 'text-[#E5C88F] font-semibold' : 'text-[#8E8474] hover:text-[#D8D0C1]'}`}><IconComp className="w-3 h-3 shrink-0" /><span>{sub.label}</span></button>); })}</div>)}</div></aside>

        {/* ===================================================================
            右侧主画卷内容区
        =================================================================== */}
        <main className="flex-1 min-w-0 px-5 sm:px-10 lg:px-14 py-10">
          {/* -----------------------------------------------------------------
              1. 寰宇通则：灾变、常识圈与教团
          ----------------------------------------------------------------- */}
          {activeTab === 'world-law' && (
            <div className="max-w-4xl mx-auto space-y-12">
              <header className="border-b border-[#B8965A]/30 pb-8">
                <p className="font-cinzel text-xs tracking-[0.3em] text-[#B8965A] uppercase mb-2">
                  CODEX UNIVERSALIS · 01
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-[0.15em] text-[#F2ECE1] mb-4">
                  灾变、常识圈与教团成因
                </h2>
                <p className="font-fell italic text-base text-[#B8965A]/90 leading-relaxed">
                  “这不是灾后重建的世界。灾前没有超自然力量；灾变后，地底沉睡之物的影响与门外入侵混作同一场污染，渗进了每一口井、每一座停摆的钟与每一条被当成寻常的规矩里。”
                </p>
              </header>

              <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="torn-sheet p-7 border-l-2 border-[#B8965A]/60">
                  <h3 className="text-lg font-bold tracking-widest text-[#E5C88F] mb-3 flex items-center gap-2">
                    <span>✦</span> 两个源头，同一场污染
                  </h3>
                  <p className="text-sm text-[#D8D0C1]/90 leading-relaxed mb-3">
                    地底沉睡之物（旧日）的影响与外来入侵（外神）同时发生，共同造成同一场污染。两股源头混在同一场灾难里，产物分不开——无人能分清一句反常的“地方常识”究竟源自地底还是天外。
                  </p>
                  <p className="text-xs text-[#8E8474] leading-relaxed">
                    底层唯一约束：沉睡之物绝对不可被杀死。世界的走向可能是被吞没、改变距离与浓度、或是“末日变成了天气，人照常上班，只是每年多死一批人、多一条街不能去”。
                  </p>
                </div>

                <div className="torn-sheet p-7 border-l-2 border-[#5B7E96]/70">
                  <h3 className="text-lg font-bold tracking-widest text-[#8AB4CE] mb-3 flex items-center gap-2">
                    <span>✦</span> 常识圈与物理分裂
                  </h3>
                  <p className="text-sm text-[#D8D0C1]/90 leading-relaxed mb-3">
                    一片区域下方有存在沉睡，这片土地的人就共享一套改写后的「常识」。常识圈随污染分布，不以国界、城市或语言为界。同一个国家可横跨多个常识圈。
                  </p>
                  <p className="text-xs text-[#8E8474] leading-relaxed">
                    圈决定了什么手艺能做成、什么器械能运转。圈内人不觉古怪，跨圈旅行者往往在扣下扳机或点燃火绳失效的那一刻，才惊觉自己踩进了另一套常理之中。
                  </p>
                </div>
              </section>

              <OrnamentalDivider label="✦ CULT & FACTION GENESIS ✦" />

              <section className="space-y-6">
                <h3 className="text-2xl font-bold tracking-widest text-[#F2ECE1]">
                  旧日没有信徒，但人间有信仰
                </h3>
                <p className="text-sm text-[#D8D0C1]/90 leading-relaxed">
                  沉睡存在那一侧永远是空的：祂不知道有信徒这回事，不挑选、不回应、不交易、也不收割。你跪拜一生，在祂那边等于未曾发生。因果方向绝不能倒置——是<strong>「污染越重 → 日子越不对劲 → 越多人寻找解释 → 信徒越多」</strong>，而非信徒增多导致旧日复苏。
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  {[
                    {
                      title: '一、解释者（教团）',
                      sub: '主动追问并编造答案之人',
                      desc: '为了解释异常而主动接触象征（接触即受污染），有人因此显出赐福力量，便误以为“我们做对了、神接纳了我们”；不成者则被归咎为“心不诚、不够格”，由此形成无法被证伪的教义闭环。'
                    },
                    {
                      title: '二、老户',
                      sub: '世代居于此地的守规人',
                      desc: '血缘村落或世代定居的老街坊，把污染衍生的忌讳当成老祖宗留下的家训。一部分人隐约知道违反后的深层恐怖，一部分人绝口不提。'
                    },
                    {
                      title: '三、无知者',
                      sub: '占据绝大多数的寻常百姓',
                      desc: '每天照着规矩留炭、绕湖、说话拍桌，不理解含义也不追问缘由。在他们眼里，这只是再正常不过的本分日子。'
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="torn-sheet p-6 border-t border-[#B8965A]/30">
                      <p className="text-base font-bold text-[#E5C88F] mb-1">{item.title}</p>
                      <p className="text-xs font-fell italic text-[#8E8474] mb-3">{item.sub}</p>
                      <p className="text-xs text-[#D8D0C1]/85 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-4 pt-4">
                <h3 className="text-xl font-bold tracking-widest text-[#F2ECE1]">
                  围绕污染自然长出的四类人间势力
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      type: '【能测的】',
                      role: '有办法判断污染浓度与边界',
                      form: '自然长出：学术团体、秘密测绘机构、垄断知识的世家。向外界兜售判断。'
                    },
                    {
                      type: '【能减的】',
                      role: '有办法降低或延缓可缓解负担',
                      form: '自然长出：医疗、苦修与隔离组织（必然伴随强制手段）。向内对受染者下手。'
                    },
                    {
                      type: '【在加的】',
                      role: '主动加重污染接触以换取赐福',
                      form: '自然长出：邪教、献祭团体、以“有效的迷信”为业的祭司。向外拉人入局。'
                    },
                    {
                      type: '【靠它吃饭的】',
                      role: '跨圈常识差本身就是一门生意',
                      form: '自然长出：跨界贸易商队、荒野向导、代办销名与仪式的行会。两边都做买卖。'
                    }
                  ].map((f, i) => (
                    <div key={i} className="p-5 bg-[#14110E]/90 border-l-2 border-[#B8965A]/40">
                      <div className="flex items-baseline justify-between mb-1.5">
                        <span className="font-bold text-sm text-[#E5C88F]">{f.type}</span>
                        <span className="text-xs text-[#8E8474]">{f.role}</span>
                      </div>
                      <p className="text-xs text-[#D8D0C1]/80 leading-relaxed">{f.form}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* -----------------------------------------------------------------
              2. 寰宇通则：位阶序列与晋升铁律（六大赐福已挪至恩格萨卷宗内）
          ----------------------------------------------------------------- */}
          {activeTab === 'power-rank' && (
            <div className="max-w-5xl mx-auto space-y-12">
              <header className="border-b border-[#B8965A]/30 pb-8">
                <p className="font-cinzel text-xs tracking-[0.3em] text-[#B8965A] uppercase mb-2">
                  HIERARCHY OF EXISTENCE · 02
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-[0.15em] text-[#F2ECE1] mb-4">
                  存在位阶序列与跨阶铁律
                </h2>
                <p className="text-sm text-[#8E8474] leading-relaxed">
                  污染累积到一定程度后，地底沉睡存在的象征在受赐者身上体现为超自然力量，世人称之为「赐福」（不同的旧日支配者衍生出截然不同的赐福体系，瑟兰境内的六大赐福已归档于<strong>「Ⅱ · 旧日支配者 → 恩格萨」</strong>卷宗下）。
                </p>
              </header>

              {/* 九大位阶定性展示 */}
              <section className="space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h3 className="text-xl font-bold tracking-widest text-[#E5C88F] flex items-center gap-2">
                    <span>✦</span> 十一大存在位阶（按稳定介入冲突的规模划分）
                  </h3>
                </div>

                <div className="space-y-3">
                  {POW_TIERS.map((t, i) => {
                    const isHiddenTier = i >= 7;
                    return (
                      <div
                        key={t.rank}
                        className={`torn-sheet p-5 flex flex-col sm:flex-row sm:items-center gap-4 border-l-2 ${
                          isHiddenTier ? 'border-[#8C3B32]' : 'border-[#B8965A]/50'
                        }`}
                      >
                        <div className="sm:w-48 shrink-0">
                          <span className="font-cinzel text-[10px] tracking-[0.25em] text-[#8E8474] block">
                            {t.rank}
                          </span>
                          <span
                            className={`text-lg font-bold tracking-widest ${
                              isHiddenTier ? 'text-[#E2B49A]' : 'text-[#F2ECE1]'
                            }`}
                          >
                            {t.name}
                          </span>
                          <span className="block text-xs text-[#B8965A] mt-0.5">{t.scale}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#D8D0C1]/85 leading-relaxed flex-1">
                          {t.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>

              <OrnamentalDivider label="✦ SUPPRESSION & PROMOTION LAWS ✦" />

              {/* 等级差绝对压制与晋升本质 */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="torn-sheet p-7 border-t border-[#B8965A]/40">
                  <h4 className="text-lg font-bold text-[#E5C88F] mb-3">
                    ✦ 跨阶绝对压制铁律
                  </h4>
                  <p className="text-xs sm:text-sm text-[#D8D0C1]/90 leading-relaxed mb-3">
                    同级交锋取决于能力运用、经验、准备与现场环境；<strong>不同位阶之间存在绝对压制。</strong>人数围攻、暗中偷袭、火器装备、意志爆发或所谓“磨血”，均不可能让低阶越级击败高阶。
                  </p>
                  <p className="text-xs text-[#8E8474] leading-relaxed">
                    低阶面对高阶唯一能成立的是在特定条件下逃离、救人或交涉（这不算击败，也不保证成功）。高阶者不自动全知或具备无限反应，受伤也不自动降级。
                  </p>
                </div>

                <div className="torn-sheet p-7 border-t border-[#8C3B32]/50">
                  <h4 className="text-lg font-bold text-[#E2B49A] mb-3">
                    ✦ 晋升的本质：向污染源靠拢
                  </h4>
                  <p className="text-xs sm:text-sm text-[#D8D0C1]/90 leading-relaxed mb-3">
                    进阶的方向是：<strong>运用力量 → 自身成为象征的体现（旧日眷属／旧神眷属） → 自身成为新的污染源头（旧日支配者／旧神）</strong>，而非理解宇宙秘密或集齐某种徽章。
                  </p>
                  <p className="text-xs text-[#8E8474] leading-relaxed">
                    污染达到临界并不自动晋升；唯有在生死一线直面对应旧日的象征显现、扛过存在层面的撕裂与重塑方能晋升，失败则意味着肉体死亡、精神彻底崩溃或沦为无意识畸变物。
                  </p>
                </div>
              </section>
            </div>
          )}

          {/* -----------------------------------------------------------------
              3. 旧日支配者：通用铁律与层次分野
          ----------------------------------------------------------------- */}
          {activeTab === 'eldritch-general' && (
            <div className="max-w-4xl mx-auto space-y-12">
              <header className="border-b border-[#8C3B32]/50 pb-8">
                <p className="font-cinzel text-xs tracking-[0.3em] text-[#C86D5B] uppercase mb-2">
                  ELDRITCH ARCHIVES · GENERAL LAWS
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-[0.15em] text-[#F2ECE1] mb-4">
                  旧日支配者 · 通用铁律与层次分野
                </h2>
                <p className="text-sm text-[#D8D0C1]/85 leading-relaxed">
                  本卷宗为全知视角设定档案。在世界内部，没有任何角色知道「旧日支配者」与「旧日眷属」的名称、分类或存在——人们只会把异常归咎于老辈子传下的规矩、水土不服、天气压抑或说不清的忌讳。
                </p>
              </header>

              <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="torn-sheet p-7 border-t-2 border-[#B8965A]">
                  <span className="font-cinzel text-[10px] tracking-[0.25em] text-[#B8965A]">
                    LESSER EXISTENCE · KIN
                  </span>
                  <h3 className="text-xl font-bold text-[#F2ECE1] mt-1 mb-3">
                    旧日眷属（存在异化之个体）
                  </h3>
                  <p className="text-xs sm:text-sm text-[#D8D0C1]/90 leading-relaxed mb-4">
                    正在或已经越过人世间顶端（天倾）的存在。污染已深入其存在本身，不再只是主动发动能力。但<strong>旧日眷属仍然是一个“个体”</strong>：行动有具体对象、有方向，不自动获得不可杀死性质，在满足特定条件下仍可被打败、被杀死或被避开。
                  </p>
                  <p className="text-xs text-[#8E8474]">
                    ※ 现况备注：不逝者教首伊瑟琳正在不知情中向这一层次转化。
                  </p>
                </div>

                <div className="torn-sheet p-7 border-t-2 border-[#8C3B32]">
                  <span className="font-cinzel text-[10px] tracking-[0.25em] text-[#C86D5B]">
                    SUPREME SOURCE · GREAT OLD ONE
                  </span>
                  <h3 className="text-xl font-bold text-[#E2B49A] mt-1 mb-3">
                    旧日支配者（沉睡的污染之源）
                  </h3>
                  <p className="text-xs sm:text-sm text-[#D8D0C1]/90 leading-relaxed mb-4">
                    更高维度的存在层次，绝非眷属的简单强化版。祂自身就是笼罩一方的污染源头。<strong>祂不针对任何人，不挑选、不回应、不收割</strong>，也不因外界人类做了什么而改变自身存在的方式。祂更像一场永恒笼罩大地的反常天气。
                  </p>
                  <p className="text-xs text-[#C86D5B]">
                    ※ 结构铁律：每位旧日支配者皆由「本体位置、专属象征簇、专属赐福方向」三要素构成。
                  </p>
                </div>
              </section>

              <OrnamentalDivider label="✦ SEVEN ABSOLUTE COMMANDMENTS ✦" />

              <section className="space-y-4">
                <h3 className="text-xl font-bold tracking-widest text-[#F2ECE1] mb-4">
                  支配者七大共通性质
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      name: '一、不可知',
                      desc: '任何人都不真正理解祂的本质、目的与全貌。调查能查清人间的阴谋与历史，但永远查不清祂。'
                    },
                    {
                      name: '二、不可直视',
                      desc: '不存在可辨认的具象本体，没有性格、计划、情绪或偏好；祂在人世间只能以“后果”的形式存在。'
                    },
                    {
                      name: '三、不可名状',
                      desc: '世界中无人知晓其真名。任何档案、神谕、口诀或古籍都不是揭露真名的例外。'
                    },
                    {
                      name: '四、不可杀死',
                      desc: '不设本体战、弱点、封印流程或集齐神器的套路，永远不存在“打败祂世界就恢复正常”的结局。'
                    },
                    {
                      name: '五、不回应',
                      desc: '任何仪式、献祭、祈祷或念出特定词汇，都不可能换取祂的行动。某人自称与神立约，只证明他在自欺。'
                    },
                    {
                      name: '六、不逆转 & 七、不收回',
                      desc: '祂改变的是状态而非时间倒流；已扩散的污染绝不撤销，救人与修缮只能改变人间后果的范围。'
                    }
                  ].map((law, idx) => (
                    <div key={idx} className="torn-sheet p-5 border-l border-[#8C3B32]/60">
                      <h4 className="text-sm font-bold text-[#E2B49A] mb-1.5">{law.name}</h4>
                      <p className="text-xs text-[#D8D0C1]/85 leading-relaxed">{law.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* -----------------------------------------------------------------
              4. 旧日支配者 01：恩格萨（含本体、两处漏记、六大象征簇、以及恩格萨带来的六大赐福）
          ----------------------------------------------------------------- */}
          {activeTab === 'eldritch-engsa' && (
            <div className="max-w-5xl mx-auto space-y-12" id="engsa-entity-anchor">
              <header className="border-b border-[#8C3B32]/50 pb-8">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                  <p className="font-cinzel text-xs tracking-[0.3em] text-[#C86D5B] uppercase">
                    GREAT OLD ONE · 01 · ENGSA
                  </p>
                  <span className="px-2.5 py-0.5 text-xs bg-[#8C3B32]/25 border border-[#8C3B32]/60 text-[#E2B49A]">
                    瑟兰地区污染与六大赐福之源
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-[0.18em] text-[#F2ECE1] mb-4">
                  恩格萨 · 拒斥终结之滞留者
                </h2>
                <p className="font-fell italic text-base text-[#E2B49A]/90 leading-relaxed">
                  “祂不保存记忆，只保存状态。世界往前走，祂往回攒。‘旧日复苏’这个词与实际恰恰相反——祂从不复苏，祂只是不许任何东西结束。”
                </p>
              </header>

              {/* 本体与选址 */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="torn-sheet p-7 border-l-2 border-[#8C3B32]">
                  <h3 className="text-lg font-bold text-[#E2B49A] mb-3">
                    ✦ 存在方式：只保存「未结束的状态」
                  </h3>
                  <p className="text-xs sm:text-sm text-[#D8D0C1]/90 leading-relaxed">
                    任何已经消失或结束的东西，在恩格萨那里都还在继续进行：<strong>熄灭的火还在祂那里烧，干涸的水还在祂那里流，拆掉的墙还在别处挡着路，说完的话还在屋里响。</strong>祂不判断、不挑选、不区分，只是单纯地不放手。
                  </p>
                </div>

                <div className="torn-sheet p-7 border-l-2 border-[#B8965A]">
                  <h3 className="text-lg font-bold text-[#E5C88F] mb-3">
                    ✦ 沉睡位置：府城籍司档案库正下方
                  </h3>
                  <p className="text-xs sm:text-sm text-[#D8D0C1]/90 leading-relaxed">
                    位于瑟兰府城籍司档案库下方的一片干涸湖床上。当年选址的理由普通至极：<strong>只有那块地够平、够干，压得住成山的重档。</strong>批地的人签了字，抄册的人抄进了册，从头到尾没有一个人知道地底下睡着什么。
                  </p>
                </div>
              </section>

              {/* 世界内仅存的两处痕迹 */}
              <section className="torn-sheet p-8 border border-[#B8965A]/30">
                <h3 className="text-lg font-bold tracking-widest text-[#E5C88F] mb-4">
                  ✦ 世界内仅存的两处痕迹（皆非记载，而是“漏记”）
                </h3>
                <p className="text-xs text-[#8E8474] mb-5">
                  全国没有任何一份秘密文献记载过恩格萨。祂真正的痕迹是「所有人都没注意到自己漏了什么」：
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 bg-[#0B0A09]/80 border-l-2 border-[#5B7E96]">
                    <p className="text-sm font-bold text-[#8AB4CE] mb-2">
                      痕迹一：档案库地基记录里的套话
                    </p>
                    <p className="text-xs text-[#D8D0C1]/85 leading-relaxed">
                      籍司地基记录里只有一句<strong>「该地块不返潮」</strong>。没有理由，没有出处，从第一份文件抄到最后一份。府城阴雨连绵到处返潮，唯独那块地永远干燥，却无人细想原因。
                    </p>
                  </div>
                  <div className="p-5 bg-[#0B0A09]/80 border-l-2 border-[#C86D5B]">
                    <p className="text-sm font-bold text-[#E2B49A] mb-2">
                      痕迹二：三代测绘员共同漏画的空白
                    </p>
                    <p className="text-xs text-[#D8D0C1]/85 leading-relaxed">
                      留府测绘署保管的《府城全图》上，旧湖床那一块是空的。<strong>不是被涂掉或保密抹除，而是漏画。</strong>整整三代测绘员都漏掉了同一个地方，且没有一个人发现自己漏了。
                    </p>
                  </div>
                </div>
              </section>

              {/* 六大象征簇 */}
              <section className="space-y-4">
                <h3 className="text-xl font-bold tracking-widest text-[#F2ECE1]">
                  ✦ 恩格萨的六样具体象征簇
                </h3>
                <p className="text-xs text-[#8E8474] leading-relaxed">
                  “已经结束的事没有真正结束”在人间落成了六样彼此独立的具体事物。府城百姓即使同时遵守其中几条，也绝不会觉得它们同源：
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                  {[
                    {
                      sym: '01 · 没烧完的炭',
                      meaning: '火的结束没有结束',
                      custom: '落地习俗：灶膛留炭（蓝火冻死）',
                      blessing: '衍生赐福：余烬'
                    },
                    {
                      sym: '02 · 干掉的湖床',
                      meaning: '水的离开没有离开',
                      custom: '落地习俗：旧湖绕行（井水夺忆）',
                      blessing: '衍生赐福：沉渊'
                    },
                    {
                      sym: '03 · 停在某一点的钟',
                      meaning: '时间的走没有走完',
                      custom: '落地习俗：停钟不修（永困次日）',
                      blessing: '衍生赐福：留刻'
                    },
                    {
                      sym: '04 · 冲不掉的脚印',
                      meaning: '人的经过没有过去',
                      custom: '落地习俗：脚印不扫（寸步难离）',
                      blessing: '衍生赐福：留迹'
                    },
                    {
                      sym: '05 · 屋子里的余音',
                      meaning: '话的说完没有说完',
                      custom: '落地习俗：说完拍桌（脱口成谶）',
                      blessing: '衍生赐福：余响'
                    },
                    {
                      sym: '06 · 沉在柜底忘了的东西',
                      meaning: '东西的消失没有消失',
                      custom: '落地习俗：柜底不开（未来遗物）',
                      blessing: '衍生赐福：遗存'
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="torn-sheet p-5 border-t border-[#8C3B32]/50">
                      <p className="text-sm font-bold text-[#E2B49A] mb-1">{item.sym}</p>
                      <p className="text-xs font-fell italic text-[#B8965A] mb-3">{item.meaning}</p>
                      <p className="text-xs text-[#D8D0C1]/85 mb-1">{item.custom}</p>
                      <p className="text-xs text-[#8AB4CE] font-semibold">{item.blessing}</p>
                    </div>
                  ))}
                </div>
              </section>

              <OrnamentalDivider label="✦ THE SIX BLESSINGS OF ENGSA ✦" />

              {/* 恩格萨带来的六大赐福（完整归入恩格萨栏目下） */}
              <section id="engsa-blessings-anchor" className="space-y-6 pt-2">
                <div className="border-l-2 border-[#B8965A] pl-4">
                  <p className="font-cinzel text-xs tracking-[0.25em] text-[#B8965A] uppercase">
                    BLESSINGS BESTOWED BY ENGSA&apos;S POLLUTION
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-widest text-[#F2ECE1] mt-1">
                    恩格萨带来的六大赐福及其必然代价
                  </h3>
                  <p className="text-xs sm:text-sm text-[#8E8474] mt-2 leading-relaxed">
                    当受染者体内累积的污染突破阈值，恩格萨的六样象征便在受赐者身上体现为以下六种超自然权能。受赐者能主动运用力量，却不知力量源于湖床之下的恩格萨；每一次发动，恩格萨“不许结束”的性质便在受赐者躯体上加深一分。
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                  {ENGSA_BLESSINGS.map((b) => {
                    const IconComp = b.icon;
                    return (
                      <div
                        key={b.id}
                        className="torn-sheet p-7 flex flex-col justify-between border-t-2 border-[#8C3B32]/60"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <div>
                              <span className="font-cinzel text-[10px] tracking-[0.2em] text-[#C86D5B] block">
                                {b.en}
                              </span>
                              <h4 className="text-2xl font-bold tracking-widest text-[#F2ECE1] mt-0.5">
                                赐福 · {b.name}
                              </h4>
                              <p className="text-xs text-[#E5C88F] mt-1">{b.subtitle}</p>
                            </div>
                            <div className="w-10 h-10 border border-[#8C3B32]/50 bg-[#8C3B32]/10 flex items-center justify-center text-[#E2B49A] shrink-0">
                              <IconComp className="w-5 h-5" />
                            </div>
                          </div>

                          <p className="text-[11px] font-fell italic text-[#B8965A] mb-4 pb-2 border-b border-[#B8965A]/15">
                            {b.originSymbol}
                          </p>

                          <div className="space-y-3 text-xs leading-relaxed">
                            <div>
                              <span className="text-[#B8965A] font-semibold block mb-1">
                                ◈ 权能表现：
                              </span>
                              <p className="text-[#D8D0C1]/90">{b.ability}</p>
                            </div>
                            <div>
                              <span className="text-[#8AB4CE] font-semibold block mb-1">
                                ◈ 污染加深后的高阶规模：
                              </span>
                              <p className="text-[#D8D0C1]/85">{b.scale}</p>
                            </div>
                            <div className="p-3.5 bg-[#8C3B32]/15 border-l-2 border-[#8C3B32]">
                              <span className="text-[#E2B49A] font-semibold block mb-1">
                                ◈ 恩格萨滞留于身的必然代价：
                              </span>
                              <p className="text-[#D8D0C1]/90">{b.cost}</p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-5 pt-3 border-t border-[#B8965A]/15 flex items-center justify-between text-xs text-[#8E8474]">
                          <span>瑟兰已知受赐者：</span>
                          <div className="flex flex-wrap gap-1.5">
                            {b.holders.map((h) => (
                              <span
                                key={h}
                                className="px-2 py-0.5 bg-[#1B1714] text-[#E5C88F] border border-[#B8965A]/25"
                              >
                                {h}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>
          )}

{/* -----------------------------------------------------------------
              5. 瑟兰行省：人物
          ----------------------------------------------------------------- */}
          
          {/* 旧日支配者 02：克苏鲁 */}
          {activeTab === 'eldritch-cthulhu' && (
            <div className="max-w-5xl mx-auto space-y-12" id="cthulhu-entity-anchor">
              <header className="border-b border-[#8C3B32]/50 pb-8">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                  <p className="font-cinzel text-xs tracking-[0.3em] text-[#C86D5B] uppercase">GREAT OLD ONE · 02 · CTHULHU</p>
                  <span className="px-2.5 py-0.5 text-xs bg-[#8C3B32]/25 border border-[#8C3B32]/60 text-[#E2B49A]">照夜原沉海污染与七项旧日赐福之源</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-[0.18em] text-[#F2ECE1] mb-4">克苏鲁 · 沉海沉睡者</h2>
                <p className="font-fell italic text-base text-[#E2B49A]/90 leading-relaxed">“祂在沉海之下沉睡。潮声不是祂醒来的征兆，只是沉睡本身溢出了海面。”</p>
              </header>
              <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="torn-sheet p-7 border-l-2 border-[#8C3B32]"><h3 className="text-lg font-bold text-[#E2B49A] mb-3">✦ 存在方式：沉睡的深海源头</h3><p className="text-xs sm:text-sm text-[#D8D0C1]/90 leading-relaxed">克苏鲁沉睡在照夜原国境正中的内海「沉海」之下。祂不回应祈祷，不主动出面，也不因群星归位而推进苏醒。照夜原深井、海螺与空坛里夜夜响起的潮声，是祂沉睡中的力量外泄，不是祂本人在说话。</p></div>
                <div className="torn-sheet p-7 border-l-2 border-[#B8965A]"><h3 className="text-lg font-bold text-[#E5C88F] mb-3">✦ 世界内认知：极少数人知道</h3><p className="text-xs sm:text-sm text-[#D8D0C1]/90 leading-relaxed">照夜原绝大多数人不知道克苏鲁存在，也不知道「旧日支配者」这个名称。唯一明确知道的是里层沉海教团：他们照原典知道克苏鲁的真名与祷词，也知道「旧日支配者」与「旧日眷属」。公开的海神会与里层教团不是同一层。</p></div>
              </section>
              <section className="torn-sheet p-8 border border-[#B8965A]/30"><h3 className="text-lg font-bold tracking-widest text-[#E5C88F] mb-4">✦ 与原典的关系</h3><p className="text-xs sm:text-sm text-[#D8D0C1]/90 leading-relaxed">克苏鲁照洛夫克拉夫特原典设定：沉睡于深海、以梦与潮声影响人间、不可被杀。本卡只规定祂沉睡在照夜原的沉海之下，并把七项旧日赐福归到祂的象征簇；不新增原典之外的权能，不把祂写成会回应教团祈祷的许愿神，也不推进群星归位。</p></section>
              <section id="cthulhu-blessings-anchor" className="space-y-4"><h3 className="text-xl font-bold tracking-widest text-[#F2ECE1]">✦ 克苏鲁的七样象征簇与七项赐福</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">{[['潮渍','旧潮','手抹过墙、地、器物或人，浮起海水浸过的痕迹；痕迹以下像在海底泡多年。'],['涉梦','沁衣','旧衣、亡人衣或在沉海边洗过的衣裳，贴身总带一股去不掉的凉意。'],['溺梦','盐','清晨枕上结一层细盐；睡意会越来越沉。'],['雾失楼台','伏雾','拂晓井口生咸雾，不往上飘，贴地往低处流。'],['渊阶','地下之下','年代久的地窖、地宫、矿井往下总比修建时深。'],['借亡者之目','目不瞑','死者的眼睛合不上，总望着最近的水。'],['海潮音','千里外的潮声','离海很远的人家也能从海螺、空罐或井口听见潮声。']].map(([name,sym,text]) => (<div key={name} className="p-5 bg-[#0B0A09]/80 border-l-2 border-[#8C3B32]/60"><p className="text-sm font-bold text-[#E2B49A] mb-1">{name} · {sym}</p><p className="text-xs text-[#D8D0C1]/85 leading-relaxed">{text}</p></div>))}</div>
                <p className="text-xs text-[#8E8474] leading-relaxed">七项赐福都来自污染显现，不是克苏鲁赠予。旧日一侧发动有代价；使用越多，污染越深。具体代价见各赐福条目，不用数值战力替代叙事。</p>
              </section>
            </div>
          )}

          {/* 旧神 01：克塔尼德 */}
          {activeTab === 'old-god-cthanid' && (
            <div className="max-w-5xl mx-auto space-y-12" id="cthanid-entity-anchor">
              <header className="border-b border-[#B8965A]/40 pb-8">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                  <p className="font-cinzel text-xs tracking-[0.3em] text-[#B8965A] uppercase">OLD GOD · 01 · CTHANID</p>
                  <span className="px-2.5 py-0.5 text-xs bg-[#B8965A]/15 border border-[#B8965A]/50 text-[#E5C88F]">照夜原北天极夜青光与四项旧神赐福之源</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-[0.18em] text-[#F2ECE1] mb-4">克塔尼德 · 极夜沉睡者</h2>
                <p className="font-fell italic text-base text-[#E5C88F]/90 leading-relaxed">“祂不回应，也不睁眼。北天的青光只是沉睡中的旧神投下的一层微光。”</p>
              </header>
              <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="torn-sheet p-7 border-l-2 border-[#B8965A]"><h3 className="text-lg font-bold text-[#E5C88F] mb-3">✦ 存在方式：沉睡的旧神一侧源头</h3><p className="text-xs sm:text-sm text-[#D8D0C1]/90 leading-relaxed">克塔尼德本卡规定也在沉睡，不出面、不回应、不能被召来。北天极夜的青光与照夜原四项旧神赐福来自祂一侧，但青光不是祂醒来的倒计时。旧神一侧与旧日一侧同层平级；旧神自身与旧日支配者同层。</p></div>
                <div className="torn-sheet p-7 border-l-2 border-[#B8965A]"><h3 className="text-lg font-bold text-[#E5C88F] mb-3">✦ 世界内认知：绝大多数人不知道</h3><p className="text-xs sm:text-sm text-[#D8D0C1]/90 leading-relaxed">照夜原绝大多数人不知道旧神、旧神眷属和克塔尼德。旧神一侧的受赐者发动没有代价、同阶更强，但更容易被旧日一侧无意识地察觉与追杀；世界内的人只会觉得双方「不对劲」，不知道原因。</p></div>
              </section>
              <section className="torn-sheet p-8 border border-[#B8965A]/30"><h3 className="text-lg font-bold tracking-widest text-[#E5C88F] mb-4">✦ 与原典和本卡的关系</h3><p className="text-xs sm:text-sm text-[#D8D0C1]/90 leading-relaxed">克塔尼德照原典属于旧神一侧。本卡只规定祂在照夜原沉睡、与北天极夜青光相关，并把四项旧神赐福归到祂的象征簇；不把祂写成会回应的祷词对象，不新增召来方法，也不把群星归位写成倒计时。</p></section>
              <section id="cthanid-blessings-anchor" className="space-y-4"><h3 className="text-xl font-bold tracking-widest text-[#F2ECE1]">✦ 旧神一侧的四项赐福</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-5">{[['招魂','把被梦与异常拉走的人叫回来，必须叫出对方全名。'],['烛照','看穿迷雾、梦境深浅与异常留下的痕迹。'],['夜未央','让一盏灯整夜不灭，守住一片夜里的安全范围。'],['晞','让潮气、湿冷与部分潮伤慢慢变干。']].map(([name,text]) => (<div key={name} className="p-5 bg-[#0B0A09]/80 border-l-2 border-[#B8965A]/60"><p className="text-sm font-bold text-[#E5C88F] mb-1">{name}</p><p className="text-xs text-[#D8D0C1]/85 leading-relaxed">{text}</p></div>))}</div><p className="text-xs text-[#8E8474] leading-relaxed">旧神一侧赐福发动没有代价，不涨污染；这不等于旧神本人会回应，也不等于受赐者免于被旧日一侧察觉。</p></section>
            </div>
          )}




          {activeTab === 'zhaoyeyuan-eight-beasts' && (
            <div className="max-w-6xl mx-auto space-y-10">
              <header className="border-b border-[#B8965A]/30 pb-6"><p className="font-cinzel text-xs tracking-[0.3em] text-[#B8965A] uppercase mb-2">EIGHT BEASTS & SECRET REALMS</p><h2 className="text-3xl font-bold tracking-[0.15em] text-[#F2ECE1]">照夜原八兽与秘境</h2><p className="text-xs text-[#8E8474] mt-2">作者层资料。八兽真实存在但四城普通人不知道，正文不据此让NPC知情。</p></header>
              <section className="grid grid-cols-1 md:grid-cols-2 gap-5">{[['青龙','东方 · 四圣','云海石脊「浮岚苍脊」；知性御姐，春雨、云雷与复苏。'],['朱雀','南方 · 四圣','高空赤金圣殿「赤霄不夜长阶」；明艳少女，飞行、火焰与迅速进攻。'],['白虎','西方 · 四圣','白石幽谷「白石敛锋处」；年轻妈妈型，风与切割。'],['玄武','北方 · 四圣','不冻深海「不冻溟」；萝莉妈妈，守护与水流。'],['饕餮','东方 · 四凶','巨型石殿「归墟殿」；萝莉，吞噬与容纳。'],['混沌','南方 · 四凶','错乱天地「咫尺重山」；萝莉，无面、六足与空间。'],['梼杌','西方 · 四凶','地下古林「千根托岳之渊」；强势熟女，顽强与正面冲击。'],['穷奇','北方 · 四凶','悬空石梁「朔风逆上断鸿梁」；狡黠御姐，飞行与追猎。']].map(([name,side,text]) => (<div key={name} className="torn-sheet p-6 border-l-2 border-[#B8965A]"><h3 className="text-xl font-bold text-[#F2ECE1]">{name}</h3><p className="text-xs text-[#B8965A] mt-1">{side}</p><p className="text-xs text-[#D8D0C1]/90 mt-3 leading-relaxed">{text}</p></div>))}</section>
              <section className="torn-sheet p-7 border border-[#B8965A]/30"><h3 className="text-lg font-bold text-[#E5C88F] mb-3">✦ 借力与信物</h3><p className="text-sm text-[#D8D0C1]/90 leading-relaxed">八兽认可后可借力，每次只能借一位，借用时完整动用其五项能力，规模按玩家当前位阶提升一个大位阶结算；结束有对应疲惫或反噬。四圣信物分别为：一截带雨的青枝（青龙／兰墨灵）、心羽（朱雀／潮）、白玉梳（白虎／慕容清）、沉水甲片（玄武／东方暮云）。</p></section>
            </div>
          )}
          {activeTab === 'zhaoyeyuan-containments-full' && (
            <div className="max-w-6xl mx-auto space-y-10"><header className="border-b border-[#B8965A]/30 pb-6"><p className="font-cinzel text-xs tracking-[0.3em] text-[#B8965A] uppercase mb-2">TSQ-101 — TSQ-114</p><h2 className="text-3xl font-bold tracking-[0.15em] text-[#F2ECE1]">照夜原收容物</h2><p className="text-xs text-[#8E8474] mt-2">正式题名保留；完整档案沿用世界书与现有数据，正文不重复整篇。</p></header><section className="grid grid-cols-1 md:grid-cols-2 gap-4">{[['TSQ-101','嫁接提灯之鹿'],['TSQ-102','伪昼日晷'],['TSQ-103','苍白海市'],['TSQ-104','渗夜织机'],['TSQ-105','失落之影'],['TSQ-106','不眠之月的露水'],['TSQ-107','紫月暗涌'],['TSQ-108','玄武岩管风琴'],['TSQ-109','熄蕊之蛾'],['TSQ-110','倒悬断垣'],['TSQ-111','泽畔新娘的雾纱'],['TSQ-112','盲眼测绘师'],['TSQ-113','沉星碎屑'],['TSQ-114','地脉摇篮曲']].map(([id,name]) => (<div key={id} className="torn-sheet p-5 border-l-2 border-[#B8965A]"><p className="font-cinzel text-xs text-[#B8965A]">{id}</p><h3 className="text-lg font-bold text-[#F2ECE1] mt-1">{name}</h3></div>))}</section></div>
          )}

          {activeTab === 'zhaoyeyuan-beasts' && (
            <div className="max-w-6xl mx-auto space-y-10">
              <header className="border-b border-[#B8965A]/30 pb-6">
                <p className="font-cinzel text-xs tracking-[0.3em] text-[#B8965A] uppercase mb-2">ZHAOYEYUAN FRONTIER BESTIARY</p>
                <h2 className="text-3xl font-bold tracking-[0.15em] text-[#F2ECE1]">照夜原地区怪物</h2>
                <p className="text-xs sm:text-sm text-[#8E8474] mt-2 leading-relaxed">照夜原四城与荒野中会被普通人遭遇的异常生物。按栖地与位阶整理；八兽与秘境是另一层作者资料，不列入普通怪物图鉴。</p>
              </header>
              <section className="space-y-4">
                <h3 className="text-xl font-bold tracking-widest text-[#E5C88F]">✦ 落星北境 · 冰雪与旧牧道</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    ['拟亲雪蛭','离常','旧牧道雪层下；伪装成白色路桩，靠亲属记忆与体温引诱猎物。切开雪层、焚毁地底主根可断其群。'],
                    ['冻髓黑喉','离常','冰封山口裂谷深处；远距离抽走热量与声音，使被困者逐渐听不见彼此。'],
                    ['织雪褪骨之帷','陆沉至天倾','北境特大灾变级巨物；所过之处牧场与暖屋只余冻硬的空衣壳。']
                  ].map(([n,tier,text]) => (<div key={n} className="torn-sheet p-6 border-l-2 border-[#B8965A]"><h4 className="text-lg font-bold text-[#F2ECE1]">{n}</h4><p className="text-xs text-[#B8965A] mt-1">位阶：{tier}</p><p className="text-xs text-[#D8D0C1]/90 mt-3 leading-relaxed">{text}</p></div>))}
                </div>
              </section>
              <section className="space-y-4">
                <h3 className="text-xl font-bold tracking-widest text-[#E5C88F]">✦ 枕霞山雾 · 梯田与旧纸坊</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    ['孵梦灰囊','异兆','伏雾山道与旧屋墙角；借湿气孵化梦境，把长梦人拖往城外水道。剖开肉质核心可止。'],
                    ['伏雾中的错向者','离常','梯田低处与竹廊涵洞；会利用贴地下沉的伏雾让人认错方向。']
                  ].map(([n,tier,text]) => (<div key={n} className="torn-sheet p-6 border-l-2 border-[#B8965A]"><h4 className="text-lg font-bold text-[#F2ECE1]">{n}</h4><p className="text-xs text-[#B8965A] mt-1">位阶：{tier}</p><p className="text-xs text-[#D8D0C1]/90 mt-3 leading-relaxed">{text}</p></div>))}
                </div>
              </section>
              <section className="space-y-4">
                <h3 className="text-xl font-bold tracking-widest text-[#E5C88F]">✦ 照水湖区 · 水巷与沉船</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    ['镜背水影','离常','照水湖群与旧水巷；只在水面倒影里移动，直接看水会认错岸线。'],
                    ['莲湖沉船里的旧客','灾临','沉船暗舱；借旧船员的记忆与名字牵引活人。']
                  ].map(([n,tier,text]) => (<div key={n} className="torn-sheet p-6 border-l-2 border-[#B8965A]"><h4 className="text-lg font-bold text-[#F2ECE1]">{n}</h4><p className="text-xs text-[#B8965A] mt-1">位阶：{tier}</p><p className="text-xs text-[#D8D0C1]/90 mt-3 leading-relaxed">{text}</p></div>))}
                </div>
              </section>
              <section className="space-y-4">
                <h3 className="text-xl font-bold tracking-widest text-[#E5C88F]">✦ 听潮港与沉海沿岸</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    ['负盐多足脊','灾临','听潮与照水交界废弃盐场；外层盐壳极硬，需引淡开闸削脆。'],
                    ['无影呼名之塔','旧日眷属','沉海教团引来的眷属级巨物；借名字与梦牵引人，水下脐带是弱点。'],
                    ['千门同胃','旧日眷属','沿岸旧城区；以多道门与吞食空间困人，母门被毁才会崩解。']
                  ].map(([n,tier,text]) => (<div key={n} className="torn-sheet p-6 border-l-2 border-[#B8965A]"><h4 className="text-lg font-bold text-[#F2ECE1]">{n}</h4><p className="text-xs text-[#B8965A] mt-1">位阶：{tier}</p><p className="text-xs text-[#D8D0C1]/90 mt-3 leading-relaxed">{text}</p></div>))}
                </div>
              </section>
            </div>
          )}

          {/* Ⅳ · 照夜原：总览 */}
          {activeTab === 'zhaoyeyuan-overview' && (<div className="max-w-5xl mx-auto space-y-10"><header className="border-b border-[#B8965A]/30 pb-6"><p className="font-cinzel text-xs tracking-[0.3em] text-[#B8965A] uppercase mb-2">ZHAOYEYUAN · THE LAND UNDER SILENT STARS</p><h2 className="text-3xl font-bold tracking-[0.15em] text-[#F2ECE1]">照夜原 · 四城与沉海</h2><p className="text-xs sm:text-sm text-[#8E8474] mt-3 leading-relaxed">照夜原由枕霞、照水、听潮、落星四城环绕内海「沉海」并立。四城陆路绕海相连，水路严守「不过中线」；跨城前必须在换规馆学习目的地常识圈、换装整备。</p></header><section className="grid grid-cols-1 md:grid-cols-2 gap-6">{[['西 · 枕霞','怕躺倒，睡半坐斜榻；拂晓梯田有伏雾。城主慕容清。'],['东 · 照水','怕看水中倒影，湖上不喧哗，使用铜镜。城主兰墨灵。'],['南 · 听潮','怕安静，满城挂风铃，读不进书。城主潮。'],['北 · 落星','怕潮湿，不碰水、不存水，用融雪与奶。城主东方暮云。']].map(([title,text]) => (<div key={title} className="torn-sheet p-7 border-l-2 border-[#B8965A]"><h3 className="text-xl font-bold text-[#E5C88F] mb-2">{title}</h3><p className="text-sm text-[#D8D0C1]/90 leading-relaxed">{text}</p></div>))}</section><section className="torn-sheet p-8 border border-[#B8965A]/30"><h3 className="text-lg font-bold tracking-widest text-[#E5C88F] mb-3">✦ 最高协调机构</h3><p className="text-sm text-[#D8D0C1]/90 leading-relaxed">玉衡会驻共议阁，由四位城主与承熙院、流泉阁、照微台、止戈台四位总负责人组成八席。四城各有自己的常识圈与日常禁忌，不能把一城的规矩带到另一城。</p></section></div>)}
          {activeTab === 'zhaoyeyuan-cities' && (<div className="max-w-5xl mx-auto space-y-10"><header className="border-b border-[#B8965A]/30 pb-6"><p className="font-cinzel text-xs tracking-[0.3em] text-[#B8965A] uppercase mb-2">FOUR CITIES</p><h2 className="text-3xl font-bold tracking-[0.15em] text-[#F2ECE1]">照夜原四城</h2></header><section className="grid grid-cols-1 md:grid-cols-2 gap-6">{[['枕霞','西城，城主慕容清。怕躺倒，睡半坐斜榻；梯田伏雾与守梦会是日常。'],['照水','东城，城主兰墨灵。怕看水中倒影，湖上不喧哗，使用铜镜；流泉阁掌水运。'],['听潮','南城，城主潮。怕安静，满城挂风铃；海神会公开信仰与里层沉海教团并存。'],['落星','北城，城主东方暮云。怕潮湿，不碰水、不存水，用融雪与奶；承熙院分院负责户籍。']].map(([name,text]) => (<div key={name} className="torn-sheet p-7 border-l-2 border-[#B8965A]"><h3 className="text-xl font-bold text-[#E5C88F] mb-2">{name}城</h3><p className="text-sm text-[#D8D0C1]/90 leading-relaxed">{text}</p></div>))}</section></div>)}
          {activeTab === 'zhaoyeyuan-chars' && (<div className="max-w-5xl mx-auto space-y-10"><header className="border-b border-[#B8965A]/30 pb-6"><p className="font-cinzel text-xs tracking-[0.3em] text-[#B8965A] uppercase mb-2">ZHAOYEYUAN CHARACTERS</p><h2 className="text-3xl font-bold tracking-[0.15em] text-[#F2ECE1]">照夜原人物</h2></header><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{[['东方暮云','落星城主 · 旧神','纯冷、无表情、几乎不与人接触；完成其专属星旅后才显露另一面。'],['慕容清','枕霞城主 · 旧神眷属','温柔知性的守夜者，金瞳能看穿迷雾，守灯整夜不灭。'],['兰墨灵','照水城主 · 天倾','灵动爱玩，常被父母管束。'],['潮','听潮城主 · 旧日眷属','容易害羞，内里背负沉海教团圣女经历与七项赐福。'],['闻素','海神会祭船人 · 灾临','说话爽利，忌讳拿失联船队开玩笑。'],['裴知微','承熙院院正 · 陆沉','落星城户籍与文书负责人。']].map(([name,role,text]) => (<div key={name} className="torn-sheet p-5 border-l-2 border-[#B8965A]"><h3 className="text-xl font-bold text-[#F2ECE1]">{name}</h3><p className="text-xs text-[#B8965A] mt-1">{role}</p><p className="text-xs text-[#D8D0C1]/90 mt-3 leading-relaxed">{text}</p></div>))}</div></div>)}

          {activeTab === 'zhaoyeyuan-organizations' && (<div className="max-w-5xl mx-auto space-y-10"><header className="border-b border-[#B8965A]/30 pb-6"><p className="font-cinzel text-xs tracking-[0.3em] text-[#B8965A] uppercase mb-2">ORGANIZATIONS</p><h2 className="text-3xl font-bold tracking-[0.15em] text-[#F2ECE1]">玉衡会与四机构</h2></header><section className="space-y-4">{[['玉衡会','四城最高协调机构，驻地共议阁；四位城主与四位总负责人共八席。'],['承熙院','户籍、记录与文书。'],['流泉阁','水运与账册。'],['照微台','查案与异常记录。'],['止戈台','武力与治安。'],['海神会','公开民间信仰组织；里层藏有知道克苏鲁真名的沉海教团。'],['换规馆','跨城前学习目的地规矩、换装整备。']].map(([name,text]) => (<div key={name} className="torn-sheet p-5 border-l-2 border-[#B8965A]"><h3 className="text-lg font-bold text-[#E5C88F]">{name}</h3><p className="text-sm text-[#D8D0C1]/90 mt-2 leading-relaxed">{text}</p></div>))}</section></div>)}
          {activeTab === 'zhaoyeyuan-customs' && (<div className="max-w-5xl mx-auto space-y-10"><header className="border-b border-[#B8965A]/30 pb-6"><p className="font-cinzel text-xs tracking-[0.3em] text-[#B8965A] uppercase mb-2">CUSTOMS & COMMON SENSE</p><h2 className="text-3xl font-bold tracking-[0.15em] text-[#F2ECE1]">照夜原习俗与常识圈</h2></header><section className="grid grid-cols-1 md:grid-cols-2 gap-6">{[['枕霞 · 睡斜榻','不可白天平躺；夜里睡半坐斜榻。拂晓伏雾贴地下沉，不在低处久留。'],['照水 · 铜镜','不看水中倒影；湖上不喧哗。以铜镜代替直接看水。'],['听潮 · 续声','怕安静，满城挂风铃；守夜人、守梦人与旅人用全名把活人从潮声中叫回。'],['落星 · 忌湿','不碰水、不存水；日常用融雪与奶。进门先在门廊掸雪烘衣。']].map(([name,text]) => (<div key={name} className="torn-sheet p-6 border-l-2 border-[#B8965A]"><h3 className="text-lg font-bold text-[#E5C88F]">{name}</h3><p className="text-sm text-[#D8D0C1]/90 mt-2 leading-relaxed">{text}</p></div>))}</section></div>)}

          {activeTab === 'zhaoyeyuan-quests' && (<div className="max-w-5xl mx-auto space-y-10"><header className="border-b border-[#B8965A]/30 pb-6"><p className="font-cinzel text-xs tracking-[0.3em] text-[#B8965A] uppercase mb-2">CHAPTER II · AUTHOR ARCHIVE</p><h2 className="text-3xl font-bold tracking-[0.15em] text-[#F2ECE1]">第二章剧情档案</h2><p className="text-xs text-[#8E8474] mt-2">含剧透。此页是作者层资料，不代表当前聊天已经发生。</p></header><section className="space-y-4">{[['总纲','第二章《无舌铃中的潮声》，天启历104年3月下旬—106年10月，共12节。'],['第一节—第三节','迷雾抵达照夜原、落星办籍、南下枕霞，寻得西境与东境残卷。'],['第四节—第十节','八兽秘境与四圣信物，逐步完成八兽认可；第八节晋升灾临。'],['第十一节—第十二节','沉海教团决战与四城告别；第二章收束。'],['星旅','八位核心女性人物，各有一段独立星旅；东方暮云的性格转变只在完成其专属星旅后发生。'],['地方支线','四段扎根照夜原民俗、长梦人与收容物的地方支线。']].map(([name,text]) => (<div key={name} className="torn-sheet p-5 border-l-2 border-[#B8965A]"><h3 className="text-lg font-bold text-[#E5C88F]">{name}</h3><p className="text-sm text-[#D8D0C1]/90 mt-2 leading-relaxed">{text}</p></div>))}</section></div>)}

{activeTab === 'serlan-chars' && (
            <div className="space-y-8">
              <header className="border-b border-[#B8965A]/30 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <p className="font-cinzel text-xs tracking-[0.3em] text-[#B8965A] uppercase mb-2">
                    SERLAN ARCHIVES · DRAMATIS PERSONAE
                  </p>
                  <h2 className="text-3xl font-bold tracking-[0.15em] text-[#F2ECE1]">
                    人物
                  </h2>
                  <p className="text-xs text-[#8E8474] mt-2">
                    点击任意人物残卷卡片可展开完整档案；每张卡片与详情页均内置多图切换槽位（Ⅰ / Ⅱ / Ⅲ）。
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {['全部', '不逝者', '留府三司', '民间人士'].map((fac) => (
                    <button
                      key={fac}
                      type="button"
                      onClick={() => setCharFactionFilter(fac)}
                      className={`px-3.5 py-1.5 text-xs tracking-widest transition-all ${
                        charFactionFilter === fac
                          ? 'bg-[#B8965A]/25 text-[#E5C88F] border-b-2 border-[#B8965A] font-semibold'
                          : 'bg-[#14110E] text-[#8E8474] hover:text-[#D8D0C1]'
                      }`}
                    >
                      {fac}
                    </button>
                  ))}
                </div>
              </header>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 auto-rows-fr">
                {filteredCharacters.map((char, idx) => (
                  <div
                    key={char.id}
                    onClick={() => setSelectedEntity({ type: 'char', data: char })}
                    className="torn-sheet p-4 cursor-pointer group hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full"
                  >
                    <div>
                      <RelicImageArchitecture
                        imgs={char.imgs}
                        code={`CHAR-${String(idx + 1).padStart(2, '0')}`}
                        tier={char.tier}
                        aspectClass="aspect-[3/4]"
                        interactive={true}
                      />

                      <div className="mt-4 px-1">
                        <div className="flex items-baseline justify-between gap-2">
                          <h3 className="text-xl font-bold tracking-widest text-[#F2ECE1] group-hover:text-[#E5C88F] transition-colors">
                            {char.name}
                          </h3>
                          <span className="font-fell italic text-xs text-[#8E8474]">
                            {char.enName}
                          </span>
                        </div>
                        <p className="text-xs text-[#B8965A] mt-1 tracking-wider">{char.role}</p>

                        <div className="mt-3 h-[20px] overflow-hidden flex items-center">
                          {char.blessings.length > 0 ? (
                            <p
                              className="text-[11px] text-[#D8D0C1] truncate w-full leading-none"
                              title={char.blessings.join('、')}
                            >
                              <span className="text-[#B8965A]">
                                {char.id === 'keweiruo' ? '权能' : '恩格萨赐福'} ·{' '}
                              </span>
                              {char.blessings.join(' · ')}
                            </p>
                          ) : (
                            <p className="text-[11px] text-[#8E8474] leading-none">
                              无赐福 · 凡俗之躯
                            </p>
                          )}
                        </div>

                        <p className="mt-3 text-xs text-[#8E8474] line-clamp-2 leading-relaxed italic">
                          “{char.quote}”
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-2.5 border-t border-[#B8965A]/15 flex items-center justify-between text-[11px] text-[#B8965A] px-1">
                      <span>
                        {char.age} · {char.height.split('（')[0]}
                      </span>
                      <span className="group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        展开卷宗 <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* -----------------------------------------------------------------
              6. 瑟兰行省：灾变领主 · BOSS
          ----------------------------------------------------------------- */}
          {activeTab === 'serlan-containments' && (
            <div className="space-y-8">
              <header className="border-b border-[#B8965A]/30 pb-6">
                <h2 className="text-3xl font-bold tracking-[0.15em] text-[#F2ECE1]">收容物</h2>
                <p className="text-sm text-[#D8D0C1]/90 mt-4 leading-relaxed">
                  <span className="font-cinzel text-[#E5C88F]">{CONTAINMENT_PREFIX.code}</span> 取自{' '}
                  <span className="font-fell italic text-[#E5C88F]">{CONTAINMENT_PREFIX.en}</span>，
                  意为「{CONTAINMENT_PREFIX.meaning}」，是本作收容物的统一编号前缀。
                </p>
                <p className="text-xs text-[#8E8474] mt-2 leading-relaxed">
                  九件收容物散布于瑟兰各地。查阅档案，了解它们的异常机制、所在地与看守方式。
                </p>
              </header>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {SERLAN_CONTAINMENTS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={`查阅 ${item.id} ${item.name}`}
                    onClick={() => setSelectedEntity({ type: 'containment', data: item })}
                    className="torn-sheet p-5 text-left cursor-pointer group hover:-translate-y-1 motion-reduce:transform-none transition-all duration-300 border-t-2 border-[#B8965A]/70 flex flex-col justify-between min-w-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5C88F]"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[#B8965A] border-b border-[#B8965A]/20 pb-3 mb-4">
                        <span className="font-cinzel text-xs tracking-[0.15em]">{item.id}</span>
                        <Archive className="w-4 h-4 opacity-70" aria-hidden="true" />
                      </div>
                      <h3 className="text-xl font-bold tracking-wider text-[#F2ECE1] group-hover:text-[#E5C88F] transition-colors break-words">{item.name}</h3>
                      <p className="font-fell italic text-sm text-[#B8965A] mt-2 leading-relaxed break-words">{item.enName}</p>
                      <p className="text-xs text-[#8E8474] mt-4 leading-relaxed">{item.kind}</p>
                      <p className="text-xs text-[#D8D0C1]/90 mt-2 leading-relaxed">所在地：{item.location}</p>
                      <p className="text-sm text-[#D8D0C1]/85 mt-4 line-clamp-3 leading-relaxed">{item.mechanisms[0].body}</p>
                    </div>
                    <div className="mt-5 pt-3 border-t border-[#B8965A]/25 flex items-center justify-between text-xs text-[#E5C88F]">
                      <span>查阅完整档案</span>
                      <ChevronRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'serlan-boss' && (
            <div className="space-y-8">
              <header className="border-b border-[#8C3B32]/50 pb-6">
                <p className="font-cinzel text-xs tracking-[0.3em] text-[#C86D5B] uppercase mb-2">
                  CATASTROPHE LORDS & UNIQUE ENTITIES · BOSS
                </p>
                <h2 className="text-3xl font-bold tracking-[0.15em] text-[#F2ECE1]">
                  灾变领主与特殊个体
                </h2>
                <p className="text-xs text-[#8E8474] mt-2 leading-relaxed">
                  收录盘踞瑟兰各处的具名族群霸主及陆沉、天倾级罕见活体天灾。点击卡片可弹出该领主的完整生态、压制机制与应对卷宗，同样支持多形态图片切换。
                </p>
              </header>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {SERLAN_BOSSES.map((boss, idx) => (
                  <div
                    key={boss.id}
                    onClick={() => setSelectedEntity({ type: 'boss', data: boss })}
                    className="torn-sheet p-5 cursor-pointer group hover:-translate-y-1 transition-all duration-300 border-t-2 border-[#8C3B32]/70 flex flex-col justify-between"
                  >
                    <div>
                      <RelicImageArchitecture
                        imgs={boss.imgs}
                        code={`BOSS-0${idx + 1}`}
                        tier={`${boss.tier}级霸主`}
                        aspectClass="aspect-[4/3]"
                        interactive={true}
                      />

                      <div className="mt-4">
                        <span className="font-cinzel text-[10px] tracking-[0.2em] text-[#C86D5B] block">
                          {boss.enName}
                        </span>
                        <div className="flex items-baseline justify-between mt-1">
                          <h3 className="text-2xl font-bold tracking-widest text-[#F2ECE1] group-hover:text-[#E2B49A] transition-colors">
                            {boss.name}
                          </h3>
                          <span className="text-xs text-[#B8965A]">{boss.title.split('·')[0]}</span>
                        </div>
                        <p className="text-xs text-[#8E8474] mt-1.5">盘踞地：{boss.habitat}</p>
                        <p className="text-xs text-[#D8D0C1]/85 mt-3 line-clamp-3 leading-relaxed">
                          {boss.appearance}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-[#8C3B32]/25 flex items-center justify-between text-xs text-[#E2B49A]">
                      <span>查阅灾变机制与应对</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* -----------------------------------------------------------------
              7. 瑟兰行省：荒野异兽
          ----------------------------------------------------------------- */}
          {activeTab === 'serlan-beasts' && (
            <div className="space-y-8">
              <header className="border-b border-[#B8965A]/30 pb-6">
                <p className="font-cinzel text-xs tracking-[0.3em] text-[#B8965A] uppercase mb-2">
                  SERLAN WILDERNESS BESTIARY
                </p>
                <h2 className="text-3xl font-bold tracking-[0.15em] text-[#F2ECE1]">
                  瑟兰荒野异兽录
                </h2>
                <p className="text-xs text-[#8E8474] mt-2">
                  分布于瑟兰废站、旧村、山路与淤渠的常见荒野异常生物（具名领主详见「灾变领主 · BOSS」专栏）。
                </p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {SERLAN_BEASTS.map((beast, idx) => (
                  <div key={beast.id} className="torn-sheet p-5 flex flex-col justify-between">
                    <div>
                      <RelicImageArchitecture
                        imgs={beast.imgs}
                        code={`BEAST-0${idx + 1}`}
                        tier={beast.tier.split('（')[0]}
                        aspectClass="aspect-[16/10]"
                        interactive={false}
                      />
                      <div className="mt-4">
                        <h3 className="text-xl font-bold tracking-widest text-[#F2ECE1]">
                          {beast.name}
                        </h3>
                        <p className="text-xs text-[#B8965A] mt-0.5">常见位阶：{beast.tier}</p>
                        <p className="text-xs text-[#8E8474] mt-1">出没环境：{beast.habitat}</p>
                        <p className="text-xs text-[#D8D0C1]/90 mt-3 leading-relaxed">
                          {beast.desc}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-[#1B1714] border-l-2 border-[#B8965A]/60 text-xs text-[#D8D0C1]/85 leading-relaxed">
                      <span className="text-[#E5C88F] font-semibold">习性与防范：</span>
                      {beast.danger}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* -----------------------------------------------------------------
              8. 瑟兰行省：地理、四圈与克朗
          ----------------------------------------------------------------- */}
          {activeTab === 'serlan-geo' && (
            <div className="max-w-5xl mx-auto space-y-12">
              <header className="border-b border-[#B8965A]/30 pb-6">
                <p className="font-cinzel text-xs tracking-[0.3em] text-[#B8965A] uppercase mb-2">
                  GEOGRAPHY, TECH RINGS & CURRENCY
                </p>
                <h2 className="text-3xl font-bold tracking-[0.15em] text-[#F2ECE1]">
                  瑟兰地理、四圈分裂与克朗物价
                </h2>
                <p className="text-xs sm:text-sm text-[#8E8474] mt-2 leading-relaxed">
                  瑟兰旧疆域约十万平方公里（南北约四百公里，东西三百余公里）。普通步行每日约25公里，载货车队约30公里，骑马约45公里；北线连接府城与洛汀（铁路180公里，公路绕行丘陵210公里）。
                </p>
              </header>

              <section className="space-y-4">
                <h3 className="text-xl font-bold tracking-widest text-[#E5C88F]">
                  ✦ 瑟兰境内四个常识圈的器物成立边界
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      zone: '府城圈（瑟兰治所）',
                      valid: '印刷、档案体系、铁器、短距电报',
                      invalid: '精密机械（全城钟表停在同一时刻）',
                      anomaly:
                        '即使邻居全家因修钟永困在同一天，府城人也只平静说句“他家钟修了”便继续吃饭——后果大到被改写后的认知划出了“大事”的范围。'
                    },
                    {
                      zone: '北线（180公里铁路沿线）',
                      valid: '蒸汽机车、铁轨、枪械火器',
                      invalid: '长距电报（信号严重串线）',
                      anomaly:
                        '【空下来的中途站】少数停用站点在日常排班与行程口述中会被全员无端漏掉，刚在站台吃过饭的修路工也会将其说成两站之间的一段空路，致守夜者断粮。'
                    },
                    {
                      zone: '东洼（低地水路与堤岸）',
                      valid: '冷兵器、畜力、木船水运',
                      invalid: '一切火器（火药在此根本不炸）',
                      anomaly:
                        '【退水之后的渡口】部分早已干涸见底、长满荒草的旧渡口，当地人仍执着地修船、把急需的药品堆在岸边等渡；旧船卸货后船底会留下一道来路不明的新鲜湿痕。'
                    },
                    {
                      zone: '南屏（连绵高地与山间坡谷）',
                      valid: '精密钟表、外科医术、度量器械',
                      invalid: '蒸汽动力（锅炉在此不上压）',
                      anomaly:
                        '【名册上已空的活人村】少数支谷聚落仍有炊烟与活人居住，谷外亲友与名册却一致认定“那里早空了”；另有西部旧乡野【收不完的空田】，农人在荒草地上日复一日争抢收割。'
                    }
                  ].map((z, idx) => (
                    <div key={idx} className="torn-sheet p-6 border-t border-[#B8965A]/40 space-y-2.5">
                      <h4 className="text-lg font-bold text-[#F2ECE1]">{z.zone}</h4>
                      <p className="text-xs text-[#8AB4CE]">
                        <strong>✔ 成立器物：</strong>
                        {z.valid}
                      </p>
                      <p className="text-xs text-[#E2B49A]">
                        <strong>✘ 失效器物：</strong>
                        {z.invalid}
                      </p>
                      <p className="text-xs text-[#D8D0C1]/85 leading-relaxed pt-2 border-t border-[#B8965A]/15">
                        {z.anomaly}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <OrnamentalDivider label="✦ SERLAN CROWN & LIVELIHOOD ✦" />

              <section className="torn-sheet p-7 border-l-2 border-[#B8965A]">
                <h3 className="text-xl font-bold tracking-widest text-[#E5C88F] mb-3">
                  ✦ 瑟兰法定货币：克朗（Crown）与日常物价
                </h3>
                <p className="text-xs text-[#D8D0C1]/90 leading-relaxed mb-5">
                  瑟兰境内唯一流通货币，不设子单位，以整数结算。面额为 1、5、10、20、50、100、500 克朗（小额为金属币，大额为纸钞，印瑟兰地方纹章，不印伊瑟琳肖像）。
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
                  {[
                    { item: '普通面包 / 热汤', price: '8—20 克朗' },
                    { item: '饱腹正餐一顿', price: '25—45 克朗' },
                    { item: '城内短程车马', price: '15—35 克朗' },
                    { item: '旅店床位 / 单间', price: '60—300 克朗' },
                    { item: '普通劳工日薪', price: '150—250 克朗' },
                    { item: '技术工匠日薪', price: '300—500 克朗' }
                  ].map((p, i) => (
                    <div key={i} className="p-3.5 bg-[#0B0A09]/80 border border-[#B8965A]/20">
                      <p className="text-xs text-[#8E8474] mb-1">{p.item}</p>
                      <p className="text-sm font-bold text-[#E5C88F]">{p.price}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* -----------------------------------------------------------------
              9. 瑟兰行省：府城六规与销名
          ----------------------------------------------------------------- */}
          {activeTab === 'serlan-customs' && (
            <div className="max-w-4xl mx-auto space-y-10">
              <header className="border-b border-[#8C3B32]/50 pb-6">
                <p className="font-cinzel text-xs tracking-[0.3em] text-[#C86D5B] uppercase mb-2">
                  SIX TABOOS OF THE CAPITAL & OBLIVION LAW
                </p>
                <h2 className="text-3xl font-bold tracking-[0.15em] text-[#F2ECE1]">
                  府城六规、送场与当日销名
                </h2>
                <p className="text-xs text-[#8E8474] mt-2 leading-relaxed">
                  源自地底「恩格萨」六大象征簇的民间铁律。老户只知表面现象，而触犯深层后果者皆被当日销名送走并被全城彻底遗忘。
                </p>
              </header>

              <div className="space-y-6">
                {SERLAN_CUSTOMS.map((c) => (
                  <div key={c.num} className="torn-sheet p-7 border-l-2 border-[#B8965A]/70">
                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                      <h3 className="text-xl font-bold tracking-widest text-[#F2ECE1]">
                        <span className="font-cinzel text-[#B8965A] mr-2">{c.num}.</span>
                        {c.title}
                      </h3>
                      <span className="text-xs font-fell italic text-[#B8965A]">{c.symbol}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#E5C88F] mb-4">
                      <strong>老户规矩：</strong>
                      {c.rule}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
                      <div className="p-4 bg-[#0B0A09]/70 border-l border-[#5B7E96]">
                        <span className="text-[#8AB4CE] font-semibold block mb-1">
                          ◈ 街坊可见的眼前现象：
                        </span>
                        <p className="text-[#D8D0C1]/85">{c.surface}</p>
                      </div>
                      <div className="p-4 bg-[#8C3B32]/15 border-l border-[#8C3B32]">
                        <span className="text-[#E2B49A] font-semibold block mb-1">
                          ◈ 籍司销名掩盖的深层后果：
                        </span>
                        <p className="text-[#D8D0C1]/90">{c.deep}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* -----------------------------------------------------------------
              10. 瑟兰行省：留府、三司与不逝者
          ----------------------------------------------------------------- */}
          {activeTab === 'serlan-orgs' && (
            <div className="max-w-5xl mx-auto space-y-12">
              <header className="border-b border-[#B8965A]/30 pb-6">
                <p className="font-cinzel text-xs tracking-[0.3em] text-[#B8965A] uppercase mb-2">
                  INSTITUTIONS OF SERLAN
                </p>
                <h2 className="text-3xl font-bold tracking-[0.15em] text-[#F2ECE1]">
                  高庭空位、留府三司与不逝者教团
                </h2>
              </header>

              <section className="grid grid-cols-1 md:grid-cols-2 gap-7">
                <div className="torn-sheet p-7 border-t-2 border-[#8C3B32]">
                  <h3 className="text-xl font-bold text-[#E2B49A] mb-3">
                    ✦ 高庭（仍在发令的空位）
                  </h3>
                  <p className="text-xs sm:text-sm text-[#D8D0C1]/90 leading-relaxed mb-3">
                    灾前各行省共同服从的最高统治机构。留府每年按固定路线往北寄送一份年报——<strong>没人收，也没人退回，但每年都送。</strong>
                  </p>
                  <p className="text-xs text-[#8E8474] leading-relaxed">
                    真相：原来的高庭早已不存在。天启历101年2月19日送达府城、要求恢复北线铁路的回文，实为不逝者教首伊瑟琳主动占据空位所发。回文的效力来自三司认它并归档会签。
                  </p>
                </div>

                <div className="torn-sheet p-7 border-t-2 border-[#B8965A]">
                  <h3 className="text-xl font-bold text-[#E5C88F] mb-3">
                    ✦ 留府与三司互制（五层职级）
                  </h3>
                  <p className="text-xs sm:text-sm text-[#D8D0C1]/90 leading-relaxed mb-3">
                    灾变后未散的行省总督府旧班子。无单一最高长官，由互不隶属的<strong>「籍司、通司、断司」</strong>三司共同维持，跨司强制处分与大工程必须三司会签。
                  </p>
                  <p className="text-xs text-[#8E8474] leading-relaxed">
                    五层共用职级：<strong>① 司长 → ② 副司长 → ③ 署长 → ④ 主管 → ⑤ 正式办事人员</strong>（登记员、核验员、巡道员等）。另设独立专业机构<strong>「测绘署」</strong>（三代漏画旧湖床而不自知）。
                  </p>
                </div>
              </section>

              <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    name: '籍司（司长：埃德温）',
                    sub: '户籍、档案与核验',
                    desc: '府城最大的官署，后院砖石档案库建在“从不返潮”的干涸湖床上，库房绝不点明火。掌管出生、迁徙、当日销名与身份核验（核验员诺薇娅所属）。'
                  },
                  {
                    name: '通司（司长：奥蕾娜）',
                    sub: '路务、运输与电报通信',
                    desc: '紧连货场，后院墙上挂满带铅笔改动的北线与支路现状图。下辖北线路务署（署长米蕾娅），负责180公里铁路抢修、车马调配与官文递送。'
                  },
                  {
                    name: '断司（司长：瑟缇娅）',
                    sub: '调查、裁决与武装执行',
                    desc: '瑟兰应对武装冲突与重大灾变的最高武力主力。前院受理、中院判官坐堂（巡回判官维罗莎所属），后院执行人员另走专门通道。'
                  }
                ].map((off, i) => (
                  <div key={i} className="torn-sheet p-6 border-l border-[#B8965A]/40">
                    <h4 className="text-base font-bold text-[#F2ECE1]">{off.name}</h4>
                    <p className="text-xs text-[#B8965A] mt-0.5 mb-3">{off.sub}</p>
                    <p className="text-xs text-[#D8D0C1]/85 leading-relaxed">{off.desc}</p>
                  </div>
                ))}
              </section>

              <OrnamentalDivider label="✦ THE UNDYING ORDER ✦" />

              <section className="torn-sheet p-8 border-l-2 border-[#5B7E96]">
                <h3 className="text-2xl font-bold tracking-widest text-[#F2ECE1] mb-3">
                  不逝者（府城旧城南无牌三进宅院）
                </h3>
                <p className="text-xs sm:text-sm text-[#D8D0C1]/90 leading-relaxed mb-6">
                  不逝者在府城的总部位于旧城南（从粮市往旧湖床方向数第三条巷子尽头灰门），门口不挂招牌。院落为本地青砖旧宅前后三进：<strong>前院对外接事问事，中院讲习集会（墙上不挂神像，只挂历法与旧地图），后院内部食宿与收支重地概不对外。</strong>这里不敲钟、不唱诵、不穿制服，人们敬畏让路只因上次出事时里面的人真能平事。
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
                  {[
                    { rank: '第一层 · 教首', holder: '伊瑟琳（兼圣女尊号）', duty: '决定教义方向与全组织行动' },
                    { rank: '第二层 · 首席执事', holder: '薇蕾娜', duty: '统筹总部日常、财物与分支监督' },
                    { rank: '第三层 · 主祭', holder: '塞芙琳（北线分支）', duty: '主持地方分支、仪式与本地救助' },
                    { rank: '第四层 · 祭司/执事', holder: '莱昂（总部直属执事）', duty: '祭司掌讲授仪式；执事掌护送外勤' },
                    { rank: '第五层 · 教众', holder: '正式加入之普通成员', duty: '参加讲习、承担约定实务' }
                  ].map((r, i) => (
                    <div key={i} className="p-4 bg-[#0B0A09]/80 border-t border-[#5B7E96]/50">
                      <p className="font-bold text-[#8AB4CE] mb-1">{r.rank}</p>
                      <p className="text-[#E5C88F] mb-1.5">{r.holder}</p>
                      <p className="text-[#8E8474] leading-relaxed">{r.duty}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* -----------------------------------------------------------------
              11. 瑟兰行省：旅途纪事（主线详尽 + 星旅/支线仅列名称与接取地）
          ----------------------------------------------------------------- */}
          {activeTab === 'serlan-quests' && (
            <div className="max-w-5xl mx-auto space-y-12">
              <header className="border-b border-[#B8965A]/30 pb-6">
                <p className="font-cinzel text-xs tracking-[0.3em] text-[#B8965A] uppercase mb-2">
                  CHRONICLES OF THE NORTHERN LINE
                </p>
                <h2 className="text-3xl font-bold tracking-[0.15em] text-[#F2ECE1]">
                  旅途纪事 · 主线详录与支线名录
                </h2>
              </header>

              <section className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold tracking-widest text-[#E5C88F]">
                      ✦ 主线第一章：《年报的回文》（全13节详录）
                    </h3>
                    <p className="text-xs text-[#8E8474] mt-1">
                      天启历101年3月 — 104年3月（历时整三年）｜府城至洛汀 180 公里铁路复通工程
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setRevealTruthLayers(!revealTruthLayers)}
                    className="px-4 py-2 text-xs tracking-widest bg-[#8C3B32]/25 border border-[#8C3B32] text-[#E2B49A] hover:bg-[#8C3B32]/40 transition-colors"
                  >
                    {revealTruthLayers ? '收起第一章四层真相底牌' : '查阅第一章四层真相揭示顺序'}
                  </button>
                </div>

                {revealTruthLayers && (
                  <div className="torn-sheet p-6 border-l-2 border-[#8C3B32] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                    <div className="p-3.5 bg-[#0B0A09]/80">
                      <p className="text-[#E2B49A] font-bold mb-1">第一层 · 回文（第六节）</p>
                      <p className="text-[#D8D0C1]/85 leading-relaxed">
                        留府年年北寄无人退回的年报，101年2月19日突收高庭回文点名修北线（由通司司长奥蕾娜亲口吐露）。
                      </p>
                    </div>
                    <div className="p-3.5 bg-[#0B0A09]/80">
                      <p className="text-[#E2B49A] font-bold mb-1">第二层 · 备料（第七节）</p>
                      <p className="text-[#D8D0C1]/85 leading-relaxed">
                        从110公里空站旧仓收存簿查出：100年底至101年初回文到达前，不逝者已按大修规格超前封存木铁伤药。
                      </p>
                    </div>
                    <div className="p-3.5 bg-[#0B0A09]/80">
                      <p className="text-[#E2B49A] font-bold mb-1">第三层 · 调令（第九节）</p>
                      <p className="text-[#D8D0C1]/85 leading-relaxed">
                        北线主祭塞芙琳交出原始调拨文书，证明超前备料指令来自总部首席执事薇蕾娜。
                      </p>
                    </div>
                    <div className="p-3.5 bg-[#0B0A09]/80">
                      <p className="text-[#E2B49A] font-bold mb-1">第四层 · 守夜人（十一至十二节）</p>
                      <p className="text-[#D8D0C1]/85 leading-relaxed">
                        薇蕾娜与伊瑟琳先后坦承：高庭早已亡佚，回文系伊瑟琳占位发出，旨在逼三司运转自救。
                      </p>
                    </div>
                  </div>
                )}

                <div className="torn-sheet p-6">
                  <div className="flex items-center justify-between text-[11px] font-cinzel text-[#B8965A] mb-3">
                    <span>0 KM · 府城 (CAPITAL)</span>
                    <span>CURRENT: {MAIN_STORY_SECTIONS[activeSectionIdx].km} KM</span>
                    <span>180 KM · 洛汀 (LUOTING)</span>
                  </div>

                  <div className="w-full h-1.5 bg-[#1C1814] mb-6 relative overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#8C3B32] via-[#B8965A] to-[#E5C88F] transition-all duration-500"
                      style={{
                        width: `${Math.max(5, (MAIN_STORY_SECTIONS[activeSectionIdx].km / 180) * 100)}%`
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-6">
                    {MAIN_STORY_SECTIONS.map((s, idx) => {
                      const isAct = idx === activeSectionIdx;
                      return (
                        <button
                          key={s.sec}
                          type="button"
                          onClick={() => setActiveSectionIdx(idx)}
                          className={`p-2.5 text-left transition-all border-l-2 ${
                            isAct
                              ? 'bg-[#B8965A]/20 border-[#B8965A] text-[#F2ECE1]'
                              : 'bg-[#0B0A09]/60 border-[#8E8474]/20 text-[#8E8474] hover:text-[#D8D0C1]'
                          }`}
                        >
                          <span className="block text-[10px] font-cinzel">{s.sec}</span>
                          <span className="block text-xs font-bold truncate mt-0.5">{s.title}</span>
                        </button>
                      );
                    })}
                  </div>

                  {(() => {
                    const cur = MAIN_STORY_SECTIONS[activeSectionIdx];
                    return (
                      <div className="p-6 bg-[#0B0A09]/85 border-t border-[#B8965A]/30 space-y-4">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <h4 className="text-2xl font-bold tracking-widest text-[#F2ECE1]">
                            {cur.sec} · 《{cur.title}》
                          </h4>
                          <span className="text-xs font-cinzel text-[#B8965A]">{cur.time}</span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-xs text-[#8AB4CE]">
                          <span>
                            ◈ 工程进度：{cur.progress}（{cur.km} / 180 km）
                          </span>
                          <span>◈ 现场核心人物：{cur.core}</span>
                          <span>◈ 旅人位阶：{cur.rank}</span>
                        </div>
                        <p className="text-sm text-[#D8D0C1]/90 leading-relaxed pt-2 border-t border-[#B8965A]/15">
                          {cur.summary}
                        </p>
                      </div>
                    );
                  })()}
                </div>
              </section>

              <OrnamentalDivider label="✦ STAR JOURNEYS & LOCAL TALES (BRIEF) ✦" />

              <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold tracking-widest text-[#E5C88F]">
                      ✦ 星旅支线（共6段 · 个人羁绊录）
                    </h3>
                    <p className="text-xs text-[#8E8474] mt-1">
                      穿插于三年修路往返空档中的独立支线，仅列任务名称与接取处：
                    </p>
                  </div>
                  <div className="space-y-2.5">
                    {STAR_JOURNEYS_BRIEF.map((sj) => (
                      <div key={sj.id} className="torn-strip p-4 flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-[#F2ECE1] tracking-wider">
                            {sj.title}
                          </span>
                          <span className="font-cinzel text-[10px] text-[#B8965A]">{sj.id}</span>
                        </div>
                        <p className="text-xs text-[#8E8474] flex items-center gap-1.5">
                          <MapPin className="w-3 h-3 text-[#B8965A] shrink-0" />
                          <span>接取地点 / 相关人：{sj.location}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold tracking-widest text-[#8AB4CE]">
                      ✦ 瑟兰地方支线（共3段 · 民间风物）
                    </h3>
                    <p className="text-xs text-[#8E8474] mt-1">
                      独立于主线与主要人物之外的民间委托，仅列任务名称与接取处：
                    </p>
                  </div>
                  <div className="space-y-2.5">
                    {LOCAL_QUESTS_BRIEF.map((lq) => (
                      <div key={lq.id} className="torn-strip p-4 flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-[#F2ECE1] tracking-wider">
                            {lq.title}
                          </span>
                          <span className="font-cinzel text-[10px] text-[#8AB4CE]">{lq.id}</span>
                        </div>
                        <p className="text-xs text-[#8E8474] flex items-center gap-1.5">
                          <MapPin className="w-3 h-3 text-[#8AB4CE] shrink-0" />
                          <span>接取地点 / 触发物：{lq.location}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* -----------------------------------------------------------------
              12. 待扩展新地区模板预览
          ----------------------------------------------------------------- */}
</main>
      </div>

      {/* ===================================================================
          全屏古籍残卷弹窗：人物详情 或 灾变领主(BOSS)详情（带多图切换）
      =================================================================== */}
      {selectedEntity && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-y-auto"
          onClick={() => setSelectedEntity(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            role={selectedEntity.type === 'containment' ? 'dialog' : undefined}
            aria-modal={selectedEntity.type === 'containment' ? true : undefined}
            aria-labelledby={selectedEntity.type === 'containment' ? 'containment-dossier-title' : undefined}
            onKeyDown={(e) => {
              if (selectedEntity.type !== 'containment') return;
              if (e.key === 'Escape') { e.stopPropagation(); setSelectedEntity(null); }
              if (e.key === 'Tab') { e.preventDefault(); e.currentTarget.querySelector('button')?.focus(); }
            }}
            className="torn-sheet w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6 sm:p-10 border border-[#B8965A]/40 relative"
          >
            <button
              type="button"
              onClick={() => setSelectedEntity(null)}
              autoFocus={selectedEntity.type === 'containment'}
              aria-label="关闭档案"
              className="sticky top-2 float-right z-30 p-2 bg-[#14110E] text-[#B8965A] hover:text-[#F2ECE1] border border-[#B8965A]/30"
            >
              <X className="w-5 h-5" />
            </button>

            {selectedEntity.type === 'containment' ? (
              <div className="clear-both space-y-8">
                <header className="border-b border-[#B8965A]/30 pb-5">
                  <p className="font-cinzel text-xs tracking-[0.2em] text-[#B8965A]">{selectedEntity.data.id}</p>
                  <h3 id="containment-dossier-title" className="text-2xl sm:text-3xl font-bold tracking-wider text-[#F2ECE1] mt-2 break-words">{selectedEntity.data.name}</h3>
                  <p className="font-fell italic text-lg text-[#E5C88F] mt-3 leading-relaxed break-words">{selectedEntity.data.enName}</p>
                  <p className="text-xs text-[#8E8474] mt-3 leading-relaxed">{selectedEntity.data.kind}</p>
                </header>

                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-5 bg-[#0B0A09]/80 border-l-2 border-[#B8965A] text-sm leading-relaxed">
                  <div className="sm:col-span-2"><dt className="text-xs text-[#B8965A] mb-1">所在地</dt><dd>{selectedEntity.data.location}</dd></div>
                  <div><dt className="text-xs text-[#B8965A] mb-1">看守方</dt><dd>{selectedEntity.data.custodian}</dd></div>
                  <div><dt className="text-xs text-[#B8965A] mb-1">协办</dt><dd>{selectedEntity.data.assistance}</dd></div>
                </dl>

                <section className="space-y-5">
                  <h4 className="text-sm font-bold tracking-widest text-[#B8965A] border-b border-[#B8965A]/20 pb-3">异常机制</h4>
                  {selectedEntity.data.mechanisms.map((mechanism) => (
                    <div key={mechanism.title}>
                      <h5 className="text-sm font-bold text-[#E5C88F] mb-2">{mechanism.title}</h5>
                      <p className="text-sm leading-loose text-[#D8D0C1]/90">{mechanism.body}</p>
                    </div>
                  ))}
                </section>

                <section className="space-y-4">
                  <h4 className="text-sm font-bold tracking-widest text-[#B8965A] border-b border-[#B8965A]/20 pb-3">瑟兰落点与看守记录</h4>
                  {selectedEntity.data.localNotes.map((paragraph, index) => (
                    <p key={index} className="text-sm leading-loose text-[#D8D0C1]/90">{paragraph}</p>
                  ))}
                </section>
              </div>
            ) : selectedEntity.type === 'char' ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 clear-both">
                <div className="lg:col-span-5 space-y-5">
                  <RelicImageArchitecture
                    imgs={selectedEntity.data.imgs}
                    code={`DOSSIER · ${selectedEntity.data.enName.toUpperCase()}`}
                    tier={selectedEntity.data.tier}
                    aspectClass="aspect-[3/4]"
                    interactive={true}
                  />

                  <div className="p-4 bg-[#0B0A09]/80 border-l-2 border-[#B8965A] space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-[#8E8474]">公开身份：</span>
                      <span className="text-[#E5C88F] font-semibold">{selectedEntity.data.role}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8E8474]">年龄 / 身高：</span>
                      <span className="text-[#D8D0C1]">
                        {selectedEntity.data.age} ／ {selectedEntity.data.height}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8E8474]">常态位阶：</span>
                      <span className="text-[#E2B49A] font-bold">{selectedEntity.data.tier}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8E8474]">
                        {selectedEntity.data.id === 'keweiruo' ? '权能：' : '恩格萨赐福：'}
                      </span>
                      <span className="text-[#8AB4CE] text-right max-w-[68%] leading-relaxed break-words">
                        {selectedEntity.data.blessings.length > 0
                          ? selectedEntity.data.blessings.join('、')
                          : '无赐福（普通人）'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-6">
                  <div className="border-b border-[#B8965A]/30 pb-4">
                    <span className="font-cinzel text-xs tracking-[0.3em] text-[#B8965A]">
                      CHARACTER ARCHIVE · {selectedEntity.data.faction}
                    </span>
                    <div className="flex items-baseline gap-4 mt-1">
                      <h3 className="text-3xl font-bold tracking-widest text-[#F2ECE1]">
                        {selectedEntity.data.name}
                      </h3>
                      <span className="font-fell italic text-lg text-[#8E8474]">
                        {selectedEntity.data.enName}
                      </span>
                    </div>
                    <p className="mt-3 text-sm font-fell italic text-[#E5C88F]">
                      “{selectedEntity.data.quote}”
                    </p>
                  </div>

                  <div className="space-y-4 text-xs sm:text-sm leading-relaxed">
                    <div>
                      <h4 className="text-xs font-bold tracking-widest text-[#B8965A] uppercase mb-1">
                        ✦ 容貌与标准衣着
                      </h4>
                      <p className="text-[#D8D0C1]/90 mb-1.5">{selectedEntity.data.appearance}</p>
                      <p className="text-[#8E8474]">{selectedEntity.data.attire}</p>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold tracking-widest text-[#B8965A] uppercase mb-1">
                        ✦ 性情、经历与私人生活
                      </h4>
                      <p className="text-[#D8D0C1]/90 mb-1.5">{selectedEntity.data.personality}</p>
                      <p className="text-[#8E8474]">{selectedEntity.data.lifestyle}</p>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold tracking-widest text-[#8AB4CE] uppercase mb-1">
                        ✦ 战力表现与权能边界
                      </h4>
                      <p className="text-[#D8D0C1]/90">{selectedEntity.data.combat}</p>
                    </div>

                    <div className="p-4 bg-[#8C3B32]/15 border-l-2 border-[#8C3B32]">
                      <h4 className="text-xs font-bold tracking-widest text-[#E2B49A] uppercase mb-1">
                        ✦ 赐福副作用与日常认知污染
                      </h4>
                      <p className="text-[#D8D0C1]/95">{selectedEntity.data.pollution}</p>
                    </div>

                    <div className="p-4 bg-[#0B0A09]/90 border-l-2 border-[#B8965A]">
                      <h4 className="text-xs font-bold tracking-widest text-[#E5C88F] uppercase mb-1">
                        ✦ 主线/星旅关键交集与知情边界
                      </h4>
                      <p className="text-[#D8D0C1]/90">{selectedEntity.data.secret}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 clear-both">
                <div className="lg:col-span-5 space-y-5">
                  <RelicImageArchitecture
                    imgs={selectedEntity.data.imgs}
                    code={selectedEntity.data.enName}
                    tier={`${selectedEntity.data.tier}级灾变领主`}
                    aspectClass="aspect-[3/4]"
                    interactive={true}
                  />
                </div>

                <div className="lg:col-span-7 space-y-6">
                  <div className="border-b border-[#8C3B32]/50 pb-4">
                    <span className="font-cinzel text-xs tracking-[0.25em] text-[#C86D5B]">
                      {selectedEntity.data.enName}
                    </span>
                    <h3 className="text-3xl font-bold tracking-widest text-[#F2ECE1] mt-1">
                      {selectedEntity.data.name}
                    </h3>
                    <p className="text-sm text-[#E2B49A] mt-1">{selectedEntity.data.title}</p>
                    <p className="text-xs text-[#8E8474] mt-2">
                      盘踞区域：{selectedEntity.data.habitat}
                    </p>
                  </div>

                  <div className="space-y-4 text-xs sm:text-sm leading-relaxed">
                    <div>
                      <h4 className="text-xs font-bold tracking-widest text-[#B8965A] uppercase mb-1">
                        ✦ 实体形态与现场破绽
                      </h4>
                      <p className="text-[#D8D0C1]/90">{selectedEntity.data.appearance}</p>
                    </div>

                    <div className="p-4 bg-[#8C3B32]/15 border-l-2 border-[#8C3B32]">
                      <h4 className="text-xs font-bold tracking-widest text-[#E2B49A] uppercase mb-1">
                        ✦ 灾变干预规模与认知压制机制
                      </h4>
                      <p className="text-[#D8D0C1]/95">{selectedEntity.data.mechanism}</p>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold tracking-widest text-[#8AB4CE] uppercase mb-1">
                        ✦ 旅途关联记录
                      </h4>
                      <p className="text-[#D8D0C1]/90">{selectedEntity.data.storyLink}</p>
                    </div>

                    <div className="p-4 bg-[#0B0A09]/90 border-l-2 border-[#B8965A]">
                      <h4 className="text-xs font-bold tracking-widest text-[#E5C88F] uppercase mb-1">
                        ✦ 应对边界与存续说明
                      </h4>
                      <p className="text-[#D8D0C1]/90">{selectedEntity.data.counter}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}