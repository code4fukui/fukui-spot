import { CSV } from "https://js.sabae.cc/CSV.js";

const data = await CSV.fetchJSON("../fuku-e-spot.csv");
await Deno.mkdir("../img", { recursive: true });
let n = 0;
for (const d of data) {
  for (let i = 0; i < 10; i++) {
    const img = i == 0 ? d.image : d["image" + (i + 1)];
    if (img == "") break;
    const bin = new Uint8Array(await (await fetch(img)).arrayBuffer());
    await Deno.writeFile("../img/" + d.id + (i == 0 ? "" : "_" + (i + 1)) + ".jpg", bin);
    console.log(d.id, i, ++n, data.length);
  }
}
