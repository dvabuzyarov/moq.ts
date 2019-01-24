import { Application } from "typedoc";
import { MoqPlugin } from "./typedoc.plugin";

const application = new Application({
    module: "commonjs",
    target: "es6",
    name: "moq.ts | documentation",
    // theme: "markdown",
    excludePrivate: true,
    excludeNotExported: true,
    // excludeExternals: true,
    preserveConstEnums: true,
    stripInternal: true,
    disableOutputCheck: false,
    version: true
});

if (application.converter.hasComponent("moq-ts") === false) {
    application.converter.addComponent("moq-ts", new MoqPlugin(application.converter));
}

const reflection = application.convert([
    "./projects/moq/src/public_api.ts"
]);
export const docs = application.generateDocs(reflection, "./docs");
