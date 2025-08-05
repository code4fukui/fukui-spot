import { makeSpotCSV } from "./makeSpotCSV.js";
import { makeJSONLD } from "./makeJSONLD.js";
import { makeDinoSpotCSV } from "./makeDinoSpotCSV.js";
import { makeErrSpotCSV } from "./makeErrSpotCSV.js";
import { makeForeginSpotCSV } from "./makeForeginSpotCSV.js";

await makeSpotCSV();
await makeJSONLD();
await makeDinoSpotCSV();
await makeErrSpotCSV();
await makeForeginSpotCSV();

