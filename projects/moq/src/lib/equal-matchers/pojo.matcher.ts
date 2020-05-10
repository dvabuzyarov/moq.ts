import { ObjectMapProvider } from "./object-map.provider";
import { IObjectMatcher } from "./object-matcher.type";
import { MapMatcher } from "./map.matcher";

/**
 * @hidden
 */
export class POJOMatcher implements IObjectMatcher {
    constructor(
        private mapMatcher: MapMatcher,
        private objectMapProvider: ObjectMapProvider) {
    }

    public matched<T extends Object>(left: T, right: T): boolean {
        const leftProps = this.objectMapProvider.get(left);
        const rightProps = this.objectMapProvider.get(right);
        return this.mapMatcher.matched(leftProps, rightProps);
    }
}
