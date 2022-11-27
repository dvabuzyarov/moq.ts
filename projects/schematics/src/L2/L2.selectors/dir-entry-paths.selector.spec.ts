import { createInjector, createMoqInjector, resolve } from "../../L1.unit-test.components/createMoqInjector";
import { DirEntryPathsSelector } from "./dir-entry-paths.selector";
import { DirEntry } from "@angular-devkit/schematics";
import { It, Mock } from "moq.ts";

describe("Dir entry paths selector", () => {
    beforeEach(() => {
        createInjector(DirEntryPathsSelector);
    });

    it("Should be resolved", () => {
        const actual = resolve<DirEntryPathsSelector>();
        expect(actual).toEqual(jasmine.any(Function));
    });

    it("Returns dir entry paths", () => {
        const path = "/some/path";

        const dirEntry = new Mock<DirEntry>()
            .setup(instance => instance.visit(It.IsAny()))
            .callback(({args: [visitor]}) => visitor(path))
            .object();

        const selector = resolve<DirEntryPathsSelector>();
        const actual = selector(dirEntry);

        expect(actual).toEqual([path]);
    });
});
