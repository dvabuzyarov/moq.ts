import { HOST } from "../../L0/L0.injection-tokens/host.injection-token";
import { TypeofInjectionToken } from "../../injector/typeof-injection-token";
import { TypeOfInjectionFactory } from "../../L0/L0.injection-factory/injection-factory";
import { InternalFilesProvider } from "./internal-files.provider";
import { From } from "../../L2/L2.hof/from";
import { Pipe } from "../../L2/L2.hof/pipe";
import { CreateExportDeclarationOperator } from "../../L2/L2.operators/create-export-declaration.operator";
import { AddCommentOperator } from "../../L2/L2.operators/add-comment.operator";
import { CreateSourceFileOperator } from "../../L2/L2.operators/create-source-file.operator";
import { PrintSourceFileOperator } from "../../L2/L2.operators/print-source-file.operator";
import { Options } from "./options";

export class InternalApiRule {
    constructor(
        // @Inject(HOST)
        private readonly tree: TypeofInjectionToken<typeof HOST>,
        private readonly privateFilesProvider: InternalFilesProvider,
        // @Inject(Options)
        private readonly options: TypeOfInjectionFactory<Options>,
        // @Inject(From)
        private readonly from: TypeOfInjectionFactory<From>,
        // @Inject(Pipe)
        private readonly pipe: TypeOfInjectionFactory<Pipe>,
        // @Inject(CreateExportDeclarationOperator)
        private readonly createExportDeclarations: TypeOfInjectionFactory<CreateExportDeclarationOperator>,
        // @Inject(AddCommentOperator)
        private readonly addComment: TypeOfInjectionFactory<AddCommentOperator>,
        // @Inject(CreateSourceFileOperator)
        private readonly createSourceFile: TypeOfInjectionFactory<CreateSourceFileOperator>,
        // @Inject(PrintSourceFileOperator)
        private readonly printSourceFile: TypeOfInjectionFactory<PrintSourceFileOperator>) {
    }

    async apply() {
        const {internalApiTs} = await this.options;
        const projectFiles = await this.privateFilesProvider.get();

        const internalApiFile = this.from(
            projectFiles,
            this.pipe(
                this.createExportDeclarations,
                this.addComment("\n * Internal API Surface of moq.ts \n"),
                this.createSourceFile,
                this.printSourceFile
            )
        );

        this.tree.overwrite(internalApiTs, internalApiFile);
        return this.tree;
    }
}
