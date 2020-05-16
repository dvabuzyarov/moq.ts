import { Application } from "typedoc";
import { MoqPlugin } from "./typedoc.plugin";
import { ModuleKind, ScriptTarget } from "typescript";

const application = new Application();

application.bootstrap({
    module: ModuleKind.CommonJS,
    target: ScriptTarget.ES2020,
    name: "moq.ts | documentation",
    // theme: "markdown",
    excludePrivate: true,
    excludeNotExported: true,
    // excludeExternals: true,
    preserveConstEnums: true,
    stripInternal: true,
    disableOutputCheck: false,
    experimentalDecorators: true,
    version: true
});

if (application.converter.hasComponent("moq-ts") === false) {
    application.converter.addComponent("moq-ts", new MoqPlugin(application.converter));
}

const reflection = application.convert([
    "./projects/moq/src/public_api.ts"
]);
export const docs = application.generateDocs(reflection, "./docs");
