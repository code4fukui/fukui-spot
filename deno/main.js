import { makeSpotCSV } from "./makeSpotCSV.js";
import { makeDinoSpotCSV } from "./makeDinoSpotCSV.js";
import { makeErrSpotCSV } from "./makeErrSpotCSV.js";

await makeSpotCSV();
await makeDinoSpotCSV();
await makeErrSpotCSV();

