import Paragraph from "@tiptap/extension-paragraph";

const NoteEditorParagraph = Paragraph.extend({
    name: "paragraphWithAttrs",

    addAttributes() {
        const baseAttrs = this.parent?.();
        return {
            ...baseAttrs,
            
            id: {
                type: "number",
                default: null,
            },

            position: {
                type: "number",
                default: null,
            },

            note: {
                type: "object",
                default: null,
            },
        };
    },
});

export { NoteEditorParagraph };
