import { PresetHasPropertyExplorer } from "./preset-has-property.explorer";
import { Presets } from "../../preset/presets";
import { MembersExplorer } from "../members.explorer/members.explorer";

/**
 * @hidden
 */
export class HasPropertyExplorer {
    constructor(
        private presets: Presets<unknown>,
        private membersExplorer: MembersExplorer,
        private explorer: PresetHasPropertyExplorer = new PresetHasPropertyExplorer()) {

    }

    public has(name: PropertyKey): boolean {
        if (this.membersExplorer.hasProperty(name))
            return true;
        return this.presets
            .get()
            .find(preset => this.explorer.has(name, preset)) !== undefined;
    }
}
