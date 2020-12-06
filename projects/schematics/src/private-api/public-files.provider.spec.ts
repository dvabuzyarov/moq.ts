import { createMoqInjector, get, resolve } from "../L1.unit-test.components/createMoqInjector";
import { Options } from "./options";
import { It, Mock } from "moq.ts";
import { dataMock } from "../L1.unit-test.components/data-mock";
import { typeOfInjectionFactory } from "../L0/L0.injection-factory/injection-factory";
import { AsyncReturnType } from "../L0/L0.promise/async-return-type";
import { PublicFilesProvider } from "./public-files.provider";
import { HOST } from "./injection-tokens/host.injection-token";
import { SourceFileCreator } from "./source-file.creator";
import { SourceFile } from "typescript";
import { ModuleSpecifierTextSetSelector } from "./selectors/module-specifier-text-set.selector";
import { Path } from "@angular-devkit/core";

describe("Public files provider", () => {
    beforeEach(() => {
        createMoqInjector(PublicFilesProvider);
    });

    it("Should be resolved", () => {
        const actual = get<PublicFilesProvider>();
        expect(actual).toEqual(jasmine.any(PublicFilesProvider));
    });

    it("Returns public files paths", async () => {
        const path = "./file/path" as Path;
        const publicApiPath = "./public_api.ts";
        const sourceFile = dataMock<SourceFile>({});
        const buffer = dataMock<Buffer>({});

        const options = new Mock<AsyncReturnType<typeOfInjectionFactory<Options>>>()
            .setup(instance => instance.publicApiPath)
            .returns(publicApiPath)
            .object();

        resolve(Options)
            .setup(() => It.IsAny())
            .mimics(Promise.resolve(options));
        resolve(HOST)
            .setup(instance => instance.read(publicApiPath))
            .returns(buffer);
        resolve(SourceFileCreator)
            .setup(instance => instance(buffer))
            .returns(sourceFile);
        resolve(ModuleSpecifierTextSetSelector)
            .setup(instance => instance(sourceFile))
            .returns(new Set([path]));

        const provider = get<PublicFilesProvider>();
        const actual = await provider.get();

        expect(actual).toEqual(new Set([path]));
    });
});
