// 角色立绘：从卡工程的 bubble/avatars.json 抓下来、压成 640 宽的 webp 后随站打包。
// 站上不引用 postimg.cc 外链，国内不挂代理也能看图。
import yserin1 from './assets/characters/yserin-1.webp';
import yserin2 from './assets/characters/yserin-2.webp';
import yserin3 from './assets/characters/yserin-3.webp';
import verena from './assets/characters/verena.webp';
import sephrin from './assets/characters/sephrin.webp';
import leon from './assets/characters/leon.webp';
import edwin from './assets/characters/edwin.webp';
import novia from './assets/characters/novia.webp';
import aurena from './assets/characters/aurena.webp';
import mireya from './assets/characters/mireya.webp';
import setia1 from './assets/characters/setia.webp';
import setia2 from './assets/characters/setia-2.webp';
import verosa1 from './assets/characters/verosa-1.webp';
import viola from './assets/characters/viola.webp';
import mifla from './assets/characters/mifla.webp';
import lecia from './assets/characters/lecia.webp';
import keweiruo1 from './assets/characters/keweiruo-1.webp';
import keweiruo2 from './assets/characters/keweiruo-2.webp';
import zyPerson1 from './assets/characters/zhaoyeyuan/zy-person-1.webp';
import zyPerson2 from './assets/characters/zhaoyeyuan/zy-person-2.webp';
import zyPerson3 from './assets/characters/zhaoyeyuan/zy-person-3.webp';
import zyPerson4 from './assets/characters/zhaoyeyuan/zy-person-4.webp';
import zyPerson5 from './assets/characters/zhaoyeyuan/zy-person-5.webp';
import zyPerson6 from './assets/characters/zhaoyeyuan/zy-person-6.webp';
import zyPerson7 from './assets/characters/zhaoyeyuan/zy-person-7.webp';
import zyPerson8 from './assets/characters/zhaoyeyuan/zy-person-8.webp';
import zyPerson9 from './assets/characters/zhaoyeyuan/zy-person-9.webp';
import zyPerson10 from './assets/characters/zhaoyeyuan/zy-person-10.webp';
import zyPerson11 from './assets/characters/zhaoyeyuan/zy-person-11.webp';
import zyPerson12 from './assets/characters/zhaoyeyuan/zy-person-12.webp';
import zyPerson13 from './assets/characters/zhaoyeyuan/zy-person-13.webp';
import zyPerson14 from './assets/characters/zhaoyeyuan/zy-person-14.webp';
import zyPerson15 from './assets/characters/zhaoyeyuan/zy-person-15.webp';
import zyPerson16 from './assets/characters/zhaoyeyuan/zy-person-16.webp';
import zyPerson17 from './assets/characters/zhaoyeyuan/zy-person-17.webp';
import zyPerson18 from './assets/characters/zhaoyeyuan/zy-person-18.webp';
import zyPerson19 from './assets/characters/zhaoyeyuan/zy-person-19.webp';
import zyPerson20 from './assets/characters/zhaoyeyuan/zy-person-20.webp';
import zyLordDongfang from './assets/characters/zhaoyeyuan/zy-lord-dongfang.webp';
import zyLordMurong from './assets/characters/zhaoyeyuan/zy-lord-murong.webp';
import zyLordLan from './assets/characters/zhaoyeyuan/zy-lord-lan.webp';
import zyLordChao from './assets/characters/zhaoyeyuan/zy-lord-chao.webp';

export const CHAR_IMAGES: Record<string, string[]> = {
  yserin: [yserin1, yserin2, yserin3],
  verena: [verena],
  sephrin: [sephrin],
  leon: [leon],
  edwin: [edwin],
  novia: [novia],
  aurena: [aurena],
  mireya: [mireya],
  setia: [setia1, setia2],
  verosa: [verosa1],
  viola: [viola],
  mifla: [mifla],
  lecia: [lecia],
  keweiruo: [keweiruo1, keweiruo2],
  'zy-person-1': [zyPerson1],
  'zy-person-2': [zyPerson2],
  'zy-person-3': [zyPerson3],
  'zy-person-4': [zyPerson4],
  'zy-person-5': [zyPerson5],
  'zy-person-6': [zyPerson6],
  'zy-person-7': [zyPerson7],
  'zy-person-8': [zyPerson8],
  'zy-person-9': [zyPerson9],
  'zy-person-10': [zyPerson10],
  'zy-person-11': [zyPerson11],
  'zy-person-12': [zyPerson12],
  'zy-person-13': [zyPerson13],
  'zy-person-14': [zyPerson14],
  'zy-person-15': [zyPerson15],
  'zy-person-16': [zyPerson16],
  'zy-person-17': [zyPerson17],
  'zy-person-18': [zyPerson18],
  'zy-person-19': [zyPerson19],
  'zy-person-20': [zyPerson20],
  'zy-lord-dongfang': [zyLordDongfang],
  'zy-lord-murong': [zyLordMurong],
  'zy-lord-lan': [zyLordLan],
  'zy-lord-chao': [zyLordChao]
};
