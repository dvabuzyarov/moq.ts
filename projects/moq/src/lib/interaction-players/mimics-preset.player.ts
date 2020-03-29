import {
    GetPropertyInteraction,
    Interaction,
    MethodInteraction,
    NamedMethodInteraction,
    SetPropertyInteraction
} from "../interactions";

/**
 * @hidden
 */
export class MimicsPresetPlayer {
    constructor(private apply: typeof Reflect.apply = Reflect.apply) {

    }

    public play(origin: any, interaction: Interaction): any {
        if (interaction instanceof GetPropertyInteraction) {
            return origin[interaction.name];
        }
        if (interaction instanceof SetPropertyInteraction) {
            origin[interaction.name] = interaction.value;
            return true;
        }
        if (interaction instanceof NamedMethodInteraction) {
            const method = origin[interaction.name];
            return this.apply(method, origin, interaction.args);
        }
        if (interaction instanceof MethodInteraction) {
            return this.apply(origin, undefined, interaction.args);
        }
    }
}
