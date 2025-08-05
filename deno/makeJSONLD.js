import { CSV } from "https://js.sabae.cc/CSV.js";
import { JSONLD } from "./JSONLD.js";

export const makeJSONLD = async () => {
  const data = CSV.toJSON(await CSV.fetch("../fuku-e-spot.csv"));

  const vocab = "fuku-e-spot-schema.jsonld";
  const jsonld = JSONLD.make(vocab, data);
  console.log(jsonld);

  await Deno.writeTextFile("../fuku-e-spot.jsonld", JSON.stringify(jsonld, null, 2));
};

if (import.meta.main) {
  await makeJSONLD();
}
