import { EqualMatchingInjectorConfig, Mock } from "moq.ts";
import "reflect-metadata";
/* eslint @typescript-eslint/naming-convention: "off" */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
const Jasmine = require("jasmine");
/* eslint-enable @typescript-eslint/no-require-imports */
/* eslint-enable @typescript-eslint/no-var-requires */

const jsm = new Jasmine({}) as any;

jsm.configureDefaultReporter({
  print: arg => {
    if (arg !== "[32m.[0m") {
      process.stdout.write(arg);
    }
  },
  showColors: true
});

jsm.loadConfig({
  spec_dir: "./specs/schematics/",
  spec_files: [
    "**/*.[sS]pec.js"
  ]
});

Mock.options = {injectorConfig: new EqualMatchingInjectorConfig()};
jsm.execute();
