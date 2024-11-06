import { CSV } from "https://js.sabae.cc/CSV.js";

const data = await CSV.fetchJSON("../fuku-e-spot.csv");
await Deno.mkdir("../img", { recursive: true });
let n = 0;
for (const d of data) {
  const bin = new Uint8Array(await (await fetch(d.image)).arrayBuffer());
  await Deno.writeFile("../img/" + d.id + ".jpg", bin);
  console.log(d.id, ++n, data.length);
}
