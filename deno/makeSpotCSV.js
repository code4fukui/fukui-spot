import { CSV } from "https://js.sabae.cc/CSV.js";
import { makeJSON } from "./makeJSON.js";
import { loadOrFetch } from "./loadOrFetch.js";
import { HTMLParser } from "https://js.sabae.cc/HTMLParser.js";

export const makeSpotCSV = async () => {
  await Deno.mkdir("./src", { recursive: true });

  const list = [];
  for (let i = 1;; i++) {
    const url = `https://www.fuku-e.com/spot/index_${i}_0_________.html`; // 更新順
    const html = await loadOrFetch(url);
    //console.log(html);
    const dom = HTMLParser.parse(html);
    const dls = dom.querySelectorAll("div#resultList dl");
    //const links = dls.map(dl => dl.querySelectorAll("dd")[5].querySelector("a").href);
    const links = dls.map(dl => dl.querySelectorAll("dd")[3].querySelector("a").getAttribute("href"));
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

  /*
  const list = [];
  for (let i = 1001; i < 2000; i++) {
    const d = await makeJSON(i);
    if (d) {
      list.push(d);
    }
  }
  await Deno.writeTextFile("fuku-e-spot.csv", CSV.stringify(list));
  */

};
