import { createMoqInjector, resolve, resolveMock } from "../../L1.unit-test.components/createMoqInjector";
import { Options } from "./options";
import { It, Mock } from "moq.ts";
import { TypeOfInjectionFactory } from "../../L0/L0.injection-factory/injection-factory";
import { AsyncReturnType } from "../../L0/L0.promise/async-return-type";
import { Path } from "@angular-devkit/core";
import { ProjectFilesProvider } from "./project-files.provider";
import { PublicApiRule } from "./public-api.rule";
import { From } from "../../L2/L2.hof/from";
import { Pipe } from "../../L2/L2.hof/pipe";
import { UnaryFunction } from "../../L2/L2.hof/unary-function";
import { AddCommentOperator } from "../../L2/L2.operators/add-comment.operator";
import { CreateExportDeclarationOperator } from "../../L2/L2.operators/create-export-declaration.operator";
import { CreateSourceFileOperator } from "../../L2/L2.operators/create-source-file.operator";
import { PrintSourceFileOperator } from "../../L2/L2.operators/print-source-file.operator";
import { HOST } from "../../L2/L2.injection-tokens/host.injection-token";

describe("Public api rule", () => {
    beforeEach(() => {
        createMoqInjector(PublicApiRule);
    });

    it("Should be resolved", () => {
        const actual = resolve<PublicApiRule>();
        expect(actual).toEqual(jasmine.any(PublicApiRule));
    });

    it("Overwrites public_api.ts file", async () => {
        const publicApiPath = "/projects/moq/src/public_api.ts" as Path;
        const internalFilesPath = [];
        const fileContent = "";

        const options = new Mock<AsyncReturnType<TypeOfInjectionFactory<Options>>>()
            .setup(instance => instance.publicApiPath)
            .returns(publicApiPath)
            .object();
        const addCommentOperator = new Mock<ReturnType<TypeOfInjectionFactory<AddCommentOperator>>>()
            .object();
        const finalOperator = new Mock<UnaryFunction<string[], string>>()
            .object();
        resolveMock(Options)
            .setup(() => It.IsAny())
            .mimics(Promise.resolve(options));
        resolveMock(ProjectFilesProvider)
            .setup(instance => instance.get())
            .returns(Promise.resolve(internalFilesPath));
        resolveMock(AddCommentOperator)
            .setup(instance => instance("\n * Public API Surface of moq.ts \n"))
            .returns(addCommentOperator);
        resolveMock(Pipe)
            .setup(instance => instance(
                resolve(CreateExportDeclarationOperator),
                addCommentOperator,
                resolve(CreateSourceFileOperator),
                resolve(PrintSourceFileOperator)
            ))
            .returns(finalOperator);
        resolveMock(From)
            .setup(instance => instance(internalFilesPath, finalOperator))
            .returns(fileContent);
        resolveMock(HOST)
            .setup(instance => instance.overwrite(It.IsAny(), It.IsAny()))
            .returns(undefined);

        const provider = resolve<PublicApiRule>();
        const actual = await provider.apply();

        expect(actual).toBe(resolve(HOST));
        resolveMock(HOST)
            .verify(instance => instance.overwrite(publicApiPath, fileContent));
    });

});
