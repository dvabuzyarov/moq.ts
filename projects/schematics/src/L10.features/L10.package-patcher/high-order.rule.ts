import { PackagePatcherRule } from "./package-patcher.rule";
import { DeleteFilesRule } from "./delete-files.rule";

export class HighOrderRule {
    constructor(
        private readonly packagePatcherRule: PackagePatcherRule,
        private readonly deleteFilesRule: DeleteFilesRule) {
    }

    async apply() {
        await this.packagePatcherRule.apply();
        return this.deleteFilesRule.apply();
    }
}
