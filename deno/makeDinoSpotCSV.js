import { CSV } from "https://js.sabae.cc/CSV.js";
import { matchKeyword } from "./matchKeyword.js";

const src = CSV.toJSON(await CSV.fetch("../fuku-e-spot.csv"));
const list = src.filter(d => matchKeyword(d, "恐竜"));
await Deno.writeTextFile("../fuku-e-spot-dino.csv", CSV.stringify(list));
