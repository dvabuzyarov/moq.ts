import { createMoqInjector, get, resolve } from "../L1.unit-test.components/createMoqInjector";
import { Options } from "./options";
import { It, Mock } from "moq.ts";
import { TypeOfInjectionFactory } from "../L0/L0.injection-factory/injection-factory";
import { AsyncReturnType } from "../L0/L0.promise/async-return-type";
import { HOST } from "./injection-tokens/host.injection-token";
import { Path } from "@angular-devkit/core";
import { PrivateFilesProvider } from "./private-files.provider";
import { InternalApiRule } from "./internal-api.rule";
import { From } from "../L2/L2.hof/from";
import { Pipe } from "../L2/L2.hof/pipe";
import { CreateExportDeclarationOperator } from "./operators/create-export-declaration.operator";
import { AddCommentOperator } from "./operators/add-comment.operator";
import { CreateSourceFileOperator } from "./operators/create-source-file.operator";
import { PrintSourceFileOperator } from "./operators/print-source-file.operator";
import { UnaryFunction } from "../L2/L2.hof/unary-function";

describe("Internal api rule", () => {
    beforeEach(() => {
        createMoqInjector(InternalApiRule);
    });

    it("Should be resolved", () => {
        const actual = get<InternalApiRule>();
        expect(actual).toEqual(jasmine.any(InternalApiRule));
    });

    it("Overwrites private_api.ts file", async () => {
        const internalApiPath = "/projects/moq/src/internal_api.ts" as Path;
        const privateFilesPath = [];
        const fileContent = "";

        const options = new Mock<AsyncReturnType<TypeOfInjectionFactory<Options>>>()
            .setup(instance => instance.internalApiPath)
            .returns(internalApiPath)
            .object();
        const addCommentOperator = new Mock<ReturnType<TypeOfInjectionFactory<AddCommentOperator>>>()
            .object();
        const finalOperator = new Mock<UnaryFunction<string[], string>>()
            .object();
        resolve(Options)
            .setup(() => It.IsAny())
            .mimics(Promise.resolve(options));
        resolve(PrivateFilesProvider)
            .setup(instance => instance.get())
            .returns(Promise.resolve(privateFilesPath));
        resolve(AddCommentOperator)
            .setup(instance => instance("\n * Internal API Surface of moq.ts \n"))
            .returns(addCommentOperator);
        resolve(Pipe)
            .setup(instance => instance(
                get(CreateExportDeclarationOperator),
                addCommentOperator,
                get(CreateSourceFileOperator),
                get(PrintSourceFileOperator)
            ))
            .returns(finalOperator);
        resolve(From)
            .setup(instance => instance(privateFilesPath, finalOperator))
            .returns(fileContent);
        resolve(HOST)
            .setup(instance => instance.overwrite(It.IsAny(), It.IsAny()))
            .returns(undefined);

        const provider = get<InternalApiRule>();
        const actual = await provider.apply();

        expect(actual).toBe(get(HOST));
        resolve(HOST)
            .verify(instance => instance.overwrite(internalApiPath, fileContent));
    });

});
