import { EqualMatchingInjectorConfig, Mock } from "moq.ts";
import Jasmine from "jasmine";
import "core-js/proposals/reflect-metadata.js";

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
