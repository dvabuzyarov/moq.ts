import { Application, TSConfigReader, TypeDocReader } from "typedoc";
import { MoqPlugin } from "./typedoc.plugin";

const application = new Application();
application.options.addReader(new TSConfigReader());
application.options.addReader(new TypeDocReader());

application.bootstrap({
    tsconfig: "./projects/moq/tsconfig.lib.prod.json",
    entryPoints: ["./projects/moq/src/public_api.ts"],
    name: "moq.ts | documentation",
    excludePrivate: true,
    disableOutputCheck: false,
    version: true
});

if (application.converter.hasComponent("moq-ts") === false) {
    application.converter.addComponent("moq-ts", new MoqPlugin(application.converter));
}

const project = application.convert();
export const docs = application.generateDocs(project, "./docs");
