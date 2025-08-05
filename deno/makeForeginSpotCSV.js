import { CSV } from "https://js.sabae.cc/CSV.js";
import { makeForeginJSON } from "./makeForeginJSON.js";
import { loadOrFetch } from "./loadOrFetch.js";
import { HTMLParser } from "https://js.sabae.cc/HTMLParser.js";

/*
const list = [];
for (let i = 1;; i++) {
  const url = `https://www.fuku-e.com/spot/index_${i}_0_________.html`; // 更新順
  const html = await loadOrFetch(url);
  //console.log(html);
  const dom = HTMLParser.parse(html);
  const dls = dom.querySelectorAll("div#searchResult dl");
  //const links = dls.map(dl => dl.querySelectorAll("dd")[5].querySelector("a").href);
  const links = dls.map(dl => dl.querySelectorAll("dd")[4].querySelector("a").getAttribute("href"));
  console.log(links);
  if (links.length == 0) {
    break;
  }
  for (const link of links) {
    list.push(await makeJSON(link));
  }
}
list.sort((a, b) => a.id.localeCompare(b.id));
await Deno.writeTextFile("../fuku-e-spot.csv", CSV.stringify(list));
*/

export const makeForeginSpotCSV = async () => {
  const langlist = {
    "en": "eng",
    "scn": "chi-CN",
    "tcn": "chi-TW",
  };
  for (const lang in langlist) {
    const lang2 = langlist[lang];

    const list = [];
    for (let i = 1; i < 200; i++) {
      const url = `https://enjoy.pref.fukui.lg.jp/${lang}/spot/spot-${i}/`;
      const d = await makeForeginJSON(url, lang2);
      if (d) {
        list.push(d);
      }
    }
    await Deno.writeTextFile(`../fuku-e-spot-${lang2}.csv`, CSV.stringify(list));
  }
};

if (import.meta.main) {
  await makeForeginSpotCSV();
}
