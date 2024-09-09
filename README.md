# RSSI LUT

A simple tool to generate a lookup map for RSSI values to percentage in ts.
The script generates a file called `rssi-lut.ts` which can be used in a typescript project.

Based on [linux's ipw2200](https://github.com/torvalds/linux/blob/9ff9b0d392ea08090cd1780fb196f36dbb586529/drivers/net/wireless/intel/ipw2x00/ipw2200.c#L4321) implementation.

## Usage

```bash
node index.js
```