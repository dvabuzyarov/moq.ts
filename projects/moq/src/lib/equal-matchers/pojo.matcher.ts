import { ObjectMapProvider } from "./object-map.provider";
import { IObjectMatcher } from "./object-matcher.type";
import { MapMatcher } from "./map.matcher";

/**
 * Matches objects as POJO
 */
export class POJOMatcher implements IObjectMatcher {
    constructor(
        private readonly mapMatcher: MapMatcher,
        private readonly objectMapProvider: ObjectMapProvider) {
    }

    /*eslint-disable-next-line @typescript-eslint/ban-types*/
    public matched<T extends object>(left: T, right: T): boolean {
        const leftProps = this.objectMapProvider.get(left);
        const rightProps = this.objectMapProvider.get(right);
        return this.mapMatcher.matched(leftProps, rightProps);
    }
}
