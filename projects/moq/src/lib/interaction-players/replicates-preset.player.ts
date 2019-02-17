import {
    Expressions,
    GetPropertyExpression,
    MethodExpression,
    NamedMethodExpression,
    SetPropertyExpression
} from "../expressions";

/**
 * @hidden
 */
export class ReplicatesPresetPlayer {
    constructor(private apply: typeof Reflect.apply = Reflect.apply) {

    }

    public play(origin: any, interaction: Expressions): any {
        if (interaction instanceof GetPropertyExpression) {
            return origin[interaction.name];
        }
        if (interaction instanceof SetPropertyExpression) {
            origin[interaction.name] = interaction.value;
            return true;
        }
        if (interaction instanceof NamedMethodExpression) {
            const method = origin[interaction.name];
            return this.apply(method, origin, interaction.args);
        }
        if (interaction instanceof MethodExpression) {
            return this.apply(origin, undefined, interaction.args);
        }
    }
}
