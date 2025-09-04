import { Node } from "@tiptap/core";

const Title = Node.create({
    name: "title",
    content: "text*",
    group: "block",
    defining: true,

    addOptions() {
        return {
            HTMLAttributes: {
                class: "title text-4xl font-bold",
            },
        };
    },

    addAttributes() {
        return {
            id: {
                default: null,
                renderHTML: () => ({}),
                parseHTML: () => null,
            },

            position: {
                default: null,
                renderHTML: () => ({}),
                parseHTML: () => null,
            },
            
            note: {
                default: null,
                renderHTML: () => ({}),
                parseHTML: () => null,
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: "h1.title",
            },
        ];
    },

    addKeyboardShortcuts() {
        return {
            Backspace: () => {
                const { state } = this.editor;
                const { $from } = state.selection;

                if (
                    $from.parent.type.name === "title" &&
                    $from.parent.content.size === 0
                ) {
                    return true;
                }

                return false;
            },
        };
    },

    renderHTML({ node, HTMLAttributes }) {
        const attrs = {
            ...this.options.HTMLAttributes,
            ...HTMLAttributes,
        };

        if (!node.textContent) {
            attrs["data-placeholder"] = "Enter title";
        }

        return ["h1", attrs, 0];
    },
});

export { Title };
