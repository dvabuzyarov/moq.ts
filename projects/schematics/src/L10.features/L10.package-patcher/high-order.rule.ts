import { PackagePatcherRule } from "./package-patcher.rule";
import { DeleteFilesRule } from "./delete-files.rule";
import { InternalPackageRule } from "./internal-package.rule";

export class HighOrderRule {
    constructor(
        private readonly packagePatcherRule: PackagePatcherRule,
        private readonly internalPackageRule: InternalPackageRule,
        private readonly deleteFilesRule: DeleteFilesRule) {
    }

    async apply() {
        await this.packagePatcherRule.apply();
        await this.internalPackageRule.apply();
        return this.deleteFilesRule.apply();
    }
}
