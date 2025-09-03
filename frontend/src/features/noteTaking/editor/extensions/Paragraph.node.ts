import Paragraph from "@tiptap/extension-paragraph";

const NoteEditorParagraph = Paragraph.extend({
    name: "noteEditorParagraph",

    addAttributes() {
        // @ts-ignore
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
