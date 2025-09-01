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

    renderHTML({ HTMLAttributes }) {
        console.log(HTMLAttributes);
        return ["h1", { ...this.options.HTMLAttributes, ...HTMLAttributes }, 0]
    }
})

export { Title }