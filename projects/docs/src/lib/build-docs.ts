import { Application, TSConfigReader, TypeDocReader } from "typedoc";

const application = new Application();
application.options.addReader(new TSConfigReader());
application.options.addReader(new TypeDocReader());

application.bootstrap({
    tsconfig: "./projects/moq/tsconfig.lib.prod.json",
    entryPoints: ["./projects/moq/src/public_api.ts"],
    name: "moq.ts | documentation",
    excludePrivate: true,
    version: true,
    plugin: ["./dist/docs/lib/typedoc.plugin.js"]
});


const project = application.convert();
export const docs = application.generateDocs(project, "./docs");
