import { Reflection, ReflectionFlag, ReflectionKind } from "typedoc/dist/lib/models/reflections/abstract";
import { Component, ConverterComponent } from "typedoc/dist/lib/converter/components";
import { Converter } from "typedoc/dist/lib/converter/converter";
import { Context } from "typedoc/dist/lib/converter/context";
import { ContainerReflection } from "typedoc/dist/lib/models/reflections/container";
import { CommentPlugin } from "typedoc/dist/lib/converter/plugins";
import { DeclarationReflection } from "typedoc";

const moduleName = "moq.ts";

@Component({name: "moq-ts"})
export class MoqPlugin extends ConverterComponent {
    private moduleRenames: ContainerReflection[];

    initialize() {
        this.listenTo(this.owner, {
            [Converter.EVENT_BEGIN]: this.onBegin,
            [Converter.EVENT_CREATE_DECLARATION]: this.onDeclaration,
            [Converter.EVENT_RESOLVE_BEGIN]: this.onBeginResolve,
        });
    }

    private onBegin(context: Context) {
        this.moduleRenames = [];
    }

    private onDeclaration(context: Context, reflection: Reflection, node?) {
        if (reflection.kindOf(ReflectionKind.Module)) {
            this.moduleRenames.push(reflection as ContainerReflection);
        }
    }

    private onBeginResolve(context: Context) {
        const projRefs = context.project.reflections;
        const refsArray: Reflection[] = Object.keys(projRefs).reduce((m, k) => {
            m.push(projRefs[k]);
            return m;
        }, []);

        for (const reflection of refsArray) {
            reflection.flags.setFlag(ReflectionFlag.External, false);
        }

        // Process each rename
        this.moduleRenames.forEach(item => {
            const renaming = item as ContainerReflection;
            // Find an existing module that already has the "rename to" name.  Use it as the merge target.
            const mergeTarget = refsArray.find(
                ref => ref.name === moduleName,
            ) as ContainerReflection;

            // If there wasn't a merge target, just change the name of the current module and exit.
            if (!mergeTarget) {
                renaming.name = moduleName;
                renaming.kind = ReflectionKind.Module;
                return;
            }

            if (!mergeTarget.children) {
                mergeTarget.children = [];
            }

            // Since there is a merge target, relocate all the renaming module's children to the mergeTarget.
            const childrenOfRenamed = refsArray.filter(ref => ref.parent === renaming);
            childrenOfRenamed.forEach((ref: Reflection) => {
                // update links in both directions
                ref.parent = mergeTarget;
                mergeTarget.children.push(ref as DeclarationReflection);
            });

            // Now that all the children have been relocated to the mergeTarget, delete the empty module
            // Make sure the module being renamed doesn't have children, or they will be deleted
            if (renaming.children) renaming.children.length = 0;
            // CommentPlugin.removeReflection(context.project, renaming);
        });
    }
}
