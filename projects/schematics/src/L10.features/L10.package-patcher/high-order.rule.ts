import { PackagePatcherRule } from "./package-patcher.rule";
import { PublicApiPatcherRule } from "./public-api-patcher.rule";
import { DeleteFilesRule } from "./delete-files.rule";

export class HighOrderRule {
    constructor(
        private readonly packagePatcherRule: PackagePatcherRule,
        private readonly publicApiPatcherRule: PublicApiPatcherRule,
        private readonly deleteFilesRule: DeleteFilesRule) {
    }

    async apply() {
        await this.packagePatcherRule.apply();
        // await this.publicApiPatcherRule.apply();
        return this.deleteFilesRule.apply();
    }
}
