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
            },

            position: {
                default: null,
                keepOnSplit: false,
            },

            note: {
                default: null,
                keepOnSplit: true,
            },
        };
    },
});

export { NoteEditorParagraph };
