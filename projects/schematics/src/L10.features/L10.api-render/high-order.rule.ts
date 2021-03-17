import { InternalApiRule } from "./internal-api.rule";
import { PublicApiRule } from "./public-api.rule";

export class HighOrderRule {
    constructor(
        private readonly publicApiRule: PublicApiRule,
        private readonly internalApiRule: InternalApiRule) {
    }

    async apply() {
        await this.publicApiRule.apply();
        return this.internalApiRule.apply();
    }
}
