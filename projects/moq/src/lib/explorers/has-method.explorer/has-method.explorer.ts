import { PresetHasMethodExplorer } from "./preset.has-method.explorer";
import { Presets } from "../../preset/presets";
import { MembersMethodExplorer } from "../members.explorer/members-method.explorer";

/**
 * @hidden
 */
export class HasMethodExplorer {
    constructor(
        private presets: Presets<unknown>,
        private membersExplorer: MembersMethodExplorer,
        private explorer: PresetHasMethodExplorer = new PresetHasMethodExplorer()) {

    }

    public has(name: PropertyKey): boolean {
        if (this.membersExplorer.hasMethod(name)) {
            return true;
        }

        return this.presets
            .get()
            .find(preset => this.explorer.has(name, preset)) !== undefined;
    }
}
