import { EqualMatchingInjectorConfig, Mock } from "moq.ts";
import Jasmine from "jasmine";

const runner = new Jasmine({}) as any;
runner.configureDefaultReporter({
    print: arg => {
        if (arg !== "[32m.[0m") {
            process.stdout.write(arg);
        }
    },
    showColors: true
});

runner.loadConfig({
    spec_dir: "./specs/moq/",
    spec_files: [
        "**/*.[sS]pec.js"
    ]
});
Mock.options = {injectorConfig: new EqualMatchingInjectorConfig()};
runner.execute();
