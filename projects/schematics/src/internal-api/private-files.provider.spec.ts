import { createMoqInjector, get, resolve } from "../L1.unit-test.components/createMoqInjector";
import { Options } from "./options";
import { It, Mock } from "moq.ts";
import { dataMock } from "../L1.unit-test.components/data-mock";
import { TypeOfInjectionFactory } from "../L0/L0.injection-factory/injection-factory";
import { AsyncReturnType } from "../L0/L0.promise/async-return-type";
import { HOST } from "./injection-tokens/host.injection-token";
import { Path } from "@angular-devkit/core";
import { PrivateFilesProvider } from "./private-files.provider";
import { DirEntry } from "@angular-devkit/schematics";
import { DirEntryPathsSelector } from "./selectors/dir-entry-paths.selector";
import { PublicFilesProvider } from "./public-files.provider";

describe("Private files provider", () => {
    beforeEach(() => {
        createMoqInjector(PrivateFilesProvider);
    });

    it("Should be resolved", () => {
        const actual = get<PrivateFilesProvider>();
        expect(actual).toEqual(jasmine.any(PrivateFilesProvider));
    });

    it("Returns private files paths", async () => {
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

        resolve(Options)
            .setup(() => It.IsAny())
            .mimics(Promise.resolve(options));
        resolve(HOST)
            .setup(instance => instance.getDir(libPath))
            .returns(dirEntry);
        resolve(DirEntryPathsSelector)
            .setup(instance => instance(dirEntry))
            .returns([path]);
        resolve(PublicFilesProvider)
            .setup(instance => instance.get())
            .returns(Promise.resolve(new Set()));

        const provider = get<PrivateFilesProvider>();
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

        resolve(Options)
            .setup(() => It.IsAny())
            .mimics(Promise.resolve(options));
        resolve(HOST)
            .setup(instance => instance.getDir(libPath))
            .returns(dirEntry);
        resolve(DirEntryPathsSelector)
            .setup(instance => instance(dirEntry))
            .returns([path]);
        resolve(PublicFilesProvider)
            .setup(instance => instance.get())
            .returns(Promise.resolve(new Set()));

        const provider = get<PrivateFilesProvider>();
        const actual = await provider.get();

        expect(actual).toEqual([]);
    });

    it("Does not return public files", async () => {
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

        resolve(Options)
            .setup(() => It.IsAny())
            .mimics(Promise.resolve(options));
        resolve(HOST)
            .setup(instance => instance.getDir(libPath))
            .returns(dirEntry);
        resolve(DirEntryPathsSelector)
            .setup(instance => instance(dirEntry))
            .returns([path]);
        resolve(PublicFilesProvider)
            .setup(instance => instance.get())
            .returns(Promise.resolve(new Set(["lib/dump" as Path])));

        const provider = get<PrivateFilesProvider>();
        const actual = await provider.get();

        expect(actual).toEqual([]);
    });
});
