import { createMoqInjector, resolve, resolveMock } from "../../L1.unit-test.components/createMoqInjector";
import { It, Mock } from "moq.ts";
import { TypeOfInjectionFactory } from "../../L0/L0.injection-factory/injection-factory";
import { AsyncReturnType } from "../../L0/L0.promise/async-return-type";
import { HOST } from "../../L0/L0.injection-tokens/host.injection-token";
import { Path } from "@angular-devkit/core";
import { InternalFilesProvider } from "./internal-files.provider";
import { InternalApiRule } from "./internal-api.rule";
import { From } from "../../L2/L2.hof/from";
import { Pipe } from "../../L2/L2.hof/pipe";
import { UnaryFunction } from "../../L2/L2.hof/unary-function";
import { AddCommentOperator } from "../../L2/L2.operators/add-comment.operator";
import { CreateExportDeclarationOperator } from "../../L2/L2.operators/create-export-declaration.operator";
import { CreateSourceFileOperator } from "../../L2/L2.operators/create-source-file.operator";
import { PrintSourceFileOperator } from "../../L2/L2.operators/print-source-file.operator";
import { Options } from "./options";

describe("Internal api rule", () => {
    beforeEach(() => {
        createMoqInjector(InternalApiRule);
    });

    it("Should be resolved", () => {
        const actual = resolve<InternalApiRule>();
        expect(actual).toEqual(jasmine.any(InternalApiRule));
    });

    it("Overwrites private_api.ts file", async () => {
        const internalApiPath = "/projects/moq/src/internal_api.ts" as Path;
        const internalFilesPath = [];
        const fileContent = "";

        const options = new Mock<AsyncReturnType<TypeOfInjectionFactory<Options>>>()
            .setup(instance => instance.internalApiTs)
            .returns(internalApiPath)
            .object();
        const addCommentOperator = new Mock<ReturnType<TypeOfInjectionFactory<AddCommentOperator>>>()
            .object();
        const finalOperator = new Mock<UnaryFunction<string[], string>>()
            .object();
        resolveMock(Options)
            .setup(() => It.IsAny())
            .mimics(Promise.resolve(options));
        resolveMock(InternalFilesProvider)
            .setup(instance => instance.get())
            .returns(Promise.resolve(internalFilesPath));
        resolveMock(AddCommentOperator)
            .setup(instance => instance("\n * Internal API Surface of moq.ts \n"))
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

        const provider = resolve<InternalApiRule>();
        const actual = await provider.apply();

        expect(actual).toBe(resolve(HOST));
        resolveMock(HOST)
            .verify(instance => instance.overwrite(internalApiPath, fileContent));
    });

});
