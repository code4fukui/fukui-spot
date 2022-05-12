import { CSV } from "https://js.sabae.cc/CSV.js";

const src = CSV.toJSON(await CSV.fetch("../fuku-e-spot.csv"));
const list = src.filter(d => !d.lat || !d.lng || !d.zoom || d.zoom == "0");
await Deno.writeTextFile("../fuku-e-spot-err.csv", CSV.stringify(list));
