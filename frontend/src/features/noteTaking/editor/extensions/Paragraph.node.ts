import Paragraph from "@tiptap/extension-paragraph";

const NoteEditorParagraph = Paragraph.extend({
    name: "note_editor_paragraph",

    addAttributes() {
        // @ts-ignore
        const baseAttrs = this.parent?.();

        return {
            ...baseAttrs,

            id: {
                default: null,
                keepOnSplit: false,
                renderHTML: () => ({}),
                parseHTML: () => null,
            },

            position: {
                default: null,
                keepOnSplit: false,
                renderHTML: () => ({}),
                parseHTML: () => null,
            },

            note: {
                default: null,
                keepOnSplit: true,
                renderHTML: () => ({}),
                parseHTML: () => null,
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: "p",
            },
        ];
    },

    renderHTML({
        HTMLAttributes,
    }: {
        HTMLAttributes: Record<string, unknown>;
    }) {
        const domAttrs = {
            class: HTMLAttributes.class,
            style: HTMLAttributes.style,
        };

        return ["p", domAttrs, 0];
    },
});

export { NoteEditorParagraph };
