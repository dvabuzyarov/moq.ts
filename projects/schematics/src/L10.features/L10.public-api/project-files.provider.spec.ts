import { createMoqInjector, resolve, resolveMock } from "../../L1.unit-test.components/createMoqInjector";
import { Options } from "./options";
import { It, Mock } from "moq.ts";
import { dataMock } from "../../L1.unit-test.components/data-mock";
import { TypeOfInjectionFactory } from "../../L0/L0.injection-factory/injection-factory";
import { AsyncReturnType } from "../../L0/L0.promise/async-return-type";
import { Path } from "@angular-devkit/core";
import { ProjectFilesProvider } from "./project-files.provider";
import { DirEntry } from "@angular-devkit/schematics";
import { DirEntryPathsSelector } from "../../L2/L2.selectors/dir-entry-paths.selector";
import { HOST } from "../../L2/L2.injection-tokens/host.injection-token";

describe("Project files provider", () => {
    beforeEach(() => {
        createMoqInjector(ProjectFilesProvider);
    });

    it("Should be resolved", () => {
        const actual = resolve<ProjectFilesProvider>();
        expect(actual).toEqual(jasmine.any(ProjectFilesProvider));
    });

    it("Returns project files paths", async () => {
        const path = "/projects/moq/src/lib/dump.ts" as Path;
        const sourceRoot = "/projects/moq/src";
        const libPath = "projects/moq/src/lib";
        const dirEntry = dataMock<DirEntry>({});

        const options = new Mock<AsyncReturnType<TypeOfInjectionFactory<Options>>>()
            .setup(instance => instance.libPath)
            .returns(libPath)
            .setup(instance => instance.sourceRoot)
            .returns(sourceRoot)
            .object();

        resolveMock(Options)
            .setup(() => It.IsAny())
            .mimics(Promise.resolve(options));
        resolveMock(HOST)
            .setup(instance => instance.getDir(libPath))
            .returns(dirEntry);
        resolveMock(DirEntryPathsSelector)
            .setup(instance => instance(dirEntry))
            .returns([path]);

        const provider = resolve<ProjectFilesProvider>();
        const actual = await provider.get();

        const expected = "./lib/dump";
        expect(actual).toEqual([expected]);
    });

    it("Does not return .spec files", async () => {
        const path = "/projects/moq/src/lib/dump.spec.ts" as Path;
        const sourceRoot = "/projects/moq/src";
        const libPath = "projects/moq/src/lib";
        const dirEntry = dataMock<DirEntry>({});

        const options = new Mock<AsyncReturnType<TypeOfInjectionFactory<Options>>>()
            .setup(instance => instance.libPath)
            .returns(libPath)
            .setup(instance => instance.sourceRoot)
            .returns(sourceRoot)
            .object();

        resolveMock(Options)
            .setup(() => It.IsAny())
            .mimics(Promise.resolve(options));
        resolveMock(HOST)
            .setup(instance => instance.getDir(libPath))
            .returns(dirEntry);
        resolveMock(DirEntryPathsSelector)
            .setup(instance => instance(dirEntry))
            .returns([path]);

        const provider = resolve<ProjectFilesProvider>();
        const actual = await provider.get();

        expect(actual).toEqual([]);
    });
});
