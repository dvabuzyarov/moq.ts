import { PresetHasMethodExplorer } from "./preset.has-method.explorer";
import { Presets } from "../../preset/presets";
import { MembersExplorer } from "../members.explorer/members.explorer";

/**
 * @hidden
 */
export class HasMethodExplorer {
    constructor(
        private presets: Presets<unknown>,
        private membersExplorer: MembersExplorer,
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
