import { PresetPlayer } from "./preset.player";
import { CallbackPresetPlayer } from "./callback-preset.player";
import { MimicsPresetPlayer } from "./mimics-preset.player";
import { PlayablePresetProvider } from "./playable-preset.provider";
import { Presets } from "../presets/presets";
import { InteractionPlayer } from "./interaction.player";
import { PresetPlayablesUpdater } from "../playables/preset-playables.updater";
import { REFLECT_APPLY } from "./reflect-apply.injection-token";
import { ExpressionEqualityComparer } from "../expression.equality-comparers/expression.equality-comparer";

/**
 * @hidden
 */
export default [
    {provide: REFLECT_APPLY, useValue: Reflect.apply, deps: []},
    {provide: PresetPlayer, useClass: PresetPlayer, deps: [CallbackPresetPlayer, MimicsPresetPlayer]},
    {provide: PlayablePresetProvider, useClass: PlayablePresetProvider, deps: [Presets, ExpressionEqualityComparer]},
    {provide: MimicsPresetPlayer, useClass: MimicsPresetPlayer, deps: [REFLECT_APPLY]},
    {
        provide: InteractionPlayer,
        useClass: InteractionPlayer,
        deps: [PlayablePresetProvider, PresetPlayablesUpdater, PresetPlayer]
    },
    {provide: CallbackPresetPlayer, useClass: CallbackPresetPlayer, deps: []},
];
