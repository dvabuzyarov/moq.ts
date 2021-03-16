import { createMoqInjector, resolve, resolveMock } from "../../L1.unit-test.components/createMoqInjector";
import { Options } from "./options";
import { It, Mock } from "moq.ts";
import { dataMock } from "../../L1.unit-test.components/data-mock";
import { TypeOfInjectionFactory } from "../../L0/L0.injection-factory/injection-factory";
import { AsyncReturnType } from "../../L0/L0.promise/async-return-type";
import { PublicFilesProvider } from "./public-files.provider";
import { HOST } from "../../L0/L0.injection-tokens/host.injection-token";
import { CreateEmptySourceFileOperator } from "../../L2/L2.operators/create-empty-source-file.operator";
import { SourceFile } from "typescript";
import { ModuleSpecifierTextSetSelector } from "../../L2/L2.selectors/module-specifier-text-set.selector";
import { Path } from "@angular-devkit/core";

describe("Public files provider", () => {
    beforeEach(() => {
        createMoqInjector(PublicFilesProvider);
    });

    it("Should be resolved", () => {
        const actual = resolve<PublicFilesProvider>();
        expect(actual).toEqual(jasmine.any(PublicFilesProvider));
    });

    it("Returns public files paths", async () => {
        const path = "./file/path" as Path;
        const publicPath = "./public.ts";
        const sourceFile = dataMock<SourceFile>({});
        const buffer = dataMock<Buffer>({});

        const options = new Mock<AsyncReturnType<TypeOfInjectionFactory<Options>>>()
            .setup(instance => instance.publicTs)
            .returns(publicPath)
            .object();

        resolveMock(Options)
            .setup(() => It.IsAny())
            .mimics(Promise.resolve(options));
        resolveMock(HOST)
            .setup(instance => instance.read(publicPath))
            .returns(buffer);
        resolveMock(CreateEmptySourceFileOperator)
            .setup(instance => instance(buffer))
            .returns(sourceFile);
        resolveMock(ModuleSpecifierTextSetSelector)
            .setup(instance => instance(sourceFile))
            .returns(new Set([path]));

        const provider = resolve<PublicFilesProvider>();
        const actual = await provider.get();

        expect(actual).toEqual(new Set([path]));
    });
});
