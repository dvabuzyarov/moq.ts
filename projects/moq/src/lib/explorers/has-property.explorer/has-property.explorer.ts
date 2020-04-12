import { PresetHasPropertyExplorer } from "./preset-has-property.explorer";
import { Presets } from "../../preset/presets";
import { MembersPropertyExplorer } from "../members.explorer/members-property.explorer";

/**
 * @hidden
 */
export class HasPropertyExplorer {
    constructor(
        private presets: Presets<unknown>,
        private membersExplorer: MembersPropertyExplorer,
        private explorer = new PresetHasPropertyExplorer()) {

    }

    public has(name: PropertyKey): boolean {
        if (this.membersExplorer.hasProperty(name)) {
            return true;
        }
        return this.presets
            .get()
            .find(preset => this.explorer.has(name, preset)) !== undefined;
    }
}
