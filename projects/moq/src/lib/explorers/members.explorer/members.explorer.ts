import { ITypeMember } from "../../moq";

/**
 * @hidden
 */
export class MembersExplorer {
    constructor(
        private members: ITypeMember[]) {

    }

    public hasProperty(name: PropertyKey): boolean {
        return this.members.find(member => member.type === "property" && member.name === name) !== undefined;
    }

    public hasMethod(name: PropertyKey): boolean {
        return this.members.find(member => member.type === "method" && member.name === name) !== undefined;
    }
}
