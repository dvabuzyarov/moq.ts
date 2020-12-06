import { createMoqInjector, get, resolve } from "../L1.unit-test.components/createMoqInjector";
import { Options } from "./options";
import { It, Mock } from "moq.ts";
import { typeOfInjectionFactory } from "../L0/L0.injection-factory/injection-factory";
import { AsyncReturnType } from "../L0/L0.promise/async-return-type";
import { HOST } from "./injection-tokens/host.injection-token";
import { Path } from "@angular-devkit/core";
import { PrivateFilesProvider } from "./private-files.provider";
import { PrivateApiRule } from "./private-api.rule";
import { From } from "../L2/L2.hof/from";
import { Pipe } from "../L2/L2.hof/pipe";
import { CreateExportDeclarationOperator } from "./operators/create-export-declaration.operator";
import { AddCommentOperator } from "./operators/add-comment.operator";
import { CreateSourceFileOperator } from "./operators/create-source-file.operator";
import { PrintSourceFileOperator } from "./operators/print-source-file.operator";
import { UnaryFunction } from "../L2/L2.hof/unary-function";

describe("Private api rule", () => {
    beforeEach(() => {
        createMoqInjector(PrivateApiRule);
    });

    it("Should be resolved", () => {
        const actual = get<PrivateApiRule>();
        expect(actual).toEqual(jasmine.any(PrivateApiRule));
    });

    it("Overwrites private_api.ts file", async () => {
        const privateApiPath = "/projects/moq/src/private_api.ts" as Path;
        const privateFilesPath = [];
        const fileContent = "";

        const options = new Mock<AsyncReturnType<typeOfInjectionFactory<Options>>>()
            .setup(instance => instance.privateApiPath)
            .returns(privateApiPath)
            .object();
        const addCommentOperator = new Mock<ReturnType<typeOfInjectionFactory<AddCommentOperator>>>()
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
            .setup(instance => instance("\n * Private API Surface of moq.ts \n"))
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

        const provider = get<PrivateApiRule>();
        const actual = await provider.apply();

        expect(actual).toBe(get(HOST));
        resolve(HOST)
            .verify(instance => instance.overwrite(privateApiPath, fileContent));
    });

});
