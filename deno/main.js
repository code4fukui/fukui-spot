import { makeSpotCSV } from "./makeSpotCSV.js";
import { makeDinoSpotCSV } from "./makeDinoSpotCSV.js";
import { makeErrSpotCSV } from "./makeErrSpotCSV.js";
import { makeForeginSpotCSV } from "./makeForeginSpotCSV.js";

await makeSpotCSV();
await makeDinoSpotCSV();
await makeErrSpotCSV();
await makeForeginSpotCSV();

