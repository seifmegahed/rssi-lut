/**
 * Generate a lookup map for RSSI values to percentage in ts.
 * The script generates a `rssi-lut.ts` and `rssi-lut.js` files
 * which can be used in a js/ts project
 * and an `rssi-lut.csv` file which can be used in a spreadsheet.
 *
 * You can adjust the `worst` and `best` values to change the range of the lookup map,
 * and you can adjust the `delimiter` value to change the delimiter of the CSV file.
 */
const best = -30; // The best RSSI value
const worst = -85; // The worst RSSI value
const delimiter = ","; // The delimiter of the CSV file

const fs = require("fs");

const signalQuality = (dbm, worst = -85, best = -30) =>
  Math.round(
    (100 * (best - worst) * (best - worst) -
      (best - dbm) * (15 * (best - worst) + 62 * (best - dbm))) /
      ((best - worst) * (best - worst))
  );

let tsFileContent = "export const rssiLUT = new Map([\n";
let csvFileContent = `RSSI${delimiter} Q\n`;

for (let i = -20; i >= -100; i--) {
  const rssi = Math.max(Math.min(signalQuality(i), 100), 0);
  tsFileContent += `  [${i}, ${rssi}],\n`;
  csvFileContent += `${i}${delimiter} ${rssi}\n`;
}

tsFileContent += "]);";

fs.writeFileSync("./output/rssi-lut.csv", csvFileContent);

fs.writeFileSync("./output/rssi-lut.ts", tsFileContent);

fs.writeFileSync("./output/rssi-lut.js", tsFileContent);
