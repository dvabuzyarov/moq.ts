import { TypeofInjectionToken } from "../../injector/typeof-injection-token";
import { TypeOfInjectionFactory } from "../../L0/L0.injection-factory/injection-factory";
import { Options } from "./options";
import { ProjectFilesProvider } from "./project-files.provider";
import { From } from "../../L2/L2.hof/from";
import { Pipe } from "../../L2/L2.hof/pipe";
import { CreateExportDeclarationOperator } from "../../L2/L2.operators/create-export-declaration.operator";
import { AddCommentOperator } from "../../L2/L2.operators/add-comment.operator";
import { CreateSourceFileOperator } from "../../L2/L2.operators/create-source-file.operator";
import { PrintSourceFileOperator } from "../../L2/L2.operators/print-source-file.operator";
import { HOST } from "../../L0/L0.injection-tokens/host.injection-token";

export class PublicApiRule {
    constructor(
        // @Inject(HOST)
        private readonly tree: TypeofInjectionToken<typeof HOST>,
        private readonly privateFilesProvider: ProjectFilesProvider,
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
        const {publicApiTs} = await this.options;
        const projectFiles = await this.privateFilesProvider.get();

        const targetFile = this.from(
            projectFiles,
            this.pipe(
                this.createExportDeclarations,
                this.addComment("\n * Public API Surface of moq.ts \n"),
                this.createSourceFile,
                this.printSourceFile
            )
        );

        this.tree.overwrite(publicApiTs, targetFile);
        return this.tree;
    }
}
