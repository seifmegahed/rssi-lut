const fs = require('fs');

const signalQuality = (dbm, worst = -85, best = -30) =>
  Math.round(
    (100 * (best - worst) * (best - worst) -
      (best - dbm) * (15 * (best - worst) + 62 * (best - dbm))) /
      ((best - worst) * (best - worst))
  );

let fileContent = "export const rssiLUT = new Map([\n";

for (let i = -20; i >= -100; i--) {
  fileContent += `  [${i},${Math.max(Math.min(signalQuality(i), 100), 0)}],\n`;
}

fileContent += "]);";
fs.writeFileSync(
  'rssi-lut.ts',
  fileContent,
);

