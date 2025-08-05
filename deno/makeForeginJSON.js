import { HTMLParser } from "https://js.sabae.cc/HTMLParser.js";
import { loadOrFetch } from "./loadOrFetch.js";
import { parseMapURL } from "./parseMapURL.js";

const parseHref = (comp) => {
  const as = comp.querySelectorAll("a");
  if (as.length == 0) {
    return comp.textContent;
  }
  return as.map(a => {
    const name = a.textContent.trim();
    const url = a.getAttribute("href");
    if (name == url) {
      return url;
    }
    //return `[${name}](${url})`; // Markdown
    return url;
  }).join(",");
};

export const makeForeginJSON = async (fetchurl, lang) => {
  const fn = fetchurl.match(/\/([^\/]+)\/$/)[1] + "-" + lang;
  //console.log(fetchurl, fn);
  //Deno.exit();
  const id = fn;
  const html = await loadOrFetch(fetchurl, fn);
  const dom = HTMLParser.parse(html);
  const title = dom.querySelector("title")?.textContent;
  if (!title) {
    return null;
  }
  console.log(fn);
  const metas = dom.querySelectorAll("meta");
  const description = metas.find(m => m.getAttribute("name") == "description")?.getAttribute("content");
  if (!description) return null;
  const url = metas.find(m => m.getAttribute("property") == "og:url").getAttribute("content");
  const image0 = metas.find(m => m.getAttribute("property") == "og:image").getAttribute("content");
  const image = image0 == "?q=30" ? "" : "https:" + image0;
  const name = dom.querySelector(".information-titles__title").textContent;
  //const area = detailtag[0]?.querySelectorAll("dd").map(dd => dd.textContent).join(",") || "";
  const area = dom.querySelector(".information-titles__subtitle").textContent;

  const mapi = dom.querySelector(".map-container iframe");
  const map = mapi ? mapi.getAttribute("src") : "";
  const [lat, lng, zoom] = parseMapURL(map);
  const data = {
    id,
    name,
    area,
    /*
    lat,
    lng,
    zoom,
    */
    url,
    image,
    description,
  };
  const detail = dom.querySelectorAll(".information-content-basics__block");
  detail.forEach(d => {
    const name = d.querySelector(".information-content-basics__block-title").textContent;
    const value = parseHref(d.querySelector(".information-content-basics__block-text"));
    //console.log(name, value);
    data[name] = value;
  });
  console.log(data);
  await Deno.writeTextFile("src/" + id + ".json", JSON.stringify(data, null, 2));
  return data;
};
