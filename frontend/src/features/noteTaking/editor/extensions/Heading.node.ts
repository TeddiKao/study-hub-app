import Heading from "@tiptap/extension-heading";
import { Node as ProseMirrorNode } from "prosemirror-model";

const NoteEditorHeading = Heading.extend({
    name: "note_editor_heading",
    addOptions() {
        return {
            HTMLAttributes: {
                class: "note-editor-heading",
            },
        }
    },

    addAttributes() {
        // @ts-expect-error this.parent actually exists
        const baseAttrs = this.parent?.();

        return {
            ...baseAttrs,
            id: {
                default: null,
                renderHTML: () => ({}),
                parseHTML: () => null,
                keepOnSplit: false,
            },
            
            position: {
                default: null,
                renderHTML: () => ({}),
                parseHTML: () => null,
                keepOnSplit: false,
            },
            
            note: {
                default: null,
                renderHTML: () => ({}),
                parseHTML: () => null,
                keepOnSplit: true,
            },
        }
    },

    parseHTML() {
        const { levels } = this.options;

        return levels.map((level) => ({
            tag: `h${level}`,
            getAttrs: () => ({ level }),
        }))
    },

    renderHTML({ node, HTMLAttributes }: { node: ProseMirrorNode; HTMLAttributes: Record<string, unknown> }) {
        const domAttrs = { ...HTMLAttributes }

        const tag = `h${node.attrs.level}`;

        return [tag, domAttrs, 0];
    },
})

export { NoteEditorHeading }