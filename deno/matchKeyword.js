import IMIMojiConverter from "https://code4sabae.github.io/imi-moji-converter-es/IMIMojiConverter.mjs";

const std = (s) => IMIMojiConverter.toHalfWidth(s).toLowerCase();

export const matchKeyword = (data, keyword) => {
  keyword = std(keyword);
  const afilter = keyword.replace(/　/g, " ").split(" ");
  for (const af of afilter) {
    let flg = false;
    for (const name in data) {
      if (std(data[name]).indexOf(af) >= 0) {
        flg = true;
        break;
      }
    }
    if (!flg) {
      return false;
    }
  }
  return true;
};