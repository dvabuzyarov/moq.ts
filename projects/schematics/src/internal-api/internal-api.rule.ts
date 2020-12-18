import { Inject } from "@angular/core";
import { HOST } from "./injection-tokens/host.injection-token";
import { TypeofInjectionToken } from "../injector/typeof-injection-token";
import { TypeOfInjectionFactory } from "../L0/L0.injection-factory/injection-factory";
import { Options } from "./options";
import { PrivateFilesProvider } from "./private-files.provider";
import { From } from "../L2/L2.hof/from";
import { Pipe } from "../L2/L2.hof/pipe";
import { CreateExportDeclarationOperator } from "./operators/create-export-declaration.operator";
import { AddCommentOperator } from "./operators/add-comment.operator";
import { CreateSourceFileOperator } from "./operators/create-source-file.operator";
import { PrintSourceFileOperator } from "./operators/print-source-file.operator";

export class InternalApiRule {
    constructor(
        @Inject(HOST)
        private readonly tree: TypeofInjectionToken<typeof HOST>,
        private readonly privateFilesProvider: PrivateFilesProvider,
        @Inject(Options)
        private readonly options: TypeOfInjectionFactory<Options>,
        @Inject(From)
        private readonly from: TypeOfInjectionFactory<From>,
        @Inject(Pipe)
        private readonly pipe: TypeOfInjectionFactory<Pipe>,
        @Inject(CreateExportDeclarationOperator)
        private readonly createExportDeclarations: TypeOfInjectionFactory<CreateExportDeclarationOperator>,
        @Inject(AddCommentOperator)
        private readonly addComment: TypeOfInjectionFactory<AddCommentOperator>,
        @Inject(CreateSourceFileOperator)
        private readonly createSourceFile: TypeOfInjectionFactory<CreateSourceFileOperator>,
        @Inject(PrintSourceFileOperator)
        private readonly printSourceFile: TypeOfInjectionFactory<PrintSourceFileOperator>) {
    }

    async apply() {
        const {internalApiPath} = await this.options;
        const projectFiles = await this.privateFilesProvider.get();

        const privateApiFile = this.from(
            projectFiles,
            this.pipe(
                this.createExportDeclarations,
                this.addComment("\n * Internal API Surface of moq.ts \n"),
                this.createSourceFile,
                this.printSourceFile
            )
        );

        this.tree.overwrite(internalApiPath, privateApiFile);
        return this.tree;
    }
}
