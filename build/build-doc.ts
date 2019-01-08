#!/usr/bin/env node

import { Application } from "typedoc";
import { MoqTsPlugin } from "./typedoc.plugin";

const application = new Application({
    module: 'commonjs',
    target: 'es5',
    name: "moq.ts | documentation",
    // theme: "markdown",
    excludePrivate: true,
    excludeNotExported: true,
    // excludeExternals: true,
    preserveConstEnums: true,
    stripInternal: true, 
    disableOutputCheck: true,
    version: true,
    plugins: ["./build/typedoc.plugin"]
});

new MoqTsPlugin(application.plugins as any);

const reflection = application.convert([
    "./lib/mock.ts",
    "./lib/play-times.ts",
    "./lib/format-string.ts",
    "./lib/dump.ts",
]);
application.generateDocs(reflection, "./docs");