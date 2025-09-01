import { Node } from "@tiptap/core";

const Title = Node.create({
    name: "title",
    content: "text*",
    group: "block",
    defining: true,

    addOptions() {
        return {
            HTMLAttributes: {
                class: "title text-4xl font-bold"
            }      
        }
    },

    parseHTML() {
        return [
            {
                tag: "h1",
            }
        ]
    },

    addKeyboardShortcuts() {
        return {
            Backspace: () => {
                const { state } = this.editor;
                const { $from } = state.selection;

                if ($from.parent.type.name === "title" && $from.parent.content.size === 0) {
                    return true;
                }

                return false;
            }
        }
    },

    renderHTML({ HTMLAttributes }) {
        console.log(HTMLAttributes);
        return ["h1", { ...this.options.HTMLAttributes, ...HTMLAttributes }, 0]
    }
})

export { Title }