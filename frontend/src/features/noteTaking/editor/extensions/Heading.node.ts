import Heading from "@tiptap/extension-heading";

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
        return [1, 2, 3, 4, 5, 6].map((level) => ({
            tag: `h${level}`,
            getAttrs: () => ({ level })
        }))
    },

    renderHTML({ HTMLAttributes }: { HTMLAttributes: Record<string, unknown> }) {
        const attrs = {
            ...this.options.HTMLAttributes,
            ...HTMLAttributes,
        };

        const tag = `h${this.options.HTMLAttributes.level}`;

        return [tag, attrs, 0];
    },
})

export { NoteEditorHeading }