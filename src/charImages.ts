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
import setia from './assets/characters/setia.webp';
import verosa1 from './assets/characters/verosa-1.webp';
import verosa2 from './assets/characters/verosa-2.webp';
import viola from './assets/characters/viola.webp';
import mifla from './assets/characters/mifla.webp';
import lecia from './assets/characters/lecia.webp';
import keweiruo1 from './assets/characters/keweiruo-1.webp';
import keweiruo2 from './assets/characters/keweiruo-2.webp';

export const CHAR_IMAGES: Record<string, string[]> = {
  yserin: [yserin1, yserin2, yserin3],
  verena: [verena],
  sephrin: [sephrin],
  leon: [leon],
  edwin: [edwin],
  novia: [novia],
  aurena: [aurena],
  mireya: [mireya],
  setia: [setia],
  verosa: [verosa1, verosa2],
  viola: [viola],
  mifla: [mifla],
  lecia: [lecia],
  keweiruo: [keweiruo1, keweiruo2]
};
