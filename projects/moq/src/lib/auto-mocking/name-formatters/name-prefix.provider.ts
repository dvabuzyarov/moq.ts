/**
 * @hidden
 */
export class NamePrefixProvider {
    public get(name: string | undefined) {
        return name ? name : "instance";
    }
}
