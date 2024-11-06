import { HTMLParser } from "https://js.sabae.cc/HTMLParser.js";
import { loadOrFetch } from "./loadOrFetch.js";
import { parseMapURL } from "./parseMapURL.js";
import { HTML } from "https://code4fukui.github.io/HTML/HTML.js";

export const makeJSON = async (fn) => {
  const id = fn.replace(".html", "").replace("detail_", "");
  const fetchurl = `https://www.fuku-e.com/spot/` + fn;
  const html = await loadOrFetch(fetchurl);
  console.log(fn);
  const dom = HTMLParser.parse(html);
  const title = dom.querySelector("title").textContent;
  if (title == "お探しのページは見つかりませんでした") {
    return null;
  }
  const metas = dom.querySelectorAll("meta");
  const description = HTML.decode(metas.find(m => m.getAttribute("name") == "description").getAttribute("content"));
  const url = metas.find(m => m.getAttribute("property") == "og:url").getAttribute("content");
  const image = metas.find(m => m.getAttribute("property") == "og:image").getAttribute("content");
  const nameh2 = dom.querySelector("header h2");
  const kana = HTML.decode(nameh2.getAttribute("data-ruby"));
  const name = HTML.decode(nameh2.textContent);
  const detailtag = dom.querySelectorAll("#detailTag dl")
  const area = detailtag[0]?.querySelectorAll("dd").map(dd => dd.textContent).join(",") || "";
  const category = detailtag[1] ? detailtag[1].querySelectorAll("dd").map(dd => dd.textContent).join(",") : "";
  const detailbasic = dom.querySelector("section#detailBasic");
  const names = detailbasic.querySelectorAll("dt").map(dt => dt.textContent);
  const values = detailbasic.querySelectorAll("dd").map(dt => {
    const as = dt.querySelectorAll("a");
    if (as.length > 0) {
      return as.map(a => {
        const name = a.textContent.trim();
        const url = a.getAttribute("href");
        if (name == url) {
          return url;
        }
        //return `[${name}](${url})`; // Markdown
        return url;
      }).join(",");
    }
    return dt.textContent;
  });
  const mapi = dom.querySelector("footer#detailMap iframe");
  const map = mapi ? mapi.getAttribute("src") : "";
  const [lat, lng, zoom] = parseMapURL(map);
  const data = {
    id,
    name,
    kana,
    area,
    category,
    lat,
    lng,
    zoom,
    url,
    image,
    description,
  };
  for (let i = 0; i < names.length; i++) {
    data[names[i]] = values[i];
  }
  console.log(data);
  await Deno.writeTextFile("src/" + id + ".json", JSON.stringify(data, null, 2));
  return data;
};
