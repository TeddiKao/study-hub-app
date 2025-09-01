import { Node } from "@tiptap/core";

const Title = Node.create({
    name: "title",
    addOptions() {
        return {
            HTMLAttributes: {
                class: "text-4xl font-bold"
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
        return ["h1", { ...this.options.HTMLAttributes }, 0]
    }
})

export { Title }