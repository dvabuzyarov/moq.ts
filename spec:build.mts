#!/usr/bin/env node
import ts from "typescript";
import path from "path";

function shouldMutateModuleSpecifier(node: ts.Node): node is (ts.ImportDeclaration | ts.ExportDeclaration) & { moduleSpecifier: ts.StringLiteral } {
    if (!ts.isImportDeclaration(node) && !ts.isExportDeclaration(node)) return false;
    if (node.moduleSpecifier === undefined) return false;
    // only when module specifier is valid
    if (!ts.isStringLiteral(node.moduleSpecifier)) return false;
    // only when path is relative
    if (!node.moduleSpecifier.text.startsWith("./") && !node.moduleSpecifier.text.startsWith("../")) return false;
    // only when module specifier hasn't specific extensions or has no extension
    if (
        [".js", ".jsx", ".ts", ".tsx", ".mts", ".cts", ".json", ".css", ".less", ".htm", ".html", ".scss", ".sass"].includes(path.extname(node.moduleSpecifier.text)) === true ||
        (path.extname(node.moduleSpecifier.text) !== "" && path.extname(node.moduleSpecifier.text).length <= 4)
    ) {
        return false;
    }
    return true;
}

function visitor(ctx: ts.TransformationContext, sf: ts.SourceFile) {
    const visitor: ts.Visitor = (node: ts.Node): ts.Node => {
        if (shouldMutateModuleSpecifier(node)) {
            if (ts.isImportDeclaration(node)) {
                const newModuleSpecifier = ts.createLiteral(`${node.moduleSpecifier.text}.js`);
                return ts.updateImportDeclaration(node, node.decorators, node.modifiers, node.importClause, newModuleSpecifier, undefined);
            } else if (ts.isExportDeclaration(node)) {
                const newModuleSpecifier = ts.createLiteral(`${node.moduleSpecifier.text}.js`);
                return ts.updateExportDeclaration(node, node.decorators, node.modifiers, node.exportClause, newModuleSpecifier, false);
            }
        }

        return ts.visitEachChild(node, visitor, ctx);
    };

    return visitor;
}

export function transform(): ts.TransformerFactory<ts.SourceFile> {
    return (ctx: ts.TransformationContext): ts.Transformer<ts.SourceFile> => {
        return (sf: ts.SourceFile) => ts.visitNode(sf, visitor(ctx, sf));
    };
}

function compile(fileNames: string[], options: ts.CompilerOptions): void {
    const host = ts.createCompilerHost(options);
    host.fileExists = (fileName: string) => ts.sys.fileExists(fileName.replace(/\.mts$/, ".ts"));
    host.readFile = (fileName: string) => ts.sys.readFile(fileName.replace(/\.mts$/, ".ts"));

    // Prepare and emit the d.ts files
    const program = ts.createProgram(fileNames, options, host);
    const emitResult = program.emit(
        undefined,
        undefined,
        undefined,
        undefined,
        {
            before: [],
            after: [transform()],
            afterDeclarations: [],
        });

    ts.getPreEmitDiagnostics(program)
        .concat(emitResult.diagnostics)
        .forEach(diagnostic => {
            let msg = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
            if (diagnostic.file) {
                const {line, character} = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
                msg = `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${msg}`;
            }
            console.error(msg);
        });

    const exitCode = emitResult.emitSkipped ? 1 : 0;
    if (exitCode) {
        console.log(`Process exiting with code '${exitCode}'.`);
        process.exit(exitCode);
    } else {
        ts.sys.writeFile(path.join(options.outDir, "package.json"), `{"type":"module"}`);
    }
}

const configFileName = ts.findConfigFile(
    "./projects/moq/",
    ts.sys.fileExists,
    "tsconfig.spec.json"
);
const configFile = ts.readConfigFile(configFileName, ts.sys.readFile);
const compilerOptions = ts.parseJsonConfigFileContent(configFile.config, ts.sys, "./projects/moq/");
compile(compilerOptions.fileNames, compilerOptions.options);
